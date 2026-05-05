import type { PlaygroundVariant } from '@components/playground'
import styles from './variant-selector.module.css'

interface VariantSelectorProps {
    variants: PlaygroundVariant[]
    activeId: string
    onChange: (id: string) => void
}

export function VariantSelector({ variants, activeId, onChange }: VariantSelectorProps) {
    const active = variants.find((v) => v.id === activeId) ?? variants[0]

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <span className={styles.label}>Implementation</span>
                <div
                    className={styles.segments}
                    role="tablist"
                    aria-label="Implementation variant"
                >
                    {variants.map((v) => {
                        const isActive = v.id === active.id
                        return (
                            <button
                                key={v.id}
                                role="tab"
                                aria-selected={isActive}
                                className={`${styles.segment} ${isActive ? styles.active : ''}`}
                                onClick={() => onChange(v.id)}
                            >
                                {isActive && <span className={styles.dot} aria-hidden="true" />}
                                {v.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            {active.description && (
                <p className={styles.description}>
                    <span className={styles['desc-prefix']}>Showing:</span>{' '}
                    {active.description}
                </p>
            )}
        </div>
    )
}
