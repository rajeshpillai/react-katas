import{r,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const a=`import { createContext, useContext, useState, ReactNode, useRef, Dispatch, SetStateAction } from 'react'

// Example of a poorly optimized provider


// Example of an optimized provider
const ThemeContext = createContext<{ theme: string } | null>(null)
const ThemeUpdateContext = createContext<Dispatch<SetStateAction<string>> | null>(null)

// @ts-ignore
import sourceCode from './ProviderPattern.tsx?raw'

export default function ProviderPattern() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Provider Pattern Optimization</h1>
      <p>
        Context providers can cause performance issues if not optimized. Learn how to prevent
        unnecessary re-renders when using Context API.
      </p>

      <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
        <button
          onClick={() => setActiveTab('demo')}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'demo' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'demo' ? 'bold' : 'normal'
          }}
        >
          Lesson
        </button>
        <button
          onClick={() => setActiveTab('code')}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'code' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'code' ? 'bold' : 'normal'
          }}
        >
          Source Code
        </button>
      </div>

      {activeTab === 'demo' ? (
        <>
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
                <code style={{ color: 'white' }}>{\`function App() {
        const [theme, setTheme] = useState('light');
        const [user, setUser] = useState(null);
        
        // New object on every render!
        const value = { theme, setTheme, user, setUser };
        
        return (
            <ThemeContext.Provider value={value}>
            <Component /> {/* Re-renders on ANY state change! */}
            </ThemeContext.Provider>
        );
        }\`}</code>
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
                <code style={{ color: 'white' }}>{\`// Split into two contexts
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
        }\`}</code>
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
              <code>{\`function Provider({ children }) {
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
        }\`}</code>
            </pre>
          </section>

          {/* Section 4: Composition */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Solution 3: Use Composition</h2>
            <p>
              Pass expensive components as <code>children</code> to avoid re-renders.
            </p>

            <pre>
              <code>{\`function App() {
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
        }\`}</code>
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
        </>
      ) : (
        <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
          <code>{sourceCode}</code>
        </pre>
      )}
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
`,s=r.createContext(null),i=r.createContext(null);function v(){const[n,t]=r.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"Provider Pattern Optimization"}),e.jsx("p",{children:"Context providers can cause performance issues if not optimized. Learn how to prevent unnecessary re-renders when using Context API."}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>t("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>t("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="code"?"bold":"normal"},children:"Source Code"})]}),n==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"The Problem with Context"}),e.jsx("p",{children:"When context value changes, ALL consumers re-render, even if they don't use the changed value."}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Bad Pattern:"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{style:{color:"white"},children:`function App() {
        const [theme, setTheme] = useState('light');
        const [user, setUser] = useState(null);
        
        // New object on every render!
        const value = { theme, setTheme, user, setUser };
        
        return (
            <ThemeContext.Provider value={value}>
            <Component /> {/* Re-renders on ANY state change! */}
            </ThemeContext.Provider>
        );
        }`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Solution 1: Split Contexts"}),e.jsx("p",{children:"Separate state and updater functions into different contexts."}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Good Pattern:"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{style:{color:"white"},children:`// Split into two contexts
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
        }`})})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Interactive Demo:"}),e.jsx(d,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Solution 2: Memoize Context Value"}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"useMemo"})," to prevent creating new objects on every render."]}),e.jsx("pre",{children:e.jsx("code",{children:`function Provider({ children }) {
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
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Solution 3: Use Composition"}),e.jsxs("p",{children:["Pass expensive components as ",e.jsx("code",{children:"children"})," to avoid re-renders."]}),e.jsx("pre",{children:e.jsx("code",{children:`function App() {
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
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Best Practices"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Optimization Tips:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Split state and updaters into separate contexts"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Memoize context values with useMemo"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use composition to prevent re-renders"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Keep context values small and focused"}),e.jsx("li",{style:{color:"white"},children:"Consider state management libraries for complex state"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Context updates cause all consumers to re-render"}),e.jsx("li",{children:"Split state and updaters into separate contexts"}),e.jsxs("li",{children:["Memoize context values with ",e.jsx("code",{children:"useMemo"})]}),e.jsx("li",{children:"Use composition to prevent unnecessary re-renders"}),e.jsx("li",{children:"Keep context values small and focused"}),e.jsx("li",{children:"Profile before optimizing - context may not be the bottleneck!"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:a})})]})}function d(){return e.jsx(c,{children:e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsx(l,{}),e.jsx(h,{}),e.jsx(u,{})]})})}function c({children:n}){const[t,o]=r.useState("light");return e.jsx(s.Provider,{value:{theme:t},children:e.jsx(i.Provider,{value:o,children:n})})}function l(){const n=r.useContext(s),t=r.useRef(0);return t.current+=1,n?e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-3)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Current Theme:"})," ",n.theme]}),e.jsxs("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:["Renders: ",t.current," (re-renders on theme change)"]})]}):null}function h(){const n=r.useContext(i),t=r.useRef(0);return t.current+=1,n?e.jsxs("div",{style:{marginBottom:"var(--space-3)"},children:[e.jsx("button",{onClick:()=>n(o=>o==="light"?"dark":"light"),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Toggle Theme"}),e.jsxs("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)",marginTop:"var(--space-2)"},children:["Renders: ",t.current," (never re-renders!)"]})]}):null}function u(){const n=r.useRef(0);return n.current+=1,e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"Expensive Component"}),e.jsxs("p",{style:{color:"white"},children:["Renders: ",n.current," (doesn't use context, never re-renders!)"]})]})}export{v as default};
//# sourceMappingURL=ProviderPattern-ChZn0x1T.js.map
