import { useState, ReactNode, Children, isValidElement } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './ChildrenAsData.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, ReactNode, Children, isValidElement } from 'react'

// --- Tab.Panel: a "data" component ---
// This component never renders itself directly.
// The parent (Tabs) reads its props to build the UI.

interface TabPanelProps {
    label: string
    children: ReactNode
}

function TabPanel({ children }: TabPanelProps) {
    // This component's render output is used by the parent.
    // It only renders when the parent decides to show it.
    return <>{children}</>
}

// --- Tabs: parent that reads children as data ---

interface TabsProps {
    children: ReactNode
    defaultIndex?: number
}

function Tabs({ children, defaultIndex = 0 }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex)

    // Extract tab data from children's props
    const tabs: { label: string; content: ReactNode }[] = []

    Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === TabPanel) {
            const props = child.props as TabPanelProps
            tabs.push({
                label: props.label,
                content: props.children,
            })
        }
    })

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            {/* Tab headers - built from children's "label" props */}
            <div style={{ display: 'flex', borderBottom: '2px solid #eee' }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            padding: '10px 20px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeIndex === index
                                ? '2px solid #4361ee'
                                : '2px solid transparent',
                            marginBottom: -2,
                            cursor: 'pointer',
                            fontWeight: activeIndex === index ? 700 : 400,
                            color: activeIndex === index ? '#4361ee' : '#666',
                            fontSize: 14,
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content - rendered based on active index */}
            <div style={{ padding: 20 }}>
                {tabs[activeIndex]?.content}
            </div>
        </div>
    )
}

// --- Demo App ---

export default function App() {
    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Children as Data: Tabs</h2>

            <Tabs defaultIndex={0}>
                <TabPanel label="Profile">
                    <h3>User Profile</h3>
                    <p>Name: Jane Doe</p>
                    <p>Role: Software Engineer</p>
                    <p>Location: San Francisco, CA</p>
                </TabPanel>
                <TabPanel label="Settings">
                    <h3>Account Settings</h3>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        <input type="checkbox" defaultChecked /> Email notifications
                    </label>
                    <label style={{ display: 'block', marginBottom: 12 }}>
                        <input type="checkbox" /> Dark mode
                    </label>
                    <label style={{ display: 'block' }}>
                        <input type="checkbox" defaultChecked /> Two-factor authentication
                    </label>
                </TabPanel>
                <TabPanel label="Activity">
                    <h3>Recent Activity</h3>
                    <ul>
                        <li>Pushed 3 commits to main (2h ago)</li>
                        <li>Opened PR #142 (5h ago)</li>
                        <li>Reviewed PR #139 (1d ago)</li>
                        <li>Created issue #201 (2d ago)</li>
                    </ul>
                </TabPanel>
            </Tabs>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 400,
}

// --- Tab.Panel component for lesson demo ---

interface TabPanelProps {
    label: string
    children: ReactNode
}

function TabPanel({ children }: TabPanelProps) {
    return <>{children}</>
}

// --- Tabs component that reads children as data ---

interface TabsProps {
    children: ReactNode
    defaultIndex?: number
}

function DemoTabs({ children, defaultIndex = 0 }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex)

    const tabs: { label: string; content: ReactNode }[] = []

    Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === TabPanel) {
            const props = child.props as TabPanelProps
            tabs.push({
                label: props.label,
                content: props.children,
            })
        }
    })

    return (
        <div>
            <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)' }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            padding: 'var(--space-3) var(--space-5)',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeIndex === index
                                ? '2px solid var(--color-primary-500)'
                                : '2px solid transparent',
                            marginBottom: -2,
                            cursor: 'pointer',
                            fontWeight: activeIndex === index ? 700 : 400,
                            color: activeIndex === index ? 'var(--color-primary-600)' : 'var(--text-secondary)',
                            fontSize: 'var(--font-size-base)',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ padding: 'var(--space-5)' }}>
                {tabs[activeIndex]?.content}
            </div>
        </div>
    )
}

export default function ChildrenAsData() {
    const [showCode, setShowCode] = useState(false)

    return (
        <LessonLayout title="Children as Data" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
            <p>
                In most React components, <code>children</code> is rendered directly into the DOM.
                But in the "Children as Data" pattern, the parent component <em>inspects</em> its
                children to extract metadata (like labels or titles), then uses that data to build
                its own UI. The children serve as a declarative configuration rather than direct
                render output.
            </p>

            {/* Section 1: What is Children as Data? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What is Children as Data?</h2>
                <p>
                    Instead of rendering children directly, the parent reads each child's props
                    to understand <em>what</em> the children represent. The parent then decides
                    how and where to render the information.
                </p>

                <pre>
                    <code>{`// The consumer writes this declarative API:
<Tabs>
    <Tab.Panel label="Profile">
        <ProfileContent />
    </Tab.Panel>
    <Tab.Panel label="Settings">
        <SettingsContent />
    </Tab.Panel>
</Tabs>

// But the Tabs parent reads the "label" prop from each child
// and renders tab headers itself — children are data, not output.`}</code>
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>The Core Idea</h3>
                    <p style={{ color: 'white' }}>
                        Children define <strong>what</strong> exists (a tab with a label and content).
                        The parent decides <strong>how</strong> to present it (render tab buttons in a
                        header bar, show only the active panel). This creates a clean, declarative API
                        where the markup structure matches the mental model.
                    </p>
                </div>
            </section>

            {/* Section 2: Use Case - Tab Component */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Use Case: Tab Component</h2>
                <p>
                    The most common example is a Tabs component. Each <code>Tab.Panel</code> child
                    carries a <code>label</code> prop. The parent reads these labels to render tab
                    headers, then conditionally shows only the active panel's content.
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
                            background: 'var(--surface-primary)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-primary)' }}>Consumer API</h3>
                        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                            <code>{`<Tabs>
  <Tab.Panel label="Profile">
    <ProfilePage />
  </Tab.Panel>
  <Tab.Panel label="Settings">
    <SettingsPage />
  </Tab.Panel>
</Tabs>`}</code>
                        </pre>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            Clean and declarative. Each panel declares its own label.
                        </p>
                    </div>
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-accent)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-accent)' }}>Alternative (Config Array)</h3>
                        <pre style={{ background: 'transparent', fontSize: 'var(--font-size-sm)' }}>
                            <code>{`<Tabs tabs={[
  {
    label: "Profile",
    content: <ProfilePage />
  },
  {
    label: "Settings",
    content: <SettingsPage />
  },
]} />`}</code>
                        </pre>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            Also valid, but less "React-like" and harder to compose.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Interactive Demo */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Interactive Demo</h2>
                <p>
                    This tab component is built using the Children as Data pattern. Click the tabs
                    to switch panels. The tab headers are generated by reading each child's <code>label</code> prop.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <DemoTabs defaultIndex={0}>
                        <TabPanel label="Profile">
                            <h3 style={{ marginTop: 0 }}>User Profile</h3>
                            <p><strong>Name:</strong> Jane Doe</p>
                            <p><strong>Role:</strong> Software Engineer</p>
                            <p><strong>Location:</strong> San Francisco, CA</p>
                        </TabPanel>
                        <TabPanel label="Settings">
                            <h3 style={{ marginTop: 0 }}>Account Settings</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked /> Email notifications
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                                    <input type="checkbox" /> Dark mode
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked /> Two-factor authentication
                                </label>
                            </div>
                        </TabPanel>
                        <TabPanel label="Activity">
                            <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
                            <ul>
                                <li>Pushed 3 commits to main (2h ago)</li>
                                <li>Opened PR #142 (5h ago)</li>
                                <li>Reviewed PR #139 (1d ago)</li>
                                <li>Created issue #201 (2d ago)</li>
                            </ul>
                        </TabPanel>
                    </DemoTabs>

                    <pre style={{ marginTop: 'var(--space-4)', background: 'transparent' }}>
                        <code>{`// The parent reads each child's "label" prop
// to generate these tab headers automatically.
<Tabs>
    <TabPanel label="Profile">...</TabPanel>
    <TabPanel label="Settings">...</TabPanel>
    <TabPanel label="Activity">...</TabPanel>
</Tabs>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 4: Implementation */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Implementation</h2>
                <p>
                    The parent uses <code>React.Children.forEach</code> and <code>React.isValidElement</code> to
                    iterate over children and extract their props. It checks that each child is the
                    expected component type before reading its props.
                </p>

                <button
                    onClick={() => setShowCode(!showCode)}
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
                    {showCode ? 'Hide' : 'Show'} Full Implementation
                </button>

                {showCode && (
                    <pre>
                        <code>{`// Step 1: Define the "data" component
interface TabPanelProps {
    label: string       // Metadata the parent will read
    children: ReactNode // Content the parent will render
}

function TabPanel({ children }: TabPanelProps) {
    // This component just passes through its children.
    // Its props (especially "label") are read by the parent.
    return <>{children}</>
}

// Step 2: The parent reads children's props as data
function Tabs({ children, defaultIndex = 0 }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex)

    // Extract structured data from children
    const tabs = []

    Children.forEach(children, (child) => {
        // Type-check: only process TabPanel children
        if (isValidElement(child) && child.type === TabPanel) {
            tabs.push({
                label: child.props.label,     // Read metadata
                content: child.props.children, // Read content
            })
        }
    })

    return (
        <div>
            {/* Render tab headers from extracted labels */}
            <div className="tab-bar">
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={i === activeIndex ? 'active' : ''}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Render only the active tab's content */}
            <div className="tab-content">
                {tabs[activeIndex]?.content}
            </div>
        </div>
    )
}`}</code>
                    </pre>
                )}

                <div
                    style={{
                        background: 'var(--bg-tertiary)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ marginBottom: 'var(--space-3)' }}>Key API Methods</h3>

                    <h4 style={{ marginTop: 'var(--space-3)' }}>React.Children.forEach / React.Children.map</h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Safely iterates over children, handling edge cases like <code>null</code>,
                        <code>undefined</code>, and fragments that <code>Array.forEach</code> cannot handle.
                    </p>

                    <h4 style={{ marginTop: 'var(--space-3)' }}>React.isValidElement(child)</h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Type guard that confirms a child is a React element (not a string, number, or null)
                        before accessing its <code>props</code> and <code>type</code>.
                    </p>

                    <h4 style={{ marginTop: 'var(--space-3)' }}>child.type === TabPanel</h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Compares the child's component reference to ensure you only process
                        the expected children. This filtering step is essential for robustness.
                    </p>
                </div>
            </section>

            {/* Section 5: Caveats and Alternatives */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Caveats and Alternatives</h2>

                <div
                    style={{
                        background: 'var(--surface-accent)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ marginBottom: 'var(--space-3)' }}>Legacy API Warning</h3>
                    <p>
                        The <code>React.Children</code> API is considered a legacy pattern by the React team.
                        It works, but it has limitations:
                    </p>
                    <ul style={{ marginTop: 'var(--space-2)' }}>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Fragile to wrapping</strong> - If a child is wrapped in a fragment or
                            higher-order component, the parent cannot see through the wrapper
                        </li>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Tight coupling</strong> - The parent must know the exact child component
                            type, creating an implicit contract
                        </li>
                        <li>
                            <strong>Not composable</strong> - Adding a wrapper around a TabPanel breaks
                            the parent's ability to read its props
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        background: 'var(--surface-primary)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ marginBottom: 'var(--space-3)' }}>Alternatives</h3>

                    <h4>1. Array of Objects (Data-Driven)</h4>
                    <pre style={{ background: 'transparent' }}>
                        <code>{`const tabs = [
    { label: "Profile", content: <Profile /> },
    { label: "Settings", content: <Settings /> },
]
<Tabs tabs={tabs} />`}</code>
                    </pre>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        More explicit, easier to type-check, and no need for <code>React.Children</code>.
                    </p>

                    <h4 style={{ marginTop: 'var(--space-3)' }}>2. Compound Components with Context</h4>
                    <pre style={{ background: 'transparent' }}>
                        <code>{`<Tabs>
    <Tabs.List>
        <Tabs.Trigger>Profile</Tabs.Trigger>
        <Tabs.Trigger>Settings</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Panel>...</Tabs.Panel>
    <Tabs.Panel>...</Tabs.Panel>
</Tabs>`}</code>
                    </pre>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                        Used by Radix UI. More verbose but fully composable and extensible.
                    </p>
                </div>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>
                        Children as Data means the parent inspects children's props to extract
                        metadata instead of rendering children directly
                    </li>
                    <li>
                        Use <code>React.Children.forEach</code> and <code>isValidElement</code> to
                        safely iterate and type-check children
                    </li>
                    <li>
                        Common use case: Tabs where children define panels with labels that the
                        parent renders as tab headers
                    </li>
                    <li>
                        The <code>React.Children</code> API is considered legacy; consider using
                        arrays of objects or compound components as alternatives
                    </li>
                    <li>
                        This pattern creates a declarative API that matches the developer's mental
                        model but is fragile to wrapping and composition
                    </li>
                    <li>
                        Best for internal components where you control the consumer; use compound
                        components for public APIs
                    </li>
                </ul>
            </section>
            </div>
        </LessonLayout>
    )
}
