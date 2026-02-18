# CLAUDE.md — React Katas Project Guide

## Project Overview

An interactive React 19 + TypeScript tutorial platform that teaches component design and composition patterns from scratch (no external UI libraries). Inspired by Radix UI (composition & primitives) and usehooks.com (behavioral isolation), but everything is rebuilt from first principles.

## Tech Stack

- **React 19.2** with automatic JSX runtime
- **TypeScript** (strict mode)
- **Vite 6** (dev server on port 3000, path aliases: `@lessons`, `@components`, `@hooks`, `@router`, `@utils`)
- **Vitest + React Testing Library** for tests
- **CSS Modules** for scoped styles, CSS custom properties for design system
- **No external UI libraries** — all components built from scratch

## Architecture

```
src/
├── App.tsx                    # Main layout: Sidebar + lazy-loaded lesson
├── router/
│   ├── Router.tsx             # Custom router (Context + History API, no React Router)
│   └── routes.ts              # 35 lessons with metadata, lazy() imports
├── components/Navigation/
│   └── Sidebar.tsx            # Grouped by section, progress bar, completion marks
├── hooks/
│   ├── useProgress.ts         # localStorage-based lesson completion tracking
│   └── useDebounce.ts         # Generic debounce utility
├── lessons/
│   ├── 01-fundamentals/       # 5 lessons (JSX, props, state, events, conditionals)
│   ├── 02-hooks/              # 6 lessons (useEffect, useRef, custom hooks, useReducer, memo)
│   ├── 03-performance/        # 8 lessons (composition, React.memo, code splitting, virtualization)
│   ├── 04-patterns/           # 5 lessons (compound, render props, HOC, controlled/uncontrolled, portals)
│   ├── 05-state/              # 4 lessons (context, selectors, state machines, global state)
│   ├── 06-accessibility/      # 4 lessons (ARIA, keyboard nav, forms, testing)
│   └── 07-machine-coding/     # 5 challenges (file explorer, autocomplete, toast, drag-drop, infinite scroll)
└── test/setup.ts
```

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview production build
npm run test       # Run Vitest in watch mode
npm run test:ui    # Vitest with browser UI
npm run lint       # ESLint (zero warnings policy)
```

## Kata Lesson Structure

Every lesson component follows this pattern:
1. **Concept overview** — what the pattern is and why it matters
2. **Interactive demo** — working UI that demonstrates the pattern
3. **Code examples** — inline `<pre><code>` blocks showing implementation
4. **Key takeaways** — summary bullets
5. **Source code tab** — full component source via Vite `?raw` import
6. **Mark as Complete** button + previous/next navigation

## Progression (35 katas across 7 sections)

| Section | Katas | Level |
|---------|-------|-------|
| 01-fundamentals | JSX, Props, State, Events, Conditionals | Beginner |
| 02-hooks | useEffect (2), useRef, Custom Hooks, useReducer, Memoization | Beginner-Intermediate |
| 03-performance | Composition, React.memo, Code Splitting, Provider, Profiling, Compiler, Virtualization | Intermediate |
| 04-patterns | Compound Components, Render Props, HOC, Controlled/Uncontrolled, Portals | Intermediate-Advanced |
| 05-state | Context Deep Dive, Context Selectors, State Machines, Global State | Intermediate-Advanced |
| 06-accessibility | ARIA, Keyboard Nav, Accessible Forms, Testing A11y | Advanced |
| 07-machine-coding | File Explorer, Autocomplete, Toast, Drag-Drop, Infinite Scroll | Advanced |

## Teaching Philosophy (MANDATORY)

When adding or editing katas, you MUST follow these rules:

### What to teach
- **Why the pattern exists** — what problem does it solve?
- **Why naive React fails** — show broken versions first when useful
- **When NOT to use it** — every pattern has tradeoffs, teach them
- **Alternatives** — compare render props vs hooks, compound vs props, etc.
- **One core idea per kata** — don't combine multiple concepts

### How to teach
- Introduce concepts incrementally, never dump large code at once
- Show failures before solutions
- Prefer pattern diagrams and mental models
- Encourage experimentation
- Each kata should explicitly reference earlier patterns it builds on

### What NOT to do
- Don't jump to "best practice" without explaining why
- Don't use library magic or unexplained utilities
- Don't assume prior pattern knowledge
- Don't over-abstract or hide complexity
- Don't overuse hooks — teach composition thinking first

## Composition Patterns (CORE — from Radix UI inspiration)

These patterns are the heart of the project. When working on them:

### Compound Components
- Must show `<Component><Component.Sub /></Component>` syntax
- Must use Context for shared state
- Must enforce hierarchy (error if used outside parent)
- Example: `<Accordion><Accordion.Item><Accordion.Header/><Accordion.Panel/></Accordion>`

### Render Props
- Must explain why they exist (UI composition, not just logic sharing)
- Must compare with hooks and show when render props win
- Must discuss cost vs flexibility tradeoffs

### Slots Pattern
- Named children for structural flexibility
- Slot extraction from props
- Currently partially covered in ComponentComposition kata

### asChild Pattern (NOT YET IMPLEMENTED)
- Polymorphic rendering without wrapper divs
- Preserving consumer's element semantics and styles
- Inspired by Radix UI's `asChild` prop

### Controlled vs Uncontrolled
- Must cover progressive control (hybrid approach)
- Internal vs external state management
- Escape hatches for complex scenarios

### Behavioral Hooks
- Extract logic without coupling to UI
- Reuse behavior across different components
- Teach hook abuse anti-patterns (overuse of useEffect, etc.)

## Progress Tracking

- `useProgress()` hook stores completed lesson IDs in localStorage
- Key: `react-katas-progress`
- Completion requires: scroll to bottom OR short content, plus 30+ seconds reading time
- No backend/auth — browser-only persistence

## Code Style

- CSS Modules for component styles (`*.module.css`)
- CSS custom properties for theming (`--space-*`, `--color-*`, `--bg-*`)
- Path aliases for imports (`@lessons/...`, `@components/...`, etc.)
- React 19 automatic JSX runtime (no `import React` needed)
- Lazy loading all lesson components with `React.lazy()`

## Known Gaps (vs teaching goals)

These patterns/features are specified in the teaching goals but not yet implemented:

### Missing Katas
1. **Slots Pattern** — dedicated kata for named children and slot extraction
2. **asChild Pattern** — polymorphic rendering, avoiding wrapper divs
3. **Element vs Component** — fundamental distinction (Element = description object, Component = function)
4. **Children as Data** — dedicated teaching that children can be JSX, functions, objects
5. **Render Timing & Reconciliation** — how React decides what to re-render (high-level)
6. **Behavioral Hooks** — dedicated kata for logic extraction without UI coupling

### Missing Features
1. **Live Code Editor** — editable React code running in the browser (currently read-only source view)
2. **Console Log Visibility** — no in-browser console panel for demos
3. **Pattern Diagrams** — no visual mental models or architecture diagrams
4. **Implementation Toggle** — no toggle to switch between naive/improved implementations
5. **Before/After Comparison** — most katas lack explicit broken-then-fixed flow

### Teaching Depth Gaps
- Compound Components: missing tradeoffs discussion, when NOT to use
- Render Props: shallow hooks comparison, missing "when render props beat hooks" depth
- Controlled/Uncontrolled: missing progressive control (hybrid) pattern
- JSX Basics: missing Element vs Component distinction, children as data
- Most katas lack "why naive React fails here" section
