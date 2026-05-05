# React Katas — Modern React 19 Tutorial

> **Master React 19 from fundamentals to architecture-level interview prep — through 46 hands-on katas, all built from scratch with no UI libraries.**

An interactive React 19 + TypeScript tutorial platform that teaches component design and composition from first principles. Every kata is a working interactive demo plus a focused lesson; advanced tiers add framing for system-design and senior-engineering interview questions.

## What's in the box

- **46 katas across 8 sections** — fundamentals through architecture & leadership.
- **Interview Role Play mode** — five experience tiers (Beginner → Architect) with curated, interview-ordered question sequences mapping to katas.
- **Live in-browser playground** — most lessons ship a CodeMirror editor that transpiles and runs your edits without a server round-trip.
- **Syntax-highlighted source viewer** — see the exact source of every lesson alongside the demo.
- **Dark mode** — controlled via a theme toggle (light / dark / system) backed by `localStorage`.
- **Zero UI libraries** — every component is built from scratch so you can read the code and learn the pattern.

## Tech stack

- React 19.2 with the automatic JSX runtime
- TypeScript (strict mode)
- Vite 6 (dev server on port 3000)
- CodeMirror 6 (playground editor + read-only source viewer)
- Sucrase (in-browser TSX transpilation for the playground)
- Vitest + React Testing Library
- CSS Modules + CSS custom properties for theming

## Quick start

```bash
# Install
npm install

# Start the dev server (http://localhost:3000)
npm run dev
```

### Available scripts

```bash
npm run dev        # Vite dev server with HMR
npm run build      # tsc + vite build (also opens bundle visualizer)
npm run preview    # Preview the production build
npm run test       # Vitest in watch mode
npm run test:ui    # Vitest with browser UI
npm run lint       # ESLint
```

The build step opens a `stats.html` bundle-size report automatically (via `rollup-plugin-visualizer`) — useful for spotting bloat after adding lessons.

## Sections (46 katas)

| # | Section | Katas |
|---|---|---|
| 1 | Fundamentals | 6 |
| 2 | Hooks & Side Effects | 7 |
| 3 | Performance Optimization | 8 |
| 4 | Advanced Patterns | 9 |
| 5 | State Management | 4 |
| 6 | Accessibility & Production | 4 |
| 7 | Machine Coding Challenges | 5 |
| 8 | Architecture & Leadership | 3 |

### 1. Fundamentals
JSX Basics · Element vs Component · Components & Props · State Basics · Event Handling · Conditional Rendering

### 2. Hooks & Side Effects
useEffect Fundamentals · useEffect Cleanup · useRef · Custom Hooks · useReducer · Memoization (When You Need It) · Behavioral Hooks

### 3. Performance Optimization
Render Timing & Reconciliation · Component Composition · React.memo · Code Splitting · Provider Pattern · Profiling & Debugging · React 19 Compiler · Virtualization

### 4. Advanced Patterns
Compound Components · Compound Components: Tabs · Render Props · Higher-Order Components · Controlled vs Uncontrolled · Portal Pattern · asChild Pattern · Children as Data · Slots Pattern

### 5. State Management
Context API Deep Dive · Context Selectors · State Machines · Global State Patterns

### 6. Accessibility & Production
ARIA Fundamentals · Keyboard Navigation · Accessible Forms · Testing Accessibility

### 7. Machine Coding Challenges
File Explorer (Recursive) · Auto-complete (Typeahead) · Toast / Notification System · Drag & Drop (Kanban) · Infinite Scroll

### 8. Architecture & Leadership
Migrating Legacy React to Modern · Design-System Governance at Scale · Long-Horizon Performance Budgets

## Interview Role Play

The home page also exposes an **Interview Role Play** flow that overlays the kata catalog with five experience tiers:

| Tier | Years | Mapped questions |
|---|---|---|
| 🟢 Beginner / Fresher | 0–2 | 3 |
| 🟡 Junior / Early Mid | 2–4 | 12 |
| 🟠 Mid / Senior Developer | 4–7 | 24 |
| 🔵 Senior / Lead Engineer | 7–10 | 13 |
| 🔴 Architect / Principal | 10+ | 3 |

Each tier opens an ordered question sequence framed for an interview setting; clicking a question routes to the matching kata. The sidebar swaps to show the tier's question list, and Previous / Next navigates within the tier instead of the default catalog order. The mode is carried via `?tier=<id>` in the URL.

## Project structure

```
src/
├── App.tsx                       # Routing + layout shell
├── index.css                     # Design system (CSS custom properties)
├── router/
│   ├── router.tsx                # Custom Context-based router (no React Router)
│   ├── routes.ts                 # Lesson catalog with lazy() imports
│   └── interview-tiers.ts        # Tier metadata + question sequences
├── components/
│   ├── header/                   # Site header (Home + GitHub link)
│   ├── interview/                # Tier landing, tier page, interview sidebar
│   ├── lesson-layout/            # Lesson tabs + syntax-highlighted source viewer
│   ├── navigation/               # Standard sidebar
│   └── playground/               # Live CodeMirror playground + transpiler
├── hooks/
│   ├── use-progress.ts           # localStorage-based completion tracking
│   ├── use-theme.ts              # Theme toggle (light / dark / system)
│   └── use-debounce.ts
└── lessons/
    ├── 01-fundamentals/
    ├── 02-hooks/
    ├── 03-performance/
    ├── 04-patterns/
    ├── 05-state/
    ├── 06-accessibility/
    ├── 07-machine-coding/
    └── 08-architecture/
```

## Design system

CSS custom properties in [src/index.css](src/index.css) define:

- **Colors** — primary (sky blue), accent (fuchsia), success / warning / error, plus theme-aware surface/on-surface tokens
- **Typography** — Inter, eight size scales
- **Spacing** — 4px base unit, 12 scale levels
- **Radius / shadows / transitions** — full token set
- **Dark mode** — controlled via `data-theme="dark"` on `<html>`, set by [`useTheme`](src/hooks/use-theme.ts) which cycles light → dark → system and persists to `localStorage`

## Testing

```bash
npm run test         # Watch mode
npm run test:ui      # Browser UI
```

Tests use Vitest, React Testing Library, and `@testing-library/jest-dom` matchers. See [src/test/setup.ts](src/test/setup.ts).

## Contributing

This is a learning project. PRs welcome for:

- New katas (the [CLAUDE.md](CLAUDE.md) "Known Gaps" section lists candidates: live code editor, console panel, pattern diagrams, before/after toggle)
- Improving existing examples
- Bug fixes and typos
- Filling tier gaps in Interview Role Play (especially Mid/Senior, where targets exceed current mapped count)

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0-or-later)**.

The AGPL is a strong copyleft license: you are free to use, modify, and distribute this code, but if you run a modified version on a network server (e.g. a hosted version of the kata site), you must make the corresponding source available to its users under the same license. See the full text in [LICENSE](LICENSE) or at <https://www.gnu.org/licenses/agpl-3.0.html>.

Copyright © Rajesh Pillai.

## Acknowledgments

Built with [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [CodeMirror 6](https://codemirror.net/), [Sucrase](https://sucrase.io/), and [Vitest](https://vitest.dev/). Pattern inspiration from [Radix UI](https://www.radix-ui.com/) (composition primitives) and [usehooks.com](https://usehooks.com/) (behavioral isolation).

---

**Happy learning.**
