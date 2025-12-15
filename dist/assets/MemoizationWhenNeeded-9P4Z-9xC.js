import{j as e,r as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function b(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Memoization (When You Need It)"}),e.jsxs("p",{children:["In React 19, the ",e.jsx("strong",{children:"React Compiler"})," automatically optimizes most components. Manual memoization with ",e.jsx("code",{children:"useMemo"})," and ",e.jsx("code",{children:"useCallback"})," is now optional in many cases!"]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React 19 & The Compiler"}),e.jsx("p",{children:"React 19 introduces an automatic compiler that memoizes components and values behind the scenes. This means:"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ What's Automatic:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Component re-renders are optimized automatically"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Simple calculations are memoized by the compiler"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Object and array references are stable when possible"}),e.jsx("li",{style:{color:"white"},children:"Most cases don't need manual memoization!"})]})]}),e.jsxs("div",{style:{background:"var(--color-warning)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"⚠️ When You Still Need Manual Memoization:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Expensive computations (heavy calculations, large data processing)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Referential equality for dependencies (useEffect, custom hooks)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Preventing unnecessary child re-renders in large lists"}),e.jsx("li",{style:{color:"white"},children:"When profiling shows a performance issue"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"useMemo - Memoizing Values"}),e.jsxs("p",{children:[e.jsx("code",{children:"useMemo"})," caches the result of a calculation between re-renders. Use it for expensive computations."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Expensive Calculation Example:"}),e.jsx(p,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // ❌ Without useMemo: runs on every render
  // const result = expensiveOperation(count);

  // ✅ With useMemo: only runs when count changes
  const result = useMemo(() => {
    console.log('Computing...');
    return expensiveOperation(count);
  }, [count]); // Only recompute when count changes

  return (
    <>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"useCallback - Memoizing Functions"}),e.jsxs("p",{children:[e.jsx("code",{children:"useCallback"})," returns a memoized callback function. Useful when passing callbacks to optimized child components."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Callback Example:"}),e.jsx(m,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ Without useCallback: new function on every render
  // const handleClick = () => setCount(count + 1);

  // ✅ With useCallback: same function reference
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps - function never changes

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <MemoizedChild onClick={handleClick} />
    </>
  );
}

// Child only re-renders if onClick changes
const MemoizedChild = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React.memo - Memoizing Components"}),e.jsxs("p",{children:[e.jsx("code",{children:"React.memo"})," prevents re-renders if props haven't changed. Less needed in React 19, but still useful for expensive components."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Component Memoization:"}),e.jsx(x,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`// Without memo: re-renders on every parent render
function ExpensiveChild({ value }) {
  console.log('Rendering ExpensiveChild');
  // ... expensive rendering logic
  return <div>{value}</div>;
}

// With memo: only re-renders if value changes
const ExpensiveChild = memo(function ExpensiveChild({ value }) {
  console.log('Rendering ExpensiveChild');
  // ... expensive rendering logic
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  return (
    <>
      <button onClick={() => setOther(other + 1)}>
        Update Other
      </button>
      <ExpensiveChild value={count} />
      {/* Child doesn't re-render when 'other' changes */}
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"When NOT to Use Memoization"}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Don't Memoize These:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Simple calculations (addition, string concatenation)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Components that always re-render anyway"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Premature optimization without profiling"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Small lists (under 100 items)"}),e.jsx("li",{style:{color:"white"},children:"When the memoization cost exceeds the benefit"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"The Modern React 19 Approach"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Best Practice in React 19:"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Start without memoization"})," - Let the compiler optimize"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Profile your app"})," - Use React DevTools Profiler"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Identify bottlenecks"})," - Find actual performance issues"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Add memoization selectively"})," - Only where needed"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Focus on composition"})," - Better architecture beats memoization"]})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"React 19 compiler automatically optimizes most cases"}),e.jsxs("li",{children:[e.jsx("code",{children:"useMemo"})," for expensive calculations, ",e.jsx("code",{children:"useCallback"})," for stable function references"]}),e.jsxs("li",{children:[e.jsx("code",{children:"React.memo"})," for preventing unnecessary component re-renders"]}),e.jsx("li",{children:"Don't memoize prematurely - profile first!"}),e.jsx("li",{children:"Component composition is often better than memoization"}),e.jsx("li",{children:"In React 19, memoization is an optimization, not a requirement"}),e.jsx("li",{children:"Next section: Performance patterns that work better than memoization!"})]})]})]})}function p(){const[r,t]=n.useState(0),[s,i]=n.useState(""),[a,o]=n.useState(0),h=c=>{let l=0;for(let d=0;d<1e8;d++)l+=c;return l},u=n.useMemo(()=>(console.log("Computing expensive result..."),h(r)),[r]);return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Count:"})," ",r]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Expensive Result:"})," ",u]}),e.jsxs("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:["Renders: ",a," (Check console for computation logs)"]}),e.jsx("div",{style:{display:"flex",gap:"var(--space-2)",marginTop:"var(--space-3)"},children:e.jsx("button",{onClick:()=>{t(r+1),o(a+1)},style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Increment Count (triggers calculation)"})}),e.jsx("input",{type:"text",value:s,onChange:c=>{i(c.target.value),o(a+1)},placeholder:"Type here (doesn't trigger calculation)",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginTop:"var(--space-3)"}})]})}function m(){const[r,t]=n.useState(0),[s,i]=n.useState(""),a=n.useCallback(()=>{t(o=>o+1)},[]);return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Count:"})," ",r]}),e.jsx("input",{type:"text",value:s,onChange:o=>i(o.target.value),placeholder:"Type here...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-3)"}}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Check console - child only re-renders when necessary"}),e.jsx(v,{onClick:a})]})}const v=n.memo(function({onClick:t}){return console.log("MemoizedButton rendered"),e.jsx("button",{onClick:t,style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-accent-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Increment Count"})});function x(){const[r,t]=n.useState(0),[s,i]=n.useState(0);return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Count:"})," ",r]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Other:"})," ",s]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)",marginBottom:"var(--space-3)"},children:"Check console - ExpensiveChild only re-renders when count changes"}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)"},children:[e.jsx("button",{onClick:()=>t(r+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Update Count (child re-renders)"}),e.jsx("button",{onClick:()=>i(s+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-gray-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Update Other (child doesn't re-render)"})]}),e.jsx("div",{style:{marginTop:"var(--space-4)"},children:e.jsx(g,{value:r})})]})}const g=n.memo(function({value:t}){return console.log("ExpensiveChild rendered with value:",t),e.jsxs("div",{style:{padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsx("p",{style:{color:"white"},children:"Memoized Child Component"}),e.jsxs("p",{style:{color:"white"},children:["Value: ",t]})]})});export{b as default};
//# sourceMappingURL=MemoizationWhenNeeded-9P4Z-9xC.js.map
