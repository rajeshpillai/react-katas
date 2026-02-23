import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './React19Compiler.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useMemo, useCallback, memo, useRef } from 'react'

// --- Before React 19 Compiler: Manual memoization needed ---
function BeforeCompiler() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // Without useMemo, this creates a new array every render
  const expensiveList = useMemo(
    () => Array.from({ length: 5 }, (_, i) => \`Item \${i + 1} (count: \${count})\`),
    [count]
  )

  // Without useCallback, this creates a new function every render
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  return (
    <div style={{ padding: 12, border: '2px solid #e2e8f0', borderRadius: 8, marginBottom: 16 }}>
      <h3>Before: Manual Memoization</h3>
      <p style={{ fontSize: 13, color: '#718096' }}>Requires useMemo, useCallback, memo</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e0', width: '100%', marginBottom: 8 }}
      />
      <MemoizedChild items={expensiveList} onClick={handleClick} label="Memoized Child" />
      <div style={{ fontSize: 12, color: '#a0aec0', marginTop: 4 }}>Count: {count}</div>
    </div>
  )
}

// --- After React 19 Compiler: Just write clean code ---
function AfterCompiler() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const renderCount = useRef(0)
  renderCount.current += 1

  // Compiler auto-memoizes this
  const items = Array.from({ length: 5 }, (_, i) => \`Item \${i + 1} (count: \${count})\`)

  // Compiler auto-stabilizes this reference
  const handleClick = () => setCount((c) => c + 1)

  return (
    <div style={{ padding: 12, border: '2px solid #48bb78', borderRadius: 8 }}>
      <h3 style={{ color: '#276749' }}>After: Clean Code, Compiler Optimizes</h3>
      <p style={{ fontSize: 13, color: '#718096' }}>No manual memoization needed!</p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
        style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e0', width: '100%', marginBottom: 8 }}
      />
      <div style={{ padding: 8, background: '#f0fff4', borderRadius: 6, marginBottom: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{ fontSize: 13 }}>{item}</div>
        ))}
      </div>
      <button onClick={handleClick} style={btnStyle}>Increment</button>
      <div style={{ fontSize: 12, color: '#a0aec0', marginTop: 4 }}>
        Count: {count} | Parent renders: {renderCount.current}
      </div>
    </div>
  )
}

const MemoizedChild = memo(function MemoizedChild({
  items,
  onClick,
  label,
}: {
  items: string[]
  onClick: () => void
  label: string
}) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{ padding: 8, background: '#ebf8ff', borderRadius: 6, marginBottom: 4 }}>
      {items.map((item, i) => (
        <div key={i} style={{ fontSize: 13 }}>{item}</div>
      ))}
      <button onClick={onClick} style={btnStyle}>Increment</button>
      <span style={{ fontSize: 12, color: '#a0aec0', marginLeft: 8 }}>
        {label} renders: {renderCount.current}
      </span>
    </div>
  )
})

export default function App() {
  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>React 19 Compiler: Before vs After</h2>
      <p style={{ marginBottom: 16 }}>
        Type in each input and compare. Both work the same, but the "After"
        version requires no manual memoization.
      </p>
      <BeforeCompiler />
      <AfterCompiler />
    </div>
  )
}

const btnStyle = { padding: '6px 12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 550,
}

export default function React19Compiler() {
  return (
    <LessonLayout title="React 19 Compiler" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>What It Does:</h3>
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
              background: 'var(--surface-primary)',
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
            Often Unnecessary:
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
            Still Useful:
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
          <p style={{ color: 'white', fontWeight: 'bold' }}>Note:</p>
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
            Modern Approach:
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
    </LessonLayout>
  )
}
