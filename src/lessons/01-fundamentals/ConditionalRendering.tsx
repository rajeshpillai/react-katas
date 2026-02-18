import { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
import sourceCode from './ConditionalRendering.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

function StatusMessage({ status }: { status: Status }) {
    switch (status) {
        case 'loading':
            return <p style={{ color: '#2563eb' }}>Loading...</p>
        case 'success':
            return <p style={{ color: '#16a34a' }}>Data loaded successfully!</p>
        case 'error':
            return <p style={{ color: '#dc2626' }}>Something went wrong.</p>
        default:
            return <p style={{ color: '#666' }}>Click "Fetch" to load data.</p>
    }
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [items, setItems] = useState<string[]>([])
    const [status, setStatus] = useState<Status>('idle')

    const addItem = () => {
        setItems(prev => [...prev, \`Item \${prev.length + 1}\`])
    }

    const fetchData = () => {
        setStatus('loading')
        setTimeout(() => {
            setStatus(Math.random() > 0.3 ? 'success' : 'error')
        }, 1500)
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Conditional Rendering</h2>

            {/* Ternary */}
            <section style={{ marginBottom: 20 }}>
                <h3>Ternary Operator</h3>
                <button
                    onClick={() => setIsLoggedIn(v => !v)}
                    style={{ padding: '8px 16px', marginBottom: 8 }}
                >
                    {isLoggedIn ? 'Log out' : 'Log in'}
                </button>
                {isLoggedIn ? (
                    <p style={{ color: '#16a34a' }}>Welcome back! You are logged in.</p>
                ) : (
                    <p style={{ color: '#666' }}>Please log in to continue.</p>
                )}
            </section>

            {/* Logical AND */}
            <section style={{ marginBottom: 20 }}>
                <h3>Logical AND (&&)</h3>
                <button onClick={addItem} style={{ padding: '8px 16px', marginBottom: 8 }}>
                    Add Item
                </button>
                {items.length > 0 && (
                    <ul>
                        {items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                )}
                {items.length === 0 && (
                    <p style={{ color: '#999' }}>No items yet. Click the button above.</p>
                )}
            </section>

            {/* Switch pattern */}
            <section>
                <h3>Switch / Multiple States</h3>
                <button
                    onClick={fetchData}
                    disabled={status === 'loading'}
                    style={{ padding: '8px 16px', marginBottom: 8 }}
                >
                    {status === 'loading' ? 'Fetching...' : 'Fetch Data'}
                </button>
                <StatusMessage status={status} />
            </section>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 400,
}

export default function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'admin'>('guest')
  const [notifications, setNotifications] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Simulate adding a notification
  const addNotification = () => {
    setNotifications([...notifications, `Notification ${notifications.length + 1}`])
  }

  // Simulate loading
  const simulateLoading = () => {
    setLoadingState('loading')
    setTimeout(() => {
      setLoadingState(Math.random() > 0.3 ? 'success' : 'error')
    }, 2000)
  }

  return (
    <LessonLayout title="Conditional Rendering" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
      <p>
        In React, you can render different UI based on conditions. There are several patterns for
        conditional rendering, each with its own use case.
      </p>

      {/* Section 1: If-Else with Variables */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 1: If-Else with Variables</h2>
        <p>Use regular JavaScript if-else statements before the return to decide what to render.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Login Status:</h3>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: isLoggedIn ? 'var(--color-error)' : 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>

          <LoginStatus isLoggedIn={isLoggedIn} />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function LoginStatus({ isLoggedIn }: { isLoggedIn: boolean }) {
  // Use if-else before return
  if (isLoggedIn) {
    return <h3>Welcome back!</h3>;
  } else {
    return <h3>Please log in to continue</h3>;
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 2: Ternary Operator */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 2: Ternary Operator (? :)</h2>
        <p>
          The most common pattern for inline conditional rendering. Use when you have two
          alternatives.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>User Role:</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <button
              onClick={() => setUserRole('guest')}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: userRole === 'guest' ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                color: userRole === 'guest' ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              Guest
            </button>
            <button
              onClick={() => setUserRole('user')}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: userRole === 'user' ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                color: userRole === 'user' ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              User
            </button>
            <button
              onClick={() => setUserRole('admin')}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: userRole === 'admin' ? 'var(--color-primary-500)' : 'var(--bg-tertiary)',
                color: userRole === 'admin' ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              Admin
            </button>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {userRole === 'admin' ? (
              <p style={{ color: 'var(--color-accent-600)', fontWeight: 'bold' }}>
                Admin Dashboard Access
              </p>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Limited Access</p>
            )}
          </div>

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// Ternary operator: condition ? true : false
{userRole === 'admin' ? (
  <p>Admin Dashboard Access</p>
) : (
  <p>Limited Access</p>
)}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Logical AND (&&) */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 3: Logical AND (&&)</h2>
        <p>
          Use <code>&&</code> when you only want to render something if a condition is true (no
          else case).
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Notifications:</h3>
          <button
            onClick={addNotification}
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
            Add Notification
          </button>

          {notifications.length > 0 && (
            <div
              style={{
                background: 'var(--color-warning)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                You have {notifications.length} notification(s)!
              </p>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                {notifications.map((notif, index) => (
                  <li key={index} style={{ color: 'white' }}>
                    {notif}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notifications.length === 0 && (
            <p style={{ color: 'var(--text-tertiary)' }}>No notifications</p>
          )}

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`// Only renders if condition is true
{notifications.length > 0 && (
  <div>
    You have {notifications.length} notifications!
  </div>
)}

// Common pattern for empty states
{notifications.length === 0 && (
  <p>No notifications</p>
)}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Switch/Case Pattern */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 4: Switch/Case for Multiple Conditions</h2>
        <p>When you have multiple conditions, use a switch statement or object mapping.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Loading States:</h3>
          <button
            onClick={simulateLoading}
            disabled={loadingState === 'loading'}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background:
                loadingState === 'loading' ? 'var(--color-gray-400)' : 'var(--color-primary-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: loadingState === 'loading' ? 'not-allowed' : 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {loadingState === 'loading' ? 'Loading...' : 'Fetch Data'}
          </button>

          <LoadingStateDisplay state={loadingState} />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function LoadingStateDisplay({ state }) {
  switch (state) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <SuccessMessage />;
    case 'error':
      return <ErrorMessage />;
    default:
      return <IdleState />;
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Null/Undefined for No Render */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 5: Return null to Render Nothing</h2>
        <p>
          Components can return <code>null</code> to render nothing. This is useful for conditional
          components.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Modal Example:</h3>
          <button
            onClick={() => setShowModal(!showModal)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-accent-500)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {showModal ? 'Hide' : 'Show'} Modal
          </button>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)} />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function Modal({ isOpen, onClose }) {
  // Return null if not open - renders nothing
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Best Practices</h2>

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
            Do's and Don'ts
          </h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use <code>&&</code> for simple show/hide
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use ternary for two alternatives
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use switch/case for multiple conditions
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Avoid deeply nested ternaries (hard to read)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't use <code>&&</code> with numbers (0 will render!)
            </li>
            <li style={{ color: 'white' }}>
              Extract complex conditions into separate components
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            Use <code>if-else</code> statements before return for complex logic
          </li>
          <li>
            Use ternary operator <code>? :</code> for inline two-way conditions
          </li>
          <li>
            Use logical AND <code>&&</code> for simple show/hide (one condition)
          </li>
          <li>
            Use <code>switch</code> statements or object mapping for multiple conditions
          </li>
          <li>
            Return <code>null</code> to render nothing
          </li>
          <li>Keep conditional rendering simple and readable</li>
          <li>Extract complex conditions into separate components</li>
        </ul>
      </section>
      </div>
    </LessonLayout>
  )
}

// Helper components used in examples

function LoginStatus({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return (
      <div
        style={{
          padding: 'var(--space-4)',
          background: 'var(--color-success)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <h3 style={{ color: 'white' }}>Welcome back!</h3>
        <p style={{ color: 'white' }}>You are logged in</p>
      </div>
    )
  } else {
    return (
      <div
        style={{
          padding: 'var(--space-4)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <h3>Please log in to continue</h3>
      </div>
    )
  }
}

function LoadingStateDisplay({ state }: { state: 'idle' | 'loading' | 'success' | 'error' }) {
  switch (state) {
    case 'loading':
      return (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-info)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'white' }}>Loading data...</p>
        </div>
      )
    case 'success':
      return (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-success)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p style={{ color: 'white' }}>Data loaded successfully!</p>
        </div>
      )
    case 'error':
      return (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-error)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p style={{ color: 'white' }}>Error loading data. Please try again.</p>
        </div>
      )
    default:
      return (
        <div
          style={{
            padding: 'var(--space-4)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p style={{ color: 'var(--text-tertiary)' }}>Click the button to fetch data</p>
        </div>
      )
  }
}

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Return null if modal is not open
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-primary)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '500px',
          boxShadow: 'var(--shadow-xl)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Modal Dialog</h3>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          This modal demonstrates conditional rendering with <code>return null</code>. When{' '}
          <code>isOpen</code> is false, the component returns null and renders nothing.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Close Modal
        </button>
      </div>
    </div>
  )
}
