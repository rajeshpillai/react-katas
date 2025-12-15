import{r,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const a=`import { createContext, useContext, useState, ReactNode, useMemo } from 'react'

// Example context
interface ThemeContextType {
  theme: string
  colors: {
    primary: string
    secondary: string
  }
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

// @ts-ignore
import sourceCode from './ContextDeepDive.tsx?raw'

export default function ContextDeepDive() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Context API Deep Dive</h1>
      <p>
        Master the Context API for sharing data across your component tree without prop drilling.
        Learn advanced patterns and best practices.
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
          {/* Section 1: Context Basics */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Context API Basics</h2>
            <p>Context provides a way to pass data through the component tree without manually passing props at every level.</p>

            <pre>
              <code>{\`// 1. Create context
        const ThemeContext = createContext(null);

        // 2. Provide value
        function App() {
        const [theme, setTheme] = useState('light');
        
        return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
            <Component />
            </ThemeContext.Provider>
        );
        }

        // 3. Consume value
        function Component() {
        const { theme } = useContext(ThemeContext);
        return <div className={theme}>...</div>;
        }\`}</code>
            </pre>
          </section>

          {/* Section 2: Multiple Contexts */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Multiple Contexts</h2>
            <p>You can use multiple contexts in the same app for different concerns.</p>

            <pre>
              <code>{\`function App() {
        return (
            <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                <App />
                </LanguageProvider>
            </ThemeProvider>
            </AuthProvider>
        );
        }\`}</code>
            </pre>
          </section>

          {/* Section 3: Context with useReducer */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Context + useReducer Pattern</h2>
            <p>Combine Context with useReducer for complex state management.</p>

            <pre>
              <code>{\`function AppProvider({ children }) {
        const [state, dispatch] = useReducer(reducer, initialState);
        
        const value = useMemo(() => ({ state, dispatch }), [state]);
        
        return (
            <AppContext.Provider value={value}>
            {children}
            </AppContext.Provider>
        );
        }

        // Custom hook for easy access
        function useApp() {
        const context = useContext(AppContext);
        if (!context) throw new Error('useApp must be within AppProvider');
        return context;
        }\`}</code>
            </pre>
          </section>

          {/* Section 4: Performance Tips */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Performance Optimization</h2>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Best Practices:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Split state and updaters into separate contexts
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Memoize context values with useMemo
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Keep context values small and focused
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Use composition to prevent re-renders
                </li>
                <li style={{ color: 'white' }}>Create custom hooks for context access</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Demo */}
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
              <ThemeProvider>
                <ThemeConsumer />
              </ThemeProvider>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Context avoids prop drilling for global state</li>
              <li>Create context with createContext, provide with Provider</li>
              <li>Consume with useContext hook</li>
              <li>Combine with useReducer for complex state</li>
              <li>Split contexts for better performance</li>
              <li>Memoize values to prevent unnecessary re-renders</li>
              <li>Create custom hooks for cleaner API</li>
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

// Demo components

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')

  const value = useMemo(
    () => ({
      theme,
      colors: {
        primary: theme === 'light' ? '#0066cc' : '#66b3ff',
        secondary: theme === 'light' ? '#6c757d' : '#adb5bd',
      },
      setTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function ThemeConsumer() {
  const context = useContext(ThemeContext)
  if (!context) return null

  const { theme, colors, setTheme } = context

  return (
    <div>
      <div
        style={{
          padding: 'var(--space-4)',
          background: theme === 'light' ? '#f8f9fa' : '#212529',
          color: theme === 'light' ? '#212529' : '#f8f9fa',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <p>
          <strong>Current Theme:</strong> {theme}
        </p>
        <p>
          <strong>Primary Color:</strong> {colors.primary}
        </p>
        <p>
          <strong>Secondary Color:</strong> {colors.secondary}
        </p>
      </div>

      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: colors.primary,
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Toggle Theme
      </button>
    </div>
  )
}
`,i=r.createContext(null);function h(){const[t,n]=r.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"Context API Deep Dive"}),e.jsx("p",{children:"Master the Context API for sharing data across your component tree without prop drilling. Learn advanced patterns and best practices."}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>n("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:t==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:t==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>n("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:t==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:t==="code"?"bold":"normal"},children:"Source Code"})]}),t==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Context API Basics"}),e.jsx("p",{children:"Context provides a way to pass data through the component tree without manually passing props at every level."}),e.jsx("pre",{children:e.jsx("code",{children:`// 1. Create context
        const ThemeContext = createContext(null);

        // 2. Provide value
        function App() {
        const [theme, setTheme] = useState('light');
        
        return (
            <ThemeContext.Provider value={{ theme, setTheme }}>
            <Component />
            </ThemeContext.Provider>
        );
        }

        // 3. Consume value
        function Component() {
        const { theme } = useContext(ThemeContext);
        return <div className={theme}>...</div>;
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Multiple Contexts"}),e.jsx("p",{children:"You can use multiple contexts in the same app for different concerns."}),e.jsx("pre",{children:e.jsx("code",{children:`function App() {
        return (
            <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                <App />
                </LanguageProvider>
            </ThemeProvider>
            </AuthProvider>
        );
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Context + useReducer Pattern"}),e.jsx("p",{children:"Combine Context with useReducer for complex state management."}),e.jsx("pre",{children:e.jsx("code",{children:`function AppProvider({ children }) {
        const [state, dispatch] = useReducer(reducer, initialState);
        
        const value = useMemo(() => ({ state, dispatch }), [state]);
        
        return (
            <AppContext.Provider value={value}>
            {children}
            </AppContext.Provider>
        );
        }

        // Custom hook for easy access
        function useApp() {
        const context = useContext(AppContext);
        if (!context) throw new Error('useApp must be within AppProvider');
        return context;
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Performance Optimization"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Best Practices:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Split state and updaters into separate contexts"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Memoize context values with useMemo"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Keep context values small and focused"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use composition to prevent re-renders"}),e.jsx("li",{style:{color:"white"},children:"Create custom hooks for context access"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Interactive Demo"}),e.jsx("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:e.jsx(c,{children:e.jsx(d,{})})})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Context avoids prop drilling for global state"}),e.jsx("li",{children:"Create context with createContext, provide with Provider"}),e.jsx("li",{children:"Consume with useContext hook"}),e.jsx("li",{children:"Combine with useReducer for complex state"}),e.jsx("li",{children:"Split contexts for better performance"}),e.jsx("li",{children:"Memoize values to prevent unnecessary re-renders"}),e.jsx("li",{children:"Create custom hooks for cleaner API"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:a})})]})}function c({children:t}){const[n,o]=r.useState("light"),s=r.useMemo(()=>({theme:n,colors:{primary:n==="light"?"#0066cc":"#66b3ff",secondary:n==="light"?"#6c757d":"#adb5bd"},setTheme:o}),[n]);return e.jsx(i.Provider,{value:s,children:t})}function d(){const t=r.useContext(i);if(!t)return null;const{theme:n,colors:o,setTheme:s}=t;return e.jsxs("div",{children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:n==="light"?"#f8f9fa":"#212529",color:n==="light"?"#212529":"#f8f9fa",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Current Theme:"})," ",n]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Primary Color:"})," ",o.primary]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Secondary Color:"})," ",o.secondary]})]}),e.jsx("button",{onClick:()=>s(n==="light"?"dark":"light"),style:{padding:"var(--space-3) var(--space-6)",background:o.primary,color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Toggle Theme"})]})}export{h as default};
//# sourceMappingURL=ContextDeepDive-DO2SZqcX.js.map
