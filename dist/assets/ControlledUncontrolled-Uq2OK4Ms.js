import{r as t,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const l=`import { useState, useRef } from 'react'

// @ts-ignore
import sourceCode from './ControlledUncontrolled.tsx?raw'

export default function ControlledUncontrolled() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Controlled vs Uncontrolled Components</h1>
      <p>
        Learn the difference between controlled and uncontrolled components, and when to use each
        pattern for form inputs and other stateful elements.
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
          {/* Section 1: Controlled Components */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Controlled Components</h2>
            <p>
              Controlled components have their state managed by React. The component's value is
              controlled by React state.
            </p>

            <pre>
              <code>{\`function ControlledInput() {
        const [value, setValue] = useState('');
        
        return (
            <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
        );
        }\`}</code>
            </pre>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Controlled Input Example:</h3>
              <ControlledInput />
            </div>
          </section>

          {/* Section 2: Uncontrolled Components */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Uncontrolled Components</h2>
            <p>
              Uncontrolled components store their own state internally. You access the value using a
              ref.
            </p>

            <pre>
              <code>{\`function UncontrolledInput() {
        const inputRef = useRef(null);
        
        const handleSubmit = () => {
            console.log(inputRef.current.value);
        };
        
        return (
            <>
            <input ref={inputRef} defaultValue="Initial" />
            <button onClick={handleSubmit}>Submit</button>
            </>
        );
        }\`}</code>
            </pre>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Uncontrolled Input Example:</h3>
              <UncontrolledInput />
            </div>
          </section>

          {/* Section 3: Comparison */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Controlled vs Uncontrolled</h2>

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
                  background: 'var(--color-primary-100)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Controlled</h3>
                <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>✅ Pros:</p>
                <ul>
                  <li>Full control over value</li>
                  <li>Easy validation</li>
                  <li>Instant feedback</li>
                  <li>Conditional rendering</li>
                </ul>
                <p style={{ fontWeight: 'bold', marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  ❌ Cons:
                </p>
                <ul>
                  <li>More code</li>
                  <li>Re-renders on every keystroke</li>
                </ul>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-accent-100)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Uncontrolled</h3>
                <p style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>✅ Pros:</p>
                <ul>
                  <li>Less code</li>
                  <li>Better performance</li>
                  <li>Simpler for simple forms</li>
                </ul>
                <p style={{ fontWeight: 'bold', marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  ❌ Cons:
                </p>
                <ul>
                  <li>Less control</li>
                  <li>Harder validation</li>
                  <li>No instant feedback</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: When to Use Each */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>When to Use Each Pattern</h2>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                ✅ Use Controlled When:
              </h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  You need instant validation
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Conditional form fields
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Format input as user types
                </li>
                <li style={{ color: 'white' }}>Multiple inputs depend on each other</li>
              </ul>
            </div>

            <div
              style={{
                background: 'var(--color-info)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                💡 Use Uncontrolled When:
              </h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Simple form submission
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  File inputs (always uncontrolled)
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Integrating with non-React code
                </li>
                <li style={{ color: 'white' }}>Performance is critical</li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Controlled components: React manages the state</li>
              <li>Uncontrolled components: DOM manages the state</li>
              <li>Controlled gives more control, uncontrolled is simpler</li>
              <li>Use controlled for complex forms with validation</li>
              <li>Use uncontrolled for simple forms or file inputs</li>
              <li>In modern React, controlled is generally preferred</li>
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

// Example components

function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-3)',
        }}
      />
      <div
        style={{
          padding: 'var(--space-3)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Current Value:</strong> {value || '(empty)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          Value is controlled by React state
        </p>
      </div>
    </div>
  )
}

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [submittedValue, setSubmittedValue] = useState('')

  const handleSubmit = () => {
    if (inputRef.current) {
      setSubmittedValue(inputRef.current.value)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue="Initial value"
        placeholder="Type here..."
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--space-3)',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: 'var(--space-2) var(--space-4)',
          background: 'var(--color-primary-500)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          marginBottom: 'var(--space-3)',
        }}
      >
        Get Value
      </button>
      <div
        style={{
          padding: 'var(--space-3)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <p>
          <strong>Submitted Value:</strong> {submittedValue || '(click button to get value)'}
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
          Value is managed by the DOM, accessed via ref
        </p>
      </div>
    </div>
  )
}
`;function p(){const[r,o]=t.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"Controlled vs Uncontrolled Components"}),e.jsx("p",{children:"Learn the difference between controlled and uncontrolled components, and when to use each pattern for form inputs and other stateful elements."}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:r==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:r==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:r==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:r==="code"?"bold":"normal"},children:"Source Code"})]}),r==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Controlled Components"}),e.jsx("p",{children:"Controlled components have their state managed by React. The component's value is controlled by React state."}),e.jsx("pre",{children:e.jsx("code",{children:`function ControlledInput() {
        const [value, setValue] = useState('');
        
        return (
            <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
        );
        }`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Controlled Input Example:"}),e.jsx(i,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Uncontrolled Components"}),e.jsx("p",{children:"Uncontrolled components store their own state internally. You access the value using a ref."}),e.jsx("pre",{children:e.jsx("code",{children:`function UncontrolledInput() {
        const inputRef = useRef(null);
        
        const handleSubmit = () => {
            console.log(inputRef.current.value);
        };
        
        return (
            <>
            <input ref={inputRef} defaultValue="Initial" />
            <button onClick={handleSubmit}>Submit</button>
            </>
        );
        }`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Uncontrolled Input Example:"}),e.jsx(s,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Controlled vs Uncontrolled"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{children:"Controlled"}),e.jsx("p",{style:{fontWeight:"bold",marginBottom:"var(--space-2)"},children:"✅ Pros:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Full control over value"}),e.jsx("li",{children:"Easy validation"}),e.jsx("li",{children:"Instant feedback"}),e.jsx("li",{children:"Conditional rendering"})]}),e.jsx("p",{style:{fontWeight:"bold",marginTop:"var(--space-3)",marginBottom:"var(--space-2)"},children:"❌ Cons:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"More code"}),e.jsx("li",{children:"Re-renders on every keystroke"})]})]}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{children:"Uncontrolled"}),e.jsx("p",{style:{fontWeight:"bold",marginBottom:"var(--space-2)"},children:"✅ Pros:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Less code"}),e.jsx("li",{children:"Better performance"}),e.jsx("li",{children:"Simpler for simple forms"})]}),e.jsx("p",{style:{fontWeight:"bold",marginTop:"var(--space-3)",marginBottom:"var(--space-2)"},children:"❌ Cons:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Less control"}),e.jsx("li",{children:"Harder validation"}),e.jsx("li",{children:"No instant feedback"})]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"When to Use Each Pattern"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Use Controlled When:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"You need instant validation"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Conditional form fields"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Format input as user types"}),e.jsx("li",{style:{color:"white"},children:"Multiple inputs depend on each other"})]})]}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Use Uncontrolled When:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Simple form submission"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"File inputs (always uncontrolled)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Integrating with non-React code"}),e.jsx("li",{style:{color:"white"},children:"Performance is critical"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Controlled components: React manages the state"}),e.jsx("li",{children:"Uncontrolled components: DOM manages the state"}),e.jsx("li",{children:"Controlled gives more control, uncontrolled is simpler"}),e.jsx("li",{children:"Use controlled for complex forms with validation"}),e.jsx("li",{children:"Use uncontrolled for simple forms or file inputs"}),e.jsx("li",{children:"In modern React, controlled is generally preferred"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:l})})]})}function i(){const[r,o]=t.useState("");return e.jsxs("div",{children:[e.jsx("input",{type:"text",value:r,onChange:n=>o(n.target.value),placeholder:"Type here...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-3)"}}),e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Current Value:"})," ",r||"(empty)"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Value is controlled by React state"})]})]})}function s(){const r=t.useRef(null),[o,n]=t.useState(""),a=()=>{r.current&&n(r.current.value)};return e.jsxs("div",{children:[e.jsx("input",{ref:r,type:"text",defaultValue:"Initial value",placeholder:"Type here...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-3)"}}),e.jsx("button",{onClick:a,style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-3)"},children:"Get Value"}),e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Submitted Value:"})," ",o||"(click button to get value)"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Value is managed by the DOM, accessed via ref"})]})]})}export{p as default};
//# sourceMappingURL=ControlledUncontrolled-Uq2OK4Ms.js.map
