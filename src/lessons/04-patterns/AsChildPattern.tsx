import { useState, ReactNode, ReactElement, cloneElement, isValidElement } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './AsChildPattern.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, ReactNode, ReactElement, cloneElement, isValidElement, forwardRef } from 'react'

// --- Slot: the core primitive for asChild ---

interface SlotProps {
    children: ReactNode
    [key: string]: unknown
}

function Slot({ children, ...slotProps }: SlotProps) {
    if (isValidElement(children)) {
        // Merge slotProps onto the child element
        const childProps = children.props as Record<string, unknown>
        const mergedStyle = {
            ...(slotProps.style as object || {}),
            ...(childProps.style as object || {}),
        }
        return cloneElement(children as ReactElement<Record<string, unknown>>, {
            ...slotProps,
            ...childProps,
            style: mergedStyle,
        })
    }
    // If children is just text or fragment, wrap in span
    return <span {...slotProps}>{children}</span>
}

// --- Button with asChild support ---

interface ButtonProps {
    asChild?: boolean
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode
    onClick?: () => void
}

function Button({ asChild, variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        borderRadius: 8,
        cursor: 'pointer',
        textDecoration: 'none',
        border: 'none',
        transition: 'opacity 0.15s',
        fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 14,
        padding: size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 24px' : '8px 16px',
        ...(variant === 'primary' && { background: '#4361ee', color: 'white' }),
        ...(variant === 'outline' && { background: 'transparent', border: '2px solid #4361ee', color: '#4361ee' }),
        ...(variant === 'ghost' && { background: 'transparent', color: '#4361ee' }),
    }

    if (asChild) {
        return <Slot style={baseStyle} onClick={onClick}>{children}</Slot>
    }

    return (
        <button style={baseStyle} onClick={onClick}>
            {children}
        </button>
    )
}

// --- Demo App ---

export default function App() {
    const [useAsChild, setUseAsChild] = useState(false)
    const [variant, setVariant] = useState<'primary' | 'outline' | 'ghost'>('primary')

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>asChild Pattern Demo</h2>

            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={useAsChild}
                        onChange={() => setUseAsChild(!useAsChild)}
                    />
                    <strong>Enable asChild</strong> (renders as {'<a>'} instead of {'<button>'})
                </label>

                <div style={{ display: 'flex', gap: 8 }}>
                    {(['primary', 'outline', 'ghost'] as const).map(v => (
                        <button
                            key={v}
                            onClick={() => setVariant(v)}
                            style={{
                                padding: '4px 12px',
                                background: variant === v ? '#4361ee' : '#eee',
                                color: variant === v ? 'white' : '#333',
                                border: 'none',
                                borderRadius: 6,
                                cursor: 'pointer',
                            }}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 12 }}>
                {useAsChild ? (
                    <Button asChild variant={variant}>
                        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                            Visit React Docs
                        </a>
                    </Button>
                ) : (
                    <Button variant={variant} onClick={() => alert('Button clicked!')}>
                        Click Me
                    </Button>
                )}

                <p style={{ marginTop: 16, fontSize: 13, color: '#666' }}>
                    Rendered as: <code>{useAsChild ? '<a>' : '<button>'}</code>
                    {' '}| Inspect the DOM to verify!
                </p>
            </div>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 400,
}

// --- Slot component for merging props onto child ---

interface SlotProps {
    children: ReactNode
    [key: string]: unknown
}

function Slot({ children, ...slotProps }: SlotProps) {
    if (isValidElement(children)) {
        const childProps = children.props as Record<string, unknown>
        const mergedStyle = {
            ...(slotProps.style as object || {}),
            ...(childProps.style as object || {}),
        }
        return cloneElement(children as ReactElement<Record<string, unknown>>, {
            ...slotProps,
            ...childProps,
            style: mergedStyle,
        })
    }
    return <span {...slotProps}>{children}</span>
}

// --- Button with asChild support ---

interface DemoButtonProps {
    asChild?: boolean
    variant?: 'primary' | 'outline'
    children: ReactNode
    onClick?: () => void
}

function DemoButton({ asChild, variant = 'primary', children, onClick }: DemoButtonProps) {
    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        fontWeight: 600,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textDecoration: 'none',
        border: 'none',
        padding: 'var(--space-3) var(--space-5)',
        fontSize: 'var(--font-size-base)',
        ...(variant === 'primary' && { background: 'var(--color-primary-500)', color: 'white' }),
        ...(variant === 'outline' && { background: 'transparent', border: '2px solid var(--color-primary-500)', color: 'var(--color-primary-500)' }),
    }

    if (asChild) {
        return <Slot style={baseStyle} onClick={onClick}>{children}</Slot>
    }

    return (
        <button style={baseStyle} onClick={onClick}>
            {children}
        </button>
    )
}

export default function AsChildPattern() {
    const [useAsChild, setUseAsChild] = useState(false)
    const [clickCount, setClickCount] = useState(0)

    return (
        <LessonLayout title="asChild Pattern" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <div>
            <p>
                The <code>asChild</code> pattern lets a component delegate its rendering to its
                child element while merging its own behavior and styles onto that child. Instead
                of rendering its default element (e.g., a <code>&lt;button&gt;</code>), the
                component passes its props down to whatever child you provide. This pattern was
                popularized by Radix UI.
            </p>

            {/* Section 1: The Problem */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>The Problem</h2>
                <p>
                    You build a <code>&lt;Button&gt;</code> component with specific styles and behavior.
                    But sometimes you need that same button to render as an <code>&lt;a&gt;</code> tag
                    for navigation, or as a <code>&lt;Link&gt;</code> from your router. How do you
                    handle this without duplicating styles?
                </p>

                <pre>
                    <code>{`// You want a Button that looks the same but renders as a link:
<Button>Click me</Button>          // renders <button>
<Button as="a" href="/home">Home</Button>  // renders <a>

// But what about a router Link?
<Button as={Link} to="/dashboard">Dashboard</Button>

// TypeScript gets confused: which props are valid?`}</code>
                </pre>
            </section>

            {/* Section 2: Solution 1 - the "as" prop */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Solution 1: The "as" Prop (Polymorphic Components)</h2>
                <p>
                    The traditional approach uses an <code>as</code> prop to specify which element to render.
                    Libraries like Styled Components and Chakra UI use this pattern.
                </p>

                <pre>
                    <code>{`interface ButtonProps<T extends React.ElementType = 'button'> {
    as?: T
    children: ReactNode
}

// The component renders whatever element "as" specifies
function Button<T extends React.ElementType = 'button'>({
    as,
    children,
    ...props
}: ButtonProps<T> & React.ComponentPropsWithoutRef<T>) {
    const Component = as || 'button'
    return <Component className="btn" {...props}>{children}</Component>
}

// Usage
<Button>Click me</Button>
<Button as="a" href="/home">Home</Button>`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--surface-accent)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ marginBottom: 'var(--space-3)' }}>Problems with "as"</h3>
                    <ul>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>TypeScript complexity</strong> - Generic types become deeply nested and hard to maintain
                        </li>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Prop conflicts</strong> - Hard to know which props belong to the button vs the underlying element
                        </li>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Ref forwarding</strong> - Forwarding refs correctly through generic types is painful
                        </li>
                        <li>
                            <strong>Bundle size</strong> - TypeScript inference for polymorphic types can slow down IDEs
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 3: Solution 2 - asChild */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Solution 2: The "asChild" Prop (Radix UI Approach)</h2>
                <p>
                    Instead of telling the component <em>what</em> to render via a type, you give it a
                    child element and tell it to merge its props onto that child. The consumer has full
                    control over the rendered element.
                </p>

                <pre>
                    <code>{`// When asChild is false (default):
// Button renders its own <button> element
<Button>Click me</Button>
// Output: <button class="btn">Click me</button>

// When asChild is true:
// Button renders the child element with Button's props merged in
<Button asChild>
    <a href="/home">Home</a>
</Button>
// Output: <a href="/home" class="btn">Home</a>`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--surface-primary)',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ marginBottom: 'var(--space-3)' }}>Advantages of asChild</h3>
                    <ul>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Simple types</strong> - No complex generics needed; children is just <code>ReactNode</code>
                        </li>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Full control</strong> - Consumer provides the exact element with its own props
                        </li>
                        <li style={{ marginBottom: 'var(--space-2)' }}>
                            <strong>Composable</strong> - Works with any element or component, including router Links
                        </li>
                        <li>
                            <strong>Clean separation</strong> - Behavior/style props stay on the parent; element props stay on the child
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 4: Interactive Demo */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Interactive Demo</h2>
                <p>
                    Toggle <code>asChild</code> to see the Button render as either a native
                    <code>&lt;button&gt;</code> or an <code>&lt;a&gt;</code> tag, while keeping the same
                    styles.
                </p>

                <div
                    style={{
                        background: 'var(--bg-secondary)',
                        padding: 'var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={useAsChild}
                            onChange={() => setUseAsChild(!useAsChild)}
                        />
                        <strong>Enable asChild</strong> (renders as <code>&lt;a&gt;</code> instead of <code>&lt;button&gt;</code>)
                    </label>

                    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                        {useAsChild ? (
                            <DemoButton asChild variant="primary">
                                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                                    Visit React Docs
                                </a>
                            </DemoButton>
                        ) : (
                            <DemoButton
                                variant="primary"
                                onClick={() => setClickCount(c => c + 1)}
                            >
                                Click Me ({clickCount})
                            </DemoButton>
                        )}

                        {useAsChild ? (
                            <DemoButton asChild variant="outline">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </DemoButton>
                        ) : (
                            <DemoButton variant="outline" onClick={() => setClickCount(c => c + 1)}>
                                Outline ({clickCount})
                            </DemoButton>
                        )}
                    </div>

                    <div
                        style={{
                            marginTop: 'var(--space-4)',
                            padding: 'var(--space-3)',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: 'var(--font-size-sm)',
                        }}
                    >
                        <strong>Rendered element:</strong>{' '}
                        <code>{useAsChild ? '<a>' : '<button>'}</code>
                        {!useAsChild && <span> | Click count: {clickCount}</span>}
                    </div>

                    <pre style={{ marginTop: 'var(--space-4)', background: 'transparent' }}>
                        <code>{useAsChild
? `<Button asChild variant="primary">
    <a href="https://react.dev" target="_blank">
        Visit React Docs
    </a>
</Button>`
: `<Button variant="primary" onClick={handleClick}>
    Click Me
</Button>`}</code>
                    </pre>
                </div>
            </section>

            {/* Section 5: Implementation */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Implementation: The Slot Component</h2>
                <p>
                    The core of the <code>asChild</code> pattern is a <code>Slot</code> component
                    that uses <code>React.cloneElement</code> to merge the parent's props onto the child element.
                </p>

                <pre>
                    <code>{`function Slot({ children, ...slotProps }) {
    if (React.isValidElement(children)) {
        // Merge parent props onto the child element
        return React.cloneElement(children, {
            ...slotProps,           // Parent's props (styles, handlers)
            ...children.props,      // Child's own props (href, target)
            style: {
                ...slotProps.style,       // Parent styles (button look)
                ...children.props.style,  // Child styles (overrides)
            },
        })
    }
    return <span {...slotProps}>{children}</span>
}

// The Button component uses Slot when asChild is true:
function Button({ asChild, variant, children, ...props }) {
    const style = getVariantStyle(variant)

    if (asChild) {
        // Delegate rendering to the child via Slot
        return <Slot style={style} {...props}>{children}</Slot>
    }

    // Default: render a <button>
    return <button style={style} {...props}>{children}</button>
}`}</code>
                </pre>

                <div
                    style={{
                        background: 'var(--color-info)',
                        color: 'white',
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-lg)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>How Prop Merging Works</h3>
                    <ol style={{ paddingLeft: 'var(--space-6)' }}>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Parent provides style and behavior props (className, onClick, style)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            Child provides element-specific props (href, target, type)
                        </li>
                        <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                            <code>cloneElement</code> merges both sets of props onto the child
                        </li>
                        <li style={{ color: 'white' }}>
                            Styles are shallow-merged; child's style properties can override parent's
                        </li>
                    </ol>
                </div>
            </section>

            {/* Section 6: When to use which */}
            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>When to Use asChild vs "as" Prop</h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--space-4)',
                        marginTop: 'var(--space-4)',
                    }}
                >
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-primary)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-primary)' }}>Use asChild When</h3>
                        <ul>
                            <li>Building a design system or component library</li>
                            <li>TypeScript strictness matters</li>
                            <li>You need to compose with third-party components (router Links)</li>
                            <li>You want clean, simple component types</li>
                        </ul>
                    </div>
                    <div
                        style={{
                            padding: 'var(--space-4)',
                            background: 'var(--surface-accent)',
                            borderRadius: 'var(--radius-lg)',
                        }}
                    >
                        <h3 style={{ color: 'var(--on-surface-accent)' }}>Use "as" Prop When</h3>
                        <ul>
                            <li>You only switch between a few known elements</li>
                            <li>Your team is familiar with the polymorphic pattern</li>
                            <li>You use a library that already provides it (Chakra, Styled Components)</li>
                            <li>Simplicity of usage outweighs type safety</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Key Takeaways */}
            <section>
                <h2>Key Takeaways</h2>
                <ul>
                    <li>
                        <code>asChild</code> lets a component delegate rendering to its child while
                        merging its own styles and behavior
                    </li>
                    <li>
                        It solves the polymorphic rendering problem without complex TypeScript generics
                    </li>
                    <li>
                        The core mechanism is a <code>Slot</code> component that uses <code>cloneElement</code> to
                        merge props
                    </li>
                    <li>
                        The consumer has full control over the rendered element and its native props
                    </li>
                    <li>
                        Popularized by Radix UI, now widely adopted in modern component libraries
                    </li>
                    <li>
                        Prefer <code>asChild</code> for design systems; the <code>as</code> prop is fine for simpler use cases
                    </li>
                </ul>
            </section>
            </div>
        </LessonLayout>
    )
}
