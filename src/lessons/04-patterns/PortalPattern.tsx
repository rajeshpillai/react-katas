import { createPortal } from 'react-dom'
import { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './PortalPattern.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState } from 'react'
import { createPortal } from 'react-dom'

function Modal({ onClose }: { onClose: () => void }) {
    return createPortal(
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
                    background: 'white',
                    padding: 24,
                    borderRadius: 8,
                    maxWidth: 400,
                    width: '90%',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ marginTop: 0 }}>Modal Dialog</h2>
                <p>This modal is rendered using <code>createPortal</code>!</p>
                <p style={{ color: '#6b7280', fontSize: 14 }}>
                    It is rendered at the document body, outside the normal component hierarchy.
                    Click the overlay or the button below to close.
                </p>
                <button
                    onClick={onClose}
                    style={{
                        padding: '8px 16px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                    }}
                >
                    Close
                </button>
            </div>
        </div>,
        document.body
    )
}

export default function App() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Portal Pattern: Modal</h2>
            <p>Click the button to open a modal rendered via <code>createPortal</code>.</p>
            <div style={{ overflow: 'hidden', border: '2px dashed #d1d5db', padding: 16, borderRadius: 8 }}>
                <p style={{ color: '#6b7280', fontSize: 14 }}>
                    This container has <code>overflow: hidden</code>, but the modal escapes it using a portal.
                </p>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '8px 24px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 14,
                    }}
                >
                    Open Modal
                </button>
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 400,
}

export default function PortalPattern() {
  const [showModal, setShowModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <LessonLayout title="Portal Pattern" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
        <p>
          Portals provide a way to render children into a DOM node that exists outside the parent
          component's DOM hierarchy. Perfect for modals, tooltips, and dropdowns!
        </p>

        {/* Section 1: What are Portals */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What are Portals?</h2>
          <p>
            Portals let you render a component's children into a different part of the DOM tree.
          </p>

          <pre>
            <code>{`import { createPortal } from 'react-dom';

      function Modal({ children }) {
      return createPortal(
          children,
          document.getElementById('modal-root')
      );
      }`}</code>
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Why Use Portals?</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Escape parent's overflow: hidden
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Escape parent's z-index stacking
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Render modals at document root
              </li>
              <li style={{ color: 'white' }}>Better accessibility for overlays</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Modal Example */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example: Modal Dialog</h2>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Modal:</h3>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--color-primary-500)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              Open Modal
            </button>

            {showModal && <Modal onClose={() => setShowModal(false)} />}

            <pre style={{ marginTop: 'var(--space-4)' }}>
              <code>{`function Modal({ onClose, children }) {
      return createPortal(
          <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {children}
              <button onClick={onClose}>Close</button>
          </div>
          </div>,
          document.body
      );
      }`}</code>
            </pre>
          </div>
        </section>

        {/* Section 3: Event Bubbling */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Event Bubbling with Portals</h2>
          <p>
            Even though portals render outside the parent DOM, events still bubble up through the
            React tree!
          </p>

          <pre>
            <code>{`function Parent() {
      const handleClick = () => {
          console.log('Clicked in portal!');
      };

      return (
          <div onClick={handleClick}>
          <Portal>
              <button>Click me</button>
              {/* Click bubbles to Parent! */}
          </Portal>
          </div>
      );
      }`}</code>
          </pre>
        </section>

        {/* Section 4: Common Use Cases */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Common Use Cases</h2>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Perfect For:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Modals/Dialogs</strong> - Overlay entire page
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Tooltips</strong> - Escape overflow constraints
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Dropdowns</strong> - Render above other content
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>Toast notifications</strong> - Fixed positioning
              </li>
              <li style={{ color: 'white' }}>
                <strong>Context menus</strong> - Absolute positioning
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Tooltip Example */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example: Tooltip</h2>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              style={{
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--color-accent-500)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
              }}
            >
              Hover for Tooltip
            </button>

            {showTooltip && (
              <Tooltip>
                This is a tooltip rendered via portal!
              </Tooltip>
            )}
          </div>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>
              Portals render children outside parent DOM hierarchy
            </li>
            <li>
              Use <code>createPortal(children, domNode)</code>
            </li>
            <li>Perfect for modals, tooltips, and overlays</li>
            <li>Events still bubble through React tree</li>
            <li>Escape parent's CSS constraints (overflow, z-index)</li>
            <li>Improves accessibility for overlay components</li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}

// Modal component using portal
function Modal({ onClose }: { onClose: () => void }) {
  return createPortal(
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
          background: 'white',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '500px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Modal Dialog</h2>
        <p>This modal is rendered using a portal!</p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          It's rendered at the document root, outside the normal component hierarchy.
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  )
}

// Tooltip component using portal
function Tooltip({ children }: { children: React.ReactNode }) {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--color-gray-800)',
        color: 'white',
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--font-size-sm)',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>,
    document.body
  )
}
