import { useState, useRef, useEffect } from 'react'

export default function KeyboardNavigation() {
  return (
    <div>
      <h1>Keyboard Navigation</h1>
      <p>
        Ensure your React applications are fully navigable using only a keyboard. Essential for
        accessibility and power users!
      </p>

      {/* Section 1: Why Keyboard Navigation */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Why Keyboard Navigation Matters</h2>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Who Benefits:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Users with motor disabilities
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Screen reader users
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>Power users</li>
            <li style={{ color: 'white' }}>Everyone (keyboard shortcuts are faster!)</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Tab Index */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Tab Index</h2>
        <p>Control which elements can receive keyboard focus.</p>

        <pre>
          <code>{`// tabIndex={0} - Natural tab order
<div tabIndex={0}>Focusable div</div>

// tabIndex={-1} - Programmatically focusable only
<div tabIndex={-1} ref={ref}>
  Can be focused with ref.current.focus()
</div>

// tabIndex={1+} - Custom tab order (avoid!)
// Don't use positive tabIndex, it breaks natural order`}</code>
        </pre>
      </section>

      {/* Section 3: Keyboard Events */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Handling Keyboard Events</h2>

        <pre>
          <code>{`function CustomButton({ onClick, children }) {
  const handleKeyDown = (e) => {
    // Enter or Space activates button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
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
          <CustomButton />
        </div>
      </section>

      {/* Section 4: Focus Management */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Focus Management</h2>
        <p>Manage focus for modals, dropdowns, and dynamic content.</p>

        <pre>
          <code>{`function Modal({ onClose }) {
  const closeButtonRef = useRef(null);
  
  useEffect(() => {
    // Focus close button when modal opens
    closeButtonRef.current?.focus();
    
    // Trap focus inside modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <div role="dialog">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}`}</code>
        </pre>
      </section>

      {/* Section 5: Common Keyboard Patterns */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Keyboard Patterns</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Standard Keys:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Tab:</strong> Move focus forward
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Shift+Tab:</strong> Move focus backward
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Enter/Space:</strong> Activate buttons
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Escape:</strong> Close modals/menus
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Arrow keys:</strong> Navigate lists/menus
            </li>
            <li style={{ color: 'white' }}>
              <strong>Home/End:</strong> Jump to start/end
            </li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>All interactive elements must be keyboard accessible</li>
          <li>
            Use <code>tabIndex={0}</code> for custom focusable elements
          </li>
          <li>Handle Enter and Space for custom buttons</li>
          <li>Manage focus for modals and dynamic content</li>
          <li>Support Escape key to close overlays</li>
          <li>Test your app using only keyboard!</li>
        </ul>
      </section>
    </div>
  )
}

// Demo component

function CustomButton() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((c) => c + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-primary-500)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          display: 'inline-block',
          userSelect: 'none',
        }}
      >
        Custom Button (Click or press Enter/Space)
      </div>
      <p style={{ marginTop: 'var(--space-3)' }}>
        <strong>Clicked:</strong> {count} times
      </p>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Tab to focus, then press Enter or Space
      </p>
    </div>
  )
}
