import { useState } from 'react'

export default function JSXBasics() {
    const [showTransformed, setShowTransformed] = useState(false)

    // Example variables for JSX expressions
    const name = 'React Developer'
    const currentYear = new Date().getFullYear()
    const isLearning = true

    return (
        <div>
            <h1>JSX Basics</h1>
            <p>
                JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like
                markup inside JavaScript files. It's the foundation of React development.
            </p>

            {/* Section 1: What is JSX? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What is JSX?</h2>
                <p>
                    JSX looks like HTML, but it's actually JavaScript. Under the hood, React transforms JSX
                    into regular JavaScript function calls.
                </p>

                <div
                    style={{
                        background: 'var(--bg-tertiary)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <button
                        onClick={() => setShowTransformed(!showTransformed)}
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
                        {showTransformed ? 'Show JSX' : 'Show Transformed JavaScript'}
                    </button>

                    {!showTransformed ? (
                        <pre>
                            <code>{`// JSX syntax
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);`}</code>
                        </pre>
                    ) : (
                        <pre>
                            <code>{`// What React actually creates
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);`}</code>
                        </pre>
                    )}
                </div>
            </section>

            {/* Section 2: JSX Expressions */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Embedding Expressions in JSX</h2>
                <p>
                    You can embed any JavaScript expression in JSX by wrapping it in curly braces{' '}
                    <code>{'{}'}</code>.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Live Examples:</h3>
                    <ul>
                        <li>
                            Variable: <strong>{name}</strong>
                        </li>
                        <li>
                            Expression: <strong>{2 + 2}</strong>
                        </li>
                        <li>
                            Function call: <strong>{currentYear}</strong>
                        </li>
                        <li>
                            Conditional: <strong>{isLearning ? 'Currently learning!' : 'Not learning'}</strong>
                        </li>
                    </ul>

                    <pre style={{ marginTop: 'var(--space-4)' }}>
                        <code>{`const name = 'React Developer';
const currentYear = new Date().getFullYear();
const isLearning = true;

// Using expressions in JSX
<ul>
  <li>Variable: <strong>{name}</strong></li>
  <li>Expression: <strong>{2 + 2}</strong></li>
  <li>Function call: <strong>{currentYear}</strong></li>
  <li>Conditional: <strong>{isLearning ? 'Learning!' : 'Not learning'}</strong></li>
</ul>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 3: JSX Rules */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Important JSX Rules</h2>

                <div
                    style={{
                        background: 'var(--color-info)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Key Rules</h3>
                    <ol style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Return a single root element</strong> - Wrap multiple elements in a parent
                            tag or Fragment
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Close all tags</strong> - Even self-closing tags like <code>&lt;img /&gt;</code>
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Use camelCase</strong> - HTML attributes become camelCase (
                            <code>className</code>, <code>onClick</code>)
                        </li>
                        <li style={{ color: 'white' }}>
                            <strong>Reserved words</strong> - Use <code>className</code> instead of{' '}
                            <code>class</code>, <code>htmlFor</code> instead of <code>for</code>
                        </li>
                    </ol>
                </div>

                <InteractiveExample />
            </section>

            {/* Section 4: Fragments */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>React Fragments</h2>
                <p>
                    When you need to return multiple elements without adding extra nodes to the DOM, use
                    Fragments:
                </p>

                <pre>
                    <code>{`// Long syntax
<React.Fragment>
  <h1>Title</h1>
  <p>Paragraph</p>
</React.Fragment>

// Short syntax (more common)
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>`}</code>
                </pre>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>JSX is a syntax extension that makes React code more readable and intuitive</li>
                    <li>JSX gets transformed into JavaScript function calls by React</li>
                    <li>Use curly braces to embed JavaScript expressions in JSX</li>
                    <li>Follow JSX rules: single root, close all tags, use camelCase</li>
                    <li>Fragments let you group elements without adding DOM nodes</li>
                </ul>
            </section>
        </div>
    )
}

// Interactive example component demonstrating JSX rules
function InteractiveExample() {
    const [inputValue, setInputValue] = useState('')

    return (
        <div
            style={{
                background: 'var(--bg-tertiary)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
            }}
        >
            <h3>Try It Yourself!</h3>
            <p>Type something and see it rendered in real-time:</p>

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
                style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-base)',
                    marginTop: 'var(--space-2)',
                }}
            />

            <div
                style={{
                    marginTop: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                }}
            >
                <strong>You typed:</strong> {inputValue || <em>(nothing yet)</em>}
            </div>

            <pre style={{ marginTop: 'var(--space-4)' }}>
                <code>{`// This is JSX!
<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Type here..."
/>

<div>
  <strong>You typed:</strong> {inputValue || <em>(nothing yet)</em>}
</div>`}</code>
            </pre>
        </div>
    )
}
