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
