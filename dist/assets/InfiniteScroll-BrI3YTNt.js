import{r as n,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const f=`import React, { useState, useEffect, useRef } from 'react'
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
                return \`Item #\${index}: \${Math.random().toString(36).substring(7)}\`
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
                        <pre style={{ margin: 0 }}>{\`const observer = new IntersectionObserver((entries) => {
  // If sentinel is visible AND we have more data AND not currently loading
  if (entries[0].isIntersecting && hasMore && !loading) {
    setPage(prev => prev + 1);
  }
});

observer.observe(sentinelRef.current);\`}</pre>
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
`,u=20,x=100;function y(r){return new Promise(i=>{setTimeout(()=>{const o=(r-1)*u,l=Array.from({length:u},(a,d)=>`Item #${o+d+1}: ${Math.random().toString(36).substring(7)}`);o>=x?i([]):i(l)},1e3)})}function T(){const[r,i]=n.useState([]),[o,l]=n.useState(1),[a,d]=n.useState(!1),[c,p]=n.useState(!0),[b,g]=n.useState("demo"),m=n.useRef(null);return n.useEffect(()=>{const t=new IntersectionObserver(s=>{s[0].isIntersecting&&c&&!a&&l(h=>h+1)},{threshold:1});return m.current&&t.observe(m.current),()=>t.disconnect()},[c,a]),n.useEffect(()=>{d(!0),y(o).then(t=>{t.length===0?p(!1):i(s=>[...s,...t]),d(!1)})},[o]),e.jsxs("div",{children:[e.jsx("h1",{children:"Infinite Scroll"}),e.jsxs("p",{children:["Loads more data automatically when you scroll to the bottom using",e.jsx("code",{children:"IntersectionObserver"}),"."]}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>g("demo"),style:v(b==="demo"),children:"Implementation"}),e.jsx("button",{onClick:()=>g("code"),style:v(b==="code"),children:"Source Code"})]}),b==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{height:400,overflowY:"auto",border:"1px solid var(--border-color)",borderRadius:8,background:"var(--bg-secondary)",position:"relative"},children:[r.map((t,s)=>e.jsx("div",{style:{padding:"20px",borderBottom:"1px solid var(--border-color)",background:"var(--bg-primary)"},children:t},s)),e.jsxs("div",{ref:m,style:{height:20,margin:10,textAlign:"center",color:"#888"},children:[a&&e.jsx("span",{children:"Loading more..."}),!c&&e.jsx("span",{children:"You have reached the end!"})]})]}),e.jsxs("div",{style:{marginTop:40,padding:20,background:"var(--bg-tertiary)",borderRadius:8},children:[e.jsx("h3",{children:"Under the Hood: IntersectionObserver"}),e.jsx("p",{children:"We place a hidden (or visible loading) element at the bottom of the list. When the browser detects it's visible, we increment the page number."}),e.jsx("pre",{style:{margin:0},children:`const observer = new IntersectionObserver((entries) => {
  // If sentinel is visible AND we have more data AND not currently loading
  if (entries[0].isIntersecting && hasMore && !loading) {
    setPage(prev => prev + 1);
  }
});

observer.observe(sentinelRef.current);`})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:f})})]})}function v(r){return{padding:"10px 20px",background:"transparent",border:"none",borderBottom:r?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:r?"bold":"normal",color:"var(--text-primary)"}}export{T as default};
//# sourceMappingURL=InfiniteScroll-BrI3YTNt.js.map
