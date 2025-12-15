import{j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function i(){return e.jsxs("div",{children:[e.jsx("h1",{children:"State Machines"}),e.jsx("p",{children:"State machines provide a structured way to manage complex state transitions. They make your app's behavior predictable and easier to reason about."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What are State Machines?"}),e.jsx("p",{children:"A state machine is a model that defines a finite number of states and the transitions between them."}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Key Concepts:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"States:"})," Possible conditions (idle, loading, success, error)"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Events:"})," Triggers for transitions (FETCH, SUCCESS, ERROR)"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Transitions:"})," Rules for moving between states"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Actions:"})," Side effects during transitions"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Simple State Machine Example"}),e.jsx("pre",{children:e.jsx("code",{children:`// Traffic light state machine
const states = {
  red: { TIMER: 'green' },
  green: { TIMER: 'yellow' },
  yellow: { TIMER: 'red' }
};

function reducer(state, event) {
  return states[state][event] || state;
}

// Usage
const [state, dispatch] = useReducer(reducer, 'red');
// dispatch('TIMER') -> transitions to next state`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Benefits of State Machines"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Advantages:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Impossible states are impossible"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Clear state transitions"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Easier to test and debug"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Self-documenting behavior"}),e.jsx("li",{style:{color:"white"},children:"Prevents edge case bugs"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"XState Library"}),e.jsx("p",{children:"XState is a popular library for state machines and statecharts in JavaScript."}),e.jsx("pre",{children:e.jsx("code",{children:`import { createMachine } from 'xstate';

const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      }
    },
    success: {
      on: { FETCH: 'loading' }
    },
    error: {
      on: { RETRY: 'loading' }
    }
  }
});`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"When to Use State Machines"}),e.jsxs("div",{style:{background:"var(--color-warning)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Perfect For:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Multi-step forms and wizards"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Authentication flows"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Data fetching with loading/error states"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Complex UI interactions"}),e.jsx("li",{style:{color:"white"},children:"Game logic and animations"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"State machines model finite states and transitions"}),e.jsx("li",{children:"Make impossible states impossible"}),e.jsx("li",{children:"Great for complex workflows and UI logic"}),e.jsx("li",{children:"XState is the most popular library"}),e.jsx("li",{children:"Improves code clarity and testability"}),e.jsx("li",{children:"Consider for multi-step forms and auth flows"})]})]})]})}export{i as default};
//# sourceMappingURL=StateMachines-d8NmWVqZ.js.map
