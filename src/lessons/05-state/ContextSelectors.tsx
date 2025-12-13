import { createContext, useContext, useState, useRef, useCallback, useSyncExternalStore } from 'react'

// Simple context selector implementation
function createContextSelector<T>() {
  const Context = createContext<T | null>(null)

  function Provider({ value, children }: { value: T; children: React.ReactNode }) {
    const storeRef = useRef(value)
    const subscribersRef = useRef(new Set<() => void>())

    storeRef.current = value

    const subscribe = useCallback((callback: () => void) => {
      subscribersRef.current.add(callback)
      return () => subscribersRef.current.delete(callback)
    }, [])

    const getSnapshot = useCallback(() => storeRef.current, [])

    return (
      <Context.Provider value={{ subscribe, getSnapshot } as any}>
        {children}
      </Context.Provider>
    )
  }

  function useSelector<S>(selector: (state: T) => S): S {
    const context = useContext(Context)
    if (!context) throw new Error('useSelector must be within Provider')

    return useSyncExternalStore(
      (context as any).subscribe,
      () => selector((context as any).getSnapshot())
    )
  }

  return { Provider, useSelector }
}

export default function ContextSelectors() {
  return (
    <div>
      <h1>Context Selectors</h1>
      <p>
        Learn how to optimize Context performance by selecting only the data you need. Prevent
        unnecessary re-renders with context selectors!
      </p>

      {/* Section 1: The Problem */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Problem with Context</h2>
        <p>
          When any part of context changes, ALL consumers re-render, even if they don't use the
          changed value.
        </p>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Problem:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`const state = { user, theme, settings };

// Component only uses theme
function Component() {
  const { theme } = useContext(AppContext);
  return <div className={theme}>...</div>;
}

// But re-renders when user or settings change!`}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Solution - Selectors */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution: Context Selectors</h2>
        <p>
          Selectors let you subscribe to only the part of context you need.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Solution:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`// Only re-renders when theme changes!
function Component() {
  const theme = useSelector(state => state.theme);
  return <div className={theme}>...</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Implementation */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Implementation with useSyncExternalStore</h2>
        <p>
          React 18+ provides <code>useSyncExternalStore</code> for building selectors.
        </p>

        <pre>
          <code>{`function useContextSelector(context, selector) {
  const value = useContext(context);
  
  return useSyncExternalStore(
    value.subscribe,
    () => selector(value.getSnapshot())
  );
}`}</code>
        </pre>
      </section>

      {/* Section 4: Demo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Interactive Demo</h2>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <AppDemo />
        </div>
      </section>

      {/* Section 5: Libraries */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Context Selector Libraries</h2>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Popular Libraries:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>use-context-selector</strong> - Lightweight selector hook
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>zustand</strong> - Modern state management with selectors
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>jotai</strong> - Atomic state management
            </li>
            <li style={{ color: 'white' }}>
              <strong>valtio</strong> - Proxy-based state
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Context re-renders all consumers on any change</li>
          <li>Selectors subscribe to specific parts of state</li>
          <li>
            Use <code>useSyncExternalStore</code> for custom selectors
          </li>
          <li>Libraries like use-context-selector simplify this</li>
          <li>Great for large context objects</li>
          <li>Consider state management libraries for complex apps</li>
        </ul>
      </section>
    </div>
  )
}

// Demo

interface AppState {
  count: number
  user: string
  theme: string
}

const { Provider: AppProvider, useSelector } = createContextSelector<AppState>()

function AppDemo() {
  const [state, setState] = useState<AppState>({
    count: 0,
    user: 'John',
    theme: 'light',
  })

  return (
    <AppProvider value={state}>
      <div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setState((s) => ({ ...s, count: s.count + 1 }))}
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
            onClick={() => setState((s) => ({ ...s, user: s.user === 'John' ? 'Jane' : 'John' }))}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-accent-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Toggle User
          </button>
          <button
            onClick={() => setState((s) => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }))}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Toggle Theme
          </button>
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <CountDisplay />
          <UserDisplay />
          <ThemeDisplay />
        </div>

        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-4)' }}>
          Check console: Each component only re-renders when its selected value changes!
        </p>
      </div>
    </AppProvider>
  )
}

function CountDisplay() {
  const count = useSelector((state) => state.count)
  const [renderCount, setRenderCount] = useState(0)

  useState(() => {
    setRenderCount((c) => c + 1)
    console.log('CountDisplay rendered')
  })

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-primary-100)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Count:</strong> {count}
      </p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
        Renders: {renderCount}
      </p>
    </div>
  )
}

function UserDisplay() {
  const user = useSelector((state) => state.user)
  const [renderCount, setRenderCount] = useState(0)

  useState(() => {
    setRenderCount((c) => c + 1)
    console.log('UserDisplay rendered')
  })

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-accent-100)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>User:</strong> {user}
      </p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
        Renders: {renderCount}
      </p>
    </div>
  )
}

function ThemeDisplay() {
  const theme = useSelector((state) => state.theme)
  const [renderCount, setRenderCount] = useState(0)

  useState(() => {
    setRenderCount((c) => c + 1)
    console.log('ThemeDisplay rendered')
  })

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>
        <strong>Theme:</strong> {theme}
      </p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'white' }}>Renders: {renderCount}</p>
    </div>
  )
}
