import { useState, useEffect, useRef, useCallback } from 'react'
import { transpileFile } from './transpiler'
import { buildBundle, buildIframeDoc } from './module-resolver'
import type { PlaygroundError } from './playground-types'

interface ExecutionResult {
    iframeDoc: string
    errors: PlaygroundError[]
}

/**
 * Debounces code changes, transpiles all files, builds the iframe document.
 * Returns the latest valid iframeDoc and any errors.
 */
export function usePlaygroundExecution(
    files: Map<string, string>,
    entryFile: string,
    debounceMs: number = 300
): ExecutionResult {
    const [result, setResult] = useState<ExecutionResult>({
        iframeDoc: '',
        errors: [],
    })
    const versionRef = useRef(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastValidDocRef = useRef('')

    const execute = useCallback(() => {
        const version = ++versionRef.current
        const errors: PlaygroundError[] = []
        const transpiledFiles = new Map<string, string>()
        let cssCode = ''

        for (const [fileName, code] of files) {
            if (fileName.endsWith('.css')) {
                cssCode += code + '\n'
                continue
            }

            const { code: transpiled, error } = transpileFile(code, fileName)
            if (error) {
                errors.push(error)
            } else {
                transpiledFiles.set(fileName, transpiled)
            }
        }

        // Stale check
        if (version !== versionRef.current) return

        if (errors.length > 0) {
            // Keep the last valid render, just show errors
            setResult({ iframeDoc: lastValidDocRef.current, errors })
            return
        }

        const jsBundle = buildBundle(transpiledFiles, entryFile)
        const iframeDoc = buildIframeDoc(jsBundle, cssCode)
        lastValidDocRef.current = iframeDoc
        setResult({ iframeDoc, errors: [] })
    }, [files, entryFile])

    // Debounced execution
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(execute, debounceMs)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [execute, debounceMs])

    return result
}
