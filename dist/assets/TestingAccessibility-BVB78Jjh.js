import{j as e}from"./index-C8jGRvk-.js";import"./react-vendor-CVzL7Oab.js";function i(){return e.jsxs("div",{children:[e.jsx("h1",{children:"Testing Accessibility"}),e.jsx("p",{children:"Learn how to test your React applications for accessibility issues. Automated tools, manual testing, and screen reader testing."}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Automated Testing Tools"}),e.jsxs("div",{style:{background:"var(--color-info)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Popular Tools:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"axe-core:"})," Industry standard accessibility engine"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"jest-axe:"})," Jest integration for accessibility tests"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"ESLint jsx-a11y:"})," Catch issues during development"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Lighthouse:"})," Chrome DevTools accessibility audit"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Testing with jest-axe"}),e.jsx("pre",{children:e.jsx("code",{children:`import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const { container } = render(<button>Click me</button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Form has proper labels', async () => {
  const { container } = render(
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" />
    </form>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"React Testing Library"}),e.jsx("p",{children:"Testing Library encourages accessible queries."}),e.jsx("pre",{children:e.jsx("code",{children:`import { render, screen } from '@testing-library/react';

test('Find by accessible role', () => {
  render(<button>Submit</button>);
  
  // ✅ Good: Query by role
  const button = screen.getByRole('button', { name: 'Submit' });
  expect(button).toBeInTheDocument();
});

test('Find by label text', () => {
  render(
    <>
      <label htmlFor="email">Email:</label>
      <input id="email" type="email" />
    </>
  );
  
  // ✅ Good: Query by label
  const input = screen.getByLabelText('Email:');
  expect(input).toBeInTheDocument();
});`})})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Manual Testing Checklist"}),e.jsxs("div",{style:{background:"var(--color-success)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"✅ Test These:"}),e.jsxs("ol",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Keyboard navigation:"})," Tab through entire app"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Focus indicators:"})," Visible focus on all elements"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Color contrast:"})," Text readable on backgrounds"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Screen reader:"})," Test with NVDA, JAWS, or VoiceOver"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Zoom:"})," Test at 200% zoom"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Forms:"})," All inputs labeled and errors announced"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"Screen Reader Testing"}),e.jsxs("div",{style:{background:"var(--color-warning)",color:"white",padding:"var(--space-4)",borderRadius:"var(--radius-lg)",marginTop:"var(--space-4)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"var(--space-3)"},children:"💡 Screen Readers:"}),e.jsxs("ul",{style:{paddingLeft:"var(--space-6)"},children:[e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"Windows:"})," NVDA (free) or JAWS"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"macOS:"})," VoiceOver (built-in, Cmd+F5)"]}),e.jsxs("li",{style:{color:"white",marginBottom:"var(--space-2)"},children:[e.jsx("strong",{children:"iOS:"})," VoiceOver (Settings → Accessibility)"]}),e.jsxs("li",{style:{color:"white"},children:[e.jsx("strong",{children:"Android:"})," TalkBack"]})]})]})]}),e.jsxs("section",{style:{marginBottom:"var(--space-8)"},children:[e.jsx("h2",{children:"CI/CD Integration"}),e.jsx("pre",{children:e.jsx("code",{children:`// package.json
{
  "scripts": {
    "test:a11y": "jest --testMatch='**/*.a11y.test.js'",
    "lint:a11y": "eslint --plugin jsx-a11y"
  }
}

// GitHub Actions
- name: Run accessibility tests
  run: npm run test:a11y`})})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Key Takeaways"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use automated tools (jest-axe, ESLint jsx-a11y)"}),e.jsx("li",{children:"Test with keyboard navigation"}),e.jsx("li",{children:"Use accessible queries in tests"}),e.jsx("li",{children:"Manual testing is essential"}),e.jsx("li",{children:"Test with real screen readers"}),e.jsx("li",{children:"Integrate accessibility tests in CI/CD"}),e.jsx("li",{children:"Automated tools catch ~30-40% of issues"})]})]})]})}export{i as default};
//# sourceMappingURL=TestingAccessibility-BVB78Jjh.js.map
