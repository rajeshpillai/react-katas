# React Katas — Progress Tracker

## Katas (43 total)

### Section 1: Fundamentals (6 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 1 | JSX Basics | Done | `src/lessons/01-fundamentals/JSXBasics.tsx` |
| 2 | Element vs Component | Done | `src/lessons/01-fundamentals/ElementVsComponent.tsx` |
| 3 | Components & Props | Done | `src/lessons/01-fundamentals/ComponentsProps.tsx` |
| 4 | State Basics | Done | `src/lessons/01-fundamentals/StateBasics.tsx` |
| 5 | Event Handling | Done | `src/lessons/01-fundamentals/EventHandling.tsx` |
| 6 | Conditional Rendering | Done | `src/lessons/01-fundamentals/ConditionalRendering.tsx` |

### Section 2: Hooks & Side Effects (7 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 7 | useEffect Fundamentals | Done | `src/lessons/02-hooks/UseEffectFundamentals.tsx` |
| 8 | useEffect Cleanup | Done | `src/lessons/02-hooks/UseEffectCleanup.tsx` |
| 9 | useRef Hook | Done | `src/lessons/02-hooks/UseRef.tsx` |
| 10 | Custom Hooks | Done | `src/lessons/02-hooks/CustomHooks.tsx` |
| 11 | useReducer Hook | Done | `src/lessons/02-hooks/UseReducer.tsx` |
| 12 | Memoization (When You Need It) | Done | `src/lessons/02-hooks/MemoizationWhenNeeded.tsx` |
| 13 | Behavioral Hooks | Done | `src/lessons/02-hooks/BehavioralHooks.tsx` |

### Section 3: Performance Optimization (8 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 14 | Render Timing & Reconciliation | Done | `src/lessons/03-performance/RenderTimingReconciliation.tsx` |
| 15 | Component Composition | Done | `src/lessons/03-performance/ComponentComposition.tsx` |
| 16 | React.memo | Done | `src/lessons/03-performance/ReactMemo.tsx` |
| 17 | Code Splitting | Done | `src/lessons/03-performance/CodeSplitting.tsx` |
| 18 | Provider Pattern | Done | `src/lessons/03-performance/ProviderPattern.tsx` |
| 19 | Profiling & Debugging | Done | `src/lessons/03-performance/ProfilingDebugging.tsx` |
| 20 | React 19 Compiler | Done | `src/lessons/03-performance/React19Compiler.tsx` |
| 21 | Virtualization (Windowing) | Done | `src/lessons/03-performance/Virtualization.tsx` |

### Section 4: Advanced Patterns (9 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 22 | Compound Components | Done | `src/lessons/04-patterns/CompoundComponents.tsx` |
| 23 | Compound Components: Tabs | Done | `src/lessons/04-patterns/CompoundComponentsTabs.tsx` |
| 24 | Render Props | Done | `src/lessons/04-patterns/RenderProps.tsx` |
| 25 | Higher-Order Components | Done | `src/lessons/04-patterns/HigherOrderComponents.tsx` |
| 26 | Controlled vs Uncontrolled | Done | `src/lessons/04-patterns/ControlledUncontrolled.tsx` |
| 27 | Portal Pattern | Done | `src/lessons/04-patterns/PortalPattern.tsx` |
| 28 | asChild Pattern | Done | `src/lessons/04-patterns/AsChildPattern.tsx` |
| 29 | Children as Data | Done | `src/lessons/04-patterns/ChildrenAsData.tsx` |
| 30 | Slots Pattern | Done | `src/lessons/04-patterns/SlotsPattern.tsx` |

### Section 5: State Management (4 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 31 | Context API Deep Dive | Done | `src/lessons/05-state/ContextDeepDive.tsx` |
| 32 | Context Selectors | Done | `src/lessons/05-state/ContextSelectors.tsx` |
| 33 | State Machines | Done | `src/lessons/05-state/StateMachines.tsx` |
| 34 | Global State Patterns | Done | `src/lessons/05-state/GlobalStatePatterns.tsx` |

### Section 6: Accessibility & Production (4 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 35 | ARIA Fundamentals | Done | `src/lessons/06-accessibility/ARIAFundamentals.tsx` |
| 36 | Keyboard Navigation | Done | `src/lessons/06-accessibility/KeyboardNavigation.tsx` |
| 37 | Accessible Forms | Done | `src/lessons/06-accessibility/AccessibleForms.tsx` |
| 38 | Testing Accessibility | Done | `src/lessons/06-accessibility/TestingAccessibility.tsx` |

### Section 7: Machine Coding Challenges (5 katas)

| # | Kata | Status | File |
|---|------|--------|------|
| 39 | File Explorer (Recursive) | Done | `src/lessons/07-machine-coding/FileExplorer.tsx` |
| 40 | Auto-complete (Typeahead) | Done | `src/lessons/07-machine-coding/AutoComplete.tsx` |
| 41 | Toast / Notification System | Done | `src/lessons/07-machine-coding/ToastSystem.tsx` |
| 42 | Drag & Drop (Kanban) | Done | `src/lessons/07-machine-coding/DragAndDrop.tsx` |
| 43 | Infinite Scroll | Done | `src/lessons/07-machine-coding/InfiniteScroll.tsx` |

---

## Platform Features

| Feature | Status | Notes |
|---------|--------|-------|
| Live Code Playground | Done | CodeMirror 6 + Sucrase transpiler + iframe preview |
| Playground maximize buttons | Done | Code editor & preview pane maximize/restore |
| Dark/Light/System theme | Done | `useTheme` hook, CSS custom properties, localStorage |
| Collapsible sidebar | Done | Persists to localStorage |
| Lesson layout (3 tabs) | Done | Lesson / Playground / Source Code |
| Progress tracking | Done | localStorage-based, scroll + time requirements |
| Previous/Next navigation | Done | Bottom of each lesson |
| Lazy-loaded lessons | Done | React.lazy() for all 43 lessons |
| Custom router | Done | History API, no React Router dependency |

## Teaching Depth Gaps (Pending)

These are areas where existing katas could be deepened:

| Gap | Kata | What's Missing |
|-----|------|----------------|
| Before/After flow | Most katas | Explicit broken-then-fixed implementations |
| "Why naive React fails" | Most katas | Section showing the problem before the solution |
| Tradeoffs discussion | Compound Components | Addressed in kata #23 (Compound Components: Tabs) |
| Hooks comparison depth | Render Props | "When render props beat hooks" section |
| Progressive control | Controlled/Uncontrolled | Hybrid controlled + uncontrolled pattern |
| Children as data | JSX Basics | Could cross-reference Children as Data kata |

## Missing Platform Features (Pending)

| Feature | Priority | Notes |
|---------|----------|-------|
| Console log panel | Medium | In-browser console for playground demos |
| Pattern diagrams | Low | Visual mental models / architecture diagrams |
| Implementation toggle | Medium | Switch between naive/improved implementations |
| Mobile responsive sidebar | Low | Hamburger menu for small screens |
