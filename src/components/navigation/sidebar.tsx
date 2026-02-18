import { Link } from '@router/router'
import { lessons, SECTIONS, getLessonsBySection } from '@router/routes'
import styles from './sidebar.module.css'

interface SidebarProps {
    completedLessons?: string[]
}

export default function Sidebar({ completedLessons = [] }: SidebarProps) {
    // Group lessons by section
    const sections = Object.values(SECTIONS)

    // Calculate progress
    const totalLessons = lessons.length
    const completedCount = completedLessons.length
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}><Link to="/">React Katas</Link></div>

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
        </nav>
    )
}
