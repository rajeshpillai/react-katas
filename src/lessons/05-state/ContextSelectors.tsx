import { createContext, useContext, useState, useRef, useCallback, useSyncExternalStore, memo, useMemo, type ReactNode, type Dispatch, type SetStateAction } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './ContextSelectors.tsx?raw'

// ============================================================
// Part 1: Production-grade createStore (external store pattern)
// ============================================================

type Listener = () => void
type EqualityFn<T> = (a: T, b: T) => boolean

function createStore<T>(initialState: T) {
    let state = initialState
    const listeners = new Set<Listener>()

    return {
        getState: () => state,
        setState: (updater: T | ((prev: T) => T)) => {
            const next = typeof updater === 'function'
                ? (updater as (prev: T) => T)(state)
                : updater
            if (Object.is(state, next)) return
            state = next
            listeners.forEach((l) => l())
        },
        subscribe: (listener: Listener) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
    }
}

type Store<T> = ReturnType<typeof createStore<T>>

// ============================================================
// Part 2: useSelector with equality function support
// ============================================================

function useStoreSelector<T, S>(
    store: Store<T>,
    selector: (state: T) => S,
    equalityFn: EqualityFn<S> = Object.is
): S {
    // Cache the selected value so getSnapshot is stable across consecutive calls.
    // useSyncExternalStore requires getSnapshot to return the same reference when
    // called multiple times without a store change — otherwise React detects "tearing"
    // and enters an infinite re-render loop.
    const cache = useRef<{ value: S; stateVersion: T } | null>(null)
    const selectorRef = useRef(selector)
    const equalityRef = useRef(equalityFn)
    selectorRef.current = selector
    equalityRef.current = equalityFn

    // Initialize cache on first render
    if (cache.current === null) {
        const value = selectorRef.current(store.getState())
        cache.current = { value, stateVersion: store.getState() }
    }

    const getSnapshot = useCallback((): S => {
        const currentState = store.getState()
        const cached = cache.current!
        // If store state hasn't changed, return cached value (same reference)
        if (Object.is(cached.stateVersion, currentState)) {
            return cached.value
        }
        // State changed — run selector and check equality
        const next = selectorRef.current(currentState)
        if (equalityRef.current(cached.value, next)) {
            // Values are equal — update stateVersion but keep same value reference
            cache.current = { value: cached.value, stateVersion: currentState }
            return cached.value
        }
        // Genuinely new value
        cache.current = { value: next, stateVersion: currentState }
        return next
    }, [store])

    return useSyncExternalStore(store.subscribe, getSnapshot)
}

// Shallow equality helper
function shallowEqual<T>(a: T, b: T): boolean {
    if (Object.is(a, b)) return true
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
        if (!Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false
    }
    return true
}

// ============================================================
// Part 3: Context-based store (for DI / component tree scoping)
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createStoreContext<T>(initialState: T) {
    const store = createStore(initialState)
    const StoreContext = createContext(store)

    function Provider({ initialValue, children }: { initialValue?: T; children: ReactNode }) {
        const storeInstance = useMemo((): Store<T> => {
            if (initialValue !== undefined) return createStore(initialValue as T)
            return store
        }, []) // eslint-disable-line react-hooks/exhaustive-deps

        return <StoreContext.Provider value={storeInstance}>{children}</StoreContext.Provider>
    }

    function useSelector<S>(selector: (state: T) => S, equalityFn?: EqualityFn<S>): S {
        const storeInstance = useContext(StoreContext)
        return useStoreSelector(storeInstance, selector, equalityFn)
    }

    function useDispatch() {
        const storeInstance = useContext(StoreContext)
        return storeInstance.setState
    }

    return { Provider, useSelector, useDispatch, store }
}
// Referenced in teaching section only — suppress unused warning
void createStoreContext

// ============================================================
// Playground config
// ============================================================

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useRef, useCallback, useMemo, useSyncExternalStore, createContext, useContext } from 'react'
import type { ReactNode } from 'react'

// --- Production-grade external store ---

type Listener = () => void
type EqualityFn<T> = (a: T, b: T) => boolean

function createStore<T>(initialState: T) {
    let state = initialState
    const listeners = new Set<Listener>()
    return {
        getState: () => state,
        setState: (updater: T | ((prev: T) => T)) => {
            const next = typeof updater === 'function'
                ? (updater as (prev: T) => T)(state) : updater
            if (Object.is(state, next)) return
            state = next
            listeners.forEach((l) => l())
        },
        subscribe: (listener: Listener) => {
            listeners.add(listener)
            return () => listeners.delete(listener)
        },
    }
}

type Store<T> = ReturnType<typeof createStore<T>>

// --- useSelector with equality function ---

function useStoreSelector<T, S>(
    store: Store<T>,
    selector: (state: T) => S,
    equalityFn: EqualityFn<S> = Object.is
): S {
    const cache = useRef<{ value: S; stateVersion: T } | null>(null)
    const selectorRef = useRef(selector)
    const equalityRef = useRef(equalityFn)
    selectorRef.current = selector
    equalityRef.current = equalityFn

    if (cache.current === null) {
        const value = selectorRef.current(store.getState())
        cache.current = { value, stateVersion: store.getState() }
    }

    const getSnapshot = useCallback((): S => {
        const currentState = store.getState()
        const cached = cache.current!
        if (Object.is(cached.stateVersion, currentState)) return cached.value
        const next = selectorRef.current(currentState)
        if (equalityRef.current(cached.value, next)) {
            cache.current = { value: cached.value, stateVersion: currentState }
            return cached.value
        }
        cache.current = { value: next, stateVersion: currentState }
        return next
    }, [store])

    return useSyncExternalStore(store.subscribe, getSnapshot)
}

function shallowEqual<T>(a: T, b: T): boolean {
    if (Object.is(a, b)) return true
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (const key of keysA) {
        if (!Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false
    }
    return true
}

// --- Context-based store for DI ---

function createStoreContext<T>(init: T) {
    const defaultStore = createStore(init)
    const Ctx = createContext(defaultStore)

    function Provider({ initialValue, children }: { initialValue?: T; children: ReactNode }) {
        const inst = useMemo(() => initialValue !== undefined ? createStore(initialValue) : defaultStore, [])
        return <Ctx.Provider value={inst}>{children}</Ctx.Provider>
    }

    function useSelector<S>(sel: (s: T) => S, eq?: EqualityFn<S>): S {
        return useStoreSelector(useContext(Ctx), sel, eq)
    }

    function useDispatch() { return useContext(Ctx).setState }
    return { Provider, useSelector, useDispatch }
}

// --- App demo: 100-item todo list with filter ---

interface Todo { id: number; text: string; done: boolean }
interface AppState {
    todos: Todo[]
    filter: 'all' | 'active' | 'done'
    search: string
}

const initial: AppState = {
    todos: Array.from({ length: 100 }, (_, i) => ({
        id: i, text: \`Task #\${i + 1} - \${['Build UI', 'Write tests', 'Deploy app', 'Fix bug', 'Review PR'][i % 5]}\`, done: i % 3 === 0,
    })),
    filter: 'all',
    search: '',
}

const { Provider, useSelector, useDispatch } = createStoreContext(initial)

// Derived selector: filtered + searched todos
function useFilteredTodos() {
    return useSelector((s) => {
        let list = s.todos
        if (s.filter === 'active') list = list.filter((t) => !t.done)
        if (s.filter === 'done') list = list.filter((t) => t.done)
        if (s.search) list = list.filter((t) => t.text.toLowerCase().includes(s.search.toLowerCase()))
        return list
    }, shallowEqual)
}

function Stats() {
    const stats = useSelector((s) => ({
        total: s.todos.length,
        done: s.todos.filter((t) => t.done).length,
    }), shallowEqual)
    const renders = useRef(0); renders.current++
    return (
        <div style={{ padding: 8, background: '#dbeafe', borderRadius: 6, marginBottom: 8, fontSize: 13 }}>
            <strong>Stats</strong>: {stats.done}/{stats.total} done
            <span style={{ marginLeft: 8, color: '#666', fontSize: 11 }}>renders: {renders.current}</span>
        </div>
    )
}

function SearchBar() {
    const search = useSelector((s) => s.search)
    const dispatch = useDispatch()
    const renders = useRef(0); renders.current++
    return (
        <div style={{ marginBottom: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
                value={search}
                onChange={(e) => dispatch((s) => ({ ...s, search: e.target.value }))}
                placeholder="Search todos..."
                style={{ flex: 1, padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <span style={{ color: '#666', fontSize: 11 }}>renders: {renders.current}</span>
        </div>
    )
}

function FilterBar() {
    const filter = useSelector((s) => s.filter)
    const dispatch = useDispatch()
    const renders = useRef(0); renders.current++
    const btn = (f: AppState['filter'], label: string) => (
        <button
            onClick={() => dispatch((s) => ({ ...s, filter: f }))}
            style={{
                padding: '4px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
                background: filter === f ? '#3b82f6' : '#e2e8f0', color: filter === f ? '#fff' : '#333',
            }}
        >{label}</button>
    )
    return (
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, alignItems: 'center' }}>
            {btn('all', 'All')} {btn('active', 'Active')} {btn('done', 'Done')}
            <span style={{ marginLeft: 'auto', color: '#666', fontSize: 11 }}>renders: {renders.current}</span>
        </div>
    )
}

function TodoList() {
    const todos = useFilteredTodos()
    const dispatch = useDispatch()
    const renders = useRef(0); renders.current++
    return (
        <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>
                Showing {todos.length} items (list renders: {renders.current})
            </div>
            <div style={{ maxHeight: 250, overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                {todos.slice(0, 30).map((t) => (
                    <div key={t.id} style={{
                        padding: '6px 10px', borderBottom: '1px solid #f1f5f9', display: 'flex',
                        alignItems: 'center', gap: 8, fontSize: 13,
                    }}>
                        <input
                            type="checkbox" checked={t.done}
                            onChange={() => dispatch((s) => ({
                                ...s, todos: s.todos.map((x) => x.id === t.id ? { ...x, done: !x.done } : x)
                            }))}
                        />
                        <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#333' }}>
                            {t.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Provider>
            <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
                <h3 style={{ marginBottom: 8 }}>100-Item Todo App with Selectors</h3>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
                    Each component only re-renders when its selected slice changes.
                    Watch the render counts!
                </p>
                <Stats />
                <SearchBar />
                <FilterBar />
                <TodoList />
            </div>
        </Provider>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 550,
}

// ============================================================
// Demo state for inline examples
// ============================================================

interface TodoItem { id: number; text: string; done: boolean }
interface DemoState {
    todos: TodoItem[]
    filter: 'all' | 'active' | 'done'
    search: string
    user: string
    count: number
}

const demoInitial: DemoState = {
    todos: Array.from({ length: 50 }, (_, i) => ({
        id: i,
        text: `Task #${i + 1}`,
        done: i % 3 === 0,
    })),
    filter: 'all',
    search: '',
    user: 'John',
    count: 0,
}

// --- Problem Demo: Standard Context ---

const NaiveContext = createContext<{ state: DemoState; setState: Dispatch<SetStateAction<DemoState>> } | null>(null)

function NaiveCountDisplay() {
    const ctx = useContext(NaiveContext)!
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>Count:</strong> {ctx.state.count}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
}

function NaiveUserDisplay() {
    const ctx = useContext(NaiveContext)!
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>User:</strong> {ctx.state.user}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
}

function NaiveFilterDisplay() {
    const ctx = useContext(NaiveContext)!
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>Filter:</strong> {ctx.state.filter}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
}

function ProblemDemo() {
    const [state, setState] = useState(demoInitial)
    return (
        <NaiveContext.Provider value={{ state, setState }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setState((s) => ({ ...s, count: s.count + 1 }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-error)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >+1 Count</button>
                <button
                    onClick={() => setState((s) => ({ ...s, user: s.user === 'John' ? 'Jane' : 'John' }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-error)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >Toggle User</button>
                <button
                    onClick={() => setState((s) => ({ ...s, filter: s.filter === 'all' ? 'done' : 'all' }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-error)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >Toggle Filter</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <NaiveCountDisplay />
                <NaiveUserDisplay />
                <NaiveFilterDisplay />
            </div>
            <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
                Click any button — ALL three components re-render every time!
            </p>
        </NaiveContext.Provider>
    )
}

// --- Solution Demo: External store with selectors ---

const demoStore = createStore(demoInitial)

const SolutionCountDisplay = memo(function SolutionCountDisplay() {
    const count = useStoreSelector(demoStore, (s) => s.count)
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-primary-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>Count:</strong> {count}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
})

const SolutionUserDisplay = memo(function SolutionUserDisplay() {
    const user = useStoreSelector(demoStore, (s) => s.user)
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-accent-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>User:</strong> {user}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
})

const SolutionFilterDisplay = memo(function SolutionFilterDisplay() {
    const filter = useStoreSelector(demoStore, (s) => s.filter)
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-success-100, #d1fae5)', borderRadius: 'var(--radius-md)' }}>
            <strong>Filter:</strong> {filter}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
})

function SolutionDemo() {
    return (
        <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                <button
                    onClick={() => demoStore.setState((s) => ({ ...s, count: s.count + 1 }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-primary-500)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >+1 Count</button>
                <button
                    onClick={() => demoStore.setState((s) => ({ ...s, user: s.user === 'John' ? 'Jane' : 'John' }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-accent-500)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >Toggle User</button>
                <button
                    onClick={() => demoStore.setState((s) => ({ ...s, filter: s.filter === 'all' ? 'done' : 'all' }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-success)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >Toggle Filter</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <SolutionCountDisplay />
                <SolutionUserDisplay />
                <SolutionFilterDisplay />
            </div>
            <p style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
                Only the component whose slice changed re-renders!
            </p>
        </div>
    )
}

// --- Shallow Equality Demo ---

const shallowStore = createStore({ items: [1, 2, 3], label: 'test' })

const WithoutShallowEqual = memo(function WithoutShallowEqual() {
    const data = useStoreSelector(shallowStore, (s) => ({ count: s.items.length, label: s.label }))
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-error-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>Without shallowEqual:</strong> {data.count} items, label={data.label}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
})

const WithShallowEqual = memo(function WithShallowEqual() {
    const data = useStoreSelector(shallowStore, (s) => ({ count: s.items.length, label: s.label }), shallowEqual)
    const renderRef = useRef(0)
    renderRef.current++
    return (
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-primary-100)', borderRadius: 'var(--radius-md)' }}>
            <strong>With shallowEqual:</strong> {data.count} items, label={data.label}
            <span style={{ float: 'right', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>renders: {renderRef.current}</span>
        </div>
    )
})

function ShallowEqualDemo() {
    return (
        <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <button
                    onClick={() => shallowStore.setState((s) => ({ ...s, label: s.label }))}
                    style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--color-warning, #f59e0b)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                >Set same label (no-op update)</button>
            </div>
            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <WithoutShallowEqual />
                <WithShallowEqual />
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)' }}>
                The selector returns a new object each time. Without shallowEqual, it re-renders on every store update.
                With shallowEqual, it compares values and skips if unchanged.
            </p>
        </div>
    )
}

// ============================================================
// Main Lesson Component
// ============================================================

export default function ContextSelectors() {
    return (
        <LessonLayout title="Context Selectors" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
                <p>
                    React Context re-renders <em>every</em> consumer when the context value changes — even if a component
                    only uses one field. At scale (dozens of consumers, frequent updates), this becomes a real performance
                    bottleneck. Context selectors solve this by letting each component subscribe to only the slice of state it needs.
                </p>

                {/* Section 1: The Problem */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>The Problem: Context Re-renders Everything</h2>
                    <p>
                        When you put multiple values into one context, updating <em>any</em> value re-renders <em>all</em> consumers:
                    </p>

                    <pre><code>{`const AppContext = createContext({ user, theme, count, todos });

// This component only reads "count"...
function Counter() {
  const { count } = useContext(AppContext);
  return <span>{count}</span>;
}

// ...but re-renders when user, theme, or todos change too!`}</code></pre>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                        border: '2px solid var(--color-error)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-error)' }}>Problem Demo</h3>
                        <ProblemDemo />
                    </div>
                </section>

                {/* Section 2: The Solution */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>The Solution: External Store + Selectors</h2>
                    <p>
                        The key insight: <strong>move state outside React</strong> into an external store, then use
                        {' '}<code>useSyncExternalStore</code> to subscribe each component to only its slice. React will only
                        re-render a component when the selected value actually changes.
                    </p>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Step 1: Create the store</h3>
                    <p>
                        The store holds state in a plain variable (not React state), notifies listeners on change,
                        and skips updates when state hasn't changed (<code>Object.is</code> check):
                    </p>
                    <pre><code>{`function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (updater: T | ((prev: T) => T)) => {
      const next = typeof updater === 'function'
        ? (updater as Function)(state) : updater;
      if (Object.is(state, next)) return; // bail if same reference
      state = next;
      listeners.forEach((l) => l());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}`}</code></pre>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Step 2: Build useSelector</h3>
                    <p>
                        <code>useSyncExternalStore</code> handles the subscription. The critical requirement:
                        {' '}<code>getSnapshot</code> must return the <strong>same reference</strong> on consecutive calls
                        without a store change — otherwise React detects "tearing" and enters an infinite loop.
                        We cache the selected value keyed by the store state:
                    </p>
                    <pre><code>{`function useSelector<T, S>(
  store: Store<T>,
  selector: (state: T) => S,
  equalityFn: (a: S, b: S) => boolean = Object.is
): S {
  // Cache: { value, stateVersion } — ensures getSnapshot is stable
  const cache = useRef<{ value: S; stateVersion: T } | null>(null);
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  if (cache.current === null) {
    cache.current = { value: selector(store.getState()), stateVersion: store.getState() };
  }

  const getSnapshot = useCallback((): S => {
    const state = store.getState();
    const cached = cache.current!;
    // Same store state? Return cached (same reference — no re-render)
    if (Object.is(cached.stateVersion, state)) return cached.value;
    // State changed — run selector
    const next = selectorRef.current(state);
    if (equalityFn(cached.value, next)) {
      // Values equal — keep old reference, update version
      cache.current = { value: cached.value, stateVersion: state };
      return cached.value;
    }
    cache.current = { value: next, stateVersion: state };
    return next;
  }, [store]);

  return useSyncExternalStore(store.subscribe, getSnapshot);
}`}</code></pre>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                        border: '2px solid var(--color-success)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-success)' }}>Solution Demo</h3>
                        <SolutionDemo />
                    </div>
                </section>

                {/* Section 3: The Equality Function Trap */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>The Equality Function Trap</h2>
                    <p>
                        When your selector returns a <strong>new object</strong> (even with the same values), <code>Object.is</code> sees
                        it as different and triggers a re-render. This is the most common mistake:
                    </p>

                    <pre><code>{`// BAD: Creates a new object every time → always re-renders
const data = useSelector(s => ({ count: s.items.length, label: s.label }));

// GOOD: Pass shallowEqual as the third argument
const data = useSelector(
  s => ({ count: s.items.length, label: s.label }),
  shallowEqual  // compares each key with Object.is
);`}</code></pre>

                    <pre><code>{`function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => Object.is(a[key], b[key]));
}`}</code></pre>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                        border: '2px solid var(--color-warning, #f59e0b)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-warning, #f59e0b)' }}>shallowEqual Demo</h3>
                        <ShallowEqualDemo />
                    </div>
                </section>

                {/* Section 4: Derived Selectors */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>Derived Selectors (Computed Values)</h2>
                    <p>
                        Real apps need computed values — filtered lists, aggregates, formatted data. Compose selectors
                        into custom hooks that compute derived state:
                    </p>

                    <pre><code>{`// Derived selector: filtered + searched todos
function useFilteredTodos() {
  return useSelector((s) => {
    let list = s.todos;
    if (s.filter === 'active') list = list.filter(t => !t.done);
    if (s.filter === 'done')   list = list.filter(t => t.done);
    if (s.search) list = list.filter(t =>
      t.text.toLowerCase().includes(s.search.toLowerCase())
    );
    return list;
  }, shallowEqual); // shallowEqual on the array
}

// Stats selector: aggregated values
function useStats() {
  return useSelector((s) => ({
    total: s.todos.length,
    done: s.todos.filter(t => t.done).length,
    active: s.todos.filter(t => !t.done).length,
  }), shallowEqual);
}`}</code></pre>

                    <p>
                        The <code>shallowEqual</code> here is critical — the filter/map creates a new array reference each time,
                        but if the contents haven't changed (same items in same order), we avoid re-rendering.
                    </p>

                    <div style={{
                        background: 'var(--color-info)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}>
                        <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>For truly expensive derivations:</h3>
                        <p style={{ color: 'white' }}>
                            Use a memoization layer (like Reselect's <code>createSelector</code>) that caches the result
                            and only recomputes when inputs change. Our <code>shallowEqual</code> approach is sufficient
                            for most cases, but memoized selectors add input-level caching on top.
                        </p>
                    </div>
                </section>

                {/* Section 5: Context-based Store */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>Scoping with Context (Dependency Injection)</h2>
                    <p>
                        A global store works, but sometimes you need multiple instances (e.g., two independent form stores).
                        Wrap the store in Context for component-tree scoping:
                    </p>

                    <pre><code>{`function createStoreContext<T>(initialState: T) {
  const defaultStore = createStore(initialState);
  const StoreContext = createContext(defaultStore);

  function Provider({ initialValue, children }) {
    // Create a new store instance per Provider
    const store = useMemo(() =>
      initialValue ? createStore(initialValue) : defaultStore, []);
    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useSelector<S>(selector: (s: T) => S, eq?) {
    const store = useContext(StoreContext);
    return useStoreSelector(store, selector, eq);
  }

  return { Provider, useSelector, useDispatch };
}`}</code></pre>

                    <p>
                        This gives you the best of both worlds: selector-based performance <em>and</em> React's
                        component tree scoping. Each <code>{'<Provider>'}</code> creates an isolated store instance.
                    </p>
                </section>

                {/* Section 6: Context Splitting vs Selectors */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>When to Use What</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)',
                        }}>
                            <h3>Context Splitting</h3>
                            <p style={{ fontSize: 'var(--font-size-sm)' }}>
                                Split state across multiple small contexts (UserContext, ThemeContext, etc.)
                            </p>
                            <ul style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-5)' }}>
                                <li>Simple to implement</li>
                                <li>No extra libraries</li>
                                <li>Good for 2-5 independent values</li>
                                <li>Doesn't scale to many slices</li>
                                <li>Can't derive across contexts</li>
                            </ul>
                        </div>
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)',
                        }}>
                            <h3>External Store + Selectors</h3>
                            <p style={{ fontSize: 'var(--font-size-sm)' }}>
                                Single store with fine-grained subscriptions via <code>useSyncExternalStore</code>
                            </p>
                            <ul style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-5)' }}>
                                <li>Scales to any number of slices</li>
                                <li>Derived/computed selectors</li>
                                <li>Equality function control</li>
                                <li>More implementation complexity</li>
                                <li>This is how zustand/jotai work</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        marginTop: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        background: 'var(--color-info)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <strong>Rule of thumb:</strong> Start with context splitting. When you find yourself creating
                        6+ contexts or needing derived values across contexts, switch to the selector pattern.
                    </div>
                </section>

                {/* Key Takeaways */}
                <section>
                    <h2>Key Takeaways</h2>
                    <ul>
                        <li><strong>The root cause:</strong> React Context notifies all consumers on any value change — there's no built-in selector mechanism</li>
                        <li><strong>External store pattern:</strong> Move state outside React, use <code>useSyncExternalStore</code> to subscribe selectively</li>
                        <li><strong>Equality matters:</strong> Selectors returning objects need <code>shallowEqual</code>, otherwise a new reference triggers re-render</li>
                        <li><strong>Derived selectors:</strong> Compose selectors into custom hooks for filtered/computed values</li>
                        <li><strong>Context for scoping:</strong> Wrap the external store in Context for dependency injection and multiple instances</li>
                        <li><strong>This is how libraries work:</strong> Zustand, Jotai, and Valtio all use this exact <code>useSyncExternalStore</code> pattern under the hood</li>
                    </ul>
                </section>
            </div>
        </LessonLayout>
    )
}
