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
                            {v.label}
                        </button>
                    )
                })}
            </div>
            {active.description && (
                <p className={styles.description}>{active.description}</p>
            )}
        </div>
    )
}
