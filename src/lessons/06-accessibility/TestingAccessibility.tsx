export default function TestingAccessibility() {
  return (
    <div>
      <h1>Testing Accessibility</h1>
      <p>
        Learn how to test your React applications for accessibility issues. Automated tools,
        manual testing, and screen reader testing.
      </p>

      {/* Section 1: Automated Testing */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Automated Testing Tools</h2>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Popular Tools:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>axe-core:</strong> Industry standard accessibility engine
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>jest-axe:</strong> Jest integration for accessibility tests
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>ESLint jsx-a11y:</strong> Catch issues during development
            </li>
            <li style={{ color: 'white' }}>
              <strong>Lighthouse:</strong> Chrome DevTools accessibility audit
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: jest-axe */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Testing with jest-axe</h2>

        <pre>
          <code>{`import { render } from '@testing-library/react';
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
});`}</code>
        </pre>
      </section>

      {/* Section 3: Testing Library */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>React Testing Library</h2>
        <p>Testing Library encourages accessible queries.</p>

        <pre>
          <code>{`import { render, screen } from '@testing-library/react';

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
});`}</code>
        </pre>
      </section>

      {/* Section 4: Manual Testing */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Manual Testing Checklist</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>✅ Test These:</h3>
          <ol style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Keyboard navigation:</strong> Tab through entire app
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Focus indicators:</strong> Visible focus on all elements
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Color contrast:</strong> Text readable on backgrounds
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Screen reader:</strong> Test with NVDA, JAWS, or VoiceOver
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Zoom:</strong> Test at 200% zoom
            </li>
            <li style={{ color: 'white' }}>
              <strong>Forms:</strong> All inputs labeled and errors announced
            </li>
          </ol>
        </div>
      </section>

      {/* Section 5: Screen Reader Testing */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Screen Reader Testing</h2>

        <div
          style={{
            background: 'var(--color-warning)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>💡 Screen Readers:</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>Windows:</strong> NVDA (free) or JAWS
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>macOS:</strong> VoiceOver (built-in, Cmd+F5)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              <strong>iOS:</strong> VoiceOver (Settings → Accessibility)
            </li>
            <li style={{ color: 'white' }}>
              <strong>Android:</strong> TalkBack
            </li>
          </ul>
        </div>
      </section>

      {/* Section 6: CI/CD Integration */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>CI/CD Integration</h2>

        <pre>
          <code>{`// package.json
{
  "scripts": {
    "test:a11y": "jest --testMatch='**/*.a11y.test.js'",
    "lint:a11y": "eslint --plugin jsx-a11y"
  }
}

// GitHub Actions
- name: Run accessibility tests
  run: npm run test:a11y`}</code>
        </pre>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>Use automated tools (jest-axe, ESLint jsx-a11y)</li>
          <li>Test with keyboard navigation</li>
          <li>Use accessible queries in tests</li>
          <li>Manual testing is essential</li>
          <li>Test with real screen readers</li>
          <li>Integrate accessibility tests in CI/CD</li>
          <li>Automated tools catch ~30-40% of issues</li>
        </ul>
      </section>
    </div>
  )
}
