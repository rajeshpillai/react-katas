import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './GlobalStatePatterns.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useSyncExternalStore } from 'react'

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

// Shared counter store
const counterStore = createStore({ count: 0 })

function useCounterStore() {
    const state = useSyncExternalStore(
        counterStore.subscribe,
        counterStore.getSnapshot
    )
    return { ...state, setState: counterStore.setState }
}

function CounterA() {
    const { count, setState } = useCounterStore()

    return (
        <div style={{
            padding: 16,
            background: '#dbeafe',
            borderRadius: 8,
            marginBottom: 12,
        }}>
            <h3>Component A</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0' }}>{count}</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setState((s) => ({ count: s.count + 1 }))}>+1</button>
                <button onClick={() => setState((s) => ({ count: s.count - 1 }))}>-1</button>
            </div>
        </div>
    )
}

function CounterB() {
    const { count, setState } = useCounterStore()

    return (
        <div style={{
            padding: 16,
            background: '#fce7f3',
            borderRadius: 8,
            marginBottom: 12,
        }}>
            <h3>Component B</h3>
            <p style={{ fontSize: 32, fontWeight: 'bold', margin: '8px 0' }}>{count}</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setState((s) => ({ count: s.count + 5 }))}>+5</button>
                <button onClick={() => setState((s) => ({ count: 0 }))}>Reset</button>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Shared External Store</h2>
            <p style={{ marginBottom: 16 }}>
                Both components share the same counter store via useSyncExternalStore.
                Updating from one component instantly reflects in the other.
            </p>
            <CounterA />
            <CounterB />
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 450,
}

export default function GlobalStatePatterns() {
  return (
    <LessonLayout title="Global State Patterns" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
      <p>
        Explore different patterns for managing global state in React applications, from Context to
        modern state management libraries.
      </p>

      {/* Section 1: When You Need Global State */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>When You Need Global State</h2>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Use Global State For:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              User authentication status
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Theme preferences
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Shopping cart data
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Notification system
            </li>
            <li style={{ color: 'white' }}>Data shared across many components</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Context API */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 1: Context API</h2>
        <p>Built-in React solution for global state.</p>

        <pre>
          <code>{`// Good for:
// - Simple global state
// - Theme, auth, language
// - Small to medium apps

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}`}</code>
        </pre>

        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <p><strong>Pros:</strong> Built-in, no dependencies, simple</p>
          <p><strong>Cons:</strong> Performance issues with large state, no devtools</p>
        </div>
      </section>

      {/* Section 3: Zustand */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 2: Zustand</h2>
        <p>Lightweight state management with hooks.</p>

        <pre>
          <code>{`import create from 'zustand';

// Good for:
// - Medium to large apps
// - Need devtools
// - Want simplicity

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Component() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}`}</code>
        </pre>

        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <p><strong>Pros:</strong> Simple API, great performance, devtools, small bundle</p>
          <p><strong>Cons:</strong> External dependency</p>
        </div>
      </section>

      {/* Section 4: Jotai */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 3: Jotai</h2>
        <p>Atomic state management inspired by Recoil.</p>

        <pre>
          <code>{`import { atom, useAtom } from 'jotai';

// Good for:
// - Atomic state updates
// - Derived state
// - Complex dependencies

const countAtom = atom(0);

function Component() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}</code>
        </pre>

        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <p><strong>Pros:</strong> Atomic updates, great TypeScript support, flexible</p>
          <p><strong>Cons:</strong> Learning curve, external dependency</p>
        </div>
      </section>

      {/* Section 5: Redux Toolkit */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 4: Redux Toolkit</h2>
        <p>Modern Redux with less boilerplate.</p>

        <pre>
          <code>{`import { createSlice, configureStore } from '@reduxjs/toolkit';

// Good for:
// - Large enterprise apps
// - Need time-travel debugging
// - Complex state logic

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});`}</code>
        </pre>

        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <p><strong>Pros:</strong> Powerful devtools, middleware, established ecosystem</p>
          <p><strong>Cons:</strong> Larger bundle, more boilerplate</p>
        </div>
      </section>

      {/* Section 6: Comparison */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Which One to Choose?</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Recommendations:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Small apps:</strong> Context API
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Medium apps:</strong> Zustand or Jotai
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Large apps:</strong> Redux Toolkit
            </li>
            <li style={{ color: 'white' }}>
              <strong>Start simple:</strong> Use Context, upgrade when needed
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Context API is built-in and great for simple cases</li>
          <li>Zustand offers simplicity with better performance</li>
          <li>Jotai provides atomic state management</li>
          <li>Redux Toolkit for large, complex applications</li>
          <li>Start simple, add complexity when needed</li>
          <li>Consider bundle size and learning curve</li>
        </ul>
      </section>
      </div>
    </LessonLayout>
  )
}
