# CLAUDE.md — React Katas Project Guide

## Project Overview

An interactive React 19 + TypeScript tutorial platform that teaches component design and composition patterns from scratch (no external UI libraries). Inspired by Radix UI (composition & primitives) and usehooks.com (behavioral isolation), but everything is rebuilt from first principles.

The catalog also exposes an **Interview Role Play** mode that overlays the kata catalog with five experience-tier sequences (Beginner → Architect), turning the same kata content into a curated interview-prep flow.

## Tech Stack

- **React 19.2** with automatic JSX runtime
- **TypeScript** (strict mode)
- **Vite 6** (dev server on port 3000, path aliases: `@lessons`, `@components`, `@hooks`, `@router`, `@utils`)
- **CodeMirror 6** for the in-browser playground editor and read-only source viewer
- **Sucrase** for in-browser TSX transpilation (the playground runs user edits in an iframe sandbox)
- **Vitest + React Testing Library** for tests (currently sparse)
- **CSS Modules** for scoped styles, CSS custom properties for theming
- **No external UI libraries** — all components built from scratch

## Architecture

```
src/
├── App.tsx                       # Routing + layout shell
├── index.css                     # Design system (CSS custom properties)
├── router/
│   ├── router.tsx                # Custom Context-based router (no React Router)
│   ├── routes.ts                 # Lesson catalog with lazy() imports (46 lessons)
│   └── interview-tiers.ts        # Tier metadata + question sequences for Interview Role Play
├── components/
│   ├── diagrams/                 # Inline-SVG pattern diagrams (theme-aware)
│   ├── header/                   # Site header (Home, theme toggle, GitHub link)
│   ├── interview/                # Tier landing, tier page, interview sidebar
│   ├── lesson-layout/            # Lesson tabs, source viewer, variant selector
│   ├── navigation/               # Standard sidebar
│   └── playground/               # CodeMirror editor + transpiler + iframe + console panel
├── hooks/
│   ├── use-progress.ts           # localStorage-based completion tracking
│   ├── use-theme.ts              # Theme toggle (light / dark / system) via data-theme
│   └── use-debounce.ts
└── lessons/
    ├── 01-fundamentals/          # 6 katas
    ├── 02-hooks/                 # 7 katas
    ├── 03-performance/           # 8 katas
    ├── 04-patterns/              # 9 katas
    ├── 05-state/                 # 4 katas
    ├── 06-accessibility/         # 4 katas
    ├── 07-machine-coding/        # 5 katas
    └── 08-architecture/          # 3 architect-tier framing lessons (no playground)
```

## Commands

```bash
npm run dev        # Vite dev server with HMR (http://localhost:3000)
npm run build      # tsc + Vite production build (also opens stats.html bundle viewer)
npm run preview    # Preview the production build
npm run test       # Vitest in watch mode
npm run test:ui    # Vitest with browser UI
npm run lint       # ESLint — currently passes clean (zero-warnings policy)
```

## Progression (46 katas across 8 sections)

| # | Section | Katas | Level |
|---|---|---|---|
| 1 | Fundamentals | 6 | Beginner |
| 2 | Hooks & Side Effects | 7 | Beginner-Intermediate |
| 3 | Performance Optimization | 8 | Intermediate |
| 4 | Advanced Patterns | 9 | Intermediate-Advanced |
| 5 | State Management | 4 | Intermediate-Advanced |
| 6 | Accessibility & Production | 4 | Advanced |
| 7 | Machine Coding Challenges | 5 | Advanced |
| 8 | Architecture & Leadership | 3 | Architect / Principal |

## Kata Lesson Structure

Every lesson component renders `<LessonLayout>` and follows this pattern:
1. **Concept overview** — what the pattern is and why it matters
2. **Interactive demo** in the playground — either a single config or a multi-variant Before/After
3. **Code examples** — inline `<pre><code>` blocks for explanations
4. **Key takeaways** — summary bullets
5. **Source code tab** — full lesson source via Vite `?raw` import, syntax-highlighted
6. **Mark as Complete** button + Previous/Next navigation (tier-aware in interview mode)

## Authoring Conventions (MANDATORY for new and edited katas)

### 1. Prefer the Before/After variant pattern when there's a natural failure mode

`<LessonLayout>` accepts either `playgroundConfig` (single demo) or `playgroundVariants` (multi-version). When a kata teaches a concept that has a clear "naive vs correct" framing, use variants:

```tsx
import type { PlaygroundVariant } from '@components/playground'

export const playgroundVariants: PlaygroundVariant[] = [
    {
        id: 'broken',
        label: 'Before — describe-the-failure',
        description: 'Short note framing what to look for in this variant.',
        files: [{ name: 'App.tsx', language: 'tsx', code: `...` }],
        entryFile: 'App.tsx',
        height: 280,
    },
    {
        id: 'fixed',
        label: 'After — describe-the-fix',
        description: '...',
        files: [{ name: 'App.tsx', language: 'tsx', code: `...` }],
    },
]

<LessonLayout title="..." playgroundVariants={playgroundVariants} sourceCode={sourceCode}>
```

**Rules:**
- Variant labels follow `Before — <failure>` / `After — <fix>` shape so the segmented selector reads clearly.
- Each variant has a 1-2 sentence `description` framing the teaching point.
- Switching variants force-remounts the playground (keyed on variant id) so editor/console/error state is fresh.

Don't force variants where the demo is genuinely a single working showcase (jsx-basics, machine-coding implementations, abstract concept lessons). The single `playgroundConfig` form is still supported.

### 2. Use theme-aware CSS variables in playground inline styles

The playground iframe exposes these variables on `:root` and overrides them on `body.dark`. **All kata playground inline styles MUST use these instead of hard-coded colors:**

| Variable | Light | Dark | Use for |
|---|---|---|---|
| `var(--pg-card)` | `#fafafa` | `#1f2937` | Card / surface backgrounds |
| `var(--pg-card-border)` | `#ddd` | `#374151` | Borders on cards, separators |
| `var(--pg-card-text)` | `#1f2937` | `#e2e8f0` | Body text on a card surface |
| `var(--pg-muted)` | `#6b7280` | `#9ca3af` | Help text, secondary labels |
| `var(--pg-input-bg)` | `#fff` | `#0f172a` | Form input backgrounds |
| `var(--pg-input-border)` | `#d1d5db` | `#374151` | Form input borders |

Hard-coded `#fff`, `#fafafa`, `#888`, `#ddd`, etc. will look correct in light mode and broken in dark mode. Reserve hex values for **deliberately invariant accents** (button colors, error/success washes, traffic-light state colors).

### 3. Use functional setState everywhere

Always:

```tsx
setCount(c => c + 1)            // ✓
setItems(prev => [...prev, x])  // ✓
```

Never:

```tsx
setCount(count + 1)             // ✗ stale closure under batching/StrictMode
setItems([...items, x])         // ✗ same
```

The lint rules don't catch this; conventions catches it during review.

### 4. Console output "just works" in the playground

The playground iframe proxies `console.log/info/warn/error/debug` and forwards them to a dedicated panel below the preview. Lesson playground code can use `console.log()` freely — there's no need to add a custom in-page logger. Logs cap at 500 entries, clear on code change, and color-code by method.

### 5. Pattern diagrams

For pattern katas (compound components, render props, HOCs, portals, etc.), drop a visual mental model near the top of the lesson body before the first explanatory section. Diagrams live in [src/components/diagrams/](src/components/diagrams/) as inline-SVG React components and import via the `@components/diagrams` alias.

```tsx
import { CompoundComponentsDiagram } from '@components/diagrams'

<LessonLayout title="..." playgroundVariants={...} sourceCode={sourceCode}>
    <p>Intro paragraph...</p>
    <CompoundComponentsDiagram />   {/* visual model right after the intro */}
    <section>...</section>
</LessonLayout>
```

**Rules for new diagrams:**
- Wrap with the shared [`<Diagram>`](src/components/diagrams/diagram.tsx) primitive — it provides the themed container, ALT-text plumbing, and SVG arrowhead defs.
- Use the prebaked SVG classes (`box`, `box-accent`, `box-muted`, `arrow`, `arrow-accent`, `label`, `label-muted`, `label-mono`, `label-accent`) from [diagram.module.css](src/components/diagrams/diagram.module.css) so colours track the app's light/dark theme.
- Use `arrow-accent` + `markerEnd="url(#arrowhead-accent)"` to highlight the *one* relationship the diagram is teaching; everything else stays muted. Don't paint everything in primary colour.
- Each diagram needs a one-sentence `caption` so the figure has a clear reading.
- Keep them small (≤ ~720x320 viewBox) — the figure is supplemental, not the whole lesson.

### 6. Lint scope

`eslint.config.js` disables a handful of rules **only inside `src/lessons/**`** because they fire on legitimate teaching demos:

- `react-hooks/refs` — render counters via `useRef.current += 1`
- `react-hooks/set-state-in-effect` — derived-state-from-props anti-pattern intentionally shown as the "before" variant
- `jsx-a11y/click-events-have-key-events`, `no-static-element-interactions`, etc. — the ARIA kata deliberately renders inaccessible patterns first

**Production code outside `src/lessons/` still gets the strict rules.** Don't disable rules globally; if a rule fires in `src/components/` or `src/router/`, fix the code.

## Teaching Philosophy (MANDATORY)

### What to teach
- **Why the pattern exists** — what problem does it solve?
- **Why naive React fails** — show the broken version as a `Before` variant when there's a clear failure mode.
- **When NOT to use it** — every pattern has tradeoffs.
- **Alternatives** — compare render props vs hooks, compound vs props, etc.
- **One core idea per kata** — don't combine multiple concepts.

### How to teach
- Introduce concepts incrementally, never dump large code at once.
- Show failures before solutions (the variant pattern is the canonical mechanism for this).
- Prefer mental models and diagrams over walls of prose.
- Encourage experimentation — the playground is editable.
- Each kata should explicitly reference earlier patterns it builds on.

### What NOT to do
- Don't jump to "best practice" without explaining why.
- Don't use library magic or unexplained utilities.
- Don't assume prior pattern knowledge.
- Don't over-abstract or hide complexity.
- Don't overuse hooks — teach composition thinking first.

## Composition Patterns (CORE — from Radix UI inspiration)

These patterns are the heart of the project. All are now implemented; the notes below are still load-bearing for review.

### Compound Components
- Must show `<Component><Component.Sub /></Component>` syntax.
- Must use Context for shared state.
- Must enforce hierarchy (error if used outside parent).
- Example: `<Accordion><Accordion.Item><Accordion.Header/><Accordion.Panel/></Accordion>`.

### Render Props
- Must explain why they exist (UI composition, not just logic sharing).
- Must compare with hooks and show when render props win.
- Must discuss cost vs flexibility tradeoffs.

### Slots Pattern
- Named ReactNode props (header, body, footer) instead of a children blob.

### asChild Pattern
- Polymorphic rendering without wrapper divs, via a `Slot` component that merges props onto the consumer's child.
- Inspired by Radix UI's `asChild` prop.

### Controlled vs Uncontrolled
- Cover the canonical "value without onChange" failure mode (read-only input).
- Cover progressive control / hybrid where useful.

### Behavioral Hooks
- Extract behavior so it can be reused across different UIs (`useClickOutside` consumed by Dropdown + Tooltip).

## Interview Role Play

Five tiers (Beginner / Junior / Mid / Senior / Architect), each with an ordered question sequence in `src/router/interview-tiers.ts`. A question maps to a kata via `lessonId`; clicking a question routes to `/lessons/<id>?tier=<id>`. The `?tier=` query param is the mode flag — when present:

- The sidebar swaps to `<InterviewSidebar>` showing the tier's question sequence.
- Lesson Previous / Next navigates within the tier sequence (not the default catalog order).
- Both prev/next links carry `?tier=<id>` to keep the user in interview mode.

Editing tier sequences: just update `INTERVIEW_SEQUENCES` in `interview-tiers.ts`. No other wiring needed.

## Progress Tracking

- `useProgress()` hook stores completed lesson IDs in localStorage under `react-katas-progress`.
- Completion requires: scroll to bottom OR short content, plus 30+ seconds reading time.
- No backend/auth — browser-only persistence.

## Code Style

- CSS Modules for component styles (`*.module.css`).
- App-level CSS custom properties for theming (`--space-*`, `--color-*`, `--bg-*`, `--surface-*`).
- Playground iframe variables for kata-internal styling (`--pg-*` — see Authoring Conventions).
- Path aliases for imports (`@lessons/...`, `@components/...`, etc.).
- React 19 automatic JSX runtime (no `import React` needed).
- All lesson components lazy-loaded via `React.lazy()`.

## Known Gaps

### Missing features
1. **More pattern diagrams** — initial four shipped (Compound, Render Props, HOC, Portal). Still missing for: Context, Provider Pattern, asChild / Slot, State Machines, Behavioral Hooks. Convention is documented in "Authoring Conventions → Pattern diagrams".
2. **Tests** — Vitest is set up but very sparse. New components (variant selector, console panel, interview tier flow, diagrams) have no tests.
3. **Bundle size** — `playground-vendor` chunk is ~730KB (CodeMirror + Sucrase). Could be further split or lazy-loaded.

### Possible content additions
- Variant adoption in the ~11 katas where Before/After didn't fit naturally on first pass (jsx-basics, code-splitting, react-19-compiler, render-timing-reconciliation, profiling-debugging, context-deep-dive, global-state-patterns, compound-components-tabs, children-as-data, testing-accessibility, and the 5 machine-coding katas).
- More tiers for the architect interview track if the catalog of architect-level lessons grows.

### Teaching depth (still open)
- Compound Components: tradeoffs discussion, when NOT to use.
- Render Props: deeper "when render props beat hooks" framing.
- Controlled / Uncontrolled: hybrid / progressive-control pattern.
