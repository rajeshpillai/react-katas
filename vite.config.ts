import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
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
                // Split CodeMirror (used by both playground and read-only source
                // viewer) from sucrase + the language packs only the playground
                // needs, so clicking "Source Code" doesn't force-download the
                // ~200KB transpiler the user never invokes.
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'codemirror': [
                        'codemirror',
                        '@codemirror/state',
                        '@codemirror/view',
                        '@codemirror/lang-javascript',
                        '@codemirror/theme-one-dark',
                    ],
                    'playground-runtime': [
                        'sucrase',
                        '@codemirror/lang-css',
                        '@codemirror/commands',
                    ],
                },
            },
        },
    },
})
