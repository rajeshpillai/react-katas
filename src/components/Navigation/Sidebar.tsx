import { Link, useRouter } from '@router/Router'
import { lessons, SECTIONS, getLessonsBySection } from '@router/routes'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const { currentPath } = useRouter()

    // Group lessons by section
    const sections = Object.values(SECTIONS)

    return (
        <nav className={styles.sidebar}>
            <div className={styles.logo}>React Katas</div>

            {sections.map((section) => {
                const sectionLessons = getLessonsBySection(section)

                return (
                    <div key={section} className={styles.section}>
                        <h2 className={styles['section-title']}>{section}</h2>
                        <ul className={styles['lesson-list']}>
                            {sectionLessons.map((lesson) => (
                                <li key={lesson.id} className={styles['lesson-item']}>
                                    <Link
                                        to={lesson.path}
                                        className={styles['lesson-link']}
                                        activeClassName={styles.active}
                                    >
                                        <span className={styles['lesson-number']}>{lesson.order}</span>
                                        <span className={styles['lesson-title']}>{lesson.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}

            {/* Progress indicator */}
            <div className={styles.progress}>
                <div className={styles['progress-title']}>Your Progress</div>
                <div className={styles['progress-bar']}>
                    <div className={styles['progress-fill']} style={{ width: '0%' }} />
                </div>
                <div className={styles['progress-text']}>0 of {lessons.length} lessons completed</div>
            </div>
        </nav>
    )
}
