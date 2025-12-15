import{r as n,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function v(a,i){const[s,o]=n.useState(a);return n.useEffect(()=>{const l=setTimeout(()=>{o(a)},i);return()=>{clearTimeout(l)}},[a,i]),s}const S=`import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useDebounce } from '@hooks/useDebounce'

// --- Mock Data & API ---
const FRUITS = [
    'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry',
    'Cherry', 'Coconut', 'Cranberry', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry', 'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew',
    'Jackfruit', 'Kiwi', 'Lemon', 'Lime', 'Lychee', 'Mango',
    'Melon', 'Nectarine', 'Orange', 'Papaya', 'Passion Fruit', 'Peach',
    'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Strawberry',
    'Tangerine', 'Watermelon'
]

function fakeApi(query: string): Promise<string[]> {
    return new Promise((resolve) => {
        // Random delay between 200ms and 800ms to simulate network unpredictability
        const delay = Math.random() * 600 + 200
        setTimeout(() => {
            const results = FRUITS.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            )
            resolve(results)
        }, delay)
    })
}

// --- Components ---

// @ts-ignore
import sourceCode from './AutoComplete.tsx?raw'

export default function AutoComplete() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

    // We use a debounce hook to prevent API calls on every keystroke
    const debouncedQuery = useDebounce(query, 500)

    // Cache to store results: { [query]: results[] }
    const cache = useRef<{ [key: string]: string[] }>({})

    useEffect(() => {
        // If query is empty, clear results and return
        if (!debouncedQuery.trim()) {
            setSuggestions([])
            return
        }

        // Check cache first
        if (cache.current[debouncedQuery]) {
            setSuggestions(cache.current[debouncedQuery])
            return
        }

        let isFresh = true
        setLoading(true)
        setError(null)

        fakeApi(debouncedQuery)
            .then(results => {
                // If the component unmounted or query changed, ignore this result (Race Condition check)
                if (!isFresh) return

                // Update cache
                cache.current[debouncedQuery] = results
                setSuggestions(results)
            })
            .catch(() => {
                if (isFresh) setError('Failed to fetch suggestions')
            })
            .finally(() => {
                if (isFresh) setLoading(false)
            })

        return () => {
            isFresh = false
        }
    }, [debouncedQuery])

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                setQuery(suggestions[selectedIndex])
                setSuggestions([])
            }
        } else if (e.key === 'Escape') {
            setSuggestions([])
        }
    }

    const handleSelect = (value: string) => {
        setQuery(value)
        setSuggestions([])
        setSelectedIndex(-1)
    }

    return (
        <div>
            <h1>Auto-complete / Typeahead</h1>
            <p>
                A search input that handles <strong>debouncing</strong>, <strong>caching</strong>,
                <strong> race conditions</strong>, and <strong>keyboard navigation</strong>.
            </p>

            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
                <button
                    onClick={() => setActiveTab('demo')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'demo' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === 'demo' ? 'bold' : 'normal'
                    }}
                >
                    Implementation
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'code' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === 'code' ? 'bold' : 'normal'
                    }}
                >
                    Source Code
                </button>
            </div>

            {activeTab === 'demo' ? (
                <>
                    <div style={{ maxWidth: 400, marginTop: 20, position: 'relative' }}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for a fruit (e.g., Apple)"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)'
                            }}
                        />

                        {loading && (
                            <div style={{ position: 'absolute', right: 10, top: 12, fontSize: '12px', color: '#888' }}>
                                Loading...
                            </div>
                        )}

                        {error && (
                            <div style={{ position: 'absolute', right: 10, top: 12, fontSize: '12px', color: 'red' }}>
                                Error
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <ul style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderTop: 'none',
                                borderRadius: '0 0 4px 4px',
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                maxHeight: 200,
                                overflowY: 'auto',
                                zIndex: 10,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                {suggestions.map((item, index) => (
                                    <li
                                        key={item}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: index === selectedIndex ? 'var(--bg-tertiary)' : 'transparent',
                                            borderBottom: '1px solid var(--border-color)'
                                        }}
                                    >
                                        {/* Highlight match logic could go here */}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                        <h3>Under the Hood: Race Condition Handling</h3>
                        <p>When multiple unique requests are firing, we ensure we only apply the result of the <em>latest</em> one.</p>
                        <pre style={{ margin: 0 }}>{\`useEffect(() => {
  let isFresh = true; // Flag for this specific effect run

  fakeApi(debouncedQuery).then(results => {
    // If effect cleanup ran (due to new query), isFresh is false
    if (!isFresh) return; 
    setSuggestions(results);
  });

  return () => { isFresh = false; }; // Cleanup invalidates this run
}, [debouncedQuery]);\`}</pre>
                    </div>
                </>
            ) : (
                <pre style={{
                    padding: 20,
                    background: 'var(--bg-secondary)',
                    borderRadius: 8,
                    overflow: 'auto',
                    fontSize: 14
                }}>
                    <code>{sourceCode}</code>
                </pre>
            )}
        </div>
    )
}
`,k=["Apple","Apricot","Avocado","Banana","Blackberry","Blueberry","Cherry","Coconut","Cranberry","Date","Dragonfruit","Durian","Elderberry","Fig","Grape","Grapefruit","Guava","Honeydew","Jackfruit","Kiwi","Lemon","Lime","Lychee","Mango","Melon","Nectarine","Orange","Papaya","Passion Fruit","Peach","Pear","Pineapple","Plum","Pomegranate","Raspberry","Strawberry","Tangerine","Watermelon"];function w(a){return new Promise(i=>{const s=Math.random()*600+200;setTimeout(()=>{const o=k.filter(l=>l.toLowerCase().includes(a.toLowerCase()));i(o)},s)})}function T(){const[a,i]=n.useState(""),[s,o]=n.useState([]),[l,h]=n.useState(!1),[f,b]=n.useState(null),[c,p]=n.useState(-1),[u,y]=n.useState("demo"),d=v(a,500),g=n.useRef({});n.useEffect(()=>{if(!d.trim()){o([]);return}if(g.current[d]){o(g.current[d]);return}let r=!0;return h(!0),b(null),w(d).then(t=>{r&&(g.current[d]=t,o(t))}).catch(()=>{r&&b("Failed to fetch suggestions")}).finally(()=>{r&&h(!1)}),()=>{r=!1}},[d]);const m=r=>{r.key==="ArrowDown"?(r.preventDefault(),p(t=>t<s.length-1?t+1:t)):r.key==="ArrowUp"?(r.preventDefault(),p(t=>t>0?t-1:-1)):r.key==="Enter"?c>=0&&s[c]&&(i(s[c]),o([])):r.key==="Escape"&&o([])},x=r=>{i(r),o([]),p(-1)};return e.jsxs("div",{children:[e.jsx("h1",{children:"Auto-complete / Typeahead"}),e.jsxs("p",{children:["A search input that handles ",e.jsx("strong",{children:"debouncing"}),", ",e.jsx("strong",{children:"caching"}),",",e.jsx("strong",{children:" race conditions"}),", and ",e.jsx("strong",{children:"keyboard navigation"}),"."]}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>y("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:u==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:u==="demo"?"bold":"normal"},children:"Implementation"}),e.jsx("button",{onClick:()=>y("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:u==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:u==="code"?"bold":"normal"},children:"Source Code"})]}),u==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{maxWidth:400,marginTop:20,position:"relative"},children:[e.jsx("input",{type:"text",value:a,onChange:r=>i(r.target.value),onKeyDown:m,placeholder:"Search for a fruit (e.g., Apple)",style:{width:"100%",padding:"10px",fontSize:"16px",borderRadius:"4px",border:"1px solid var(--border-color)",background:"var(--bg-secondary)",color:"var(--text-primary)"}}),l&&e.jsx("div",{style:{position:"absolute",right:10,top:12,fontSize:"12px",color:"#888"},children:"Loading..."}),f&&e.jsx("div",{style:{position:"absolute",right:10,top:12,fontSize:"12px",color:"red"},children:"Error"}),s.length>0&&e.jsx("ul",{style:{position:"absolute",top:"100%",left:0,right:0,backgroundColor:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderTop:"none",borderRadius:"0 0 4px 4px",listStyle:"none",padding:0,margin:0,maxHeight:200,overflowY:"auto",zIndex:10,boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},children:s.map((r,t)=>e.jsx("li",{onClick:()=>x(r),onMouseEnter:()=>p(t),style:{padding:"10px",cursor:"pointer",backgroundColor:t===c?"var(--bg-tertiary)":"transparent",borderBottom:"1px solid var(--border-color)"},children:r},r))})]}),e.jsxs("div",{style:{marginTop:40,padding:20,background:"var(--bg-tertiary)",borderRadius:8},children:[e.jsx("h3",{children:"Under the Hood: Race Condition Handling"}),e.jsxs("p",{children:["When multiple unique requests are firing, we ensure we only apply the result of the ",e.jsx("em",{children:"latest"})," one."]}),e.jsx("pre",{style:{margin:0},children:`useEffect(() => {
  let isFresh = true; // Flag for this specific effect run

  fakeApi(debouncedQuery).then(results => {
    // If effect cleanup ran (due to new query), isFresh is false
    if (!isFresh) return; 
    setSuggestions(results);
  });

  return () => { isFresh = false; }; // Cleanup invalidates this run
}, [debouncedQuery]);`})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:S})})]})}export{T as default};
//# sourceMappingURL=AutoComplete-B5QbGgux.js.map
