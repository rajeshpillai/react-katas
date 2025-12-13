export default function React19Compiler() {
  return (
    <div>
      <h1>React 19 Compiler</h1>
      <p>
        The React 19 Compiler automatically optimizes your components, reducing the need for manual
        memoization. This is a game-changer for React performance!
      </p>

      {/* Section 1: What is the Compiler */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What is the React Compiler?</h2>
        <p>
          The React Compiler is a build-time optimization tool that automatically memoizes
          components and values, making your app faster without manual optimization.
        </p>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ What It Does:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Automatically memoizes components
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Optimizes value calculations
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Stabilizes object and array references
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Reduces unnecessary re-renders
            </li>
            <li style={{ color: 'white' }}>Works at build time - no runtime overhead!</li>
          </ul>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>How the Compiler Works</h2>
        <p>
          The compiler analyzes your code and automatically inserts optimizations where beneficial.
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
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3>Your Code:</h3>
            <pre>
              <code>{`function Component({ items }) {
  const filtered = items.filter(
    item => item.active
  );
  
  return (
    <List items={filtered} />
  );
}`}</code>
            </pre>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-primary-100)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3>Compiler Output:</h3>
            <pre>
              <code>{`function Component({ items }) {
  // Compiler adds memoization
  const filtered = useMemo(
    () => items.filter(
      item => item.active
    ),
    [items]
  );
  
  return (
    <List items={filtered} />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 3: What You Don't Need Anymore */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What You Don't Need Anymore</h2>
        <p>
          With the compiler, many manual optimizations become unnecessary.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
            💡 Often Unnecessary:
          </h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <code>useMemo</code> for simple calculations
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <code>useCallback</code> for event handlers
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <code>React.memo</code> for most components
            </li>
            <li style={{ color: 'white' }}>Manual dependency arrays (compiler handles it!)</li>
          </ul>
        </div>
      </section>

      {/* Section 4: When Manual Optimization Still Helps */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>When to Still Use Manual Optimization</h2>
        <p>
          The compiler is smart, but some cases still benefit from manual optimization.
        </p>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
            ⚠️ Still Useful:
          </h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Very expensive calculations</strong> - Heavy data processing
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>External dependencies</strong> - Refs, DOM, third-party libraries
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Custom equality checks</strong> - Deep object comparisons
            </li>
            <li style={{ color: 'white' }}>
              <strong>Profiled bottlenecks</strong> - When profiling shows specific issues
            </li>
          </ul>
        </div>
      </section>

      {/* Section 5: Enabling the Compiler */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Enabling the React Compiler</h2>
        <p>The compiler is opt-in and can be enabled in your build configuration.</p>

        <pre>
          <code>{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // Compiler options
            runtimeModule: 'react-compiler-runtime'
          }]
        ]
      }
    })
  ]
});`}</code>
        </pre>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>💡 Note:</p>
          <p style={{ color: 'white' }}>
            The React Compiler is still experimental in React 19. Check the official React
            documentation for the latest setup instructions and compatibility.
          </p>
        </div>
      </section>

      {/* Section 6: The New Mental Model */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The New React 19 Mental Model</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
            ✅ Modern Approach:
          </h3>
          <ol style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Write clean code</strong> - Focus on readability
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Use composition</strong> - Primary optimization technique
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Let compiler optimize</strong> - Trust automatic optimizations
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Profile if slow</strong> - Measure actual performance
            </li>
            <li style={{ color: 'white' }}>
              <strong>Optimize selectively</strong> - Only when profiling shows need
            </li>
          </ol>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>React 19 Compiler automatically optimizes components</li>
          <li>Reduces need for manual useMemo, useCallback, React.memo</li>
          <li>Works at build time with no runtime overhead</li>
          <li>Still use manual optimization for expensive operations</li>
          <li>Focus on composition and clean code first</li>
          <li>Profile before optimizing - compiler handles most cases</li>
          <li>The future of React is automatic optimization!</li>
        </ul>
      </section>
    </div>
  )
}
