import { Diagram } from './diagram'

/**
 * Without asChild: <Button> wraps <a> in a <button>, producing invalid HTML
 * and broken keyboard semantics. With asChild + Slot: Button merges its
 * styles and props onto the consumer's element instead of wrapping it.
 */
export function AsChildDiagram() {
    return (
        <Diagram
            title="asChild — merge props onto the child instead of wrapping it"
            caption="Wrapping <a> in <button> is invalid HTML and breaks right-click / keyboard semantics. asChild uses Slot to clone the child element with Button's props applied — the <a> stays the rendered element."
            viewBox="0 0 720 290"
        >
            {/* WITHOUT asChild — left side */}
            <text x="180" y="36" textAnchor="middle" className="label-muted">WITHOUT asChild</text>
            <rect x="40" y="50" width="280" height="200" rx="10" className="box-muted" />

            <text x="60" y="78" className="label">{'<Button>'}</text>
            <rect x="60" y="92" width="240" height="140" rx="6" className="box" />
            <text x="76" y="116" className="label-mono">{'<button>     ← extra wrapper'}</text>
            <rect x="80" y="128" width="200" height="80" rx="6" className="box" />
            <text x="100" y="152" className="label-mono">{'<a href="...">'}</text>
            <text x="100" y="172" className="label">     Open docs</text>
            <text x="100" y="192" className="label-mono">{'</a>'}</text>
            <text x="76" y="222" className="label-mono">{'</button>'}</text>

            {/* WITH asChild — right side */}
            <text x="540" y="36" textAnchor="middle" className="label-muted">WITH asChild</text>
            <rect x="400" y="50" width="280" height="200" rx="10" className="box-accent" />

            <text x="420" y="78" className="label">{'<Button asChild>'}</text>
            <rect x="420" y="92" width="240" height="140" rx="6" className="box-accent" />
            <text x="436" y="116" className="label-accent">SLOT MERGES PROPS</text>
            <rect x="440" y="128" width="200" height="80" rx="6" className="box" />
            <text x="460" y="152" className="label-mono">{'<a href="..." style={btn}>'}</text>
            <text x="460" y="172" className="label">     Open docs</text>
            <text x="460" y="192" className="label-mono">{'</a>'}</text>
            <text x="436" y="222" className="label-mono">{'</Button>'}</text>

            <text x="360" y="276" textAnchor="middle" className="label-muted">
                Same Button styles, but the consumer's element semantics survive
            </text>
        </Diagram>
    )
}
