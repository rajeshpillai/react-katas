import { createContext, useContext, useState, ReactNode, useRef, Dispatch, SetStateAction } from 'react'

// Example of a poorly optimized provider
const BadThemeContext = createContext<any>(null)

// Example of an optimized provider
const ThemeContext = createContext<{ theme: string } | null>(null)
const ThemeUpdateContext = createContext<Dispatch<SetStateAction<string>> | null>(null)

export default function ProviderPattern() {
  return (
    <div>
      <h1>Provider Pattern Optimization</h1>
      <p>
        Context providers can cause performance issues if not optimized. Learn how to prevent
        unnecessary re-renders when using Context API.
      </p>

      {/* Section 1: The Problem */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Problem with Context</h2>
        <p>
          When context value changes, ALL consumers re-render, even if they don't use the changed
          value.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Bad Pattern:</h3>
          <pre style={{ background: 'transparent' }}>
            <code style={{ color: 'white' }}>{`function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  // New object on every render!
  const value = { theme, setTheme, user, setUser };
  
  return (
    <ThemeContext.Provider value={value}>
      <Component /> {/* Re-renders on ANY state change! */}
    </ThemeContext.Provider>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Solution - Split Contexts */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 1: Split Contexts</h2>
        <p>Separate state and updater functions into different contexts.</p>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Good Pattern:</h3>
          <pre style={{ background: 'transparent' }}>
            <code style={{ color: 'white' }}>{`// Split into two contexts
const ThemeContext = createContext(null);
const ThemeUpdateContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

// Components only re-render if they use the changing value
function Display() {
  const theme = useContext(ThemeContext); // Re-renders on theme change
  return <div>{theme}</div>;
}

function Toggle() {
  const setTheme = useContext(ThemeUpdateContext); // Never re-renders!
  return <button onClick={() => setTheme('dark')}>Toggle</button>;
}`}</code>
          </pre>
        </div>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Interactive Demo:</h3>
          <SplitContextDemo />
        </div>
      </section>

      {/* Section 3: useMemo for Value */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 2: Memoize Context Value</h2>
        <p>
          Use <code>useMemo</code> to prevent creating new objects on every render.
        </p>

        <pre>
          <code>{`function Provider({ children }) {
  const [state, setState] = useState(initialState);
  
  // Memoize the value object
  const value = useMemo(() => ({
    state,
    setState
  }), [state]);
  
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}`}</code>
        </pre>
      </section>

      {/* Section 4: Composition */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 3: Use Composition</h2>
        <p>
          Pass expensive components as <code>children</code> to avoid re-renders.
        </p>

        <pre>
          <code>{`function App() {
  return (
    <ThemeProvider>
      <ExpensiveComponent /> {/* Doesn't re-render on theme change! */}
    </ThemeProvider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <div className={theme}>
        {children} {/* Children don't re-render */}
      </div>
    </ThemeContext.Provider>
  );
}`}</code>
        </pre>
      </section>

      {/* Section 5: Best Practices */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Best Practices</h2>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Optimization Tips:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Split state and updaters into separate contexts
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Memoize context values with useMemo
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use composition to prevent re-renders
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Keep context values small and focused
            </li>
            <li style={{ color: 'white' }}>
              Consider state management libraries for complex state
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Context updates cause all consumers to re-render</li>
          <li>Split state and updaters into separate contexts</li>
          <li>
            Memoize context values with <code>useMemo</code>
          </li>
          <li>Use composition to prevent unnecessary re-renders</li>
          <li>Keep context values small and focused</li>
          <li>Profile before optimizing - context may not be the bottleneck!</li>
        </ul>
      </section>
    </div>
  )
}

// Demo component

function SplitContextDemo() {
  return (
    <OptimizedThemeProvider>
      <div
        style={{
          padding: 'var(--space-4)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <ThemeDisplay />
        <ThemeToggle />
        <ExpensiveChild />
      </div>
    </OptimizedThemeProvider>
  )
}

function OptimizedThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}

function ThemeDisplay() {
  const context = useContext(ThemeContext)
  const renderCount = useRef(0)
  renderCount.current += 1

  if (!context) return null

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-primary-100)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-3)',
      }}
    >
      <p>
        <strong>Current Theme:</strong> {context.theme}
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Renders: {renderCount.current} (re-renders on theme change)
      </p>
    </div>
  )
}

function ThemeToggle() {
  const setTheme = useContext(ThemeUpdateContext)
  const renderCount = useRef(0)
  renderCount.current += 1

  if (!setTheme) return null

  return (
    <div style={{ marginBottom: 'var(--space-3)' }}>
      <button
        onClick={() => setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-accent-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Toggle Theme
      </button>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
        Renders: {renderCount.current} (never re-renders!)
      </p>
    </div>
  )
}

function ExpensiveChild() {
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
      <p style={{ color: 'white', fontWeight: 'bold' }}>Expensive Component</p>
      <p style={{ color: 'white' }}>
        Renders: {renderCount.current} (doesn't use context, never re-renders!)
      </p>
    </div>
  )
}
