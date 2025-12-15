import { useState, useEffect, useRef, useCallback } from 'react'

export default function CustomHooks() {
  return (
    <div>
      <h1>Custom Hooks</h1>
      <p>
        Custom hooks let you extract component logic into reusable functions. They're just
        JavaScript functions that use other hooks!
      </p>

      {/* Section 1: What are Custom Hooks? */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What are Custom Hooks?</h2>
        <p>
          Custom hooks are functions that start with "<code>use</code>" and can call other hooks.
          They let you share stateful logic between components.
        </p>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Key Rules:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Must start with "<code>use</code>" (e.g., <code>useWindowSize</code>)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Can call other hooks (<code>useState</code>, <code>useEffect</code>, etc.)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Follow the same rules as built-in hooks
            </li>
            <li style={{ color: 'white' }}>Share logic, not state (each call is independent)</li>
          </ul>
        </div>
      </section>

      {/* Section 2: useLocalStorage */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 1: useLocalStorage</h2>
        <p>Sync state with localStorage - persist data across page reloads.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Try it:</h3>
          <LocalStorageDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: useWindowSize */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 2: useWindowSize</h2>
        <p>Track window dimensions - useful for responsive behavior.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Current Window Size:</h3>
          <WindowSizeDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function App() {
  const { width, height } = useWindowSize();
  return <div>Window: {width} x {height}</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: useDebounce */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 3: useDebounce</h2>
        <p>Delay updating a value until user stops typing - perfect for search inputs.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Debounced Search:</h3>
          <DebounceDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout if value changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call only happens after user stops typing
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: useToggle */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 4: useToggle</h2>
        <p>Simple hook for boolean state - cleaner than useState for toggles.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Toggle Demo:</h3>
          <ToggleDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function App() {
  const modal = useToggle(false);

  return (
    <>
      <button onClick={modal.toggle}>Toggle Modal</button>
      {modal.value && <Modal onClose={modal.setFalse} />}
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 6: usePrevious */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 5: usePrevious</h2>
        <p>Get the previous value of state or props - useful for comparisons.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Previous Value:</h3>
          <PreviousDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 7: Best Practices */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Best Practices</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Do's</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Always start hook names with "use"
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Extract logic that's used in multiple components
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Keep hooks focused on a single responsibility
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Return values in a consistent format (array or object)
            </li>
            <li style={{ color: 'white' }}>Document your custom hooks with examples</li>
          </ul>
        </div>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Don'ts</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't call hooks conditionally
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't create hooks for everything (keep it simple)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't share state between hook calls (each is independent)
            </li>
            <li style={{ color: 'white' }}>Don't forget to clean up side effects</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            Custom hooks extract reusable logic from components
          </li>
          <li>
            Must start with "use" and can call other hooks
          </li>
          <li>Each hook call has its own isolated state</li>
          <li>Common patterns: localStorage, window events, debouncing, toggles</li>
          <li>Keep hooks focused and well-documented</li>
          <li>Custom hooks make your code more maintainable and testable</li>
        </ul>
      </section>
    </div>
  )
}

// Custom hook implementations

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [key, value])

  return [value, setValue] as const
}

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((v) => !v)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return { value, toggle, setTrue, setFalse }
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// Demo components

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('tutorial-name', '')

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-4)',
        }}
      />
      <div
        style={{
          padding: 'var(--space-4)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Stored value:</strong> {name || '(empty)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          Refresh the page - your input persists!
        </p>
      </div>
    </div>
  )
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize()

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--color-primary-100)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
      }}
    >
      <p style={{ color: 'var(--color-primary-700)', fontWeight: 'bold', fontSize: 'var(--font-size-2xl)' }}>
        {width} × {height}
      </p>
      <p style={{ color: 'var(--color-primary-600)', fontSize: 'var(--font-size-sm)' }}>
        Resize your browser window to see it update!
      </p>
    </div>
  )
}

function DebounceDemo() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to search..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-4)',
        }}
      />
      <div
        style={{
          padding: 'var(--space-4)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Immediate value:</strong> {search || '(empty)'}
        </p>
        <p>
          <strong>Debounced value (500ms):</strong> {debouncedSearch || '(empty)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          API calls would use the debounced value to avoid excessive requests
        </p>
      </div>
    </div>
  )
}

function ToggleDemo() {
  const modal = useToggle(false)
  const darkMode = useToggle(false)

  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <button
          onClick={modal.toggle}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: modal.value ? 'var(--color-error)' : 'var(--color-success)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          {modal.value ? 'Hide' : 'Show'} Modal
        </button>
        <button
          onClick={darkMode.toggle}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: darkMode.value ? 'var(--color-gray-800)' : 'var(--color-gray-200)',
            color: darkMode.value ? 'white' : 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          {darkMode.value ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {modal.value && (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-info)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>Modal is visible!</p>
          <p style={{ color: 'white' }}>Using useToggle hook</p>
        </div>
      )}

      <div
        style={{
          padding: 'var(--space-4)',
          background: darkMode.value ? 'var(--color-gray-800)' : 'var(--color-gray-100)',
          color: darkMode.value ? 'white' : 'var(--text-primary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p style={{ fontWeight: 'bold' }}>
          {darkMode.value ? 'Dark mode enabled' : 'Light mode enabled'}
        </p>
      </div>
    </div>
  )
}

function PreviousDemo() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

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
        <strong>Previous:</strong> {prevCount ?? 'undefined'}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
        Previous value is tracked using useRef
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
        }}
      >
        Increment
      </button>
    </div>
  )
}
