/**
 * interactive-cells.js
 *
 * Transforms Jupyter Book code cells into editable, runnable cells powered by
 * Pyodide (WebAssembly Python).  Kernel loads automatically in the background.
 * Students can edit any cell and click "Run" to execute — no server required.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Guard against double-execution (Jupyter Book auto-includes all _static/*.js)
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
    var parts = window.location.pathname.split('/');
    parts.pop();
    var depth = parts.filter(Boolean).length;
    for (var i = 0; i < depth; i++) parts.pop();
    return window.location.origin + (parts.join('/') || '') + '/';
  }

  // ── Status badge ─────────────────────────────────────────────────────────
  var badge = document.createElement('div');
  Object.assign(badge.style, {
    position: 'fixed', bottom: '14px', right: '14px', zIndex: '9999',
    padding: '5px 14px', borderRadius: '20px',
    fontWeight: '600', fontSize: '0.78rem', color: '#fff',
    background: '#555', boxShadow: '0 2px 8px rgba(0,0,0,.3)',
    transition: 'opacity .5s',
  });
  badge.textContent = '⏳ Loading runtime…';
  document.body.appendChild(badge);

  var pyodide = null, kernelReady = false;

  function setBadge(text, color, autohide) {
    badge.style.opacity = '1';
    badge.style.background = color;
    badge.textContent = text;
    if (autohide) setTimeout(function () { badge.style.opacity = '0'; }, 4000);
  }

  // ── Wire each code cell ──────────────────────────────────────────────────
  var editorList = [];

  document.querySelectorAll('.cell_input').forEach(function (cell) {
    var pre = cell.querySelector('pre');
    if (!pre) return;

    var code = pre.textContent;
    pre.style.display = 'none';

    var cmWrap = document.createElement('div');
    cmWrap.style.cssText = 'border:1px solid #d0d0d0;border-radius:4px;overflow:hidden;font-size:.9em;';
    cell.insertBefore(cmWrap, pre);

    var runBtn = document.createElement('button');
    runBtn.innerHTML = '&#9654;&nbsp;Run';
    runBtn.style.cssText = [
      'display:inline-block', 'margin-top:6px',
      'background:#e65100', 'color:#fff',
      'border:none', 'border-radius:4px',
      'padding:4px 16px', 'cursor:pointer',
      'font-size:.82rem', 'font-weight:700',
    ].join(';');
    cell.appendChild(runBtn);

    var liveOut = document.createElement('div');
    liveOut.style.cssText = [
      'display:none', 'margin-top:6px', 'padding:8px 12px',
      'border-left:3px solid #e65100', 'background:#fffde7',
      'font-family:monospace', 'font-size:.88em',
      'white-space:pre-wrap', 'overflow-x:auto',
    ].join(';');
    cell.appendChild(liveOut);

    var entry = { host: cmWrap, code: code, cm: null, btn: runBtn, liveOut: liveOut };
    editorList.push(entry);
    runBtn.addEventListener('click', function () { runCell(entry); });
  });

  // ── Execute a cell ───────────────────────────────────────────────────────
  function runCell(entry) {
    var liveOut = entry.liveOut, btn = entry.btn;
    liveOut.style.display = 'block';

    if (!kernelReady) {
      liveOut.innerHTML = '<span style="color:#666">⏳ Kernel still loading — try again in a moment.</span>';
      return;
    }

    var code = entry.cm ? entry.cm.getValue() : entry.code;
    btn.textContent = '⏳'; btn.disabled = true;
    liveOut.innerHTML = '<span style="color:#888">Running…</span>';

    var stdout = '';
    pyodide.setStdout({ batched: function (s) { stdout += s + '\n'; } });
    pyodide.setStderr({ batched: function (s) { stdout += '⚠ ' + s + '\n'; } });
    pyodide.globals.set('_cell_code', code);

    pyodide.runPythonAsync(`
import ast as _a, io as _io, base64 as _b64

_tree = _a.parse(_cell_code)
_is_expr = bool(_tree.body) and isinstance(_tree.body[-1], _a.Expr)

if _is_expr:
    _head = _a.unparse(_a.Module(_tree.body[:-1], type_ignores=[]))
    _tail = _a.unparse(_tree.body[-1].value)
    if _head.strip():
        exec(compile(_head, '<cell>', 'exec'), _cell_ns)
    _rv = eval(compile(_tail, '<cell>', 'eval'), _cell_ns)
else:
    exec(compile(_cell_code, '<cell>', 'exec'), _cell_ns)
    _rv = None

import matplotlib.pyplot as _plt
_figs = ''
for _fn in list(_plt.get_fignums()):
    _fig = _plt.figure(_fn)
    _buf = _io.BytesIO()
    _fig.savefig(_buf, format='png', bbox_inches='tight', dpi=120)
    _buf.seek(0)
    _figs += '<img src="data:image/png;base64,' + _b64.b64encode(_buf.read()).decode() + '" style="max-width:100%;display:block;margin:4px 0">'
    _plt.close(_fig)

_rhtml = _rv._repr_html_() if hasattr(_rv, '_repr_html_') else None
_rstr  = repr(_rv)         if (_rv is not None and not _rhtml) else None
(_figs, _rhtml, _rstr)
`).then(function (res) {
      var items = res.toJs();
      var figs  = items[0] || '';
      var rhtml = items[1];
      var rstr  = items[2];
      if (res.destroy) res.destroy();

      var html = '';
      if (stdout.trim()) html += '<pre style="margin:0 0 4px">' + esc(stdout.trimEnd()) + '</pre>';
      if (rhtml)         html += rhtml;
      else if (rstr)     html += '<pre style="margin:0">' + esc(rstr) + '</pre>';
      html += figs;

      liveOut.innerHTML = html || '<span style="color:#888">✓ (no output)</span>';
      btn.innerHTML = '&#9654;&nbsp;Run'; btn.disabled = false;

    }).catch(function (err) {
      liveOut.innerHTML = '<pre style="color:#c62828;margin:0">' + esc(err.message) + '</pre>';
      btn.innerHTML = '&#9654;&nbsp;Run'; btn.disabled = false;
    });
  }

  // ── CodeMirror editors ────────────────────────────────────────────────────
  function initEditors() {
    editorList.forEach(function (e) {
      e.cm = CodeMirror(e.host, {
        value: e.code,
        mode: 'python',
        theme: 'monokai',
        lineNumbers: true,
        indentUnit: 4, tabSize: 4, indentWithTabs: false,
        viewportMargin: Infinity,
        extraKeys: {
          Tab: function (cm) {
            cm.somethingSelected()
              ? cm.indentSelection('add')
              : cm.replaceSelection('    ', 'end');
          },
        },
      });
    });
  }

  // ── Bootstrap: load CodeMirror + Pyodide ─────────────────────────────────
  loadCSS(CM_CDN + 'codemirror.min.css');
  loadCSS(CM_CDN + 'theme/monokai.min.css');

  loadScript(CM_CDN + 'codemirror.min.js', function () {
    loadScript(CM_CDN + 'mode/python/python.min.js', initEditors);
  });

  function startPyodide() {
    setBadge('⏳ Starting Python…', '#555', false);
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
import math

_cell_ns = {
    '__builtins__': builtins,
    'pd': pd, 'np': np, 'plt': plt,
    'Counter': Counter, 'math': math,
}

from pyodide.http import pyfetch
try:
    _r = await pyfetch(_csv_url)
    _d = await _r.bytes()
    with open('flawed_dataset.csv', 'wb') as _f:
        _f.write(_d)
except Exception:
    pass
`);
      })
      .then(function () {
        kernelReady = true;
        setBadge('✓ Python ready', '#2e7d32', true);
      })
      .catch(function (e) {
        setBadge('✗ ' + (e.message || 'Kernel failed'), '#c62828', false);
        badge.title = String(e);
      });
  }

  loadScript(
    PYODIDE_CDN + 'pyodide.js',
    startPyodide,
    function () {
      // pyodide.js failed to load from CDN
      setBadge('✗ Failed to load Pyodide', '#c62828', false);
      badge.title = 'Could not fetch ' + PYODIDE_CDN + 'pyodide.js';
    }
  );

}); // end DOMContentLoaded
