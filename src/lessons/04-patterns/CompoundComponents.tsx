import { createContext, useContext, useState, ReactNode } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './CompoundComponents.tsx?raw'

// Compound component pattern example
const AccordionContext = createContext<{
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
} | null>(null)

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from './Accordion'

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Compound Components: Accordion</h2>
            <p>Click the headers to toggle panels. Only one panel is open at a time.</p>
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
        </div>
    )
}
`,
    },
    {
      name: 'Accordion.tsx',
      language: 'tsx',
      code: `import { createContext, useContext, useState, ReactNode } from 'react'

const AccordionContext = createContext<{
    openIndex: number | null
    setOpenIndex: (index: number | null) => void
} | null>(null)

const AccordionItemContext = createContext<{ index: number } | null>(null)

export function Accordion({ children }: { children: ReactNode }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
}

export function AccordionItem({ index, children }: { index: number; children: ReactNode }) {
    return (
        <AccordionItemContext.Provider value={{ index }}>
            <div>{children}</div>
        </AccordionItemContext.Provider>
    )
}

export function AccordionHeader({ children }: { children: ReactNode }) {
    const context = useContext(AccordionContext)
    const itemContext = useContext(AccordionItemContext)

    if (!context) throw new Error('AccordionHeader must be used within Accordion')
    if (!itemContext) throw new Error('AccordionHeader must be used within AccordionItem')

    const { index } = itemContext

    return (
        <button
            onClick={() => context.setOpenIndex(context.openIndex === index ? null : index)}
            style={{
                padding: 12,
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontSize: 14,
            }}
        >
            {children}
        </button>
    )
}

export function AccordionPanel({ children }: { children: ReactNode }) {
    const context = useContext(AccordionContext)
    const itemContext = useContext(AccordionItemContext)

    if (!context) throw new Error('AccordionPanel must be used within Accordion')
    if (!itemContext) throw new Error('AccordionPanel must be used within AccordionItem')

    const { index } = itemContext

    if (context.openIndex !== index) return null

    return (
        <div style={{ padding: 16, background: '#f3f4f6', color: '#1f2937', borderRadius: 6 }}>
            {children}
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 400,
}

export default function CompoundComponents() {
  return (
    <LessonLayout title="Compound Components" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
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

          <pre style={{ background: 'transparent' }}>
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Advantages:</h3>
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

            <h3 style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
              How it Works:
            </h3>
            <p>The parent `Accordion` holds the state, and children communicate via Context:</p>

            <h4 style={{ marginTop: 'var(--space-4)' }}>1. Implicit State Sharing</h4>
            <pre style={{ background: 'transparent' }}>
              <code>{`const AccordionContext = createContext<{
      openIndex: number | null
      setOpenIndex: (index: number | null) => void
      } | null>(null)`}</code>
            </pre>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              The <code>Accordion</code> component provides this context to all children.
            </p>

            <h4 style={{ marginTop: 'var(--space-4)' }}>2. Toggling State (Header)</h4>
            <pre style={{ background: 'transparent' }}>
              <code>{`// Inside AccordionHeader
      const { openIndex, setOpenIndex } = useContext(AccordionContext);

      // Toggle logic: if already open, close it (null), otherwise open this index
      onClick={() => setOpenIndex(openIndex === index ? null : index)}`}</code>
            </pre>

            <h4 style={{ marginTop: 'var(--space-4)' }}>3. Conditional Rendering (Panel)</h4>
            <pre style={{ background: 'transparent' }}>
              <code>{`// Inside AccordionPanel
      const { openIndex } = useContext(AccordionContext);

      // Only render children if this panel is the open one
      if (openIndex !== index) return null;
      return <div>{children}</div>;`}</code>
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
    </LessonLayout>
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
