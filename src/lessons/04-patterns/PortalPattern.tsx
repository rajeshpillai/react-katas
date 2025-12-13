import { createPortal } from 'react-dom'
import { useState } from 'react'

export default function PortalPattern() {
  const [showModal, setShowModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div>
      <h1>Portal Pattern</h1>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Why Use Portals?</h3>
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
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Perfect For:</h3>
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
