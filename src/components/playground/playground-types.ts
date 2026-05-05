export interface PlaygroundFile {
    name: string
    language: 'tsx' | 'ts' | 'css'
    code: string
}

export interface PlaygroundConfig {
    files: PlaygroundFile[]
    entryFile?: string // defaults to 'App.tsx'
    height?: number // preview height in px, defaults to 400
}

/**
 * A single variant within a Before/After (or N-way) implementation comparison.
 * Lessons that want to show "naive vs corrected" code use playgroundVariants
 * on LessonLayout instead of a single playgroundConfig.
 */
export interface PlaygroundVariant {
    id: string                       // stable id for the variant tab
    label: string                    // display label, e.g. "Before — broken"
    description?: string             // short framing shown under the selector
    files: PlaygroundFile[]
    entryFile?: string
    height?: number
}

export interface TranspileError {
    type: 'transpile'
    fileName: string
    message: string
    line?: number
    column?: number
}

export interface RuntimeError {
    type: 'runtime'
    message: string
    stack?: string
}

export type PlaygroundError = TranspileError | RuntimeError

export type ConsoleMethod = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface ConsoleMessage {
    id: number
    method: ConsoleMethod
    args: string[]
    timestamp: number
}
