import type { PlaygroundError } from './playground-types'
import styles from './error-display.module.css'

interface ErrorDisplayProps {
    errors: PlaygroundError[]
    onDismiss: () => void
}

export function ErrorDisplay({ errors, onDismiss }: ErrorDisplayProps) {
    if (errors.length === 0) return null

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>
                    {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
                </span>
                <button className={styles.dismiss} onClick={onDismiss}>
                    Clear
                </button>
            </div>
            <div className={styles.list}>
                {errors.map((error, i) => (
                    <div key={i} className={styles.error}>
                        <span className={styles.badge}>
                            {error.type === 'transpile' ? 'Syntax' : 'Runtime'}
                        </span>
                        {error.type === 'transpile' && error.line != null && (
                            <span className={styles.location}>
                                {error.fileName}:{error.line}
                                {error.column != null ? `:${error.column}` : ''}
                            </span>
                        )}
                        <span className={styles.message}>{error.message}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
