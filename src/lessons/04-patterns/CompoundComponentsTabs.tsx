import { createContext, useContext, useState, useRef, useCallback, useId, type ReactNode, type KeyboardEvent } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './CompoundComponentsTabs.tsx?raw'

// ============================================================
// Playground config
// ============================================================

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'

export default function App() {
    const [controlledIndex, setControlledIndex] = useState(0)

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h3>Uncontrolled Tabs</h3>
            <Tabs defaultIndex={0}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Billing</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <h4>Profile</h4>
                        <p>Name: Jane Doe</p>
                        <p>Role: Engineer</p>
                    </TabPanel>
                    <TabPanel>
                        <h4>Settings</h4>
                        <label style={{ display: 'block', marginBottom: 8 }}>
                            <input type="checkbox" defaultChecked /> Email notifications
                        </label>
                        <label style={{ display: 'block' }}>
                            <input type="checkbox" /> SMS notifications
                        </label>
                    </TabPanel>
                    <TabPanel>
                        <h4>Billing</h4>
                        <p>Plan: Pro ($29/mo)</p>
                        <p>Next payment: March 1, 2026</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <h3 style={{ marginTop: 24 }}>Controlled Tabs</h3>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
                External buttons control which tab is active:
            </p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <button onClick={() => setControlledIndex(0)}>Go to Profile</button>
                <button onClick={() => setControlledIndex(1)}>Go to Settings</button>
            </div>
            <Tabs index={controlledIndex} onChange={setControlledIndex}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><p>Controlled: Profile content</p></TabPanel>
                    <TabPanel><p>Controlled: Settings content</p></TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}
`,
        },
        {
            name: 'Tabs.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, useRef, useCallback, useId, type ReactNode, type KeyboardEvent } from 'react'

// ---- Contexts ----

interface TabsContextValue {
    activeIndex: number
    setActiveIndex: (index: number) => void
    tabsId: string
}

interface RegistryContextValue {
    register: () => number
}

const TabsContext = createContext<TabsContextValue | null>(null)
const TabListRegistryContext = createContext<RegistryContextValue | null>(null)
const TabPanelsRegistryContext = createContext<RegistryContextValue | null>(null)

function useTabsContext() {
    const ctx = useContext(TabsContext)
    if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
    return ctx
}

// ---- Tabs (root) ----

interface TabsProps {
    children: ReactNode
    defaultIndex?: number
    index?: number
    onChange?: (index: number) => void
}

export function Tabs({ children, defaultIndex = 0, index, onChange }: TabsProps) {
    const [internalIndex, setInternalIndex] = useState(defaultIndex)
    const isControlled = index !== undefined
    const activeIndex = isControlled ? index : internalIndex
    const tabsId = useId()

    const setActiveIndex = useCallback((newIndex: number) => {
        if (!isControlled) setInternalIndex(newIndex)
        onChange?.(newIndex)
    }, [isControlled, onChange])

    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex, tabsId }}>
            <div>{children}</div>
        </TabsContext.Provider>
    )
}

// ---- TabList ----

export function TabList({ children }: { children: ReactNode }) {
    useTabsContext()
    const counterRef = useRef(0)
    counterRef.current = 0
    const register = useCallback(() => counterRef.current++, [])

    const { activeIndex, setActiveIndex, tabsId } = useTabsContext()
    const listRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        if (!tabs?.length) return
        const count = tabs.length
        let next = activeIndex

        switch (e.key) {
            case 'ArrowRight': next = (activeIndex + 1) % count; break
            case 'ArrowLeft': next = (activeIndex - 1 + count) % count; break
            case 'Home': next = 0; break
            case 'End': next = count - 1; break
            default: return
        }
        e.preventDefault()
        setActiveIndex(next)
        tabs[next]?.focus()
    }

    return (
        <TabListRegistryContext.Provider value={{ register }}>
            <div
                ref={listRef}
                role="tablist"
                onKeyDown={handleKeyDown}
                style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}
            >
                {children}
            </div>
        </TabListRegistryContext.Provider>
    )
}

// ---- Tab ----

export function Tab({ children }: { children: ReactNode }) {
    const { activeIndex, setActiveIndex, tabsId } = useTabsContext()
    const registry = useContext(TabListRegistryContext)
    if (!registry) throw new Error('<Tab> must be used within <TabList>')

    const indexRef = useRef<number>(-1)
    if (indexRef.current === -1) indexRef.current = registry.register()
    const index = indexRef.current

    const isActive = index === activeIndex

    return (
        <button
            role="tab"
            id={\`\${tabsId}-tab-\${index}\`}
            aria-selected={isActive}
            aria-controls={\`\${tabsId}-panel-\${index}\`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            style={{
                padding: '8px 16px',
                border: 'none',
                borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                background: 'transparent',
                color: isActive ? '#3b82f6' : '#64748b',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                marginBottom: -2,
                transition: 'color 0.15s, border-color 0.15s',
            }}
        >
            {children}
        </button>
    )
}

// ---- TabPanels ----

export function TabPanels({ children }: { children: ReactNode }) {
    useTabsContext()
    const counterRef = useRef(0)
    counterRef.current = 0
    const register = useCallback(() => counterRef.current++, [])

    return (
        <TabPanelsRegistryContext.Provider value={{ register }}>
            {children}
        </TabPanelsRegistryContext.Provider>
    )
}

// ---- TabPanel ----

export function TabPanel({ children }: { children: ReactNode }) {
    const { activeIndex, tabsId } = useTabsContext()
    const registry = useContext(TabPanelsRegistryContext)
    if (!registry) throw new Error('<TabPanel> must be used within <TabPanels>')

    const indexRef = useRef<number>(-1)
    if (indexRef.current === -1) indexRef.current = registry.register()
    const index = indexRef.current

    if (index !== activeIndex) return null

    return (
        <div
            role="tabpanel"
            id={\`\${tabsId}-panel-\${index}\`}
            aria-labelledby={\`\${tabsId}-tab-\${index}\`}
            style={{ padding: '12px 0' }}
        >
            {children}
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 500,
}

// ============================================================
// Inline demo components for Lesson tab
// ============================================================

// --- Problem Demo: Config-driven tabs ---

interface NaiveTabConfig {
    label: string
    content: ReactNode
}

function NaiveTabs({ tabs }: { tabs: NaiveTabConfig[] }) {
    const [active, setActive] = useState(0)
    return (
        <div>
            <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)' }}>
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        style={{
                            padding: 'var(--space-2) var(--space-4)',
                            border: 'none',
                            borderBottom: i === active ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                            background: 'transparent',
                            color: i === active ? 'var(--color-primary-500)' : 'var(--text-secondary)',
                            fontWeight: i === active ? 600 : 400,
                            cursor: 'pointer',
                            marginBottom: -2,
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ padding: 'var(--space-4) 0' }}>
                {tabs[active]?.content}
            </div>
        </div>
    )
}

function ProblemDemo() {
    return (
        <NaiveTabs
            tabs={[
                { label: 'Profile', content: <div><strong>Jane Doe</strong><p>Engineer at Acme Corp</p></div> },
                { label: 'Settings', content: <div><label><input type="checkbox" defaultChecked /> Notifications</label></div> },
                { label: 'Billing', content: <div><p>Plan: Pro ($29/mo)</p></div> },
            ]}
        />
    )
}

// --- Solution Demo: Compound Tabs ---

interface TabsCtx {
    activeIndex: number
    setActiveIndex: (index: number) => void
    tabsId: string
}

interface RegistryCtx {
    register: () => number
}

const TabsContext = createContext<TabsCtx | null>(null)
const TabListRegistry = createContext<RegistryCtx | null>(null)
const TabPanelsRegistry = createContext<RegistryCtx | null>(null)

function useTabsCtx() {
    const ctx = useContext(TabsContext)
    if (!ctx) throw new Error('Must be used within <Tabs>')
    return ctx
}

interface TabsProps {
    children: ReactNode
    defaultIndex?: number
    index?: number
    onChange?: (index: number) => void
}

function Tabs({ children, defaultIndex = 0, index, onChange }: TabsProps) {
    const [internalIndex, setInternalIndex] = useState(defaultIndex)
    const isControlled = index !== undefined
    const activeIndex = isControlled ? index : internalIndex
    const tabsId = useId()

    const setActiveIndex = useCallback((newIndex: number) => {
        if (!isControlled) setInternalIndex(newIndex)
        onChange?.(newIndex)
    }, [isControlled, onChange])

    return (
        <TabsContext.Provider value={{ activeIndex, setActiveIndex, tabsId }}>
            <div>{children}</div>
        </TabsContext.Provider>
    )
}

function TabList({ children }: { children: ReactNode }) {
    const { activeIndex, setActiveIndex } = useTabsCtx()
    const counterRef = useRef(0)
    counterRef.current = 0
    const register = useCallback(() => counterRef.current++, [])
    const listRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        if (!tabs?.length) return
        const count = tabs.length
        let next = activeIndex

        switch (e.key) {
            case 'ArrowRight': next = (activeIndex + 1) % count; break
            case 'ArrowLeft': next = (activeIndex - 1 + count) % count; break
            case 'Home': next = 0; break
            case 'End': next = count - 1; break
            default: return
        }
        e.preventDefault()
        setActiveIndex(next)
        tabs[next]?.focus()
    }

    return (
        <TabListRegistry.Provider value={{ register }}>
            <div
                ref={listRef}
                role="tablist"
                onKeyDown={handleKeyDown}
                style={{ display: 'flex', borderBottom: '2px solid var(--border-color)' }}
            >
                {children}
            </div>
        </TabListRegistry.Provider>
    )
}

function Tab({ children }: { children: ReactNode }) {
    const { activeIndex, setActiveIndex, tabsId } = useTabsCtx()
    const registry = useContext(TabListRegistry)
    if (!registry) throw new Error('<Tab> must be within <TabList>')

    const indexRef = useRef<number>(-1)
    if (indexRef.current === -1) indexRef.current = registry.register()
    const index = indexRef.current
    const isActive = index === activeIndex

    return (
        <button
            role="tab"
            id={`${tabsId}-tab-${index}`}
            aria-selected={isActive}
            aria-controls={`${tabsId}-panel-${index}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            style={{
                padding: 'var(--space-2) var(--space-4)',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                background: 'transparent',
                color: isActive ? 'var(--color-primary-500)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                marginBottom: -2,
                transition: 'color 0.15s, border-color 0.15s',
            }}
        >
            {children}
        </button>
    )
}

function TabPanels({ children }: { children: ReactNode }) {
    useTabsCtx()
    const counterRef = useRef(0)
    counterRef.current = 0
    const register = useCallback(() => counterRef.current++, [])

    return (
        <TabPanelsRegistry.Provider value={{ register }}>
            {children}
        </TabPanelsRegistry.Provider>
    )
}

function TabPanel({ children }: { children: ReactNode }) {
    const { activeIndex, tabsId } = useTabsCtx()
    const registry = useContext(TabPanelsRegistry)
    if (!registry) throw new Error('<TabPanel> must be within <TabPanels>')

    const indexRef = useRef<number>(-1)
    if (indexRef.current === -1) indexRef.current = registry.register()
    const index = indexRef.current

    if (index !== activeIndex) return null

    return (
        <div
            role="tabpanel"
            id={`${tabsId}-panel-${index}`}
            aria-labelledby={`${tabsId}-tab-${index}`}
            style={{ padding: 'var(--space-4) 0' }}
        >
            {children}
        </div>
    )
}

function SolutionDemo() {
    return (
        <Tabs defaultIndex={0}>
            <TabList>
                <Tab>Profile</Tab>
                <Tab>Settings</Tab>
                <Tab>Billing</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div><strong>Jane Doe</strong><p>Engineer at Acme Corp</p></div>
                </TabPanel>
                <TabPanel>
                    <div><label><input type="checkbox" defaultChecked /> Notifications</label></div>
                </TabPanel>
                <TabPanel>
                    <div><p>Plan: Pro ($29/mo)</p></div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

function ControlledDemo() {
    const [idx, setIdx] = useState(0)
    return (
        <div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <button
                    onClick={() => setIdx(0)}
                    style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: idx === 0 ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                        color: idx === 0 ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                    }}
                >
                    Go to Profile
                </button>
                <button
                    onClick={() => setIdx(1)}
                    style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: idx === 1 ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                        color: idx === 1 ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                    }}
                >
                    Go to Settings
                </button>
                <button
                    onClick={() => setIdx(2)}
                    style={{
                        padding: 'var(--space-2) var(--space-4)',
                        background: idx === 2 ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                        color: idx === 2 ? 'white' : 'var(--text-primary)',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                    }}
                >
                    Go to Billing
                </button>
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
                Active index: <strong>{idx}</strong> (controlled by external state)
            </p>
            <Tabs index={idx} onChange={setIdx}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Settings</Tab>
                    <Tab>Billing</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><p>Controlled: Profile content</p></TabPanel>
                    <TabPanel><p>Controlled: Settings content</p></TabPanel>
                    <TabPanel><p>Controlled: Billing content</p></TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

// ============================================================
// Main Lesson Component
// ============================================================

export default function CompoundComponentsTabs() {
    return (
        <LessonLayout title="Compound Components: Tabs" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
                <p>
                    The Tabs pattern is the canonical compound component example — popularized by
                    {' '}<strong>Ryan Florence</strong> in his React training. It demonstrates how to split a UI
                    into composable subtrees that share state through Context, giving consumers full control
                    over layout and styling without prop drilling.
                </p>

                {/* Section 1: The Problem */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>The Problem: Config-Driven Tabs</h2>
                    <p>
                        The instinctive way to build tabs is with a config object:
                    </p>

                    <pre><code>{`// Config-driven: pass an array of tab definitions
<Tabs tabs={[
  { label: 'Profile', content: <ProfilePage /> },
  { label: 'Settings', content: <SettingsPage /> },
  { label: 'Billing', content: <BillingPage />, icon: '💳', disabled: false },
]} />

// Problem: every new feature = new config field
// Want an icon? Add "icon" field.
// Want disabled state? Add "disabled" field.
// Want a badge? Add "badge" field.
// The config object keeps growing...`}</code></pre>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                        border: '2px solid var(--color-error)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-error)' }}>Config-Driven Demo</h3>
                        <ProblemDemo />
                        <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
                            This works, but try adding a badge, icon, or tooltip to one tab — you can't without
                            modifying the Tabs component's internals.
                        </p>
                    </div>
                </section>

                {/* Section 2: The Insight */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>The Insight: Separated Subtrees</h2>
                    <p>
                        Ryan Florence's key insight: split <strong>navigation</strong> and <strong>content</strong> into
                        separate subtrees that share state through Context. The consumer owns the JSX — you own the behavior:
                    </p>

                    <pre><code>{`<Tabs>
  <TabList>           {/* Navigation subtree */}
    <Tab>Profile</Tab>
    <Tab>Settings</Tab>
  </TabList>
  <TabPanels>         {/* Content subtree */}
    <TabPanel>Profile content...</TabPanel>
    <TabPanel>Settings content...</TabPanel>
  </TabPanels>
</Tabs>

// Now adding an icon is just JSX:
<Tab>💳 Billing</Tab>

// Wrapping a tab in a tooltip? Just wrap it:
<Tooltip text="Account settings">
  <Tab>Settings</Tab>
</Tooltip>`}</code></pre>

                    <div style={{
                        marginTop: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        background: 'var(--color-info)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <strong>How is this different from the Accordion (kata #22)?</strong>
                        <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-5)' }}>
                            <li><strong>Accordion:</strong> nested structure — each <code>{'<AccordionItem>'}</code> wraps its header + panel together</li>
                            <li><strong>Tabs:</strong> separated subtrees — <code>{'<TabList>'}</code> and <code>{'<TabPanels>'}</code> are siblings, not parent-child</li>
                            <li><strong>Accordion:</strong> explicit <code>{'index={0}'}</code> prop on each item</li>
                            <li><strong>Tabs:</strong> implicit indexing — children auto-register based on render order</li>
                        </ul>
                    </div>

                    <div style={{
                        marginTop: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                    }}>
                        <strong>How is this different from Children as Data (kata #28)?</strong>
                        <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>
                            The Children as Data approach uses <code>React.Children.forEach</code> to read children's props.
                            That's fragile — wrapping a child in a Fragment, HOC, or conditional breaks it. The compound
                            component approach uses Context, which works through any number of wrapper layers.
                        </p>
                    </div>
                </section>

                {/* Section 3: Step by Step */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>Building It Step by Step</h2>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Step 1: TabsContext</h3>
                    <p>
                        The root context holds the active tab index and a setter. Every descendant can read which tab
                        is active and switch tabs:
                    </p>
                    <pre><code>{`interface TabsContextValue {
  activeIndex: number
  setActiveIndex: (index: number) => void
  tabsId: string   // for ARIA id generation
}

const TabsContext = createContext<TabsContextValue | null>(null)`}</code></pre>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Step 2: Tabs root (controlled + uncontrolled)</h3>
                    <p>
                        The <code>Tabs</code> component supports both modes — if <code>index</code> is provided,
                        it's controlled; otherwise it manages its own state with <code>defaultIndex</code>:
                    </p>
                    <pre><code>{`function Tabs({ children, defaultIndex = 0, index, onChange }) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex)
  const isControlled = index !== undefined
  const activeIndex = isControlled ? index : internalIndex

  const setActiveIndex = (newIndex: number) => {
    if (!isControlled) setInternalIndex(newIndex)
    onChange?.(newIndex)
  }

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex, tabsId }}>
      {children}
    </TabsContext.Provider>
  )
}`}</code></pre>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Step 3: Implicit index registration</h3>
                    <p>
                        This is the key technique. <code>TabList</code> provides a <code>register()</code> function
                        via a separate context. Each <code>Tab</code> calls <code>register()</code> during render to
                        get its index. A ref-based counter ensures sequential assignment:
                    </p>
                    <pre><code>{`function TabList({ children }) {
  const counterRef = useRef(0)
  counterRef.current = 0   // reset every render
  const register = useCallback(() => counterRef.current++, [])

  return (
    <TabListRegistry.Provider value={{ register }}>
      <div role="tablist">{children}</div>
    </TabListRegistry.Provider>
  )
}

function Tab({ children }) {
  const { activeIndex, setActiveIndex } = useTabsContext()
  const registry = useContext(TabListRegistry)

  // Register once — get a stable index based on render order
  const indexRef = useRef(-1)
  if (indexRef.current === -1) indexRef.current = registry.register()
  const index = indexRef.current

  const isActive = index === activeIndex
  return (
    <button role="tab" onClick={() => setActiveIndex(index)}>
      {children}
    </button>
  )
}`}</code></pre>

                    <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' }}>
                        <strong>Why does this work?</strong> React renders children in order. The first <code>{'<Tab>'}</code> calls
                        {' '}<code>register()</code> first and gets index 0, the second gets 1, etc. <code>TabPanels</code> uses the
                        same pattern so panel indices match tab indices.
                    </p>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-6)',
                        border: '2px solid var(--color-success)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-success)' }}>Compound Tabs Demo</h3>
                        <SolutionDemo />
                        <p style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
                            No <code>index</code> props anywhere — tabs register themselves automatically!
                        </p>
                    </div>
                </section>

                {/* Section 4: Controlled vs Uncontrolled */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>Controlled vs Uncontrolled Mode</h2>
                    <p>
                        The same pattern used by native <code>{'<input>'}</code> elements (<code>value</code> vs
                        {' '}<code>defaultValue</code>). The component detects which mode based on whether <code>index</code> is provided:
                    </p>

                    <pre><code>{`// Uncontrolled — component manages its own state
<Tabs defaultIndex={0}>
  ...
</Tabs>

// Controlled — parent owns the state
const [activeTab, setActiveTab] = useState(0)
<Tabs index={activeTab} onChange={setActiveTab}>
  ...
</Tabs>

// Internal detection:
const isControlled = index !== undefined
const activeIndex = isControlled ? index : internalIndex`}</code></pre>

                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)' }}>
                        See kata #25 (Controlled vs Uncontrolled) for the general pattern.
                    </p>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                        border: '2px solid var(--color-primary-500)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary-500)' }}>Controlled Demo</h3>
                        <ControlledDemo />
                    </div>
                </section>

                {/* Section 5: Accessibility */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>Accessibility: WAI-ARIA Tabs Pattern</h2>
                    <p>
                        The WAI-ARIA <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" target="_blank" rel="noopener noreferrer">
                        Tabs pattern</a> defines specific roles and keyboard behavior. Here's what each component adds:
                    </p>

                    <pre><code>{`// TabList → role="tablist"
<div role="tablist" onKeyDown={handleKeyDown}>

// Tab → role="tab" + ARIA attributes
<button
  role="tab"
  id={\`tabs-\${tabsId}-tab-\${index}\`}
  aria-selected={isActive}
  aria-controls={\`tabs-\${tabsId}-panel-\${index}\`}
  tabIndex={isActive ? 0 : -1}   // roving tabindex
>

// TabPanel → role="tabpanel" + ARIA attributes
<div
  role="tabpanel"
  id={\`tabs-\${tabsId}-panel-\${index}\`}
  aria-labelledby={\`tabs-\${tabsId}-tab-\${index}\`}
>`}</code></pre>

                    <h3 style={{ marginTop: 'var(--space-6)' }}>Keyboard Navigation</h3>
                    <p>
                        Arrow keys move between tabs, Home/End jump to first/last. Focus follows the active tab
                        (roving <code>tabIndex</code>):
                    </p>

                    <pre><code>{`const handleKeyDown = (e: KeyboardEvent) => {
  const count = tabs.length
  switch (e.key) {
    case 'ArrowRight':
      setActiveIndex((activeIndex + 1) % count)    // wrap around
      break
    case 'ArrowLeft':
      setActiveIndex((activeIndex - 1 + count) % count)
      break
    case 'Home':
      setActiveIndex(0)
      break
    case 'End':
      setActiveIndex(count - 1)
      break
  }
  tabs[nextIndex]?.focus()  // move focus to the new active tab
}`}</code></pre>

                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)' }}>
                        Try it in the demo above — click a tab, then use Arrow keys.
                        See katas #34 (ARIA Fundamentals) and #35 (Keyboard Navigation) for deeper coverage.
                    </p>
                </section>

                {/* Section 6: When NOT to use */}
                <section style={{ marginBottom: 'var(--space-8)' }}>
                    <h2>When NOT to Use Compound Components</h2>
                    <p>
                        Compound components are powerful but not always the right choice:
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '2px solid var(--color-success)',
                        }}>
                            <h3 style={{ color: 'var(--color-success)' }}>Use compound components when:</h3>
                            <ul style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-5)' }}>
                                <li>The component is reused in multiple places</li>
                                <li>Consumers need to customize individual sub-parts</li>
                                <li>The API surface would otherwise explode with config props</li>
                                <li>Layout flexibility matters (tabs could be vertical, bottom-aligned, etc.)</li>
                            </ul>
                        </div>
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-secondary)',
                            borderRadius: 'var(--radius-lg)',
                            border: '2px solid var(--color-error)',
                        }}>
                            <h3 style={{ color: 'var(--color-error)' }}>Skip it when:</h3>
                            <ul style={{ fontSize: 'var(--font-size-sm)', paddingLeft: 'var(--space-5)' }}>
                                <li>Tabs are a fixed set that never changes — just use a simple config array</li>
                                <li>Tabs are added/removed dynamically (implicit indexing shifts!) — use explicit IDs</li>
                                <li>It's a one-off component that won't be reused — over-engineering</li>
                                <li>The component only has 2-3 props — no API explosion to solve</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{
                        marginTop: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        background: 'var(--color-warning, #f59e0b)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <strong>Implicit indexing caveat:</strong> The render-order registration relies on children
                        rendering in a stable order. If you conditionally render tabs (<code>{'show && <Tab>...</Tab>'}</code>),
                        the indices shift and tabs/panels get mismatched. For dynamic tabs, use explicit string IDs
                        instead of auto-incrementing indices.
                    </div>
                </section>

                {/* Key Takeaways */}
                <section>
                    <h2>Key Takeaways</h2>
                    <ul>
                        <li><strong>Separated subtrees:</strong> TabList (navigation) and TabPanels (content) are siblings that share state via Context — not nested like Accordion</li>
                        <li><strong>Implicit indexing:</strong> Children auto-register via a ref-based counter during render — no <code>index</code> props needed</li>
                        <li><strong>Composable JSX:</strong> Consumers can add icons, badges, tooltips, or any wrapper around individual tabs without modifying the component</li>
                        <li><strong>Controlled + uncontrolled:</strong> Support both <code>defaultIndex</code> (internal state) and <code>index</code> + <code>onChange</code> (parent-controlled)</li>
                        <li><strong>Accessibility built in:</strong> ARIA roles (<code>tablist</code>, <code>tab</code>, <code>tabpanel</code>), <code>aria-selected</code>, and keyboard navigation are part of the component, not an afterthought</li>
                        <li><strong>Not always the answer:</strong> Simple config-driven tabs are fine for fixed, non-reusable UIs. Use compound components when flexibility matters</li>
                        <li><strong>This is how libraries work:</strong> Radix UI, Reach UI, and Headless UI all use this exact pattern for their Tab components</li>
                    </ul>
                </section>
            </div>
        </LessonLayout>
    )
}
