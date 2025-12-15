import{r,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";const t=`// @ts-ignore
import sourceCode from './ProfilingDebugging.tsx?raw'
import { useState } from 'react'

export default function ProfilingDebugging() {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

  return (
    <div>
      <h1>Profiling & Debugging</h1>
      <p>
        Learn how to identify and fix performance issues using React DevTools Profiler and other
        debugging techniques.
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
          {/* Section 1: React DevTools Profiler */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>React DevTools Profiler</h2>
            <p>
              The Profiler records component render times and helps identify performance bottlenecks.
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
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>📊 How to Use:</h3>
              <ol style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Install React DevTools browser extension
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Open DevTools → Profiler tab
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Click record button
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Interact with your app
                </li>
                <li style={{ color: 'white' }}>Stop recording and analyze results</li>
              </ol>
            </div>
          </section>

          {/* Section 2: What to Look For */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>What to Look For</h2>

            <div
              style={{
                background: 'var(--color-warning)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>⚠️ Red Flags:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Long render times</strong> - Components taking &gt;16ms
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Frequent re-renders</strong> - Same component rendering many times
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Unnecessary renders</strong> - Components rendering without prop changes
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Large component trees</strong> - Deep nesting causing cascading renders
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Console Debugging */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Console Debugging Techniques</h2>
            <p>Use console logs to track renders and identify issues.</p>

            <pre>
              <code>{\`function Component({ value }) {
        // Track renders
        console.log('Component rendered with:', value);
        
        // Track effect runs
        useEffect(() => {
            console.log('Effect ran');
            return () => console.log('Effect cleanup');
        }, [value]);
        
        // Track why component rendered
        useEffect(() => {
            console.log('Value changed from', prevValue, 'to', value);
        });
        
        return <div>{value}</div>;
        }\`}</code>
            </pre>
          </section>

          {/* Section 4: Why Did You Render */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Custom useWhyDidYouUpdate Hook</h2>
            <p>Track which props caused a re-render.</p>

            <pre>
              <code>{\`function useWhyDidYouUpdate(name, props) {
        const previousProps = useRef();
        
        useEffect(() => {
            if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changedProps = {};
            
            allKeys.forEach(key => {
                if (previousProps.current[key] !== props[key]) {
                changedProps[key] = {
                    from: previousProps.current[key],
                    to: props[key]
                };
                }
            });
            
            if (Object.keys(changedProps).length > 0) {
                console.log('[why-did-you-update]', name, changedProps);
            }
            }
            
            previousProps.current = props;
        });
        }

        // Usage
        function Component(props) {
        useWhyDidYouUpdate('Component', props);
        return <div>{props.value}</div>;
        }\`}</code>
            </pre>
          </section>

          {/* Section 5: Performance Checklist */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Performance Optimization Checklist</h2>

            <div
              style={{
                background: 'var(--color-success)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Optimization Steps:</h3>
              <ol style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Profile first</strong> - Measure before optimizing
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Use composition</strong> - Primary optimization technique
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Colocate state</strong> - Keep state close to where it's used
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Code split</strong> - Lazy load heavy components
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Optimize context</strong> - Split providers, memoize values
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  <strong>Use memo selectively</strong> - Only for expensive components
                </li>
                <li style={{ color: 'white' }}>
                  <strong>Profile again</strong> - Verify improvements
                </li>
              </ol>
            </div>
          </section>

          {/* Section 6: Common Mistakes */}
          <section style={{ marginBottom: 'var(--space-8)' }}>
            <h2>Common Performance Mistakes</h2>

            <div
              style={{
                background: 'var(--color-error)',
                color: 'white',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'var(--space-4)',
              }}
            >
              <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>❌ Avoid These:</h3>
              <ul style={{ paddingLeft: 'var(--space-6)' }}>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Creating objects/arrays in render
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Inline function definitions in JSX
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Lifting state too high
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Not using keys in lists
                </li>
                <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                  Premature optimization
                </li>
                <li style={{ color: 'white' }}>Over-memoization</li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Use React DevTools Profiler to identify bottlenecks</li>
              <li>Look for long render times and unnecessary re-renders</li>
              <li>Console logging helps track renders and effects</li>
              <li>Create custom hooks to debug prop changes</li>
              <li>Always profile before and after optimizations</li>
              <li>Follow the optimization checklist systematically</li>
              <li>Avoid common mistakes like creating objects in render</li>
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
`;function a(){const[n,o]=r.useState("demo");return e.jsxs("div",{children:[e.jsx("h1",{children:"Profiling & Debugging"}),e.jsx("p",{children:"Learn how to identify and fix performance issues using React DevTools Profiler and other debugging techniques."}),e.jsxs("div",{style:{marginBottom:20,borderBottom:"1px solid var(--border-color)"},children:[e.jsx("button",{onClick:()=>o("demo"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="demo"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="demo"?"bold":"normal"},children:"Lesson"}),e.jsx("button",{onClick:()=>o("code"),style:{padding:"10px 20px",background:"transparent",border:"none",borderBottom:n==="code"?"2px solid var(--color-primary-500)":"2px solid transparent",cursor:"pointer",fontWeight:n==="code"?"bold":"normal"},children:"Source Code"})]}),n==="demo"?e.jsxs(e.Fragment,{children:[e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React DevTools Profiler"}),e.jsx("p",{children:"The Profiler records component render times and helps identify performance bottlenecks."}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"📊 How to Use:"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Install React DevTools browser extension"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Open DevTools → Profiler tab"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Click record button"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Interact with your app"}),e.jsx("li",{style:{color:"white"},children:"Stop recording and analyze results"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What to Look For"}),e.jsxs("div",{style:{background:"var(--color-warning)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"⚠️ Red Flags:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Long render times"})," - Components taking >16ms"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Frequent re-renders"})," - Same component rendering many times"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Unnecessary renders"})," - Components rendering without prop changes"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Large component trees"})," - Deep nesting causing cascading renders"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Console Debugging Techniques"}),e.jsx("p",{children:"Use console logs to track renders and identify issues."}),e.jsx("pre",{children:e.jsx("code",{children:`function Component({ value }) {
        // Track renders
        console.log('Component rendered with:', value);
        
        // Track effect runs
        useEffect(() => {
            console.log('Effect ran');
            return () => console.log('Effect cleanup');
        }, [value]);
        
        // Track why component rendered
        useEffect(() => {
            console.log('Value changed from', prevValue, 'to', value);
        });
        
        return <div>{value}</div>;
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Custom useWhyDidYouUpdate Hook"}),e.jsx("p",{children:"Track which props caused a re-render."}),e.jsx("pre",{children:e.jsx("code",{children:`function useWhyDidYouUpdate(name, props) {
        const previousProps = useRef();
        
        useEffect(() => {
            if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changedProps = {};
            
            allKeys.forEach(key => {
                if (previousProps.current[key] !== props[key]) {
                changedProps[key] = {
                    from: previousProps.current[key],
                    to: props[key]
                };
                }
            });
            
            if (Object.keys(changedProps).length > 0) {
                console.log('[why-did-you-update]', name, changedProps);
            }
            }
            
            previousProps.current = props;
        });
        }

        // Usage
        function Component(props) {
        useWhyDidYouUpdate('Component', props);
        return <div>{props.value}</div>;
        }`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Performance Optimization Checklist"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Optimization Steps:"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Profile first"})," - Measure before optimizing"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Use composition"})," - Primary optimization technique"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Colocate state"})," - Keep state close to where it's used"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Code split"})," - Lazy load heavy components"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Optimize context"})," - Split providers, memoize values"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Use memo selectively"})," - Only for expensive components"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Profile again"})," - Verify improvements"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common Performance Mistakes"}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Avoid These:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Creating objects/arrays in render"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Inline function definitions in JSX"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Lifting state too high"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Not using keys in lists"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Premature optimization"}),e.jsx("li",{style:{color:"white"},children:"Over-memoization"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use React DevTools Profiler to identify bottlenecks"}),e.jsx("li",{children:"Look for long render times and unnecessary re-renders"}),e.jsx("li",{children:"Console logging helps track renders and effects"}),e.jsx("li",{children:"Create custom hooks to debug prop changes"}),e.jsx("li",{children:"Always profile before and after optimizations"}),e.jsx("li",{children:"Follow the optimization checklist systematically"}),e.jsx("li",{children:"Avoid common mistakes like creating objects in render"})]})]})]}):e.jsx("pre",{style:{padding:20,background:"var(--bg-secondary)",borderRadius:8,overflow:"auto",fontSize:14},children:e.jsx("code",{children:t})})]})}export{a as default};
//# sourceMappingURL=ProfilingDebugging-hFxMPsV-.js.map
