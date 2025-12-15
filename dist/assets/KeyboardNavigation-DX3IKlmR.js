import{j as e,r as o}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function y(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Keyboard Navigation"}),e.jsx("p",{children:"Ensure your React applications are fully navigable using only a keyboard. Essential for accessibility and power users!"}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Why Keyboard Navigation Matters"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Who Benefits:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Users with motor disabilities"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Screen reader users"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Power users"}),e.jsx("li",{style:{color:"white"},children:"Everyone (keyboard shortcuts are faster!)"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Tab Index"}),e.jsx("p",{children:"Control which elements can receive keyboard focus."}),e.jsx("pre",{children:e.jsx("code",{children:`// tabIndex={0} - Natural tab order
<div tabIndex={0}>Focusable div</div>

// tabIndex={-1} - Programmatically focusable only
<div tabIndex={-1} ref={ref}>
  Can be focused with ref.current.focus()
</div>

// tabIndex={1+} - Custom tab order (avoid!)
// Don't use positive tabIndex, it breaks natural order`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Handling Keyboard Events"}),e.jsx("pre",{children:e.jsx("code",{children:`function CustomButton({ onClick, children }) {
  const handleKeyDown = (e) => {
    // Enter or Space activates button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Try it:"}),e.jsx(x,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Focus Management"}),e.jsx("p",{children:"Manage focus for modals, dropdowns, and dynamic content."}),e.jsx("pre",{children:e.jsx("code",{children:`function Modal({ onClose }) {
  const closeButtonRef = useRef(null);
  
  useEffect(() => {
    // Focus close button when modal opens
    closeButtonRef.current?.focus();
    
    // Trap focus inside modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  return (
    <div role="dialog">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Common Keyboard Patterns"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Standard Keys:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Tab:"})," Move focus forward"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Shift+Tab:"})," Move focus backward"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Enter/Space:"})," Activate buttons"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Escape:"})," Close modals/menus"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Arrow keys:"})," Navigate lists/menus"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Home/End:"})," Jump to start/end"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Compound Pattern: Accessible Tabs"}),e.jsx("p",{children:"A fully accessible Tabs component using the compound pattern and roving tabindex. Try navigating with Arrow keys!"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Interactive Tabs Demo:"}),e.jsxs(p,{defaultValue:"account",children:[e.jsxs(v,{children:[e.jsx(l,{value:"account",children:"Account"}),e.jsx(l,{value:"password",children:"Password"}),e.jsx(l,{value:"settings",children:"Settings"})]}),e.jsx(d,{value:"account",children:e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-primary)",borderRadius:"var(--radius-md)"},children:[e.jsx("h4",{style:{marginBottom:"var(--space-2)"},children:"Account Settings"}),e.jsx("p",{children:"Manage your account details and preferences here."})]})}),e.jsx(d,{value:"password",children:e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-primary)",borderRadius:"var(--radius-md)"},children:[e.jsx("h4",{style:{marginBottom:"var(--space-2)"},children:"Password Change"}),e.jsx("p",{children:"Update your password securely."})]})}),e.jsx(d,{value:"settings",children:e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-primary)",borderRadius:"var(--radius-md)"},children:[e.jsx("h4",{style:{marginBottom:"var(--space-2)"},children:"General Settings"}),e.jsx("p",{children:"Configure application behavior."})]})})]}),e.jsx("pre",{style:{marginTop:"var(--space-4)",background:"transparent"},children:e.jsx("code",{children:`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="password">...</TabsContent>
</Tabs>`})}),e.jsx("h3",{style:{marginTop:"var(--space-6)",marginBottom:"var(--space-3)"},children:"⚙️ How it Works:"}),e.jsx("p",{children:"The magic happens in two places:"}),e.jsx("h4",{style:{marginTop:"var(--space-4)"},children:"1. Keyboard Navigation (TabsList)"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{children:`const handleKeyDown = (e) => {
  const tabs = containerRef.current.querySelectorAll('[role="tab"]');
  const index = Array.from(tabs).indexOf(document.activeElement);

  // Calculate next tab index (wrapping around)
  if (e.key === 'ArrowRight') {
    nextIndex = (index + 1) % tabs.length;
  } else if (e.key === 'ArrowLeft') {
    nextIndex = (index - 1 + tabs.length) % tabs.length;
  } else if (e.key === 'Home') nextIndex = 0;
  else if (e.key === 'End') nextIndex = tabs.length - 1;

  // Move focus which triggers roving tabindex
  tabs[nextIndex].focus();
};`})}),e.jsx("h4",{style:{marginTop:"var(--space-4)"},children:"2. Roving TabIndex (TabsTrigger)"}),e.jsx("pre",{style:{background:"transparent"},children:e.jsx("code",{children:`<button
  role="tab"
  // Only the active tab is in the tab order (0)
  // Inactive tabs are removed from order (-1)
  tabIndex={isActive ? 0 : -1}
  aria-selected={isActive}
  onClick={() => setActive(value)}
  onFocus={() => setActive(value)}
>
  {children}
</button>`})})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"All interactive elements must be keyboard accessible"}),e.jsxs("li",{children:["Use ",e.jsxs("code",{children:["tabIndex=",0]})," for custom focusable elements"]}),e.jsx("li",{children:"Handle Enter and Space for custom buttons"}),e.jsx("li",{children:"Manage focus for modals and dynamic content"}),e.jsx("li",{children:"Support Escape key to close overlays"}),e.jsx("li",{children:"Test your app using only keyboard!"})]})]})]})}function x(){const[t,a]=o.useState(0),n=()=>{a(s=>s+1)},r=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),n())};return e.jsxs("div",{children:[e.jsx("div",{role:"button",tabIndex:0,onClick:n,onKeyDown:r,style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",borderRadius:"var(--radius-md)",cursor:"pointer",display:"inline-block",userSelect:"none"},children:"Custom Button (Click or press Enter/Space)"}),e.jsxs("p",{style:{marginTop:"var(--space-3)"},children:[e.jsx("strong",{children:"Clicked:"})," ",t," times"]}),e.jsx("p",{style:{color:"var(--text-tertiary)",fontSize:"var(--font-size-sm)"},children:"Tab to focus, then press Enter or Space"})]})}const u=o.createContext(null);function p({defaultValue:t,children:a}){const[n,r]=o.useState(t);return e.jsx(u.Provider,{value:{activeTab:n,setActiveTab:r},children:a})}function v({children:t}){const a=o.useRef(null),n=r=>{var h;const s=(h=a.current)==null?void 0:h.querySelectorAll('[role="tab"]');if(!s)return;const c=Array.from(s).indexOf(document.activeElement);let i=c;if(r.key==="ArrowRight")i=(c+1)%s.length;else if(r.key==="ArrowLeft")i=(c-1+s.length)%s.length;else if(r.key==="Home")i=0;else if(r.key==="End")i=s.length-1;else return;r.preventDefault(),s[i].focus()};return e.jsx("div",{ref:a,role:"tablist","aria-orientation":"horizontal",onKeyDown:n,style:{display:"flex",borderBottom:"1px solid var(--border-color)",marginBottom:"var(--space-4)"},children:t})}function l({value:t,children:a}){const n=o.useContext(u);if(!n)throw new Error("TabsTrigger must be used within Tabs");const r=n.activeTab===t;return e.jsx("button",{role:"tab","aria-selected":r,tabIndex:r?0:-1,onClick:()=>n.setActiveTab(t),onFocus:()=>n.setActiveTab(t),style:{padding:"var(--space-2) var(--space-4)",background:"transparent",border:"none",borderBottom:r?"2px solid var(--color-primary-500)":"2px solid transparent",color:r?"var(--color-primary-500)":"var(--text-secondary)",fontWeight:r?"bold":"normal",cursor:"pointer",outline:"none"},children:a})}function d({value:t,children:a}){const n=o.useContext(u);if(!n)throw new Error("TabsContent must be used within Tabs");return n.activeTab!==t?null:e.jsx("div",{role:"tabpanel",tabIndex:0,style:{outline:"none"},children:a})}export{y as default};
//# sourceMappingURL=KeyboardNavigation-DX3IKlmR.js.map
