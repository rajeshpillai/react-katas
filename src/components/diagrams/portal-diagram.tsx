import { Diagram } from './diagram'

/**
 * Portals make the React component tree and the DOM tree diverge: a child
 * lives in a parent's JSX (so receives Context, events, etc.) but is
 * rendered into a different DOM node — usually document.body — to escape
 * overflow:hidden / transform / z-index contexts.
 */
export function PortalDiagram() {
    return (
        <Diagram
            title="Portal — React tree stays, DOM tree diverges"
            caption="<Modal> is still a child of <Page> in the React tree (so context, refs, event bubbling all behave normally), but its DOM node is mounted under document.body — escaping the parent's overflow:hidden clipping."
            viewBox="0 0 720 320"
        >
            {/* React tree column */}
            <text x="30" y="40" className="label-muted">REACT TREE</text>
            <rect x="30" y="60" width="280" height="220" rx="10" className="box" />
            <text x="46" y="84" className="label">{'<App>'}</text>

            <rect x="50" y="98" width="240" height="170" rx="6" className="box" />
            <text x="66" y="120" className="label">{'<Page>'}</text>

            <rect x="70" y="134" width="200" height="120" rx="6" className="box-muted" />
            <text x="86" y="156" className="label">{'<Card>'} <tspan className="label-mono">overflow: hidden</tspan></text>

            <rect x="90" y="172" width="160" height="68" rx="6" className="box-accent" />
            <text x="108" y="196" className="label">{'<Modal />'}</text>
            <text x="108" y="216" className="label-mono">createPortal()</text>
            <text x="108" y="232" className="label-mono">children pass-through</text>

            {/* Arrow crossing to DOM column */}
            <path
                d="M 250 206 C 360 206, 380 206, 410 80"
                className="arrow-accent"
                markerEnd="url(#arrowhead-accent)"
            />

            {/* DOM tree column */}
            <text x="410" y="40" className="label-muted">DOM TREE</text>
            <rect x="410" y="60" width="280" height="220" rx="10" className="box" />
            <text x="426" y="84" className="label">{'<body>'}</text>

            <rect x="430" y="98" width="240" height="100" rx="6" className="box" />
            <text x="446" y="120" className="label-mono">{'<div id="root">'}</text>
            <text x="446" y="138" className="label-mono">{'  App / Page / Card …'}</text>
            <text x="446" y="156" className="label-mono">  (no Modal here)</text>
            <text x="446" y="186" className="label-mono">{'</div>'}</text>

            <rect x="430" y="208" width="240" height="60" rx="6" className="box-accent" />
            <text x="446" y="230" className="label-mono">{'<div>'}</text>
            <text x="446" y="248" className="label">{'  Modal renders here'}</text>
            <text x="446" y="262" className="label-mono">{'</div>'}</text>

            <text x="360" y="304" textAnchor="middle" className="label-muted">
                Same component instance — different mount point
            </text>
        </Diagram>
    )
}
