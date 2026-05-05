import { Link } from '@router/router'
import type { Tier } from '@router/interview-tiers'
import { getSequence } from '@router/interview-tiers'
import { getLessonByPath, lessons } from '@router/routes'
import styles from './tier-page.module.css'

interface TierPageProps {
    tier: Tier
}

export function TierPage({ tier }: TierPageProps) {
    const sequence = getSequence(tier.id)
    const lessonsById = new Map(lessons.map((l) => [l.id, l]))

    return (
        <div
            className={styles.container}
            style={{
                ['--tier-accent' as string]: tier.accent,
                ['--tier-surface' as string]: tier.accentSurface,
            }}
        >
            <header className={styles.header}>
                <Link to="/interview" className={styles.crumb}>← All tiers</Link>
                <span className={styles.years}>{tier.years}</span>
                <h1 className={styles.title}>{tier.label}</h1>
                <p className={styles.intro}>{tier.intro}</p>
                <div className={styles.meta}>
                    <span>{sequence.filter((s) => s.lessonId).length} mapped questions</span>
                    <span>·</span>
                    <span>{tier.targetCount} target</span>
                </div>
            </header>

            <ol className={styles.list}>
                {sequence.map((item, idx) => {
                    const lesson = item.lessonId ? lessonsById.get(item.lessonId) : undefined

                    if (!lesson) {
                        return (
                            <li key={idx} className={`${styles.item} ${styles['item-placeholder']}`}>
                                <span className={styles.index}>{idx + 1}</span>
                                <div className={styles.body}>
                                    <span className={styles.question}>{item.question}</span>
                                    <span className={styles.placeholder}>Coming soon</span>
                                </div>
                            </li>
                        )
                    }

                    const target = `${lesson.path}?tier=${tier.id}`
                    return (
                        <li key={idx} className={styles.item}>
                            <Link to={target} className={styles.link}>
                                <span className={styles.index}>{idx + 1}</span>
                                <div className={styles.body}>
                                    <span className={styles.question}>{item.question}</span>
                                    <span className={styles['lesson-ref']}>
                                        Maps to: {lesson.title}
                                    </span>
                                </div>
                                <span className={styles.arrow}>→</span>
                            </Link>
                        </li>
                    )
                })}
            </ol>

            {sequence.length > 0 && (
                <div className={styles.footer}>
                    <Link
                        to={firstLessonPath(sequence, tier.id)}
                        className={styles['start-btn']}
                    >
                        Start with question 1 →
                    </Link>
                </div>
            )}
        </div>
    )
}

function firstLessonPath(sequence: ReturnType<typeof getSequence>, tierId: string): string {
    const first = sequence.find((s) => s.lessonId)
    if (!first?.lessonId) return '/interview'
    const lesson = getLessonByPath(`/lessons/${first.lessonId}`)
        ?? lessons.find((l) => l.id === first.lessonId)
    if (!lesson) return '/interview'
    return `${lesson.path}?tier=${tierId}`
}

export default TierPage
