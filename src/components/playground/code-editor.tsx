import { useRef, useEffect, useState } from 'react'
import { EditorState, Compartment } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { indentWithTab } from '@codemirror/commands'
import styles from './code-editor.module.css'

interface CodeEditorProps {
    code: string
    language: 'tsx' | 'ts' | 'css'
    onChange: (code: string) => void
}

function getLanguageExtension(lang: 'tsx' | 'ts' | 'css') {
    if (lang === 'css') return css()
    return javascript({ jsx: lang === 'tsx', typescript: true })
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

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<EditorView | null>(null)
    const langCompartment = useRef(new Compartment())
    const themeCompartment = useRef(new Compartment())
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange
    const isDark = useIsDark()

    // Track whether we're programmatically updating the doc
    const isUpdatingRef = useRef(false)

    useEffect(() => {
        if (!containerRef.current) return

        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                langCompartment.current.of(getLanguageExtension(language)),
                themeCompartment.current.of(isDark ? oneDark : []),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged && !isUpdatingRef.current) {
                        onChangeRef.current(update.state.doc.toString())
                    }
                }),
                EditorView.theme({
                    '&': { height: '100%', fontSize: '13px' },
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

    // Dynamically switch dark/light theme
    useEffect(() => {
        const view = viewRef.current
        if (!view) return

        view.dispatch({
            effects: themeCompartment.current.reconfigure(isDark ? oneDark : []),
        })
    }, [isDark])

    // Update document when code changes externally (e.g., file tab switch, reset)
    useEffect(() => {
        const view = viewRef.current
        if (!view) return

        const currentDoc = view.state.doc.toString()
        if (currentDoc !== code) {
            isUpdatingRef.current = true
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: code },
            })
            isUpdatingRef.current = false
        }
    }, [code])

    // Reconfigure language when it changes (file tab switch)
    useEffect(() => {
        const view = viewRef.current
        if (!view) return

        view.dispatch({
            effects: langCompartment.current.reconfigure(getLanguageExtension(language)),
        })
    }, [language])

    return <div ref={containerRef} className={styles.editor} />
}
