import { useState, lazy, Suspense, ReactNode } from 'react'
import type { PlaygroundConfig, PlaygroundVariant } from '@components/playground'
import { VariantSelector } from './variant-selector'
import styles from './lesson-layout.module.css'

const PlaygroundLayout = lazy(() =>
    import('@components/playground').then((m) => ({ default: m.PlaygroundLayout }))
)

const SourceCodeViewer = lazy(() => import('./source-code-viewer'))

type Tab = 'lesson' | 'playground' | 'code'

interface LessonLayoutProps {
    title: string
    /** Single-version playground (existing). Mutually exclusive with playgroundVariants. */
    playgroundConfig?: PlaygroundConfig
    /** Multi-version playground for Before/After comparisons. Mutually exclusive with playgroundConfig. */
    playgroundVariants?: PlaygroundVariant[]
    sourceCode: string
    children: ReactNode
}

function variantToConfig(v: PlaygroundVariant): PlaygroundConfig {
    return {
        files: v.files,
        entryFile: v.entryFile,
        height: v.height,
    }
}

export function LessonLayout({
    title,
    playgroundConfig,
    playgroundVariants,
    sourceCode,
    children,
}: LessonLayoutProps) {
    const [activeTab, setActiveTab] = useState<Tab>('lesson')
    const [variantId, setVariantId] = useState<string | undefined>(
        playgroundVariants?.[0]?.id
    )

    const hasPlayground =
        Boolean(playgroundConfig) || Boolean(playgroundVariants && playgroundVariants.length > 0)

    const tabs: Tab[] = hasPlayground
        ? ['lesson', 'playground', 'code']
        : ['lesson', 'code']

    const activeVariant =
        playgroundVariants?.find((v) => v.id === variantId) ?? playgroundVariants?.[0]
    const activeConfig: PlaygroundConfig | undefined = activeVariant
        ? variantToConfig(activeVariant)
        : playgroundConfig

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

            {activeTab === 'playground' && activeConfig && (
                <>
                    {playgroundVariants && playgroundVariants.length > 1 && activeVariant && (
                        <VariantSelector
                            variants={playgroundVariants}
                            activeId={activeVariant.id}
                            onChange={setVariantId}
                        />
                    )}
                    <Suspense fallback={<div>Loading playground...</div>}>
                        <PlaygroundLayout
                            key={activeVariant?.id ?? 'single'}
                            config={activeConfig}
                        />
                    </Suspense>
                </>
            )}

            {activeTab === 'code' && (
                <Suspense fallback={<div>Loading source...</div>}>
                    <SourceCodeViewer code={sourceCode} />
                </Suspense>
            )}
        </div>
    )
}
