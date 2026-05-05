import { useRef, useEffect, useState } from 'react'
import { EditorState, Compartment } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import styles from './source-code-viewer.module.css'

interface SourceCodeViewerProps {
    code: string
}

function useIsDark(): boolean {
    const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setDark(document.documentElement.dataset.theme === 'dark')
        })
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        return () => observer.disconnect()
    }, [])

    return dark
}

export function SourceCodeViewer({ code }: SourceCodeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)
    const themeCompartment = useRef(new Compartment())
    const isDark = useIsDark()

    useEffect(() => {
        if (!containerRef.current) return

        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                javascript({ jsx: true, typescript: true }),
                themeCompartment.current.of(isDark ? oneDark : []),
                EditorState.readOnly.of(true),
                EditorView.editable.of(false),
                EditorView.theme({
                    '&': { fontSize: '13px' },
                    '.cm-scroller': { overflow: 'auto' },
                }),
            ],
        })

        const view = new EditorView({ state, parent: containerRef.current })
        viewRef.current = view

        return () => {
            view.destroy()
            viewRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const view = viewRef.current
        if (!view) return
        view.dispatch({
            effects: themeCompartment.current.reconfigure(isDark ? oneDark : []),
        })
    }, [isDark])

    useEffect(() => {
        const view = viewRef.current
        if (!view) return
        const currentDoc = view.state.doc.toString()
        if (currentDoc !== code) {
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: code },
            })
        }
    }, [code])

    return <div ref={containerRef} className={styles.viewer} />
}

export default SourceCodeViewer
