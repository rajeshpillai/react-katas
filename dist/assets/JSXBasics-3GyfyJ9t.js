import{r as n,j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function c(){const[r,s]=n.useState(!1),a="React Developer",i=new Date().getFullYear();return e.jsxs("div",{children:[e.jsx("h1",{children:"JSX Basics"}),e.jsx("p",{children:"JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files. It's the foundation of React development."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"What is JSX?"}),e.jsx("p",{children:"JSX looks like HTML, but it's actually JavaScript. Under the hood, React transforms JSX into regular JavaScript function calls."}),e.jsxs("div",{style:{background:"var(--bg-tertiary)",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("button",{onClick:()=>s(!r),style:{padding:"var(--space-2) var(--space-4)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer",marginBottom:"var(--space-4)"},children:r?"Show JSX":"Show Transformed JavaScript"}),r?e.jsx("pre",{children:e.jsx("code",{children:`// What React actually creates
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);`})}):e.jsx("pre",{children:e.jsx("code",{children:`// JSX syntax
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Embedding Expressions in JSX"}),e.jsxs("p",{children:["You can embed any JavaScript expression in JSX by wrapping it in curly braces"," ",e.jsx("code",{children:"{}"}),"."]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Live Examples:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Variable: ",e.jsx("strong",{children:a})]}),e.jsxs("li",{children:["Expression: ",e.jsx("strong",{children:4})]}),e.jsxs("li",{children:["Function call: ",e.jsx("strong",{children:i})]}),e.jsxs("li",{children:["Conditional: ",e.jsx("strong",{children:"Currently learning!"})]})]}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`const name = 'React Developer';
const currentYear = new Date().getFullYear();
const isLearning = true;

// Using expressions in JSX
<ul>
  <li>Variable: <strong>{name}</strong></li>
  <li>Expression: <strong>{2 + 2}</strong></li>
  <li>Function call: <strong>{currentYear}</strong></li>
  <li>Conditional: <strong>{isLearning ? 'Learning!' : 'Not learning'}</strong></li>
</ul>`})})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Important JSX Rules"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginBottom:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Key Rules"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Return a single root element"})," - Wrap multiple elements in a parent tag or Fragment"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Close all tags"})," - Even self-closing tags like ",e.jsx("code",{children:"<img />"})]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Use camelCase"})," - HTML attributes become camelCase (",e.jsx("code",{children:"className"}),", ",e.jsx("code",{children:"onClick"}),")"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Reserved words"})," - Use ",e.jsx("code",{children:"className"})," instead of"," ",e.jsx("code",{children:"class"}),", ",e.jsx("code",{children:"htmlFor"})," instead of ",e.jsx("code",{children:"for"})]})]})]}),e.jsx(t,{})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React Fragments"}),e.jsx("p",{children:"When you need to return multiple elements without adding extra nodes to the DOM, use Fragments:"}),e.jsx("pre",{children:e.jsx("code",{children:`// Long syntax
<React.Fragment>
  <h1>Title</h1>
  <p>Paragraph</p>
</React.Fragment>

// Short syntax (more common)
<>
  <h1>Title</h1>
  <p>Paragraph</p>
</>`})})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"JSX is a syntax extension that makes React code more readable and intuitive"}),e.jsx("li",{children:"JSX gets transformed into JavaScript function calls by React"}),e.jsx("li",{children:"Use curly braces to embed JavaScript expressions in JSX"}),e.jsx("li",{children:"Follow JSX rules: single root, close all tags, use camelCase"}),e.jsx("li",{children:"Fragments let you group elements without adding DOM nodes"})]})]})]})}function t(){const[r,s]=n.useState("");return e.jsxs("div",{style:{background:"var(--bg-tertiary)",padding:"var(--space-4)",borderRadius:"var(--radius-lg)"},children:[e.jsx("h3",{children:"Try It Yourself!"}),e.jsx("p",{children:"Type something and see it rendered in real-time:"}),e.jsx("input",{type:"text",value:r,onChange:a=>s(a.target.value),placeholder:"Type here...",style:{width:"100%",padding:"var(--space-3)",border:"1px solid var(--border-color)",borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)",marginTop:"var(--space-2)"}}),e.jsxs("div",{style:{marginTop:"var(--space-4)",padding:"var(--space-4)",background:"var(--bg-secondary)",borderRadius:"var(--radius-md)"},children:[e.jsx("strong",{children:"You typed:"})," ",r||e.jsx("em",{children:"(nothing yet)"})]}),e.jsx("pre",{style:{marginTop:"var(--space-4)"},children:e.jsx("code",{children:`// This is JSX!
<input
  type="text"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  placeholder="Type here..."
/>

<div>
  <strong>You typed:</strong> {inputValue || <em>(nothing yet)</em>}
</div>`})})]})}export{c as default};
//# sourceMappingURL=JSXBasics-3GyfyJ9t.js.map
