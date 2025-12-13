import { useState, FormEvent, ChangeEvent, MouseEvent, KeyboardEvent } from 'react'

export default function EventHandling() {
    const [clickCount, setClickCount] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null)
    const [keyPressed, setKeyPressed] = useState('')

    // Click event handler
    const handleClick = () => {
        setClickCount(clickCount + 1)
    }

    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Form input change handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Form submit handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent page reload
        setSubmittedData(formData)
        setFormData({ name: '', email: '' }) // Reset form
    }

    // Keyboard event handler
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setKeyPressed(e.key)
    }

    return (
        <div>
            <h1>Event Handling</h1>
            <p>
                React uses <strong>synthetic events</strong> - a cross-browser wrapper around the browser's
                native event system. This ensures events work consistently across all browsers.
            </p>

            {/* Section 1: Click Events */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Click Events</h2>
                <p>
                    The most common event in React. Use <code>onClick</code> to handle clicks on buttons,
                    divs, and other elements.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Interactive Example:</h3>
                    <div
                        style={{
                            fontSize: 'var(--font-size-2xl)',
                            marginBottom: 'var(--space-4)',
                            color: 'var(--color-primary-600)',
                        }}
                    >
                        Clicks: <strong>{clickCount}</strong>
                    </div>
                    <button
                        onClick={handleClick}
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
                        Click Me!
                    </button>

                    <pre style={{ marginTop: 'var(--space-4)' }}>
                        <code>{`// Event handler function
const handleClick = () => {
  setClickCount(clickCount + 1);
};

// Attach to button
<button onClick={handleClick}>
  Click Me!
</button>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 2: Mouse Events */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Mouse Events</h2>
                <p>
                    React supports various mouse events: <code>onMouseMove</code>, <code>onMouseEnter</code>,{' '}
                    <code>onMouseLeave</code>, etc.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Track Mouse Position:</h3>
                    <div
                        onMouseMove={handleMouseMove}
                        style={{
                            background: 'var(--color-primary-100)',
                            padding: 'var(--space-8)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center',
                            cursor: 'crosshair',
                            marginBottom: 'var(--space-4)',
                        }}
                    >
                        <p style={{ color: 'var(--color-primary-700)', fontWeight: 'bold' }}>
                            Move your mouse here!
                        </p>
                        <p style={{ color: 'var(--color-primary-600)' }}>
                            X: {mousePosition.x}, Y: {mousePosition.y}
                        </p>
                    </div>

                    <pre>
                        <code>{`const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

<div onMouseMove={handleMouseMove}>
  Move your mouse here!
</div>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 3: Form Events */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Form Events</h2>
                <p>
                    Forms are central to web apps. Handle <code>onChange</code> for inputs and{' '}
                    <code>onSubmit</code> for forms.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Form Example:</h3>
                    <form onSubmit={handleSubmit} style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{ marginBottom: 'var(--space-3)' }}>
                            <label
                                htmlFor="name"
                                style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: 'var(--space-3)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-base)',
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <label
                                htmlFor="email"
                                style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: 'var(--space-3)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-base)',
                                }}
                            />
                        </div>

                        <button
                            type="submit"
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
                            Submit
                        </button>
                    </form>

                    {submittedData && (
                        <div
                            style={{
                                background: 'var(--color-success)',
                                color: 'white',
                                padding: 'var(--space-4)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--space-4)',
                            }}
                        >
                            <p>
                                <strong>Form Submitted!</strong>
                            </p>
                            <p>Name: {submittedData.name}</p>
                            <p>Email: {submittedData.email}</p>
                        </div>
                    )}

                    <pre>
                        <code>{`// Handle input changes
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Handle form submission
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevent page reload!
  console.log(formData);
};

<form onSubmit={handleSubmit}>
  <input
    name="name"
    value={formData.name}
    onChange={handleInputChange}
  />
</form>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 4: Keyboard Events */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Keyboard Events</h2>
                <p>
                    Handle keyboard input with <code>onKeyDown</code>, <code>onKeyUp</code>, and{' '}
                    <code>onKeyPress</code>.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Keyboard Detection:</h3>
                    <input
                        type="text"
                        placeholder="Type something..."
                        onKeyDown={handleKeyPress}
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
                            background: 'var(--bg-tertiary)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-md)',
                        }}
                    >
                        {keyPressed ? (
                            <p>
                                Last key pressed: <strong style={{ color: 'var(--color-accent-600)' }}>{keyPressed}</strong>
                            </p>
                        ) : (
                            <p style={{ color: 'var(--text-tertiary)' }}>Press any key...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 5: Event Object */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>The Event Object</h2>
                <p>
                    Event handlers receive a <strong>synthetic event object</strong> with useful properties:
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                        Common Event Properties
                    </h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <code>e.target</code> - The element that triggered the event
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <code>e.currentTarget</code> - The element the handler is attached to
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <code>e.preventDefault()</code> - Prevent default behavior (e.g., form submission)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <code>e.stopPropagation()</code> - Stop event from bubbling up
                        </li>
                        <li style={{ color: 'white' }}>
                            <code>e.key</code>, <code>e.clientX</code>, <code>e.clientY</code> - Event-specific
                            data
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 6: Event Handler Patterns */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Event Handler Patterns</h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--space-4)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <div>
                        <h4>❌ Don't Call Immediately:</h4>
                        <pre>
                            <code>{`// This calls the function immediately!
<button onClick={handleClick()}>
  Wrong
</button>`}</code>
                        </pre>
                    </div>

                    <div>
                        <h4>✅ Pass Function Reference:</h4>
                        <pre>
                            <code>{`// This passes the function to be called later
<button onClick={handleClick}>
  Correct
</button>`}</code>
                        </pre>
                    </div>

                    <div>
                        <h4>✅ Inline Arrow Function:</h4>
                        <pre>
                            <code>{`// Use when you need to pass arguments
<button onClick={() => handleClick(id)}>
  With Args
</button>`}</code>
                        </pre>
                    </div>

                    <div>
                        <h4>✅ With Event Object:</h4>
                        <pre>
                            <code>{`// Access event object
<button onClick={(e) => {
  console.log(e.target);
}}>
  With Event
</button>`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>React uses synthetic events for cross-browser compatibility</li>
                    <li>
                        Common events: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>,{' '}
                        <code>onMouseMove</code>
                    </li>
                    <li>
                        Always use <code>e.preventDefault()</code> in form submit handlers to prevent page
                        reload
                    </li>
                    <li>Pass function references, not function calls, to event handlers</li>
                    <li>Use arrow functions when you need to pass arguments to handlers</li>
                    <li>Event handlers receive a synthetic event object with useful properties</li>
                </ul>
            </section>
        </div>
    )
}
