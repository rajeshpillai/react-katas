import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundVariant } from '@components/playground'
import { StateMachineDiagram } from '@components/diagrams'
import sourceCode from './StateMachines.tsx?raw'

export const playgroundVariants: PlaygroundVariant[] = [
    {
        id: 'boolean-soup',
        label: 'Before — boolean flags',
        description:
            "isLoading, isError, isSuccess, isRetrying — four booleans for one async flow. Nothing prevents impossible combinations like isLoading=true and isError=true at the same time, and bug-fixing means tracking which combo violated invariants.",
        files: [
            {
                name: 'App.tsx',
                language: 'tsx',
                code: `import { useState } from 'react'

export default function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [data, setData] = useState<string | null>(null)

    function load() {
        setIsLoading(true)
        setIsError(false)
        setIsSuccess(false)
        setData(null)
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
            setData('Hello!')
            // Forgot to clear isError? Forgot to reset previous data?
        }, 600)
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Boolean-flag state</h2>
            <button onClick={load} disabled={isLoading}>{isLoading ? 'Loading...' : 'Load'}</button>
            <p>flags: loading={String(isLoading)} error={String(isError)} success={String(isSuccess)}</p>
            {isError && <p>Error</p>}
            {isSuccess && <p>Data: {data}</p>}
        </div>
    )
}
`,
            },
        ],
        entryFile: 'App.tsx',
        height: 280,
    },
    {
        id: 'machine',
        label: 'After — explicit state machine',
        description:
            "One status field with a finite set of values: 'idle' | 'loading' | 'success' | 'error'. Impossible states are unrepresentable. The reducer enumerates the legal transitions.",
        files: [
            {
                name: 'App.tsx',
                language: 'tsx',
                code: `import { useReducer } from 'react'

type State =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: string }
    | { status: 'error'; error: string }

type Event =
    | { type: 'LOAD' }
    | { type: 'SUCCESS'; data: string }
    | { type: 'ERROR'; error: string }
    | { type: 'RESET' }

function transition(state: State, event: Event): State {
    switch (state.status) {
        case 'idle':
            if (event.type === 'LOAD') return { status: 'loading' }
            return state
        case 'loading':
            if (event.type === 'SUCCESS') return { status: 'success', data: event.data }
            if (event.type === 'ERROR') return { status: 'error', error: event.error }
            return state
        case 'success':
        case 'error':
            if (event.type === 'RESET') return { status: 'idle' }
            return state
    }
}

export default function App() {
    const [state, send] = useReducer(transition, { status: 'idle' })

    function load() {
        send({ type: 'LOAD' })
        setTimeout(() => send({ type: 'SUCCESS', data: 'Hello!' }), 600)
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>State machine</h2>
            <p>status: <strong>{state.status}</strong></p>
            {state.status === 'idle' && <button onClick={load}>Load</button>}
            {state.status === 'loading' && <p>Loading...</p>}
            {state.status === 'success' && (
                <>
                    <p>Data: {state.data}</p>
                    <button onClick={() => send({ type: 'RESET' })}>Reset</button>
                </>
            )}
            {state.status === 'error' && (
                <>
                    <p>Error: {state.error}</p>
                    <button onClick={() => send({ type: 'RESET' })}>Reset</button>
                </>
            )}
        </div>
    )
}
`,
            },
        ],
        entryFile: 'App.tsx',
        height: 280,
    },
    {
        id: 'rich',
        label: 'Original demo',
        description: "The kata's original state-machine playground.",
        files: [
            {
                name: 'App.tsx',
                language: 'tsx',
                code: `import { useReducer } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'
type Event = { type: 'FETCH' } | { type: 'SUCCESS'; data: string } | { type: 'ERROR'; error: string } | { type: 'RESET' }

interface MachineState {
    status: State
    data: string | null
    error: string | null
}

const transitions: Record<State, Partial<Record<Event['type'], State>>> = {
    idle: { FETCH: 'loading' },
    loading: { SUCCESS: 'success', ERROR: 'error' },
    success: { FETCH: 'loading', RESET: 'idle' },
    error: { FETCH: 'loading', RESET: 'idle' },
}

function reducer(state: MachineState, event: Event): MachineState {
    const nextStatus = transitions[state.status][event.type]
    if (!nextStatus) return state

    switch (event.type) {
        case 'FETCH':
            return { status: 'loading', data: null, error: null }
        case 'SUCCESS':
            return { status: 'success', data: event.data, error: null }
        case 'ERROR':
            return { status: 'error', data: null, error: event.error }
        case 'RESET':
            return { status: 'idle', data: null, error: null }
        default:
            return state
    }
}

const initialState: MachineState = { status: 'idle', data: null, error: null }

const colors: Record<State, string> = {
    idle: '#6b7280',
    loading: '#f59e0b',
    success: '#10b981',
    error: '#ef4444',
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const simulateFetch = () => {
        dispatch({ type: 'FETCH' })
        setTimeout(() => {
            if (Math.random() > 0.3) {
                dispatch({ type: 'SUCCESS', data: 'Data loaded at ' + new Date().toLocaleTimeString() })
            } else {
                dispatch({ type: 'ERROR', error: 'Network request failed' })
            }
        }, 1500)
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Traffic Light State Machine</h2>
            <p style={{ marginBottom: 16 }}>
                Demonstrates idle -> loading -> success/error transitions using useReducer.
            </p>

            <div style={{
                padding: 20,
                borderRadius: 8,
                border: '2px solid ' + colors[state.status],
                marginBottom: 16,
                textAlign: 'center',
            }}>
                <div style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: colors[state.status],
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 11,
                    textTransform: 'uppercase',
                }}>
                    {state.status}
                </div>
                {state.status === 'loading' && <p>Loading...</p>}
                {state.status === 'success' && <p style={{ color: colors.success }}>{state.data}</p>}
                {state.status === 'error' && <p style={{ color: colors.error }}>{state.error}</p>}
                {state.status === 'idle' && <p style={{ color: '#999' }}>Ready to fetch</p>}
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button
                    onClick={simulateFetch}
                    disabled={state.status === 'loading'}
                    style={{
                        padding: '8px 20px',
                        background: state.status === 'loading' ? '#ccc' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        cursor: state.status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                >
                    {state.status === 'loading' ? 'Loading...' : 'Fetch Data'}
                </button>
                {(state.status === 'success' || state.status === 'error') && (
                    <button
                        onClick={() => dispatch({ type: 'RESET' })}
                        style={{
                            padding: '8px 20px',
                            background: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                        }}
                    >
                        Reset
                    </button>
                )}
            </div>

            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--pg-muted)' }}>
                <strong>Valid transitions from "{state.status}":</strong>{' '}
                {Object.keys(transitions[state.status]).join(', ') || 'none'}
            </div>
        </div>
    )
}
`,
            },
        ],
        entryFile: 'App.tsx',
        height: 450,
    },
]

export default function StateMachines() {
  return (
    <LessonLayout title="State Machines" playgroundVariants={playgroundVariants} sourceCode={sourceCode}>
      <div>
      <p>
        State machines provide a structured way to manage complex state transitions. They make your
        app's behavior predictable and easier to reason about.
      </p>

      <StateMachineDiagram />

      {/* Section 1: What are State Machines */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What are State Machines?</h2>
        <p>
          A state machine is a model that defines a finite number of states and the transitions
          between them.
        </p>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Key Concepts:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>States:</strong> Possible conditions (idle, loading, success, error)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Events:</strong> Triggers for transitions (FETCH, SUCCESS, ERROR)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Transitions:</strong> Rules for moving between states
            </li>
            <li style={{ color: 'white' }}>
              <strong>Actions:</strong> Side effects during transitions
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Simple Example */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Simple State Machine Example</h2>

        <pre>
          <code>{`// Traffic light state machine
const states = {
  red: { TIMER: 'green' },
  green: { TIMER: 'yellow' },
  yellow: { TIMER: 'red' }
};

function reducer(state, event) {
  return states[state][event] || state;
}

// Usage
const [state, dispatch] = useReducer(reducer, 'red');
// dispatch('TIMER') -> transitions to next state`}</code>
        </pre>
      </section>

      {/* Section 3: Benefits */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Benefits of State Machines</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Advantages:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Impossible states are impossible
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Clear state transitions
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Easier to test and debug
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Self-documenting behavior
            </li>
            <li style={{ color: 'white' }}>Prevents edge case bugs</li>
          </ul>
        </div>
      </section>

      {/* Section 4: XState */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>XState Library</h2>
        <p>
          XState is a popular library for state machines and statecharts in JavaScript.
        </p>

        <pre>
          <code>{`import { createMachine } from 'xstate';

const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      }
    },
    success: {
      on: { FETCH: 'loading' }
    },
    error: {
      on: { RETRY: 'loading' }
    }
  }
});`}</code>
        </pre>
      </section>

      {/* Section 5: When to Use */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>When to Use State Machines</h2>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Perfect For:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Multi-step forms and wizards
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Authentication flows
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Data fetching with loading/error states
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Complex UI interactions
            </li>
            <li style={{ color: 'white' }}>Game logic and animations</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>State machines model finite states and transitions</li>
          <li>Make impossible states impossible</li>
          <li>Great for complex workflows and UI logic</li>
          <li>XState is the most popular library</li>
          <li>Improves code clarity and testability</li>
          <li>Consider for multi-step forms and auth flows</li>
        </ul>
      </section>
      </div>
    </LessonLayout>
  )
}
