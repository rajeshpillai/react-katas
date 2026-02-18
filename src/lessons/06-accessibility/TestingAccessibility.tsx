import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './TestingAccessibility.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

interface CheckItem {
    id: string
    label: string
    description: string
    passed: boolean
}

const initialChecks: CheckItem[] = [
    {
        id: 'color-contrast',
        label: 'Color Contrast',
        description: 'Text has at least 4.5:1 contrast ratio against background',
        passed: false,
    },
    {
        id: 'keyboard-nav',
        label: 'Keyboard Navigation',
        description: 'All interactive elements are reachable and operable via keyboard',
        passed: false,
    },
    {
        id: 'screen-reader',
        label: 'Screen Reader',
        description: 'Content is announced correctly by screen readers (labels, roles, states)',
        passed: false,
    },
    {
        id: 'focus-management',
        label: 'Focus Management',
        description: 'Focus is visible, logical, and trapped in modals when appropriate',
        passed: false,
    },
]

export default function App() {
    const [checks, setChecks] = useState<CheckItem[]>(initialChecks)

    const toggle = (id: string) => {
        setChecks(prev =>
            prev.map(c => (c.id === id ? { ...c, passed: !c.passed } : c))
        )
    }

    const passedCount = checks.filter(c => c.passed).length
    const total = checks.length

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Accessibility Checklist</h2>
            <p style={{ color: '#666', marginBottom: 16 }}>
                Toggle each check as pass/fail. {passedCount}/{total} passing.
            </p>

            <div
                style={{
                    width: '100%',
                    height: 8,
                    background: '#e0e0e0',
                    borderRadius: 4,
                    marginBottom: 20,
                    overflow: 'hidden',
                }}
                role="progressbar"
                aria-valuenow={passedCount}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-label={\`\${passedCount} of \${total} checks passing\`}
            >
                <div
                    style={{
                        width: \`\${(passedCount / total) * 100}%\`,
                        height: '100%',
                        background: passedCount === total ? '#4caf50' : '#2196f3',
                        transition: 'width 0.3s, background 0.3s',
                        borderRadius: 4,
                    }}
                />
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {checks.map(check => (
                    <li
                        key={check.id}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12,
                            padding: '12px 16px',
                            marginBottom: 8,
                            background: check.passed ? '#e8f5e9' : '#fff',
                            border: \`1px solid \${check.passed ? '#c8e6c9' : '#e0e0e0'}\`,
                            borderRadius: 8,
                            transition: 'background 0.2s, border-color 0.2s',
                        }}
                    >
                        <button
                            role="switch"
                            aria-checked={check.passed}
                            aria-label={\`\${check.label}: \${check.passed ? 'passing' : 'failing'}\`}
                            onClick={() => toggle(check.id)}
                            style={{
                                flexShrink: 0,
                                width: 44,
                                height: 24,
                                borderRadius: 12,
                                border: 'none',
                                background: check.passed ? '#4caf50' : '#bdbdbd',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'background 0.2s',
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    top: 2,
                                    left: check.passed ? 22 : 2,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    background: '#fff',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                    transition: 'left 0.2s',
                                }}
                            />
                        </button>
                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: 2 }}>
                                {check.label}
                                <span
                                    style={{
                                        marginLeft: 8,
                                        fontSize: 12,
                                        padding: '2px 8px',
                                        borderRadius: 10,
                                        background: check.passed ? '#4caf50' : '#f44336',
                                        color: '#fff',
                                    }}
                                >
                                    {check.passed ? 'PASS' : 'FAIL'}
                                </span>
                            </div>
                            <div style={{ fontSize: 13, color: '#666' }}>{check.description}</div>
                        </div>
                    </li>
                ))}
            </ul>

            {passedCount === total && (
                <div
                    role="status"
                    aria-live="polite"
                    style={{
                        marginTop: 16,
                        padding: 12,
                        background: '#e8f5e9',
                        borderRadius: 8,
                        border: '1px solid #c8e6c9',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#2e7d32',
                    }}
                >
                    All accessibility checks passing!
                </div>
            )}
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 500,
}

export default function TestingAccessibility() {
    return (
        <LessonLayout title="Testing Accessibility" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Popular Tools:</h3>
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

  // Good: Query by role
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

  // Good: Query by label
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Test These:</h3>
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
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Screen Readers:</h3>
                    <ul style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>Windows:</strong> NVDA (free) or JAWS
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>macOS:</strong> VoiceOver (built-in, Cmd+F5)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <strong>iOS:</strong> VoiceOver (Settings - Accessibility)
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
        </LessonLayout>
    )
}
