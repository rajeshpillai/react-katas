import { Diagram } from './diagram'

/**
 * Splitting a single { value, setter } context into two contexts means
 * components can subscribe only to what they need. The setter reference
 * is stable, so toggle buttons don't re-render on value changes.
 */
export function ProviderPatternDiagram() {
    return (
        <Diagram
            title="Split Contexts — subscribe to what you need"
            caption="One lumped { theme, setTheme } context forces every consumer to re-render on toggle. Two contexts (value + setter) let the toggle button subscribe only to the setter — its render counter stays at 1."
            viewBox="0 0 720 300"
        >
            {/* Two providers stacked */}
            <rect x="160" y="20" width="200" height="56" rx="10" className="box-accent" />
            <text x="260" y="44" textAnchor="middle" className="label">{'<ThemeCtx>'}</text>
            <text x="260" y="62" textAnchor="middle" className="label-mono">value: theme</text>

            <rect x="380" y="20" width="200" height="56" rx="10" className="box-accent" />
            <text x="480" y="44" textAnchor="middle" className="label">{'<SetThemeCtx>'}</text>
            <text x="480" y="62" textAnchor="middle" className="label-mono">value: setTheme</text>

            {/* Display reads theme */}
            <rect x="40" y="170" width="220" height="80" rx="8" className="box" />
            <text x="56" y="194" className="label">{'<ThemeDisplay />'}</text>
            <text x="56" y="214" className="label-mono">useContext(ThemeCtx)</text>
            <text x="56" y="234" className="label-muted">re-renders on theme change</text>

            {/* Toggle reads setter */}
            <rect x="290" y="170" width="220" height="80" rx="8" className="box" />
            <text x="306" y="194" className="label">{'<ToggleButton />'}</text>
            <text x="306" y="214" className="label-mono">useContext(SetThemeCtx)</text>
            <text x="306" y="234" className="label-muted">never re-renders (setter stable)</text>

            {/* Independent consumer */}
            <rect x="540" y="170" width="160" height="80" rx="8" className="box" />
            <text x="556" y="194" className="label">{'<ExpensiveTree />'}</text>
            <text x="556" y="214" className="label-mono">no context</text>
            <text x="556" y="234" className="label-muted">never re-renders</text>

            {/* Arrows: ThemeCtx to Display, SetThemeCtx to Toggle */}
            <path d="M 250 76 Q 200 130, 150 170" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />
            <path d="M 470 76 Q 420 130, 400 170" className="arrow-accent" markerEnd="url(#arrowhead-accent)" />

            <text x="360" y="288" textAnchor="middle" className="label-muted">
                Stacked Providers · each consumer reads only the slice it cares about
            </text>
        </Diagram>
    )
}
