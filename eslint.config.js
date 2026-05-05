import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist', 'node_modules'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
        },
        plugins: {
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
    // Lesson katas frequently demonstrate patterns that production rules
    // would reject — render counters via useRef during render, deliberately
    // inaccessible "before" variants, etc. Downgrade those rules in lesson
    // files so the build stays clean while the teaching content survives.
    {
        files: ['src/lessons/**/*.{ts,tsx}'],
        rules: {
            // useRef.current += 1 in render is the canonical render-count
            // pattern. The rule is technically right (concurrent mode) but
            // the demos rely on it.
            'react-hooks/refs': 'off',
            // setState in an effect for derived state is the anti-pattern
            // many katas (e.g. UseRef, UseEffectFundamentals) deliberately
            // show as the "before" variant.
            'react-hooks/set-state-in-effect': 'off',
            // ARIA katas intentionally show <div onClick> as a broken
            // baseline before the fixed <button> variant.
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 'off',
            'jsx-a11y/interactive-supports-focus': 'off',
            'jsx-a11y/label-has-associated-control': 'off',
            'jsx-a11y/aria-role': 'off',
        },
    },
)
