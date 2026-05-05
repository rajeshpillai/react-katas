import { Link } from '@router/router'
import { TIERS, getSequence } from '@router/interview-tiers'
import styles from './interview-landing.module.css'

export function InterviewLanding() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.crumb}>← Home</Link>
                <h1 className={styles.title}>Interview Role Play</h1>
                <p className={styles.subtitle}>
                    Pick your experience level. Each tier opens a curated sequence of interview-style
                    questions, mapped to the katas that prepare you to answer them.
                </p>
            </header>

            <div className={styles.grid}>
                {TIERS.map((tier) => {
                    const available = getSequence(tier.id).filter((s) => s.lessonId).length
                    return (
                        <Link
                            key={tier.id}
                            to={`/interview/${tier.id}`}
                            className={styles.card}
                            style={{
                                ['--tier-accent' as string]: tier.accent,
                                ['--tier-surface' as string]: tier.accentSurface,
                            }}
                        >
                            <div className={styles['card-head']}>
                                <span className={styles['card-years']}>{tier.years}</span>
                                <span className={styles['card-count']}>
                                    {available} / {tier.targetCount}
                                </span>
                            </div>
                            <h2 className={styles['card-title']}>{tier.label}</h2>
                            <p className={styles['card-intro']}>{tier.intro}</p>
                            <span className={styles['card-cta']}>Start questions →</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default InterviewLanding
