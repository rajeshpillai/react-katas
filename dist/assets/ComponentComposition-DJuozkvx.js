import{r as t,j as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const i=`import { useState, useRef } from 'react'

// @ts-ignore
import sourceCode from './ComponentComposition.tsx?raw'

export default function ComponentComposition() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Component Composition</h1>
      <p>
        Component composition is the <strong>most powerful performance optimization</strong> in
        React. It's better than memoization and works automatically with React 19's compiler!
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
              <pre style={{ background: 'transparent' }}>
                <code style={{ color: 'white' }}>{\`function App() {
        const [count, setCount] = useState(0);
        
        return (
            <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            <ExpensiveComponent /> {/* Re-renders on every count change! */}
            </div>
        );
        }\`}</code>
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Solution:</h3>
              <pre style={{ background: 'transparent' }}>
                <code style={{ color: 'white' }}>{\`function App() {
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
        }\`}</code>
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
                <code>{\`function Dashboard({ sidebar, header, content }) {
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
        />\`}</code>
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
                <code>{\`// ❌ Bad: State too high
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
        }\`}</code>
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
                <code>{\`// ❌ Bad: Everything re-renders
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
        }\`}</code>
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
        </>
      ) : (
        <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
          <code>{sourceCode}</code>
        </pre>
      )}
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
`;function S(){const[e,r]=t.useState("demo");return n.jsxs("div",{children:[n.jsx("h1",{children:"Component Composition"}),n.jsxs("p",{children:["Component composition is the ",n.jsx("strong",{children:"most powerful performance optimization"})," in React. It's better than memoization and works automatically with React 19's compiler!"]}),n.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[n.jsx("button",{onClick:()=>r("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="demo"?"bold":"normal"},children:"Lesson"}),n.jsx("button",{onClick:()=>r("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="code"?"bold":"normal"},children:"Source Code"})]}),e==="demo"?n.jsxs(n.Fragment,{children:[n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"The Problem: Unnecessary Re-renders"}),n.jsx("p",{children:"When a parent component's state changes, all its children re-render by default, even if they don't use that state."}),n.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Bad Pattern:"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{style:{color:"white"},children:`function App() {
        const [count, setCount] = useState(0);
        
        return (
            <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            <ExpensiveComponent /> {/* Re-renders on every count change! */}
            </div>
        );
        }`})}),n.jsx("p",{style:{color:"white",marginTop:"var(--space-3)"},children:"Problem: ExpensiveComponent re-renders even though it doesn't use count!"})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Solution 1: Lift Content Up (Children Prop)"}),n.jsxs("p",{children:["Move state down to the component that needs it, and pass expensive components as"," ",n.jsx("code",{children:"children"}),"."]}),n.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Solution:"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{style:{color:"white"},children:`function App() {
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
        }`})}),n.jsx("p",{style:{color:"white",marginTop:"var(--space-3)"},children:"✨ Children are created by the parent, so they don't re-render when Layout's state changes!"})]}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Interactive Example:"}),n.jsx(d,{})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Solution 2: Slot Pattern (Multiple Props)"}),n.jsx("p",{children:"Pass multiple components as props to create flexible, performant layouts."}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Slot Pattern Example:"}),n.jsx(u,{}),n.jsx("pre",{style:{marginTop:"var(--space-4)"},children:n.jsx("code",{children:`function Dashboard({ sidebar, header, content }) {
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
        />`})})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Solution 3: State Colocation"}),n.jsx("p",{children:"Keep state as close as possible to where it's used. Don't lift state up unless you need to!"}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"State Colocation Example:"}),n.jsx(g,{}),n.jsx("pre",{style:{marginTop:"var(--space-4)"},children:n.jsx("code",{children:`// ❌ Bad: State too high
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
        }`})})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Solution 4: Extract Stateful Components"}),n.jsx("p",{children:"Extract the part that changes into its own component to isolate re-renders."}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Component Extraction Example:"}),n.jsx(x,{}),n.jsx("pre",{style:{marginTop:"var(--space-4)"},children:n.jsx("code",{children:`// ❌ Bad: Everything re-renders
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
        }`})})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Why Composition Beats Memoization"}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{style:{color:"white"},children:"Composition"}),n.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"✅ Works automatically"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"✅ No extra code needed"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"✅ Better architecture"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"✅ More maintainable"}),n.jsx("li",{style:{color:"white"},children:"✅ React 19 compiler optimizes it"})]})]}),n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-warning)",color:"white",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{style:{color:"white"},children:"Memoization"}),n.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"⚠️ Requires manual work"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"⚠️ More code to maintain"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"⚠️ Can be misused"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"⚠️ Dependency tracking"}),n.jsx("li",{style:{color:"white"},children:"⚠️ Use as last resort"})]})]})]})]}),n.jsxs("section",{children:[n.jsx("h2",{children:"Key Takeaways"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("strong",{children:"Composition is the primary performance pattern"})," - use it first!"]}),n.jsxs("li",{children:["Use ",n.jsx("code",{children:"children"})," prop to prevent unnecessary re-renders"]}),n.jsx("li",{children:"Slot pattern for multiple component props"}),n.jsx("li",{children:"Keep state colocated - as close to where it's used as possible"}),n.jsx("li",{children:"Extract stateful components to isolate re-renders"}),n.jsx("li",{children:"Composition works automatically with React 19 compiler"}),n.jsx("li",{children:"Better architecture beats memoization every time!"})]})]})]}):n.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:n.jsx("code",{children:i})})]})}function d(){return n.jsx(c,{children:n.jsx(l,{label:"I don't re-render when count changes!"})})}function c({children:e}){const[r,o]=t.useState(0),a=t.useRef(0);return a.current+=1,n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[n.jsxs("p",{children:[n.jsx("strong",{children:"Layout renders:"})," ",a.current]}),n.jsxs("button",{onClick:()=>{o(r+1)},style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:["Count: ",r]}),e]})}function l({label:e}){const r=t.useRef(0);return r.current+=1,n.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[n.jsx("p",{style:{color:"white",fontWeight:"bold"},children:e}),n.jsxs("p",{style:{color:"white"},children:["Render count: ",r.current]})]})}function u(){return n.jsx(p,{header:n.jsx(h,{}),sidebar:n.jsx(v,{}),content:n.jsx(m,{})})}function p({header:e,sidebar:r,content:o}){const[a,s]=t.useState(!1);return n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[n.jsxs("button",{onClick:()=>s(!a),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:["Toggle: ",a?"Open":"Closed"]}),n.jsxs("div",{style:{display:"grid",gap:"var(--space-3)"},children:[e,r,o]})]})}function h(){const e=t.useRef(0);return e.current+=1,console.log("Header rendered"),n.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)"},children:["Header (renders: ",e.current,")"]})}function v(){const e=t.useRef(0);return e.current+=1,console.log("Sidebar rendered"),n.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-accent-100)",borderRadius:"var(--radius-md)"},children:["Sidebar (renders: ",e.current,")"]})}function m(){const e=t.useRef(0);return e.current+=1,console.log("Content rendered"),n.jsx("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:n.jsxs("p",{style:{color:"white"},children:["Content (renders: ",e.current,")"]})})}function g(){return n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[n.jsx(b,{}),n.jsx(y,{})]})}function b(){const[e,r]=t.useState("");return n.jsx("div",{style:{marginBottom:"var(--space-4)"},children:n.jsx("input",{type:"text",value:e,onChange:o=>r(o.target.value),placeholder:"Type here (only form re-renders)",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)"}})})}function y(){const e=t.useRef(0);return e.current+=1,console.log("StaticComponent rendered"),n.jsx("div",{style:{padding:"var(--space-3)",background:"var(--color-info)",color:"white",borderRadius:"var(--radius-md)"},children:n.jsxs("p",{style:{color:"white"},children:["I never re-render! (renders: ",e.current,")"]})})}function x(){return n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[n.jsx(C,{}),n.jsx(f,{})]})}function C(){const[e,r]=t.useState(0);return n.jsxs("button",{onClick:()=>r(e+1),style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:["Count: ",e]})}function f(){const e=t.useRef(0);return e.current+=1,console.log("ExpensiveList rendered"),n.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[n.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"Expensive List"}),n.jsx("p",{style:{color:"white"},children:"I don't re-render when counter changes!"}),n.jsxs("p",{style:{color:"white"},children:["Renders: ",e.current]})]})}export{S as default};
//# sourceMappingURL=ComponentComposition-DJuozkvx.js.map
