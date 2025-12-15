import{j as e,r as o}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function b(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Custom Hooks"}),e.jsx("p",{children:"Custom hooks let you extract component logic into reusable functions. They're just JavaScript functions that use other hooks!"}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What are Custom Hooks?"}),e.jsxs("p",{children:['Custom hooks are functions that start with "',e.jsx("code",{children:"use"}),'" and can call other hooks. They let you share stateful logic between components.']}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Key Rules:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:['Must start with "',e.jsx("code",{children:"use"}),'" (e.g., ',e.jsx("code",{children:"useWindowSize"}),")"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:["Can call other hooks (",e.jsx("code",{children:"useState"}),", ",e.jsx("code",{children:"useEffect"}),", etc.)"]}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Follow the same rules as built-in hooks"}),e.jsx("li",{style:{color:"white"},children:"Share logic, not state (each call is independent)"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 1: useLocalStorage"}),e.jsx("p",{children:"Sync state with localStorage - persist data across page reloads."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Try it:"}),e.jsx(v,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 2: useWindowSize"}),e.jsx("p",{children:"Track window dimensions - useful for responsive behavior."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Current Window Size:"}),e.jsx(g,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function App() {
  const { width, height } = useWindowSize();
  return <div>Window: {width} x {height}</div>;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 3: useDebounce"}),e.jsx("p",{children:"Delay updating a value until user stops typing - perfect for search inputs."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Debounced Search:"}),e.jsx(m,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout if value changes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchBar() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call only happens after user stops typing
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 4: useToggle"}),e.jsx("p",{children:"Simple hook for boolean state - cleaner than useState for toggles."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Toggle Demo:"}),e.jsx(x,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
}

// Usage
function App() {
  const modal = useToggle(false);

  return (
    <>
      <button onClick={modal.toggle}>Toggle Modal</button>
      {modal.value && <Modal onClose={modal.setFalse} />}
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 5: usePrevious"}),e.jsx("p",{children:"Get the previous value of state or props - useful for comparisons."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Previous Value:"}),e.jsx(y,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Best Practices"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Do's"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:'Always start hook names with "use"'}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Extract logic that's used in multiple components"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Keep hooks focused on a single responsibility"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Return values in a consistent format (array or object)"}),e.jsx("li",{style:{color:"white"},children:"Document your custom hooks with examples"})]})]}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Don'ts"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't call hooks conditionally"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't create hooks for everything (keep it simple)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't share state between hook calls (each is independent)"}),e.jsx("li",{style:{color:"white"},children:"Don't forget to clean up side effects"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Custom hooks extract reusable logic from components"}),e.jsx("li",{children:'Must start with "use" and can call other hooks'}),e.jsx("li",{children:"Each hook call has its own isolated state"}),e.jsx("li",{children:"Common patterns: localStorage, window events, debouncing, toggles"}),e.jsx("li",{children:"Keep hooks focused and well-documented"}),e.jsx("li",{children:"Custom hooks make your code more maintainable and testable"})]})]})]})}function d(r,s){const[t,n]=o.useState(()=>{try{const a=window.localStorage.getItem(r);return a?JSON.parse(a):s}catch{return s}});return o.useEffect(()=>{try{window.localStorage.setItem(r,JSON.stringify(t))}catch(a){console.error("Error saving to localStorage:",a)}},[r,t]),[t,n]}function u(){const[r,s]=o.useState({width:typeof window<"u"?window.innerWidth:0,height:typeof window<"u"?window.innerHeight:0});return o.useEffect(()=>{const t=()=>{s({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),r}function h(r,s){const[t,n]=o.useState(r);return o.useEffect(()=>{const a=setTimeout(()=>{n(r)},s);return()=>{clearTimeout(a)}},[r,s]),t}function i(r=!1){const[s,t]=o.useState(r),n=o.useCallback(()=>{t(c=>!c)},[]),a=o.useCallback(()=>{t(!0)},[]),l=o.useCallback(()=>{t(!1)},[]);return{value:s,toggle:n,setTrue:a,setFalse:l}}function p(r){const s=o.useRef(void 0);return o.useEffect(()=>{s.current=r},[r]),s.current}function v(){const[r,s]=d("tutorial-name","");return e.jsxs("div",{children:[e.jsx("input",{type:"text",value:r,onChange:t=>s(t.target.value),placeholder:"Enter your name...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-4)"}}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Stored value:"})," ",r||"(empty)"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Refresh the page - your input persists!"})]})]})}function g(){const{width:r,height:s}=u();return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)",textAlign:"center"},children:[e.jsxs("p",{style:{color:"var(--color-primary-700)",fontWeight:"bold",fontSize:"var(--font-size-2xl)"},children:[r," × ",s]}),e.jsx("p",{style:{color:"var(--color-primary-600)",fontSize:"var(--font-size-sm)"},children:"Resize your browser window to see it update!"})]})}function m(){const[r,s]=o.useState(""),t=h(r,500);return e.jsxs("div",{children:[e.jsx("input",{type:"text",value:r,onChange:n=>s(n.target.value),placeholder:"Type to search...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-4)"}}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Immediate value:"})," ",r||"(empty)"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Debounced value (500ms):"})," ",t||"(empty)"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"API calls would use the debounced value to avoid excessive requests"})]})]})}function x(){const r=i(!1),s=i(!1);return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)",marginBottom:"var(--space-4)"},children:[e.jsxs("button",{onClick:r.toggle,style:{padding:"var(--space-3) var(--space-6)",background:r.value?"var(--color-error)":"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:[r.value?"Hide":"Show"," Modal"]}),e.jsx("button",{onClick:s.toggle,style:{padding:"var(--space-3) var(--space-6)",background:s.value?"var(--color-gray-800)":"var(--color-gray-200)",color:s.value?"white":"var(--text-primary)",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:s.value?"🌙 Dark":"☀️ Light"})]}),r.value&&e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-info)",color:"white",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"Modal is visible!"}),e.jsx("p",{style:{color:"white"},children:"Using useToggle hook"})]}),e.jsx("div",{style:{padding:"var(--space-4)",background:s.value?"var(--color-gray-800)":"var(--color-gray-100)",color:s.value?"white":"var(--text-primary)",borderRadius:"var(--radius-md)"},children:e.jsx("p",{style:{fontWeight:"bold"},children:s.value?"Dark mode enabled":"Light mode enabled"})})]})}function y(){const[r,s]=o.useState(0),t=p(r);return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Current:"})," ",r]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Previous:"})," ",t??"undefined"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)",marginBottom:"var(--space-3)"},children:"Previous value is tracked using useRef"}),e.jsx("button",{onClick:()=>s(r+1),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Increment"})]})}export{b as default};
//# sourceMappingURL=CustomHooks-hP5r8Egx.js.map
