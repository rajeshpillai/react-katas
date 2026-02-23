import { useState, ReactNode } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './SlotsPattern.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, ReactNode } from 'react'

// --- Slot-based Card Component ---

interface CardProps {
    header?: ReactNode
    body?: ReactNode
    footer?: ReactNode
}

function Card({ header, body, footer }: CardProps) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: 12,
            overflow: 'hidden',
            fontFamily: 'sans-serif',
        }}>
            {header && (
                <div style={{
                    padding: '16px 20px',
                    background: '#f0f4ff',
                    borderBottom: '1px solid #ddd',
                    fontWeight: 600,
                    fontSize: 16,
                }}>
                    {header}
                </div>
            )}
            {body && (
                <div style={{ padding: '20px' }}>
                    {body}
                </div>
            )}
            {footer && (
                <div style={{
                    padding: '12px 20px',
                    background: '#fafafa',
                    borderTop: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                }}>
                    {footer}
                </div>
            )}
        </div>
    )
}

// --- Layout Component with Named Slots ---

interface PageLayoutProps {
    sidebar?: ReactNode
    content: ReactNode
    topBar?: ReactNode
}

function PageLayout({ sidebar, content, topBar }: PageLayoutProps) {
    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            {topBar && (
                <div style={{
                    padding: '12px 16px',
                    background: '#1a1a2e',
                    color: 'white',
                    fontSize: 14,
                }}>
                    {topBar}
                </div>
            )}
            <div style={{ display: 'flex', minHeight: 200 }}>
                {sidebar && (
                    <div style={{
                        width: 180,
                        padding: 16,
                        background: '#f5f5f5',
                        borderRight: '1px solid #ddd',
                    }}>
                        {sidebar}
                    </div>
                )}
                <div style={{ flex: 1, padding: 16 }}>
                    {content}
                </div>
            </div>
        </div>
    )
}

// --- Demo App ---

export default function App() {
    const [cardVariant, setCardVariant] = useState<'full' | 'no-footer' | 'minimal'>('full')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Slots Pattern Demo</h2>

            <div style={{ marginBottom: 16 }}>
                <strong>Card variant: </strong>
                {(['full', 'no-footer', 'minimal'] as const).map(v => (
                    <button
                        key={v}
                        onClick={() => setCardVariant(v)}
                        style={{
                            padding: '6px 12px',
                            marginRight: 8,
                            background: cardVariant === v ? '#4361ee' : '#eee',
                            color: cardVariant === v ? 'white' : '#333',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                        }}
                    >
                        {v}
                    </button>
                ))}
            </div>

            <Card
                header={cardVariant !== 'minimal' ? (
                    <span>User Profile</span>
                ) : undefined}
                body={
                    <div>
                        <p style={{ margin: '0 0 8px' }}><strong>Jane Doe</strong></p>
                        <p style={{ margin: 0, color: '#666' }}>Software Engineer at Acme Corp</p>
                    </div>
                }
                footer={cardVariant === 'full' ? (
                    <>
                        <button style={{
                            padding: '8px 16px', background: '#eee',
                            border: 'none', borderRadius: 6, cursor: 'pointer',
                        }}>Cancel</button>
                        <button style={{
                            padding: '8px 16px', background: '#4361ee',
                            color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer',
                        }}>Save</button>
                    </>
                ) : undefined}
            />

            <h3 style={{ marginTop: 24 }}>Page Layout with Slots</h3>
            <PageLayout
                topBar={<span>My Application</span>}
                sidebar={
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '8px 0', fontWeight: 600 }}>Dashboard</li>
                        <li style={{ padding: '8px 0', color: '#666' }}>Settings</li>
                        <li style={{ padding: '8px 0', color: '#666' }}>Profile</li>
                    </ul>
                }
                content={
                    <div>
                        <h3 style={{ marginTop: 0 }}>Welcome back!</h3>
                        <p>This is the main content area, passed as the "content" slot.</p>
                    </div>
                }
            />
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 500,
}

// --- Slot-based Card Component for lesson demo ---

interface SlotCardProps {
    header?: ReactNode
    body?: ReactNode
    footer?: ReactNode
}

function SlotCard({ header, body, footer }: SlotCardProps) {
    return (
        <div
            style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
            }}
        >
            {header && (
                <div
                    style={{
                        padding: 'var(--space-4) var(--space-5)',
                        background: 'var(--surface-primary)',
                        borderBottom: '1px solid var(--border-color)',
                        fontWeight: 600,
                    }}
                >
                    {header}
                </div>
            )}
            {body && (
                <div style={{ padding: 'var(--space-5)' }}>
                    {body}
                </div>
            )}
            {footer && (
                <div
                    style={{
                        padding: 'var(--space-3) var(--space-5)',
                        background: 'var(--bg-tertiary)',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 'var(--space-2)',
                    }}
                >
                    {footer}
                </div>
            )}
        </div>
    )
}

export default function SlotsPattern() {
    const [showHeader, setShowHeader] = useState(true)
    const [showFooter, setShowFooter] = useState(true)

    return (
        <LessonLayout title="Slots Pattern" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
            <p>
                The Slots pattern gives a component multiple named insertion points for content. Instead
                of a single <code>children</code> prop, you pass distinct pieces of content through
                named props like <code>header</code>, <code>body</code>, and <code>footer</code>.
                This approach is inspired by how libraries like Radix UI and many design systems
                structure their component APIs.
            </p>

            {/* Section 1: What are Slots? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What are Slots?</h2>
                <p>
                    Slots are named props that accept <code>ReactNode</code> values. Each slot
                    represents a distinct content area within the component. The component itself
                    decides <em>where</em> each slot renders, while the consumer decides <em>what</em> goes
                    in each slot.
                </p>

                <pre>
                    <code>{`interface CardProps {
    header?: ReactNode   // Slot for the card header
    body?: ReactNode     // Slot for the card body
    footer?: ReactNode   // Slot for the card footer
}

function Card({ header, body, footer }: CardProps) {
    return (
        <div className="card">
            {header && <div className="card-header">{header}</div>}
            {body && <div className="card-body">{body}</div>}
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    )
}`}</code>
                </pre>
            </section>

            {/* Section 2: Why not just children? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Why Not Just Children?</h2>
                <p>
                    The <code>children</code> prop is a single, unstructured blob of content. When you
                    need multiple distinct content areas, children alone cannot express that structure.
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
                        <h3>Children Only</h3>
                        <pre style={{ background: 'transparent' }}>
                            <code>{`// Ambiguous: Which part
// is the header? Footer?
<Card>
  <h2>Title</h2>
  <p>Body text</p>
  <button>Action</button>
</Card>`}</code>
                        </pre>
                        <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            The component has no way to distinguish between header, body, and footer content.
                        </p>
                    </div>

                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-primary)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3>Named Slots</h3>
                        <pre style={{ background: 'transparent' }}>
                            <code>{`// Clear and explicit
<Card
  header={<h2>Title</h2>}
  body={<p>Body text</p>}
  footer={
    <button>Action</button>
  }
/>`}</code>
                        </pre>
                        <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            Each piece of content goes to its designated area. The intent is unambiguous.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Interactive Demo */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Interactive Demo: Card with Slots</h2>
                <p>
                    Toggle the header and footer slots on and off to see how the Card component
                    adapts. The body slot is always present.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={showHeader}
                                onChange={() => setShowHeader(!showHeader)}
                            />
                            Show header slot
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={showFooter}
                                onChange={() => setShowFooter(!showFooter)}
                            />
                            Show footer slot
                        </label>
                    </div>

                    <SlotCard
                        header={showHeader ? (
                            <span>User Profile</span>
                        ) : undefined}
                        body={
                            <div>
                                <p style={{ margin: '0 0 var(--space-2)' }}><strong>Jane Doe</strong></p>
                                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                                    Software Engineer at Acme Corp. This content always appears
                                    because the body slot is always provided.
                                </p>
                            </div>
                        }
                        footer={showFooter ? (
                            <>
                                <button
                                    style={{
                                        padding: 'var(--space-2) var(--space-4)',
                                        background: 'var(--color-gray-500)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={{
                                        padding: 'var(--space-2) var(--space-4)',
                                        background: 'var(--color-primary-500)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Save
                                </button>
                            </>
                        ) : undefined}
                    />

                    <pre style={{ marginTop: 'var(--space-4)', background: 'transparent' }}>
                        <code>{`<Card
    header={${showHeader ? '<span>User Profile</span>' : 'undefined'}}
    body={<UserInfo />}
    footer={${showFooter ? '<><CancelBtn /><SaveBtn /></>' : 'undefined'}}
/>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 4: Implementation Details */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Implementation Details</h2>
                <p>
                    The key to the slots pattern is simple: accept <code>ReactNode</code> props and
                    conditionally render them. Each slot gets its own wrapper with appropriate styling.
                </p>

                <pre>
                    <code>{`interface CardProps {
    header?: ReactNode
    body?: ReactNode
    footer?: ReactNode
}

function Card({ header, body, footer }: CardProps) {
    return (
        <div className="card">
            {/* Conditionally render each slot */}
            {header && (
                <div className="card-header">
                    {header}
                </div>
            )}
            {body && (
                <div className="card-body">
                    {body}
                </div>
            )}
            {footer && (
                <div className="card-footer">
                    {footer}
                </div>
            )}
        </div>
    )
}

// Usage: each slot is independent
<Card
    header={<h2>Settings</h2>}
    body={<SettingsForm />}
    footer={
        <div>
            <button>Cancel</button>
            <button>Save</button>
        </div>
    }
/>`}</code>
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Design Tips</h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Make slots optional with <code>?</code> so consumers only provide what they need
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Use <code>ReactNode</code> as the type for maximum flexibility
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Wrap each slot in a container div for consistent spacing and styling
                        </li>
                        <li style={{ color: 'white' }}>
                            Guard rendering with <code>{'{slot && <div>...'}</code> to avoid empty wrappers
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 5: Slots vs Children vs Compound Components */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Comparison: Slots vs Children vs Compound Components</h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 'var(--space-4)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-primary)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-primary)' }}>Slots (Named Props)</h3>
                        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                            <code>{`<Card
  header={...}
  body={...}
  footer={...}
/>`}</code>
                        </pre>
                        <ul style={{ fontSize: 'var(--font-size-sm)' }}>
                            <li>Explicit named areas</li>
                            <li>Simple implementation</li>
                            <li>Good for fixed layouts</li>
                        </ul>
                    </div>

                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-accent)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-accent)' }}>Children</h3>
                        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                            <code>{`<Card>
  <p>All content
     goes here</p>
</Card>`}</code>
                        </pre>
                        <ul style={{ fontSize: 'var(--font-size-sm)' }}>
                            <li>Single content area</li>
                            <li>Simplest API</li>
                            <li>Best for wrappers</li>
                        </ul>
                    </div>

                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3>Compound Components</h3>
                        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                            <code>{`<Card>
  <Card.Header>
    ...
  </Card.Header>
  <Card.Body>
    ...
  </Card.Body>
</Card>`}</code>
                        </pre>
                        <ul style={{ fontSize: 'var(--font-size-sm)' }}>
                            <li>Most flexible</li>
                            <li>Complex implementation</li>
                            <li>Shared implicit state</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 6: Real-World Example */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Real-World Example: Dialog Component</h2>
                <p>
                    The slots pattern is commonly used in dialog/modal components where you need a title,
                    body content, and action buttons in specific positions.
                </p>

                <pre>
                    <code>{`interface DialogProps {
    trigger: ReactNode       // What opens the dialog
    title: ReactNode         // Dialog header
    description?: ReactNode  // Optional description
    content: ReactNode       // Main dialog body
    actions: ReactNode       // Footer buttons
}

// Radix-inspired dialog usage:
<Dialog
    trigger={<button>Edit Profile</button>}
    title={<h2>Edit Profile</h2>}
    description={<p>Make changes to your profile.</p>}
    content={<ProfileForm />}
    actions={
        <>
            <button onClick={close}>Cancel</button>
            <button onClick={save}>Save changes</button>
        </>
    }
/>`}</code>
                </pre>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>Slots are named <code>ReactNode</code> props that define distinct content areas</li>
                    <li>Use slots when a component has multiple distinct content regions (header, body, footer)</li>
                    <li>Slots are simpler than compound components but more structured than plain children</li>
                    <li>Make slots optional so consumers only provide what they need</li>
                    <li>Guard rendering with conditional checks to avoid empty wrapper elements</li>
                    <li>Common in design system components: cards, dialogs, page layouts, and list items</li>
                </ul>
            </section>
            </div>
        </LessonLayout>
    )
}
