import { Link, useRouter } from '@router/router'
import type { Tier } from '@router/interview-tiers'
import { getSequence } from '@router/interview-tiers'
import { lessons } from '@router/routes'
import styles from './interview-sidebar.module.css'

interface InterviewSidebarProps {
    tier: Tier
    completedLessons?: string[]
    collapsed?: boolean
    onToggleCollapse?: () => void
}

export function InterviewSidebar({
    tier,
    completedLessons = [],
    collapsed = false,
    onToggleCollapse,
}: InterviewSidebarProps) {
    const { currentPath } = useRouter()
    const sequence = getSequence(tier.id)
    const lessonsById = new Map(lessons.map((l) => [l.id, l]))

    const mappedCount = sequence.filter((s) => s.lessonId).length
    const completedInTier = sequence.filter(
        (s) => s.lessonId && completedLessons.includes(s.lessonId)
    ).length
    const progressPct = mappedCount > 0 ? (completedInTier / mappedCount) * 100 : 0

    return (
        <nav
            className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
            style={{
                ['--tier-accent' as string]: tier.accent,
                ['--tier-surface' as string]: tier.accentSurface,
            }}
        >
            <div className={styles['logo-row']}>
                {!collapsed && (
                    <div className={styles.logo}>
                        <Link to="/interview">Role Play</Link>
                    </div>
                )}
                <div className={styles['logo-actions']}>
                    {onToggleCollapse && (
                        <button
                            className={styles['collapse-toggle']}
                            onClick={onToggleCollapse}
                            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {collapsed ? '❯' : '❮'}
                        </button>
                    )}
                </div>
            </div>

            {!collapsed && (
                <>
                    <div className={styles['tier-header']}>
                        <span className={styles['tier-years']}>{tier.years}</span>
                        <h2 className={styles['tier-label']}>{tier.label}</h2>
                        <Link to="/interview" className={styles['back-link']}>
                            ← All tiers
                        </Link>
                    </div>

                    <ol className={styles.list}>
                        {sequence.map((item, idx) => {
                            const lesson = item.lessonId ? lessonsById.get(item.lessonId) : undefined
                            const isCompleted =
                                item.lessonId && completedLessons.includes(item.lessonId)

                            if (!lesson) {
                                return (
                                    <li key={idx} className={styles['item-placeholder']}>
                                        <span className={styles.index}>{idx + 1}</span>
                                        <span className={styles['question-text']}>
                                            {item.question}
                                        </span>
                                        <span className={styles['placeholder-tag']}>soon</span>
                                    </li>
                                )
                            }

                            const target = `${lesson.path}?tier=${tier.id}`
                            const isActive = currentPath === lesson.path

                            return (
                                <li key={idx} className={styles.item}>
                                    <Link
                                        to={target}
                                        className={`${styles.link} ${isActive ? styles.active : ''}`}
                                    >
                                        <span className={styles.index}>{idx + 1}</span>
                                        <span className={styles['question-text']}>
                                            {item.question}
                                        </span>
                                        {isCompleted && (
                                            <span className={styles.check} aria-label="completed">
                                                ✓
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>

                    <div className={styles.progress}>
                        <div className={styles['progress-title']}>Tier Progress</div>
                        <div className={styles['progress-bar']}>
                            <div
                                className={styles['progress-fill']}
                                style={{ width: `${progressPct}%` }}
                            />
                        </div>
                        <div className={styles['progress-text']}>
                            {completedInTier} of {mappedCount} questions completed
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}

export default InterviewSidebar
