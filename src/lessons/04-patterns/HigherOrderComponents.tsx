import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './HigherOrderComponents.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, ComponentType, useEffect, useRef } from 'react'

// The withLogger HOC - logs when the wrapped component renders
function withLogger<P extends object>(WrappedComponent: ComponentType<P>, componentName: string) {
    return function WithLoggerComponent(props: P) {
        const renderCount = useRef(0)
        renderCount.current += 1

        useEffect(() => {
            console.log(\`[\${componentName}] Mounted\`)
            return () => console.log(\`[\${componentName}] Unmounted\`)
        }, [])

        return (
            <div style={{ border: '2px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                    [{componentName}] Render count: {renderCount.current}
                </div>
                <WrappedComponent {...props} />
            </div>
        )
    }
}

// Simple components to wrap
function Counter() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>Count: <strong>{count}</strong></p>
            <button
                onClick={() => setCount(c => c + 1)}
                style={{ padding: '6px 16px', cursor: 'pointer' }}
            >
                Increment
            </button>
        </div>
    )
}

function Greeting({ name }: { name: string }) {
    return <p>Hello, <strong>{name}</strong>!</p>
}

// Enhanced components
const LoggedCounter = withLogger(Counter, 'Counter')
const LoggedGreeting = withLogger(Greeting, 'Greeting')

export default function App() {
    const [name, setName] = useState('World')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>withLogger HOC Demo</h2>
            <p style={{ color: '#6b7280', fontSize: 14 }}>
                Each component is wrapped with withLogger, which tracks render counts.
                Open the console to see mount/unmount logs.
            </p>
            <LoggedCounter />
            <div style={{ marginBottom: 12 }}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Type a name..."
                    style={{ padding: 8, fontSize: 14, marginBottom: 8, width: '100%' }}
                />
            </div>
            <LoggedGreeting name={name} />
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 450,
}

export default function HigherOrderComponents() {
  return (
    <LessonLayout title="Higher-Order Components (HOCs)" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
        <p>
          A Higher-Order Component is a function that takes a component and returns a new component
          with additional props or behavior. It's a pattern for reusing component logic.
        </p>

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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>When to Use HOCs:</h3>
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
                Wrapper hell, harder to debug
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
                Cleaner, easier to understand
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>If Using HOCs:</h3>
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
      </div>
    </LessonLayout>
  )
}
