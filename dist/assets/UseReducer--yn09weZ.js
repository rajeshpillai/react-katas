import{j as e,r as n}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function g(){return e.jsxs("div",{children:[e.jsx("h1",{children:"useReducer Hook"}),e.jsxs("p",{children:[e.jsx("code",{children:"useReducer"})," is an alternative to ",e.jsx("code",{children:"useState"})," for managing complex state logic. It's especially useful when state updates depend on previous state or when you have multiple sub-values."]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is useReducer?"}),e.jsxs("p",{children:[e.jsx("code",{children:"useReducer"})," accepts a reducer function and initial state, returning the current state and a dispatch function."]}),e.jsx("pre",{children:e.jsx("code",{children:`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Dispatch an action
dispatch({ type: 'INCREMENT' });`})}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"💡 When to Use useReducer:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Complex state logic with multiple sub-values"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Next state depends on previous state"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Want to centralize state update logic"}),e.jsx("li",{style:{color:"white"},children:"Need to optimize performance with deep updates"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 1: Simple Counter"}),e.jsx("p",{children:"A basic example showing the reducer pattern."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Counter with useReducer:"}),e.jsx(d,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

interface State {
  count: number;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </>
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 2: Form State Management"}),e.jsx("p",{children:"Managing multiple form fields with a single reducer."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"User Form:"}),e.jsx(u,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`type Action =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'RESET' };

interface FormState {
  name: string;
  email: string;
  message: string;
}

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return { name: '', email: '', message: '' };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    message: '',
  });

  return (
    <input
      value={state.name}
      onChange={(e) => dispatch({
        type: 'SET_FIELD',
        field: 'name',
        value: e.target.value
      })}
    />
  );
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Example 3: Todo List"}),e.jsx("p",{children:"Complex state with arrays - adding, removing, and toggling items."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Todo App:"}),e.jsx(h,{}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.text,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"useReducer vs useState"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-primary-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{style:{color:"var(--color-primary-700)"},children:"useState"}),e.jsx("p",{style:{marginBottom:"var(--space-3)"},children:"Best for:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Simple state (strings, numbers, booleans)"}),e.jsx("li",{children:"Independent state updates"}),e.jsx("li",{children:"State that doesn't depend on previous state"}),e.jsx("li",{children:"Quick prototyping"})]}),e.jsx("pre",{style:{marginTop:"var(--space-3)"},children:e.jsx("code",{children:`const [count, setCount] = useState(0);
setCount(count + 1);`})})]}),e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--color-accent-100)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{style:{color:"var(--color-accent-700)"},children:"useReducer"}),e.jsx("p",{style:{marginBottom:"var(--space-3)"},children:"Best for:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Complex state objects"}),e.jsx("li",{children:"Multiple sub-values"}),e.jsx("li",{children:"State transitions with logic"}),e.jsx("li",{children:"Centralized state updates"})]}),e.jsx("pre",{style:{marginTop:"var(--space-3)"},children:e.jsx("code",{children:`const [state, dispatch] = useReducer(reducer, init);
dispatch({ type: 'INCREMENT' });`})})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Best Practices"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Do's"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use TypeScript to type actions and state"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Keep reducers pure (no side effects)"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use action types as constants"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Return new state objects (don't mutate)"}),e.jsx("li",{style:{color:"white"},children:"Handle default case in switch"})]})]}),e.jsxs("div",{style:{background:"var(--color-error)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"❌ Don'ts"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't mutate state directly"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't perform side effects in reducers"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Don't use for simple state (overkill)"}),e.jsx("li",{style:{color:"white"},children:"Don't forget the default case"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"useReducer"})," is great for complex state logic"]}),e.jsx("li",{children:"Reducers are pure functions that take state and action, return new state"}),e.jsx("li",{children:"Actions describe what happened, reducers describe how state changes"}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"useState"})," for simple state, ",e.jsx("code",{children:"useReducer"})," for complex state"]}),e.jsx("li",{children:"Reducers make state updates predictable and testable"}),e.jsx("li",{children:"TypeScript makes reducers safer with action type checking"})]})]})]})}function c(r,t){switch(t.type){case"INCREMENT":return{count:r.count+1};case"DECREMENT":return{count:r.count-1};case"RESET":return{count:0};default:return r}}function d(){const[r,t]=n.useReducer(c,{count:0});return e.jsxs("div",{style:{padding:"var(--space-4)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)"},children:[e.jsx("div",{style:{fontSize:"var(--font-size-3xl)",fontWeight:"bold",color:"var(--color-primary-600)",marginBottom:"var(--space-4)",textAlign:"center"},children:r.count}),e.jsxs("div",{style:{display:"flex",gap:"var(--space-2)",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>t({type:"INCREMENT"}),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-success)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"+"}),e.jsx("button",{onClick:()=>t({type:"DECREMENT"}),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-error)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"-"}),e.jsx("button",{onClick:()=>t({type:"RESET"}),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-gray-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Reset"})]})]})}function l(r,t){switch(t.type){case"SET_FIELD":return{...r,[t.field]:t.value};case"RESET":return{name:"",email:"",message:""};default:return r}}function u(){const[r,t]=n.useReducer(l,{name:"",email:"",message:""}),[a,i]=n.useState(!1),o=s=>{s.preventDefault(),i(!0),setTimeout(()=>{t({type:"RESET"}),i(!1)},2e3)};return e.jsxs("div",{children:[e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{style:{marginBottom:"var(--space-3)"},children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--space-2)",fontWeight:"bold"},children:"Name:"}),e.jsx("input",{type:"text",value:r.name,onChange:s=>t({type:"SET_FIELD",field:"name",value:s.target.value}),style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)"}})]}),e.jsxs("div",{style:{marginBottom:"var(--space-3)"},children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--space-2)",fontWeight:"bold"},children:"Email:"}),e.jsx("input",{type:"email",value:r.email,onChange:s=>t({type:"SET_FIELD",field:"email",value:s.target.value}),style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)"}})]}),e.jsxs("div",{style:{marginBottom:"var(--space-4)"},children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--space-2)",fontWeight:"bold"},children:"Message:"}),e.jsx("textarea",{value:r.message,onChange:s=>t({type:"SET_FIELD",field:"message",value:s.target.value}),rows:3,style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",fontFamily:"inherit"}})]}),e.jsx("button",{type:"submit",style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginRight:"var(--space-2)"},children:"Submit"}),e.jsx("button",{type:"button",onClick:()=>t({type:"RESET"}),style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-gray-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Clear"})]}),a&&e.jsxs("div",{style:{marginTop:"var(--space-4)",padding:"var(--space-4)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:[e.jsx("p",{style:{color:"white",fontWeight:"bold"},children:"Form submitted!"}),e.jsxs("p",{style:{color:"white"},children:["Name: ",r.name]}),e.jsxs("p",{style:{color:"white"},children:["Email: ",r.email]})]})]})}function p(r,t){switch(t.type){case"ADD_TODO":return[...r,{id:Date.now(),text:t.text,completed:!1}];case"TOGGLE_TODO":return r.map(a=>a.id===t.id?{...a,completed:!a.completed}:a);case"DELETE_TODO":return r.filter(a=>a.id!==t.id);default:return r}}function h(){const[r,t]=n.useReducer(p,[]),[a,i]=n.useState(""),o=s=>{s.preventDefault(),a.trim()&&(t({type:"ADD_TODO",text:a}),i(""))};return e.jsxs("div",{children:[e.jsxs("form",{onSubmit:o,style:{marginBottom:"var(--space-4)"},children:[e.jsx("input",{type:"text",value:a,onChange:s=>i(s.target.value),placeholder:"Add a todo...",style:{padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginRight:"var(--space-2)",width:"300px"}}),e.jsx("button",{type:"submit",style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Add"})]}),r.length===0?e.jsx("p",{style:{color:"var(--text-tertiary)"},children:"No todos yet. Add one above!"}):e.jsx("ul",{style:{listStyle:"none",padding:0},children:r.map(s=>e.jsxs("li",{style:{display:"flex",alignItems:"center",padding:"var(--space-3)",background:"var(--bg-tertiary)",borderRadius:"var(--radius-md)",marginBottom:"var(--space-2)"},children:[e.jsx("input",{type:"checkbox",checked:s.completed,onChange:()=>t({type:"TOGGLE_TODO",id:s.id}),style:{marginRight:"var(--space-3)"}}),e.jsx("span",{style:{flex:1,textDecoration:s.completed?"line-through":"none",color:s.completed?"var(--text-tertiary)":"var(--text-primary)"},children:s.text}),e.jsx("button",{onClick:()=>t({type:"DELETE_TODO",id:s.id}),style:{padding:"var(--space-2) var(--space-3)",background:"var(--color-error)",color:"white",border:"none",borderRadius:"var(--radius-sm)",cursor:"pointer",fontSize:"var(--font-size-sm)"},children:"Delete"})]},s.id))})]})}export{g as default};
//# sourceMappingURL=UseReducer--yn09weZ.js.map
