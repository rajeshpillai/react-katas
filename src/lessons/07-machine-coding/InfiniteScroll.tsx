import React, { useState, useEffect, useRef, useCallback } from 'react'
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

// --- Component ---

export default function InfiniteScroll() {
    const [items, setItems] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

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
        <div>
            <h1>Infinite Scroll</h1>
            <p>
                Loads more data automatically when you scroll to the bottom using
                <code>IntersectionObserver</code>.
            </p>

            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
                <button onClick={() => setActiveTab('demo')} style={getTabStyle(activeTab === 'demo')}>Implementation</button>
                <button onClick={() => setActiveTab('code')} style={getTabStyle(activeTab === 'code')}>Source Code</button>
            </div>

            {activeTab === 'demo' ? (
                <>
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
                </>
            ) : (
                <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
                    <code>{sourceCode}</code>
                </pre>
            )}
        </div>
    )
}

function getTabStyle(isActive: boolean): React.CSSProperties {
    return {
        padding: '10px 20px',
        background: 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--color-primary-500)' : '2px solid transparent',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal',
        color: 'var(--text-primary)'
    }
}
