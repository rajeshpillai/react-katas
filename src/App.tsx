import { Component, Suspense, useState, useEffect, useCallback, ReactNode } from 'react'
import { RouterProvider, useRouter, Link } from '@router/router'
import { getLessonByPath, getAdjacentLessons } from '@router/routes'
import Sidebar from '@components/navigation/sidebar'
import styles from './App.module.css'
import { useProgress } from '@hooks/use-progress'
import '@hooks/use-theme' // Initializes theme from localStorage on load

// Error Boundary to catch lazy-load failures and render errors
class LessonErrorBoundary extends Component<
    { children: ReactNode; resetKey: string },
    { error: Error | null }
> {
    state: { error: Error | null } = { error: null }

    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    componentDidUpdate(prevProps: { resetKey: string }) {
        if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
            this.setState({ error: null })
        }
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                    <h2>Failed to load lesson</h2>
                    <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-4) 0' }}>
                        {this.state.error.message}
                    </p>
                    <button
                        onClick={() => this.setState({ error: null })}
                        style={{
                            padding: 'var(--space-2) var(--space-4)',
                            background: 'var(--color-primary-500)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                        }}
                    >
                        Retry
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

function useSidebarCollapse() {
    const [collapsed, setCollapsed] = useState(() => {
        try { return localStorage.getItem('react-katas-sidebar') === 'collapsed' } catch { return false }
    })
    const toggle = useCallback(() => {
        setCollapsed((prev) => {
            const next = !prev
            try { localStorage.setItem('react-katas-sidebar', next ? 'collapsed' : 'expanded') } catch {}
            return next
        })
    }, [])
    return { collapsed, toggle }
}

function AppContent() {
    const { currentPath } = useRouter()
    const { completedLessons, toggleLessonCompletion, isLessonCompleted } = useProgress()
    const { collapsed, toggle: toggleSidebar } = useSidebarCollapse()

    // Get the current lesson based on path
    const currentLesson = getLessonByPath(currentPath)

    const appClass = `${styles.app} ${collapsed ? styles.sidebarCollapsed : ''}`

    // All hooks must be called unconditionally (Rules of Hooks)
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

    // Timer — only run when viewing a lesson
    useEffect(() => {
        if (!currentLesson) return
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [currentPath, currentLesson])

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

    // Render home page if no lesson is selected (no sidebar)
    if (!currentLesson || currentPath === '/') {
        return <HomePage />
    }

    const MIN_TIME_SECONDS = 30 // 30 seconds reading time requirement
    const canComplete = isLessonCompleted(currentLesson.id) || ((hasScrolledToBottom || isShortContent) && timeSpent >= MIN_TIME_SECONDS)

    // Render the lesson component
    const LessonComponent = currentLesson.component
    const isCompleted = isLessonCompleted(currentLesson.id)
    const { previous, next } = getAdjacentLessons(currentPath)

    return (
        <div className={appClass}>
            <aside className={styles.sidebar}>
                <Sidebar completedLessons={completedLessons} collapsed={collapsed} onToggleCollapse={toggleSidebar} />
            </aside>
            <main className={styles.mainContent}>
                <LessonErrorBoundary resetKey={currentPath}>
                    <Suspense fallback={<div className={styles.loading} />}>
                        <LessonComponent />
                    </Suspense>
                </LessonErrorBoundary>

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
    const cardBase: React.CSSProperties = {
        flex: '1 1 280px',
        maxWidth: 400,
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-xl)',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            gap: 'var(--space-8)',
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: 0 }}>React Tutorial Katas</h1>

            <div style={{
                display: 'flex',
                gap: 'var(--space-6)',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}>
                {/* React Katas card */}
                <Link
                    to="/lessons/jsx-basics"
                    style={{
                        ...cardBase,
                        background: 'var(--surface-primary)',
                        color: 'var(--on-surface-primary)',
                        boxShadow: 'var(--shadow-md)',
                    }}
                >
                    <h2 style={{ color: 'var(--on-surface-primary)', marginBottom: 'var(--space-3)' }}>
                        React Katas
                    </h2>
                    <p style={{ color: 'var(--on-surface-primary)', opacity: 0.8, margin: 0 }}>
                        Master React 19 from fundamentals to advanced patterns
                    </p>
                </Link>

                {/* Applications card — coming soon */}
                <div
                    style={{
                        ...cardBase,
                        background: 'var(--surface-accent)',
                        color: 'var(--on-surface-accent)',
                        boxShadow: 'var(--shadow-md)',
                        opacity: 0.6,
                        cursor: 'default',
                        position: 'relative',
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        top: 'var(--space-3)',
                        right: 'var(--space-3)',
                        fontSize: 'var(--font-size-xs)',
                        background: 'var(--on-surface-accent)',
                        color: 'var(--surface-accent)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                    }}>
                        Coming Soon
                    </span>
                    <h2 style={{ color: 'var(--on-surface-accent)', marginBottom: 'var(--space-3)' }}>
                        Applications
                    </h2>
                    <p style={{ color: 'var(--on-surface-accent)', opacity: 0.8, margin: 0 }}>
                        Build real-world projects with guided walkthroughs
                    </p>
                </div>
            </div>
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
