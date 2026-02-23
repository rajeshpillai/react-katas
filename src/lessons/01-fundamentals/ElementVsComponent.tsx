import { useState, useRef, createElement, ReactNode } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './ElementVsComponent.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, createElement, useRef } from 'react'

function Greeting({ name }: { name: string }) {
    return <h2>Hello, {name}!</h2>
}

function RenderCounter({ label }: { label: string }) {
    const count = useRef(0)
    count.current += 1
    return (
        <div style={{ padding: 8, background: '#f3f4f6', borderRadius: 6, marginBottom: 8 }}>
            <strong>{label}</strong> rendered <strong>{count.current}</strong> time(s)
        </div>
    )
}

// Safe serializer: handles symbols, functions, and circular refs
function safeStringify(obj) {
    const seen = new WeakSet()
    return JSON.stringify(obj, (_key, value) => {
        if (typeof value === 'symbol') return value.toString()
        if (typeof value === 'function') return '[Function: ' + (value.name || 'anonymous') + ']'
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return '[Circular]'
            seen.add(value)
        }
        return value
    }, 2)
}

export default function App() {
    const [count, setCount] = useState(0)

    // 1. typeof checks
    const element = <Greeting name="World" />
    const elementViaCreateElement = createElement(Greeting, { name: 'World' })

    // 2. Element identity: stored vs inline
    const [storedElement] = useState(() => <RenderCounter label="Stored element" />)

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>React Elements vs Components</h2>

            <section style={{ marginBottom: 24 }}>
                <h3>1. typeof Checks</h3>
                <p><code>typeof Greeting</code> = <strong>{typeof Greeting}</strong> (it is a function)</p>
                <p><code>typeof &lt;Greeting /&gt;</code> = <strong>{typeof element}</strong> (it is an object)</p>
                <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 6 }}>
{safeStringify(element)}
                </pre>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h3>2. createElement Output</h3>
                <p>JSX and createElement produce the same result:</p>
                <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 6 }}>
{safeStringify(elementViaCreateElement)}
                </pre>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h3>3. Element Identity and Re-rendering</h3>
                <p>Click the button to trigger a parent re-render. The stored element keeps its identity, so its subtree does not re-render.</p>
                <button
                    onClick={() => setCount(c => c + 1)}
                    style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 12 }}
                >
                    Parent re-renders: {count}
                </button>

                {storedElement}
                <RenderCounter label="Inline element" />
            </section>
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 500,
}

// --- Demo Components ---

function Greeting({ name }: { name: string }) {
  return <span style={{ color: 'var(--color-primary-500)', fontWeight: 'bold' }}>Hello, {name}!</span>
}

function RenderCounter({ label }: { label: string }) {
  const count = useRef(0)
  count.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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

// --- Interactive Demo: typeof ---

function TypeofDemo() {
  const element = <Greeting name="World" />

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-primary-100)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h4 style={{ marginBottom: 'var(--space-2)' }}>Component (function)</h4>
          <code>typeof Greeting</code>
          <p style={{ fontWeight: 'bold', fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-2)' }}>
            "{typeof Greeting}"
          </p>
        </div>
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-accent-100)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h4 style={{ marginBottom: 'var(--space-2)' }}>Element (object)</h4>
          <code>{'typeof <Greeting />'}</code>
          <p style={{ fontWeight: 'bold', fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-2)' }}>
            "{typeof element}"
          </p>
        </div>
      </div>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        A component is a function definition. An element is the plain object that JSX creates.
      </p>
    </div>
  )
}

// --- Interactive Demo: createElement output ---

function CreateElementDemo() {
  const jsxElement = <Greeting name="World" />
  const ceElement = createElement(Greeting, { name: 'World' })

  // Safe serialization that handles symbols, functions, and circular refs
  const serialize = (obj: unknown): string => {
    const seen = new WeakSet()
    return JSON.stringify(
      obj,
      (_key, value) => {
        if (typeof value === 'symbol') return value.toString()
        if (typeof value === 'function') return `[Function: ${value.name || 'anonymous'}]`
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]'
          seen.add(value)
        }
        return value
      },
      2
    )
  }

  // Use ceElement to avoid unused variable error
  void ceElement

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <h4 style={{ marginBottom: 'var(--space-2)' }}>JSX syntax</h4>
          <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
            <code>{`<Greeting name="World" />`}</code>
          </pre>
        </div>
        <div>
          <h4 style={{ marginBottom: 'var(--space-2)' }}>createElement syntax</h4>
          <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
            <code>{`createElement(Greeting, { name: "World" })`}</code>
          </pre>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <h4 style={{ marginBottom: 'var(--space-2)' }}>The resulting element object:</h4>
        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)', overflow: 'auto' }}>
          <code>{serialize(jsxElement)}</code>
        </pre>
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Both produce the same object: <code>{'{ type, props, key, ref }'}</code>. JSX is just syntactic sugar for createElement.
      </p>
    </div>
  )
}

// --- Interactive Demo: Element Identity ---

function ElementIdentityDemo() {
  const [count, setCount] = useState(0)

  // Stored element: created once, same reference across renders
  const [storedElement] = useState<ReactNode>(() => <RenderCounter label="Stored element (useState)" />)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ marginBottom: 'var(--space-3)' }}>
        Click the button to trigger parent re-renders. Watch how the stored element keeps its render count
        while the inline element increments each time.
      </p>

      <button
        onClick={() => setCount((c) => c + 1)}
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
        Trigger parent re-render (count: {count})
      </button>

      {storedElement}
      <RenderCounter label="Inline element (created each render)" />

      <div
        style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-3)',
          background: 'var(--color-info)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <p style={{ color: 'white' }}>
          <strong>Why?</strong> When you store an element in state, React sees the same object reference
          on each render and skips reconciling its subtree. The inline element creates a new object
          each render, so React must re-render it.
        </p>
      </div>
    </div>
  )
}

// --- Main Lesson ---

export default function ElementVsComponent() {
  return (
    <LessonLayout title="Elements vs Components" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
        <p>
          Understanding the difference between React elements and React components is fundamental.
          An element is the object that JSX creates. A component is the function (or class) that
          returns elements.
        </p>

        {/* Section 1: What is a React Element? */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What is a React Element?</h2>
          <p>
            A React element is a <strong>plain JavaScript object</strong> that describes what should
            appear on screen. It has a <code>type</code>, <code>props</code>, and a <code>key</code>.
            Elements are cheap to create and are immutable -- once created, you cannot change their children or attributes.
          </p>

          <pre style={{ background: 'transparent' }}>
            <code>{`// A React element is just an object like this:
{
  type: 'div',           // or a component function/class
  props: {
    className: 'card',
    children: 'Hello'
  },
  key: null,
  ref: null
}

// JSX creates elements:
const el = <div className="card">Hello</div>

// Which compiles to:
const el = React.createElement('div', { className: 'card' }, 'Hello')`}</code>
          </pre>
        </section>

        {/* Section 2: What is a Component? */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What is a Component?</h2>
          <p>
            A component is a <strong>function</strong> (or class) that accepts props and returns React
            elements. It is the <em>blueprint</em> or <em>template</em> for creating elements.
          </p>

          <pre style={{ background: 'transparent' }}>
            <code>{`// This is a component (a function):
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}

// This is an element (an object created by JSX):
const element = <Greeting name="World" />

// Writing <Greeting /> does NOT call the function.
// It creates an element: { type: Greeting, props: { name: "World" } }
// React calls the function later during rendering.`}</code>
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Key Distinction:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Component</strong> = the function definition (<code>function Greeting() {'{...}'}</code>)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Element</strong> = the object JSX produces (<code>{'<Greeting />'}</code> becomes <code>{`{ type: Greeting, props: {} }`}</code>)
              </li>
              <li style={{ color: 'white' }}>
                <strong>Instance</strong> = what React creates internally when it renders the element
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: typeof comparison */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Demo: typeof Comparison</h2>
          <p>
            See the difference at runtime. A component is a <code>function</code>, while the element
            it produces is an <code>object</code>.
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
            <TypeofDemo />
          </div>
        </section>

        {/* Section 4: createElement */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>JSX Compiles to createElement</h2>
          <p>
            JSX is not magic -- it is syntactic sugar that compiles to <code>React.createElement()</code> calls.
            Both produce the same element object.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: createElement Output</h3>
            <CreateElementDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// These are equivalent:
const a = <Greeting name="World" />
const b = createElement(Greeting, { name: "World" })

// Both produce:
// { type: Greeting, props: { name: "World" }, key: null, ref: null }

// For host elements (HTML tags):
const c = <div id="box">Hi</div>
const d = createElement('div', { id: 'box' }, 'Hi')
// { type: "div", props: { id: "box", children: "Hi" }, key: null, ref: null }`}</code>
          </pre>
        </section>

        {/* Section 5: Element identity */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Why This Matters: Element Identity and Re-rendering</h2>
          <p>
            React uses <strong>element identity</strong> (reference equality) during reconciliation.
            If the same element object is returned across renders, React skips reconciling that subtree.
            This is the principle behind patterns like storing elements in state or using <code>children</code> prop lifting.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Stored vs Inline Elements</h3>
            <ElementIdentityDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`function Parent() {
  const [count, setCount] = useState(0)

  // Created once, same reference every render
  const [stored] = useState(() => <ExpensiveChild />)

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Re-render</button>

      {/* Same reference -> React skips reconciling */}
      {stored}

      {/* New reference each render -> React must reconcile */}
      <ExpensiveChild />
    </div>
  )
}`}</code>
          </pre>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Practical Application:</h3>
            <p style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              This is the same principle behind the "children as props" optimization pattern:
            </p>
            <pre style={{ background: 'transparent' }}>
              <code style={{ color: 'white' }}>{`// The children element is created by the PARENT of
// ColorProvider, so it keeps the same reference when
// ColorProvider re-renders:
function ColorProvider({ children }) {
  const [color, setColor] = useState('red')
  return (
    <ColorContext.Provider value={color}>
      {children}  {/* same reference, not re-rendered */}
    </ColorContext.Provider>
  )
}`}</code>
            </pre>
          </div>
        </section>

        {/* Section 6: Common misconceptions */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Common Misconceptions</h2>

          <div
            style={{
              background: 'var(--color-error)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Misconceptions to avoid:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>"JSX calls the component function"</strong> -- No. JSX creates an element object.
                React calls the function during rendering.
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>"Elements and components are the same thing"</strong> -- No. A component is a
                function/class. An element is the lightweight object describing what to render.
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>"Creating elements is expensive"</strong> -- No. Elements are plain objects.
                Creating them is very cheap. Rendering (calling the component function) is the
                potentially expensive part.
              </li>
              <li style={{ color: 'white' }}>
                <strong>"Calling a component directly is the same as JSX"</strong> -- No. <code>Greeting()</code> calls
                the function and returns the output elements immediately. <code>{'<Greeting />'}</code> creates
                an element that React manages with its own lifecycle and state.
              </li>
            </ul>
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// WRONG: calling component directly (no hooks, no lifecycle)
function Parent() {
  return <div>{Greeting({ name: 'World' })}</div>
}

// CORRECT: creating an element (React manages it)
function Parent() {
  return <div><Greeting name="World" /></div>
}

// The direct call returns elements immediately,
// but React cannot track state or effects for it.
// It becomes part of the Parent's render, not its own component.`}</code>
          </pre>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>
              A <strong>component</strong> is a function (or class) that returns elements -- it is the template.
            </li>
            <li>
              A <strong>React element</strong> is a plain object (<code>{'{ type, props, key }'}</code>) -- it is the description of what to render.
            </li>
            <li>
              JSX (<code>{'<Comp />'}</code>) compiles to <code>createElement(Comp, props)</code> -- it creates an element, it does not call the function.
            </li>
            <li>
              React calls your component function during rendering, not at JSX evaluation time.
            </li>
            <li>
              Element identity matters for performance: same reference means React can skip re-reconciling that subtree.
            </li>
            <li>
              Never call components as functions directly -- let React manage them through elements.
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}
