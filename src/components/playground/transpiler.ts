import { transform } from 'sucrase'
import type { TranspileError } from './playground-types'

export function transpileFile(
    code: string,
    fileName: string
): { code: string; error: TranspileError | null } {
    const isTS = fileName.endsWith('.ts') || fileName.endsWith('.tsx')
    const isJSX = fileName.endsWith('.tsx') || fileName.endsWith('.jsx')

    const transforms: ('typescript' | 'jsx' | 'imports')[] = ['imports']
    if (isTS) transforms.push('typescript')
    if (isJSX) transforms.push('jsx')

    try {
        const result = transform(code, {
            transforms,
            jsxRuntime: 'automatic',
            production: true,
            filePath: fileName,
        })
        const protected_ = injectLoopProtection(result.code)
        return { code: protected_, error: null }
    } catch (e: unknown) {
        const err = e as { message: string; loc?: { line: number; column: number } }
        return {
            code: '',
            error: {
                type: 'transpile',
                fileName,
                message: err.message,
                line: err.loc?.line,
                column: err.loc?.column,
            },
        }
    }
}

/**
 * Injects loop counters into while/for/do loops to prevent infinite loops
 * from freezing the browser. Throws after 100,000 iterations.
 */
function injectLoopProtection(code: string): string {
    let counter = 0
    const declarations: string[] = []

    const result = code.replace(
        /((?:while|for)\s*\([^)]*\)\s*\{|do\s*\{)/g,
        (match) => {
            counter++
            const varName = `__lc${counter}`
            declarations.push(`let ${varName}=0;`)
            return `${match}if(++${varName}>100000)throw new Error("Infinite loop detected");`
        }
    )

    if (declarations.length === 0) return code
    return declarations.join('') + result
}
