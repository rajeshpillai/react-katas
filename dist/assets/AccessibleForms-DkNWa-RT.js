import{j as e,r as a}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function m(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Accessible Forms"}),e.jsx("p",{children:"Create forms that everyone can use. Learn proper labeling, error handling, and validation for accessible form experiences."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Proper Labeling"}),e.jsx("p",{children:"Every form input must have an associated label."}),e.jsx("pre",{children:e.jsx("code",{children:`// ✅ Explicit label with htmlFor
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// ✅ Implicit label (wrapping)
<label>
  Email:
  <input type="email" />
</label>

// ❌ Missing label
<input type="email" placeholder="Email" />
// Placeholder is NOT a label!`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Required Fields"}),e.jsx("p",{children:"Indicate required fields clearly."}),e.jsx("pre",{children:e.jsx("code",{children:`<label htmlFor="name">
  Name <span aria-label="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Error Messages"}),e.jsx("p",{children:"Associate error messages with inputs using aria-describedby."}),e.jsx("pre",{children:e.jsx("code",{children:`function EmailInput() {
  const [error, setError] = useState('');
  
  return (
    <>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <div id="email-error" role="alert">
          {error}
        </div>
      )}
    </>
  );
}`})}),e.jsxs("div",{style:{background:"var(--bg-secondary)",padding:"var(--space-6)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{children:"Try it:"}),e.jsx(n,{})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Grouping Related Fields"}),e.jsxs("p",{children:["Use ",e.jsx("code",{children:"fieldset"})," and ",e.jsx("code",{children:"legend"})," for related fields."]}),e.jsx("pre",{children:e.jsx("code",{children:`<fieldset>
  <legend>Shipping Address</legend>
  <label htmlFor="street">Street:</label>
  <input id="street" type="text" />
  
  <label htmlFor="city">City:</label>
  <input id="city" type="text" />
</fieldset>`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Form Accessibility Best Practices"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Do's:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Always use labels with inputs"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Mark required fields clearly"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Associate errors with inputs"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Use appropriate input types"}),e.jsx("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:"Provide helpful error messages"}),e.jsx("li",{style:{color:"white"},children:"Test with keyboard and screen reader"})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Every input needs a proper label"}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"required"})," and ",e.jsx("code",{children:"aria-required"})]}),e.jsxs("li",{children:["Associate errors with ",e.jsx("code",{children:"aria-describedby"})]}),e.jsxs("li",{children:["Mark invalid inputs with ",e.jsx("code",{children:"aria-invalid"})]}),e.jsxs("li",{children:["Group related fields with ",e.jsx("code",{children:"fieldset"})]}),e.jsx("li",{children:"Provide clear, helpful error messages"})]})]})]})}function n(){const[s,d]=a.useState(""),[r,i]=a.useState(""),[o,t]=a.useState(!1),c=l=>{if(l.preventDefault(),!s){i("Email is required");return}if(!s.includes("@")){i("Please enter a valid email address");return}i(""),t(!0),setTimeout(()=>t(!1),3e3)};return e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{style:{marginBottom:"var(--space-4)"},children:[e.jsxs("label",{htmlFor:"demo-email",style:{display:"block",marginBottom:"var(--space-2)",fontWeight:"bold"},children:["Email: ",e.jsx("span",{"aria-label":"required",style:{color:"var(--color-error)"},children:"*"})]}),e.jsx("input",{id:"demo-email",type:"email",value:s,onChange:l=>{d(l.target.value),i("")},"aria-invalid":!!r,"aria-describedby":r?"demo-email-error":void 0,"aria-required":"true",style:{width:"100%",padding:"var(--space-3)",border:`1px solid ${r?"var(--color-error)":"var(--border-color)"}`,borderRadius:"var(--radius-md)",fontSize:"var(--font-size-base)"}}),r&&e.jsx("div",{id:"demo-email-error",role:"alert",style:{marginTop:"var(--space-2)",color:"var(--color-error)",fontSize:"var(--font-size-sm)"},children:r})]}),e.jsx("button",{type:"submit",style:{padding:"var(--space-3) var(--space-6)",background:"var(--color-primary-500)",color:"white",border:"none",borderRadius:"var(--radius-md)",cursor:"pointer"},children:"Submit"}),o&&e.jsx("div",{role:"status","aria-live":"polite",style:{marginTop:"var(--space-4)",padding:"var(--space-3)",background:"var(--color-success)",color:"white",borderRadius:"var(--radius-md)"},children:"Form submitted successfully!"})]})}export{m as default};
//# sourceMappingURL=AccessibleForms-DkNWa-RT.js.map
