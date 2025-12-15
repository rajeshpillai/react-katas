import{r as t,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const a=`import { useState, memo, useRef } from 'react'

// @ts-ignore
import sourceCode from './ReactMemo.tsx?raw'

export default function ReactMemoLesson() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>React.memo</h1>
      <p>
        <code>React.memo</code> is a higher-order component that prevents re-renders when props
        haven't changed. In React 19, it's less critical due to automatic optimizations, but still
        useful for expensive components.
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
          Lesson
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
          {/* Section 1: What is React.memo */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What is React.memo?</h2>
            <p>
              <code>React.memo</code> memoizes a component, re-rendering only when props change.
            </p>

            <pre>
              <code>{\`// Without memo
        function ExpensiveComponent({ data }) {
        return <div>{data}</div>;
        }

        // With memo
        const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
        return <div>{data}</div>;
        });

        // Component only re-renders if 'data' prop changes\`}</code>
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
              <p style={{ color: 'white', fontWeight: 'bold' }}>💡 When to Use React.memo:</p>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Component renders often with same props
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Expensive rendering logic
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Large lists with many items
                </li>
                <li style={{ color: 'white' }}>After profiling shows it helps</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Basic Example */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Basic Example</h2>
            <p>Compare component with and without memo.</p>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Interactive Demo:</h3>
              <MemoComparison />
            </div>
          </section>

          {/* Section 3: Custom Comparison */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Custom Comparison Function</h2>
            <p>
              Provide a custom comparison function for complex prop comparisons.
            </p>

            <pre>
              <code>{\`const MemoizedComponent = memo(
        function Component({ user, settings }) {
            return <div>{user.name}</div>;
        },
        (prevProps, nextProps) => {
            // Return true if props are equal (skip re-render)
            // Return false if props changed (re-render)
            return prevProps.user.id === nextProps.user.id;
        }
        );\`}</code>
            </pre>
          </section>

          {/* Section 4: Pitfalls */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Common Pitfalls</h2>

            <div
              style={{
                background: 'var(--color-error)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Breaks memo:</h3>
              <pre style={{ background: 'transparent' }}>
                <code style={{ color: 'white' }}>{\`// New object/array every render
        <MemoComponent data={{ value: 1 }} />
        <MemoComponent items={[1, 2, 3]} />
        <MemoComponent onClick={() => {}} />

        // These create new references, breaking memo!\`}</code>
              </pre>
            </div>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Works with memo:</h3>
              <pre style={{ background: 'transparent' }}>
                <code style={{ color: 'white' }}>{\`// Stable references
        const data = useMemo(() => ({ value: 1 }), []);
        const items = useMemo(() => [1, 2, 3], []);
        const handleClick = useCallback(() => {}, []);

        <MemoComponent data={data} />
        <MemoComponent items={items} />
        <MemoComponent onClick={handleClick} />\`}</code>
              </pre>
            </div>
          </section>

          {/* Section 5: Under the Hood - Shallow Comparison */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Under the Hood: Shallow Comparison</h2>
            <p>
              React.memo uses <strong>shallow comparison</strong> (<code>Object.is</code>) to check if props have changed. It does NOT dig deep into objects.
            </p>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ marginBottom: 'var(--space-3)' }}>🔍 How Shallow Compare Actually Works</h3>
              <pre>
                <code>{\`// Simplified implementation of what React does:
        function shallowEqual(objA, objB) {
        if (Object.is(objA, objB)) return true;

        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }

        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) return false;

        // Only checks if the values of the keys are strictly equal
        for (let i = 0; i < keysA.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
                !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
            }
        }

        return true;
        }\`}</code>
              </pre>
              <p style={{ marginTop: 'var(--space-2)', fontStyle: 'italic', fontSize: 'var(--font-size-sm)' }}>
                This is why <code>{\`{a: 1} === {a: 1}\`}</code> is false in JavaScript, and why <code>memo</code> re-renders if you pass a new object!
              </p>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>
                <code>React.memo</code> prevents re-renders when props are unchanged
              </li>
              <li>Use for expensive components that render often</li>
              <li>Shallow comparison by default - compares prop references</li>
              <li>Custom comparison for complex props</li>
              <li>Breaks with new object/array/function references</li>
              <li>Combine with useMemo/useCallback for stable props</li>
              <li>In React 19, try composition first!</li>
            </ul>
          </section>
        </>
      ) : (
        <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
          <code>{sourceCode}</code>
        </pre>
      )}
    </div>
  )
}

// Demo components

function MemoComparison() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p>
        <strong>Parent Count:</strong> {count}
      </p>
      <p>
        <strong>Value:</strong> {value}
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Increment Count
        </button>
        <button
          onClick={() => setValue(value + 1)}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-accent-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Increment Value
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <h4>Without memo:</h4>
          <WithoutMemo value={value} />
        </div>
        <div>
          <h4>With memo:</h4>
          <WithMemo value={value} />
        </div>
      </div>

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-3)' }}>
        Check console: Without memo re-renders on every parent update. With memo only re-renders when value changes.
      </p>
    </div>
  )
}

function WithoutMemo({ value }: { value: number }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-error)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>Value: {value}</p>
      <p style={{ color: 'white' }}>Renders: {renderCount.current}</p>
    </div>
  )
}

const WithMemo = memo(function WithMemo({ value }: { value: number }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div
      style={{
        padding: 'var(--space-3)',
        background: 'var(--color-success)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <p style={{ color: 'white' }}>Value: {value}</p>
      <p style={{ color: 'white' }}>Renders: {renderCount.current}</p>
    </div>
  )
})
`;function m(){const[n,o]=t.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"React.memo"}),e.jsxs("p",{children:[e.jsx("code",{children:"React.memo"})," is a higher-order component that prevents re-renders when props haven't changed. In React 19, it's less critical due to automatic optimizations, but still useful for expensive components."]}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="code"?"bold":"normal"},children:"Source Code"})]}),n==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is React.memo?"}),e.jsxs("p",{children:[e.jsx("code",{children:"React.memo"})," memoizes a component, re-rendering only when props change."]}),e.jsx("pre",{children:e.jsx("code",{children:`// Without memo
        function ExpensiveComponent({ data }) {
        return <div>{data}</div>;
        }

        // With memo
        const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
        return <div>{data}</div>;
        });

        // Component only re-renders if 'data' prop changes`})}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"💡 When to Use React.memo:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Component renders often with same props"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Expensive rendering logic"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Large lists with many items"}),e.jsx("li",{style:{color:"white"},children:"After profiling shows it helps"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Basic Example"}),e.jsx("p",{children:"Compare component with and without memo."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Interactive Demo:"}),e.jsx(i,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Custom Comparison Function"}),e.jsx("p",{children:"Provide a custom comparison function for complex prop comparisons."}),e.jsx("pre",{children:e.jsx("code",{children:`const MemoizedComponent = memo(
        function Component({ user, settings }) {
            return <div>{user.name}</div>;
        },
        (prevProps, nextProps) => {
            // Return true if props are equal (skip re-render)
            // Return false if props changed (re-render)
            return prevProps.user.id === nextProps.user.id;
        }
        );`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common Pitfalls"}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Breaks memo:"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{style:{color:"white"},children:`// New object/array every render
        <MemoComponent data={{ value: 1 }} />
        <MemoComponent items={[1, 2, 3]} />
        <MemoComponent onClick={() => {}} />

        // These create new references, breaking memo!`})})]}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Works with memo:"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{style:{color:"white"},children:`// Stable references
        const data = useMemo(() => ({ value: 1 }), []);
        const items = useMemo(() => [1, 2, 3], []);
        const handleClick = useCallback(() => {}, []);

        <MemoComponent data={data} />
        <MemoComponent items={items} />
        <MemoComponent onClick={handleClick} />`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Under the Hood: Shallow Comparison"}),e.jsxs("p",{children:["React.memo uses ",e.jsx("strong",{children:"shallow comparison"})," (",e.jsx("code",{children:"Object.is"}),") to check if props have changed. It does NOT dig deep into objects."]}),e.jsxs("div",{style:{background:"var(--bg-tertiary)",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{marginBottom:"var(--space-3)"},children:"🔍 How Shallow Compare Actually Works"}),e.jsx("pre",{children:e.jsx("code",{children:`// Simplified implementation of what React does:
        function shallowEqual(objA, objB) {
        if (Object.is(objA, objB)) return true;

        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }

        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);

        if (keysA.length !== keysB.length) return false;

        // Only checks if the values of the keys are strictly equal
        for (let i = 0; i < keysA.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
                !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
            }
        }

        return true;
        }`})}),e.jsxs("p",{style:{marginTop:"var(--space-2)",fontStyle:"italic",fontSize:"var(--font-size-sm)"},children:["This is why ",e.jsx("code",{children:"{a: 1} === {a: 1}"})," is false in JavaScript, and why ",e.jsx("code",{children:"memo"})," re-renders if you pass a new object!"]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"React.memo"})," prevents re-renders when props are unchanged"]}),e.jsx("li",{children:"Use for expensive components that render often"}),e.jsx("li",{children:"Shallow comparison by default - compares prop references"}),e.jsx("li",{children:"Custom comparison for complex props"}),e.jsx("li",{children:"Breaks with new object/array/function references"}),e.jsx("li",{children:"Combine with useMemo/useCallback for stable props"}),e.jsx("li",{children:"In React 19, try composition first!"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:a})})]})}function i(){const[n,o]=t.useState(0),[r,s]=t.useState(0);return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Parent Count:"})," ",n]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Value:"})," ",r]}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)",marginBottom:"var(--space-4)"},children:[e.jsx("button",{onClick:()=>o(n+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Increment Count"}),e.jsx("button",{onClick:()=>s(r+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Increment Value"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)"},children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Without memo:"}),e.jsx(c,{value:r})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"With memo:"}),e.jsx(d,{value:r})]})]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)",marginTop:"var(--space-3)"},children:"Check console: Without memo re-renders on every parent update. With memo only re-renders when value changes."})]})}function c({value:n}){const o=t.useRef(0);return o.current+=1,e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-error)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{style:{color:"white"},children:["Value: ",n]}),e.jsxs("p",{style:{color:"white"},children:["Renders: ",o.current]})]})}const d=t.memo(function({value:o}){const r=t.useRef(0);return r.current+=1,e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{style:{color:"white"},children:["Value: ",o]}),e.jsxs("p",{style:{color:"white"},children:["Renders: ",r.current]})]})});export{m as default};
//# sourceMappingURL=ReactMemo-BqUjN5qG.js.map
