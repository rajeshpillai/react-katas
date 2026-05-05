import { Diagram } from './diagram'

/**
 * Context lets a Provider expose a value to any descendant via useContext,
 * skipping intermediate components that would otherwise have to forward props.
 */
export function ContextDiagram() {
    return (
        <Diagram
            title="Context — value travels past intermediate components"
            caption="Without Context, every layer between Provider and Consumer has to forward the prop. With Context, intermediate components don't need to know the value exists; consumers read it directly."
            viewBox="0 0 720 320"
        >
            {/* Provider at top */}
            <rect x="240" y="20" width="240" height="58" rx="10" className="box-accent" />
            <text x="360" y="46" textAnchor="middle" className="label">{'<ThemeProvider value={...}>'}</text>
            <text x="360" y="64" textAnchor="middle" className="label-accent">CONTEXT.PROVIDER</text>

            {/* Layer 1: intermediate */}
            <rect x="280" y="110" width="160" height="40" rx="6" className="box-muted" />
            <text x="360" y="135" textAnchor="middle" className="label-mono">{'<Page>'}</text>

            {/* Layer 2: intermediate */}
            <rect x="280" y="170" width="160" height="40" rx="6" className="box-muted" />
            <text x="360" y="195" textAnchor="middle" className="label-mono">{'<Sidebar>'}</text>

            {/* Vertical thread (children pass-through) */}
            <line x1="360" y1="78" x2="360" y2="110" className="arrow" />
            <line x1="360" y1="150" x2="360" y2="170" className="arrow" />
            <line x1="360" y1="210" x2="360" y2="240" className="arrow" />

            {/* Two consumers at bottom */}
            <rect x="170" y="240" width="170" height="60" rx="8" className="box" />
            <text x="255" y="266" textAnchor="middle" className="label">{'<ThemeBadge />'}</text>
            <text x="255" y="284" textAnchor="middle" className="label-mono">useContext(Theme)</text>

            <rect x="380" y="240" width="170" height="60" rx="8" className="box" />
            <text x="465" y="266" textAnchor="middle" className="label">{'<ThemeToggle />'}</text>
            <text x="465" y="284" textAnchor="middle" className="label-mono">useContext(Theme)</text>

            {/* Bypass arrows from Provider directly to consumers */}
            <path d="M 280 50 C 120 50, 120 270, 170 270" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <path d="M 440 50 C 600 50, 600 270, 550 270" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />

            <text x="360" y="316" textAnchor="middle" className="label-muted">
                Consumers read the Provider's value directly — intermediates know nothing
            </text>
        </Diagram>
    )
}
