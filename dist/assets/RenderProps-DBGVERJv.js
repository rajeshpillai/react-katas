import{r as a,j as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const t=`import { useState } from 'react'

// @ts-ignore
import sourceCode from './RenderProps.tsx?raw'

export default function RenderProps() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Render Props</h1>
      <p>
        Render props is a pattern where a component takes a function as a prop and calls it to
        render content. It's a powerful way to share code between components.
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
          {/* Section 1: What are Render Props */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What are Render Props?</h2>
            <p>
              A component with a render prop takes a function that returns a React element and calls it
              instead of implementing its own render logic.
            </p>

            <pre>
              <code>{\`<DataFetcher
        url="/api/users"
        render={(data, loading) => (
            loading ? <Spinner /> : <UserList users={data} />
        )}
        />\`}</code>
            </pre>
          </section>

          {/* Section 2: Example - Mouse Tracker */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Example: Mouse Position Tracker</h2>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Interactive Demo:</h3>
              <MouseTracker
                render={(x, y) => (
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--color-primary-100)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <p>
                      <strong>Mouse Position:</strong> X: {x}, Y: {y}
                    </p>
                  </div>
                )}
              />

              <pre style={{ marginTop: 'var(--space-4)' }}>
                <code>{\`function MouseTracker({ render }) {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        return (
            <div onMouseMove={handleMouseMove}>
            {render(position.x, position.y)}
            </div>
        );
        }

        // Usage
        <MouseTracker
        render={(x, y) => (
            <div>Mouse: {x}, {y}</div>
        )}
        />\`}</code>
              </pre>
            </div>
          </section>

          {/* Section 3: Children as Function */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Children as a Function</h2>
            <p>
              The <code>children</code> prop can also be a function - this is a common variation of the
              render props pattern.
            </p>

            <pre>
              <code>{\`<Toggle>
        {(on, toggle) => (
            <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
            </button>
        )}
        </Toggle>\`}</code>
            </pre>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Toggle Example:</h3>
              <Toggle>
                {(on, toggle) => (
                  <button
                    onClick={toggle}
                    style={{
                      padding: 'var(--space-3) var(--space-6)',
                      background: on ? 'var(--color-success)' : 'var(--color-gray-500)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    {on ? 'ON' : 'OFF'}
                  </button>
                )}
              </Toggle>
            </div>
          </section>

          {/* Section 4: Render Props vs Hooks */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Render Props vs Custom Hooks</h2>
            <p>
              In modern React, custom hooks often replace render props for sharing logic. However,
              render props are still useful for UI composition.
            </p>

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
                  background: 'var(--color-accent-100)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Render Props</h3>
                <pre>
                  <code>{\`<MouseTracker
        render={(x, y) => (
            <div>{x}, {y}</div>
        )}
        />\`}</code>
                </pre>
                <p style={{ marginTop: 'var(--space-3)' }}>Good for UI composition</p>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-primary-100)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Custom Hook</h3>
                <pre>
                  <code>{\`const { x, y } = useMousePosition();

        return <div>{x}, {y}</div>;\`}</code>
                </pre>
                <p style={{ marginTop: 'var(--space-3)' }}>Good for logic reuse</p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Render props share code by passing a function as a prop</li>
              <li>
                <code>children</code> can be a function (common variation)
              </li>
              <li>Great for UI composition and flexible rendering</li>
              <li>Custom hooks often replace render props for logic sharing</li>
              <li>Still useful when you need control over rendering</li>
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

function MouseTracker({ render }: { render: (x: number, y: number) => React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }

  return <div onMouseMove={handleMouseMove}>{render(position.x, position.y)}</div>
}

function Toggle({ children }: { children: (on: boolean, toggle: () => void) => React.ReactNode }) {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(!on)

  return <div>{children(on, toggle)}</div>
}
`;function u(){const[e,o]=a.useState("demo");return n.jsxs("div",{children:[n.jsx("h1",{children:"Render Props"}),n.jsx("p",{children:"Render props is a pattern where a component takes a function as a prop and calls it to render content. It's a powerful way to share code between components."}),n.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[n.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="demo"?"bold":"normal"},children:"Lesson"}),n.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:e==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:e==="code"?"bold":"normal"},children:"Source Code"})]}),e==="demo"?n.jsxs(n.Fragment,{children:[n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"What are Render Props?"}),n.jsx("p",{children:"A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic."}),n.jsx("pre",{children:n.jsx("code",{children:`<DataFetcher
        url="/api/users"
        render={(data, loading) => (
            loading ? <Spinner /> : <UserList users={data} />
        )}
        />`})})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Example: Mouse Position Tracker"}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Interactive Demo:"}),n.jsx(d,{render:(r,s)=>n.jsx("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)"},children:n.jsxs("p",{children:[n.jsx("strong",{children:"Mouse Position:"})," X: ",r,", Y: ",s]})})}),n.jsx("pre",{style:{marginTop:"var(--space-4)"},children:n.jsx("code",{children:`function MouseTracker({ render }) {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        return (
            <div onMouseMove={handleMouseMove}>
            {render(position.x, position.y)}
            </div>
        );
        }

        // Usage
        <MouseTracker
        render={(x, y) => (
            <div>Mouse: {x}, {y}</div>
        )}
        />`})})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Children as a Function"}),n.jsxs("p",{children:["The ",n.jsx("code",{children:"children"})," prop can also be a function - this is a common variation of the render props pattern."]}),n.jsx("pre",{children:n.jsx("code",{children:`<Toggle>
        {(on, toggle) => (
            <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
            </button>
        )}
        </Toggle>`})}),n.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[n.jsx("h3",{children:"Toggle Example:"}),n.jsx(c,{children:(r,s)=>n.jsx("button",{onClick:s,style:{padding:"var(--space-3) var(--space-6)",background:r?"var(--color-success)":"var(--color-gray-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:r?"ON":"OFF"})})]})]}),n.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[n.jsx("h2",{children:"Render Props vs Custom Hooks"}),n.jsx("p",{children:"In modern React, custom hooks often replace render props for sharing logic. However, render props are still useful for UI composition."}),n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{children:"Render Props"}),n.jsx("pre",{children:n.jsx("code",{children:`<MouseTracker
        render={(x, y) => (
            <div>{x}, {y}</div>
        )}
        />`})}),n.jsx("p",{style:{marginTop:"var(--space-3)"},children:"Good for UI composition"})]}),n.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-lg)"},children:[n.jsx("h3",{children:"Custom Hook"}),n.jsx("pre",{children:n.jsx("code",{children:`const { x, y } = useMousePosition();

        return <div>{x}, {y}</div>;`})}),n.jsx("p",{style:{marginTop:"var(--space-3)"},children:"Good for logic reuse"})]})]})]}),n.jsxs("section",{children:[n.jsx("h2",{children:"Key Takeaways"}),n.jsxs("ul",{children:[n.jsx("li",{children:"Render props share code by passing a function as a prop"}),n.jsxs("li",{children:[n.jsx("code",{children:"children"})," can be a function (common variation)"]}),n.jsx("li",{children:"Great for UI composition and flexible rendering"}),n.jsx("li",{children:"Custom hooks often replace render props for logic sharing"}),n.jsx("li",{children:"Still useful when you need control over rendering"})]})]})]}):n.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:n.jsx("code",{children:t})})]})}function d({render:e}){const[o,r]=a.useState({x:0,y:0}),s=i=>{r({x:i.clientX,y:i.clientY})};return n.jsx("div",{onMouseMove:s,children:e(o.x,o.y)})}function c({children:e}){const[o,r]=a.useState(!1),s=()=>r(!o);return n.jsx("div",{children:e(o,s)})}export{u as default};
//# sourceMappingURL=RenderProps-DBGVERJv.js.map
