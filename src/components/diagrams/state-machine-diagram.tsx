import { Diagram } from './diagram'

/**
 * State machine: a finite set of states with explicitly enumerated
 * transitions. Boolean flags can produce impossible combinations (loading
 * AND error AND success); a state machine makes them unrepresentable.
 */
export function StateMachineDiagram() {
    return (
        <Diagram
            title="State Machine — states + named transitions"
            caption="Four states, four transitions. Anything not enumerated is impossible — there's no way to be 'loading and error at the same time'. The reducer is just a switch over (state, event) pairs."
            viewBox="0 0 720 300"
        >
            {/* Idle state (top-left) */}
            <ellipse cx="120" cy="100" rx="70" ry="38" className="box" />
            <text x="120" y="96" textAnchor="middle" className="label">idle</text>
            <text x="120" y="114" textAnchor="middle" className="label-mono">initial</text>

            {/* Loading state (top-middle) */}
            <ellipse cx="360" cy="100" rx="80" ry="38" className="box-accent" />
            <text x="360" y="96" textAnchor="middle" className="label">loading</text>
            <text x="360" y="114" textAnchor="middle" className="label-mono">in flight</text>

            {/* Success state (top-right) */}
            <ellipse cx="600" cy="100" rx="70" ry="38" className="box" />
            <text x="600" y="96" textAnchor="middle" className="label">success</text>
            <text x="600" y="114" textAnchor="middle" className="label-mono">{'data'}</text>

            {/* Error state (bottom-right) */}
            <ellipse cx="600" cy="240" rx="70" ry="38" className="box" />
            <text x="600" y="236" textAnchor="middle" className="label">error</text>
            <text x="600" y="254" textAnchor="middle" className="label-mono">{'error msg'}</text>

            {/* Transitions */}
            {/* idle -> loading: LOAD */}
            <path d="M 190 100 L 280 100" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <text x="235" y="92" textAnchor="middle" className="label-accent">LOAD</text>

            {/* loading -> success: SUCCESS */}
            <path d="M 440 92 L 530 92" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <text x="485" y="84" textAnchor="middle" className="label-accent">SUCCESS</text>

            {/* loading -> error: ERROR */}
            <path d="M 410 138 L 540 220" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <text x="445" y="200" textAnchor="middle" className="label-accent">ERROR</text>

            {/* success -> idle: RESET */}
            <path d="M 600 138 Q 660 170, 660 240" className="arrow" markerEnd="url(#arrowhead)" />
            <text x="690" y="190" textAnchor="middle" className="label-muted">RESET</text>

            {/* error -> idle: RESET */}
            <path d="M 530 240 Q 350 240, 200 138" className="arrow" markerEnd="url(#arrowhead)" />
            <text x="350" y="260" textAnchor="middle" className="label-muted">RESET</text>

            <text x="360" y="296" textAnchor="middle" className="label-muted">
                Reducer is a function (state, event) → state — undefined transitions return current state
            </text>
        </Diagram>
    )
}
