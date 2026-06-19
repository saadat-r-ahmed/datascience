/**
 * interactive-cells.js
 *
 * Transforms Jupyter Book code cells into editable, runnable cells powered by
 * Pyodide (WebAssembly Python). Kernel loads automatically in the background.
 * - ▶ Run button or Shift+Enter to execute
 * - Hide/Show toggle to collapse code block
 * - Auto-height editor (no scroll), max 150ch wide
 * - Output styled for both light and dark mode
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

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
  function injectStyle(css) {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function siteRoot() {
    var parts = window.location.pathname.split('/').filter(function (p) { return p !== ''; });
    parts.pop();
    var depth = parts.length;
    for (var i = 0; i < depth; i++) parts.pop();
    return window.location.origin + '/';
  }

  // ── Inject component styles ──────────────────────────────────────────────
  injectStyle([
    // Auto-expanding CodeMirror (no fixed height, no vertical scroll)
    '.ic-editor .CodeMirror { height: auto !important; min-height: 2em; }',
    '.ic-editor .CodeMirror-scroll { overflow-y: hidden !important; overflow-x: auto !important; }',
    '.ic-editor .CodeMirror-vscrollbar { display: none !important; }',

    // Output area: neutral background + correct text in light AND dark mode
    '.ic-output {',
    '  margin-top: 6px;',
    '  padding: 8px 14px;',
    '  border-left: 3px solid #e65100;',
    '  border-radius: 0 4px 4px 0;',
    '  font-family: monospace;',
    '  font-size: 0.88em;',
    '  white-space: pre-wrap;',
    '  overflow-x: auto;',
    '  background: #f4f4f4;',
    '  color: #1a1a1a;',
    '}',
    // PyData Sphinx Theme dark mode uses html[data-theme="dark"]
    'html[data-theme="dark"] .ic-output {',
    '  background: #1e1e2e;',
    '  color: #cdd6f4;',
    '}',

    // Tables inside output
    '.ic-output table { border-collapse: collapse; font-size: .85em; margin: 4px 0; color: inherit; }',
    '.ic-output th, .ic-output td { border: 1px solid rgba(128,128,128,.4); padding: 3px 10px; text-align: right; }',
    '.ic-output th { font-weight: 600; background: rgba(128,128,128,.12); }',
    '.ic-output tr:nth-child(even) { background: rgba(128,128,128,.06); }',

    // Pre inside output — inherit color, no extra margins
    '.ic-output pre { margin: 0; color: inherit; background: transparent; padding: 0; }',

    // Error text in output
    '.ic-error { color: #e06c75; }',
    'html[data-theme="dark"] .ic-error { color: #f38ba8; }',

    // Hide/Show button
    '.ic-toggle {',
    '  background: none;',
    '  border: 1px solid rgba(128,128,128,.4);',
    '  border-radius: 4px;',
    '  padding: 2px 10px;',
    '  font-size: 0.74rem;',
    '  cursor: pointer;',
    '  color: #888;',
    '  line-height: 1.4;',
    '}',
    '.ic-toggle:hover { background: rgba(128,128,128,.1); }',
  ].join('\n'));

  // ── Status badge (fixed bottom-right) ────────────────────────────────────
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
  });
  badge.textContent = '⏳ Loading Python…';
  document.body.appendChild(badge);

  var pyodide = null, kernelReady = false;

  function setBadge(text, color, autohide) {
    badge.style.opacity  = '1';
    badge.style.background = color;
    badge.textContent    = text;
    if (autohide) setTimeout(function () { badge.style.opacity = '0'; }, 4000);
  }

  // ── Wire each code cell ──────────────────────────────────────────────────
  var editorList = [];

  document.querySelectorAll('.cell_input').forEach(function (cell) {
    var pre = cell.querySelector('pre');
    if (!pre) return;

    var code = pre.textContent.replace(/^\n/, '');

    // Hide the highlight wrapper (direct child of .cell_input)
    var highlightBlock = cell.querySelector('.highlight-ipython3') ||
                         cell.querySelector('.highlight') ||
                         pre.parentNode;
    highlightBlock.style.display = 'none';

    // ── Top bar: Hide/Show toggle (right-aligned) ──────────────────────────
    var topBar = document.createElement('div');
    topBar.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:3px;';

    var toggleBtn = document.createElement('button');
    toggleBtn.className   = 'ic-toggle';
    toggleBtn.textContent = '▲ Hide code';
    topBar.appendChild(toggleBtn);
    cell.insertBefore(topBar, highlightBlock);

    // ── CodeMirror host (max 150ch wide) ───────────────────────────────────
    var cmWrap = document.createElement('div');
    cmWrap.className = 'ic-editor';
    cmWrap.style.cssText = [
      'border:1px solid #d0d0d0',
      'border-radius:4px',
      'overflow:hidden',
      'font-size:0.88em',
      'line-height:1.5',
      'max-width:min(100%, 150ch)',
    ].join(';');
    cell.insertBefore(cmWrap, highlightBlock);

    // ── Bottom toolbar: Run + cell status ─────────────────────────────────
    var toolbar = document.createElement('div');
    toolbar.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:6px;';

    var runBtn = document.createElement('button');
    runBtn.innerHTML = '&#9654; Run';
    runBtn.style.cssText = [
      'background:#e65100', 'color:#fff', 'border:none',
      'border-radius:4px', 'padding:4px 18px',
      'cursor:pointer', 'font-size:0.82rem', 'font-weight:700',
      'transition:background .15s',
    ].join(';');
    runBtn.onmouseover = function () { if (!runBtn.disabled) runBtn.style.background = '#bf360c'; };
    runBtn.onmouseout  = function () { if (!runBtn.disabled) runBtn.style.background = '#e65100'; };

    var cellStatus = document.createElement('span');
    cellStatus.style.cssText = 'font-size:0.78rem;color:#888;';

    toolbar.appendChild(runBtn);
    toolbar.appendChild(cellStatus);
    cell.insertBefore(toolbar, highlightBlock);

    // ── Live output panel ──────────────────────────────────────────────────
    var liveOut = document.createElement('div');
    liveOut.className    = 'ic-output';
    liveOut.style.display = 'none';
    cell.insertBefore(liveOut, highlightBlock);

    // ── Hide/Show toggle logic ─────────────────────────────────────────────
    var collapsed = false;
    toggleBtn.addEventListener('click', function () {
      collapsed = !collapsed;
      cmWrap.style.display   = collapsed ? 'none' : '';
      toolbar.style.display  = collapsed ? 'none' : '';
      // Only show output when not collapsed AND it has content
      if (collapsed) {
        liveOut.style.display = 'none';
      } else if (liveOut._hasContent) {
        liveOut.style.display = 'block';
      }
      toggleBtn.textContent = collapsed ? '▼ Show code' : '▲ Hide code';
    });

    var entry = {
      host:    cmWrap,
      code:    code,
      cm:      null,
      btn:     runBtn,
      status:  cellStatus,
      liveOut: liveOut,
    };
    editorList.push(entry);
    runBtn.addEventListener('click', function () { runCell(entry); });
  });

  // ── Execute a cell ───────────────────────────────────────────────────────
  function runCell(entry) {
    var liveOut = entry.liveOut, btn = entry.btn, status = entry.status;

    liveOut.style.display = 'block';
    liveOut._hasContent   = true;

    if (!kernelReady) {
      liveOut.innerHTML = '⏳ Kernel still loading — try again in a moment.';
      return;
    }

    var code = entry.cm ? entry.cm.getValue() : entry.code;
    if (!code.trim()) {
      liveOut.innerHTML = '<span style="opacity:.6">✓ (empty cell)</span>';
      return;
    }

    btn.innerHTML = '⏳'; btn.disabled = true; btn.style.background = '#aaa';
    status.textContent = 'Running…';
    liveOut.innerHTML  = '<span style="opacity:.6">Running…</span>';

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
        _figs += '<pre>Figure error: ' + str(_fe) + '</pre>'
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
        html += '<pre>' + esc(stdout.trimEnd()) + '</pre>';
      }
      if (rhtml) {
        html += '<div style="overflow-x:auto">' + rhtml + '</div>';
      } else if (rstr && rstr !== 'None') {
        html += '<pre>' + esc(rstr) + '</pre>';
      }
      html += figs;

      liveOut.innerHTML = html || '<span style="opacity:.6">✓ (no output)</span>';
      btn.innerHTML = '&#9654; Run'; btn.disabled = false; btn.style.background = '#e65100';
      status.textContent = '✓ done';
      setTimeout(function () { status.textContent = ''; }, 3000);

    }).catch(function (err) {
      var msg = err.message || String(err);
      var tbStart = msg.indexOf('Traceback');
      if (tbStart !== -1) msg = msg.slice(tbStart);
      liveOut.innerHTML = '<pre class="ic-error">' + esc(msg) + '</pre>';
      btn.innerHTML = '&#9654; Run'; btn.disabled = false; btn.style.background = '#e65100';
      status.textContent = '✗ error';
      setTimeout(function () { status.textContent = ''; }, 5000);
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
        lineWrapping:   false,
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

# No-op so student cells can call plt.show() without warnings;
# figures stay open and are captured by our render loop.
plt.show = lambda *a, **kw: None

from pyodide.http import pyfetch
try:
    _r   = await pyfetch(_csv_url)
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
