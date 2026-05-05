import { lazy, ComponentType } from 'react'

// Lesson metadata
export interface LessonMetadata {
    id: string
    title: string
    description: string
    section: string
    order: number
    path: string
    component: ComponentType
}

// Lesson sections
export const SECTIONS = {
    FUNDAMENTALS: 'Fundamentals',
    HOOKS: 'Hooks & Side Effects',
    PERFORMANCE: 'Performance Optimization',
    PATTERNS: 'Advanced Patterns',
    STATE: 'State Management',
    ACCESSIBILITY: 'Accessibility & Production',
    MACHINE_CODING: 'Machine Coding Challenges',
    ARCHITECTURE: 'Architecture & Leadership',
} as const

// Route definitions with lazy-loaded components
export const lessons: LessonMetadata[] = [
    // Section 7: Machine Coding
    {
        id: 'file-explorer',
        title: 'File Explorer (Recursive)',
        description: 'Build a VS Code-like file tree with CRUD operations',
        section: SECTIONS.MACHINE_CODING,
        order: 39,
        path: '/lessons/file-explorer',
        component: lazy(() => import('@lessons/07-machine-coding/FileExplorer')),
    },
    {
        id: 'auto-complete',
        title: 'Auto-complete (Typeahead)',
        description: 'Debounced search with caching and race condition handling',
        section: SECTIONS.MACHINE_CODING,
        order: 40,
        path: '/lessons/auto-complete',
        component: lazy(() => import('@lessons/07-machine-coding/AutoComplete')),
    },
    {
        id: 'toast-system',
        title: 'Toast / Notification System',
        description: 'Global notifications with Context and Portals',
        section: SECTIONS.MACHINE_CODING,
        order: 41,
        path: '/lessons/toast-system',
        component: lazy(() => import('@lessons/07-machine-coding/ToastSystem')),
    },
    {
        id: 'drag-and-drop',
        title: 'Drag & Drop (Kanban)',
        description: 'Native HTML5 Drag and Drop API',
        section: SECTIONS.MACHINE_CODING,
        order: 42,
        path: '/lessons/drag-and-drop',
        component: lazy(() => import('@lessons/07-machine-coding/DragAndDrop')),
    },
    {
        id: 'infinite-scroll',
        title: 'Infinite Scroll',
        description: 'Intersection Observer API for pagination',
        section: SECTIONS.MACHINE_CODING,
        order: 43,
        path: '/lessons/infinite-scroll',
        component: lazy(() => import('@lessons/07-machine-coding/InfiniteScroll')),
    },

    // Section 1: Fundamentals
    {
        id: 'jsx-basics',
        title: 'JSX Basics',
        description: 'Understanding JSX syntax, expressions, and how React transforms JSX',
        section: SECTIONS.FUNDAMENTALS,
        order: 1,
        path: '/lessons/jsx-basics',
        component: lazy(() => import('@lessons/01-fundamentals/JSXBasics')),
    },
    {
        id: 'element-vs-component',
        title: 'Element vs Component',
        description: 'Understanding the fundamental distinction between React elements and components',
        section: SECTIONS.FUNDAMENTALS,
        order: 2,
        path: '/lessons/element-vs-component',
        component: lazy(() => import('@lessons/01-fundamentals/ElementVsComponent')),
    },
    {
        id: 'components-props',
        title: 'Components & Props',
        description: 'Building reusable components with props and composition',
        section: SECTIONS.FUNDAMENTALS,
        order: 3,
        path: '/lessons/components-props',
        component: lazy(() => import('@lessons/01-fundamentals/ComponentsProps')),
    },
    {
        id: 'state-basics',
        title: 'State Basics',
        description: 'Managing component state with useState hook',
        section: SECTIONS.FUNDAMENTALS,
        order: 4,
        path: '/lessons/state-basics',
        component: lazy(() => import('@lessons/01-fundamentals/StateBasics')),
    },
    {
        id: 'event-handling',
        title: 'Event Handling',
        description: 'Handling user interactions and synthetic events',
        section: SECTIONS.FUNDAMENTALS,
        order: 5,
        path: '/lessons/event-handling',
        component: lazy(() => import('@lessons/01-fundamentals/EventHandling')),
    },
    {
        id: 'conditional-rendering',
        title: 'Conditional Rendering',
        description: 'Patterns for rendering UI conditionally',
        section: SECTIONS.FUNDAMENTALS,
        order: 6,
        path: '/lessons/conditional-rendering',
        component: lazy(() => import('@lessons/01-fundamentals/ConditionalRendering')),
    },

    // Section 2: Hooks & Side Effects
    {
        id: 'useeffect-fundamentals',
        title: 'useEffect Fundamentals',
        description: 'Understanding side effects and the useEffect hook',
        section: SECTIONS.HOOKS,
        order: 7,
        path: '/lessons/useeffect-fundamentals',
        component: lazy(() => import('@lessons/02-hooks/UseEffectFundamentals')),
    },
    {
        id: 'useeffect-cleanup',
        title: 'useEffect Cleanup',
        description: 'Cleaning up subscriptions and preventing memory leaks',
        section: SECTIONS.HOOKS,
        order: 8,
        path: '/lessons/useeffect-cleanup',
        component: lazy(() => import('@lessons/02-hooks/UseEffectCleanup')),
    },
    {
        id: 'useref',
        title: 'useRef Hook',
        description: 'DOM access and mutable values with useRef',
        section: SECTIONS.HOOKS,
        order: 9,
        path: '/lessons/useref',
        component: lazy(() => import('@lessons/02-hooks/UseRef')),
    },
    {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        description: 'Creating reusable logic with custom hooks',
        section: SECTIONS.HOOKS,
        order: 10,
        path: '/lessons/custom-hooks',
        component: lazy(() => import('@lessons/02-hooks/CustomHooks')),
    },
    {
        id: 'usereducer',
        title: 'useReducer Hook',
        description: 'Managing complex state with useReducer',
        section: SECTIONS.HOOKS,
        order: 11,
        path: '/lessons/usereducer',
        component: lazy(() => import('@lessons/02-hooks/UseReducer')),
    },
    {
        id: 'memoization-when-needed',
        title: 'Memoization (When You Need It)',
        description: 'Understanding when manual memoization is still necessary in React 19',
        section: SECTIONS.HOOKS,
        order: 12,
        path: '/lessons/memoization-when-needed',
        component: lazy(() => import('@lessons/02-hooks/MemoizationWhenNeeded')),
    },
    {
        id: 'behavioral-hooks',
        title: 'Behavioral Hooks',
        description: 'Extracting reusable behavior into custom hooks without coupling to UI',
        section: SECTIONS.HOOKS,
        order: 13,
        path: '/lessons/behavioral-hooks',
        component: lazy(() => import('@lessons/02-hooks/BehavioralHooks')),
    },

    // Section 3: Performance Optimization
    {
        id: 'render-timing-reconciliation',
        title: 'Render Timing & Reconciliation',
        description: 'Understanding when React re-renders and how reconciliation works',
        section: SECTIONS.PERFORMANCE,
        order: 14,
        path: '/lessons/render-timing-reconciliation',
        component: lazy(() => import('@lessons/03-performance/RenderTimingReconciliation')),
    },
    {
        id: 'component-composition',
        title: 'Component Composition',
        description: 'Using composition patterns to prevent unnecessary re-renders',
        section: SECTIONS.PERFORMANCE,
        order: 15,
        path: '/lessons/component-composition',
        component: lazy(() => import('@lessons/03-performance/ComponentComposition')),
    },
    {
        id: 'react-memo',
        title: 'React.memo',
        description: 'Preventing component re-renders with React.memo',
        section: SECTIONS.PERFORMANCE,
        order: 16,
        path: '/lessons/react-memo',
        component: lazy(() => import('@lessons/03-performance/ReactMemo')),
    },
    {
        id: 'code-splitting',
        title: 'Code Splitting',
        description: 'Lazy loading components with React.lazy and Suspense',
        section: SECTIONS.PERFORMANCE,
        order: 17,
        path: '/lessons/code-splitting',
        component: lazy(() => import('@lessons/03-performance/CodeSplitting')),
    },
    {
        id: 'provider-pattern',
        title: 'Provider Pattern',
        description: 'Optimizing context providers to prevent re-renders',
        section: SECTIONS.PERFORMANCE,
        order: 18,
        path: '/lessons/provider-pattern',
        component: lazy(() => import('@lessons/03-performance/ProviderPattern')),
    },
    {
        id: 'profiling-debugging',
        title: 'Profiling & Debugging',
        description: 'Using React DevTools to identify performance bottlenecks',
        section: SECTIONS.PERFORMANCE,
        order: 19,
        path: '/lessons/profiling-debugging',
        component: lazy(() => import('@lessons/03-performance/ProfilingDebugging')),
    },
    {
        id: 'react-19-compiler',
        title: 'React 19 Compiler',
        description: 'Understanding automatic optimizations in React 19',
        section: SECTIONS.PERFORMANCE,
        order: 20,
        path: '/lessons/react-19-compiler',
        component: lazy(() => import('@lessons/03-performance/React19Compiler')),
    },
    {
        id: 'virtualization',
        title: 'Virtualization (Windowing)',
        description: 'Efficiently rendering large datasets using windowing',
        section: SECTIONS.PERFORMANCE,
        order: 21,
        path: '/lessons/virtualization',
        component: lazy(() => import('@lessons/03-performance/Virtualization')),
    },

    // Section 4: Advanced Patterns
    {
        id: 'compound-components',
        title: 'Compound Components',
        description: 'Building flexible component APIs with compound pattern',
        section: SECTIONS.PATTERNS,
        order: 22,
        path: '/lessons/compound-components',
        component: lazy(() => import('@lessons/04-patterns/CompoundComponents')),
    },
    {
        id: 'compound-components-tabs',
        title: 'Compound Components: Tabs',
        description: 'Building accessible Tabs with implicit indexing, separated subtrees, and controlled/uncontrolled modes',
        section: SECTIONS.PATTERNS,
        order: 23,
        path: '/lessons/compound-components-tabs',
        component: lazy(() => import('@lessons/04-patterns/CompoundComponentsTabs')),
    },
    {
        id: 'render-props',
        title: 'Render Props',
        description: 'Sharing logic between components with render props',
        section: SECTIONS.PATTERNS,
        order: 24,
        path: '/lessons/render-props',
        component: lazy(() => import('@lessons/04-patterns/RenderProps')),
    },
    {
        id: 'higher-order-components',
        title: 'Higher-Order Components',
        description: 'Enhancing components with HOC pattern',
        section: SECTIONS.PATTERNS,
        order: 25,
        path: '/lessons/higher-order-components',
        component: lazy(() => import('@lessons/04-patterns/HigherOrderComponents')),
    },
    {
        id: 'controlled-uncontrolled',
        title: 'Controlled vs Uncontrolled',
        description: 'Understanding form control patterns',
        section: SECTIONS.PATTERNS,
        order: 26,
        path: '/lessons/controlled-uncontrolled',
        component: lazy(() => import('@lessons/04-patterns/ControlledUncontrolled')),
    },
    {
        id: 'portal-pattern',
        title: 'Portal Pattern',
        description: 'Rendering components outside the DOM hierarchy',
        section: SECTIONS.PATTERNS,
        order: 27,
        path: '/lessons/portal-pattern',
        component: lazy(() => import('@lessons/04-patterns/PortalPattern')),
    },
    {
        id: 'as-child-pattern',
        title: 'asChild Pattern',
        description: 'Polymorphic rendering without wrapper divs, inspired by Radix UI',
        section: SECTIONS.PATTERNS,
        order: 28,
        path: '/lessons/as-child-pattern',
        component: lazy(() => import('@lessons/04-patterns/AsChildPattern')),
    },
    {
        id: 'children-as-data',
        title: 'Children as Data',
        description: 'Using children props as metadata for parent components',
        section: SECTIONS.PATTERNS,
        order: 29,
        path: '/lessons/children-as-data',
        component: lazy(() => import('@lessons/04-patterns/ChildrenAsData')),
    },
    {
        id: 'slots-pattern',
        title: 'Slots Pattern',
        description: 'Named ReactNode props for flexible component layouts',
        section: SECTIONS.PATTERNS,
        order: 30,
        path: '/lessons/slots-pattern',
        component: lazy(() => import('@lessons/04-patterns/SlotsPattern')),
    },

    // Section 5: State Management
    {
        id: 'context-deep-dive',
        title: 'Context API Deep Dive',
        description: 'Advanced context patterns and best practices',
        section: SECTIONS.STATE,
        order: 31,
        path: '/lessons/context-deep-dive',
        component: lazy(() => import('@lessons/05-state/ContextDeepDive')),
    },
    {
        id: 'context-selectors',
        title: 'Context Selectors',
        description: 'Building useContextSelector from scratch',
        section: SECTIONS.STATE,
        order: 32,
        path: '/lessons/context-selectors',
        component: lazy(() => import('@lessons/05-state/ContextSelectors')),
    },
    {
        id: 'state-machines',
        title: 'State Machines',
        description: 'Modeling UI state with finite state machines',
        section: SECTIONS.STATE,
        order: 33,
        path: '/lessons/state-machines',
        component: lazy(() => import('@lessons/05-state/StateMachines')),
    },
    {
        id: 'global-state-patterns',
        title: 'Global State Patterns',
        description: 'Managing global state without external libraries',
        section: SECTIONS.STATE,
        order: 34,
        path: '/lessons/global-state-patterns',
        component: lazy(() => import('@lessons/05-state/GlobalStatePatterns')),
    },

    // Section 6: Accessibility & Production
    {
        id: 'aria-fundamentals',
        title: 'ARIA Fundamentals',
        description: 'Understanding ARIA roles, states, and properties',
        section: SECTIONS.ACCESSIBILITY,
        order: 35,
        path: '/lessons/aria-fundamentals',
        component: lazy(() => import('@lessons/06-accessibility/ARIAFundamentals')),
    },
    {
        id: 'keyboard-navigation',
        title: 'Keyboard Navigation',
        description: 'Implementing keyboard accessibility patterns',
        section: SECTIONS.ACCESSIBILITY,
        order: 36,
        path: '/lessons/keyboard-navigation',
        component: lazy(() => import('@lessons/06-accessibility/KeyboardNavigation')),
    },
    {
        id: 'accessible-forms',
        title: 'Accessible Forms',
        description: 'Building forms with proper validation and error handling',
        section: SECTIONS.ACCESSIBILITY,
        order: 37,
        path: '/lessons/accessible-forms',
        component: lazy(() => import('@lessons/06-accessibility/AccessibleForms')),
    },
    {
        id: 'testing-accessibility',
        title: 'Testing Accessibility',
        description: 'Automated and manual accessibility testing',
        section: SECTIONS.ACCESSIBILITY,
        order: 38,
        path: '/lessons/testing-accessibility',
        component: lazy(() => import('@lessons/06-accessibility/TestingAccessibility')),
    },

    // Section 8: Architecture & Leadership
    {
        id: 'migrating-legacy-react',
        title: 'Migrating Legacy React to Modern',
        description: 'Sequencing a multi-quarter modernization of a class-component monolith without freezing feature work',
        section: SECTIONS.ARCHITECTURE,
        order: 44,
        path: '/lessons/migrating-legacy-react',
        component: lazy(() => import('@lessons/08-architecture/MigratingLegacyReact')),
    },
    {
        id: 'design-system-governance',
        title: 'Design-System Governance at Scale',
        description: 'Stakeholder management, RFC process, deprecation discipline, and the failure modes that fragment a system',
        section: SECTIONS.ARCHITECTURE,
        order: 45,
        path: '/lessons/design-system-governance',
        component: lazy(() => import('@lessons/08-architecture/DesignSystemGovernance')),
    },
    {
        id: 'performance-budgets',
        title: 'Long-Horizon Performance Budgets',
        description: 'Layered budgets (bundle, field, synthetic) and the org process that defends them through team rotation',
        section: SECTIONS.ARCHITECTURE,
        order: 46,
        path: '/lessons/performance-budgets',
        component: lazy(() => import('@lessons/08-architecture/PerformanceBudgets')),
    },
]

// Helper function to get lesson by path
export function getLessonByPath(path: string): LessonMetadata | undefined {
    return lessons.find((lesson) => lesson.path === path)
}

// Helper function to get lessons by section
export function getLessonsBySection(section: string): LessonMetadata[] {
    return lessons.filter((lesson) => lesson.section === section).sort((a, b) => a.order - b.order)
}

// Helper function to get next/previous lessons
export function getAdjacentLessons(currentPath: string): {
    previous: LessonMetadata | null
    next: LessonMetadata | null
} {
    const currentIndex = lessons.findIndex((lesson) => lesson.path === currentPath)

    return {
        previous: currentIndex > 0 ? lessons[currentIndex - 1] : null,
        next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
    }
}
