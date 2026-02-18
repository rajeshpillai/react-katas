import { useState, useEffect, useRef, useCallback, RefObject } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './BehavioralHooks.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useEffect, useRef, useCallback } from 'react'

// --- useClickOutside hook ---
function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    handler: () => void
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [ref, handler])
}

// --- Dropdown using useClickOutside ---
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const close = useCallback(() => setIsOpen(false), [])
    useClickOutside(dropdownRef, close)

    const options = ['Profile', 'Settings', 'Notifications', 'Logout']

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setIsOpen(o => !o)}
                style={{
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14,
                }}
            >
                Menu {isOpen ? '(open)' : '(closed)'}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 4,
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    minWidth: 160,
                    zIndex: 10,
                }}>
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => { alert(option + ' clicked'); setIsOpen(false) }}
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '8px 16px',
                                border: 'none',
                                background: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: 14,
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function App() {
    return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
            <h2>Behavioral Hooks: useClickOutside</h2>
            <p style={{ marginBottom: 16 }}>
                Click the button to open the dropdown, then click outside to close it.
            </p>
            <Dropdown />
            <p style={{ marginTop: 24, color: '#6b7280', fontSize: 13 }}>
                Try clicking anywhere outside the dropdown menu to see useClickOutside in action.
            </p>
        </div>
    )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 400,
}

// --- Custom Hooks ---

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler])
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mql = window.matchMedia(query)

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mql.addEventListener('change', handleChange)
    setMatches(mql.matches)

    return () => mql.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean } = {}
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { ctrl = false, shift = false, alt = false, meta = false } = modifiers

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt &&
        event.metaKey === meta
      ) {
        event.preventDefault()
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, modifiers])
}

// --- Demo Components ---

function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(dropdownRef, close)

  const options = ['Profile', 'Settings', 'Notifications', 'Logout']

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setIsOpen((o) => !o)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          {isOpen ? 'Close' : 'Open'} Menu
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 'var(--space-1)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: 160,
              zIndex: 10,
              overflow: 'hidden',
            }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setIsOpen(false)
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 'var(--space-2) var(--space-4)',
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Click the button to open, then click anywhere outside to close. The dropdown ref is passed
        to <code>useClickOutside</code> which listens for clicks outside the ref element.
      </p>
    </div>
  )
}

function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const breakpoints = [
    { label: 'Mobile (< 640px)', active: isMobile },
    { label: 'Tablet (641px - 1024px)', active: isTablet },
    { label: 'Desktop (> 1025px)', active: isDesktop },
  ]

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <h4 style={{ marginBottom: 'var(--space-3)' }}>Current Breakpoint:</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {breakpoints.map(({ label, active }) => (
          <div
            key={label}
            style={{
              padding: 'var(--space-2) var(--space-3)',
              background: active ? 'var(--color-primary-500)' : 'var(--bg-secondary)',
              color: active ? 'white' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-md)',
              fontWeight: active ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
            }}
          >
            {active ? '[Active] ' : ''}{label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <h4 style={{ marginBottom: 'var(--space-2)' }}>User Preferences:</h4>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span
            style={{
              padding: 'var(--space-1) var(--space-3)',
              background: prefersDark ? 'var(--color-gray-800)' : 'var(--color-gray-200)',
              color: prefersDark ? 'white' : 'var(--text-primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {prefersDark ? 'Dark mode' : 'Light mode'}
          </span>
          <span
            style={{
              padding: 'var(--space-1) var(--space-3)',
              background: prefersReducedMotion ? 'var(--color-warning)' : 'var(--color-gray-200)',
              color: prefersReducedMotion ? 'white' : 'var(--text-primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {prefersReducedMotion ? 'Reduced motion' : 'Motion OK'}
          </span>
        </div>
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Resize your browser window to see the breakpoint update in real time.
      </p>
    </div>
  )
}

function KeyboardShortcutDemo() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [lastShortcut, setLastShortcut] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      const next = !prev
      if (next) {
        setLastShortcut('Ctrl+K')
        setTimeout(() => inputRef.current?.focus(), 0)
      }
      return next
    })
  }, [])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setLastShortcut('Escape')
  }, [])

  useKeyboardShortcut('k', toggleSearch, { ctrl: true })
  useKeyboardShortcut('Escape', closeSearch)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
        <kbd
          style={{
            padding: 'var(--space-1) var(--space-2)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Ctrl+K
        </kbd>
        <span>Toggle search</span>

        <kbd
          style={{
            padding: 'var(--space-1) var(--space-2)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'monospace',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          Escape
        </kbd>
        <span>Close search</span>
      </div>

      {searchOpen && (
        <div
          style={{
            padding: 'var(--space-3)',
            background: 'var(--bg-primary)',
            border: '2px solid var(--color-primary-500)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-3)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: 'var(--space-2)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-base)',
            }}
          />
        </div>
      )}

      {lastShortcut && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
          Last shortcut pressed: <strong>{lastShortcut}</strong>
        </p>
      )}

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Press Ctrl+K on your keyboard to toggle the search bar. Press Escape to close it.
      </p>
    </div>
  )
}

// --- Main Lesson ---

export default function BehavioralHooks() {
  return (
    <LessonLayout title="Behavioral Hooks" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <div>
        <p>
          Behavioral hooks encapsulate complex DOM interactions and event handling into reusable
          functions. They isolate browser-level concerns from your component logic, keeping
          components clean and focused on rendering.
        </p>

        {/* Section 1: What are Behavioral Hooks? */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>What are Behavioral Hooks?</h2>
          <p>
            Behavioral hooks are custom hooks that manage complex interactions with the DOM and
            browser APIs. Instead of scattering event listeners and refs across your components,
            you encapsulate them in a hook with a clean, declarative API.
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Common Behavioral Hooks:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>useClickOutside</strong> -- Detect clicks outside a ref element
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>useMediaQuery</strong> -- Reactive CSS media query matching
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>useKeyboardShortcut</strong> -- Listen for specific key combos
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <strong>useFocusTrap</strong> -- Keep focus within a container (modals)
              </li>
              <li style={{ color: 'white' }}>
                <strong>useIntersectionObserver</strong> -- Detect when elements enter the viewport
              </li>
            </ul>
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`// The pattern: wrap DOM interactions in a hook
function useBehavior(ref, options) {
  useEffect(() => {
    // 1. Set up event listeners / observers
    const handler = (event) => { /* ... */ }
    document.addEventListener('event', handler)

    // 2. Clean up on unmount or dependency change
    return () => document.removeEventListener('event', handler)
  }, [ref, ...dependencies])
}`}</code>
          </pre>
        </section>

        {/* Section 2: useClickOutside */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example 1: useClickOutside</h2>
          <p>
            Detect clicks that happen outside a specified element. Essential for dropdowns, modals,
            tooltips, and any UI that should close when clicking away.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Dropdown</h3>
            <ClickOutsideDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Check if click target is outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    // Use 'mousedown' instead of 'click' for better UX
    // (fires before 'click', preventing race conditions)
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, handler])
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsOpen(false), [])
  useClickOutside(ref, close)

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(o => !o)}>Menu</button>
      {isOpen && <DropdownMenu />}
    </div>
  )
}`}</code>
          </pre>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Implementation Details:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Use <code>mousedown</code> instead of <code>click</code> to fire before focus changes
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                <code>ref.current.contains(event.target)</code> checks if the click was inside the element
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                The handler should be stable (use <code>useCallback</code>) to avoid re-attaching listeners
              </li>
              <li style={{ color: 'white' }}>
                Always clean up the event listener in the useEffect return
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: useMediaQuery */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example 2: useMediaQuery</h2>
          <p>
            Subscribe to CSS media query changes reactively. Useful for responsive logic that cannot
            be achieved with CSS alone, such as conditionally rendering entirely different component trees.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Breakpoint Detector</h3>
            <MediaQueryDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Use addEventListener (addListener is deprecated)
    mql.addEventListener('change', handleChange)
    // Sync in case it changed between render and effect
    setMatches(mql.matches)

    return () => mql.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

// Usage
function Layout() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  if (isMobile) {
    return <MobileLayout />
  }
  return <DesktopLayout theme={prefersDark ? 'dark' : 'light'} />
}`}</code>
          </pre>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h4 style={{ marginBottom: 'var(--space-2)' }}>When to Use useMediaQuery vs CSS:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Use CSS media queries for:</p>
                <ul>
                  <li>Showing/hiding elements</li>
                  <li>Changing layout and spacing</li>
                  <li>Adjusting font sizes</li>
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>Use useMediaQuery for:</p>
                <ul>
                  <li>Rendering different component trees</li>
                  <li>Changing behavior (not just styles)</li>
                  <li>Loading different data based on screen size</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: useKeyboardShortcut */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Example 3: useKeyboardShortcut</h2>
          <p>
            Listen for specific keyboard combinations. Useful for command palettes, navigation
            shortcuts, and accessibility enhancements.
          </p>

          <div
            style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3>Interactive Demo: Press Ctrl+K to Toggle Search</h3>
            <KeyboardShortcutDemo />
          </div>

          <pre style={{ background: 'transparent', marginTop: 'var(--space-4)' }}>
            <code>{`function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: {
    ctrl?: boolean
    shift?: boolean
    alt?: boolean
    meta?: boolean
  } = {}
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { ctrl = false, shift = false, alt = false, meta = false } = modifiers

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt &&
        event.metaKey === meta
      ) {
        event.preventDefault()
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, modifiers])
}

// Usage
function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  const toggle = useCallback(() => setSearchOpen(p => !p), [])
  const close = useCallback(() => setSearchOpen(false), [])

  useKeyboardShortcut('k', toggle, { ctrl: true })
  useKeyboardShortcut('Escape', close)

  return searchOpen ? <SearchPanel /> : null
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Implementation Notes:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Always call <code>event.preventDefault()</code> to prevent browser defaults (e.g., Ctrl+K opens browser search)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Compare modifier keys explicitly (ctrlKey, shiftKey, altKey, metaKey)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Use <code>.toLowerCase()</code> for case-insensitive key matching
              </li>
              <li style={{ color: 'white' }}>
                Ensure callback is stable with <code>useCallback</code> to avoid re-registering listeners
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Composing Behavioral Hooks */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Composing Behavioral Hooks</h2>
          <p>
            The real power of behavioral hooks is that they compose naturally. A single component
            can use multiple behavioral hooks without any conflicts.
          </p>

          <pre style={{ background: 'transparent' }}>
            <code>{`function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Compose multiple behavioral hooks
  useKeyboardShortcut('k', () => setIsOpen(true), { ctrl: true })
  useKeyboardShortcut('Escape', () => setIsOpen(false))
  useClickOutside(panelRef, () => setIsOpen(false))

  const isMobile = useMediaQuery('(max-width: 640px)')

  if (!isOpen) return null

  return (
    <div ref={panelRef} className={isMobile ? 'fullscreen' : 'centered'}>
      <SearchInput />
      <ResultsList />
    </div>
  )
}

// Each hook manages its own concern:
// - useKeyboardShortcut: opening/closing via keyboard
// - useClickOutside: closing when clicking outside
// - useMediaQuery: adapting layout to screen size`}</code>
          </pre>
        </section>

        {/* Section 6: Best Practices */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2>Best Practices</h2>

          <div
            style={{
              background: 'var(--color-success)',
              color: 'white',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'var(--space-4)',
            }}
          >
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Do:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Always clean up event listeners and observers in the useEffect return
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Accept refs as parameters rather than creating them internally (more flexible)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Stabilize callbacks with <code>useCallback</code> before passing to hooks
              </li>
              <li style={{ color: 'white' }}>
                Handle SSR by checking <code>typeof window !== 'undefined'</code>
              </li>
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
            <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Avoid:</h3>
            <ul style={{ paddingLeft: 'var(--space-6)' }}>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Creating unstable callbacks that cause constant re-subscriptions
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Forgetting to clean up listeners (memory leaks)
              </li>
              <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                Using behavioral hooks for things CSS can handle (e.g., hover states)
              </li>
              <li style={{ color: 'white' }}>
                Making hooks that do too many things -- keep each hook focused on one behavior
              </li>
            </ul>
          </div>
        </section>

        {/* Key Takeaways */}
        <section>
          <h2>Key Takeaways</h2>
          <ul>
            <li>
              Behavioral hooks encapsulate complex DOM/event interactions into reusable, composable functions
            </li>
            <li>
              <strong>useClickOutside</strong>: uses <code>useEffect</code> + event listener + <code>ref.current.contains()</code>
            </li>
            <li>
              <strong>useMediaQuery</strong>: uses <code>useState</code> + <code>window.matchMedia</code> + change listener
            </li>
            <li>
              <strong>useKeyboardShortcut</strong>: uses <code>useEffect</code> + keydown listener + modifier checks
            </li>
            <li>
              They compose naturally -- a single component can use multiple behavioral hooks without conflicts
            </li>
            <li>
              Always clean up listeners, stabilize callbacks, and handle SSR gracefully
            </li>
          </ul>
        </section>
      </div>
    </LessonLayout>
  )
}
