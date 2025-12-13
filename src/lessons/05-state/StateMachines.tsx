export default function StateMachines() {
  return (
    <div>
      <h1>State Machines</h1>
      <p>
        State machines provide a structured way to manage complex state transitions. They make your
        app's behavior predictable and easier to reason about.
      </p>

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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Key Concepts:</h3>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Advantages:</h3>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Perfect For:</h3>
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
  )
}
