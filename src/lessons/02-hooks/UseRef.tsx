import React, { useState, useRef, useEffect } from 'react'

export default function UseRef() {
  return (
    <div>
      <h1>useRef Hook</h1>
      <p>
        The <code>useRef</code> hook lets you reference values that don't trigger re-renders when
        changed. It's perfect for accessing DOM elements and storing mutable values.
      </p>

      {/* Section 1: What is useRef? */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What is useRef?</h2>
        <p>
          <code>useRef</code> returns a mutable object with a <code>.current</code> property that
          persists across renders.
        </p>

        <pre>
          <code>{`const ref = useRef(initialValue);

// Access the value
console.log(ref.current);

// Update the value (doesn't cause re-render!)
ref.current = newValue;`}</code>
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
          <p style={{ color: 'white', fontWeight: 'bold' }}>💡 Key Difference:</p>
          <p style={{ color: 'white' }}>
            Changing <code>ref.current</code> does NOT trigger a re-render, unlike{' '}
            <code>setState</code>!
          </p>
        </div>
      </section>

      {/* Section 2: DOM Access */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Use Case 1: Accessing DOM Elements</h2>
        <p>The most common use - directly access and manipulate DOM elements.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Focus Input Example:</h3>
          <FocusInput />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFocus = () => {
    // Access the DOM element directly
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Mutable Values */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Use Case 2: Storing Mutable Values</h2>
        <p>
          Use refs to store values that change but shouldn't trigger re-renders (timers, previous
          values, etc.)
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Render Counter:</h3>
          <RenderCounter />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  
  // Increment on every render (doesn't cause re-render)
  renderCount.current += 1;
  
  return (
    <div>
      <p>State: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Previous Value */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Use Case 3: Tracking Previous Values</h2>
        <p>Store the previous value of state or props using refs.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Previous Value Tracker:</h3>
          <PreviousValue />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  
  useEffect(() => {
    // Update previous value after render
    prevCountRef.current = count;
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Timer Management */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Use Case 4: Managing Timers</h2>
        <p>Store timer IDs in refs so you can clear them from any function.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Stopwatch:</h3>
          <Stopwatch />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const start = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };
  
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  return (
    <>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 6: Scroll to Element */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Use Case 5: Scrolling to Elements</h2>
        <p>Use refs to programmatically scroll to specific elements.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Scroll Example:</h3>
          <ScrollToElement />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function ScrollToElement() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  return (
    <>
      <button onClick={scrollToTarget}>Scroll to Target</button>
      {/* ... lots of content ... */}
      <div ref={targetRef}>Target Element</div>
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 7: Refs vs State */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>useRef vs useState</h2>

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
            <h3 style={{ color: 'var(--color-primary-700)' }}>useState</h3>
            <ul>
              <li>Triggers re-render when updated</li>
              <li>Use for UI data</li>
              <li>Asynchronous updates</li>
              <li>Immutable update pattern</li>
            </ul>
            <pre style={{ marginTop: 'var(--space-3)' }}>
              <code>{`const [count, setCount] = useState(0);
setCount(count + 1); // Re-renders`}</code>
            </pre>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-accent-100)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3 style={{ color: 'var(--color-accent-700)' }}>useRef</h3>
            <ul>
              <li>No re-render when updated</li>
              <li>Use for non-UI data</li>
              <li>Synchronous updates</li>
              <li>Mutable .current property</li>
            </ul>
            <pre style={{ marginTop: 'var(--space-3)' }}>
              <code>{`const countRef = useRef(0);
countRef.current += 1; // No re-render`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 8: Common Patterns */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Patterns</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ When to Use useRef</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Accessing DOM elements (focus, scroll, measure)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Storing timer/interval IDs
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Tracking previous values
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Storing mutable values that don't affect rendering
            </li>
            <li style={{ color: 'white' }}>Avoiding re-renders for internal state</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            <code>useRef</code> creates a mutable object that persists across renders
          </li>
          <li>
            Changing <code>ref.current</code> doesn't trigger re-renders
          </li>
          <li>Perfect for accessing DOM elements with the ref attribute</li>
          <li>Use refs for values that change but don't affect the UI</li>
          <li>Common uses: DOM access, timers, previous values, instance variables</li>
          <li>
            Use <code>useState</code> for UI data, <code>useRef</code> for everything else
          </li>
        </ul>
      </section>
    </div>
  )
}

// Helper components

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click button to focus me"
        style={{
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginRight: 'var(--space-2)',
        }}
      />
      <button
        onClick={handleFocus}
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Focus Input
      </button>
    </div>
  )
}

function RenderCounter() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  // This runs on every render but doesn't cause a re-render
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>State Count:</strong> {count}
      </p>
      <p>
        <strong>Render Count:</strong> {renderCount.current}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Notice: Render count increases without causing additional renders!
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginTop: 'var(--space-3)',
        }}
      >
        Increment State
      </button>
    </div>
  )
}

function PreviousValue() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef(0)

  useEffect(() => {
    prevCountRef.current = count
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
        <strong>Current:</strong> {count}
      </p>
      <p>
        <strong>Previous:</strong> {prevCountRef.current}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        The previous value is stored in a ref and updated after each render
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-accent-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginTop: 'var(--space-3)',
        }}
      >
        Increment
      </button>
    </div>
  )
}

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (intervalRef.current) return

    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }

  const reset = () => {
    stop()
    setTime(0)
  }

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'bold',
          color: 'var(--color-primary-600)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
        }}
      >
        {time}s
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <button
          onClick={start}
          disabled={isRunning}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: isRunning ? 'var(--color-gray-400)' : 'var(--color-success)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          Start
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: !isRunning ? 'var(--color-gray-400)' : 'var(--color-error)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          Stop
        </button>
        <button
          onClick={reset}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-gray-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function ScrollToElement() {
  const topRef = useRef<HTMLDivElement>(null)
  const middleRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <button
          onClick={() => scrollTo(topRef)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Scroll to Top
        </button>
        <button
          onClick={() => scrollTo(middleRef)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-accent-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Scroll to Middle
        </button>
        <button
          onClick={() => scrollTo(bottomRef)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-success)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Scroll to Bottom
        </button>
      </div>

      <div
        style={{
          maxHeight: '300px',
          overflow: 'auto',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
        }}
      >
        <div
          ref={topRef}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-primary-100)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <strong>Top Section</strong>
          <p>This is the top of the scrollable area</p>
        </div>

        <div style={{ height: '200px', background: 'var(--bg-tertiary)', marginBottom: 'var(--space-4)' }}>
          <p style={{ padding: 'var(--space-4)' }}>Spacer content...</p>
        </div>

        <div
          ref={middleRef}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-accent-100)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <strong>Middle Section</strong>
          <p>This is the middle of the scrollable area</p>
        </div>

        <div style={{ height: '200px', background: 'var(--bg-tertiary)', marginBottom: 'var(--space-4)' }}>
          <p style={{ padding: 'var(--space-4)' }}>More spacer content...</p>
        </div>

        <div
          ref={bottomRef}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-success)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <strong style={{ color: 'white' }}>Bottom Section</strong>
          <p style={{ color: 'white' }}>This is the bottom of the scrollable area</p>
        </div>
      </div>
    </div>
  )
}
