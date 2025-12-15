import { Suspense } from 'react'
import { RouterProvider, useRouter } from '@router/Router'
import { getLessonByPath } from '@router/routes'
import Sidebar from '@components/Navigation/Sidebar'
import styles from './App.module.css'
import { useProgress } from '@hooks/useProgress'

function AppContent() {
    const { currentPath } = useRouter()
    const { completedLessons, toggleLessonCompletion, isLessonCompleted } = useProgress()

    // Get the current lesson based on path
    const currentLesson = getLessonByPath(currentPath)

    // Render home page if no lesson is selected
    if (!currentLesson || currentPath === '/') {
        return (
            <div className={styles.app}>
                <aside className={styles.sidebar}>
                    <Sidebar completedLessons={completedLessons} />
                </aside>
                <main className={styles.mainContent}>
                    <HomePage />
                </main>
            </div>
        )
    }

    // Render the lesson component
    const LessonComponent = currentLesson.component
    const isCompleted = isLessonCompleted(currentLesson.id)

    return (
        <div className={styles.app}>
            <aside className={styles.sidebar}>
                <Sidebar completedLessons={completedLessons} />
            </aside>
            <main className={styles.mainContent}>
                <Suspense fallback={<div className={styles.loading} />}>
                    <LessonComponent />
                </Suspense>

                <div style={{
                    marginTop: 'var(--space-8)',
                    padding: 'var(--space-6)',
                    borderTop: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <h3>Lesson Complete?</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                            Mark this lesson as complete to track your progress.
                        </p>
                    </div>
                    <button
                        onClick={() => toggleLessonCompletion(currentLesson.id)}
                        style={{
                            padding: 'var(--space-3) var(--space-6)',
                            background: isCompleted ? 'var(--color-success)' : 'var(--bg-tertiary)',
                            color: isCompleted ? 'white' : 'var(--text-primary)',
                            border: isCompleted ? 'none' : '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                        }}
                    >
                        {isCompleted ? (
                            <>
                                <span>✓</span>
                                <span>Completed</span>
                            </>
                        ) : (
                            <span>Mark as Complete</span>
                        )}
                    </button>
                </div>
            </main>
        </div>
    )
}

// Home page component
function HomePage() {
    return (
        <div>
            <h1>React Katas</h1>
            <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>
                Master React 19 from fundamentals to advanced patterns
            </p>

            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h2>Welcome to React Katas! 👋</h2>
                <p>
                    This is a comprehensive, hands-on tutorial designed to take you from React basics to
                    building production-ready, performant, and accessible UI components.
                </p>
                <p>
                    Each lesson includes interactive examples, detailed explanations, and real-world use
                    cases. You'll learn modern React 19 patterns, performance optimization techniques, and
                    accessibility best practices.
                </p>
            </section>

            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h3>What You'll Learn</h3>
                <ul>
                    <li>
                        <strong>Fundamentals:</strong> JSX, components, props, state, and event handling
                    </li>
                    <li>
                        <strong>Hooks:</strong> useState, useEffect, useRef, custom hooks, and useReducer
                    </li>
                    <li>
                        <strong>Performance:</strong> Component composition, React.memo, code splitting, and
                        React 19 compiler
                    </li>
                    <li>
                        <strong>Advanced Patterns:</strong> Compound components, render props, HOCs, and
                        portals
                    </li>
                    <li>
                        <strong>State Management:</strong> Context API, context selectors, and state machines
                    </li>
                    <li>
                        <strong>Accessibility:</strong> ARIA, keyboard navigation, and accessible forms
                    </li>
                </ul>
            </section>

            <section style={{ marginBottom: 'var(--space-8)' }}>
                <h3>Modern React 19 Approach</h3>
                <p>
                    This tutorial emphasizes <strong>modern best practices</strong> for React 19:
                </p>
                <ul>
                    <li>
                        <strong>Composition over memoization:</strong> Learn why component composition is the
                        primary performance optimization technique
                    </li>
                    <li>
                        <strong>React Compiler:</strong> Understand how React 19's automatic optimizations
                        reduce the need for manual memoization
                    </li>
                    <li>
                        <strong>TypeScript:</strong> All examples include TypeScript for type safety and better
                        developer experience
                    </li>
                    <li>
                        <strong>Testing:</strong> Learn to test your components with Vitest and React Testing
                        Library
                    </li>
                    <li>
                        <strong>Accessibility First:</strong> Build components that work for everyone
                    </li>
                </ul>
            </section>

            <section>
                <h3>Getting Started</h3>
                <p>
                    Choose a lesson from the sidebar to begin your journey. We recommend starting with{' '}
                    <strong>JSX Basics</strong> if you're new to React, or jumping to{' '}
                    <strong>Performance Optimization</strong> if you're already familiar with the
                    fundamentals.
                </p>
                <p style={{ marginTop: 'var(--space-4)', color: 'var(--text-tertiary)' }}>
                    💡 <em>Tip: Use keyboard shortcuts to navigate between lessons quickly!</em>
                </p>
            </section>
        </div>
    )
}

export default function App() {
    return (
        <RouterProvider>
            <AppContent />
        </RouterProvider>
    )
}
