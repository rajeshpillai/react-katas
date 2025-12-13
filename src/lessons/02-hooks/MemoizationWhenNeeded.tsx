import { useState, useMemo, useCallback, memo } from 'react'

export default function MemoizationWhenNeeded() {
  return (
    <div>
      <h1>Memoization (When You Need It)</h1>
      <p>
        In React 19, the <strong>React Compiler</strong> automatically optimizes most components.
        Manual memoization with <code>useMemo</code> and <code>useCallback</code> is now optional
        in many cases!
      </p>

      {/* Section 1: React 19 Changes */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>React 19 & The Compiler</h2>
        <p>
          React 19 introduces an automatic compiler that memoizes components and values behind the
          scenes. This means:
        </p>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ What's Automatic:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Component re-renders are optimized automatically
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Simple calculations are memoized by the compiler
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Object and array references are stable when possible
            </li>
            <li style={{ color: 'white' }}>Most cases don't need manual memoization!</li>
          </ul>
        </div>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
            ⚠️ When You Still Need Manual Memoization:
          </h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Expensive computations (heavy calculations, large data processing)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Referential equality for dependencies (useEffect, custom hooks)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Preventing unnecessary child re-renders in large lists
            </li>
            <li style={{ color: 'white' }}>
              When profiling shows a performance issue
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: useMemo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>useMemo - Memoizing Values</h2>
        <p>
          <code>useMemo</code> caches the result of a calculation between re-renders. Use it for
          expensive computations.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Expensive Calculation Example:</h3>
          <ExpensiveCalculation />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // ❌ Without useMemo: runs on every render
  // const result = expensiveOperation(count);

  // ✅ With useMemo: only runs when count changes
  const result = useMemo(() => {
    console.log('Computing...');
    return expensiveOperation(count);
  }, [count]); // Only recompute when count changes

  return (
    <>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: useCallback */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>useCallback - Memoizing Functions</h2>
        <p>
          <code>useCallback</code> returns a memoized callback function. Useful when passing
          callbacks to optimized child components.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Callback Example:</h3>
          <CallbackExample />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ Without useCallback: new function on every render
  // const handleClick = () => setCount(count + 1);

  // ✅ With useCallback: same function reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps - function never changes

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <MemoizedChild onClick={handleClick} />
    </>
  );
}

// Child only re-renders if onClick changes
const MemoizedChild = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: React.memo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>React.memo - Memoizing Components</h2>
        <p>
          <code>React.memo</code> prevents re-renders if props haven't changed. Less needed in
          React 19, but still useful for expensive components.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Component Memoization:</h3>
          <MemoDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// Without memo: re-renders on every parent render
function ExpensiveChild({ value }) {
  console.log('Rendering ExpensiveChild');
  // ... expensive rendering logic
  return <div>{value}</div>;
}

// With memo: only re-renders if value changes
const ExpensiveChild = memo(function ExpensiveChild({ value }) {
  console.log('Rendering ExpensiveChild');
  // ... expensive rendering logic
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  return (
    <>
      <button onClick={() => setOther(other + 1)}>
        Update Other
      </button>
      <ExpensiveChild value={count} />
      {/* Child doesn't re-render when 'other' changes */}
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: When NOT to Memoize */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>When NOT to Use Memoization</h2>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
            ❌ Don't Memoize These:
          </h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Simple calculations (addition, string concatenation)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Components that always re-render anyway
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Premature optimization without profiling
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Small lists (under 100 items)
            </li>
            <li style={{ color: 'white' }}>
              When the memoization cost exceeds the benefit
            </li>
          </ul>
        </div>
      </section>

      {/* Section 6: Modern Approach */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Modern React 19 Approach</h2>

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
            💡 Best Practice in React 19:
          </h3>
          <ol style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Start without memoization</strong> - Let the compiler optimize
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Profile your app</strong> - Use React DevTools Profiler
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Identify bottlenecks</strong> - Find actual performance issues
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Add memoization selectively</strong> - Only where needed
            </li>
            <li style={{ color: 'white' }}>
              <strong>Focus on composition</strong> - Better architecture beats memoization
            </li>
          </ol>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>React 19 compiler automatically optimizes most cases</li>
          <li>
            <code>useMemo</code> for expensive calculations, <code>useCallback</code> for stable
            function references
          </li>
          <li>
            <code>React.memo</code> for preventing unnecessary component re-renders
          </li>
          <li>Don't memoize prematurely - profile first!</li>
          <li>Component composition is often better than memoization</li>
          <li>In React 19, memoization is an optimization, not a requirement</li>
          <li>Next section: Performance patterns that work better than memoization!</li>
        </ul>
      </section>
    </div>
  )
}

// Example components

function ExpensiveCalculation() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  const [renderCount, setRenderCount] = useState(0)

  // Simulate expensive operation
  const expensiveOperation = (num: number) => {
    let result = 0
    for (let i = 0; i < 100000000; i++) {
      result += num
    }
    return result
  }

  // Memoized expensive calculation
  const result = useMemo(() => {
    console.log('Computing expensive result...')
    return expensiveOperation(count)
  }, [count])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Count:</strong> {count}
      </p>
      <p>
        <strong>Expensive Result:</strong> {result}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Renders: {renderCount} (Check console for computation logs)
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
        <button
          onClick={() => {
            setCount(count + 1)
            setRenderCount(renderCount + 1)
          }}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Increment Count (triggers calculation)
        </button>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setRenderCount(renderCount + 1)
        }}
        placeholder="Type here (doesn't trigger calculation)"
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginTop: 'var(--space-3)',
        }}
      />
    </div>
  )
}

function CallbackExample() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // Memoized callback
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Count:</strong> {count}
      </p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Check console - child only re-renders when necessary
      </p>
      <MemoizedButton onClick={handleClick} />
    </div>
  )
}

const MemoizedButton = memo(function MemoizedButton({ onClick }: { onClick: () => void }) {
  console.log('MemoizedButton rendered')
  return (
    <button
      onClick={onClick}
      style={{
        padding: 'var(--space-3) var(--space-6)',
        background: 'var(--color-accent-500)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
      }}
    >
      Increment Count
    </button>
  )
})

function MemoDemo() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Count:</strong> {count}
      </p>
      <p>
        <strong>Other:</strong> {other}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
        Check console - ExpensiveChild only re-renders when count changes
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
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
          Update Count (child re-renders)
        </button>
        <button
          onClick={() => setOther(other + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-gray-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Update Other (child doesn't re-render)
        </button>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <ExpensiveChild value={count} />
      </div>
    </div>
  )
}

const ExpensiveChild = memo(function ExpensiveChild({ value }: { value: number }) {
  console.log('ExpensiveChild rendered with value:', value)
  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>Memoized Child Component</p>
      <p style={{ color: 'white' }}>Value: {value}</p>
    </div>
  )
})
