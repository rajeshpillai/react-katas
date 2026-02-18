import { useState, useEffect, useRef } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './InfiniteScroll.tsx?raw'

// --- Mock API ---
const PAGE_SIZE = 20
const TOTAL_ITEMS = 100 // Limit to demonstrate "End of list" state

function fetchItems(page: number): Promise<string[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE
            // Generate mock items
            const newItems = Array.from({ length: PAGE_SIZE }, (_, i) => {
                const index = start + i + 1
                return `Item #${index}: ${Math.random().toString(36).substring(7)}`
            })

            // Simulate end of data
            if (start >= TOTAL_ITEMS) {
                resolve([])
            } else {
                resolve(newItems)
            }
        }, 1000) // 1s delay
    })
}

// --- Playground Config ---
export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useEffect, useRef } from 'react'

const PAGE_SIZE = 15
const TOTAL_ITEMS = 75

function fetchItems(page: number): Promise<string[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * PAGE_SIZE
            if (start >= TOTAL_ITEMS) {
                resolve([])
                return
            }
            const items = Array.from({ length: PAGE_SIZE }, (_, i) => {
                const index = start + i + 1
                if (index > TOTAL_ITEMS) return null
                return \`Item #\${index} - \${Math.random().toString(36).substring(2, 8)}\`
            }).filter(Boolean) as string[]
            resolve(items)
        }, 800)
    })
}

export default function App() {
    const [items, setItems] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage(prev => prev + 1)
                }
            },
            { threshold: 1.0 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [hasMore, loading])

    useEffect(() => {
        setLoading(true)
        fetchItems(page).then(newItems => {
            if (newItems.length === 0) {
                setHasMore(false)
            } else {
                setItems(prev => [...prev, ...newItems])
            }
            setLoading(false)
        })
    }, [page])

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Infinite Scroll</h2>
            <p style={{ color: '#666', marginBottom: 12 }}>
                Scroll down to load more items automatically.
            </p>
            <div style={{
                height: 320,
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: 8,
                background: '#fafafa',
            }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '14px 16px',
                            borderBottom: '1px solid #eee',
                            background: 'white',
                        }}
                    >
                        {item}
                    </div>
                ))}
                <div
                    ref={sentinelRef}
                    style={{
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888',
                        fontSize: 14,
                    }}
                >
                    {loading && <span>Loading more...</span>}
                    {!hasMore && <span>You have reached the end!</span>}
                </div>
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: '#999' }}>
                Loaded {items.length} of {TOTAL_ITEMS} items
            </p>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 450,
}

// --- Component ---
export default function InfiniteScroll() {
    const [items, setItems] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    // The "Sentinel" ref - the element we observe
    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage(prev => prev + 1)
                }
            },
            { threshold: 1.0 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [hasMore, loading])

    // Fetch data when page changes
    useEffect(() => {
        setLoading(true)
        fetchItems(page).then(newItems => {
            if (newItems.length === 0) {
                setHasMore(false)
            } else {
                setItems(prev => [...prev, ...newItems])
            }
            setLoading(false)
        })
    }, [page])

    return (
        <LessonLayout title="Infinite Scroll" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                Loads more data automatically when you scroll to the bottom using
                <code>IntersectionObserver</code>.
            </p>

            <div style={{
                height: 400,
                overflowY: 'auto',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                background: 'var(--bg-secondary)',
                position: 'relative'
            }}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '20px',
                            borderBottom: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)'
                        }}
                    >
                        {item}
                    </div>
                ))}

                {/* Sentinel Element */}
                <div ref={observerTarget} style={{ height: 20, margin: 10, textAlign: 'center', color: '#888' }}>
                    {loading && <span>Loading more...</span>}
                    {!hasMore && <span>You have reached the end!</span>}
                </div>
            </div>

            <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                <h3>Under the Hood: IntersectionObserver</h3>
                <p>
                    We place a hidden (or visible loading) element at the bottom of the list.
                    When the browser detects it's visible, we increment the page number.
                </p>
                <pre style={{ margin: 0 }}>{`const observer = new IntersectionObserver((entries) => {
  // If sentinel is visible AND we have more data AND not currently loading
  if (entries[0].isIntersecting && hasMore && !loading) {
    setPage(prev => prev + 1);
  }
});

observer.observe(sentinelRef.current);`}</pre>
            </div>
        </LessonLayout>
    )
}
