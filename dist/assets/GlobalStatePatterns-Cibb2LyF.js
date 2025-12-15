import{j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function s(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Global State Patterns"}),e.jsx("p",{children:"Explore different patterns for managing global state in React applications, from Context to modern state management libraries."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"When You Need Global State"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Use Global State For:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"User authentication status"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Theme preferences"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Shopping cart data"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Notification system"}),e.jsx("li",{style:{color:"white"},children:"Data shared across many components"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 1: Context API"}),e.jsx("p",{children:"Built-in React solution for global state."}),e.jsx("pre",{children:e.jsx("code",{children:`// Good for:
// - Simple global state
// - Theme, auth, language
// - Small to medium apps

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}`})}),e.jsxs("div",{style:{marginTop:"var(--space-3)",padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"✅ Pros:"})," Built-in, no dependencies, simple"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"❌ Cons:"})," Performance issues with large state, no devtools"]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 2: Zustand"}),e.jsx("p",{children:"Lightweight state management with hooks."}),e.jsx("pre",{children:e.jsx("code",{children:`import create from 'zustand';

// Good for:
// - Medium to large apps
// - Need devtools
// - Want simplicity

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Component() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}`})}),e.jsxs("div",{style:{marginTop:"var(--space-3)",padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"✅ Pros:"})," Simple API, great performance, devtools, small bundle"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"❌ Cons:"})," External dependency"]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 3: Jotai"}),e.jsx("p",{children:"Atomic state management inspired by Recoil."}),e.jsx("pre",{children:e.jsx("code",{children:`import { atom, useAtom } from 'jotai';

// Good for:
// - Atomic state updates
// - Derived state
// - Complex dependencies

const countAtom = atom(0);

function Component() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`})}),e.jsxs("div",{style:{marginTop:"var(--space-3)",padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"✅ Pros:"})," Atomic updates, great TypeScript support, flexible"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"❌ Cons:"})," Learning curve, external dependency"]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Pattern 4: Redux Toolkit"}),e.jsx("p",{children:"Modern Redux with less boilerplate."}),e.jsx("pre",{children:e.jsx("code",{children:`import { createSlice, configureStore } from '@reduxjs/toolkit';

// Good for:
// - Large enterprise apps
// - Need time-travel debugging
// - Complex state logic

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});`})}),e.jsxs("div",{style:{marginTop:"var(--space-3)",padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsxs("p",{children:[e.jsx("strong",{children:"✅ Pros:"})," Powerful devtools, middleware, established ecosystem"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"❌ Cons:"})," Larger bundle, more boilerplate"]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Which One to Choose?"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Recommendations:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Small apps:"})," Context API"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Medium apps:"})," Zustand or Jotai"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Large apps:"})," Redux Toolkit"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Start simple:"})," Use Context, upgrade when needed"]})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Context API is built-in and great for simple cases"}),e.jsx("li",{children:"Zustand offers simplicity with better performance"}),e.jsx("li",{children:"Jotai provides atomic state management"}),e.jsx("li",{children:"Redux Toolkit for large, complex applications"}),e.jsx("li",{children:"Start simple, add complexity when needed"}),e.jsx("li",{children:"Consider bundle size and learning curve"})]})]})]})}export{s as default};
//# sourceMappingURL=GlobalStatePatterns-Cibb2LyF.js.map
