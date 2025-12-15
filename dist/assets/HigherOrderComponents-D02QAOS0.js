import{r,j as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const t=`// @ts-ignore
import sourceCode from './HigherOrderComponents.tsx?raw'
import { useState } from 'react'

export default function HigherOrderComponents() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Higher-Order Components (HOCs)</h1>
      <p>
        A Higher-Order Component is a function that takes a component and returns a new component
        with additional props or behavior. It's a pattern for reusing component logic.
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
          {/* Section 1: What are HOCs */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What are HOCs?</h2>
            <p>
              HOCs are functions that take a component and return an enhanced version of that component.
            </p>

            <pre>
              <code>{\`const EnhancedComponent = higherOrderComponent(WrappedComponent);

        // Example
        const withAuth = (Component) => {
        return function AuthComponent(props) {
            const isAuthenticated = useAuth();
            
            if (!isAuthenticated) {
            return <Login />;
            }
            
            return <Component {...props} />;
        };
        };

        const ProtectedPage = withAuth(Dashboard);\`}</code>
            </pre>
          </section>

          {/* Section 2: Common Use Cases */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Common Use Cases</h2>

            <div
              style={{
                background: 'var(--color-info)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 When to Use HOCs:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Authentication/Authorization
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>Loading states</li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>Error boundaries</li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>Data fetching</li>
                <li style={{ color: 'white' }}>Analytics tracking</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Example - withLoading */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Example: withLoading HOC</h2>

            <pre>
              <code>{\`function withLoading(Component) {
        return function WithLoadingComponent({ isLoading, ...props }) {
            if (isLoading) {
            return <Spinner />;
            }
            
            return <Component {...props} />;
        };
        }

        // Usage
        const UserListWithLoading = withLoading(UserList);

        <UserListWithLoading isLoading={loading} users={users} />\`}</code>
            </pre>
          </section>

          {/* Section 4: HOCs vs Hooks */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>HOCs vs Custom Hooks</h2>
            <p>
              In modern React, custom hooks are often preferred over HOCs for sharing logic.
            </p>

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
                  background: 'var(--color-warning)',
                  color: 'white',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3 style={{ color: 'white' }}>HOC (Old Pattern)</h3>
                <pre style={{ background: 'transparent' }}>
                  <code style={{ color: 'white' }}>{\`const Enhanced = withAuth(
        withLoading(
            withData(Component)
        )
        );\`}</code>
                </pre>
                <p style={{ color: 'white', marginTop: 'var(--space-3)' }}>
                  ⚠️ Wrapper hell, harder to debug
                </p>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-success)',
                  color: 'white',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3 style={{ color: 'white' }}>Hooks (Modern)</h3>
                <pre style={{ background: 'transparent' }}>
                  <code style={{ color: 'white' }}>{\`function Component() {
        const auth = useAuth();
        const loading = useLoading();
        const data = useData();
        
        return <div>...</div>;
        }\`}</code>
                </pre>
                <p style={{ color: 'white', marginTop: 'var(--space-3)' }}>
                  ✅ Cleaner, easier to understand
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Best Practices */}
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ If Using HOCs:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Don't mutate the original component
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Pass unrelated props through
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Use display names for debugging
                </li>
                <li style={{ color: 'white' }}>Compose HOCs outside render</li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>HOCs are functions that enhance components</li>
              <li>Useful for cross-cutting concerns (auth, loading, etc.)</li>
              <li>Custom hooks are now preferred for most use cases</li>
              <li>HOCs can lead to "wrapper hell" if overused</li>
              <li>Still valid for component composition in some cases</li>
              <li>In React 19, prefer hooks and composition patterns</li>
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
`;function a(){const[e,o]=r.useState("demo");return n.jsxs("div",{children:[n.jsx("h1",{children:"Higher-Order Components (HOCs)"}),n.jsx("p",{children:"A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior. It's a pattern for reusing component logic."}),n.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[n.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="demo"?"bold":"normal"},children:"Lesson"}),n.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="code"?"bold":"normal"},children:"Source Code"})]}),e==="demo"?n.jsxs(n.Fragment,{children:[n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"What are HOCs?"}),n.jsx("p",{children:"HOCs are functions that take a component and return an enhanced version of that component."}),n.jsx("pre",{children:n.jsx("code",{children:`const EnhancedComponent = higherOrderComponent(WrappedComponent);

        // Example
        const withAuth = (Component) => {
        return function AuthComponent(props) {
            const isAuthenticated = useAuth();
            
            if (!isAuthenticated) {
            return <Login />;
            }
            
            return <Component {...props} />;
        };
        };

        const ProtectedPage = withAuth(Dashboard);`})})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Common Use Cases"}),n.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 When to Use HOCs:"}),n.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Authentication/Authorization"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Loading states"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Error boundaries"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Data fetching"}),n.jsx("li",{style:{color:"white"},children:"Analytics tracking"})]})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Example: withLoading HOC"}),n.jsx("pre",{children:n.jsx("code",{children:`function withLoading(Component) {
        return function WithLoadingComponent({ isLoading, ...props }) {
            if (isLoading) {
            return <Spinner />;
            }
            
            return <Component {...props} />;
        };
        }

        // Usage
        const UserListWithLoading = withLoading(UserList);

        <UserListWithLoading isLoading={loading} users={users} />`})})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"HOCs vs Custom Hooks"}),n.jsx("p",{children:"In modern React, custom hooks are often preferred over HOCs for sharing logic."}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-warning)",color:"white",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{style:{color:"white"},children:"HOC (Old Pattern)"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{style:{color:"white"},children:`const Enhanced = withAuth(
        withLoading(
            withData(Component)
        )
        );`})}),n.jsx("p",{style:{color:"white",marginTop:"var(--space-3)"},children:"⚠️ Wrapper hell, harder to debug"})]}),n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{style:{color:"white"},children:"Hooks (Modern)"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{style:{color:"white"},children:`function Component() {
        const auth = useAuth();
        const loading = useLoading();
        const data = useData();
        
        return <div>...</div>;
        }`})}),n.jsx("p",{style:{color:"white",marginTop:"var(--space-3)"},children:"✅ Cleaner, easier to understand"})]})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Best Practices"}),n.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ If Using HOCs:"}),n.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't mutate the original component"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Pass unrelated props through"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use display names for debugging"}),n.jsx("li",{style:{color:"white"},children:"Compose HOCs outside render"})]})]})]}),n.jsxs("section",{children:[n.jsx("h2",{children:"Key Takeaways"}),n.jsxs("ul",{children:[n.jsx("li",{children:"HOCs are functions that enhance components"}),n.jsx("li",{children:"Useful for cross-cutting concerns (auth, loading, etc.)"}),n.jsx("li",{children:"Custom hooks are now preferred for most use cases"}),n.jsx("li",{children:'HOCs can lead to "wrapper hell" if overused'}),n.jsx("li",{children:"Still valid for component composition in some cases"}),n.jsx("li",{children:"In React 19, prefer hooks and composition patterns"})]})]})]}):n.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:n.jsx("code",{children:t})})]})}export{a as default};
//# sourceMappingURL=HigherOrderComponents-D02QAOS0.js.map
