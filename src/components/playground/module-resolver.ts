/**
 * Builds a self-contained CJS bundle string from transpiled virtual files.
 * The bundle runs inside an iframe that has access to React via window.parent.
 */
export function buildBundle(
    transpiledFiles: Map<string, string>,
    entryFile: string
): string {
    // Module registry + resolver
    const runtime = `
var __modules = {};
var __moduleCache = {};

function require(name) {
    if (name === 'react') {
        return window.parent.__PLAYGROUND_REACT__;
    }
    if (name === 'react/jsx-runtime' || name === 'react/jsx-dev-runtime') {
        return window.parent.__PLAYGROUND_JSX_RUNTIME__;
    }
    if (name === 'react-dom' || name === 'react-dom/client') {
        return window.parent.__PLAYGROUND_REACT_DOM__;
    }

    var resolved = __resolveFile(name);
    if (!resolved) throw new Error('Module not found: ' + name);
    if (__moduleCache[resolved]) return __moduleCache[resolved].exports;

    var module = { exports: {} };
    __moduleCache[resolved] = module;
    __modules[resolved](module, module.exports, require);
    return module.exports;
}

function __resolveFile(name) {
    var clean = name.replace(/^\\.\\/?/, '');
    var candidates = [clean, clean + '.tsx', clean + '.ts', clean + '.jsx', clean + '.js'];
    for (var i = 0; i < candidates.length; i++) {
        if (__modules[candidates[i]]) return candidates[i];
    }
    return null;
}
`

    // Register each file as a module factory
    let moduleDefinitions = ''
    for (const [fileName, code] of transpiledFiles) {
        moduleDefinitions += `__modules[${JSON.stringify(fileName)}] = function(module, exports, require) {\n${code}\n};\n`
    }

    // Entry point: mount the default export into #root
    const entryExecution = `
var React = window.parent.__PLAYGROUND_REACT__;
var ReactDOM = window.parent.__PLAYGROUND_REACT_DOM__;

var __entry = require(${JSON.stringify(entryFile)});
var App = __entry.default || __entry;

var ErrorBoundary = (function() {
    function EB(props) {
        React.Component.call(this, props);
        this.state = { error: null };
    }
    EB.prototype = Object.create(React.Component.prototype);
    EB.prototype.constructor = EB;
    EB.getDerivedStateFromError = function(error) { return { error: error }; };
    EB.prototype.componentDidCatch = function(error, info) {
        window.parent.postMessage({
            type: 'PLAYGROUND_RUNTIME_ERROR',
            message: error.message,
            stack: (error.stack || '') + '\\n' + (info.componentStack || '')
        }, '*');
    };
    EB.prototype.render = function() {
        if (this.state.error) {
            return React.createElement('pre', {
                style: { color: '#ef4444', padding: '16px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }
            }, this.state.error.message);
        }
        return this.props.children;
    };
    return EB;
})();

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));
window.parent.postMessage({ type: 'PLAYGROUND_READY' }, '*');
`

    return runtime + moduleDefinitions + entryExecution
}

/**
 * Builds the complete iframe HTML document from a JS bundle and CSS.
 */
export function buildIframeDoc(jsBundle: string, cssCode: string): string {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;padding:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#1a1a2e;background:#fff;color-scheme:light}
pre{background:#f3f4f6;color:#1f2937;padding:12px;border-radius:6px;overflow-x:auto;margin-bottom:8px;font-size:13px}
code{font-size:13px}
body.dark{color:#e2e8f0;background:#1a1a2e;color-scheme:dark}
body.dark pre{background:#1e293b;color:#e2e8f0}
body.dark code{color:#e2e8f0}
${cssCode}
</style>
</head>
<body>
<div id="root"></div>
<script>
function __applyTheme(dark){
if(dark){document.body.classList.add('dark');document.querySelector('meta[name=color-scheme]').content='dark'}
else{document.body.classList.remove('dark');document.querySelector('meta[name=color-scheme]').content='light'}
}
__applyTheme(window.parent.document.documentElement.dataset.theme==='dark');
new MutationObserver(function(){__applyTheme(window.parent.document.documentElement.dataset.theme==='dark')}).observe(window.parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});

// Console capture: proxy log/info/warn/error/debug to parent window
(function(){
    function serialize(value, seen, depth){
        seen = seen || [];
        depth = depth || 0;
        if (depth > 4) return '[…]';
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';
        var t = typeof value;
        if (t === 'string') return value;
        if (t === 'number' || t === 'boolean' || t === 'bigint') return String(value);
        if (t === 'symbol') return value.toString();
        if (t === 'function') return '[Function' + (value.name ? ': ' + value.name : '') + ']';
        if (value instanceof Error) return value.name + ': ' + value.message;
        if (typeof Element !== 'undefined' && value instanceof Element) {
            return '<' + value.tagName.toLowerCase() + (value.id ? ' id="' + value.id + '"' : '') + '>';
        }
        if (seen.indexOf(value) !== -1) return '[Circular]';
        seen = seen.concat([value]);
        if (Array.isArray(value)) {
            var items = value.slice(0, 50).map(function(v){ return serialize(v, seen, depth + 1); });
            return '[' + items.join(', ') + (value.length > 50 ? ', …' : '') + ']';
        }
        if (t === 'object') {
            try {
                var keys = Object.keys(value).slice(0, 30);
                var pairs = keys.map(function(k){
                    return k + ': ' + serialize(value[k], seen, depth + 1);
                });
                return '{ ' + pairs.join(', ') + (Object.keys(value).length > 30 ? ', …' : '') + ' }';
            } catch (e) {
                return '[Object]';
            }
        }
        return String(value);
    }
    var __orig = {};
    ['log','info','warn','error','debug'].forEach(function(method){
        __orig[method] = console[method] ? console[method].bind(console) : function(){};
        console[method] = function(){
            var args = Array.prototype.slice.call(arguments);
            try {
                window.parent.postMessage({
                    type: 'PLAYGROUND_CONSOLE',
                    method: method,
                    args: args.map(function(a){ return serialize(a); }),
                    timestamp: Date.now()
                }, '*');
            } catch(e) {}
            __orig[method].apply(null, args);
        };
    });
})();

window.onerror = function(msg, source, line, col, error) {
    window.parent.postMessage({
        type: 'PLAYGROUND_RUNTIME_ERROR',
        message: String(msg),
        stack: error ? error.stack : ''
    }, '*');
};
try {
${jsBundle}
} catch(e) {
    window.parent.postMessage({
        type: 'PLAYGROUND_RUNTIME_ERROR',
        message: e.message,
        stack: e.stack || ''
    }, '*');
}
</script>
</body>
</html>`
}
