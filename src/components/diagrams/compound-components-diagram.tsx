import { Diagram } from './diagram'

/**
 * Visualises shared state flowing from a Compound parent through Context
 * to its named subcomponents.
 */
export function CompoundComponentsDiagram() {
    return (
        <Diagram
            title="Compound Components — Context flow"
            caption="The parent owns shared state and exposes it through Context. Named children subscribe via useContext, so the consumer composes structure freely without prop-drilling."
            viewBox="0 0 720 300"
        >
            {/* Outer Accordion box */}
            <rect x="20" y="40" width="680" height="240" rx="10" className="box-accent" />
            <text x="40" y="68" className="label">{'<Accordion>'}</text>
            <text x="40" y="86" className="label-mono">openIndex · setOpenIndex</text>
            <text x="40" y="104" className="label-accent">CONTEXT.PROVIDER</text>

            {/* Three Item children */}
            {[120, 320, 520].map((x, i) => (
                <g key={i}>
                    <rect x={x} y="130" width="180" height="120" rx="8" className="box" />
                    <text x={x + 14} y="154" className="label">{'<Accordion.Item>'}</text>

                    <rect x={x + 14} y="172" width="152" height="28" rx="4" className="box-muted" />
                    <text x={x + 24} y="190" className="label-mono">{'<Header>'}</text>

                    <rect x={x + 14} y="208" width="152" height="28" rx="4" className="box-muted" />
                    <text x={x + 24} y="226" className="label-mono">{'<Panel>'}</text>
                </g>
            ))}

            {/* Arrows from Context to each child */}
            {[210, 410, 610].map((x, i) => (
                <path
                    key={i}
                    d={`M 360 110 Q 360 120, ${x} 130`}
                    className="arrow-accent"
                    markerEnd="url(#arrowhead-accent)"
                />
            ))}

            <text x="360" y="276" textAnchor="middle" className="label-muted">
                useContext reads shared state — no props needed
            </text>
        </Diagram>
    )
}
