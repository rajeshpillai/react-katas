import { createContext, useContext, useState, ReactNode } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundVariant } from '@components/playground'
import { CompoundComponentsDiagram } from '@components/diagrams'

import sourceCode from './CompoundComponents.tsx?raw'

// Compound component pattern example
const AccordionContext = createContext<{
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
} | null>(null)

export const playgroundVariants: PlaygroundVariant[] = [
  {
    id: 'prop-explosion',
    label: 'Before — prop explosion',
    description:
      'A monolithic Accordion takes the entire structure as data props (items + renderHeader + renderPanel). The API balloons every time someone needs control over a sub-part.',
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { useState } from 'react'

interface Item { id: string; title: string; body: string }

function Accordion({
    items,
    activeId,
    onChange,
    renderHeader,
    renderBody,
}: {
    items: Item[]
    activeId: string | null
    onChange: (id: string | null) => void
    renderHeader?: (item: Item) => React.ReactNode
    renderBody?: (item: Item) => React.ReactNode
}) {
    return (
        <div style={{ border: '1px solid var(--pg-card-border)', borderRadius: 6 }}>
            {items.map(item => (
                <div key={item.id} style={{ borderTop: '1px solid var(--pg-card-border)' }}>
                    <button
                        onClick={() => onChange(item.id === activeId ? null : item.id)}
                        style={{ display: 'block', width: '100%', padding: 12, textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--pg-card-text)' }}
                    >
                        {renderHeader ? renderHeader(item) : item.title}
                    </button>
                    {item.id === activeId && (
                        <div style={{ padding: 12, background: 'var(--pg-card)' }}>
                            {renderBody ? renderBody(item) : item.body}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default function App() {
    const [activeId, setActiveId] = useState<string | null>(null)
    const items = [
        { id: 'a', title: 'Section A', body: 'Body A' },
        { id: 'b', title: 'Section B', body: 'Body B' },
    ]
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Prop-driven Accordion</h2>
            <Accordion items={items} activeId={activeId} onChange={setActiveId} />
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 320,
  },
  {
    id: 'compound',
    label: 'After — compound API',
    description:
      "Expose the structure as <Accordion><Accordion.Item><Accordion.Header /><Accordion.Panel /></Accordion.Item></Accordion>. Shared state lives in Context. The consumer arranges the parts however they like — no new props needed.",
    files: [
      {
        name: 'App.tsx',
        language: 'tsx',
        code: `import { createContext, useContext, useState, ReactNode } from 'react'

interface Ctx { activeId: string | null; setActiveId: (id: string | null) => void }
const AccordionCtx = createContext<Ctx | null>(null)
function useAccordion() {
    const ctx = useContext(AccordionCtx)
    if (!ctx) throw new Error('Accordion.* must be used inside <Accordion>')
    return ctx
}
const ItemCtx = createContext<string>('')

function Accordion({ children }: { children: ReactNode }) {
    const [activeId, setActiveId] = useState<string | null>(null)
    return (
        <AccordionCtx.Provider value={{ activeId, setActiveId }}>
            <div style={{ border: '1px solid var(--pg-card-border)', borderRadius: 6 }}>{children}</div>
        </AccordionCtx.Provider>
    )
}
function Item({ id, children }: { id: string; children: ReactNode }) {
    return <ItemCtx.Provider value={id}><div style={{ borderTop: '1px solid var(--pg-card-border)' }}>{children}</div></ItemCtx.Provider>
}
function Header({ children }: { children: ReactNode }) {
    const { activeId, setActiveId } = useAccordion()
    const id = useContext(ItemCtx)
    return (
        <button
            onClick={() => setActiveId(id === activeId ? null : id)}
            style={{ display: 'block', width: '100%', padding: 12, textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--pg-card-text)' }}
        >
            {children}
        </button>
    )
}
function Panel({ children }: { children: ReactNode }) {
    const { activeId } = useAccordion()
    const id = useContext(ItemCtx)
    if (id !== activeId) return null
    return <div style={{ padding: 12, background: 'var(--pg-card)' }}>{children}</div>
}
Accordion.Item = Item
Accordion.Header = Header
Accordion.Panel = Panel

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Compound Accordion</h2>
            <Accordion>
                <Accordion.Item id="a">
                    <Accordion.Header>Section A</Accordion.Header>
                    <Accordion.Panel>Body A</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item id="b">
                    <Accordion.Header>Section B</Accordion.Header>
                    <Accordion.Panel>Body B</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 360,
  },
  {
    id: 'original',
    label: 'Original demo',
    description: 'The kata\'s original Accordion playground.',
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
        <div style={{ padding: 16, background: 'var(--pg-card)', color: 'var(--pg-card-text)', borderRadius: 6 }}>
            {children}
        </div>
    )
}
`,
      },
    ],
    entryFile: 'App.tsx',
    height: 400,
  },
]

export default function CompoundComponents() {
  return (
    <LessonLayout title="Compound Components" playgroundVariants={playgroundVariants} sourceCode={sourceCode}>
      <div>
        <p>
          Compound components work together to form a complete UI. They share implicit state and
          provide a flexible, declarative API.
        </p>

        <CompoundComponentsDiagram />

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

        {/* When NOT to use */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>When NOT to Use Compound Components</h2>
          <p>
            Compound components are not free. Each part adds API surface, learning curve,
            and Provider/Consumer machinery. Reach for them only when the structure is
            actually variable. Specifically, prefer plain props when:
          </p>
          <ul>
            <li>
              <strong>The structure is fixed.</strong> A <code>{'<PageHeader title="..." actions={...} />'}</code>
              that always renders the same shape doesn't benefit from a compound API. The named slots
              pattern (or just props) is simpler.
            </li>
            <li>
              <strong>Consumers never want to reorder, omit, or repeat parts.</strong> If every
              consumer of <code>&lt;Card&gt;</code> always uses Header / Body / Footer in that order,
              named slots beat compound hierarchy.
            </li>
            <li>
              <strong>You need strong type checks on combinations.</strong> Compound APIs let consumers
              place <code>&lt;Tabs.Panel&gt;</code> outside <code>&lt;Tabs&gt;</code> — TypeScript can't prevent
              that. Runtime hierarchy errors help, but a single component with a discriminated-union
              prop catches more at compile time.
            </li>
            <li>
              <strong>The component is single-use and unlikely to be reused.</strong> The Context +
              hook + named subcomponents overhead pays back across many call sites; for a one-off
              UI it's just ceremony.
            </li>
            <li>
              <strong>Performance is sensitive and the tree is deep.</strong> Each compound part is
              its own component subscribing to Context. For shallow trees the cost is invisible;
              for deeply nested compound subcomponents on a hot path, profile before assuming
              this is the right shape.
            </li>
          </ul>
          <p>
            Rule of thumb: start with props. Reach for the compound pattern when the second
            consumer asks to lay out the parts differently.
          </p>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Compound components share state through context</li>
            <li>Provides flexible, declarative API</li>
            <li>Components work together as a cohesive unit</li>
            <li>Great for complex UI patterns (tabs, accordions, menus)</li>
            <li>Use them when consumers actually want to compose structure — not when the layout is fixed</li>
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
