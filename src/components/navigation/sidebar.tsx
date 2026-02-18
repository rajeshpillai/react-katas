import { Link } from '@router/router'
import { lessons, SECTIONS, getLessonsBySection } from '@router/routes'
import { useTheme } from '@hooks/use-theme'
import styles from './sidebar.module.css'

interface SidebarProps {
    completedLessons?: string[]
    collapsed?: boolean
    onToggleCollapse?: () => void
}

const THEME_ICONS = { light: '\u2600', dark: '\u263D', system: '\u25D1' } as const
const THEME_LABELS = { light: 'Light', dark: 'Dark', system: 'System' } as const

export default function Sidebar({ completedLessons = [], collapsed = false, onToggleCollapse }: SidebarProps) {
    const { theme, cycleTheme } = useTheme()

    // Group lessons by section
    const sections = Object.values(SECTIONS)

    // Calculate progress
    const totalLessons = lessons.length
    const completedCount = completedLessons.length
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

    return (
        <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles['logo-row']}>
                {!collapsed && <div className={styles.logo}><Link to="/">React Katas</Link></div>}
                <div className={styles['logo-actions']}>
                    {!collapsed && (
                        <button
                            className={styles['theme-toggle']}
                            onClick={cycleTheme}
                            title={`Theme: ${THEME_LABELS[theme]}`}
                            aria-label={`Switch theme (currently ${THEME_LABELS[theme]})`}
                        >
                            {THEME_ICONS[theme]}
                        </button>
                    )}
                    {onToggleCollapse && (
                        <button
                            className={styles['collapse-toggle']}
                            onClick={onToggleCollapse}
                            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed ? '\u276F' : '\u276E'}
                        </button>
                    )}
                </div>
            </div>

            {!collapsed && (
                <>
                    {sections.map((section) => {
                        const sectionLessons = getLessonsBySection(section)

                        return (
                            <div key={section} className={styles.section}>
                                <h2 className={styles['section-title']}>{section}</h2>
                                <ul className={styles['lesson-list']}>
                                    {sectionLessons.map((lesson) => {
                                        const isCompleted = completedLessons.includes(lesson.id)
                                        return (
                                            <li key={lesson.id} className={styles['lesson-item']}>
                                                <Link
                                                    to={lesson.path}
                                                    className={styles['lesson-link']}
                                                    activeClassName={styles.active}
                                                >
                                                    <span className={styles['lesson-number']}>{lesson.order}</span>
                                                    <span className={styles['lesson-title']}>{lesson.title}</span>
                                                    {isCompleted && <span style={{ marginLeft: 'auto', color: 'var(--color-success)' }}>✓</span>}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}

                    {/* Progress indicator */}
                    <div className={styles.progress}>
                        <div className={styles['progress-title']}>Your Progress</div>
                        <div className={styles['progress-bar']}>
                            <div
                                className={styles['progress-fill']}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                        <div className={styles['progress-text']}>
                            {completedCount} of {totalLessons} lessons completed
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}
