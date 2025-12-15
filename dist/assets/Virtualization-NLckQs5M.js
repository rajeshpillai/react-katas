import{r as s,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const f=`import { useState } from 'react'

// @ts-ignore
import sourceCode from './Virtualization.tsx?raw'

export default function Virtualization() {
    const [activeTab, setActiveTab] = useState<'intro' | 'slow' | 'fast' | 'code'>('intro')

    return (
        <div>
            <h1>Virtualization (Windowing)</h1>
            <p>
                Rendering large lists of data can significantly degrade performance. <strong>Virtualization</strong> (or windowing) is a technique where you only render the items that are currently visible to the user.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setActiveTab('intro')}
                    style={getTabStyle(activeTab === 'intro')}
                >
                    Introduction
                </button>
                <button
                    onClick={() => setActiveTab('slow')}
                    style={getTabStyle(activeTab === 'slow')}
                >
                    Slow Approach
                </button>
                <button
                    onClick={() => setActiveTab('fast')}
                    style={getTabStyle(activeTab === 'fast')}
                >
                    Fast Approach (Virtualization)
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    style={getTabStyle(activeTab === 'code')}
                >
                    Source Code
                </button>
            </div>

            {activeTab === 'intro' && <IntroSection />}
            {activeTab === 'slow' && <SlowListDemo />}
            {activeTab === 'fast' && <VirtualListDemo />}
            {activeTab === 'code' && (
                <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
                    <code>{sourceCode}</code>
                </pre>
            )}
        </div>
    )
}

function getTabStyle(isActive: boolean): React.CSSProperties {
    return {
        padding: 'var(--space-2) var(--space-4)',
        background: isActive ? 'var(--color-primary-600)' : 'var(--bg-secondary)',
        color: isActive ? 'white' : 'var(--text-secondary)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
    }
}

function IntroSection() {
    return (
        <div>
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

            <section>
                <h2>The Solution: Virtualization</h2>
                <p>
                    Instead of rendering 10,000 items, we only render the ~20 items that fit on the screen.
                    As the user scrolls, we swap out the data. The DOM node count stays constant (e.g., ~20 nodes), regardless of the list size.
                </p>
            </section>
        </div>
    )
}

// Generates 10,000 items
const ITEMS = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: \`Item #\${i + 1} - \${Math.random().toString(36).substring(7)}\`,
}))

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
            <h2 style={{ color: 'var(--color-error)' }}>⚠️ The Slow Approach</h2>
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
            <h2 style={{ color: 'var(--color-success)' }}>✅ The Fast Approach</h2>
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
                    overflow: 'hidden', // Container handles overflow by itself
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
                                boxSizing: 'border-box', // Important for height calculations
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
                    <code>{\`function VirtualList({ items, itemHeight, containerHeight }) {
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
}\`}</code>
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
    // We use max(0, startIndex - buffer) to also buffer upwards
    const actualStartIndex = Math.max(0, startIndex - buffer)
    const visibleItems = items.slice(actualStartIndex, endIndex + 1)

    // Calculate top padding to push items down to correct position
    // Alternatively we could use absolute positioning for each item
    const offsetY = actualStartIndex * itemHeight

    return (
        <div
            onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
            style={{
                height: \`\${containerHeight}px\`,
                overflowY: 'auto',
                position: 'relative' // Needed if we used absolute positioning for inner
            }}
        >
            <div
                style={{
                    height: \`\${totalHeight}px\`,
                    position: 'relative',
                }}
            >
                {/* 
           We use transform to position the "window" of items.
           This is more performant than absolute positioning each item for massive lists,
           but absolute positioning is also very common.
        */}
                <div
                    style={{
                        transform: \`translateY(\${offsetY}px)\`,
                    }}
                >
                    {visibleItems.map((item) => renderItem(item))}
                </div>
            </div>
        </div>
    )
}
`;function j(){const[t,n]=s.useState("intro");return e.jsxs("div",{children:[e.jsx("h1",{children:"Virtualization (Windowing)"}),e.jsxs("p",{children:["Rendering large lists of data can significantly degrade performance. ",e.jsx("strong",{children:"Virtualization"})," (or windowing) is a technique where you only render the items that are currently visible to the user."]}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)",marginBottom:"var(--space-6)",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>n("intro"),style:o(t==="intro"),children:"Introduction"}),e.jsx("button",{onClick:()=>n("slow"),style:o(t==="slow"),children:"Slow Approach"}),e.jsx("button",{onClick:()=>n("fast"),style:o(t==="fast"),children:"Fast Approach (Virtualization)"}),e.jsx("button",{onClick:()=>n("code"),style:o(t==="code"),children:"Source Code"})]}),t==="intro"&&e.jsx(x,{}),t==="slow"&&e.jsx(y,{}),t==="fast"&&e.jsx(w,{}),t==="code"&&e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:f})})]})}function o(t){return{padding:"var(--space-2) var(--space-4)",background:t?"var(--color-primary-600)":"var(--bg-secondary)",color:t?"white":"var(--text-secondary)",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"}}function x(){return e.jsxs("div",{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"The Problem: DOM Weight"}),e.jsx("p",{children:"Browsers are fast, but creating and layouting thousands of DOM nodes takes time."}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)",margin:"var(--space-4) 0"},children:[e.jsx("li",{style:{marginBottom:"var(--space-2)"},children:"High memory usage"}),e.jsx("li",{style:{marginBottom:"var(--space-2)"},children:"Slow initial render"}),e.jsx("li",{style:{marginBottom:"var(--space-2)"},children:"Laggy scrolling due to massive style recalculations"})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"The Solution: Virtualization"}),e.jsx("p",{children:"Instead of rendering 10,000 items, we only render the ~20 items that fit on the screen. As the user scrolls, we swap out the data. The DOM node count stays constant (e.g., ~20 nodes), regardless of the list size."})]})]})}const c=Array.from({length:1e4},(t,n)=>({id:n,text:`Item #${n+1} - ${Math.random().toString(36).substring(7)}`}));function y(){const[t,n]=s.useState(!1);return e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h2",{style:{color:"var(--color-error)"},children:"⚠️ The Slow Approach"}),e.jsxs("p",{style:{marginBottom:"var(--space-4)"},children:["Clicking the button below will render ",e.jsx("strong",{children:"10,000 items"})," directly to the DOM. Notice the slight freeze?"]}),e.jsx("button",{onClick:()=>n(!t),style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-error)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:t?"Hide List":"Render 10,000 Items"}),t&&e.jsx("div",{style:{height:"400px",overflow:"auto",background:"white",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)"},children:c.map(i=>e.jsx("div",{style:{height:"35px",display:"flex",alignItems:"center",padding:"0 var(--space-4)",borderBottom:"1px solid var(--border-color)",fontSize:"var(--font-size-sm)"},children:i.text},i.id))})]})}function w(){return e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h2",{style:{color:"var(--color-success)"},children:"✅ The Fast Approach"}),e.jsxs("p",{style:{marginBottom:"var(--space-4)"},children:["This list handles the same ",e.jsx("strong",{children:"10,000 items"}),", but uses windowing. It starts almost instantly and scrolls smoothly."]}),e.jsx("div",{style:{height:"400px",background:"white",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",overflow:"hidden"},children:e.jsx(T,{items:c,itemHeight:35,containerHeight:400,renderItem:t=>e.jsx("div",{style:{height:"35px",display:"flex",alignItems:"center",padding:"0 var(--space-4)",borderBottom:"1px solid var(--border-color)",fontSize:"var(--font-size-sm)",boxSizing:"border-box"},children:t.text},t.id)})}),e.jsxs("div",{style:{marginTop:"var(--space-6)"},children:[e.jsx("h3",{children:"Under the Hood"}),e.jsx("pre",{style:{background:"var(--bg-tertiary)",padding:"var(--space-4)",borderRadius:"var(--radius-md)"},children:e.jsx("code",{children:`function VirtualList({ items, itemHeight, containerHeight }) {
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
}`})})]})]})}function T({items:t,itemHeight:n,containerHeight:i,renderItem:h}){const[a,u]=s.useState(0),g=t.length*n,p=Math.floor(a/n),l=5,m=Math.min(t.length-1,Math.floor((a+i)/n)+l),d=Math.max(0,p-l),v=t.slice(d,m+1),b=d*n;return e.jsx("div",{onScroll:r=>u(r.target.scrollTop),style:{height:`${i}px`,overflowY:"auto",position:"relative"},children:e.jsx("div",{style:{height:`${g}px`,position:"relative"},children:e.jsx("div",{style:{transform:`translateY(${b}px)`},children:v.map(r=>h(r))})})})}export{j as default};
//# sourceMappingURL=Virtualization-NLckQs5M.js.map
