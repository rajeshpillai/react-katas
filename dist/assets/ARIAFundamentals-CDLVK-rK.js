import{r,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const a=`// @ts-ignore
import sourceCode from './ARIAFundamentals.tsx?raw'
import { useState } from 'react'

export default function ARIAFundamentals() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>ARIA Fundamentals</h1>
      <p>
        ARIA (Accessible Rich Internet Applications) attributes help make web applications
        accessible to people using assistive technologies. Learn the essentials!
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
          {/* Section 1: What is ARIA */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What is ARIA?</h2>
            <p>
              ARIA provides semantic meaning to elements that assistive technologies can understand.
            </p>

            <div
              style={{
                background: 'var(--color-info)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 ARIA Attributes:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Roles:</strong> Define element purpose (button, dialog, navigation)
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Properties:</strong> Describe characteristics (aria-label, aria-required)
                </li>
                <li style={{ color: 'white' }}>
                  <strong>States:</strong> Indicate current state (aria-expanded, aria-checked)
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Common ARIA Attributes */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Common ARIA Attributes</h2>

            <pre>
              <code>{\`// aria-label: Provides accessible name
    <button aria-label="Close dialog">×</button>
    
    // aria-labelledby: References another element for label
    <h2 id="dialog-title">Confirm Action</h2>
    <div role="dialog" aria-labelledby="dialog-title">...</div>
    
    // aria-describedby: Additional description
    <input
      aria-describedby="password-hint"
      type="password"
    />
    <span id="password-hint">Must be 8+ characters</span>
    
    // aria-hidden: Hide from screen readers
    <span aria-hidden="true">🎉</span>
    
    // aria-live: Announce dynamic content
    <div aria-live="polite">Loading...</div>\`}</code>
            </pre>
          </section>

          {/* Section 3: ARIA Roles */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>ARIA Roles</h2>

            <pre>
              <code>{\`// Landmark roles
    <nav role="navigation">...</nav>
    <main role="main">...</main>
    <aside role="complementary">...</aside>
    
    // Widget roles
    <div role="button" tabIndex={0}>Click me</div>
    <div role="dialog">...</div>
    <div role="alert">Error occurred!</div>
    
    // Document structure roles
    <div role="article">...</div>
    <div role="list">
      <div role="listitem">Item 1</div>
    </div>\`}</code>
            </pre>
          </section>

          {/* Section 4: ARIA States */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>ARIA States and Properties</h2>

            <pre>
              <code>{\`// Expanded/collapsed state
    <button
      aria-expanded={isOpen}
      aria-controls="menu"
    >
      Menu
    </button>
    
    // Checked state
    <div role="checkbox" aria-checked={isChecked}>
      Accept terms
    </div>
    
    // Disabled state
    <button aria-disabled="true">Submit</button>
    
    // Required field
    <input aria-required="true" />
    
    // Invalid input
    <input aria-invalid={hasError} />\`}</code>
            </pre>
          </section>

          {/* Section 5: Best Practices */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>ARIA Best Practices</h2>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Do's:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Use semantic HTML first (button, nav, main)
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Add ARIA only when HTML isn't enough
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Test with screen readers
                </li>
                <li style={{ color: 'white' }}>Keep ARIA attributes updated</li>
              </ul>
            </div>

            <div
              style={{
                background: 'var(--color-error)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Don'ts:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Don't use ARIA when HTML works
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Don't override semantic HTML
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Don't use role="button" on actual buttons
                </li>
                <li style={{ color: 'white' }}>Don't forget to update dynamic states</li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>ARIA makes web apps accessible to assistive technologies</li>
              <li>Use semantic HTML first, ARIA second</li>
              <li>Common attributes: aria-label, aria-labelledby, aria-describedby</li>
              <li>Roles define purpose, states indicate current condition</li>
              <li>Always test with screen readers</li>
              <li>Keep ARIA attributes in sync with component state</li>
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
`;function n(){const[t,i]=r.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"ARIA Fundamentals"}),e.jsx("p",{children:"ARIA (Accessible Rich Internet Applications) attributes help make web applications accessible to people using assistive technologies. Learn the essentials!"}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>i("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:t==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:t==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>i("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:t==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:t==="code"?"bold":"normal"},children:"Source Code"})]}),t==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is ARIA?"}),e.jsx("p",{children:"ARIA provides semantic meaning to elements that assistive technologies can understand."}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 ARIA Attributes:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Roles:"})," Define element purpose (button, dialog, navigation)"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Properties:"})," Describe characteristics (aria-label, aria-required)"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"States:"})," Indicate current state (aria-expanded, aria-checked)"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common ARIA Attributes"}),e.jsx("pre",{children:e.jsx("code",{children:`// aria-label: Provides accessible name
    <button aria-label="Close dialog">×</button>
    
    // aria-labelledby: References another element for label
    <h2 id="dialog-title">Confirm Action</h2>
    <div role="dialog" aria-labelledby="dialog-title">...</div>
    
    // aria-describedby: Additional description
    <input
      aria-describedby="password-hint"
      type="password"
    />
    <span id="password-hint">Must be 8+ characters</span>
    
    // aria-hidden: Hide from screen readers
    <span aria-hidden="true">🎉</span>
    
    // aria-live: Announce dynamic content
    <div aria-live="polite">Loading...</div>`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"ARIA Roles"}),e.jsx("pre",{children:e.jsx("code",{children:`// Landmark roles
    <nav role="navigation">...</nav>
    <main role="main">...</main>
    <aside role="complementary">...</aside>
    
    // Widget roles
    <div role="button" tabIndex={0}>Click me</div>
    <div role="dialog">...</div>
    <div role="alert">Error occurred!</div>
    
    // Document structure roles
    <div role="article">...</div>
    <div role="list">
      <div role="listitem">Item 1</div>
    </div>`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"ARIA States and Properties"}),e.jsx("pre",{children:e.jsx("code",{children:`// Expanded/collapsed state
    <button
      aria-expanded={isOpen}
      aria-controls="menu"
    >
      Menu
    </button>
    
    // Checked state
    <div role="checkbox" aria-checked={isChecked}>
      Accept terms
    </div>
    
    // Disabled state
    <button aria-disabled="true">Submit</button>
    
    // Required field
    <input aria-required="true" />
    
    // Invalid input
    <input aria-invalid={hasError} />`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"ARIA Best Practices"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Do's:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use semantic HTML first (button, nav, main)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Add ARIA only when HTML isn't enough"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Test with screen readers"}),e.jsx("li",{style:{color:"white"},children:"Keep ARIA attributes updated"})]})]}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Don'ts:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't use ARIA when HTML works"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't override semantic HTML"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:`Don't use role="button" on actual buttons`}),e.jsx("li",{style:{color:"white"},children:"Don't forget to update dynamic states"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"ARIA makes web apps accessible to assistive technologies"}),e.jsx("li",{children:"Use semantic HTML first, ARIA second"}),e.jsx("li",{children:"Common attributes: aria-label, aria-labelledby, aria-describedby"}),e.jsx("li",{children:"Roles define purpose, states indicate current condition"}),e.jsx("li",{children:"Always test with screen readers"}),e.jsx("li",{children:"Keep ARIA attributes in sync with component state"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:a})})]})}export{n as default};
//# sourceMappingURL=ARIAFundamentals-CDLVK-rK.js.map
