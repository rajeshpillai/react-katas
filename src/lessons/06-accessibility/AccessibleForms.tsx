import { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './AccessibleForms.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

interface FieldError {
    name?: string
    email?: string
    password?: string
}

export default function App() {
    const [values, setValues] = useState({ name: '', email: '', password: '' })
    const [errors, setErrors] = useState<FieldError>({})
    const [submitted, setSubmitted] = useState(false)

    const validate = (): FieldError => {
        const errs: FieldError = {}
        if (!values.name.trim()) errs.name = 'Name is required'
        if (!values.email.trim()) {
            errs.email = 'Email is required'
        } else if (!values.email.includes('@')) {
            errs.email = 'Please enter a valid email address'
        }
        if (!values.password) {
            errs.password = 'Password is required'
        } else if (values.password.length < 8) {
            errs.password = 'Password must be at least 8 characters'
        }
        return errs
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 3000)
        }
    }

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }))
        setErrors(prev => ({ ...prev, [field]: undefined }))
    }

    const fieldStyle = (hasError: boolean) => ({
        width: '100%',
        padding: '8px 12px',
        border: \`2px solid \${hasError ? '#d32f2f' : '#ccc'}\`,
        borderRadius: 6,
        fontSize: 14,
        boxSizing: 'border-box' as const,
    })

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif', maxWidth: 400 }}>
            <h2>Accessible Form</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                        Name <span aria-label="required" style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange('name')}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        style={fieldStyle(!!errors.name)}
                    />
                    {errors.name && (
                        <div id="name-error" role="alert" style={{ color: '#d32f2f', fontSize: 13, marginTop: 4 }}>
                            {errors.name}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                        Email <span aria-label="required" style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        style={fieldStyle(!!errors.email)}
                    />
                    {errors.email && (
                        <div id="email-error" role="alert" style={{ color: '#d32f2f', fontSize: 13, marginTop: 4 }}>
                            {errors.email}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: 4, fontWeight: 'bold' }}>
                        Password <span aria-label="required" style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange('password')}
                        aria-required="true"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                        style={fieldStyle(!!errors.password)}
                    />
                    <div id="password-hint" style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                        Must be at least 8 characters
                    </div>
                    {errors.password && (
                        <div id="password-error" role="alert" style={{ color: '#d32f2f', fontSize: 13, marginTop: 4 }}>
                            {errors.password}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 24px',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 15,
                        cursor: 'pointer',
                    }}
                >
                    Submit
                </button>

                {submitted && (
                    <div
                        role="status"
                        aria-live="polite"
                        style={{
                            marginTop: 16,
                            padding: 12,
                            background: '#e8f5e9',
                            borderRadius: 8,
                            color: '#2e7d32',
                            border: '1px solid #c8e6c9',
                        }}
                    >
                        Form submitted successfully!
                    </div>
                )}
            </form>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 500,
}

export default function AccessibleForms() {
    return (
        <LessonLayout title="Accessible Forms" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                Create forms that everyone can use. Learn proper labeling, error handling, and validation
                for accessible form experiences.
            </p>

            {/* Section 1: Labels */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Proper Labeling</h2>
                <p>Every form input must have an associated label.</p>

                <pre>
                    <code>{`// Explicit label with htmlFor
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// Implicit label (wrapping)
<label>
  Email:
  <input type="email" />
</label>

// Missing label (BAD)
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Do's:</h3>
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
        </LessonLayout>
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
