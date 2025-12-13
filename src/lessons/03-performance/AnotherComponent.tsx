export default function AnotherComponent() {
    return (
        <div
            style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-100)',
                borderRadius: 'var(--radius-md)',
            }}
        >
            <h3>Another Lazy Component!</h3>
            <p>This is also code-split and loaded on demand.</p>
        </div>
    )
}
