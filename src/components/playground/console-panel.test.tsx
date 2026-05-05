import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConsolePanel } from './console-panel'
import type { ConsoleMessage } from './playground-types'

function msg(over: Partial<ConsoleMessage> = {}): ConsoleMessage {
    return {
        id: 1,
        method: 'log',
        args: ['hello'],
        timestamp: 0,
        ...over,
    }
}

describe('ConsolePanel', () => {
    it('shows an empty hint when there are no messages', () => {
        render(<ConsolePanel messages={[]} onClear={() => {}} />)
        expect(screen.getByText(/console\.log\(\) output appears here/i)).toBeInTheDocument()
    })

    it('renders one row per message', () => {
        const messages = [
            msg({ id: 1, method: 'log', args: ['first'] }),
            msg({ id: 2, method: 'warn', args: ['second'] }),
            msg({ id: 3, method: 'error', args: ['third'] }),
        ]
        render(<ConsolePanel messages={messages} onClear={() => {}} />)
        expect(screen.getByText('first')).toBeInTheDocument()
        expect(screen.getByText('second')).toBeInTheDocument()
        expect(screen.getByText('third')).toBeInTheDocument()
    })

    it('joins multiple args with spaces in display', () => {
        const messages = [msg({ args: ['count', '=', '7'] })]
        render(<ConsolePanel messages={messages} onClear={() => {}} />)
        expect(screen.getByText('count = 7')).toBeInTheDocument()
    })

    it('shows error and warn count badges in the header', () => {
        const messages = [
            msg({ id: 1, method: 'log', args: ['ok'] }),
            msg({ id: 2, method: 'error', args: ['boom'] }),
            msg({ id: 3, method: 'error', args: ['again'] }),
            msg({ id: 4, method: 'warn', args: ['careful'] }),
        ]
        render(<ConsolePanel messages={messages} onClear={() => {}} />)
        // Total count
        expect(screen.getByText('4')).toBeInTheDocument()
        // Error badge: 2
        const errorBadge = screen.getByText('2')
        expect(errorBadge).toBeInTheDocument()
        // Warn badge: 1
        const warnBadge = screen.getByText('1')
        expect(warnBadge).toBeInTheDocument()
    })

    it('Clear button calls onClear', () => {
        const onClear = vi.fn()
        const messages = [msg()]
        render(<ConsolePanel messages={messages} onClear={onClear} />)
        fireEvent.click(screen.getByRole('button', { name: /clear console/i }))
        expect(onClear).toHaveBeenCalledTimes(1)
    })

    it('hides the Clear button when there are no messages', () => {
        render(<ConsolePanel messages={[]} onClear={() => {}} />)
        expect(screen.queryByRole('button', { name: /clear console/i })).not.toBeInTheDocument()
    })

    it('toggles collapsed state when the header toggle is clicked', () => {
        render(<ConsolePanel messages={[msg()]} onClear={() => {}} />)
        const toggle = screen.getByRole('button', { name: /collapse console/i })
        expect(toggle).toHaveAttribute('aria-expanded', 'true')
        // Body is visible
        expect(screen.getByText('hello')).toBeInTheDocument()

        fireEvent.click(toggle)
        // Now collapsed: body hidden, button label flips
        expect(screen.getByRole('button', { name: /expand console/i })).toHaveAttribute('aria-expanded', 'false')
        expect(screen.queryByText('hello')).not.toBeInTheDocument()
    })
})
