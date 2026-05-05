import { LessonLayout } from '@components/lesson-layout'
import sourceCode from './DesignSystemGovernance.tsx?raw'
import styles from './architect-lesson.module.css'

export default function DesignSystemGovernance() {
    return (
        <LessonLayout title="Design-System Governance at Scale" sourceCode={sourceCode}>
            <div className={styles.prompt}>
                <span className={styles['prompt-label']}>Interview Prompt</span>
                <p className={styles['prompt-text']}>
                    "You're hired to lead design-system engineering across 50 product teams. The
                    current system is fragmented — three flavors of Button exist. How do you
                    govern this so it doesn't fragment again next year?"
                </p>
            </div>

            <section className={styles.section}>
                <h2>Why this question exists</h2>
                <p>
                    This is a stakeholder-reasoning question disguised as a tech question. Anyone
                    can build a Button component. Almost nobody can keep 50 teams converging on the
                    same Button two years later. The interviewer wants to hear about adoption,
                    deprecation, RFC processes, and failure modes — not props APIs.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Pillars</h2>

                <h3>1. Stakeholder map</h3>
                <p>
                    DS team, product engineers, designers, accessibility, brand, PM, executives.
                    Each wants different things. Engineers want fast unblocking; designers want
                    pixel control; accessibility wants WCAG; brand wants visual coherence; execs
                    want velocity. The governance model has to make each of those groups feel heard
                    or they will route around you.
                </p>

                <h3>2. Versioning and breaking changes</h3>
                <p>
                    Strict semver. Deprecation windows of one major (or 6 months, whichever is
                    longer). Automated migration codemods for any breaking change — if you can't
                    write a codemod, you can't break the API.
                </p>

                <h3>3. RFC process</h3>
                <p>
                    Public proposal template. Review committee that includes <em>rotating</em>{' '}
                    product engineers, not just the DS team — otherwise the DS team becomes a
                    black box. Public archive of decisions so new hires see the reasoning.
                </p>

                <h3>4. Adoption levers</h3>
                <p>
                    Strong defaults. ESLint rules ("don't import raw colors, use tokens"). Figma
                    tokens synced to code. Office hours. Embedded DS engineers in product teams
                    quarterly — the highest-bandwidth feedback channel you have.
                </p>

                <h3>5. Telemetry</h3>
                <p>
                    Usage analytics on every component: which props are used, who's still on v1,
                    how many teams override the styles. Without this you can't deprecate
                    confidently and v1 lives forever.
                </p>

                <h3>6. Escape hatches</h3>
                <p>
                    <code>unstable_*</code> props. Local-override patterns. Allow controlled
                    deviation, because if you don't, teams fork. A controlled deviation is
                    visible and reversible; a fork is invisible until you discover it eighteen
                    months later in a brand audit.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Failure modes</h2>
                <div className={`${styles.callout} ${styles.pitfalls}`}>
                    <ul>
                        <li>
                            <strong>DS team is a black box.</strong> RFCs take six weeks; engineers
                            stop contributing and build local components. You discover three
                            flavors of Button next year.
                        </li>
                        <li>
                            <strong>No deprecation discipline.</strong> v1 components live forever,
                            multiplying maintenance burden and confusing new hires.
                        </li>
                        <li>
                            <strong>No telemetry.</strong> You don't know what's used; you can't
                            deprecate; the system grows monotonically.
                        </li>
                        <li>
                            <strong>Brand and DS don't talk.</strong> Visual drift across products.
                            Customers notice before you do.
                        </li>
                        <li>
                            <strong>Treating governance as paperwork.</strong> Process without
                            adoption levers is theater. Lints and codemods do more than RFC
                            templates.
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Follow-up questions to expect</h2>
                <div className={styles.followups}>
                    <ul>
                        <li>How do you handle a team that wants a one-off component for an experiment?</li>
                        <li>How does the DS team get headcount when it doesn't ship product features?</li>
                        <li>What's the on-call story for a DS bug that breaks 50 teams?</li>
                        <li>When do you fork the DS for a different platform (mobile, marketing site)?</li>
                        <li>How do you migrate the existing three flavors of Button without freezing feature work?</li>
                    </ul>
                </div>
            </section>

            <div className={styles.takeaways}>
                <h2>Key takeaways</h2>
                <ul>
                    <li>Governance is stakeholder management, not API design.</li>
                    <li>Adoption levers (lints, codemods, defaults) beat RFC templates.</li>
                    <li>Telemetry is non-optional — without it you can't deprecate.</li>
                    <li>Escape hatches make deviation visible. Their absence creates forks.</li>
                </ul>
            </div>
        </LessonLayout>
    )
}
