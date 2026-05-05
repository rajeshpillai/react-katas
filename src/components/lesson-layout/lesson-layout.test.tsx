import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LessonLayout } from './lesson-layout'
import type { PlaygroundConfig, PlaygroundVariant } from '@components/playground'

// PlaygroundLayout is lazy-loaded and pulls CodeMirror; stub it out so the
// tests focus on LessonLayout's own logic (tabs + variant switching).
vi.mock('@components/playground', async () => {
    return {
        PlaygroundLayout: ({ config }: { config: PlaygroundConfig }) => (
            <div data-testid="playground" data-entry={config.entryFile} data-files={config.files.map((f) => f.name).join(',')} />
        ),
    }
})

// Source viewer pulls CodeMirror too — stub it.
vi.mock('./source-code-viewer', () => ({
    default: ({ code }: { code: string }) => <div data-testid="source-viewer">{code}</div>,
}))

const singleConfig: PlaygroundConfig = {
    files: [{ name: 'App.tsx', language: 'tsx', code: 'export default () => null' }],
    entryFile: 'App.tsx',
}

const variants: PlaygroundVariant[] = [
    {
        id: 'before',
        label: 'Before — broken',
        description: 'The naive version.',
        files: [{ name: 'App.tsx', language: 'tsx', code: '// before' }],
        entryFile: 'App.tsx',
    },
    {
        id: 'after',
        label: 'After — fixed',
        description: 'The corrected version.',
        files: [{ name: 'App.tsx', language: 'tsx', code: '// after' }],
        entryFile: 'App.tsx',
    },
]

describe('LessonLayout — tabs', () => {
    it('renders Lesson, Playground and Source Code tabs when a config is provided', () => {
        render(
            <LessonLayout title="A Kata" playgroundConfig={singleConfig} sourceCode="// src">
                <p>lesson body</p>
            </LessonLayout>
        )
        expect(screen.getByRole('button', { name: 'Lesson' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Playground' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Source Code' })).toBeInTheDocument()
    })

    it('hides the Playground tab when neither config nor variants are provided', () => {
        render(
            <LessonLayout title="Text-only Kata" sourceCode="// src">
                <p>lesson body</p>
            </LessonLayout>
        )
        expect(screen.queryByRole('button', { name: 'Playground' })).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Source Code' })).toBeInTheDocument()
    })

    it('renders children on the Lesson tab and switches to other tabs on click', async () => {
        render(
            <LessonLayout title="A Kata" playgroundConfig={singleConfig} sourceCode="// src">
                <p>lesson body</p>
            </LessonLayout>
        )
        // Lesson tab is initial
        expect(screen.getByText('lesson body')).toBeInTheDocument()
        expect(screen.queryByTestId('playground')).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Playground' }))
        expect(await screen.findByTestId('playground')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: 'Source Code' }))
        expect(await screen.findByTestId('source-viewer')).toHaveTextContent('// src')
    })
})

describe('LessonLayout — variants', () => {
    it('renders the variant selector when playgroundVariants has more than one entry', async () => {
        render(
            <LessonLayout title="A Kata" playgroundVariants={variants} sourceCode="// src">
                <p>body</p>
            </LessonLayout>
        )
        fireEvent.click(screen.getByRole('button', { name: 'Playground' }))
        expect(await screen.findByRole('tab', { name: 'Before — broken' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'After — fixed' })).toBeInTheDocument()
    })

    it('switches the playground when a different variant is picked', async () => {
        render(
            <LessonLayout title="A Kata" playgroundVariants={variants} sourceCode="// src">
                <p>body</p>
            </LessonLayout>
        )
        fireEvent.click(screen.getByRole('button', { name: 'Playground' }))

        // First variant active
        expect(await screen.findByText('The naive version.')).toBeInTheDocument()

        fireEvent.click(screen.getByRole('tab', { name: 'After — fixed' }))

        // Description updates
        expect(await screen.findByText('The corrected version.')).toBeInTheDocument()
    })

    it('hides the variant selector when only one variant is provided', async () => {
        render(
            <LessonLayout title="A Kata" playgroundVariants={[variants[0]]} sourceCode="// src">
                <p>body</p>
            </LessonLayout>
        )
        fireEvent.click(screen.getByRole('button', { name: 'Playground' }))
        await screen.findByTestId('playground')
        expect(screen.queryByRole('tablist', { name: /implementation variant/i })).not.toBeInTheDocument()
    })
})
