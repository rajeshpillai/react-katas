import { useState, useRef } from 'react'

export default function ComponentComposition() {
  return (
    <div>
      <h1>Component Composition</h1>
      <p>
        Component composition is the <strong>most powerful performance optimization</strong> in
        React. It's better than memoization and works automatically with React 19's compiler!
      </p>

      {/* Section 1: The Problem */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Problem: Unnecessary Re-renders</h2>
        <p>
          When a parent component's state changes, all its children re-render by default, even if
          they don't use that state.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Bad Pattern:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent /> {/* Re-renders on every count change! */}
    </div>
  );
}`}</code>
          </pre>
          <p style={{ color: 'white', marginTop: 'var(--space-3)' }}>
            Problem: ExpensiveComponent re-renders even though it doesn't use count!
          </p>
        </div>
      </section>

      {/* Section 2: Solution - Lift Content Up */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 1: Lift Content Up (Children Prop)</h2>
        <p>
          Move state down to the component that needs it, and pass expensive components as{' '}
          <code>children</code>.
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Good Pattern:</h3>
          <pre>
            <code style={{ color: 'white' }}>{`function App() {
  return (
    <Layout>
      <ExpensiveComponent /> {/* Doesn't re-render! */}
    </Layout>
  );
}

function Layout({ children }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {children} {/* Children don't re-render when count changes! */}
    </div>
  );
}`}</code>
          </pre>
          <p style={{ color: 'white', marginTop: 'var(--space-3)' }}>
            ✨ Children are created by the parent, so they don't re-render when Layout's state
            changes!
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Interactive Example:</h3>
          <ChildrenPropDemo />
        </div>
      </section>

      {/* Section 3: Slot Pattern */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 2: Slot Pattern (Multiple Props)</h2>
        <p>
          Pass multiple components as props to create flexible, performant layouts.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Slot Pattern Example:</h3>
          <SlotPatternDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function Dashboard({ sidebar, header, content }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {header}    {/* Doesn't re-render */}
      {sidebar}   {/* Doesn't re-render */}
      {content}   {/* Doesn't re-render */}
    </div>
  );
}

// Usage
<Dashboard
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Content />}
/>`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: State Colocation */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 3: State Colocation</h2>
        <p>
          Keep state as close as possible to where it's used. Don't lift state up unless you need
          to!
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>State Colocation Example:</h3>
          <StateColocationDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// ❌ Bad: State too high
function App() {
  const [formData, setFormData] = useState({});
  return (
    <>
      <Form data={formData} onChange={setFormData} />
      <OtherComponent /> {/* Re-renders on every form change! */}
    </>
  );
}

// ✅ Good: State colocated
function App() {
  return (
    <>
      <Form /> {/* State is inside Form */}
      <OtherComponent /> {/* Never re-renders! */}
    </>
  );
}

function Form() {
  const [formData, setFormData] = useState({});
  // ... form logic
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Component Extraction */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Solution 4: Extract Stateful Components</h2>
        <p>
          Extract the part that changes into its own component to isolate re-renders.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Component Extraction Example:</h3>
          <ComponentExtractionDemo />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// ❌ Bad: Everything re-renders
function Page() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <ExpensiveList /> {/* Re-renders! */}
      <ExpensiveChart /> {/* Re-renders! */}
    </>
  );
}

// ✅ Good: Extract counter
function Page() {
  return (
    <>
      <Counter /> {/* Only this re-renders */}
      <ExpensiveList />
      <ExpensiveChart />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 6: Why This Works */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Why Composition Beats Memoization</h2>

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
              background: 'var(--color-success)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3 style={{ color: 'white' }}>Composition</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ✅ Works automatically
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ✅ No extra code needed
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ✅ Better architecture
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ✅ More maintainable
              </li>
              <li style={{ color: 'white' }}>✅ React 19 compiler optimizes it</li>
            </ul>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-warning)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3 style={{ color: 'white' }}>Memoization</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ⚠️ Requires manual work
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ⚠️ More code to maintain
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ⚠️ Can be misused
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                ⚠️ Dependency tracking
              </li>
              <li style={{ color: 'white' }}>⚠️ Use as last resort</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            <strong>Composition is the primary performance pattern</strong> - use it first!
          </li>
          <li>
            Use <code>children</code> prop to prevent unnecessary re-renders
          </li>
          <li>Slot pattern for multiple component props</li>
          <li>Keep state colocated - as close to where it's used as possible</li>
          <li>Extract stateful components to isolate re-renders</li>
          <li>Composition works automatically with React 19 compiler</li>
          <li>Better architecture beats memoization every time!</li>
        </ul>
      </section>
    </div>
  )
}

// Demo components

function ChildrenPropDemo() {
  return (
    <LayoutWithState>
      <ExpensiveComponent label="I don't re-render when count changes!" />
    </LayoutWithState>
  )
}

function LayoutWithState({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Layout renders:</strong> {renderCount.current}
      </p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
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
        Count: {count}
      </button>
      {children}
    </div>
  )
}

function ExpensiveComponent({ label }: { label: string }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white', fontWeight: 'bold' }}>{label}</p>
      <p style={{ color: 'white' }}>Render count: {renderCount.current}</p>
    </div>
  )
}

function SlotPatternDemo() {
  return (
    <Dashboard
      header={<Header />}
      sidebar={<Sidebar />}
      content={<Content />}
    />
  )
}

function Dashboard({
  header,
  sidebar,
  content,
}: {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-accent-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        Toggle: {isOpen ? 'Open' : 'Closed'}
      </button>
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        {header}
        {sidebar}
        {content}
      </div>
    </div>
  )
}

function Header() {
  const renderCount = useRef(0)
  renderCount.current += 1
  console.log('Header rendered')
  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-primary-100)', borderRadius: 'var(--radius-md)' }}>
      Header (renders: {renderCount.current})
    </div>
  )
}

function Sidebar() {
  const renderCount = useRef(0)
  renderCount.current += 1
  console.log('Sidebar rendered')
  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-accent-100)', borderRadius: 'var(--radius-md)' }}>
      Sidebar (renders: {renderCount.current})
    </div>
  )
}

function Content() {
  const renderCount = useRef(0)
  renderCount.current += 1
  console.log('Content rendered')
  return (
    <div style={{ padding: 'var(--space-3)', background: 'var(--color-success)', color: 'white', borderRadius: 'var(--radius-md)' }}>
      <p style={{ color: 'white' }}>Content (renders: {renderCount.current})</p>
    </div>
  )
}

function StateColocationDemo() {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <FormWithState />
      <StaticComponent />
    </div>
  )
}

function FormWithState() {
  const [name, setName] = useState('')

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type here (only form re-renders)"
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
        }}
      />
    </div>
  )
}

function StaticComponent() {
  const renderCount = useRef(0)
  renderCount.current += 1
  console.log('StaticComponent rendered')

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-info)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>I never re-render! (renders: {renderCount.current})</p>
    </div>
  )
}

function ComponentExtractionDemo() {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <CounterButton />
      <ExpensiveList />
    </div>
  )
}

function CounterButton() {
  const [count, setCount] = useState(0)

  return (
    <button
      onClick={() => setCount(count + 1)}
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
      Count: {count}
    </button>
  )
}

function ExpensiveList() {
  const renderCount = useRef(0)
  renderCount.current += 1
  console.log('ExpensiveList rendered')

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white', fontWeight: 'bold' }}>Expensive List</p>
      <p style={{ color: 'white' }}>I don't re-render when counter changes!</p>
      <p style={{ color: 'white' }}>Renders: {renderCount.current}</p>
    </div>
  )
}
