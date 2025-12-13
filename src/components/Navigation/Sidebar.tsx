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
                        <h2 className={styles.sectionTitle}>{section}</h2>
                        <ul className={styles.lessonList}>
                            {sectionLessons.map((lesson) => (
                                <li key={lesson.id} className={styles.lessonItem}>
                                    <Link
                                        to={lesson.path}
                                        className={styles.lessonLink}
                                        activeClassName={styles.active}
                                    >
                                        <span className={styles.lessonNumber}>{lesson.order}</span>
                                        <span className={styles.lessonTitle}>{lesson.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            })}

            {/* Progress indicator */}
            <div className={styles.progress}>
                <div className={styles.progressTitle}>Your Progress</div>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '0%' }} />
                </div>
                <div className={styles.progressText}>0 of {lessons.length} lessons completed</div>
            </div>
        </nav>
    )
}
