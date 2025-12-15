const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HeavyComponent-DXrdi08f.js","assets/index-C8jGRvk-.js","assets/react-vendor-CVzL7Oab.js","assets/index-CEd8KO9b.css","assets/AnotherComponent-D5VTS1_9.js"])))=>i.map(i=>d[i]);
import{r as n,j as e,_ as i}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const c=`import { lazy, Suspense, useState } from 'react'

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const AnotherComponent = lazy(() => import('./AnotherComponent'))

// @ts-ignore
import sourceCode from './CodeSplitting.tsx?raw'

export default function CodeSplitting() {
  const [showHeavy, setShowHeavy] = useState(false)
  const [showAnother, setShowAnother] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Code Splitting</h1>
      <p>
        Code splitting breaks your bundle into smaller chunks that load on demand. This reduces
        initial load time and improves performance.
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
          {/* Section 1: Why Code Split */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Why Code Splitting?</h2>
            <p>Without code splitting, users download your entire app upfront, even code they may never use.</p>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Benefits:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Faster initial page load
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Load code only when needed
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Better caching (unchanged chunks stay cached)
                </li>
                <li style={{ color: 'white' }}>Improved user experience</li>
              </ul>
            </div>
          </section>

          {/* Section 2: React.lazy */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>React.lazy() - Component Lazy Loading</h2>
            <p>
              Use <code>React.lazy()</code> to dynamically import components.
            </p>

            <pre>
              <code>{\`import { lazy, Suspense } from 'react';

        // Lazy load the component
        const HeavyComponent = lazy(() => import('./HeavyComponent'));

        function App() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
            </Suspense>
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
              <h3>Try it:</h3>
              <button
                onClick={() => setShowHeavy(!showHeavy)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-primary-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {showHeavy ? 'Hide' : 'Load'} Heavy Component
              </button>

              {showHeavy && (
                <Suspense fallback={<LoadingFallback />}>
                  <HeavyComponent />
                </Suspense>
              )}
            </div>
          </section>

          {/* Section 3: Route-based Splitting */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Route-Based Code Splitting</h2>
            <p>Split code by routes - the most common pattern.</p>

            <pre>
              <code>{\`import { lazy, Suspense } from 'react';
        import { BrowserRouter, Routes, Route } from 'react-router-dom';

        // Lazy load route components
        const Home = lazy(() => import('./pages/Home'));
        const About = lazy(() => import('./pages/About'));
        const Dashboard = lazy(() => import('./pages/Dashboard'));

        function App() {
        return (
            <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
            </BrowserRouter>
        );
        }\`}</code>
            </pre>
          </section>

          {/* Section 4: Suspense */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Suspense - Loading States</h2>
            <p>
              <code>Suspense</code> shows a fallback while lazy components load.
            </p>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3>Multiple Lazy Components:</h3>
              <button
                onClick={() => setShowAnother(!showAnother)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-accent-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {showAnother ? 'Hide' : 'Load'} Another Component
              </button>

              {showAnother && (
                <Suspense fallback={<LoadingFallback />}>
                  <AnotherComponent />
                </Suspense>
              )}

              <pre style={{ marginTop: 'var(--space-4)' }}>
                <code>{\`// Nested Suspense boundaries
        <Suspense fallback={<PageLoader />}>
        <Header />
        <Suspense fallback={<SidebarLoader />}>
            <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentLoader />}>
            <Content />
        </Suspense>
        </Suspense>\`}</code>
              </pre>
            </div>
          </section>

          {/* Section 5: Best Practices */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Best Practices</h2>

            <div
              style={{
                background: 'var(--color-info)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 When to Split:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Routes</strong> - Different pages
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Modals/Dialogs</strong> - Shown conditionally
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Tabs</strong> - Content not immediately visible
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Heavy libraries</strong> - Charts, editors, etc.
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Admin features</strong> - Used by few users
                </li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>
                Code splitting reduces initial bundle size
              </li>
              <li>
                Use <code>React.lazy()</code> for dynamic imports
              </li>
              <li>
                Wrap lazy components in <code>Suspense</code>
              </li>
              <li>Route-based splitting is the most common pattern</li>
              <li>Split code for modals, tabs, and heavy features</li>
              <li>Provide good loading states with Suspense fallbacks</li>
              <li>Vite automatically code-splits lazy imports</li>
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

function LoadingFallback() {
  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--color-info)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
      }}
    >
      <p style={{ color: 'white' }}>⏳ Loading component...</p>
    </div>
  )
}
`,p=n.lazy(()=>i(()=>import("./HeavyComponent-DXrdi08f.js"),__vite__mapDeps([0,1,2,3]))),m=n.lazy(()=>i(()=>import("./AnotherComponent-D5VTS1_9.js"),__vite__mapDeps([4,1,2,3])));function g(){const[t,l]=n.useState(!1),[r,d]=n.useState(!1),[o,a]=n.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"Code Splitting"}),e.jsx("p",{children:"Code splitting breaks your bundle into smaller chunks that load on demand. This reduces initial load time and improves performance."}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>a("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:o==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:o==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>a("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:o==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:o==="code"?"bold":"normal"},children:"Source Code"})]}),o==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Why Code Splitting?"}),e.jsx("p",{children:"Without code splitting, users download your entire app upfront, even code they may never use."}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Benefits:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Faster initial page load"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Load code only when needed"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Better caching (unchanged chunks stay cached)"}),e.jsx("li",{style:{color:"white"},children:"Improved user experience"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React.lazy() - Component Lazy Loading"}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"React.lazy()"})," to dynamically import components."]}),e.jsx("pre",{children:e.jsx("code",{children:`import { lazy, Suspense } from 'react';

        // Lazy load the component
        const HeavyComponent = lazy(() => import('./HeavyComponent'));

        function App() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
            </Suspense>
        );
        }`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Try it:"}),e.jsxs("button",{onClick:()=>l(!t),style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:[t?"Hide":"Load"," Heavy Component"]}),t&&e.jsx(n.Suspense,{fallback:e.jsx(s,{}),children:e.jsx(p,{})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Route-Based Code Splitting"}),e.jsx("p",{children:"Split code by routes - the most common pattern."}),e.jsx("pre",{children:e.jsx("code",{children:`import { lazy, Suspense } from 'react';
        import { BrowserRouter, Routes, Route } from 'react-router-dom';

        // Lazy load route components
        const Home = lazy(() => import('./pages/Home'));
        const About = lazy(() => import('./pages/About'));
        const Dashboard = lazy(() => import('./pages/Dashboard'));

        function App() {
        return (
            <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
            </BrowserRouter>
        );
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Suspense - Loading States"}),e.jsxs("p",{children:[e.jsx("code",{children:"Suspense"})," shows a fallback while lazy components load."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Multiple Lazy Components:"}),e.jsxs("button",{onClick:()=>d(!r),style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:[r?"Hide":"Load"," Another Component"]}),r&&e.jsx(n.Suspense,{fallback:e.jsx(s,{}),children:e.jsx(m,{})}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`// Nested Suspense boundaries
        <Suspense fallback={<PageLoader />}>
        <Header />
        <Suspense fallback={<SidebarLoader />}>
            <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentLoader />}>
            <Content />
        </Suspense>
        </Suspense>`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Best Practices"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 When to Split:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Routes"})," - Different pages"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Modals/Dialogs"})," - Shown conditionally"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Tabs"})," - Content not immediately visible"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Heavy libraries"})," - Charts, editors, etc."]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Admin features"})," - Used by few users"]})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Code splitting reduces initial bundle size"}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"React.lazy()"})," for dynamic imports"]}),e.jsxs("li",{children:["Wrap lazy components in ",e.jsx("code",{children:"Suspense"})]}),e.jsx("li",{children:"Route-based splitting is the most common pattern"}),e.jsx("li",{children:"Split code for modals, tabs, and heavy features"}),e.jsx("li",{children:"Provide good loading states with Suspense fallbacks"}),e.jsx("li",{children:"Vite automatically code-splits lazy imports"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:c})})]})}function s(){return e.jsx("div",{style:{padding:"var(--space-4)",background:"var(--color-info)",color:"white",borderRadius:"var(--radius-md)",textAlign:"center"},children:e.jsx("p",{style:{color:"white"},children:"⏳ Loading component..."})})}export{g as default};
//# sourceMappingURL=CodeSplitting-7bOpQH-K.js.map
