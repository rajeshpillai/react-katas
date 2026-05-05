import { Diagram } from './diagram'

/**
 * Higher-Order Component: a function that takes a Component and returns a
 * new Component with extra behavior wrapped around it.
 */
export function HocDiagram() {
    return (
        <Diagram
            title="Higher-Order Component — wrap, don't repeat"
            caption="withAuth() is a function from component to component. The wrapped component renders the auth check; the inner component never sees auth concerns."
            viewBox="0 0 720 220"
        >
            {/* Plain component */}
            <rect x="30" y="80" width="160" height="60" rx="8" className="box" />
            <text x="110" y="108" textAnchor="middle" className="label">{'Dashboard'}</text>
            <text x="110" y="126" textAnchor="middle" className="label-mono">plain</text>

            {/* Arrow + label */}
            <path d="M 200 110 L 280 110" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <text x="240" y="100" textAnchor="middle" className="label-accent">withAuth()</text>

            {/* withAuth wrapper */}
            <rect x="290" y="50" width="220" height="120" rx="10" className="box-accent" />
            <text x="400" y="78" textAnchor="middle" className="label">{'withAuth(Dashboard)'}</text>
            <text x="400" y="96" textAnchor="middle" className="label-mono">if (!isAuthed) return …</text>

            {/* Inner Dashboard nested inside withAuth */}
            <rect x="320" y="110" width="160" height="46" rx="6" className="box" />
            <text x="400" y="138" textAnchor="middle" className="label">{'<Dashboard />'}</text>

            {/* Arrow to enhanced component */}
            <path d="M 520 110 L 600 110" className="arrow" markerEnd="url(#arrowhead)" />

            <rect x="610" y="80" width="100" height="60" rx="8" className="box" />
            <text x="660" y="108" textAnchor="middle" className="label">{'Authed'}</text>
            <text x="660" y="126" textAnchor="middle" className="label-mono">consumed</text>

            <text x="360" y="200" textAnchor="middle" className="label-muted">
                Component → HOC(Component) → enhanced Component (same shape, more behavior)
            </text>
        </Diagram>
    )
}
