import{j as e,r as t}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function j(){return e.jsxs("div",{children:[e.jsx("h1",{children:"useRef Hook"}),e.jsxs("p",{children:["The ",e.jsx("code",{children:"useRef"})," hook lets you reference values that don't trigger re-renders when changed. It's perfect for accessing DOM elements and storing mutable values."]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is useRef?"}),e.jsxs("p",{children:[e.jsx("code",{children:"useRef"})," returns a mutable object with a ",e.jsx("code",{children:".current"})," property that persists across renders."]}),e.jsx("pre",{children:e.jsx("code",{children:`const ref = useRef(initialValue);

// Access the value
console.log(ref.current);

// Update the value (doesn't cause re-render!)
ref.current = newValue;`})}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"💡 Key Difference:"}),e.jsxs("p",{style:{color:"white"},children:["Changing ",e.jsx("code",{children:"ref.current"})," does NOT trigger a re-render, unlike"," ",e.jsx("code",{children:"setState"}),"!"]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Use Case 1: Accessing DOM Elements"}),e.jsx("p",{children:"The most common use - directly access and manipulate DOM elements."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Focus Input Example:"}),e.jsx(u,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFocus = () => {
    // Access the DOM element directly
    inputRef.current?.focus();
  };
  
  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Use Case 2: Storing Mutable Values"}),e.jsx("p",{children:"Use refs to store values that change but shouldn't trigger re-renders (timers, previous values, etc.)"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Render Counter:"}),e.jsx(p,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function RenderCounter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  
  // Increment on every render (doesn't cause re-render)
  renderCount.current += 1;
  
  return (
    <div>
      <p>State: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Use Case 3: Tracking Previous Values"}),e.jsx("p",{children:"Store the previous value of state or props using refs."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Previous Value Tracker:"}),e.jsx(h,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  
  useEffect(() => {
    // Update previous value after render
    prevCountRef.current = count;
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Use Case 4: Managing Timers"}),e.jsx("p",{children:"Store timer IDs in refs so you can clear them from any function."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Stopwatch:"}),e.jsx(v,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const start = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };
  
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  return (
    <>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Use Case 5: Scrolling to Elements"}),e.jsx("p",{children:"Use refs to programmatically scroll to specific elements."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Scroll Example:"}),e.jsx(g,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function ScrollToElement() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  return (
    <>
      <button onClick={scrollToTarget}>Scroll to Target</button>
      {/* ... lots of content ... */}
      <div ref={targetRef}>Target Element</div>
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"useRef vs useState"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{style:{color:"var(--color-primary-700)"},children:"useState"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Triggers re-render when updated"}),e.jsx("li",{children:"Use for UI data"}),e.jsx("li",{children:"Asynchronous updates"}),e.jsx("li",{children:"Immutable update pattern"})]}),e.jsx("pre",{style:{marginTop:"var(--space-3)"},children:e.jsx("code",{children:`const [count, setCount] = useState(0);
setCount(count + 1); // Re-renders`})})]}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{style:{color:"var(--color-accent-700)"},children:"useRef"}),e.jsxs("ul",{children:[e.jsx("li",{children:"No re-render when updated"}),e.jsx("li",{children:"Use for non-UI data"}),e.jsx("li",{children:"Synchronous updates"}),e.jsx("li",{children:"Mutable .current property"})]}),e.jsx("pre",{style:{marginTop:"var(--space-3)"},children:e.jsx("code",{children:`const countRef = useRef(0);
countRef.current += 1; // No re-render`})})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common Patterns"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ When to Use useRef"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Accessing DOM elements (focus, scroll, measure)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Storing timer/interval IDs"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Tracking previous values"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Storing mutable values that don't affect rendering"}),e.jsx("li",{style:{color:"white"},children:"Avoiding re-renders for internal state"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"useRef"})," creates a mutable object that persists across renders"]}),e.jsxs("li",{children:["Changing ",e.jsx("code",{children:"ref.current"})," doesn't trigger re-renders"]}),e.jsx("li",{children:"Perfect for accessing DOM elements with the ref attribute"}),e.jsx("li",{children:"Use refs for values that change but don't affect the UI"}),e.jsx("li",{children:"Common uses: DOM access, timers, previous values, instance variables"}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"useState"})," for UI data, ",e.jsx("code",{children:"useRef"})," for everything else"]})]})]})]})}function u(){const s=t.useRef(null),n=()=>{var r;(r=s.current)==null||r.focus()};return e.jsxs("div",{children:[e.jsx("input",{ref:s,type:"text",placeholder:"Click button to focus me",style:{padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginRight:"var(--space-2)"}}),e.jsx("button",{onClick:n,style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Focus Input"})]})}function p(){const[s,n]=t.useState(0),r=t.useRef(0);return r.current+=1,e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"State Count:"})," ",s]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Render Count:"})," ",r.current]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Notice: Render count increases without causing additional renders!"}),e.jsx("button",{onClick:()=>n(s+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginTop:"var(--space-3)"},children:"Increment State"})]})}function h(){const[s,n]=t.useState(0),r=t.useRef(0);return t.useEffect(()=>{r.current=s},[s]),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Current:"})," ",s]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Previous:"})," ",r.current]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"The previous value is stored in a ref and updated after each render"}),e.jsx("button",{onClick:()=>n(s+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginTop:"var(--space-3)"},children:"Increment"})]})}function v(){const[s,n]=t.useState(0),[r,a]=t.useState(!1),o=t.useRef(null),c=()=>{o.current||(a(!0),o.current=window.setInterval(()=>{n(l=>l+1)},1e3))},i=()=>{o.current&&(clearInterval(o.current),o.current=null,a(!1))},d=()=>{i(),n(0)};return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("div",{style:{fontSize:"var(--font-size-3xl)",fontWeight:"bold",color:"var(--color-primary-600)",marginBottom:"var(--space-4)",textAlign:"center"},children:[s,"s"]}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)"},children:[e.jsx("button",{onClick:c,disabled:r,style:{padding:"var(--space-2) var(--space-4)",background:r?"var(--color-gray-400)":"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:r?"not-allowed":"pointer"},children:"Start"}),e.jsx("button",{onClick:i,disabled:!r,style:{padding:"var(--space-2) var(--space-4)",background:r?"var(--color-error)":"var(--color-gray-400)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:r?"pointer":"not-allowed"},children:"Stop"}),e.jsx("button",{onClick:d,style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-gray-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Reset"})]})]})}function g(){const s=t.useRef(null),n=t.useRef(null),r=t.useRef(null),a=o=>{var c;(c=o.current)==null||c.scrollIntoView({behavior:"smooth",block:"center"})};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)",marginBottom:"var(--space-4)"},children:[e.jsx("button",{onClick:()=>a(s),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Scroll to Top"}),e.jsx("button",{onClick:()=>a(n),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Scroll to Middle"}),e.jsx("button",{onClick:()=>a(r),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Scroll to Bottom"})]}),e.jsxs("div",{style:{maxHeight:"300px",overflow:"auto",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",padding:"var(--space-4)"},children:[e.jsxs("div",{ref:s,style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsx("strong",{children:"Top Section"}),e.jsx("p",{children:"This is the top of the scrollable area"})]}),e.jsx("div",{style:{height:"200px",background:"var(--bg-tertiary)",marginBottom:"var(--space-4)"},children:e.jsx("p",{style:{padding:"var(--space-4)"},children:"Spacer content..."})}),e.jsxs("div",{ref:n,style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsx("strong",{children:"Middle Section"}),e.jsx("p",{children:"This is the middle of the scrollable area"})]}),e.jsx("div",{style:{height:"200px",background:"var(--bg-tertiary)",marginBottom:"var(--space-4)"},children:e.jsx("p",{style:{padding:"var(--space-4)"},children:"More spacer content..."})}),e.jsxs("div",{ref:r,style:{padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsx("strong",{style:{color:"white"},children:"Bottom Section"}),e.jsx("p",{style:{color:"white"},children:"This is the bottom of the scrollable area"})]})]})]})}export{j as default};
//# sourceMappingURL=UseRef-Drpdb6TU.js.map
