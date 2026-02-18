import { useState, useCallback, useRef, useEffect } from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as jsxRuntime from 'react/jsx-runtime'
import type { PlaygroundConfig, PlaygroundError } from './playground-types'
import { usePlaygroundExecution } from './use-playground-execution'
import { CodeEditor } from './code-editor'
import { FileTabBar } from './file-tab-bar'
import { Preview } from './preview'
import { ErrorDisplay } from './error-display'
import styles from './playground-layout.module.css'

// Expose React to iframe via window globals (once)
function ensureReactGlobals() {
    const win = window as unknown as Record<string, unknown>
    if (!win.__PLAYGROUND_REACT__) {
        win.__PLAYGROUND_REACT__ = { ...React, default: React }
        win.__PLAYGROUND_REACT_DOM__ = ReactDOM
        win.__PLAYGROUND_JSX_RUNTIME__ = jsxRuntime
    }
}

type MaximizedPane = 'editor' | 'preview' | null

function useSplitter(initialPercent = 50) {
    const [splitPercent, setSplitPercent] = useState(initialPercent)
    const layoutRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        dragging.current = true
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'

        const onMouseMove = (ev: MouseEvent) => {
            if (!dragging.current || !layoutRef.current) return
            const rect = layoutRef.current.getBoundingClientRect()
            const pct = ((ev.clientX - rect.left) / rect.width) * 100
            setSplitPercent(Math.min(80, Math.max(20, pct)))
        }

        const onMouseUp = () => {
            dragging.current = false
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [])

    return { splitPercent, setSplitPercent, layoutRef, onMouseDown }
}

export function PlaygroundLayout({ config }: { config: PlaygroundConfig }) {
    const entryFile = config.entryFile || 'App.tsx'
    const height = config.height || 400

    // Build initial files map
    const buildFilesMap = () => new Map(config.files.map((f) => [f.name, f.code]))
    const initialFiles = useRef(buildFilesMap())
    const [files, setFiles] = useState(buildFilesMap)
    const [activeFile, setActiveFile] = useState(entryFile)
    const [runtimeErrors, setRuntimeErrors] = useState<PlaygroundError[]>([])
    const [maximized, setMaximized] = useState<MaximizedPane>(null)
    const { splitPercent, setSplitPercent, layoutRef, onMouseDown } = useSplitter(50)

    const toggleMaximize = useCallback((pane: 'editor' | 'preview') => {
        setMaximized((prev) => {
            const next = prev === pane ? null : pane
            if (next === null) setSplitPercent(50)
            return next
        })
    }, [setSplitPercent])

    // Expose React globals for iframe
    useEffect(ensureReactGlobals, [])

    // Transpile + build iframe doc
    const { iframeDoc, errors: transpileErrors } = usePlaygroundExecution(
        files,
        entryFile
    )

    const allErrors = [...transpileErrors, ...runtimeErrors]

    const handleCodeChange = useCallback(
        (code: string) => {
            setFiles((prev) => {
                const next = new Map(prev)
                next.set(activeFile, code)
                return next
            })
            // Clear runtime errors when code changes
            setRuntimeErrors([])
        },
        [activeFile]
    )

    const handleReset = useCallback(() => {
        setFiles(new Map(initialFiles.current))
        setRuntimeErrors([])
    }, [])

    const handleRuntimeError = useCallback((error: PlaygroundError) => {
        setRuntimeErrors((prev) => [...prev, error])
    }, [])

    const handleReady = useCallback(() => {
        setRuntimeErrors([])
    }, [])

    const handleDismissErrors = useCallback(() => {
        setRuntimeErrors([])
    }, [])

    const currentCode = files.get(activeFile) || ''
    const currentLang =
        config.files.find((f) => f.name === activeFile)?.language || 'tsx'
    const fileNames = config.files.map((f) => f.name)

    const showEditor = maximized !== 'preview'
    const showPreview = maximized !== 'editor'
    const showSplitter = showEditor && showPreview

    const editorStyle = maximized === 'editor'
        ? { flex: 1 }
        : showSplitter
            ? { width: `${splitPercent}%`, flexShrink: 0 }
            : {}

    const previewStyle = maximized === 'preview'
        ? { flex: 1 }
        : showSplitter
            ? { width: `${100 - splitPercent}%`, flexShrink: 0 }
            : {}

    return (
        <div className={styles.layout} ref={layoutRef}>
            {showEditor && (
                <div className={styles.editorPane} style={editorStyle}>
                    <FileTabBar
                        files={fileNames}
                        activeFile={activeFile}
                        onSelectFile={setActiveFile}
                        onReset={handleReset}
                        isMaximized={maximized === 'editor'}
                        onToggleMaximize={() => toggleMaximize('editor')}
                    />
                    <div className={styles.editorBody}>
                        <CodeEditor
                            code={currentCode}
                            language={currentLang}
                            onChange={handleCodeChange}
                        />
                    </div>
                </div>
            )}
            {showSplitter && (
                <div
                    className={styles.splitter}
                    onMouseDown={onMouseDown}
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="Resize code and preview panels"
                />
            )}
            {showPreview && (
                <div className={styles.previewPane} style={previewStyle}>
                    <div className={styles.previewHeader}>
                        <span>Preview</span>
                        <button
                            className={styles.maximizeBtn}
                            onClick={() => toggleMaximize('preview')}
                            title={maximized === 'preview' ? 'Restore' : 'Maximize'}
                            aria-label={maximized === 'preview' ? 'Restore preview' : 'Maximize preview'}
                        >
                            {maximized === 'preview' ? '\u29C9' : '\u2922'}
                        </button>
                    </div>
                    <Preview
                        iframeDoc={iframeDoc}
                        height={maximized === 'preview' ? height + 200 : height}
                        onError={handleRuntimeError}
                        onReady={handleReady}
                    />
                    {allErrors.length > 0 && (
                        <ErrorDisplay
                            errors={allErrors}
                            onDismiss={handleDismissErrors}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
