import { useEffect, useRef, useState } from 'react'
import type { ConsoleMessage } from './playground-types'
import styles from './console-panel.module.css'

interface ConsolePanelProps {
    messages: ConsoleMessage[]
    onClear: () => void
}

const METHOD_LABEL: Record<ConsoleMessage['method'], string> = {
    log: 'log',
    info: 'info',
    warn: 'warn',
    error: 'error',
    debug: 'debug',
}

export function ConsolePanel({ messages, onClear }: ConsolePanelProps) {
    const [collapsed, setCollapsed] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom on new message (when expanded)
    useEffect(() => {
        if (collapsed || !listRef.current) return
        listRef.current.scrollTop = listRef.current.scrollHeight
    }, [messages, collapsed])

    const totalCount = messages.length
    const errorCount = messages.filter((m) => m.method === 'error').length
    const warnCount = messages.filter((m) => m.method === 'warn').length

    return (
        <div className={`${styles.panel} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.header}>
                <button
                    className={styles.toggle}
                    onClick={() => setCollapsed((v) => !v)}
                    aria-expanded={!collapsed}
                    aria-label={collapsed ? 'Expand console' : 'Collapse console'}
                >
                    <span className={styles.chevron}>{collapsed ? '▸' : '▾'}</span>
                    <span className={styles.title}>Console</span>
                    {totalCount > 0 && (
                        <span className={styles['count-group']}>
                            <span className={styles['count-total']}>{totalCount}</span>
                            {errorCount > 0 && (
                                <span className={`${styles.badge} ${styles['badge-error']}`}>
                                    {errorCount}
                                </span>
                            )}
                            {warnCount > 0 && (
                                <span className={`${styles.badge} ${styles['badge-warn']}`}>
                                    {warnCount}
                                </span>
                            )}
                        </span>
                    )}
                </button>
                {totalCount > 0 && !collapsed && (
                    <button
                        className={styles.clear}
                        onClick={onClear}
                        aria-label="Clear console"
                    >
                        Clear
                    </button>
                )}
            </div>

            {!collapsed && (
                <div className={styles.list} ref={listRef}>
                    {totalCount === 0 ? (
                        <div className={styles.empty}>
                            console.log() output appears here.
                        </div>
                    ) : (
                        messages.map((m) => (
                            <div
                                key={m.id}
                                className={`${styles.entry} ${styles[`entry-${m.method}`]}`}
                            >
                                <span className={styles['entry-method']}>
                                    {METHOD_LABEL[m.method]}
                                </span>
                                <span className={styles['entry-args']}>
                                    {m.args.join(' ')}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
