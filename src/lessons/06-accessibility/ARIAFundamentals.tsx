import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './ARIAFundamentals.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

export default function App() {
    const [isOn, setIsOn] = useState(false)

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Accessible Toggle Button</h2>
            <p style={{ marginBottom: 16, color: '#666' }}>
                This toggle uses role="switch", aria-checked, and aria-label
                for full screen reader support.
            </p>

            <button
                role="switch"
                aria-checked={isOn}
                aria-label={\`Dark mode is \${isOn ? 'on' : 'off'}. Toggle dark mode.\`}
                onClick={() => setIsOn(prev => !prev)}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 20px',
                    fontSize: 16,
                    border: '2px solid #ccc',
                    borderRadius: 30,
                    background: isOn ? '#4caf50' : '#e0e0e0',
                    color: isOn ? '#fff' : '#333',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }}
            >
                <span
                    style={{
                        display: 'inline-block',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                        transform: isOn ? 'translateX(8px)' : 'translateX(-8px)',
                        transition: 'transform 0.2s',
                    }}
                    aria-hidden="true"
                />
                <span>{isOn ? 'ON' : 'OFF'}</span>
            </button>

            <div
                aria-live="polite"
                style={{
                    marginTop: 16,
                    padding: 12,
                    background: isOn ? '#e8f5e9' : '#fafafa',
                    borderRadius: 8,
                    border: '1px solid #ddd',
                }}
            >
                Dark mode is currently <strong>{isOn ? 'enabled' : 'disabled'}</strong>.
            </div>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 350,
}

export default function ARIAFundamentals() {
    return (
        <LessonLayout title="ARIA Fundamentals" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                ARIA (Accessible Rich Internet Applications) attributes help make web applications
                accessible to people using assistive technologies. Learn the essentials!
            </p>

            {/* Section 1: What is ARIA */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What is ARIA?</h2>
                <p>
                    ARIA provides semantic meaning to elements that assistive technologies can understand.
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>ARIA Attributes:</h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Roles:</strong> Define element purpose (button, dialog, navigation)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Properties:</strong> Describe characteristics (aria-label, aria-required)
                        </li>
                        <li style={{ color: 'white' }}>
                            <strong>States:</strong> Indicate current state (aria-expanded, aria-checked)
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 2: Common ARIA Attributes */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Common ARIA Attributes</h2>

                <pre>
                    <code>{`// aria-label: Provides accessible name
<button aria-label="Close dialog">×</button>

// aria-labelledby: References another element for label
<h2 id="dialog-title">Confirm Action</h2>
<div role="dialog" aria-labelledby="dialog-title">...</div>

// aria-describedby: Additional description
<input
  aria-describedby="password-hint"
  type="password"
/>
<span id="password-hint">Must be 8+ characters</span>

// aria-hidden: Hide from screen readers
<span aria-hidden="true">decorative icon</span>

// aria-live: Announce dynamic content
<div aria-live="polite">Loading...</div>`}</code>
                </pre>
            </section>

            {/* Section 3: ARIA Roles */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>ARIA Roles</h2>

                <pre>
                    <code>{`// Landmark roles
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>

// Widget roles
<div role="button" tabIndex={0}>Click me</div>
<div role="dialog">...</div>
<div role="alert">Error occurred!</div>

// Document structure roles
<div role="article">...</div>
<div role="list">
  <div role="listitem">Item 1</div>
</div>`}</code>
                </pre>
            </section>

            {/* Section 4: ARIA States */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>ARIA States and Properties</h2>

                <pre>
                    <code>{`// Expanded/collapsed state
<button
  aria-expanded={isOpen}
  aria-controls="menu"
>
  Menu
</button>

// Checked state
<div role="checkbox" aria-checked={isChecked}>
  Accept terms
</div>

// Disabled state
<button aria-disabled="true">Submit</button>

// Required field
<input aria-required="true" />

// Invalid input
<input aria-invalid={hasError} />`}</code>
                </pre>
            </section>

            {/* Section 5: Best Practices */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>ARIA Best Practices</h2>

                <div
                    style={{
                        background: 'var(--color-success)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Do's:</h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Use semantic HTML first (button, nav, main)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Add ARIA only when HTML isn't enough
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Test with screen readers
                        </li>
                        <li style={{ color: 'white' }}>Keep ARIA attributes updated</li>
                    </ul>
                </div>

                <div
                    style={{
                        background: 'var(--color-error)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Don'ts:</h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Don't use ARIA when HTML works
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Don't override semantic HTML
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Don't use role="button" on actual buttons
                        </li>
                        <li style={{ color: 'white' }}>Don't forget to update dynamic states</li>
                    </ul>
                </div>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>ARIA makes web apps accessible to assistive technologies</li>
                    <li>Use semantic HTML first, ARIA second</li>
                    <li>Common attributes: aria-label, aria-labelledby, aria-describedby</li>
                    <li>Roles define purpose, states indicate current condition</li>
                    <li>Always test with screen readers</li>
                    <li>Keep ARIA attributes in sync with component state</li>
                </ul>
            </section>
        </LessonLayout>
    )
}
