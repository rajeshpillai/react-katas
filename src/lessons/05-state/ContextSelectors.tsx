import { createContext, useContext, useState, useRef, useCallback, useSyncExternalStore, useEffect, memo, useMemo } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './ContextSelectors.tsx?raw'

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

    useEffect(() => {
      subscribersRef.current.forEach((callback) => callback())
    }, [value])

    const getSnapshot = useCallback(() => storeRef.current, [])

    const contextValue = useMemo(() => ({ subscribe, getSnapshot }), [subscribe, getSnapshot])

    return (
      <Context.Provider value={contextValue as any}>
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

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useRef, useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'

// --- External store pattern using useSyncExternalStore ---

type Listener = () => void

function createStore<T>(initialState: T) {
    let state = initialState
    const listeners = new Set<Listener>()

    return {
        getSnapshot: () => state,
        subscribe: (listener: Listener) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
        setState: (updater: (prev: T) => T) => {
            state = updater(state)
            listeners.forEach((l) => l())
        },
    }
}

interface AppState {
    count: number
    user: string
    theme: string
}

const store = createStore<AppState>({ count: 0, user: 'John', theme: 'light' })

function useSelector<S>(selector: (state: AppState) => S): S {
    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getSnapshot())
    )
}

function CountDisplay() {
    const count = useSelector((s) => s.count)
    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <div style={{ padding: 12, background: '#dbeafe', borderRadius: 6, marginBottom: 8 }}>
            <strong>Count:</strong> {count}
            <span style={{ marginLeft: 12, fontSize: 12, color: '#666' }}>Renders: {renderRef.current}</span>
        </div>
    )
}

function UserDisplay() {
    const user = useSelector((s) => s.user)
    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <div style={{ padding: 12, background: '#fce7f3', borderRadius: 6, marginBottom: 8 }}>
            <strong>User:</strong> {user}
            <span style={{ marginLeft: 12, fontSize: 12, color: '#666' }}>Renders: {renderRef.current}</span>
        </div>
    )
}

function ThemeDisplay() {
    const theme = useSelector((s) => s.theme)
    const renderRef = useRef(0)
    renderRef.current += 1

    return (
        <div style={{ padding: 12, background: '#d1fae5', borderRadius: 6, marginBottom: 8 }}>
            <strong>Theme:</strong> {theme}
            <span style={{ marginLeft: 12, fontSize: 12, color: '#666' }}>Renders: {renderRef.current}</span>
        </div>
    )
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Context Selector Pattern</h2>
            <p style={{ marginBottom: 12 }}>
                Each component subscribes to only one slice of state. Clicking a button
                only re-renders the component that uses that value.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <button onClick={() => store.setState((s) => ({ ...s, count: s.count + 1 }))}>
                    Increment Count
                </button>
                <button onClick={() => store.setState((s) => ({ ...s, user: s.user === 'John' ? 'Jane' : 'John' }))}>
                    Toggle User
                </button>
                <button onClick={() => store.setState((s) => ({ ...s, theme: s.theme === 'light' ? 'dark' : 'light' }))}>
                    Toggle Theme
                </button>
            </div>
            <CountDisplay />
            <UserDisplay />
            <ThemeDisplay />
            <p style={{ fontSize: 12, color: '#888', marginTop: 12 }}>
                Watch the render counts -- only the relevant component re-renders!
            </p>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 450,
}

export default function ContextSelectors() {
  return (
    <LessonLayout title="Context Selectors" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Problem:</h3>
          <pre style={{ background: 'transparent' }}>
            <code style={{ color: 'white' }}>{`const state = { user, theme, settings };

// Component only uses theme
function Component() {
  const { theme } = useContext(AppContext);
  return <div className={theme}>...</div>;
}

// But re-renders when user or settings change!`}</code>
          </pre>
        </div>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
            border: '2px solid var(--color-error)'
          }}
        >
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-error)' }}>Interactive Problem Demo</h3>
          <StandardContextDemo />
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Solution:</h3>
          <pre style={{ background: 'transparent' }}>
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

        <pre style={{ background: 'transparent' }}>
          <code>{`function useContextSelector(context, selector) {
  const value = useContext(context);

  return useSyncExternalStore(
    value.subscribe, // React subscribes to changes
    () => selector(value.getSnapshot()) // Selects only the data needed
  );
}`}</code>
        </pre>

        <h3 style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          How it Works:
        </h3>
        <p>
          We rely on <code>useSyncExternalStore</code> which is designed for subscribing to external state.
        </p>

        <h4 style={{ marginTop: 'var(--space-4)' }}>1. The Store (Provider)</h4>
        <pre style={{ background: 'transparent' }}>
          <code>{`// We store the state in a ref so updating it doesn't trigger a Provider re-render
const storeRef = useRef(value);
const subscribers = useRef(new Set());

// When value changes, we notify subscribers manually
useEffect(() => {
  subscribers.current.forEach(callback => callback());
}, [value]);`}</code>
        </pre>

        <h4 style={{ marginTop: 'var(--space-4)' }}>2. The Selector Hook</h4>
        <pre style={{ background: 'transparent' }}>
          <code>{`// Component subscribes ONLY to the result of the selector
useSyncExternalStore(
  subscribe, // Function to register a listener
  () => selector(storeRef.current) // Snapshots the slice of state
);

// React only re-renders if the *result* of selector(storeRef.current) changes!`}</code>
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
            border: '2px solid var(--color-success)'
          }}
        >
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-success)' }}>Interactive Solution Demo</h3>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Popular Libraries:</h3>
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
    </LessonLayout>
  )
}

// --- Standard Context (The Problem) ---
const StandardContext = createContext<AppState | null>(null)

function StandardContextDemo() {
  const [state, setState] = useState<AppState>({
    count: 0,
    user: 'John',
    theme: 'light',
  })

  return (
    <StandardContext.Provider value={state}>
      <div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setState((s) => ({ ...s, count: s.count + 1 }))}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--color-error)',
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
              background: 'var(--color-error)',
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
              background: 'var(--color-error)',
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
          <ProblemCountDisplay />
          <ProblemUserDisplay />
          <ProblemThemeDisplay />
        </div>
        <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-4)' }}>
          Notice: Clicking ANY button re-renders ALL components below!
        </p>
      </div>
    </StandardContext.Provider>
  )
}

function ProblemCountDisplay() {
  const context = useContext(StandardContext)
  if (!context) throw new Error('Missing Provider')

  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
      <p><strong>Count:</strong> {context.count}</p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>Renders: {renderCountRef.current}</p>
    </div>
  )
}

function ProblemUserDisplay() {
  const context = useContext(StandardContext)
  if (!context) throw new Error('Missing Provider')

  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
      <p><strong>User:</strong> {context.user}</p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>Renders: {renderCountRef.current}</p>
    </div>
  )
}

function ProblemThemeDisplay() {
  const context = useContext(StandardContext)
  if (!context) throw new Error('Missing Provider')

  const renderCountRef = useRef(0)
  renderCountRef.current += 1

  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
      <p><strong>Theme:</strong> {context.theme}</p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>Renders: {renderCountRef.current}</p>
    </div>
  )
}


// --- Context Selectors (The Solution) ---

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

const CountDisplay = memo(function CountDisplay() {
  const count = useSelector((state) => state.count)
  const renderCountRef = useRef(0)
  renderCountRef.current += 1
  console.log('CountDisplay rendered')

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
        Renders: {renderCountRef.current}
      </p>
    </div>
  )
})

const UserDisplay = memo(function UserDisplay() {
  const user = useSelector((state) => state.user)
  const renderCountRef = useRef(0)
  renderCountRef.current += 1
  console.log('UserDisplay rendered')

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
        Renders: {renderCountRef.current}
      </p>
    </div>
  )
})

const ThemeDisplay = memo(function ThemeDisplay() {
  const theme = useSelector((state) => state.theme)
  const renderCountRef = useRef(0)
  renderCountRef.current += 1
  console.log('ThemeDisplay rendered')

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
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'white' }}>Renders: {renderCountRef.current}</p>
    </div>
  )
})
