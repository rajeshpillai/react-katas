import { Diagram } from './diagram'

/**
 * Plain Context re-renders every consumer when the value changes.
 * useContextSelector subscribes each consumer to a slice — only the
 * subscribers whose slice actually changed re-render.
 */
export function ContextSelectorsDiagram() {
    return (
        <Diagram
            title="Context Selectors — fine-grained subscriptions"
            caption="Plain Context: change the count, every consumer re-renders. With selectors: change the count, only the count consumer re-renders. UserBadge and ThemeBadge stay flat."
            viewBox="0 0 720 320"
        >
            {/* Store box at top */}
            <rect x="220" y="20" width="280" height="76" rx="10" className="box-accent" />
            <text x="360" y="46" textAnchor="middle" className="label">{'createStore({ user, count, theme })'}</text>
            <text x="360" y="64" textAnchor="middle" className="label-mono">subscribe(listener)</text>
            <text x="360" y="82" textAnchor="middle" className="label-accent">EXTERNAL STORE</text>

            {/* Three consumers with selectors */}
            {[
                { x: 30, label: 'UserBadge', slice: 's => s.user', renders: 'renders only when user changes' },
                { x: 270, label: 'CountBadge', slice: 's => s.count', renders: 'climbs on count bumps' },
                { x: 510, label: 'ThemeBadge', slice: 's => s.theme', renders: 'flat unless theme toggles' },
            ].map(({ x, label, slice, renders }, i) => (
                <g key={i}>
                    <rect x={x} y="170" width="200" height="100" rx="8" className="box" />
                    <text x={x + 14} y="194" className="label">{`<${label} />`}</text>
                    <text x={x + 14} y="216" className="label-mono">useSelector({slice})</text>
                    <text x={x + 14} y="252" className="label-muted">{renders}</text>
                </g>
            ))}

            {/* Arrows from store to each consumer (selector-filtered) */}
            {[130, 370, 610].map((x, i) => (
                <path
                    key={i}
                    d={`M 360 96 Q 360 130, ${x} 170`}
                    className="arrow-accent"
                    markerEnd="url(#arrowhead-accent)"
                />
            ))}

            <text x="360" y="298" textAnchor="middle" className="label-muted">
                Each consumer subscribes to its own slice — independent re-render scope
            </text>
        </Diagram>
    )
}
