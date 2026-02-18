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

export function PlaygroundLayout({ config }: { config: PlaygroundConfig }) {
    const entryFile = config.entryFile || 'App.tsx'
    const height = config.height || 400

    // Build initial files map
    const buildFilesMap = () => new Map(config.files.map((f) => [f.name, f.code]))
    const initialFiles = useRef(buildFilesMap())
    const [files, setFiles] = useState(buildFilesMap)
    const [activeFile, setActiveFile] = useState(entryFile)
    const [runtimeErrors, setRuntimeErrors] = useState<PlaygroundError[]>([])

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

    return (
        <div className={styles.layout}>
            <div className={styles.editorPane}>
                <FileTabBar
                    files={fileNames}
                    activeFile={activeFile}
                    onSelectFile={setActiveFile}
                    onReset={handleReset}
                />
                <div className={styles.editorBody}>
                    <CodeEditor
                        code={currentCode}
                        language={currentLang}
                        onChange={handleCodeChange}
                    />
                </div>
            </div>
            <div className={styles.previewPane}>
                <div className={styles.previewHeader}>Preview</div>
                <Preview
                    iframeDoc={iframeDoc}
                    height={height}
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
        </div>
    )
}
