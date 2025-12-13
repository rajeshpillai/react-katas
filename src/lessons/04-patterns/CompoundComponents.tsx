import { createContext, useContext, useState, ReactNode } from 'react'

// Compound component pattern example
const AccordionContext = createContext<{
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
} | null>(null)

export default function CompoundComponents() {
  return (
    <div>
      <h1>Compound Components</h1>
      <p>
        Compound components work together to form a complete UI. They share implicit state and
        provide a flexible, declarative API.
      </p>

      {/* Section 1: What are Compound Components */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What are Compound Components?</h2>
        <p>
          Components that work together, sharing state implicitly through context. Think of HTML
          elements like <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code>.
        </p>

        <pre>
          <code>{`// Compound component API
<Accordion>
  <Accordion.Item>
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Panel>Content 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Header>Section 2</Accordion.Header>
    <Accordion.Panel>Content 2</Accordion.Panel>
  </Accordion.Item>
</Accordion>`}</code>
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

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// Implementation
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
}`}</code>
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
    </div>
  )
}

// Accordion implementation
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
  return <div>{children}</div>
}

function AccordionHeader({ children }: { children: ReactNode }) {
  const context = useContext(AccordionContext)
  if (!context) throw new Error('AccordionHeader must be used within Accordion')

  // This is a simplified version - in production, you'd pass index differently
  const [index] = useState(() => Math.random())

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
  if (!context) throw new Error('AccordionPanel must be used within Accordion')

  const [index] = useState(() => Math.random())

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
