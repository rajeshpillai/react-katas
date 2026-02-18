import { useState, useRef } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './ControlledUncontrolled.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useRef } from 'react'

function ControlledInput() {
    const [value, setValue] = useState('')

    return (
        <div style={{ marginBottom: 24 }}>
            <h3>Controlled Input (useState)</h3>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type here..."
                style={{ width: '100%', padding: 8, fontSize: 14, marginBottom: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
            />
            <div style={{ padding: 8, background: '#f3f4f6', borderRadius: 6 }}>
                <p><strong>Current Value:</strong> {value || '(empty)'}</p>
                <p style={{ color: '#6b7280', fontSize: 12 }}>Value is controlled by React state -- updates on every keystroke</p>
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
            <h3>Uncontrolled Input (useRef)</h3>
            <input
                ref={inputRef}
                type="text"
                defaultValue="Initial value"
                placeholder="Type here..."
                style={{ width: '100%', padding: 8, fontSize: 14, marginBottom: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
            />
            <button
                onClick={handleSubmit}
                style={{ padding: '6px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 8 }}
            >
                Get Value
            </button>
            <div style={{ padding: 8, background: '#f3f4f6', borderRadius: 6 }}>
                <p><strong>Submitted Value:</strong> {submittedValue || '(click button to get value)'}</p>
                <p style={{ color: '#6b7280', fontSize: 12 }}>Value is managed by the DOM, accessed via ref on demand</p>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Controlled vs Uncontrolled</h2>
            <ControlledInput />
            <UncontrolledInput />
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 450,
}

export default function ControlledUncontrolled() {
  return (
    <LessonLayout title="Controlled vs Uncontrolled Components" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
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
                background: 'var(--color-primary-100)',
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
                background: 'var(--color-accent-100)',
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

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Controlled components: React manages the state</li>
            <li>Uncontrolled components: DOM manages the state</li>
            <li>Controlled gives more control, uncontrolled is simpler</li>
            <li>Use controlled for complex forms with validation</li>
            <li>Use uncontrolled for simple forms or file inputs</li>
            <li>In modern React, controlled is generally preferred</li>
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
