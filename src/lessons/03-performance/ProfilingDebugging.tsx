import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './ProfilingDebugging.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useRef, useEffect } from 'react'

function RenderCounter({ name, color }: { name: string; color: string }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{
      padding: 12,
      background: color,
      borderRadius: 6,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <strong>{name}</strong>
      <span style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '4px 12px',
        borderRadius: 12,
        color: 'white',
        fontWeight: 'bold',
      }}>
        Renders: {renderCount.current}
      </span>
    </div>
  )
}

function useWhyDidYouUpdate(name: string, props: Record<string, unknown>) {
  const previousProps = useRef<Record<string, unknown>>({})

  useEffect(() => {
    if (Object.keys(previousProps.current).length > 0) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changes: Record<string, { from: unknown; to: unknown }> = {}

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changes[key] = { from: previousProps.current[key], to: props[key] }
        }
      })

      if (Object.keys(changes).length > 0) {
        console.log('[why-did-you-update]', name, changes)
      }
    }
    previousProps.current = props
  })
}

function TrackedChild({ value, label }: { value: number; label: string }) {
  useWhyDidYouUpdate('TrackedChild', { value, label })
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{ padding: 12, background: '#e2e8f0', borderRadius: 6, marginBottom: 8 }}>
      <strong>{label}</strong>: {value}
      <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.6 }}>
        (renders: {renderCount.current}) -- check console for prop change logs
      </span>
    </div>
  )
}

export default function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>Render Counter Visualization</h2>
      <p>Interact with the controls and watch which components re-render.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setCount(c => c + 1)} style={btnStyle}>
          Increment ({count})
        </button>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type something..."
          style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e0', flex: 1 }}
        />
      </div>

      <RenderCounter name="Parent (App)" color="#bee3f8" />
      <TrackedChild value={count} label="Counter Child" />
      <TrackedChild value={text.length} label="Text Length Child" />
      <RenderCounter name="Always Re-renders" color="#fefcbf" />
    </div>
  )
}

const btnStyle = { padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 450,
}

export default function ProfilingDebugging() {
  return (
    <LessonLayout title="Profiling & Debugging" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <p>
        Learn how to identify and fix performance issues using React DevTools Profiler and other
        debugging techniques.
      </p>

      {/* Section 1: React DevTools Profiler */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>React DevTools Profiler</h2>
        <p>
          The Profiler records component render times and helps identify performance bottlenecks.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>How to Use:</h3>
          <ol style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Install React DevTools browser extension
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Open DevTools &rarr; Profiler tab
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Click record button
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Interact with your app
            </li>
            <li style={{ color: 'white' }}>Stop recording and analyze results</li>
          </ol>
        </div>
      </section>

      {/* Section 2: What to Look For */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What to Look For</h2>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Red Flags:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Long render times</strong> - Components taking &gt;16ms
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Frequent re-renders</strong> - Same component rendering many times
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Unnecessary renders</strong> - Components rendering without prop changes
            </li>
            <li style={{ color: 'white' }}>
              <strong>Large component trees</strong> - Deep nesting causing cascading renders
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Console Debugging */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Console Debugging Techniques</h2>
        <p>Use console logs to track renders and identify issues.</p>

        <pre>
          <code>{`function Component({ value }) {
    // Track renders
    console.log('Component rendered with:', value);

    // Track effect runs
    useEffect(() => {
        console.log('Effect ran');
        return () => console.log('Effect cleanup');
    }, [value]);

    // Track why component rendered
    useEffect(() => {
        console.log('Value changed from', prevValue, 'to', value);
    });

    return <div>{value}</div>;
    }`}</code>
        </pre>
      </section>

      {/* Section 4: Why Did You Render */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Custom useWhyDidYouUpdate Hook</h2>
        <p>Track which props caused a re-render.</p>

        <pre>
          <code>{`function useWhyDidYouUpdate(name, props) {
    const previousProps = useRef();

    useEffect(() => {
        if (previousProps.current) {
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        const changedProps = {};

        allKeys.forEach(key => {
            if (previousProps.current[key] !== props[key]) {
            changedProps[key] = {
                from: previousProps.current[key],
                to: props[key]
            };
            }
        });

        if (Object.keys(changedProps).length > 0) {
            console.log('[why-did-you-update]', name, changedProps);
        }
        }

        previousProps.current = props;
    });
    }

    // Usage
    function Component(props) {
    useWhyDidYouUpdate('Component', props);
    return <div>{props.value}</div>;
    }`}</code>
        </pre>
      </section>

      {/* Section 5: Performance Checklist */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Performance Optimization Checklist</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Optimization Steps:</h3>
          <ol style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Profile first</strong> - Measure before optimizing
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Use composition</strong> - Primary optimization technique
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Colocate state</strong> - Keep state close to where it's used
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Code split</strong> - Lazy load heavy components
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Optimize context</strong> - Split providers, memoize values
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Use memo selectively</strong> - Only for expensive components
            </li>
            <li style={{ color: 'white' }}>
              <strong>Profile again</strong> - Verify improvements
            </li>
          </ol>
        </div>
      </section>

      {/* Section 6: Common Mistakes */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Performance Mistakes</h2>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Avoid These:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Creating objects/arrays in render
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Inline function definitions in JSX
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Lifting state too high
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Not using keys in lists
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Premature optimization
            </li>
            <li style={{ color: 'white' }}>Over-memoization</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Use React DevTools Profiler to identify bottlenecks</li>
          <li>Look for long render times and unnecessary re-renders</li>
          <li>Console logging helps track renders and effects</li>
          <li>Create custom hooks to debug prop changes</li>
          <li>Always profile before and after optimizations</li>
          <li>Follow the optimization checklist systematically</li>
          <li>Avoid common mistakes like creating objects in render</li>
        </ul>
      </section>
    </LessonLayout>
  )
}
