import { Suspense, useState, useEffect } from 'react'
import { RouterProvider, useRouter, Link } from '@router/router'
import { getLessonByPath, getAdjacentLessons } from '@router/routes'
import Sidebar from '@components/navigation/sidebar'
import styles from './App.module.css'
import { useProgress } from '@hooks/use-progress'

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

    // Lesson Completion Logic
    const [timeSpent, setTimeSpent] = useState(0)
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
    const [isShortContent, setIsShortContent] = useState(false)

    // Reset state on path change
    useEffect(() => {
        setTimeSpent(0)
        setHasScrolledToBottom(false)
        setIsShortContent(false)

        // Initial check for short content
        const checkShortContent = () => {
            if (document.documentElement.scrollHeight <= window.innerHeight + 100) {
                setIsShortContent(true)
            }
        }

        // Small delay to allow content to render
        const timer = setTimeout(checkShortContent, 500)
        window.addEventListener('resize', checkShortContent)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', checkShortContent)
        }
    }, [currentPath])

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [currentPath]) // Reset timer on path change implicitly by dependency but state reset handles logic

    // Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight

            // If we are close to bottom (within 100px)
            if (scrollTop + windowHeight >= docHeight - 100) {
                setHasScrolledToBottom(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const MIN_TIME_SECONDS = 30 // 30 seconds reading time requirement
    const canComplete = isLessonCompleted(currentLesson.id) || ((hasScrolledToBottom || isShortContent) && timeSpent >= MIN_TIME_SECONDS)

    // Render the lesson component
    const LessonComponent = currentLesson.component
    const isCompleted = isLessonCompleted(currentLesson.id)
    const { previous, next } = getAdjacentLessons(currentPath)

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
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--space-6)'
                    }}>
                        <div>
                            <h3>Lesson Complete?</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                Mark this lesson as complete to track your progress.
                            </p>
                            {!isCompleted && !canComplete && (
                                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: 4 }}>
                                    Requirements:
                                    <span style={{ color: (hasScrolledToBottom || isShortContent) ? 'var(--color-success)' : 'inherit', marginLeft: 6 }}>
                                        {(hasScrolledToBottom || isShortContent) ? '✓ Scrolled' : '○ Scroll to bottom'}
                                    </span>
                                    <span style={{ color: timeSpent >= MIN_TIME_SECONDS ? 'var(--color-success)' : 'inherit', margin: '0 8px' }}>•</span>
                                    <span style={{ color: timeSpent >= MIN_TIME_SECONDS ? 'var(--color-success)' : 'inherit' }}>
                                        {timeSpent >= MIN_TIME_SECONDS ? '✓ Time met' : `○ Read for ${Math.max(0, MIN_TIME_SECONDS - timeSpent)}s more`}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => canComplete && toggleLessonCompletion(currentLesson.id)}
                            disabled={!canComplete}
                            style={{
                                padding: 'var(--space-3) var(--space-6)',
                                background: isCompleted
                                    ? 'var(--color-success)'
                                    : canComplete
                                        ? 'var(--bg-tertiary)'
                                        : 'var(--bg-secondary)', // Disabled look
                                color: isCompleted ? 'white' : canComplete ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                border: isCompleted ? 'none' : '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                cursor: canComplete ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                fontWeight: 'bold',
                                transition: 'all 0.2s',
                                opacity: !canComplete && !isCompleted ? 0.6 : 1
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

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 'var(--space-4)',
                        paddingTop: 'var(--space-6)',
                        borderTop: '1px dashed var(--border-color)'
                    }}>
                        {previous ? (
                            <Link
                                to={previous.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-2)',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    padding: 'var(--space-3) var(--space-4)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-secondary)',
                                    transition: 'all 0.2s',
                                    fontSize: 'var(--font-size-sm)'
                                }}
                            >
                                <span>←</span>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Previous</div>
                                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{previous.title}</div>
                                </div>
                            </Link>
                        ) : <div />}

                        {next ? (
                            <Link
                                to={next.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-2)',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    padding: 'var(--space-3) var(--space-4)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-secondary)',
                                    transition: 'all 0.2s',
                                    fontSize: 'var(--font-size-sm)',
                                    textAlign: 'right'
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Next</div>
                                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{next.title}</div>
                                </div>
                                <span>→</span>
                            </Link>
                        ) : <div />}
                    </div>
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
