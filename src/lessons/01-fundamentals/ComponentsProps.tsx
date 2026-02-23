import { ReactNode } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
import sourceCode from './ComponentsProps.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, ReactNode } from 'react'

function Greeting({ name, age }: { name: string; age: number }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Hello, {name}!</h3>
            <p style={{ margin: 0, color: '#666' }}>Age: {age}</p>
        </div>
    )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
        }}>
            <h3 style={{ marginTop: 0 }}>{title}</h3>
            <div>{children}</div>
        </div>
    )
}

function Badge({ label }: { label: string }) {
    return (
        <span style={{
            padding: '4px 10px',
            background: '#e0e7ff',
            color: '#3730a3',
            borderRadius: 6,
            fontSize: 13,
            marginRight: 6,
        }}>
            {label}
        </span>
    )
}

export default function App() {
    const [name, setName] = useState('React')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Components and Props</h2>

            {/* Props demo */}
            <section style={{ marginBottom: 16 }}>
                <h3>Props</h3>
                <Greeting name="Alice" age={25} />
                <Greeting name="Bob" age={30} />
            </section>

            {/* Children demo */}
            <section style={{ marginBottom: 16 }}>
                <h3>Children Prop</h3>
                <Card title="Welcome">
                    <p>This content is passed as children.</p>
                    <div style={{ display: 'flex', gap: 4 }}>
                        <Badge label="React" />
                        <Badge label="TypeScript" />
                        <Badge label="Props" />
                    </div>
                </Card>
            </section>

            {/* Composition demo */}
            <section>
                <h3>Composition</h3>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter a name..."
                    style={{ padding: 8, fontSize: 14, marginBottom: 8, width: '100%' }}
                />
                <Card title="Dynamic Card">
                    <Greeting name={name || 'World'} age={0} />
                </Card>
            </section>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 450,
}

export default function ComponentsProps() {
    return (
        <LessonLayout title="Components & Props" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
            <p>
                Components are the building blocks of React applications. They let you split the UI into
                independent, reusable pieces.
            </p>

            {/* Section 1: What are Components? */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>What are Components?</h2>
                <p>
                    In React 19, we primarily use <strong>function components</strong>. A component is just a
                    JavaScript function that returns JSX.
                </p>

                <pre>
                    <code>{`// A simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Using the component
<Welcome />`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Live Example:</h3>
                    <Welcome />
                </div>
            </section>

            {/* Section 2: Props */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Props: Passing Data to Components</h2>
                <p>
                    Props (short for "properties") let you pass data from parent to child components. Think
                    of them as function arguments.
                </p>

                <pre>
                    <code>{`// Component that accepts props
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
<Greeting name="Bob" age={30} />`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Live Examples:</h3>
                    <Greeting name="Alice" age={25} />
                    <Greeting name="Bob" age={30} />
                    <Greeting name="Charlie" age={35} />
                </div>
            </section>

            {/* Section 3: Props Destructuring */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Props Destructuring</h2>
                <p>
                    You can destructure props directly in the function parameters for cleaner code. This is a
                    common pattern in modern React.
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--space-4)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <div>
                        <h4>Without Destructuring:</h4>
                        <pre>
                            <code>{`function Card(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}`}</code>
                        </pre>
                    </div>

                    <div>
                        <h4>With Destructuring (Better!):</h4>
                        <pre>
                            <code>{`function Card({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Section 4: Children Prop */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>The Special "children" Prop</h2>
                <p>
                    The <code>children</code> prop is a special prop that contains whatever you put between
                    the opening and closing tags of a component. It's fundamental to component composition.
                </p>

                <pre>
                    <code>{`function Card({ title, children }: { title: string; children: ReactNode }) {
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
</Card>`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Live Example:</h3>
                    <Card title="Welcome Card">
                        <p>This content is passed as the children prop!</p>
                        <p>You can pass multiple elements, and they all become children.</p>
                        <button
                            style={{
                                padding: 'var(--space-2) var(--space-4)',
                                background: 'var(--color-primary-500)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                            }}
                        >
                            Action Button
                        </button>
                    </Card>
                </div>
            </section>

            {/* Section 5: Component Composition */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Component Composition</h2>
                <p>
                    One of React's superpowers is composing small components into larger ones. This makes
                    your code reusable and easier to maintain.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3>Live Example: User Profile</h3>
                    <UserProfile
                        name="Sarah Johnson"
                        role="Senior React Developer"
                        bio="Passionate about building accessible and performant web applications."
                        skills={['React', 'TypeScript', 'Performance Optimization']}
                    />
                </div>

                <pre style={{ marginTop: 'var(--space-4)' }}>
                    <code>{`// Composed from smaller components
function UserProfile({ name, role, bio, skills }) {
  return (
    <div>
      <Avatar name={name} />
      <UserInfo name={name} role={role} bio={bio} />
      <SkillsList skills={skills} />
    </div>
  );
}`}</code>
                </pre>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>Components are reusable pieces of UI defined as functions that return JSX</li>
                    <li>Props let you pass data from parent to child components</li>
                    <li>Destructure props in function parameters for cleaner code</li>
                    <li>The children prop enables powerful composition patterns</li>
                    <li>Build complex UIs by composing small, focused components</li>
                    <li>Props are read-only - never modify them inside a component</li>
                </ul>
            </section>
            </div>
        </LessonLayout>
    )
}

// Example components used in the lesson

function Welcome() {
    return <h1 style={{ color: 'var(--color-primary-600)' }}>Hello, World!</h1>
}

function Greeting({ name, age }: { name: string; age: number }) {
    return (
        <div style={{ marginBottom: 'var(--space-4)' }}>
            <h2 style={{ color: 'var(--color-accent-600)', marginBottom: 'var(--space-2)' }}>
                Hello, {name}!
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>You are {age} years old.</p>
        </div>
    )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div
            style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                background: 'var(--bg-primary)',
            }}
        >
            <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary-600)' }}>
                {title}
            </h3>
            <div>{children}</div>
        </div>
    )
}

// Composition example components
function Avatar({ name }: { name: string }) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')

    return (
        <div
            style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                marginBottom: 'var(--space-4)',
            }}
        >
            {initials}
        </div>
    )
}

function UserInfo({ name, role, bio }: { name: string; role: string; bio: string }) {
    return (
        <div style={{ marginBottom: 'var(--space-4)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>{name}</h3>
            <p style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--space-3)' }}>{role}</p>
            <p style={{ color: 'var(--text-secondary)' }}>{bio}</p>
        </div>
    )
}

function SkillsList({ skills }: { skills: string[] }) {
    return (
        <div>
            <h4 style={{ marginBottom: 'var(--space-2)' }}>Skills:</h4>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {skills.map((skill) => (
                    <span
                        key={skill}
                        style={{
                            padding: 'var(--space-2) var(--space-3)',
                            background: 'var(--surface-primary)',
                            color: 'var(--on-surface-primary)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-sm)',
                        }}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

function UserProfile({
    name,
    role,
    bio,
    skills,
}: {
    name: string
    role: string
    bio: string
    skills: string[]
}) {
    return (
        <div
            style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                background: 'var(--bg-primary)',
            }}
        >
            <Avatar name={name} />
            <UserInfo name={name} role={role} bio={bio} />
            <SkillsList skills={skills} />
        </div>
    )
}
