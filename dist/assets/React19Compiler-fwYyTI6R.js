import{r as o,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const t=`// @ts-ignore
import sourceCode from './React19Compiler.tsx?raw'
import { useState } from 'react'

export default function React19Compiler() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>React 19 Compiler</h1>
      <p>
        The React 19 Compiler automatically optimizes your components, reducing the need for manual
        memoization. This is a game-changer for React performance!
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
          {/* Section 1: What is the Compiler */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What is the React Compiler?</h2>
            <p>
              The React Compiler is a build-time optimization tool that automatically memoizes
              components and values, making your app faster without manual optimization.
            </p>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ What It Does:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Automatically memoizes components
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Optimizes value calculations
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Stabilizes object and array references
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Reduces unnecessary re-renders
                </li>
                <li style={{ color: 'white' }}>Works at build time - no runtime overhead!</li>
              </ul>
            </div>
          </section>

          {/* Section 2: How It Works */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>How the Compiler Works</h2>
            <p>
              The compiler analyzes your code and automatically inserts optimizations where beneficial.
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
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Your Code:</h3>
                <pre>
                  <code>{\`function Component({ items }) {
        const filtered = items.filter(
            item => item.active
        );
        
        return (
            <List items={filtered} />
        );
        }\`}</code>
                </pre>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--color-primary-100)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <h3>Compiler Output:</h3>
                <pre>
                  <code>{\`function Component({ items }) {
        // Compiler adds memoization
        const filtered = useMemo(
            () => items.filter(
            item => item.active
            ),
            [items]
        );
        
        return (
            <List items={filtered} />
        );
        }\`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Section 3: What You Don't Need Anymore */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What You Don't Need Anymore</h2>
            <p>
              With the compiler, many manual optimizations become unnecessary.
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                💡 Often Unnecessary:
              </h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <code>useMemo</code> for simple calculations
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <code>useCallback</code> for event handlers
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <code>React.memo</code> for most components
                </li>
                <li style={{ color: 'white' }}>Manual dependency arrays (compiler handles it!)</li>
              </ul>
            </div>
          </section>

          {/* Section 4: When Manual Optimization Still Helps */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>When to Still Use Manual Optimization</h2>
            <p>
              The compiler is smart, but some cases still benefit from manual optimization.
            </p>

            <div
              style={{
                background: 'var(--color-warning)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>
                ⚠️ Still Useful:
              </h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Very expensive calculations</strong> - Heavy data processing
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>External dependencies</strong> - Refs, DOM, third-party libraries
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Custom equality checks</strong> - Deep object comparisons
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Profiled bottlenecks</strong> - When profiling shows specific issues
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Enabling the Compiler */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Enabling the React Compiler</h2>
            <p>The compiler is opt-in and can be enabled in your build configuration.</p>

            <pre>
              <code>{\`// vite.config.ts
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';

        export default defineConfig({
        plugins: [
            react({
            babel: {
                plugins: [
                ['babel-plugin-react-compiler', {
                    // Compiler options
                    runtimeModule: 'react-compiler-runtime'
                }]
                ]
            }
            })
        ]
        });\`}</code>
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
              <p style={{ color: 'white', fontWeight: 'bold' }}>💡 Note:</p>
              <p style={{ color: 'white' }}>
                The React Compiler is still experimental in React 19. Check the official React
                documentation for the latest setup instructions and compatibility.
              </p>
            </div>
          </section>

          {/* Section 6: The New Mental Model */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>The New React 19 Mental Model</h2>

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
                ✅ Modern Approach:
              </h3>
              <ol style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Write clean code</strong> - Focus on readability
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Use composition</strong> - Primary optimization technique
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Let compiler optimize</strong> - Trust automatic optimizations
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Profile if slow</strong> - Measure actual performance
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Optimize selectively</strong> - Only when profiling shows need
                </li>
              </ol>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>React 19 Compiler automatically optimizes components</li>
              <li>Reduces need for manual useMemo, useCallback, React.memo</li>
              <li>Works at build time with no runtime overhead</li>
              <li>Still use manual optimization for expensive operations</li>
              <li>Focus on composition and clean code first</li>
              <li>Profile before optimizing - compiler handles most cases</li>
              <li>The future of React is automatic optimization!</li>
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
`;function s(){const[n,i]=o.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"React 19 Compiler"}),e.jsx("p",{children:"The React 19 Compiler automatically optimizes your components, reducing the need for manual memoization. This is a game-changer for React performance!"}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>i("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>i("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="code"?"bold":"normal"},children:"Source Code"})]}),n==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is the React Compiler?"}),e.jsx("p",{children:"The React Compiler is a build-time optimization tool that automatically memoizes components and values, making your app faster without manual optimization."}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ What It Does:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Automatically memoizes components"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Optimizes value calculations"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Stabilizes object and array references"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Reduces unnecessary re-renders"}),e.jsx("li",{style:{color:"white"},children:"Works at build time - no runtime overhead!"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"How the Compiler Works"}),e.jsx("p",{children:"The compiler analyzes your code and automatically inserts optimizations where beneficial."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-secondary)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{children:"Your Code:"}),e.jsx("pre",{children:e.jsx("code",{children:`function Component({ items }) {
        const filtered = items.filter(
            item => item.active
        );
        
        return (
            <List items={filtered} />
        );
        }`})})]}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{children:"Compiler Output:"}),e.jsx("pre",{children:e.jsx("code",{children:`function Component({ items }) {
        // Compiler adds memoization
        const filtered = useMemo(
            () => items.filter(
            item => item.active
            ),
            [items]
        );
        
        return (
            <List items={filtered} />
        );
        }`})})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What You Don't Need Anymore"}),e.jsx("p",{children:"With the compiler, many manual optimizations become unnecessary."}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Often Unnecessary:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("code",{children:"useMemo"})," for simple calculations"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("code",{children:"useCallback"})," for event handlers"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("code",{children:"React.memo"})," for most components"]}),e.jsx("li",{style:{color:"white"},children:"Manual dependency arrays (compiler handles it!)"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"When to Still Use Manual Optimization"}),e.jsx("p",{children:"The compiler is smart, but some cases still benefit from manual optimization."}),e.jsxs("div",{style:{background:"var(--color-warning)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"⚠️ Still Useful:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Very expensive calculations"})," - Heavy data processing"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"External dependencies"})," - Refs, DOM, third-party libraries"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Custom equality checks"})," - Deep object comparisons"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Profiled bottlenecks"})," - When profiling shows specific issues"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Enabling the React Compiler"}),e.jsx("p",{children:"The compiler is opt-in and can be enabled in your build configuration."}),e.jsx("pre",{children:e.jsx("code",{children:`// vite.config.ts
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';

        export default defineConfig({
        plugins: [
            react({
            babel: {
                plugins: [
                ['babel-plugin-react-compiler', {
                    // Compiler options
                    runtimeModule: 'react-compiler-runtime'
                }]
                ]
            }
            })
        ]
        });`})}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"💡 Note:"}),e.jsx("p",{style:{color:"white"},children:"The React Compiler is still experimental in React 19. Check the official React documentation for the latest setup instructions and compatibility."})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"The New React 19 Mental Model"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Modern Approach:"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Write clean code"})," - Focus on readability"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Use composition"})," - Primary optimization technique"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Let compiler optimize"})," - Trust automatic optimizations"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Profile if slow"})," - Measure actual performance"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Optimize selectively"})," - Only when profiling shows need"]})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"React 19 Compiler automatically optimizes components"}),e.jsx("li",{children:"Reduces need for manual useMemo, useCallback, React.memo"}),e.jsx("li",{children:"Works at build time with no runtime overhead"}),e.jsx("li",{children:"Still use manual optimization for expensive operations"}),e.jsx("li",{children:"Focus on composition and clean code first"}),e.jsx("li",{children:"Profile before optimizing - compiler handles most cases"}),e.jsx("li",{children:"The future of React is automatic optimization!"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:t})})]})}export{s as default};
//# sourceMappingURL=React19Compiler-fwYyTI6R.js.map
