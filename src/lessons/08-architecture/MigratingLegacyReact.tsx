import { LessonLayout } from '@components/lesson-layout'
import sourceCode from './MigratingLegacyReact.tsx?raw'
import styles from './architect-lesson.module.css'

export default function MigratingLegacyReact() {
    return (
        <LessonLayout title="Migrating Legacy React to Modern" sourceCode={sourceCode}>
            <div className={styles.prompt}>
                <span className={styles['prompt-label']}>Interview Prompt</span>
                <p className={styles['prompt-text']}>
                    "We have a 10-year-old React app — class components, Redux everywhere, a 5MB
                    bundle, custom build tooling. Walk me through how you'd modernize it to React 19.
                    What does the rollout look like across, say, eight months?"
                </p>
            </div>

            <section className={styles.section}>
                <h2>Why this question exists</h2>
                <p>
                    The interviewer is testing whether you can plan multi-quarter, org-level change
                    while the team continues to ship features. The wrong answer is "rewrite from
                    scratch." The right answer is a sequenced plan that ships value at every stage,
                    keeps tests green, and gives the org clear off-ramps if priorities shift.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Stages</h2>

                <h3>1. Audit and risk surface</h3>
                <p>
                    Before touching code, inventory what you're up against. Count class components,
                    deprecated APIs, render-blocking patterns, tightly-coupled state. Map test
                    coverage. The output is a heatmap of risk vs effort — high-risk &amp; high-effort
                    areas (auth, billing, anything customer-facing) get strangled, not converted.
                </p>

                <h3>2. Strangler-fig wrappers</h3>
                <p>
                    Keep legacy at the leaves. Add thin adapters at boundaries so new features can
                    use modern patterns immediately, even though the surrounding screens are old.
                    This unblocks the team while you work on the trunk.
                </p>

                <h3>3. Mechanical conversions</h3>
                <p>
                    Class &rarr; function. Lifecycle &rarr; effect. Use codemods. <strong>Do not
                    change behavior in this stage.</strong> Snapshot tests and visual regression are
                    your guard rails. If a converted component behaves differently, the codemod or
                    the tests are wrong — investigate, don't paper over.
                </p>

                <h3>4. Behavioral conversions</h3>
                <p>
                    Now the hard part. Refactor state from <code>setState</code> spread-merges to
                    reducers or stores. Where Context is overused as a global, introduce selectors.
                    This is where regressions live — go slow, ship behind flags.
                </p>

                <h3>5. Modernize tooling</h3>
                <p>
                    TypeScript strict, react-compiler on, jest &rarr; vitest, route-level code-split,
                    bundler upgrade. Often runs in parallel with stages 3-4. The compiler especially
                    rewards #4 — the cleaner your effects and state, the more it can optimize.
                </p>

                <h3>6. Cleanup and delete</h3>
                <p>
                    Kill dead branches. Remove polyfills. Retire HOCs. The biggest win of the whole
                    project is often the last 5%: deleting code nobody dares delete because the
                    types finally tell you it's unused.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Pitfalls</h2>
                <div className={`${styles.callout} ${styles.pitfalls}`}>
                    <ul>
                        <li>
                            <strong>Doing #4 before #3.</strong> Refactoring behavior in untested
                            code is how you ship bugs.
                        </li>
                        <li>
                            <strong>Big-bang rewrites.</strong> Six months in with nothing shipped =
                            project canceled.
                        </li>
                        <li>
                            <strong>Skipping the audit.</strong> You'll burn a quarter on the wrong
                            battle and discover the real risk surface in production.
                        </li>
                        <li>
                            <strong>Forgetting bundle split.</strong> Modern React doesn't fix a
                            5MB monolith automatically. Route-level splits often deliver more
                            user-visible improvement than the framework upgrade itself.
                        </li>
                        <li>
                            <strong>Treating it as "the React 19 project."</strong> Frame it as
                            "modernization that happens to land on React 19" — survives leadership
                            churn.
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Follow-up questions to expect</h2>
                <div className={styles.followups}>
                    <ul>
                        <li>What stays a class component forever?</li>
                        <li>How do you measure progress to the exec team?</li>
                        <li>What does the rollback plan look like for stage 4?</li>
                        <li>How do you handle the team that built and still owns the legacy version?</li>
                        <li>Which features get blocked during the migration, and which keep shipping?</li>
                    </ul>
                </div>
            </section>

            <div className={styles.takeaways}>
                <h2>Key takeaways</h2>
                <ul>
                    <li>Sequence: audit &rarr; strangle &rarr; mechanical &rarr; behavioral &rarr; tooling &rarr; cleanup.</li>
                    <li>Mechanical conversions are codemod-driven; behavioral conversions need flags.</li>
                    <li>Ship value every stage. Big-bang rewrites get cancelled.</li>
                    <li>Bundle reduction often beats the framework upgrade for end-user impact.</li>
                </ul>
            </div>
        </LessonLayout>
    )
}
