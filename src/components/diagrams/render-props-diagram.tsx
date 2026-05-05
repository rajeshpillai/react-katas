import { Diagram } from './diagram'

/**
 * Render-prop component owns the logic, calls children-as-function with the
 * computed value. Multiple consumers each render their own UI from the same
 * source.
 */
export function RenderPropsDiagram() {
    return (
        <Diagram
            title="Render Props — one source, many UIs"
            caption="<Mouse> tracks the position once and hands it to whatever the children function returns. Same logic powers any number of differently-shaped consumers."
            viewBox="0 0 720 300"
        >
            {/* Source component on the left */}
            <rect x="30" y="100" width="180" height="100" rx="10" className="box-accent" />
            <text x="48" y="130" className="label">{'<Mouse>'}</text>
            <text x="48" y="152" className="label-mono">useState(pos)</text>
            <text x="48" y="170" className="label-mono">useEffect(...)</text>
            <text x="48" y="190" className="label-accent">CHILDREN(pos)</text>

            {/* Three consumers on the right */}
            {[
                { y: 50, label: 'Crosshair' },
                { y: 130, label: 'Badge' },
                { y: 210, label: 'Quadrant' },
            ].map(({ y, label }, i) => (
                <g key={i}>
                    <rect x="500" y={y} width="190" height="60" rx="8" className="box" />
                    <text x="514" y={y + 26} className="label">{`(pos) => <${label} />`}</text>
                    <text x="514" y={y + 46} className="label-mono">renders its own UI</text>

                    {/* Arrow from Mouse to consumer */}
                    <path
                        d={`M 210 150 Q 350 ${y + 30}, 500 ${y + 30}`}
                        className="arrow-accent"
                        markerEnd="url(#arrowhead-accent)"
                    />
                </g>
            ))}

            <text x="350" y="290" textAnchor="middle" className="label-muted">
                children(pos) — pos flows from one source to many shapes
            </text>
        </Diagram>
    )
}
