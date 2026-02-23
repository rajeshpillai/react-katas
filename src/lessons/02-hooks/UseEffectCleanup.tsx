import { useState, useEffect } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './UseEffectCleanup.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // Cleanup: clear interval on unmount
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ padding: 12, background: '#e0f2fe', borderRadius: 8, marginBottom: 8 }}>
      <strong>Timer:</strong> {seconds}s
      <p style={{ fontSize: 12, color: '#666' }}>
        Unmount me to see cleanup in the console
      </p>
    </div>
  )
}

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup: remove event listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div style={{ padding: 12, background: '#fef3c7', borderRadius: 8, marginBottom: 8 }}>
      <strong>Mouse Position:</strong> X: {position.x}, Y: {position.y}
      <p style={{ fontSize: 12, color: '#666' }}>
        Move your mouse around. Listener is cleaned up on unmount.
      </p>
    </div>
  )
}

export default function App() {
  const [showTimer, setShowTimer] = useState(false)
  const [showTracker, setShowTracker] = useState(false)

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>Timer with Start/Stop (Cleanup Demo)</h2>
      <button
        onClick={() => setShowTimer(v => !v)}
        style={{
          padding: '8px 16px',
          background: showTimer ? '#ef4444' : '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        {showTimer ? 'Unmount Timer' : 'Mount Timer'}
      </button>
      {showTimer && <Timer />}

      <hr style={{ margin: '20px 0' }} />

      <h2>Mouse Position Tracker (Event Listener Cleanup)</h2>
      <button
        onClick={() => setShowTracker(v => !v)}
        style={{
          padding: '8px 16px',
          background: showTracker ? '#ef4444' : '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        {showTracker ? 'Stop Tracking' : 'Start Tracking'}
      </button>
      {showTracker && <MouseTracker />}
    </div>
  )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 400,
}

export default function UseEffectCleanup() {
  const [showTimer, setShowTimer] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showMouseTracker, setShowMouseTracker] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  return (
    <LessonLayout title="useEffect Cleanup" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <p>
        Cleanup functions prevent <strong>memory leaks</strong> and unwanted behavior. They run
        before the effect re-executes and when the component unmounts.
      </p>

      {/* Section 1: Why Cleanup Matters */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Why Cleanup Matters</h2>
        <p>Without proper cleanup, you can have:</p>
        <ul>
          <li>
            <strong>Memory leaks:</strong> Timers and listeners that keep running
          </li>
          <li>
            <strong>Stale closures:</strong> Effects using old state values
          </li>
          <li>
            <strong>Race conditions:</strong> Multiple async operations conflicting
          </li>
          <li>
            <strong>Performance issues:</strong> Unnecessary computations
          </li>
        </ul>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>Critical Rule:</p>
          <p style={{ color: 'white' }}>
            If your effect sets up something (timer, subscription, listener), it MUST clean it up!
          </p>
        </div>
      </section>

      {/* Section 2: Timer Cleanup */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 1: Cleaning Up Timers</h2>
        <p>
          Always clear intervals and timeouts to prevent them from running after the component
          unmounts.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <button
            onClick={() => setShowTimer(!showTimer)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: showTimer ? 'var(--color-error)' : 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {showTimer ? 'Unmount Timer' : 'Mount Timer'}
          </button>

          {showTimer && <TimerComponent />}

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function TimerComponent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup: clear the interval
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up!');
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Event Listener Cleanup */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 2: Cleaning Up Event Listeners</h2>
        <p>Remove event listeners to prevent memory leaks, especially with window/document events.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <button
            onClick={() => setShowMouseTracker(!showMouseTracker)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: showMouseTracker ? 'var(--color-error)' : 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {showMouseTracker ? 'Stop Tracking' : 'Start Tracking'}
          </button>

          {showMouseTracker && <MouseTracker />}

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Define the handler
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: remove listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('Mouse listener removed!');
    };
  }, []);

  return <div>Mouse: {position.x}, {position.y}</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Subscription Cleanup */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 3: Cleaning Up Subscriptions</h2>
        <p>
          WebSocket connections, Firebase listeners, and other subscriptions must be cleaned up.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <button
            onClick={() => setShowChat(!showChat)}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: showChat ? 'var(--color-error)' : 'var(--color-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              marginBottom: 'var(--space-4)',
            }}
          >
            {showChat ? 'Disconnect' : 'Connect'} Chat
          </button>

          {showChat && <ChatComponent />}

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function ChatComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate WebSocket connection
    const ws = new WebSocket('wss://chat.example.com');

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    // Cleanup: close connection
    return () => {
      ws.close();
      console.log('WebSocket closed!');
    };
  }, []);

  return <div>Messages: {messages.length}</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Async Cleanup (Abort Controller) */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 4: Canceling Async Operations</h2>
        <p>
          Use <code>AbortController</code> to cancel fetch requests and prevent state updates on
          unmounted components.
        </p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-base)',
              marginBottom: 'var(--space-4)',
            }}
          />

          <SearchResults searchTerm={searchTerm} />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Create abort controller
    const controller = new AbortController();

    async function search() {
      try {
        const response = await fetch(
          \`/api/search?q=\${searchTerm}\`,
          { signal: controller.signal } // Pass signal
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        }
      }
    }

    if (searchTerm) search();

    // Cleanup: abort the fetch
    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  return <div>Results: {results.length}</div>;
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 6: Debouncing with Cleanup */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Pattern 5: Debouncing with Cleanup</h2>
        <p>Use cleanup to implement debouncing - delay execution until user stops typing.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <DebouncedSearch />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`function DebouncedSearch() {
  const [input, setInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    // Set up timeout
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, 500); // Wait 500ms after user stops typing

    // Cleanup: clear timeout if input changes again
    return () => {
      clearTimeout(timer);
    };
  }, [input]); // Re-run when input changes

  return (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 7: Common Pitfalls */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Common Cleanup Pitfalls</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-error)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h4 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Wrong</h4>
            <pre>
              <code style={{ color: 'white' }}>{`useEffect(() => {
  setInterval(() => {
    console.log('tick');
  }, 1000);
  // No cleanup!
}, []);`}</code>
            </pre>
            <p style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
              Interval keeps running forever!
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-success)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h4 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Correct</h4>
            <pre>
              <code style={{ color: 'white' }}>{`useEffect(() => {
  const id = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => clearInterval(id);
}, []);`}</code>
            </pre>
            <p style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
              Cleanup clears the interval!
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Cleanup functions run before the next effect and on unmount</li>
          <li>
            Always clean up: timers (<code>clearInterval</code>, <code>clearTimeout</code>)
          </li>
          <li>
            Always clean up: event listeners (<code>removeEventListener</code>)
          </li>
          <li>
            Always clean up: subscriptions (WebSocket <code>close()</code>, unsubscribe functions)
          </li>
          <li>
            Use <code>AbortController</code> to cancel fetch requests
          </li>
          <li>Cleanup enables debouncing and other timing patterns</li>
          <li>Forgetting cleanup leads to memory leaks and bugs!</li>
        </ul>
      </section>
    </LessonLayout>
  )
}

// Helper components

function TimerComponent() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('Timer mounted')
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
      console.log('Timer cleaned up!')
    }
  }, [])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--surface-primary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-4)',
      }}
    >
      <p style={{ color: 'var(--on-surface-primary)', fontWeight: 'bold' }}>
        Timer: {seconds} seconds
      </p>
      <p style={{ color: 'var(--color-primary-600)', fontSize: 'var(--font-size-sm)' }}>
        Check console - cleanup runs when you unmount!
      </p>
    </div>
  )
}

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Mouse tracker mounted')
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      console.log('Mouse listener removed!')
    }
  }, [])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--surface-accent)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-4)',
      }}
    >
      <p style={{ color: 'var(--on-surface-accent)', fontWeight: 'bold' }}>
        Mouse Position: X: {position.x}, Y: {position.y}
      </p>
      <p style={{ color: 'var(--color-accent-600)', fontSize: 'var(--font-size-sm)' }}>
        Move your mouse! Listener is cleaned up on unmount.
      </p>
    </div>
  )
}

function ChatComponent() {
  const [messageCount, setMessageCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    console.log('Chat connecting...')
    setIsConnected(true)

    // Simulate receiving messages
    const interval = setInterval(() => {
      setMessageCount((c) => c + 1)
    }, 2000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
      console.log('Chat disconnected!')
    }
  }, [])

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-4)',
      }}
    >
      <p style={{ color: 'white', fontWeight: 'bold' }}>
        Chat {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      <p style={{ color: 'white' }}>Messages received: {messageCount}</p>
      <p style={{ color: 'white', fontSize: 'var(--font-size-sm)' }}>
        Simulated WebSocket - cleanup closes connection
      </p>
    </div>
  )
}

function SearchResults({ searchTerm }: { searchTerm: string }) {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!searchTerm) {
      setResults([])
      return
    }

    const controller = new AbortController()
    setIsLoading(true)

    // Simulate API call
    const timer = setTimeout(() => {
      setResults([
        `Result 1 for "${searchTerm}"`,
        `Result 2 for "${searchTerm}"`,
        `Result 3 for "${searchTerm}"`,
      ])
      setIsLoading(false)
    }, 1000)

    return () => {
      controller.abort()
      clearTimeout(timer)
      console.log('Search aborted for:', searchTerm)
    }
  }, [searchTerm])

  if (!searchTerm) return null

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-4)',
      }}
    >
      {isLoading ? (
        <p>Searching...</p>
      ) : (
        <>
          <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
            Results for "{searchTerm}":
          </p>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            {results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function DebouncedSearch() {
  const [input, setInput] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input)
      console.log('Debounced value updated:', input)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type to see debouncing..."
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
          padding: 'var(--space-4)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Immediate value:</strong> {input || '(empty)'}
        </p>
        <p>
          <strong>Debounced value (500ms delay):</strong> {debouncedValue || '(empty)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          The debounced value updates 500ms after you stop typing
        </p>
      </div>
    </div>
  )
}
