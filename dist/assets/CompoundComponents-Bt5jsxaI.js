import{r as t,j as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const p=`import { createContext, useContext, useState, ReactNode } from 'react'

// Compound component pattern example
const AccordionContext = createContext<{
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
} | null>(null)

// @ts-ignore
import sourceCode from './CompoundComponents.tsx?raw'

export default function CompoundComponents() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Compound Components</h1>
      <p>
        Compound components work together to form a complete UI. They share implicit state and
        provide a flexible, declarative API.
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
          {/* Section 1: What are Compound Components */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What are Compound Components?</h2>
            <p>
              Components that work together, sharing state implicitly through context. Think of HTML
              elements like <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code>.
            </p>

            <pre style={{ background: 'transparent' }}>
              <code>{\`// Compound component API
        <Accordion>
        <Accordion.Item>
            <Accordion.Header>Section 1</Accordion.Header>
            <Accordion.Panel>Content 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
            <Accordion.Header>Section 2</Accordion.Header>
            <Accordion.Panel>Content 2</Accordion.Panel>
        </Accordion.Item>
        </Accordion>\`}</code>
            </pre>
          </section>

          {/* Section 2: Benefits */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Benefits</h2>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Advantages:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Flexible and expressive API
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Separation of concerns
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Implicit state sharing
                </li>
                <li style={{ color: 'white' }}>Easy to understand and maintain</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Example - Accordion */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Example: Accordion Component</h2>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Interactive Demo:</h3>
              <Accordion>
                <AccordionItem index={0}>
                  <AccordionHeader>What is React?</AccordionHeader>
                  <AccordionPanel>
                    React is a JavaScript library for building user interfaces.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem index={1}>
                  <AccordionHeader>What are Compound Components?</AccordionHeader>
                  <AccordionPanel>
                    Components that work together to share state and provide a flexible API.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem index={2}>
                  <AccordionHeader>Why use this pattern?</AccordionHeader>
                  <AccordionPanel>
                    It provides flexibility and a clean, declarative API for complex components.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <pre style={{ marginTop: 'var(--space-4)', background: 'transparent' }}>
                <code>{\`// Implementation
        const AccordionContext = createContext(null);

        function Accordion({ children }) {
        const [openIndex, setOpenIndex] = useState(null);
        
        return (
            <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
            <div>{children}</div>
            </AccordionContext.Provider>
        );
        }

        function AccordionItem({ index, children }) {
        return <div>{children}</div>;
        }

        function AccordionHeader({ children }) {
        const { openIndex, setOpenIndex } = useContext(AccordionContext);
        const index = /* get from parent */;
        
        return (
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {children}
            </button>
        );
        }

        function AccordionPanel({ children }) {
        const { openIndex } = useContext(AccordionContext);
        const index = /* get from parent */;
        
        if (openIndex !== index) return null;
        return <div>{children}</div>;
        }\`}</code>
              </pre>

              <h3 style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
                ⚙️ How it Works:
              </h3>
              <p>The parent \`Accordion\` holds the state, and children communicate via Context:</p>

              <h4 style={{ marginTop: 'var(--space-4)' }}>1. Implicit State Sharing</h4>
              <pre style={{ background: 'transparent' }}>
                <code>{\`const AccordionContext = createContext<{
        openIndex: number | null
        setOpenIndex: (index: number | null) => void
        } | null>(null)\`}</code>
              </pre>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                The <code>Accordion</code> component provides this context to all children.
              </p>

              <h4 style={{ marginTop: 'var(--space-4)' }}>2. Toggling State (Header)</h4>
              <pre style={{ background: 'transparent' }}>
                <code>{\`// Inside AccordionHeader
        const { openIndex, setOpenIndex } = useContext(AccordionContext);

        // Toggle logic: if already open, close it (null), otherwise open this index
        onClick={() => setOpenIndex(openIndex === index ? null : index)}\`}</code>
              </pre>

              <h4 style={{ marginTop: 'var(--space-4)' }}>3. Conditional Rendering (Panel)</h4>
              <pre style={{ background: 'transparent' }}>
                <code>{\`// Inside AccordionPanel
        const { openIndex } = useContext(AccordionContext);

        // Only render children if this panel is the open one
        if (openIndex !== index) return null;
        return <div>{children}</div>;\`}</code>
              </pre>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Compound components share state through context</li>
              <li>Provides flexible, declarative API</li>
              <li>Components work together as a cohesive unit</li>
              <li>Great for complex UI patterns (tabs, accordions, menus)</li>
              <li>Improves code organization and reusability</li>
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

// Accordion implementation

// Context for individual accordion items to share their index
const AccordionItemContext = createContext<{ index: number } | null>(null)

function Accordion({ children }: { children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ index, children }: { index: number; children: ReactNode }) {
  return (
    <AccordionItemContext.Provider value={{ index }}>
      <div>{children}</div>
    </AccordionItemContext.Provider>
  )
}

function AccordionHeader({ children }: { children: ReactNode }) {
  const context = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!context) throw new Error('AccordionHeader must be used within Accordion')
  if (!itemContext) throw new Error('AccordionHeader must be used within AccordionItem')

  const { index } = itemContext

  return (
    <button
      onClick={() => context.setOpenIndex(context.openIndex === index ? null : index)}
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-primary-500)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
      }}
    >
      {children}
    </button>
  )
}

function AccordionPanel({ children }: { children: ReactNode }) {
  const context = useContext(AccordionContext)
  const itemContext = useContext(AccordionItemContext)

  if (!context) throw new Error('AccordionPanel must be used within Accordion')
  if (!itemContext) throw new Error('AccordionPanel must be used within AccordionItem')

  const { index } = itemContext

  if (context.openIndex !== index) return null

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {children}
    </div>
  )
}
`,s=t.createContext(null);function m(){const[e,o]=t.useState("demo");return n.jsxs("div",{children:[n.jsx("h1",{children:"Compound Components"}),n.jsx("p",{children:"Compound components work together to form a complete UI. They share implicit state and provide a flexible, declarative API."}),n.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[n.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="demo"?"bold":"normal"},children:"Lesson"}),n.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="code"?"bold":"normal"},children:"Source Code"})]}),e==="demo"?n.jsxs(n.Fragment,{children:[n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"What are Compound Components?"}),n.jsxs("p",{children:["Components that work together, sharing state implicitly through context. Think of HTML elements like ",n.jsx("code",{children:"<select>"})," and ",n.jsx("code",{children:"<option>"}),"."]}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{children:`// Compound component API
        <Accordion>
        <Accordion.Item>
            <Accordion.Header>Section 1</Accordion.Header>
            <Accordion.Panel>Content 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
            <Accordion.Header>Section 2</Accordion.Header>
            <Accordion.Panel>Content 2</Accordion.Panel>
        </Accordion.Item>
        </Accordion>`})})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Benefits"}),n.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Advantages:"}),n.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Flexible and expressive API"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Separation of concerns"}),n.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Implicit state sharing"}),n.jsx("li",{style:{color:"white"},children:"Easy to understand and maintain"})]})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Example: Accordion Component"}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Interactive Demo:"}),n.jsxs(x,{children:[n.jsxs(c,{index:0,children:[n.jsx(d,{children:"What is React?"}),n.jsx(a,{children:"React is a JavaScript library for building user interfaces."})]}),n.jsxs(c,{index:1,children:[n.jsx(d,{children:"What are Compound Components?"}),n.jsx(a,{children:"Components that work together to share state and provide a flexible API."})]}),n.jsxs(c,{index:2,children:[n.jsx(d,{children:"Why use this pattern?"}),n.jsx(a,{children:"It provides flexibility and a clean, declarative API for complex components."})]})]}),n.jsx("pre",{style:{marginTop:"var(--space-4)",background:"transparent"},children:n.jsx("code",{children:`// Implementation
        const AccordionContext = createContext(null);

        function Accordion({ children }) {
        const [openIndex, setOpenIndex] = useState(null);
        
        return (
            <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
            <div>{children}</div>
            </AccordionContext.Provider>
        );
        }

        function AccordionItem({ index, children }) {
        return <div>{children}</div>;
        }

        function AccordionHeader({ children }) {
        const { openIndex, setOpenIndex } = useContext(AccordionContext);
        const index = /* get from parent */;
        
        return (
            <button onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {children}
            </button>
        );
        }

        function AccordionPanel({ children }) {
        const { openIndex } = useContext(AccordionContext);
        const index = /* get from parent */;
        
        if (openIndex !== index) return null;
        return <div>{children}</div>;
        }`})}),n.jsx("h3",{style:{marginTop:"var(--space-6)",marginBottom:"var(--space-3)"},children:"⚙️ How it Works:"}),n.jsx("p",{children:"The parent `Accordion` holds the state, and children communicate via Context:"}),n.jsx("h4",{style:{marginTop:"var(--space-4)"},children:"1. Implicit State Sharing"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{children:`const AccordionContext = createContext<{
        openIndex: number | null
        setOpenIndex: (index: number | null) => void
        } | null>(null)`})}),n.jsxs("p",{style:{fontSize:"var(--font-size-sm)",color:"var(--text-secondary)"},children:["The ",n.jsx("code",{children:"Accordion"})," component provides this context to all children."]}),n.jsx("h4",{style:{marginTop:"var(--space-4)"},children:"2. Toggling State (Header)"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{children:`// Inside AccordionHeader
        const { openIndex, setOpenIndex } = useContext(AccordionContext);

        // Toggle logic: if already open, close it (null), otherwise open this index
        onClick={() => setOpenIndex(openIndex === index ? null : index)}`})}),n.jsx("h4",{style:{marginTop:"var(--space-4)"},children:"3. Conditional Rendering (Panel)"}),n.jsx("pre",{style:{background:"transparent"},children:n.jsx("code",{children:`// Inside AccordionPanel
        const { openIndex } = useContext(AccordionContext);

        // Only render children if this panel is the open one
        if (openIndex !== index) return null;
        return <div>{children}</div>;`})})]})]}),n.jsxs("section",{children:[n.jsx("h2",{children:"Key Takeaways"}),n.jsxs("ul",{children:[n.jsx("li",{children:"Compound components share state through context"}),n.jsx("li",{children:"Provides flexible, declarative API"}),n.jsx("li",{children:"Components work together as a cohesive unit"}),n.jsx("li",{children:"Great for complex UI patterns (tabs, accordions, menus)"}),n.jsx("li",{children:"Improves code organization and reusability"})]})]})]}):n.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:n.jsx("code",{children:p})})]})}const l=t.createContext(null);function x({children:e}){const[o,r]=t.useState(null);return n.jsx(s.Provider,{value:{openIndex:o,setOpenIndex:r},children:n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--space-2)"},children:e})})}function c({index:e,children:o}){return n.jsx(l.Provider,{value:{index:e},children:n.jsx("div",{children:o})})}function d({children:e}){const o=t.useContext(s),r=t.useContext(l);if(!o)throw new Error("AccordionHeader must be used within Accordion");if(!r)throw new Error("AccordionHeader must be used within AccordionItem");const{index:i}=r;return n.jsx("button",{onClick:()=>o.setOpenIndex(o.openIndex===i?null:i),style:{padding:"var(--space-3)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",textAlign:"left",width:"100%"},children:e})}function a({children:e}){const o=t.useContext(s),r=t.useContext(l);if(!o)throw new Error("AccordionPanel must be used within Accordion");if(!r)throw new Error("AccordionPanel must be used within AccordionItem");const{index:i}=r;return o.openIndex!==i?null:n.jsx("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:e})}export{m as default};
//# sourceMappingURL=CompoundComponents-Bt5jsxaI.js.map
