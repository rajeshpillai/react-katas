import{j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function u(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Components & Props"}),e.jsx("p",{children:"Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What are Components?"}),e.jsxs("p",{children:["In React 19, we primarily use ",e.jsx("strong",{children:"function components"}),". A component is just a JavaScript function that returns JSX."]}),e.jsx("pre",{children:e.jsx("code",{children:`// A simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Using the component
<Welcome />`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Live Example:"}),e.jsx(a,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Props: Passing Data to Components"}),e.jsx("p",{children:'Props (short for "properties") let you pass data from parent to child components. Think of them as function arguments.'}),e.jsx("pre",{children:e.jsx("code",{children:`// Component that accepts props
function Greeting({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using the component with props
<Greeting name="Alice" age={25} />
<Greeting name="Bob" age={30} />`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Live Examples:"}),e.jsx(i,{name:"Alice",age:25}),e.jsx(i,{name:"Bob",age:30}),e.jsx(i,{name:"Charlie",age:35})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Props Destructuring"}),e.jsx("p",{children:"You can destructure props directly in the function parameters for cleaner code. This is a common pattern in modern React."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-4)"},children:[e.jsxs("div",{children:[e.jsx("h4",{children:"Without Destructuring:"}),e.jsx("pre",{children:e.jsx("code",{children:`function Card(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}`})})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"With Destructuring (Better!):"}),e.jsx("pre",{children:e.jsx("code",{children:`function Card({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}`})})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:'The Special "children" Prop'}),e.jsxs("p",{children:["The ",e.jsx("code",{children:"children"})," prop is a special prop that contains whatever you put between the opening and closing tags of a component. It's fundamental to component composition."]}),e.jsx("pre",{children:e.jsx("code",{children:`function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage - anything between tags becomes "children"
<Card title="My Card">
  <p>This is the card content!</p>
  <button>Click me</button>
</Card>`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Live Example:"}),e.jsxs(t,{title:"Welcome Card",children:[e.jsx("p",{children:"This content is passed as the children prop!"}),e.jsx("p",{children:"You can pass multiple elements, and they all become children."}),e.jsx("button",{style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Action Button"})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Component Composition"}),e.jsx("p",{children:"One of React's superpowers is composing small components into larger ones. This makes your code reusable and easier to maintain."}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Live Example: User Profile"}),e.jsx(p,{name:"Sarah Johnson",role:"Senior React Developer",bio:"Passionate about building accessible and performant web applications.",skills:["React","TypeScript","Performance Optimization"]})]}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`// Composed from smaller components
function UserProfile({ name, role, bio, skills }) {
  return (
    <div>
      <Avatar name={name} />
      <UserInfo name={name} role={role} bio={bio} />
      <SkillsList skills={skills} />
    </div>
  );
}`})})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Components are reusable pieces of UI defined as functions that return JSX"}),e.jsx("li",{children:"Props let you pass data from parent to child components"}),e.jsx("li",{children:"Destructure props in function parameters for cleaner code"}),e.jsx("li",{children:"The children prop enables powerful composition patterns"}),e.jsx("li",{children:"Build complex UIs by composing small, focused components"}),e.jsx("li",{children:"Props are read-only - never modify them inside a component"})]})]})]})}function a(){return e.jsx("h1",{style:{color:"var(--color-primary-600)"},children:"Hello, World!"})}function i({name:r,age:n}){return e.jsxs("div",{style:{marginBottom:"var(--space-4)"},children:[e.jsxs("h2",{style:{color:"var(--color-accent-600)",marginBottom:"var(--space-2)"},children:["Hello, ",r,"!"]}),e.jsxs("p",{style:{color:"var(--text-secondary)"},children:["You are ",n," years old."]})]})}function t({title:r,children:n}){return e.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:"var(--radius-lg)",padding:"var(--space-6)",background:"var(--bg-primary)"},children:[e.jsx("h3",{style:{marginBottom:"var(--space-4)",color:"var(--color-primary-600)"},children:r}),e.jsx("div",{children:n})]})}function c({name:r}){const n=r.split(" ").map(s=>s[0]).join("");return e.jsx("div",{style:{width:"80px",height:"80px",borderRadius:"50%",background:"linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"var(--font-size-2xl)",fontWeight:"var(--font-weight-bold)",marginBottom:"var(--space-4)"},children:n})}function l({name:r,role:n,bio:s}){return e.jsxs("div",{style:{marginBottom:"var(--space-4)"},children:[e.jsx("h3",{style:{marginBottom:"var(--space-2)"},children:r}),e.jsx("p",{style:{color:"var(--color-primary-600)",marginBottom:"var(--space-3)"},children:n}),e.jsx("p",{style:{color:"var(--text-secondary)"},children:s})]})}function d({skills:r}){return e.jsxs("div",{children:[e.jsx("h4",{style:{marginBottom:"var(--space-2)"},children:"Skills:"}),e.jsx("div",{style:{display:"flex",gap:"var(--space-2)",flexWrap:"wrap"},children:r.map(n=>e.jsx("span",{style:{padding:"var(--space-2) var(--space-3)",background:"var(--color-primary-100)",color:"var(--color-primary-700)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-sm)"},children:n},n))})]})}function p({name:r,role:n,bio:s,skills:o}){return e.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:"var(--radius-lg)",padding:"var(--space-6)",background:"var(--bg-primary)"},children:[e.jsx(c,{name:r}),e.jsx(l,{name:r,role:n,bio:s}),e.jsx(d,{skills:o})]})}export{u as default};
//# sourceMappingURL=ComponentsProps-ZzNpIkuF.js.map
