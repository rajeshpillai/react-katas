import { useState, useRef, useEffect } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './RenderTimingReconciliation.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useRef } from 'react'

let nextId = 4

interface Item {
    id: number
    text: string
}

function ListItem({ item }: { item: Item }) {
    const renderCount = useRef(0)
    renderCount.current += 1

    return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: '#f9fafb', color: '#1f2937', borderRadius: 6, marginBottom: 4 }}>
            <span style={{ flex: 1 }}>{item.text}</span>
            <input
                type="text"
                placeholder="Type here..."
                style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 4, width: 140 }}
            />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>Renders: {renderCount.current}</span>
        </div>
    )
}

export default function App() {
    const [useKeys, setUseKeys] = useState(true)
    const [items, setItems] = useState<Item[]>([
        { id: 1, text: 'Apple' },
        { id: 2, text: 'Banana' },
        { id: 3, text: 'Cherry' },
    ])

    const addToTop = () => {
        setItems(prev => [{ id: nextId++, text: 'New Item ' + nextId }, ...prev])
    }

    const shuffle = () => {
        setItems(prev => [...prev].sort(() => Math.random() - 0.5))
    }

    const removeFirst = () => {
        setItems(prev => prev.slice(1))
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Key Behavior Demo</h2>
            <p>Type something in each input, then shuffle or add items. Watch what happens to the input values.</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: useKeys ? '#3b82f6' : '#ef4444', color: 'white', borderRadius: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={useKeys} onChange={e => setUseKeys(e.target.checked)} />
                    {useKeys ? 'Using key={item.id}' : 'Using key={index}'}
                </label>
                <button onClick={addToTop} style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Add to Top
                </button>
                <button onClick={shuffle} style={{ padding: '6px 12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Shuffle
                </button>
                <button onClick={removeFirst} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                    Remove First
                </button>
            </div>

            <div>
                {items.map((item, index) => (
                    <ListItem
                        key={useKeys ? item.id : index}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 450,
}

// --- Demo Components ---

function RenderCounter({ label }: { label: string }) {
  const count = useRef(0)
  count.current += 1

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-3)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-2)',
      }}
    >
      <span>{label}</span>
      <span
        style={{
          background: 'var(--color-primary-500)',
          color: 'white',
          padding: 'var(--space-1) var(--space-3)',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'bold',
        }}
      >
        Renders: {count.current}
      </span>
    </div>
  )
}

// --- Demo: When does React re-render? ---

function RerenderTriggersDemo() {
  const [parentCount, setParentCount] = useState(0)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ marginBottom: 'var(--space-3)' }}>
        Click the button to trigger a state change in the parent. Watch how both the parent and
        all children re-render, even though ChildB receives no props.
      </p>

      <button
        onClick={() => setParentCount((c) => c + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        Update parent state (count: {parentCount})
      </button>

      <RenderCounter label="Parent" />
      <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--border-color)' }}>
        <RenderCounter label="ChildA (receives parentCount prop)" />
        <RenderCounter label="ChildB (receives no props)" />
      </div>

      <div
        style={{
          marginTop: 'var(--space-3)',
          padding: 'var(--space-3)',
          background: 'var(--color-warning)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <p style={{ color: 'white' }}>
          <strong>Note:</strong> When a parent re-renders, ALL children re-render by default --
          even if their props did not change. This is why React.memo and composition patterns exist.
        </p>
      </div>
    </div>
  )
}

// --- Demo: Same type vs different type ---

function ReconciliationDemo() {
  const [useDiv, setUseDiv] = useState(true)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ marginBottom: 'var(--space-3)' }}>
        Toggle between a <code>&lt;div&gt;</code> and a <code>&lt;section&gt;</code>. When the element
        type changes, React unmounts the old tree and mounts a new one. Type something in the input,
        then toggle -- the input value is lost.
      </p>

      <button
        onClick={() => setUseDiv((d) => !d)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        Switch to {useDiv ? '<section>' : '<div>'}
      </button>

      <div
        style={{
          padding: 'var(--space-3)',
          border: '2px solid',
          borderColor: useDiv ? 'var(--color-primary-500)' : 'var(--color-accent-500)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
          Current wrapper: <code>{useDiv ? '<div>' : '<section>'}</code>
        </p>

        {useDiv ? (
          <div>
            <input
              type="text"
              placeholder="Type here, then toggle..."
              style={{
                padding: 'var(--space-2)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                width: '100%',
              }}
            />
          </div>
        ) : (
          <section>
            <input
              type="text"
              placeholder="Type here, then toggle..."
              style={{
                padding: 'var(--space-2)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                width: '100%',
              }}
            />
          </section>
        )}
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Different type = unmount + mount. Same type = update props in place.
      </p>
    </div>
  )
}

// --- Demo: Key prop and list reordering ---

let nextId = 4

interface Item {
  id: number
  text: string
}

function ListItem({ item }: { item: Item }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--space-2)',
        alignItems: 'center',
        padding: 'var(--space-2) var(--space-3)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-1)',
      }}
    >
      <span style={{ flex: 1, fontWeight: 'bold' }}>{item.text}</span>
      <input
        type="text"
        placeholder="Type here..."
        style={{
          padding: 'var(--space-1) var(--space-2)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          width: 140,
          fontSize: 'var(--font-size-sm)',
        }}
      />
      <span
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-tertiary)',
          minWidth: 70,
          textAlign: 'right',
        }}
      >
        Renders: {renderCount.current}
      </span>
    </div>
  )
}

function KeyDemo() {
  const [useKeys, setUseKeys] = useState(true)
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Cherry' },
  ])

  const addToTop = () => {
    setItems((prev) => [{ id: nextId++, text: 'New Item ' + nextId }, ...prev])
  }

  const shuffle = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5))
  }

  const removeFirst = () => {
    setItems((prev) => prev.slice(1))
  }

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ marginBottom: 'var(--space-3)' }}>
        Type something in each input field, then shuffle or add items. With proper keys, inputs
        follow their items. With index keys, inputs stay in place while text labels move.
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            background: useKeys ? 'var(--color-success)' : 'var(--color-error)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <input type="checkbox" checked={useKeys} onChange={(e) => setUseKeys(e.target.checked)} />
          {useKeys ? 'Using key={item.id}' : 'Using key={index}'}
        </label>
        <button
          onClick={addToTop}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Add to Top
        </button>
        <button
          onClick={shuffle}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-warning)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Shuffle
        </button>
        <button
          onClick={removeFirst}
          style={{
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-error)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Remove First
        </button>
      </div>

      <div>
        {items.map((item, index) => (
          <ListItem key={useKeys ? item.id : index} item={item} />
        ))}
      </div>

      <div
        style={{
          marginTop: 'var(--space-3)',
          padding: 'var(--space-3)',
          background: useKeys ? 'var(--color-success)' : 'var(--color-error)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <p style={{ color: 'white' }}>
          {useKeys
            ? 'With key={item.id}: React matches each element to its previous instance by ID. Inputs follow their items.'
            : 'With key={index}: React matches by position. When items shift, inputs stay at their index position while labels change.'}
        </p>
      </div>
    </div>
  )
}

// --- Demo: Key Reset Trick ---

function TimerWidget() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((e) => e + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>{elapsed}s</p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Timer started at mount
      </p>
    </div>
  )
}

function KeyResetDemo() {
  const [timerKey, setTimerKey] = useState(0)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ marginBottom: 'var(--space-3)' }}>
        Changing the <code>key</code> prop on a component forces React to unmount and remount it,
        resetting all internal state. This is a useful trick for resetting forms, timers, or animations.
      </p>

      <button
        onClick={() => setTimerKey((k) => k + 1)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        Reset Timer (key={timerKey})
      </button>

      <TimerWidget key={timerKey} />

      <pre style={{ background: 'transparent', marginTop: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
        <code>{`// The key reset trick:
<TimerWidget key={timerKey} />

// Changing timerKey forces unmount + remount
// All internal state (elapsed time) resets to initial`}</code>
      </pre>
    </div>
  )
}

// --- Demo: Render counter for children ---

function ChildRenderDemo() {
  const [parentState, setParentState] = useState(0)
  const [childProp, setChildProp] = useState('hello')
  const parentRenderCount = useRef(0)
  parentRenderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          padding: 'var(--space-3)',
          background: 'var(--surface-primary)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-3)',
        }}
      >
        <strong>Parent</strong> (renders: {parentRenderCount.current})
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        <button
          onClick={() => setParentState((c) => c + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Update parent state ({parentState})
        </button>
        <button
          onClick={() => setChildProp((p) => p + '!')}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-accent-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Update child prop
        </button>
      </div>

      <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '3px solid var(--border-color)' }}>
        <RenderCounter label={`ChildA (prop: "${childProp}")`} />
        <RenderCounter label="ChildB (no props)" />
        <RenderCounter label="ChildC (no props)" />
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Both buttons cause all children to re-render. React re-renders the entire subtree by default.
      </p>
    </div>
  )
}

// --- Main Lesson ---

export default function RenderTimingReconciliation() {
  return (
    <LessonLayout
      title="Render Timing and Reconciliation"
      playgroundConfig={playgroundConfig}
      sourceCode={sourceCode}
    >
      <div>
        <p>
          Understanding when React re-renders and how reconciliation works is essential for building
          performant applications. This lesson covers the render triggers, the diffing algorithm,
          and how the <code>key</code> prop controls element identity.
        </p>

        {/* Section 1: When does React re-render? */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>When Does React Re-render?</h2>
          <p>
            A React component re-renders in three situations:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--surface-primary)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>1. State Change</h3>
              <p>
                When <code>setState</code> (or a dispatch from <code>useReducer</code>) is called, the component
                and its entire subtree re-render.
              </p>
              <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                <code>{`const [count, setCount] = useState(0)
setCount(1) // triggers re-render of this component + children`}</code>
              </pre>
            </div>

            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--surface-accent)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3>2. Parent Re-render</h3>
              <p>
                When a parent component re-renders, all its children re-render too -- regardless of whether
                their props changed. This is the default behavior.
              </p>
              <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                <code>{`function Parent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Child /> {/* re-renders even though it has no props */}
    </div>
  )
}`}</code>
              </pre>
            </div>

            <div
              style={{
                padding: 'var(--space-4)',
                background: 'var(--color-success)',
                color: 'white',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <h3 style={{ color: 'white' }}>3. Context Change</h3>
              <p style={{ color: 'white' }}>
                When a context value changes, all components consuming that context re-render --
                even if they only use a portion of the context value.
              </p>
              <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                <code style={{ color: 'white' }}>{`const ThemeContext = createContext('light')

function Child() {
  const theme = useContext(ThemeContext) // re-renders when value changes
  return <div className={theme}>...</div>
}`}</code>
              </pre>
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Render Cascading</h3>
            <RerenderTriggersDemo />
          </div>
        </section>

        {/* Section 2: What Reconciliation Does */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What Reconciliation Does</h2>
          <p>
            After a component renders, React does not immediately update the DOM. Instead, it creates
            a new virtual element tree and <strong>diffs</strong> it against the previous tree. This
            process is called <strong>reconciliation</strong>.
          </p>

          <pre style={{ background: 'transparent' }}>
            <code>{`// Simplified reconciliation algorithm:
function reconcile(oldTree, newTree) {
  // 1. If types differ -> unmount old, mount new
  if (oldTree.type !== newTree.type) {
    unmount(oldTree)
    mount(newTree)
    return
  }

  // 2. Same type -> update props, recurse on children
  updateProps(oldTree, newTree)

  // 3. For children, use keys to match old and new children
  reconcileChildren(oldTree.children, newTree.children)
}`}</code>
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>The Two Rules:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Same type</strong> = update. React keeps the DOM node and updates only the changed attributes.
                Component instances are preserved, state is maintained.
              </li>
              <li style={{ color: 'white' }}>
                <strong>Different type</strong> = unmount + mount. React destroys the entire subtree (including
                DOM nodes and state) and builds a new one from scratch.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Same Type vs Different Type */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Demo: Same Type vs Different Type</h2>
          <p>
            When the element type changes (e.g., from <code>&lt;div&gt;</code> to <code>&lt;section&gt;</code>),
            React unmounts the entire old subtree and mounts a new one. All internal state is lost.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo:</h3>
            <ReconciliationDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// These produce DIFFERENT element types:
{condition ? <div><input /></div> : <section><input /></section>}
// Toggling condition -> unmount div subtree, mount section subtree
// Input value is LOST

// These produce the SAME element type:
{condition ? <div className="a"><input /></div> : <div className="b"><input /></div>}
// Toggling condition -> update className attribute
// Input value is PRESERVED`}</code>
          </pre>
        </section>

        {/* Section 4: The Key Prop */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>The Key Prop: Element Identity</h2>
          <p>
            The <code>key</code> prop tells React which element in a list corresponds to which element
            from the previous render. Without keys (or with index keys), React matches elements by
            position. With stable unique keys, React matches by identity.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: List Reordering With and Without Keys</h3>
            <KeyDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// WITH stable keys (key={item.id}):
// React: "Apple(id=1) moved from index 0 to index 2"
// -> Reuses the same DOM nodes, preserves state (input values)

// WITHOUT stable keys (key={index}):
// React: "Item at index 0 changed from Apple to Cherry"
// -> Updates props in place, DOM state (input values) stays at position`}</code>
          </pre>
        </section>

        {/* Section 5: Why index as key is dangerous */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Why Index as Key is Dangerous</h2>
          <p>
            Using array index as key is the default behavior and is problematic when the list
            can be reordered, filtered, or items can be added/removed from the beginning or middle.
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Problems with index keys:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>State mismatch:</strong> Uncontrolled inputs, focus, scroll position, and component
                state get associated with the wrong items after reordering
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Unnecessary DOM mutations:</strong> Adding an item to the top updates every single item in the list
                instead of just inserting one node
              </li>
              <li style={{ color: 'white' }}>
                <strong>Broken animations:</strong> Exit/enter animations fire for the wrong items
              </li>
            </ul>
          </div>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>When index keys are OK:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Static lists that never reorder, filter, or change
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Items have no internal state (no inputs, no local state)
              </li>
              <li style={{ color: 'white' }}>
                Items are never added to the beginning or middle of the list
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Key Reset Trick */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>The Key Reset Trick</h2>
          <p>
            Since changing a key forces React to unmount and remount, you can use this intentionally
            to reset a component's internal state. This is a common and useful pattern.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Reset Timer with Key</h3>
            <KeyResetDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// Common use cases for the key reset trick:

// 1. Reset a form when switching between records
<EditForm key={selectedUser.id} user={selectedUser} />

// 2. Reset animation when content changes
<FadeIn key={slideIndex}>
  <SlideContent index={slideIndex} />
</FadeIn>

// 3. Force re-initialization of a third-party widget
<MapWidget key={region} center={coordinates} />`}</code>
          </pre>
        </section>

        {/* Section 7: Render Counting Demo */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Demo: Render Counter</h2>
          <p>
            Use <code>useRef</code> to count how many times a component renders. This technique is
            invaluable for debugging performance issues.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo:</h3>
            <ChildRenderDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// Render counter pattern using useRef:
function MyComponent() {
  const renderCount = useRef(0)
  renderCount.current += 1

  return <div>Renders: {renderCount.current}</div>
}

// Why useRef and not useState?
// useState would cause an infinite loop:
// setState -> re-render -> setState -> re-render -> ...
// useRef.current mutation does not trigger a re-render.`}</code>
          </pre>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>
              React re-renders when: <strong>state changes</strong>, <strong>parent re-renders</strong>,
              or <strong>context changes</strong>
            </li>
            <li>
              Reconciliation diffs old and new element trees: <strong>same type = update</strong>,
              <strong> different type = unmount + mount</strong>
            </li>
            <li>
              The <code>key</code> prop tells React about element identity in lists -- use stable,
              unique IDs, not array indices
            </li>
            <li>
              Index keys cause state mismatches when lists are reordered, filtered, or modified
            </li>
            <li>
              The <strong>key reset trick</strong>: change a key to force remount and reset all internal state
            </li>
            <li>
              Use <code>useRef</code> to count renders for debugging (not useState, which would cause infinite loops)
            </li>
            <li>
              Parent re-renders cascade to all children by default -- use React.memo or composition patterns to optimize
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}
