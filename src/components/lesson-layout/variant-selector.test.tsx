import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { VariantSelector } from './variant-selector'
import type { PlaygroundVariant } from '@components/playground'

const variants: PlaygroundVariant[] = [
    {
        id: 'before',
        label: 'Before — broken',
        description: 'The naive version that fails.',
        files: [{ name: 'App.tsx', language: 'tsx', code: '' }],
    },
    {
        id: 'after',
        label: 'After — fixed',
        description: 'The corrected version.',
        files: [{ name: 'App.tsx', language: 'tsx', code: '' }],
    },
    {
        id: 'extra',
        label: 'Extra demo',
        files: [{ name: 'App.tsx', language: 'tsx', code: '' }],
    },
]

describe('VariantSelector', () => {
    it('renders one tab per variant', () => {
        render(<VariantSelector variants={variants} activeId="before" onChange={() => {}} />)
        expect(screen.getByRole('tab', { name: 'Before — broken' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'After — fixed' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Extra demo' })).toBeInTheDocument()
    })

    it('marks the active tab via aria-selected', () => {
        render(<VariantSelector variants={variants} activeId="after" onChange={() => {}} />)
        expect(screen.getByRole('tab', { name: 'After — fixed' })).toHaveAttribute('aria-selected', 'true')
        expect(screen.getByRole('tab', { name: 'Before — broken' })).toHaveAttribute('aria-selected', 'false')
    })

    it('shows the active variant description with a "Showing:" prefix', () => {
        render(<VariantSelector variants={variants} activeId="before" onChange={() => {}} />)
        expect(screen.getByText('Showing:')).toBeInTheDocument()
        expect(screen.getByText('The naive version that fails.')).toBeInTheDocument()
    })

    it('omits the description block when the active variant has none', () => {
        render(<VariantSelector variants={variants} activeId="extra" onChange={() => {}} />)
        expect(screen.queryByText('Showing:')).not.toBeInTheDocument()
    })

    it('calls onChange with the clicked variant id', () => {
        const onChange = vi.fn()
        render(<VariantSelector variants={variants} activeId="before" onChange={onChange} />)
        fireEvent.click(screen.getByRole('tab', { name: 'After — fixed' }))
        expect(onChange).toHaveBeenCalledWith('after')
    })

    it('falls back to the first variant when activeId is unknown', () => {
        render(<VariantSelector variants={variants} activeId="not-real" onChange={() => {}} />)
        expect(screen.getByRole('tab', { name: 'Before — broken' })).toHaveAttribute('aria-selected', 'true')
    })
})
