import { Diagram } from './diagram'

/**
 * Behavioral hooks extract logic that should outlive any specific UI.
 * One useClickOutside hook serves Dropdown, Tooltip, and Popover — none
 * of which need to know how click-outside detection works.
 */
export function BehavioralHooksDiagram() {
    return (
        <Diagram
            title="Behavioral Hooks — logic without UI coupling"
            caption="useClickOutside is just a behavior — wires up event listeners, exposes a ref. Each consumer renders its own UI; the click-outside concern is centralized in one hook that all of them call."
            viewBox="0 0 720 300"
        >
            {/* Hook box (left) */}
            <rect x="40" y="100" width="220" height="100" rx="10" className="box-accent" />
            <text x="60" y="128" className="label">{'useClickOutside(ref, fn)'}</text>
            <text x="60" y="150" className="label-mono">addEventListener('pointerdown')</text>
            <text x="60" y="170" className="label-mono">cleanup on unmount</text>
            <text x="60" y="190" className="label-accent">BEHAVIOR</text>

            {/* Three consumers (right) */}
            {[
                { y: 30, label: 'Dropdown', detail: 'open menu, dismiss outside' },
                { y: 120, label: 'Tooltip', detail: 'hover/focus tip, dismiss outside' },
                { y: 210, label: 'Popover', detail: 'rich popover, dismiss outside' },
            ].map(({ y, label, detail }, i) => (
                <g key={i}>
                    <rect x="460" y={y} width="220" height="74" rx="8" className="box" />
                    <text x="478" y={y + 26} className="label">{`<${label} />`}</text>
                    <text x="478" y={y + 46} className="label-mono">useClickOutside(ref, close)</text>
                    <text x="478" y={y + 64} className="label-muted">{detail}</text>

                    {/* Arrow from hook to consumer */}
                    <path
                        d={`M 260 150 Q 360 ${y + 37}, 460 ${y + 37}`}
                        className="arrow-accent"
                        markerEnd="url(#arrowhead-accent)"
                    />
                </g>
            ))}

            <text x="360" y="290" textAnchor="middle" className="label-muted">
                Same behavior, three different UIs — the hook owns the wiring, the components own the look
            </text>
        </Diagram>
    )
}
