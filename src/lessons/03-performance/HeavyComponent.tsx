export default function HeavyComponent() {
    return (
        <div
            style={{
                padding: 'var(--space-4)',
                background: 'var(--color-success)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
            }}
        >
            <h3 style={{ color: 'white' }}>Heavy Component Loaded!</h3>
            <p style={{ color: 'white' }}>
                This component was lazy-loaded. Check your network tab to see it loaded as a separate chunk.
            </p>
        </div>
    )
}
