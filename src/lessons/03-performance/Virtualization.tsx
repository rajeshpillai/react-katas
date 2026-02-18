import { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'

// @ts-ignore
import sourceCode from './Virtualization.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useState } from 'react'

const ITEMS = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: \`Item #\${i + 1} - \${Math.random().toString(36).substring(7)}\`,
}))

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T) => React.ReactNode
}

function VirtualList<T>({ items, itemHeight, containerHeight, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)

  const totalHeight = items.length * itemHeight
  const startIndex = Math.floor(scrollTop / itemHeight)
  const buffer = 5
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + buffer
  )
  const actualStartIndex = Math.max(0, startIndex - buffer)
  const visibleItems = items.slice(actualStartIndex, endIndex + 1)
  const offsetY = actualStartIndex * itemHeight

  return (
    <div
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      style={{ height: containerHeight, overflowY: 'auto', position: 'relative' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>Virtualized List (10,000 items)</h2>
      <p>Only ~20 DOM nodes are rendered at a time. Scroll to see it in action!</p>

      <div style={{
        height: 350,
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        <VirtualList
          items={ITEMS}
          itemHeight={35}
          containerHeight={350}
          renderItem={(item) => (
            <div
              key={item.id}
              style={{
                height: 35,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                borderBottom: '1px solid #e2e8f0',
                fontSize: 13,
                boxSizing: 'border-box',
              }}
            >
              {item.text}
            </div>
          )}
        />
      </div>

      <p style={{ fontSize: 12, color: '#718096', marginTop: 8 }}>
        Total items: {ITEMS.length} | Only visible items are in the DOM
      </p>
    </div>
  )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 500,
}

// Generates 10,000 items
const ITEMS = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `Item #${i + 1} - ${Math.random().toString(36).substring(7)}`,
}))

export default function Virtualization() {
  return (
    <LessonLayout title="Virtualization (Windowing)" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <p>
        Rendering large lists of data can significantly degrade performance. <strong>Virtualization</strong> (or windowing) is a technique where you only render the items that are currently visible to the user.
      </p>

      {/* Introduction */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Problem: DOM Weight</h2>
        <p>
          Browsers are fast, but creating and layouting thousands of DOM nodes takes time.
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', margin: 'var(--space-4) 0' }}>
          <li style={{ marginBottom: 'var(--space-2)' }}>High memory usage</li>
          <li style={{ marginBottom: 'var(--space-2)' }}>Slow initial render</li>
          <li style={{ marginBottom: 'var(--space-2)' }}>Laggy scrolling due to massive style recalculations</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>The Solution: Virtualization</h2>
        <p>
          Instead of rendering 10,000 items, we only render the ~20 items that fit on the screen.
          As the user scrolls, we swap out the data. The DOM node count stays constant (e.g., ~20 nodes), regardless of the list size.
        </p>
      </section>

      {/* Slow Approach Demo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <SlowListDemo />
      </section>

      {/* Fast Approach Demo */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <VirtualListDemo />
      </section>
    </LessonLayout>
  )
}

function SlowListDemo() {
  const [show, setShow] = useState(false)

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <h2 style={{ color: 'var(--color-error)' }}>The Slow Approach</h2>
      <p style={{ marginBottom: 'var(--space-4)' }}>
        Clicking the button below will render <strong>10,000 items</strong> directly to the DOM.
        Notice the slight freeze?
      </p>

      <button
        onClick={() => setShow(!show)}
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-error)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-4)',
        }}
      >
        {show ? 'Hide List' : 'Render 10,000 Items'}
      </button>

      {show && (
        <div
          style={{
            height: '400px',
            overflow: 'auto',
            background: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--space-4)',
                borderBottom: '1px solid var(--border-color)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Implementation of optimized list ---

function VirtualListDemo() {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <h2 style={{ color: 'var(--color-success)' }}>The Fast Approach</h2>
      <p style={{ marginBottom: 'var(--space-4)' }}>
        This list handles the same <strong>10,000 items</strong>, but uses windowing.
        It starts almost instantly and scrolls smoothly.
      </p>

      <div
        style={{
          height: '400px',
          background: 'white',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}
      >
        <VirtualList
          items={ITEMS}
          itemHeight={35}
          containerHeight={400}
          renderItem={(item) => (
            <div
              key={item.id}
              style={{
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--space-4)',
                borderBottom: '1px solid var(--border-color)',
                fontSize: 'var(--font-size-sm)',
                boxSizing: 'border-box',
              }}
            >
              {item.text}
            </div>
          )}
        />
      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <h3>Under the Hood</h3>
        <pre style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
          <code>{`function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);

  // 1. Calculate the total height of the phantom container
  const totalHeight = items.length * itemHeight;

  // 2. Determine which items are visible
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight)
  );

  // 3. Slice the data
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // 4. Render with absolute positioning
  return (
    <div onScroll={e => setScrollTop(e.target.scrollTop)} ...>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div style={{
            position: 'absolute',
            top: (startIndex + index) * itemHeight,
            height: itemHeight
          }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}`}</code>
        </pre>
      </div>
    </div>
  )
}

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T) => React.ReactNode
}

function VirtualList<T>({ items, itemHeight, containerHeight, renderItem }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)

  // Total height of the scrollable content
  const totalHeight = items.length * itemHeight

  // Calculate start and end indices
  const startIndex = Math.floor(scrollTop / itemHeight)
  // Add a buffer of 5 items to prevent blank space during fast scrolling
  const buffer = 5
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + buffer
  )

  // Slice only the visible items + buffer
  const actualStartIndex = Math.max(0, startIndex - buffer)
  const visibleItems = items.slice(actualStartIndex, endIndex + 1)

  // Calculate top padding to push items down to correct position
  const offsetY = actualStartIndex * itemHeight

  return (
    <div
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      style={{
        height: `${containerHeight}px`,
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: `${totalHeight}px`,
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  )
}
