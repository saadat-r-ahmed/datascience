/**
 * interactive-cells.js
 *
 * Transforms Jupyter Book code cells into editable, runnable cells powered by
 * Pyodide (WebAssembly Python). Kernel loads automatically in the background.
 * Students can edit any cell and press ▶ Run (or Shift+Enter) to execute.
 * No server required.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Guard against double-execution (Jupyter Book auto-scans _static/*.js)
  if (window._interactiveCellsLoaded) return;
  window._interactiveCellsLoaded = true;

  if (!document.querySelector('.cell_input')) return;

  var PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
  var CM_CDN      = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/';

  // ── Utilities ────────────────────────────────────────────────────────────
  function loadScript(src, onload, onerror) {
    var s = document.createElement('script');
    s.src = src;
    if (onload)  s.onload  = onload;
    if (onerror) s.onerror = onerror;
    document.head.appendChild(s);
  }

  function loadCSS(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    document.head.appendChild(l);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function siteRoot() {
    // Walks up from current page path to find the book root
    var parts = window.location.pathname.split('/').filter(function(p){ return p !== ''; });
    // Remove the filename
    parts.pop();
    // Remove each directory segment to get back to root
    var depth = parts.length;
    for (var i = 0; i < depth; i++) parts.pop();
    return window.location.origin + '/';
  }

  // ── Status badge (fixed bottom-right) ───────────────────────────────────
  var badge = document.createElement('div');
  Object.assign(badge.style, {
    position:     'fixed',
    bottom:       '16px',
    right:        '16px',
    zIndex:       '9999',
    padding:      '6px 16px',
    borderRadius: '20px',
    fontWeight:   '600',
    fontSize:     '0.78rem',
    color:        '#fff',
    background:   '#555',
    boxShadow:    '0 2px 8px rgba(0,0,0,.3)',
    transition:   'opacity .6s',
    cursor:       'default',
  });
  badge.textContent = '⏳ Loading Python…';
  document.body.appendChild(badge);

  var pyodide = null;
  var kernelReady = false;

  function setBadge(text, color, autohide) {
    badge.style.opacity  = '1';
    badge.style.background = color;
    badge.textContent    = text;
    if (autohide) {
      setTimeout(function () { badge.style.opacity = '0'; }, 4000);
    }
  }

  // ── Wire each code cell ──────────────────────────────────────────────────
  var editorList = [];

  document.querySelectorAll('.cell_input').forEach(function (cell) {
    var pre = cell.querySelector('pre');
    if (!pre) return;

    // Extract plain text (strips Pygments <span> tags)
    var code = pre.textContent.replace(/^\n/, '');  // strip leading newline

    // The structure is: .cell_input > .highlight-ipython3 > .highlight > pre
    // We hide the whole highlight block and insert CodeMirror before it.
    var highlightBlock = cell.querySelector('.highlight-ipython3') ||
                         cell.querySelector('.highlight') ||
                         pre.parentNode;
    highlightBlock.style.display = 'none';

    // CodeMirror host
    var cmWrap = document.createElement('div');
    cmWrap.style.cssText = [
      'border:1px solid #d0d0d0',
      'border-radius:4px',
      'overflow:hidden',
      'font-size:0.88em',
      'line-height:1.5',
    ].join(';');
    // Insert before the hidden highlight block (both are children of .cell_input)
    cell.insertBefore(cmWrap, highlightBlock);

    // Toolbar row: Run button + status indicator
    var toolbar = document.createElement('div');
    toolbar.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:8px',
      'margin-top:6px',
    ].join(';');

    var runBtn = document.createElement('button');
    runBtn.innerHTML = '&#9654; Run';
    runBtn.style.cssText = [
      'background:#e65100',
      'color:#fff',
      'border:none',
      'border-radius:4px',
      'padding:4px 18px',
      'cursor:pointer',
      'font-size:0.82rem',
      'font-weight:700',
      'transition:background .15s',
    ].join(';');
    runBtn.onmouseover = function() { if (!runBtn.disabled) runBtn.style.background = '#bf360c'; };
    runBtn.onmouseout  = function() { if (!runBtn.disabled) runBtn.style.background = '#e65100'; };

    var cellStatus = document.createElement('span');
    cellStatus.style.cssText = 'font-size:0.78rem;color:#888;';

    toolbar.appendChild(runBtn);
    toolbar.appendChild(cellStatus);
    cell.appendChild(toolbar);

    // Live output panel
    var liveOut = document.createElement('div');
    liveOut.style.cssText = [
      'display:none',
      'margin-top:6px',
      'padding:8px 12px',
      'border-left:3px solid #e65100',
      'background:#fffde7',
      'font-family:monospace',
      'font-size:0.88em',
      'white-space:pre-wrap',
      'overflow-x:auto',
      'border-radius:0 4px 4px 0',
    ].join(';');
    cell.appendChild(liveOut);

    var entry = {
      host:       cmWrap,
      code:       code,
      cm:         null,
      btn:        runBtn,
      status:     cellStatus,
      liveOut:    liveOut,
    };
    editorList.push(entry);

    runBtn.addEventListener('click', function () { runCell(entry); });
  });

  // ── Execute a cell ───────────────────────────────────────────────────────
  function runCell(entry) {
    var liveOut = entry.liveOut;
    var btn     = entry.btn;
    var status  = entry.status;

    liveOut.style.display = 'block';

    if (!kernelReady) {
      liveOut.innerHTML = '<span style="color:#888">⏳ Kernel still loading — please wait a moment then try again.</span>';
      return;
    }

    var code = entry.cm ? entry.cm.getValue() : entry.code;
    if (!code.trim()) {
      liveOut.innerHTML = '<span style="color:#888">✓ (empty cell)</span>';
      return;
    }

    btn.innerHTML  = '⏳';
    btn.disabled   = true;
    btn.style.background = '#aaa';
    status.textContent   = 'Running…';
    liveOut.innerHTML    = '<span style="color:#888">Running…</span>';

    var stdout = '';
    pyodide.setStdout({ batched: function (s) { stdout += s + '\n'; } });
    pyodide.setStderr({ batched: function (s) { stdout += '⚠ ' + s + '\n'; } });
    pyodide.globals.set('_cell_code', code);

    pyodide.runPythonAsync(`
import ast as _a, io as _io, base64 as _b64

_tree = _a.parse(_cell_code)
_is_expr = (bool(_tree.body) and isinstance(_tree.body[-1], _a.Expr))

if _is_expr:
    _stmts = _tree.body[:-1]
    _expr  = _tree.body[-1].value
    if _stmts:
        exec(compile(_a.Module(_stmts, type_ignores=[]), '<cell>', 'exec'), _cell_ns)
    _rv = eval(compile(_a.Expression(_expr), '<cell>', 'eval'), _cell_ns)
else:
    exec(compile(_cell_code, '<cell>', 'exec'), _cell_ns)
    _rv = None

import matplotlib.pyplot as _plt
_figs = ''
for _fn in list(_plt.get_fignums()):
    _fig = _plt.figure(_fn)
    _buf = _io.BytesIO()
    try:
        _fig.savefig(_buf, format='png', bbox_inches='tight', dpi=120)
        _buf.seek(0)
        _figs += '<img src="data:image/png;base64,' + _b64.b64encode(_buf.read()).decode() + '" style="max-width:100%;display:block;margin:6px 0">'
    except Exception as _fe:
        _figs += '<pre style="color:#c62828">Figure error: ' + str(_fe) + '</pre>'
    finally:
        _plt.close(_fn)

_rhtml = _rv._repr_html_() if hasattr(_rv, '_repr_html_') else None
_rstr  = repr(_rv) if (_rv is not None and _rhtml is None) else None
(_figs, _rhtml, _rstr)
`).then(function (res) {
      var items = res.toJs();
      var figs  = items[0] || '';
      var rhtml = items[1];
      var rstr  = items[2];
      if (res.destroy) res.destroy();

      var html = '';
      if (stdout.trim()) {
        html += '<pre style="margin:0 0 6px;color:#222">' + esc(stdout.trimEnd()) + '</pre>';
      }
      if (rhtml) {
        html += '<div style="overflow-x:auto">' + rhtml + '</div>';
      } else if (rstr && rstr !== 'None') {
        html += '<pre style="margin:0;color:#222">' + esc(rstr) + '</pre>';
      }
      html += figs;

      liveOut.innerHTML = html || '<span style="color:#888">✓ (no output)</span>';
      btn.innerHTML = '&#9654; Run';
      btn.disabled  = false;
      btn.style.background = '#e65100';
      status.textContent   = '✓ done';
      setTimeout(function(){ status.textContent = ''; }, 3000);

    }).catch(function (err) {
      var msg = err.message || String(err);
      // Show only the traceback part if available (cut off Pyodide boilerplate)
      var tbStart = msg.indexOf('Traceback');
      if (tbStart !== -1) msg = msg.slice(tbStart);
      liveOut.innerHTML = '<pre style="color:#c62828;margin:0">' + esc(msg) + '</pre>';
      btn.innerHTML = '&#9654; Run';
      btn.disabled  = false;
      btn.style.background = '#e65100';
      status.textContent   = '✗ error';
      setTimeout(function(){ status.textContent = ''; }, 5000);
    });
  }

  // ── CodeMirror editors ────────────────────────────────────────────────────
  function initEditors() {
    editorList.forEach(function (e) {
      e.cm = CodeMirror(e.host, {
        value:          e.code,
        mode:           'python',
        theme:          'monokai',
        lineNumbers:    true,
        indentUnit:     4,
        tabSize:        4,
        indentWithTabs: false,
        viewportMargin: Infinity,
        extraKeys: {
          'Shift-Enter': function () { runCell(e); },
          'Tab': function (cm) {
            cm.somethingSelected()
              ? cm.indentSelection('add')
              : cm.replaceSelection('    ', 'end');
          },
        },
      });
    });
  }

  // ── Bootstrap: CodeMirror + Pyodide ──────────────────────────────────────
  loadCSS(CM_CDN + 'codemirror.min.css');
  loadCSS(CM_CDN + 'theme/monokai.min.css');

  // Inject minimal table styles for DataFrame HTML output
  loadCSS('data:text/css,' + encodeURIComponent([
    '.cell_input table{border-collapse:collapse;font-size:.85em;margin:4px 0}',
    '.cell_input th,.cell_input td{border:1px solid #ccc;padding:4px 10px;text-align:right}',
    '.cell_input th{background:#f5f5f5;font-weight:600}',
    '.cell_input tr:nth-child(even){background:#fafafa}',
  ].join('')));

  loadScript(CM_CDN + 'codemirror.min.js', function () {
    loadScript(CM_CDN + 'mode/python/python.min.js', initEditors);
  });

  function startPyodide() {
    setBadge('⏳ Loading Python (first visit ~30s)…', '#555', false);

    loadPyodide({ indexURL: PYODIDE_CDN })
      .then(function (py) {
        pyodide = py;
        setBadge('⏳ Installing packages…', '#555', false);
        return pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);
      })
      .then(function () {
        setBadge('⏳ Setting up environment…', '#555', false);
        var csvUrl = siteRoot() + 'lite/files/flawed_dataset.csv';
        pyodide.globals.set('_csv_url', csvUrl);
        return pyodide.runPythonAsync(`
import matplotlib, builtins
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from collections import Counter
import math, io, base64

_cell_ns = {
    '__builtins__': builtins,
    'pd': pd, 'np': np, 'plt': plt,
    'Counter': Counter, 'math': math,
    'io': io, 'base64': base64,
}

# Override plt.show() so student code runs without warnings and figures stay open
# for our capture loop to pick them up after each cell executes.
plt.show = lambda *a, **kw: None

# Pre-fetch the dataset so cells that do pd.read_csv('flawed_dataset.csv') work
from pyodide.http import pyfetch
try:
    _r = await pyfetch(_csv_url)
    _raw = await _r.bytes()
    with open('flawed_dataset.csv', 'wb') as _f:
        _f.write(_raw)
except Exception as _e:
    print('Note: could not fetch flawed_dataset.csv —', _e)
`);
      })
      .then(function () {
        kernelReady = true;
        setBadge('✓ Python ready', '#2e7d32', true);
      })
      .catch(function (e) {
        var msg = (e && e.message) ? e.message.split('\n')[0] : 'Unknown error';
        setBadge('✗ ' + msg, '#c62828', false);
        badge.title = String(e);
      });
  }

  loadScript(
    PYODIDE_CDN + 'pyodide.js',
    startPyodide,
    function () {
      setBadge('✗ Could not load Pyodide CDN', '#c62828', false);
      badge.title = 'Failed to fetch: ' + PYODIDE_CDN + 'pyodide.js';
    }
  );

}); // end DOMContentLoaded
