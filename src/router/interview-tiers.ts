export type TierId = 'beginner' | 'junior' | 'mid' | 'senior' | 'architect'

export interface Tier {
    id: TierId
    label: string
    years: string
    accent: string
    accentSurface: string
    intro: string
    targetCount: number
}

export interface SequenceItem {
    lessonId?: string
    question: string
    note?: string
}

export const TIERS: Tier[] = [
    {
        id: 'beginner',
        label: 'Beginner / Fresher',
        years: '0–2 yrs',
        accent: '#10b981',
        accentSurface: 'rgba(16, 185, 129, 0.12)',
        intro: 'Foundational React: how to think in components, render UI from data, and react to user input. Expect questions that probe whether you can read JSX, pass props, and manage simple state.',
        targetCount: 3,
    },
    {
        id: 'junior',
        label: 'Junior / Early Mid',
        years: '2–4 yrs',
        accent: '#f59e0b',
        accentSurface: 'rgba(245, 158, 11, 0.12)',
        intro: 'You can build features end-to-end and reach for the right hook. Interviewers will push on side effects, refs, custom hooks, and the difference between elements and components.',
        targetCount: 12,
    },
    {
        id: 'mid',
        label: 'Mid / Senior Developer',
        years: '4–7 yrs',
        accent: '#fb923c',
        accentSurface: 'rgba(251, 146, 60, 0.12)',
        intro: 'You design component APIs and reason about re-renders. Expect deep dives into composition patterns, context, performance, and how to keep large UIs responsive.',
        targetCount: 34,
    },
    {
        id: 'senior',
        label: 'Senior / Lead Engineer',
        years: '7–10 yrs',
        accent: '#3b82f6',
        accentSurface: 'rgba(59, 130, 246, 0.12)',
        intro: 'You make tradeoffs across systems: state architecture, code-splitting strategy, profiling, and machine-coding under constraint. Questions probe judgment, not syntax.',
        targetCount: 13,
    },
    {
        id: 'architect',
        label: 'Architect / Principal',
        years: '10+ yrs',
        accent: '#ef4444',
        accentSurface: 'rgba(239, 68, 68, 0.12)',
        intro: 'You set direction across teams: framework choice, migration strategy, design-system governance, and long-horizon performance budgets. Questions probe org-level reasoning over years, not features over weeks.',
        targetCount: 3,
    },
]

export const INTERVIEW_SEQUENCES: Record<TierId, SequenceItem[]> = {
    beginner: [
        { lessonId: 'jsx-basics', question: 'What is JSX and how does the browser actually run it?' },
        { lessonId: 'components-props', question: 'How do props flow between components? Can a child mutate them?' },
        { lessonId: 'state-basics', question: 'When do you use state vs props? Walk me through useState.' },
    ],
    junior: [
        { lessonId: 'event-handling', question: 'How are React events different from native DOM events?' },
        { lessonId: 'conditional-rendering', question: 'Show me three ways to render UI conditionally and when each is right.' },
        { lessonId: 'element-vs-component', question: 'What is the difference between a React element and a component?' },
        { lessonId: 'useeffect-fundamentals', question: 'When does useEffect run, and what triggers a re-run?' },
        { lessonId: 'useeffect-cleanup', question: 'Why do effects need cleanup? Walk through a subscription example.' },
        { lessonId: 'useref', question: 'When would you use useRef instead of useState?' },
        { lessonId: 'custom-hooks', question: 'Build a custom hook from scratch — what makes it a hook?' },
        { lessonId: 'usereducer', question: 'When does useReducer beat useState?' },
        { lessonId: 'memoization-when-needed', question: 'When does manual memoization still matter in React 19?' },
        { lessonId: 'component-composition', question: 'Show how composition can prevent re-renders without React.memo.' },
        { lessonId: 'children-as-data', question: 'How can the children prop act as data, not just markup?' },
        { lessonId: 'controlled-uncontrolled', question: 'Controlled vs uncontrolled inputs — when do you pick each?' },
    ],
    mid: [
        { lessonId: 'compound-components', question: 'Design a Compound Component API. Why use Context here?' },
        { lessonId: 'compound-components-tabs', question: 'Build accessible Tabs with implicit indexing and separated subtrees.' },
        { lessonId: 'render-props', question: 'When does the render-props pattern beat a custom hook?' },
        { lessonId: 'higher-order-components', question: 'Why have HOCs fallen out of favor? When are they still useful?' },
        { lessonId: 'slots-pattern', question: 'How do named slots compare to children for layout components?' },
        { lessonId: 'as-child-pattern', question: 'Explain the asChild pattern from Radix. What problem does it solve?' },
        { lessonId: 'portal-pattern', question: 'Why are portals needed for modals and tooltips? Watch out for what?' },
        { lessonId: 'react-memo', question: 'React.memo — when does it actually help, and when is it noise?' },
        { lessonId: 'context-deep-dive', question: 'What are the failure modes of Context for app state?' },
        { lessonId: 'context-selectors', question: 'Why does plain Context cause extra renders, and how do selectors fix it?' },
        { lessonId: 'state-machines', question: 'Model a multi-step async flow with a state machine. What does it buy you?' },
        { lessonId: 'global-state-patterns', question: 'Compare global-state options without external libraries.' },
        { lessonId: 'render-timing-reconciliation', question: 'Walk me through how reconciliation decides what to re-render.' },
        { lessonId: 'behavioral-hooks', question: 'How do you extract behavior from UI? Show with a hook you would build.' },
        { lessonId: 'code-splitting', question: 'Where do you draw split points, and what is the trade-off?' },
        { lessonId: 'provider-pattern', question: 'How do you keep providers from triggering app-wide re-renders?' },
        { lessonId: 'profiling-debugging', question: 'Walk through diagnosing a slow render with React DevTools.' },
        { lessonId: 'react-19-compiler', question: 'What does the React 19 compiler optimize automatically?' },
        { lessonId: 'virtualization', question: 'Implement windowing for a 100k-row list — what pitfalls hit first?' },
        { lessonId: 'auto-complete', question: 'Build typeahead. How do you handle race conditions and caching?' },
        { lessonId: 'toast-system', question: 'Design a global toast system using Context and Portals.' },
        { lessonId: 'drag-and-drop', question: 'Implement drag-and-drop with native HTML5 APIs.' },
        { lessonId: 'infinite-scroll', question: 'Build infinite scroll with IntersectionObserver. Edge cases?' },
        { lessonId: 'file-explorer', question: 'Render a recursive file tree with CRUD. Where does state live?' },
    ],
    senior: [
        { lessonId: 'context-selectors', question: 'Build useContextSelector from scratch. Why subscribe outside of React?' },
        { lessonId: 'state-machines', question: 'Why do state machines pay off at scale across teams?' },
        { lessonId: 'render-timing-reconciliation', question: 'Reconciliation deep dive — keys, fibers, and bail-outs.' },
        { lessonId: 'behavioral-hooks', question: 'How do you design behavior layers that survive UI redesigns?' },
        { lessonId: 'profiling-debugging', question: 'You inherit a slow app. What is your profiling playbook?' },
        { lessonId: 'code-splitting', question: 'How do you set a performance budget for an SPA?' },
        { lessonId: 'virtualization', question: 'When does virtualization make accessibility worse, and how to fix?' },
        { lessonId: 'react-19-compiler', question: 'What changes about your code review checklist with the compiler on?' },
        { lessonId: 'file-explorer', question: 'Scale the file explorer to 100k nodes with lazy loading.' },
        { lessonId: 'auto-complete', question: 'Add server-driven ranking and analytics to typeahead — design.' },
        { lessonId: 'toast-system', question: 'Make toasts work across iframes and micro-frontends.' },
        { lessonId: 'drag-and-drop', question: 'Trade-offs: native DnD vs dnd-kit vs custom pointer events.' },
        { lessonId: 'infinite-scroll', question: 'Combine infinite scroll with windowing — design considerations.' },
    ],
    architect: [
        { lessonId: 'migrating-legacy-react', question: 'Migration strategy: take a 10-year-old class-component app to React 19. Stages?' },
        { lessonId: 'design-system-governance', question: 'Design a design-system governance model across 50 product teams.' },
        { lessonId: 'performance-budgets', question: 'Set a long-horizon performance budget and the org process to defend it.' },
    ],
}

export function getTier(id: string): Tier | undefined {
    return TIERS.find((t) => t.id === id)
}

export function getSequence(id: TierId): SequenceItem[] {
    return INTERVIEW_SEQUENCES[id] ?? []
}

export function getTierFromPath(path: string): TierId | undefined {
    const match = path.match(/^\/interview\/([^/]+)$/)
    if (!match) return undefined
    const id = match[1]
    return getTier(id)?.id
}
