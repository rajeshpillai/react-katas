import { useState, useEffect } from 'react'

export default function UseEffectFundamentals() {
  const [count, setCount] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  // Example 1: Effect runs after every render
  useEffect(() => {
    document.title = `Count: ${count}`
  })

  // Example 2: Effect runs only once (on mount)
  useEffect(() => {
    console.log('Component mounted!')
  }, [])

  // Example 3: Effect runs when specific dependency changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`)
  }, [count])

  // Example 4: Timer effect
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)

      // Cleanup function - runs before next effect and on unmount
      return () => {
        clearInterval(interval)
      }
    }
  }, [isRunning])

  // Example 5: Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Simulate API call
  const fetchUser = () => {
    setIsLoading(true)
    setUser(null)

    // Simulate network delay
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div>
      <h1>useEffect Fundamentals</h1>
      <p>
        The <code>useEffect</code> hook lets you perform <strong>side effects</strong> in function
        components. Side effects include data fetching, subscriptions, timers, and manually
        changing the DOM.
      </p>

      {/* Section 1: What are Side Effects? */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What are Side Effects?</h2>
        <p>
          Side effects are operations that affect something outside the component's scope:
        </p>
        <ul>
          <li>Fetching data from an API</li>
          <li>Setting up subscriptions or timers</li>
          <li>Manually updating the DOM</li>
          <li>Logging to console</li>
          <li>Setting up event listeners</li>
        </ul>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white' }}>
            💡 <strong>Key Concept:</strong> Effects run <em>after</em> React updates the DOM.
            This ensures your UI is always in sync before side effects execute.
          </p>
        </div>
      </section>

      {/* Section 2: Basic Syntax */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Basic Syntax</h2>

        <pre>
          <code>{`useEffect(() => {
  // Your side effect code here
  console.log('Effect ran!');
  
  // Optional: return cleanup function
  return () => {
    console.log('Cleanup!');
  };
}, [dependencies]); // Dependency array`}</code>
        </pre>

        <p style={{ marginTop: 'var(--space-4)' }}>
          The dependency array controls <strong>when</strong> the effect runs:
        </p>
        <ul>
          <li>
            <strong>No array:</strong> Runs after every render
          </li>
          <li>
            <strong>Empty array []:</strong> Runs only once (on mount)
          </li>
          <li>
            <strong>[dep1, dep2]:</strong> Runs when dependencies change
          </li>
        </ul>
      </section>

      {/* Section 3: Document Title Example */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 1: Updating Document Title</h2>
        <p>
          This effect runs after every render and updates the browser tab title with the current
          count.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-size-2xl)',
              marginBottom: 'var(--space-4)',
              color: 'var(--color-primary-600)',
            }}
          >
            Count: <strong>{count}</strong>
          </div>
          <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
            👆 Check your browser tab - the title updates with the count!
          </p>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Increment
          </button>

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// Runs after EVERY render (no dependency array)
useEffect(() => {
  document.title = \`Count: \${count}\`;
});`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Run Once on Mount */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 2: Run Once on Mount</h2>
        <p>
          Use an empty dependency array <code>[]</code> to run an effect only once when the
          component mounts.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ marginBottom: 'var(--space-4)' }}>
            Open your browser console to see the "Component mounted!" message (appears only once).
          </p>

          <pre>
            <code>{`// Runs only ONCE when component mounts
useEffect(() => {
  console.log('Component mounted!');
  // Perfect for initial data fetching
}, []); // Empty dependency array`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Timer Example */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 3: Timer with Cleanup</h2>
        <p>
          Effects can return a <strong>cleanup function</strong> that runs before the next effect
          and when the component unmounts.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--font-size-3xl)',
              marginBottom: 'var(--space-4)',
              color: 'var(--color-accent-600)',
              textAlign: 'center',
            }}
          >
            {seconds}s
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: isRunning ? 'var(--color-error)' : 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginRight: 'var(--space-2)',
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={() => setSeconds(0)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-gray-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`useEffect(() => {
  if (isRunning) {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup: clear interval when effect re-runs or unmounts
    return () => {
      clearInterval(interval);
    };
  }
}, [isRunning]); // Re-run when isRunning changes`}</code>
          </pre>
        </div>
      </section>

      {/* Section 6: Event Listeners */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 4: Window Resize Listener</h2>
        <p>Always clean up event listeners to prevent memory leaks!</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-primary-100)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              marginBottom: 'var(--space-4)',
            }}
          >
            <p style={{ color: 'var(--color-primary-700)', fontWeight: 'bold' }}>
              Window Width: {windowWidth}px
            </p>
            <p style={{ color: 'var(--color-primary-600)', fontSize: 'var(--font-size-sm)' }}>
              Try resizing your browser window!
            </p>
          </div>

          <pre>
            <code>{`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  // Add event listener
  window.addEventListener('resize', handleResize);
  
  // Cleanup: remove event listener
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty array - set up once on mount`}</code>
          </pre>
        </div>
      </section>

      {/* Section 7: Data Fetching Pattern */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 5: Data Fetching Pattern</h2>
        <p>
          A common pattern: fetch data on mount or when dependencies change. We'll explore this
          more in the next lesson!
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <button
            onClick={fetchUser}
            disabled={isLoading}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: isLoading ? 'var(--color-gray-400)' : 'var(--color-accent-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {isLoading ? 'Loading...' : 'Fetch User'}
          </button>

          {user && (
            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p style={{ color: 'white', fontWeight: 'bold' }}>User Data:</p>
              <p style={{ color: 'white' }}>Name: {user.name}</p>
              <p style={{ color: 'white' }}>Email: {user.email}</p>
            </div>
          )}

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`useEffect(() => {
  // Fetch data when component mounts
  async function fetchData() {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser(data);
  }
  
  fetchData();
}, []); // Empty array - fetch once on mount`}</code>
          </pre>
        </div>
      </section>

      {/* Common Mistakes */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Mistakes</h2>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>⚠️ Watch Out For:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Missing dependencies:</strong> Always include all values used in the effect
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Infinite loops:</strong> Updating state that's in the dependency array
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Forgetting cleanup:</strong> Always clean up timers, subscriptions, listeners
            </li>
            <li style={{ color: 'white' }}>
              <strong>Async effects:</strong> Can't make the effect function itself async
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            <code>useEffect</code> runs side effects after React updates the DOM
          </li>
          <li>Effects run after every render by default</li>
          <li>
            Use dependency array to control when effects run: <code>[]</code> for once,{' '}
            <code>[dep]</code> for when dep changes
          </li>
          <li>Return a cleanup function to clean up subscriptions, timers, and listeners</li>
          <li>Common uses: data fetching, subscriptions, timers, event listeners</li>
          <li>Always include all dependencies used in the effect</li>
          <li>Next lesson: useEffect cleanup patterns and advanced techniques!</li>
        </ul>
      </section>
    </div>
  )
}
