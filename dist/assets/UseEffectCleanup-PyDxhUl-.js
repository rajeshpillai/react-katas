import{r,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function j(){const[s,a]=r.useState(!1),[n,t]=r.useState(!1),[o,c]=r.useState(!1),[i,l]=r.useState("");return e.jsxs("div",{children:[e.jsx("h1",{children:"useEffect Cleanup"}),e.jsxs("p",{children:["Cleanup functions prevent ",e.jsx("strong",{children:"memory leaks"})," and unwanted behavior. They run before the effect re-executes and when the component unmounts."]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Why Cleanup Matters"}),e.jsx("p",{children:"Without proper cleanup, you can have:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Memory leaks:"})," Timers and listeners that keep running"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stale closures:"})," Effects using old state values"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Race conditions:"})," Multiple async operations conflicting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Performance issues:"})," Unnecessary computations"]})]}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"⚠️ Critical Rule:"}),e.jsx("p",{style:{color:"white"},children:"If your effect sets up something (timer, subscription, listener), it MUST clean it up!"})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 1: Cleaning Up Timers"}),e.jsx("p",{children:"Always clear intervals and timeouts to prevent them from running after the component unmounts."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("button",{onClick:()=>a(!s),style:{padding:"var(--space-3) var(--space-6)",background:s?"var(--color-error)":"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:s?"Unmount Timer":"Mount Timer"}),s&&e.jsx(u,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup: clear the interval
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up!');
    };
  }, []);
  
  return <div>Seconds: {seconds}</div>;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 2: Cleaning Up Event Listeners"}),e.jsx("p",{children:"Remove event listeners to prevent memory leaks, especially with window/document events."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("button",{onClick:()=>c(!o),style:{padding:"var(--space-3) var(--space-6)",background:o?"var(--color-error)":"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:o?"Stop Tracking":"Start Tracking"}),o&&e.jsx(p,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Define the handler
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    // Add listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup: remove listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      console.log('Mouse listener removed!');
    };
  }, []);
  
  return <div>Mouse: {position.x}, {position.y}</div>;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 3: Cleaning Up Subscriptions"}),e.jsx("p",{children:"WebSocket connections, Firebase listeners, and other subscriptions must be cleaned up."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsxs("button",{onClick:()=>t(!n),style:{padding:"var(--space-3) var(--space-6)",background:n?"var(--color-error)":"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:[n?"Disconnect":"Connect"," Chat"]}),n&&e.jsx(h,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function ChatComponent() {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Simulate WebSocket connection
    const ws = new WebSocket('wss://chat.example.com');
    
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };
    
    // Cleanup: close connection
    return () => {
      ws.close();
      console.log('WebSocket closed!');
    };
  }, []);
  
  return <div>Messages: {messages.length}</div>;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 4: Canceling Async Operations"}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"AbortController"})," to cancel fetch requests and prevent state updates on unmounted components."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("input",{type:"text",value:i,onChange:d=>l(d.target.value),placeholder:"Search...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-4)"}}),e.jsx(v,{searchTerm:i}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Create abort controller
    const controller = new AbortController();
    
    async function search() {
      try {
        const response = await fetch(
          \`/api/search?q=\${searchTerm}\`,
          { signal: controller.signal } // Pass signal
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        }
      }
    }
    
    if (searchTerm) search();
    
    // Cleanup: abort the fetch
    return () => {
      controller.abort();
    };
  }, [searchTerm]);
  
  return <div>Results: {results.length}</div>;
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 5: Debouncing with Cleanup"}),e.jsx("p",{children:"Use cleanup to implement debouncing - delay execution until user stops typing."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx(m,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`function DebouncedSearch() {
  const [input, setInput] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  useEffect(() => {
    // Set up timeout
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, 500); // Wait 500ms after user stops typing
    
    // Cleanup: clear timeout if input changes again
    return () => {
      clearTimeout(timer);
    };
  }, [input]); // Re-run when input changes
  
  return (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common Cleanup Pitfalls"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-error)",color:"white",borderRadius:"var(--radius-lg)"},children:[e.jsx("h4",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Wrong"}),e.jsx("pre",{children:e.jsx("code",{style:{color:"white"},children:`useEffect(() => {
  setInterval(() => {
    console.log('tick');
  }, 1000);
  // No cleanup!
}, []);`})}),e.jsx("p",{style:{color:"white",fontSize:"var(--font-size-sm)"},children:"Interval keeps running forever!"})]}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-lg)"},children:[e.jsx("h4",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Correct"}),e.jsx("pre",{children:e.jsx("code",{style:{color:"white"},children:`useEffect(() => {
  const id = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  return () => clearInterval(id);
}, []);`})}),e.jsx("p",{style:{color:"white",fontSize:"var(--font-size-sm)"},children:"Cleanup clears the interval!"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Cleanup functions run before the next effect and on unmount"}),e.jsxs("li",{children:["Always clean up: timers (",e.jsx("code",{children:"clearInterval"}),", ",e.jsx("code",{children:"clearTimeout"}),")"]}),e.jsxs("li",{children:["Always clean up: event listeners (",e.jsx("code",{children:"removeEventListener"}),")"]}),e.jsxs("li",{children:["Always clean up: subscriptions (WebSocket ",e.jsx("code",{children:"close()"}),", unsubscribe functions)"]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"AbortController"})," to cancel fetch requests"]}),e.jsx("li",{children:"Cleanup enables debouncing and other timing patterns"}),e.jsx("li",{children:"Forgetting cleanup leads to memory leaks and bugs!"})]})]})]})}function u(){const[s,a]=r.useState(0);return r.useEffect(()=>{console.log("Timer mounted");const n=setInterval(()=>{a(t=>t+1)},1e3);return()=>{clearInterval(n),console.log("Timer cleaned up!")}},[]),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsxs("p",{style:{color:"var(--color-primary-700)",fontWeight:"bold"},children:["⏱️ Timer: ",s," seconds"]}),e.jsx("p",{style:{color:"var(--color-primary-600)",fontSize:"var(--font-size-sm)"},children:"Check console - cleanup runs when you unmount!"})]})}function p(){const[s,a]=r.useState({x:0,y:0});return r.useEffect(()=>{console.log("Mouse tracker mounted");const n=t=>{a({x:t.clientX,y:t.clientY})};return window.addEventListener("mousemove",n),()=>{window.removeEventListener("mousemove",n),console.log("Mouse listener removed!")}},[]),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsxs("p",{style:{color:"var(--color-accent-700)",fontWeight:"bold"},children:["🖱️ Mouse Position: X: ",s.x,", Y: ",s.y]}),e.jsx("p",{style:{color:"var(--color-accent-600)",fontSize:"var(--font-size-sm)"},children:"Move your mouse! Listener is cleaned up on unmount."})]})}function h(){const[s,a]=r.useState(0),[n,t]=r.useState(!1);return r.useEffect(()=>{console.log("Chat connecting..."),t(!0);const o=setInterval(()=>{a(c=>c+1)},2e3);return()=>{clearInterval(o),t(!1),console.log("Chat disconnected!")}},[]),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:[e.jsxs("p",{style:{color:"white",fontWeight:"bold"},children:["💬 Chat ",n?"Connected":"Disconnected"]}),e.jsxs("p",{style:{color:"white"},children:["Messages received: ",s]}),e.jsx("p",{style:{color:"white",fontSize:"var(--font-size-sm)"},children:"Simulated WebSocket - cleanup closes connection"})]})}function v({searchTerm:s}){const[a,n]=r.useState([]),[t,o]=r.useState(!1);return r.useEffect(()=>{if(!s){n([]);return}const c=new AbortController;o(!0);const i=setTimeout(()=>{n([`Result 1 for "${s}"`,`Result 2 for "${s}"`,`Result 3 for "${s}"`]),o(!1)},1e3);return()=>{c.abort(),clearTimeout(i),console.log("Search aborted for:",s)}},[s]),s?e.jsx("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-4)"},children:t?e.jsx("p",{children:"Searching..."}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{style:{fontWeight:"bold",marginBottom:"var(--space-2)"},children:['Results for "',s,'":']}),e.jsx("ul",{style:{paddingLeft:"var(--space-6)"},children:a.map((c,i)=>e.jsx("li",{children:c},i))})]})}):null}function m(){const[s,a]=r.useState(""),[n,t]=r.useState("");return r.useEffect(()=>{const o=setTimeout(()=>{t(s),console.log("Debounced value updated:",s)},500);return()=>{clearTimeout(o)}},[s]),e.jsxs("div",{children:[e.jsx("input",{type:"text",value:s,onChange:o=>a(o.target.value),placeholder:"Type to see debouncing...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginBottom:"var(--space-4)"}}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Immediate value:"})," ",s||"(empty)"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Debounced value (500ms delay):"})," ",n||"(empty)"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"The debounced value updates 500ms after you stop typing"})]})]})}export{j as default};
//# sourceMappingURL=UseEffectCleanup-PyDxhUl-.js.map
