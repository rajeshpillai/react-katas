import { useState, useEffect, useCallback } from 'react'

export type ThemePreference = 'light' | 'dark' | 'system'
export type EffectiveTheme = 'light' | 'dark'

const STORAGE_KEY = 'react-katas-theme'

function getSystemTheme(): EffectiveTheme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(preference: ThemePreference): EffectiveTheme {
    return preference === 'system' ? getSystemTheme() : preference
}

function applyTheme(theme: EffectiveTheme) {
    document.documentElement.dataset.theme = theme
}

function loadPreference(): ThemePreference {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
    return 'system'
}

// Apply theme immediately on module load to prevent flash
const initialPreference = loadPreference()
applyTheme(resolveTheme(initialPreference))

export function useTheme() {
    const [theme, setThemeState] = useState<ThemePreference>(initialPreference)
    const effectiveTheme = resolveTheme(theme)

    const setTheme = useCallback((next: ThemePreference) => {
        setThemeState(next)
        localStorage.setItem(STORAGE_KEY, next)
        applyTheme(resolveTheme(next))
    }, [])

    const cycleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')
    }, [theme, setTheme])

    // Listen for system preference changes when in "system" mode
    useEffect(() => {
        if (theme !== 'system') return

        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => applyTheme(getSystemTheme())
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [theme])

    return { theme, effectiveTheme, setTheme, cycleTheme }
}
