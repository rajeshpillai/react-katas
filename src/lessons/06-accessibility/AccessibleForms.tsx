import { useState } from 'react'

export default function AccessibleForms() {
  return (
    <div>
      <h1>Accessible Forms</h1>
      <p>
        Create forms that everyone can use. Learn proper labeling, error handling, and validation
        for accessible form experiences.
      </p>

      {/* Section 1: Labels */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Proper Labeling</h2>
        <p>Every form input must have an associated label.</p>

        <pre>
          <code>{`// ✅ Explicit label with htmlFor
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// ✅ Implicit label (wrapping)
<label>
  Email:
  <input type="email" />
</label>

// ❌ Missing label
<input type="email" placeholder="Email" />
// Placeholder is NOT a label!`}</code>
        </pre>
      </section>

      {/* Section 2: Required Fields */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Required Fields</h2>
        <p>Indicate required fields clearly.</p>

        <pre>
          <code>{`<label htmlFor="name">
  Name <span aria-label="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>`}</code>
        </pre>
      </section>

      {/* Section 3: Error Messages */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Error Messages</h2>
        <p>Associate error messages with inputs using aria-describedby.</p>

        <pre>
          <code>{`function EmailInput() {
  const [error, setError] = useState('');
  
  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <div id="email-error" role="alert">
          {error}
        </div>
      )}
    </>
  );
}`}</code>
        </pre>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Try it:</h3>
          <AccessibleFormDemo />
        </div>
      </section>

      {/* Section 4: Field Groups */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Grouping Related Fields</h2>
        <p>
          Use <code>fieldset</code> and <code>legend</code> for related fields.
        </p>

        <pre>
          <code>{`<fieldset>
  <legend>Shipping Address</legend>
  <label htmlFor="street">Street:</label>
  <input id="street" type="text" />
  
  <label htmlFor="city">City:</label>
  <input id="city" type="text" />
</fieldset>`}</code>
        </pre>
      </section>

      {/* Section 5: Best Practices */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Form Accessibility Best Practices</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Do's:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Always use labels with inputs
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Mark required fields clearly
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Associate errors with inputs
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use appropriate input types
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Provide helpful error messages
            </li>
            <li style={{ color: 'white' }}>Test with keyboard and screen reader</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Every input needs a proper label</li>
          <li>
            Use <code>required</code> and <code>aria-required</code>
          </li>
          <li>
            Associate errors with <code>aria-describedby</code>
          </li>
          <li>
            Mark invalid inputs with <code>aria-invalid</code>
          </li>
          <li>
            Group related fields with <code>fieldset</code>
          </li>
          <li>Provide clear, helpful error messages</li>
        </ul>
      </section>
    </div>
  )
}

// Demo component

function AccessibleFormDemo() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <label htmlFor="demo-email" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}>
          Email: <span aria-label="required" style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          id="demo-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          aria-invalid={!!error}
          aria-describedby={error ? 'demo-email-error' : undefined}
          aria-required="true"
          style={{
            width: '100%',
            padding: 'var(--space-3)',
            border: `1px solid ${error ? 'var(--color-error)' : 'var(--border-color)'}`,
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-base)',
          }}
        />
        {error && (
          <div
            id="demo-email-error"
            role="alert"
            style={{
              marginTop: 'var(--space-2)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {success && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-3)',
            background: 'var(--color-success)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Form submitted successfully!
        </div>
      )}
    </form>
  )
}
