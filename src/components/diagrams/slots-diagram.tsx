import { Diagram } from './diagram'

/**
 * Slots: a component receives multiple ReactNode props (e.g. header, body,
 * footer) instead of one children blob. Each slot has a fixed semantic role,
 * so the component can compose its own layout while consumers fill content.
 */
export function SlotsDiagram() {
    return (
        <Diagram
            title="Slots — named regions instead of a children blob"
            caption="The consumer fills each named slot with content. The component owns the layout — header on top, footer pinned at bottom — without losing the consumer's freedom to put any JSX in each region."
            viewBox="0 0 720 280"
        >
            {/* Consumer call site on the left */}
            <rect x="30" y="30" width="280" height="220" rx="10" className="box" />
            <text x="50" y="56" className="label-muted">CONSUMER CALL SITE</text>
            <text x="50" y="84" className="label-mono">{'<Card'}</text>
            <text x="70" y="104" className="label-mono">{'header={<UserName />}'}</text>
            <text x="70" y="124" className="label-mono">{'footer={<SaveBtn />}'}</text>
            <text x="50" y="144" className="label-mono">{'>'}</text>
            <text x="70" y="166" className="label-mono">{'<p>Body content...</p>'}</text>
            <text x="50" y="186" className="label-mono">{'</Card>'}</text>

            {/* Arrow to rendered card */}
            <path d="M 312 140 L 380 140" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />

            {/* Rendered Card with three slot regions on the right */}
            <rect x="400" y="30" width="280" height="220" rx="10" className="box-accent" />
            <text x="420" y="56" className="label-muted">RENDERED CARD</text>

            <rect x="420" y="74" width="240" height="46" rx="6" className="box" />
            <text x="440" y="92" className="label-accent">HEADER SLOT</text>
            <text x="440" y="112" className="label">{'<UserName />'}</text>

            <rect x="420" y="130" width="240" height="58" rx="6" className="box" />
            <text x="440" y="148" className="label-accent">CHILDREN (BODY)</text>
            <text x="440" y="170" className="label">Body content...</text>

            <rect x="420" y="198" width="240" height="40" rx="6" className="box" />
            <text x="440" y="216" className="label-accent">FOOTER SLOT</text>
            <text x="440" y="232" className="label">{'<SaveBtn />'}</text>
        </Diagram>
    )
}
