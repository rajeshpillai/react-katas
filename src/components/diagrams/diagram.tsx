import type { ReactNode } from 'react'
import styles from './diagram.module.css'

interface DiagramProps {
    title?: string
    caption?: string
    viewBox?: string
    children: ReactNode
}

/**
 * Wrapper for inline-SVG pattern diagrams. Provides:
 *   - a labelled container with theme-aware bg/border
 *   - a captioned region below
 *   - a marker-id arrowhead via <defs> that adapts to dark mode
 *
 * Children are SVG primitives. Use the `box`, `arrow`, `label` etc. classes
 * from diagram.module.css for theme-aware styling.
 */
export function Diagram({ title, caption, viewBox = '0 0 720 320', children }: DiagramProps) {
    return (
        <figure className={styles.diagram}>
            {title && <span className={styles['diagram-title']}>{title}</span>}
            <svg
                className={styles['svg-root']}
                viewBox={viewBox}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label={title}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,8 L7,4 z" fill="currentColor" />
                    </marker>
                    <marker
                        id="arrowhead-accent"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L0,8 L7,4 z" fill="var(--color-primary-500)" />
                    </marker>
                </defs>
                {children}
            </svg>
            {caption && <span className={styles['diagram-caption']}>{caption}</span>}
        </figure>
    )
}
