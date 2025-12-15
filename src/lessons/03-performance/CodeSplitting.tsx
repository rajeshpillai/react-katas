import { lazy, Suspense, useState } from 'react'

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const AnotherComponent = lazy(() => import('./AnotherComponent'))

// @ts-ignore
import sourceCode from './CodeSplitting.tsx?raw'

export default function CodeSplitting() {
  const [showHeavy, setShowHeavy] = useState(false)
  const [showAnother, setShowAnother] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Code Splitting</h1>
      <p>
        Code splitting breaks your bundle into smaller chunks that load on demand. This reduces
        initial load time and improves performance.
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
          {/* Section 1: Why Code Split */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Why Code Splitting?</h2>
            <p>Without code splitting, users download your entire app upfront, even code they may never use.</p>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Benefits:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Faster initial page load
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Load code only when needed
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Better caching (unchanged chunks stay cached)
                </li>
                <li style={{ color: 'white' }}>Improved user experience</li>
              </ul>
            </div>
          </section>

          {/* Section 2: React.lazy */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>React.lazy() - Component Lazy Loading</h2>
            <p>
              Use <code>React.lazy()</code> to dynamically import components.
            </p>

            <pre>
              <code>{`import { lazy, Suspense } from 'react';

        // Lazy load the component
        const HeavyComponent = lazy(() => import('./HeavyComponent'));

        function App() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
            </Suspense>
        );
        }`}</code>
            </pre>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Try it:</h3>
              <button
                onClick={() => setShowHeavy(!showHeavy)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-primary-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {showHeavy ? 'Hide' : 'Load'} Heavy Component
              </button>

              {showHeavy && (
                <Suspense fallback={<LoadingFallback />}>
                  <HeavyComponent />
                </Suspense>
              )}
            </div>
          </section>

          {/* Section 3: Route-based Splitting */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Route-Based Code Splitting</h2>
            <p>Split code by routes - the most common pattern.</p>

            <pre>
              <code>{`import { lazy, Suspense } from 'react';
        import { BrowserRouter, Routes, Route } from 'react-router-dom';

        // Lazy load route components
        const Home = lazy(() => import('./pages/Home'));
        const About = lazy(() => import('./pages/About'));
        const Dashboard = lazy(() => import('./pages/Dashboard'));

        function App() {
        return (
            <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
            </BrowserRouter>
        );
        }`}</code>
            </pre>
          </section>

          {/* Section 4: Suspense */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Suspense - Loading States</h2>
            <p>
              <code>Suspense</code> shows a fallback while lazy components load.
            </p>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Multiple Lazy Components:</h3>
              <button
                onClick={() => setShowAnother(!showAnother)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-accent-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {showAnother ? 'Hide' : 'Load'} Another Component
              </button>

              {showAnother && (
                <Suspense fallback={<LoadingFallback />}>
                  <AnotherComponent />
                </Suspense>
              )}

              <pre style={{ marginTop: 'var(--space-4)' }}>
                <code>{`// Nested Suspense boundaries
        <Suspense fallback={<PageLoader />}>
        <Header />
        <Suspense fallback={<SidebarLoader />}>
            <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentLoader />}>
            <Content />
        </Suspense>
        </Suspense>`}</code>
              </pre>
            </div>
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 When to Split:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Routes</strong> - Different pages
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Modals/Dialogs</strong> - Shown conditionally
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Tabs</strong> - Content not immediately visible
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Heavy libraries</strong> - Charts, editors, etc.
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Admin features</strong> - Used by few users
                </li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>
                Code splitting reduces initial bundle size
              </li>
              <li>
                Use <code>React.lazy()</code> for dynamic imports
              </li>
              <li>
                Wrap lazy components in <code>Suspense</code>
              </li>
              <li>Route-based splitting is the most common pattern</li>
              <li>Split code for modals, tabs, and heavy features</li>
              <li>Provide good loading states with Suspense fallbacks</li>
              <li>Vite automatically code-splits lazy imports</li>
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

function LoadingFallback() {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--color-info)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
      }}
    >
      <p style={{ color: 'white' }}>⏳ Loading component...</p>
    </div>
  )
}
