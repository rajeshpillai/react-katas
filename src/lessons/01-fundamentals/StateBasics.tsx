import { useState, lazy, Suspense } from 'react'
import type { PlaygroundConfig } from '@components/playground'
import sourceCode from './StateBasics.tsx?raw'

const PlaygroundLayout = lazy(() =>
    import('@components/playground').then((m) => ({ default: m.PlaygroundLayout }))
)

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

export default function App() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Counter: {count}</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button onClick={() => setCount(c => c + 1)}>+</button>
                <button onClick={() => setCount(c => c - 1)}>-</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>

            <h2>Greeting</h2>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Type your name..."
                style={{ padding: 8, fontSize: 14, width: '100%', marginBottom: 8 }}
            />
            {name && <p>Hello, <strong>{name}</strong>!</p>}
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 350,
}

export default function StateBasics() {
    const [activeTab, setActiveTab] = useState<'lesson' | 'playground' | 'code'>('lesson')
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div>
            <h1>State Basics</h1>

            <div style={{ marginBottom: 24, borderBottom: '1px solid var(--border-color)' }}>
                {(['lesson', 'playground', 'code'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                            cursor: 'pointer',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            color: activeTab === tab ? 'var(--color-primary-500)' : 'var(--text-secondary)',
                        }}
                    >
                        {tab === 'lesson' ? 'Lesson' : tab === 'playground' ? 'Playground' : 'Source Code'}
                    </button>
                ))}
            </div>

            {activeTab === 'playground' && (
                <Suspense fallback={<div>Loading playground...</div>}>
                    <PlaygroundLayout config={playgroundConfig} />
                </Suspense>
            )}

            {activeTab === 'code' && (
                <pre style={{ overflow: 'auto' }}><code>{sourceCode}</code></pre>
            )}

            {activeTab === 'lesson' && (
            <div>
            <p>
                State lets components "remember" information and respond to user interactions. The{' '}
                <code>useState</code> hook is how we add state to function components.
            </p>

            {/* Section 1: What is State? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What is State?</h2>
                <p>
                    State is data that changes over time. When state changes, React automatically re-renders
                    the component to reflect the new data.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Counter Example:</h3>
                    <div style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-4)' }}>
                        Count: <strong style={{ color: 'var(--color-primary-600)' }}>{count}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button
                            onClick={() => setCount(count + 1)}
                            style={{
                                padding: 'var(--space-3) var(--space-6)',
                                background: 'var(--color-primary-500)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontSize: 'var(--font-size-base)',
                            }}
                        >
                            Increment
                        </button>
                        <button
                            onClick={() => setCount(count - 1)}
                            style={{
                                padding: 'var(--space-3) var(--space-6)',
                                background: 'var(--color-accent-500)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontSize: 'var(--font-size-base)',
                            }}
                        >
                            Decrement
                        </button>
                        <button
                            onClick={() => setCount(0)}
                            style={{
                                padding: 'var(--space-3) var(--space-6)',
                                background: 'var(--color-gray-500)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                fontSize: 'var(--font-size-base)',
                            }}
                        >
                            Reset
                        </button>
                    </div>

                    <pre style={{ marginTop: 'var(--space-4)' }}>
                        <code>{`// useState returns [currentValue, setterFunction]
const [count, setCount] = useState(0);

// Update state by calling the setter
<button onClick={() => setCount(count + 1)}>
  Increment
</button>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 2: Multiple State Variables */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Multiple State Variables</h2>
                <p>You can use multiple useState hooks in a single component for different pieces of state.</p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Form Example:</h3>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name..."
                        style={{
                            width: '100%',
                            padding: 'var(--space-3)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-base)',
                            marginBottom: 'var(--space-4)',
                        }}
                    />
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                        }}
                    >
                        {name ? (
                            <p>
                                Hello, <strong>{name}</strong>! 👋
                            </p>
                        ) : (
                            <p style={{ color: 'var(--text-tertiary)' }}>Type your name above...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 3: State vs Props */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>State vs Props</h2>
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
                            background: 'var(--color-primary-100)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--color-primary-700)' }}>State</h3>
                        <ul>
                            <li>Owned by the component</li>
                            <li>Can be changed by the component</li>
                            <li>Triggers re-renders when updated</li>
                            <li>Private and local</li>
                        </ul>
                    </div>
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--color-accent-100)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--color-accent-700)' }}>Props</h3>
                        <ul>
                            <li>Passed from parent</li>
                            <li>Read-only (immutable)</li>
                            <li>Can be passed down</li>
                            <li>Configuration for component</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 4: Conditional Rendering with State */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Conditional Rendering with State</h2>
                <p>State is perfect for controlling what gets rendered:</p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <button
                        onClick={() => setIsVisible(!isVisible)}
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
                        {isVisible ? 'Hide' : 'Show'} Message
                    </button>

                    {isVisible && (
                        <div
                            style={{
                                padding: 'var(--space-4)',
                                background: 'var(--color-success)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                            }}
                        >
                            <p>🎉 This message is conditionally rendered based on state!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Section 5: Under the Hood - State Batching */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Under the Hood: State Batching</h2>
                <p>
                    React doesn't update state immediately. Instead, it "batches" updates together for
                    performance. This means multiple state updates in the same event handler might result
                    in only ONE re-render!
                </p>

                <div
                    style={{
                        background: 'var(--color-info)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>⚙️ How Batching Works</h3>
                    <pre style={{ background: 'transparent' }}>
                        <code style={{ color: 'white' }}>{`// Render Count: 0

const handleClick = () => {
  setCount(c => c + 1); // Update queued
  setName('Alice');     // Update queued
  setIsVisible(false);  // Update queued
  
  // React reconciles ALL changes in one go!
  // Component re-renders ONCE with all new values.
}
`}</code>
                    </pre>
                </div>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>
                        Use <code>useState</code> to add state to function components
                    </li>
                    <li>State changes trigger component re-renders</li>
                    <li>You can have multiple state variables in one component</li>
                    <li>State is local and private to the component</li>
                    <li>Props are read-only, state is mutable</li>
                    <li>Always use the setter function to update state, never mutate directly</li>
                </ul>
            </section>
            </div>
            )}
        </div>
    )
}
