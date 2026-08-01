import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    // Production builds are deployed to GitHub Pages under the repo sub-path
    // (algorisys-oss.github.io/react-katas/), so assets must resolve against
    // '/react-katas/'. Dev server stays at root. Client routing is hash-based
    // (see router.tsx), so this only affects static asset URLs, not routes.
    base: command === 'build' ? '/react-katas/' : '/',
    plugins: [
        react({
            // Enable React 19 features
            jsxRuntime: 'automatic',
        }),
        // @ts-expect-error rollup-plugin-visualizer's plugin type is from rollup, not vite
        visualizer({
            // Don't auto-open stats.html on every build — open it manually when
            // investigating bundle size. Output: ./stats.html in repo root.
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@lessons': path.resolve(__dirname, './src/lessons'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@router': path.resolve(__dirname, './src/router'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                // Split sucrase (the ~200KB transpiler only the playground
                // invokes) from CodeMirror, which both the playground and the
                // read-only source viewer need — so clicking "Source Code"
                // doesn't force-download the transpiler.
                //
                // The whole CodeMirror family (@codemirror/*, @lezer/*, and its
                // small runtime deps) MUST stay in one chunk. Splitting any part
                // of it out creates a circular import between the two chunks —
                // the `codemirror` package imports @codemirror/commands, which
                // imports @codemirror/state — and circular ESM chunk imports
                // crash at runtime with "Cannot access 'X' before
                // initialization" (a TDZ error) when the lesson chunk loads.
                manualChunks(id) {
                    if (!id.includes('node_modules')) return
                    if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'
                    if (/node_modules\/(sucrase|ts-interface-checker|lines-and-columns|pirates)\//.test(id)) return 'playground-runtime'
                    if (/node_modules\/(codemirror|@codemirror|@lezer|style-mod|w3c-keyname|crelt)\//.test(id)) return 'codemirror'
                },
            },
        },
    },
}))
