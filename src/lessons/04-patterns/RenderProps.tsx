import { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundVariant } from '@components/playground'

// @ts-ignore
import sourceCode from './RenderProps.tsx?raw'

export const playgroundVariants: PlaygroundVariant[] = [
  {
    id: 'duplicated',
    label: 'Before — duplicated tracking logic',
    description:
      "Two components both need the mouse position. Each tracks pointer events itself. Adding a third consumer means copying the same effect a third time.",
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useState, useEffect } from 'react'

function Crosshair() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
        window.addEventListener('mousemove', fn)
        return () => window.removeEventListener('mousemove', fn)
    }, [])
    return <div>Crosshair: ({pos.x}, {pos.y})</div>
}

function CoordinatesBadge() {
    // Same logic, copy-pasted.
    const [pos, setPos] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
        window.addEventListener('mousemove', fn)
        return () => window.removeEventListener('mousemove', fn)
    }, [])
    return <div>Badge: ({pos.x}, {pos.y})</div>
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Two consumers, two copies of the logic</h2>
            <Crosshair />
            <CoordinatesBadge />
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 240,
  },
  {
    id: 'render-prop',
    label: 'After — render prop',
    description:
      "<Mouse> tracks the position once and lets each consumer render whatever they want via children-as-function. Same logic, multiple UIs.",
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useState, useEffect, ReactNode } from 'react'

function Mouse({ children }: { children: (pos: { x: number; y: number }) => ReactNode }) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
        window.addEventListener('mousemove', fn)
        return () => window.removeEventListener('mousemove', fn)
    }, [])
    return <>{children(pos)}</>
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>One Mouse, many consumers</h2>
            <Mouse>{pos => <div>Crosshair: ({pos.x}, {pos.y})</div>}</Mouse>
            <Mouse>{pos => <div>Badge: ({pos.x}, {pos.y})</div>}</Mouse>
            <Mouse>{pos => (
                <div style={{ marginTop: 8, padding: 8, background: 'var(--pg-card)', border: '1px solid var(--pg-card-border)', borderRadius: 6 }}>
                    Quadrant: {pos.x > window.innerWidth/2 ? 'right' : 'left'}-{pos.y > window.innerHeight/2 ? 'bottom' : 'top'}
                </div>
            )}</Mouse>
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 280,
  },
  {
    id: 'data-driven',
    label: 'Data-driven render prop',
    description:
      'A larger demo: a List that exposes search-filter state via render prop, letting consumers customize how each row is drawn.',
    files: [
      {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState } from 'react'

function MouseTracker({ render }: { render: (x: number, y: number) => React.ReactNode }) {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                height: 200,
                border: '2px dashed #ccc',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'crosshair',
            }}
        >
            {render(position.x, position.y)}
        </div>
    )
}

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Render Props: Mouse Tracker</h2>
            <p>Move your mouse over the dashed area below:</p>
            <MouseTracker
                render={(x, y) => (
                    <div style={{ padding: 16, background: '#e0f2fe', borderRadius: 6 }}>
                        <p><strong>Mouse Position:</strong> X: {x}, Y: {y}</p>
                    </div>
                )}
            />
            <h3 style={{ marginTop: 16 }}>Different render prop usage:</h3>
            <MouseTracker
                render={(x, y) => (
                    <div
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: '#3b82f6',
                            transform: \`translate(\${(x % 200) - 100}px, \${(y % 200) - 100}px)\`,
                            transition: 'transform 0.1s',
                        }}
                    />
                )}
            />
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 450,
  },
]

export default function RenderProps() {
  return (
    <LessonLayout title="Render Props" playgroundVariants={playgroundVariants} sourceCode={sourceCode}>
      <div>
        <p>
          Render props is a pattern where a component takes a function as a prop and calls it to
          render content. It's a powerful way to share code between components.
        </p>

        {/* Section 1: What are Render Props */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What are Render Props?</h2>
          <p>
            A component with a render prop takes a function that returns a React element and calls it
            instead of implementing its own render logic.
          </p>

          <pre>
            <code>{`<DataFetcher
      url="/api/users"
      render={(data, loading) => (
          loading ? <Spinner /> : <UserList users={data} />
      )}
      />`}</code>
          </pre>
        </section>

        {/* Section 2: Example - Mouse Tracker */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example: Mouse Position Tracker</h2>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo:</h3>
            <MouseTracker
              render={(x, y) => (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    background: 'var(--surface-primary)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <p>
                    <strong>Mouse Position:</strong> X: {x}, Y: {y}
                  </p>
                </div>
              )}
            />

            <pre style={{ marginTop: 'var(--space-4)' }}>
              <code>{`function MouseTracker({ render }) {
      const [position, setPosition] = useState({ x: 0, y: 0 });

      const handleMouseMove = (e) => {
          setPosition({ x: e.clientX, y: e.clientY });
      };

      return (
          <div onMouseMove={handleMouseMove}>
          {render(position.x, position.y)}
          </div>
      );
      }

      // Usage
      <MouseTracker
      render={(x, y) => (
          <div>Mouse: {x}, {y}</div>
      )}
      />`}</code>
            </pre>
          </div>
        </section>

        {/* Section 3: Children as Function */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Children as a Function</h2>
          <p>
            The <code>children</code> prop can also be a function - this is a common variation of the
            render props pattern.
          </p>

          <pre>
            <code>{`<Toggle>
      {(on, toggle) => (
          <button onClick={toggle}>
          {on ? 'ON' : 'OFF'}
          </button>
      )}
      </Toggle>`}</code>
          </pre>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Toggle Example:</h3>
            <Toggle>
              {(on, toggle) => (
                <button
                  onClick={toggle}
                  style={{
                    padding: 'var(--space-3) var(--space-6)',
                    background: on ? 'var(--color-success)' : 'var(--color-gray-500)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  {on ? 'ON' : 'OFF'}
                </button>
              )}
            </Toggle>
          </div>
        </section>

        {/* Section 4: Render Props vs Hooks */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Render Props vs Custom Hooks</h2>
          <p>
            In modern React, custom hooks often replace render props for sharing logic. However,
            render props are still useful for UI composition.
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
                background: 'var(--surface-accent)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>Render Props</h3>
              <pre>
                <code>{`<MouseTracker
      render={(x, y) => (
          <div>{x}, {y}</div>
      )}
      />`}</code>
              </pre>
              <p style={{ marginTop: 'var(--space-3)' }}>Good for UI composition</p>
            </div>

            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--surface-primary)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>Custom Hook</h3>
              <pre>
                <code>{`const { x, y } = useMousePosition();

      return <div>{x}, {y}</div>;`}</code>
              </pre>
              <p style={{ marginTop: 'var(--space-3)' }}>Good for logic reuse</p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Render props share code by passing a function as a prop</li>
            <li>
              <code>children</code> can be a function (common variation)
            </li>
            <li>Great for UI composition and flexible rendering</li>
            <li>Custom hooks often replace render props for logic sharing</li>
            <li>Still useful when you need control over rendering</li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}

// Example components

function MouseTracker({ render }: { render: (x: number, y: number) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return <div onMouseMove={handleMouseMove}>{render(position.x, position.y)}</div>
}

function Toggle({ children }: { children: (on: boolean, toggle: () => void) => React.ReactNode }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return <div>{children(on, toggle)}</div>
}
