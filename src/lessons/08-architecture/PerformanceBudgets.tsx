import { LessonLayout } from '@components/lesson-layout'
import sourceCode from './PerformanceBudgets.tsx?raw'
import styles from './architect-lesson.module.css'

export default function PerformanceBudgets() {
    return (
        <LessonLayout title="Long-Horizon Performance Budgets" sourceCode={sourceCode}>
            <div className={styles.prompt}>
                <span className={styles['prompt-label']}>Interview Prompt</span>
                <p className={styles['prompt-text']}>
                    "Set a performance budget for an SPA used by 5M monthly users. Describe both
                    the technical budget and the org process that defends it through team rotation
                    and feature pressure over the next three years."
                </p>
            </div>

            <section className={styles.section}>
                <h2>Why this question exists</h2>
                <p>
                    The interviewer is testing whether you can build a process that survives team
                    rotation, not just a one-time perf win. Anyone can shave 200ms off LCP this
                    quarter. The hard part is keeping it shaved when six new engineers join, the
                    feature roadmap doubles, and the original perf champion has moved on.
                </p>
            </section>

            <section className={styles.section}>
                <h2>The budget itself — three layers</h2>
                <p>A budget is not one number. Layer it.</p>

                <h3>1. Bundle budgets (CI gate)</h3>
                <p>
                    Per-route gzipped JS limit. Fails CI on regression. Easy to enforce, easy to
                    game, easy to understand. A canonical starting point: 100KB per route gzipped,
                    plus a shared vendor chunk &lt;200KB.
                </p>

                <h3>2. Field metrics (real users)</h3>
                <p>
                    p75 LCP, INP, CLS from real users via web-vitals + your analytics pipeline.
                    Tracked in dashboards, alerted on regression with hysteresis (don't page on a
                    2% blip). This is the number that actually correlates with revenue.
                </p>

                <h3>3. Synthetic gates (PR-time)</h3>
                <p>
                    Lighthouse CI on PR for representative pages. Catches issues that wouldn't
                    show up in field until shipped. Calibrate against field metrics quarterly so
                    synthetic doesn't drift away from reality.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Org process — what defends the budget</h2>

                <h3>Ownership by route</h3>
                <p>
                    Every route has a DRI (Directly Responsible Individual). Perf is a property of
                    the team that ships features there, not of a central perf team. The central
                    team builds tooling and consults; route teams own the numbers.
                </p>

                <h3>Escalation ladder</h3>
                <p>
                    Regression &gt; X% pages oncall + DRI in Slack. Sustained breach &gt; Y days
                    requires a written postmortem. Public postmortems make repeated regressions
                    socially expensive — the most underrated lever in perf governance.
                </p>

                <h3>Quarterly review</h3>
                <p>
                    SLO health, budget revisits, planned investments. Budgets that never change
                    codify whatever was true a year ago — schedule the review or it won't happen.
                </p>

                <h3>Defaults that fail safe</h3>
                <p>
                    New routes start with strict budget. Teams must justify a relaxation, not the
                    reverse. Same idea for feature launches: temporary budget exemption with a
                    sunset date in the spec doc, not silently lifted forever.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Failure modes</h2>
                <div className={`${styles.callout} ${styles.pitfalls}`}>
                    <ul>
                        <li>
                            <strong>One central perf team owns budgets.</strong> Everyone else
                            tunes out. Budgets become "their thing."
                        </li>
                        <li>
                            <strong>No tolerance bands.</strong> Every micro-regression alerts.
                            Alert fatigue, then nobody looks at the alerts.
                        </li>
                        <li>
                            <strong>Goodharting.</strong> Teams game LCP by lazy-loading the LCP
                            element itself. Synthetic checks should catch this; field metrics
                            won't.
                        </li>
                        <li>
                            <strong>Set once, never revisited.</strong> Networks get faster,
                            devices change, user expectations rise. A 2022 budget defended in 2026
                            is a ceiling, not a floor.
                        </li>
                        <li>
                            <strong>No budget for third parties.</strong> Marketing tags, analytics,
                            chat widgets — these dwarf your own bundle. Budget them explicitly or
                            they'll eat your gains.
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Follow-up questions to expect</h2>
                <div className={styles.followups}>
                    <ul>
                        <li>What about new feature launches that genuinely need more budget?</li>
                        <li>How do you handle third-party scripts you don't control?</li>
                        <li>When do you say no to a feature on perf grounds?</li>
                        <li>How does this differ for an SPA vs MPA vs Next.js app?</li>
                        <li>How do you set budgets for slow-network or low-end-device users?</li>
                    </ul>
                </div>
            </section>

            <div className={styles.takeaways}>
                <h2>Key takeaways</h2>
                <ul>
                    <li>Layer the budget: bundle (CI) + field (RUM) + synthetic (PR).</li>
                    <li>Ownership by route, not by central team. Postmortems do the enforcement.</li>
                    <li>Defaults strict; exemptions explicit and time-boxed.</li>
                    <li>Schedule the quarterly review, or budgets calcify.</li>
                </ul>
            </div>
        </LessonLayout>
    )
}
