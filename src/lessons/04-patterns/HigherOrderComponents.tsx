// @ts-ignore
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
              <code>{`const EnhancedComponent = higherOrderComponent(WrappedComponent);

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

        const ProtectedPage = withAuth(Dashboard);`}</code>
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
              <code>{`function withLoading(Component) {
        return function WithLoadingComponent({ isLoading, ...props }) {
            if (isLoading) {
            return <Spinner />;
            }
            
            return <Component {...props} />;
        };
        }

        // Usage
        const UserListWithLoading = withLoading(UserList);

        <UserListWithLoading isLoading={loading} users={users} />`}</code>
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
                  <code style={{ color: 'white' }}>{`const Enhanced = withAuth(
        withLoading(
            withData(Component)
        )
        );`}</code>
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
                  <code style={{ color: 'white' }}>{`function Component() {
        const auth = useAuth();
        const loading = useLoading();
        const data = useData();
        
        return <div>...</div>;
        }`}</code>
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
