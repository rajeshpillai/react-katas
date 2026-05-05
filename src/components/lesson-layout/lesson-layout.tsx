import { useState, lazy, Suspense, ReactNode } from 'react'
import type { PlaygroundConfig } from '@components/playground'
import styles from './lesson-layout.module.css'

const PlaygroundLayout = lazy(() =>
    import('@components/playground').then((m) => ({ default: m.PlaygroundLayout }))
)

const SourceCodeViewer = lazy(() => import('./source-code-viewer'))

type Tab = 'lesson' | 'playground' | 'code'

interface LessonLayoutProps {
    title: string
    playgroundConfig?: PlaygroundConfig
    sourceCode: string
    children: ReactNode
}

export function LessonLayout({ title, playgroundConfig, sourceCode, children }: LessonLayoutProps) {
    const [activeTab, setActiveTab] = useState<Tab>('lesson')
    const tabs: Tab[] = playgroundConfig
        ? ['lesson', 'playground', 'code']
        : ['lesson', 'code']

    return (
        <div>
            <h1>{title}</h1>

            <div className={styles['tab-bar']}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                    >
                        {tab === 'lesson' ? 'Lesson' : tab === 'playground' ? 'Playground' : 'Source Code'}
                    </button>
                ))}
            </div>

            {activeTab === 'lesson' && children}

            {activeTab === 'playground' && playgroundConfig && (
                <Suspense fallback={<div>Loading playground...</div>}>
                    <PlaygroundLayout config={playgroundConfig} />
                </Suspense>
            )}

            {activeTab === 'code' && (
                <Suspense fallback={<div>Loading source...</div>}>
                    <SourceCodeViewer code={sourceCode} />
                </Suspense>
            )}
        </div>
    )
}
