import { useState, useRef } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundVariant } from '@components/playground'

import sourceCode from './ControlledUncontrolled.tsx?raw'

export const playgroundVariants: PlaygroundVariant[] = [
  {
    id: 'broken',
    label: 'Before — value without onChange',
    description:
      'Try typing in the input. Nothing happens. The most common React form bug: setting `value` makes it controlled, but with no `onChange` the value can never change. React even warns about this in the console.',
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useState } from 'react'

export default function App() {
    const [name, setName] = useState('Ada')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h3>Read-only by accident</h3>
            <input
                type="text"
                value={name}
                placeholder="Try typing here..."
                style={{ width: '100%', padding: 8, fontSize: 14, marginBottom: 8, border: '1px solid var(--pg-card-border)', borderRadius: 6 }}
            />
            <p style={{ fontSize: 12, color: 'var(--pg-muted)' }}>
                React owns the value via the prop, but with no onChange we never tell React to update it.
                Result: the input refuses keystrokes.
            </p>
            <button onClick={() => setName('')}>
                External reset works (it changes state, which re-renders the input)
            </button>
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
    id: 'controlled',
    label: 'After — fully controlled',
    description:
      'value + onChange = controlled. React owns the source of truth, and any external state change (like the reset button) propagates to the input.',
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useState } from 'react'

export default function App() {
    const [name, setName] = useState('Ada')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h3>Controlled Input</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Try typing here..."
                style={{ width: '100%', padding: 8, fontSize: 14, marginBottom: 8, border: '1px solid var(--pg-card-border)', borderRadius: 6 }}
            />
            <p>Current value: <strong>{name || '(empty)'}</strong></p>
            <button onClick={() => setName('')}>Reset</button>
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
    id: 'uncontrolled',
    label: 'Alternative — uncontrolled',
    description:
      "Sometimes you don't need React to track every keystroke — let the DOM own the value, then read it on demand via a ref. Useful for one-shot reads on submit.",
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useRef, useState } from 'react'

export default function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [submitted, setSubmitted] = useState('')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h3>Uncontrolled Input</h3>
            <input
                ref={inputRef}
                type="text"
                defaultValue="Ada"
                placeholder="Type freely..."
                style={{ width: '100%', padding: 8, fontSize: 14, marginBottom: 8, border: '1px solid var(--pg-card-border)', borderRadius: 6 }}
            />
            <button onClick={() => setSubmitted(inputRef.current?.value ?? '')}>
                Read value
            </button>
            <p>Submitted: <strong>{submitted || '(none)'}</strong></p>
            <p style={{ fontSize: 12, color: 'var(--pg-muted)' }}>
                The DOM owns the value. React only reads it when we ask.
            </p>
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 280,
  },
]

export default function ControlledUncontrolled() {
  return (
    <LessonLayout title="Controlled vs Uncontrolled Components" playgroundVariants={playgroundVariants} sourceCode={sourceCode}>
      <div>
        <p>
          Learn the difference between controlled and uncontrolled components, and when to use each
          pattern for form inputs and other stateful elements.
        </p>

        {/* Section 1: Controlled Components */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Controlled Components</h2>
          <p>
            Controlled components have their state managed by React. The component's value is
            controlled by React state.
          </p>

          <pre>
            <code>{`function ControlledInput() {
      const [value, setValue] = useState('');

      return (
          <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
      );
      }`}</code>
          </pre>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Controlled Input Example:</h3>
            <ControlledInput />
          </div>
        </section>

        {/* Section 2: Uncontrolled Components */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Uncontrolled Components</h2>
          <p>
            Uncontrolled components store their own state internally. You access the value using a
            ref.
          </p>

          <pre>
            <code>{`function UncontrolledInput() {
      const inputRef = useRef(null);

      const handleSubmit = () => {
          console.log(inputRef.current.value);
      };

      return (
          <>
          <input ref={inputRef} defaultValue="Initial" />
          <button onClick={handleSubmit}>Submit</button>
          </>
      );
      }`}</code>
          </pre>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Uncontrolled Input Example:</h3>
            <UncontrolledInput />
          </div>
        </section>

        {/* Section 3: Comparison */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Controlled vs Uncontrolled</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)',
            }}
          >
            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--surface-primary)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>Controlled</h3>
              <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Pros:</p>
              <ul>
                <li>Full control over value</li>
                <li>Easy validation</li>
                <li>Instant feedback</li>
                <li>Conditional rendering</li>
              </ul>
              <p style={{ fontWeight: 'bold', marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                Cons:
              </p>
              <ul>
                <li>More code</li>
                <li>Re-renders on every keystroke</li>
              </ul>
            </div>

            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--surface-accent)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>Uncontrolled</h3>
              <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Pros:</p>
              <ul>
                <li>Less code</li>
                <li>Better performance</li>
                <li>Simpler for simple forms</li>
              </ul>
              <p style={{ fontWeight: 'bold', marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                Cons:
              </p>
              <ul>
                <li>Less control</li>
                <li>Harder validation</li>
                <li>No instant feedback</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: When to Use Each */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>When to Use Each Pattern</h2>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
              Use Controlled When:
            </h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                You need instant validation
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Conditional form fields
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Format input as user types
              </li>
              <li style={{ color: 'white' }}>Multiple inputs depend on each other</li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--color-info)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
              Use Uncontrolled When:
            </h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Simple form submission
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                File inputs (always uncontrolled)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Integrating with non-React code
              </li>
              <li style={{ color: 'white' }}>Performance is critical</li>
            </ul>
          </div>
        </section>

        {/* Hybrid / progressive control */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>The Hybrid Pattern (Progressive Control)</h2>
          <p>
            Library components rarely have the luxury of picking one mode. The same{' '}
            <code>&lt;Combobox&gt;</code>, <code>&lt;Tabs&gt;</code>, or <code>&lt;Dialog&gt;</code> needs to:
          </p>
          <ul>
            <li><strong>Just work</strong> when a consumer drops it in with no props (uncontrolled).</li>
            <li><strong>Be drivable</strong> when a consumer wires up <code>value</code> + <code>onChange</code> (controlled).</li>
            <li><strong>Switch cleanly</strong> between the two — typically by reading whether <code>value</code> was passed.</li>
          </ul>
          <p>
            This is the <em>progressive-control</em> pattern. Internally the component holds a fallback{' '}
            <code>useState</code>; externally it reports either the controlled prop (when present) or
            the internal state (when absent).
          </p>

          <pre style={{ background: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
            <code>{`function useControllableState<T>({
    value,             // controlled prop, or undefined
    defaultValue,      // initial value when uncontrolled
    onChange,          // optional change reporter
}: {
    value?: T
    defaultValue: T
    onChange?: (next: T) => void
}) {
    const isControlled = value !== undefined
    const [internal, setInternal] = useState<T>(defaultValue)

    const current = isControlled ? value : internal
    const setCurrent = (next: T) => {
        if (!isControlled) setInternal(next)
        onChange?.(next)
    }
    return [current, setCurrent] as const
}

// Inside <Combobox>
const [open, setOpen] = useControllableState({
    value: props.open,
    defaultValue: false,
    onChange: props.onOpenChange,
})`}</code>
          </pre>

          <h3>Rules</h3>
          <ul>
            <li>
              <strong>Lock the mode at first render.</strong> Switching from uncontrolled to controlled
              (or back) mid-life is a footgun — React warns about it for native inputs. In your own
              components, either tolerate the switch explicitly or warn in development.
            </li>
            <li>
              <strong>Always call <code>onChange</code>.</strong> Whether the component is controlled
              or not, the consumer wants to react to value changes. The hook above reports both
              modes uniformly.
            </li>
            <li>
              <strong>Document the contract.</strong> "If you pass <code>value</code> you must pass{' '}
              <code>onChange</code>" — otherwise the consumer gets a permanently-frozen prop, which
              is the same bug as the "value without onChange" Before variant above.
            </li>
            <li>
              <strong>Don't expose the internal state setter.</strong> Consumers who want fine-grained
              control should use the controlled mode. Mixing internal-and-external setters leads to
              torn state.
            </li>
          </ul>

          <p>
            Most well-known component libraries (Radix, Headless UI, MUI, react-aria) implement
            this pattern under various names: <code>useControllableState</code>,{' '}
            <code>useControlled</code>, <code>useUncontrolledProp</code>. They look the same.
          </p>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Controlled components: React manages the state</li>
            <li>Uncontrolled components: DOM manages the state</li>
            <li>Controlled gives more control, uncontrolled is simpler</li>
            <li>Use controlled for complex forms with validation</li>
            <li>Use uncontrolled for simple forms or file inputs</li>
            <li>For library components, the hybrid pattern lets the same component be either — driven by whether <code>value</code> was passed.</li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}

// Example components

function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-3)',
        }}
      />
      <div
        style={{
          padding: 'var(--space-3)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Current Value:</strong> {value || '(empty)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          Value is controlled by React state
        </p>
      </div>
    </div>
  )
}

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [submittedValue, setSubmittedValue] = useState('')

  const handleSubmit = () => {
    if (inputRef.current) {
      setSubmittedValue(inputRef.current.value)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue="Initial value"
        placeholder="Type here..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-3)',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-3)',
        }}
      >
        Get Value
      </button>
      <div
        style={{
          padding: 'var(--space-3)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Submitted Value:</strong> {submittedValue || '(click button to get value)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          Value is managed by the DOM, accessed via ref
        </p>
      </div>
    </div>
  )
}
