import { useState, memo, useRef } from 'react'

export default function ReactMemoLesson() {
  return (
    <div>
      <h1>React.memo</h1>
      <p>
        <code>React.memo</code> is a higher-order component that prevents re-renders when props
        haven't changed. In React 19, it's less critical due to automatic optimizations, but still
        useful for expensive components.
      </p>

      {/* Section 1: What is React.memo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What is React.memo?</h2>
        <p>
          <code>React.memo</code> memoizes a component, re-rendering only when props change.
        </p>

        <pre>
          <code>{`// Without memo
function ExpensiveComponent({ data }) {
  return <div>{data}</div>;
}

// With memo
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{data}</div>;
});

// Component only re-renders if 'data' prop changes`}</code>
        </pre>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>💡 When to Use React.memo:</p>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Component renders often with same props
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Expensive rendering logic
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Large lists with many items
            </li>
            <li style={{ color: 'white' }}>After profiling shows it helps</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Basic Example */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Basic Example</h2>
        <p>Compare component with and without memo.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Interactive Demo:</h3>
          <MemoComparison />
        </div>
      </section>

      {/* Section 3: Custom Comparison */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Custom Comparison Function</h2>
        <p>
          Provide a custom comparison function for complex prop comparisons.
        </p>

        <pre>
          <code>{`const MemoizedComponent = memo(
  function Component({ user, settings }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    // Return false if props changed (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);`}</code>
        </pre>
      </section>

      {/* Section 4: Pitfalls */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Pitfalls</h2>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Breaks memo:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`// New object/array every render
<MemoComponent data={{ value: 1 }} />
<MemoComponent items={[1, 2, 3]} />
<MemoComponent onClick={() => {}} />

// These create new references, breaking memo!`}</code>
          </pre>
        </div>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Works with memo:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`// Stable references
const data = useMemo(() => ({ value: 1 }), []);
const items = useMemo(() => [1, 2, 3], []);
const handleClick = useCallback(() => {}, []);

<MemoComponent data={data} />
<MemoComponent items={items} />
<MemoComponent onClick={handleClick} />`}</code>
          </pre>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            <code>React.memo</code> prevents re-renders when props are unchanged
          </li>
          <li>Use for expensive components that render often</li>
          <li>Shallow comparison by default - compares prop references</li>
          <li>Custom comparison for complex props</li>
          <li>Breaks with new object/array/function references</li>
          <li>Combine with useMemo/useCallback for stable props</li>
          <li>In React 19, try composition first!</li>
        </ul>
      </section>
    </div>
  )
}

// Demo components

function MemoComparison() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Parent Count:</strong> {count}
      </p>
      <p>
        <strong>Value:</strong> {value}
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Increment Count
        </button>
        <button
          onClick={() => setValue(value + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-accent-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Increment Value
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <h4>Without memo:</h4>
          <WithoutMemo value={value} />
        </div>
        <div>
          <h4>With memo:</h4>
          <WithMemo value={value} />
        </div>
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Check console: Without memo re-renders on every parent update. With memo only re-renders when value changes.
      </p>
    </div>
  )
}

function WithoutMemo({ value }: { value: number }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-error)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>Value: {value}</p>
      <p style={{ color: 'white' }}>Renders: {renderCount.current}</p>
    </div>
  )
}

const WithMemo = memo(function WithMemo({ value }: { value: number }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>Value: {value}</p>
      <p style={{ color: 'white' }}>Renders: {renderCount.current}</p>
    </div>
  )
})
