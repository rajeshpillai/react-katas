import { Link } from '@router/router'
import { useTheme } from '@hooks/use-theme'
import styles from './site-header.module.css'

const REPO_URL = 'https://github.com/rajeshpillai/react-katas'

const THEME_ICONS = { light: '☀', dark: '☽', system: '◑' } as const
const THEME_LABELS = { light: 'Light', dark: 'Dark', system: 'System' } as const

export function SiteHeader() {
    const { theme, cycleTheme } = useTheme()

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.brand}>
                <span className={styles['brand-mark']}>R</span>
                <span className={styles['brand-text']}>React Katas</span>
            </Link>

            <nav className={styles.nav}>
                <Link to="/" className={styles['nav-link']}>Home</Link>
                <button
                    type="button"
                    onClick={cycleTheme}
                    className={styles['theme-toggle']}
                    title={`Theme: ${THEME_LABELS[theme]} (click to cycle)`}
                    aria-label={`Switch theme (currently ${THEME_LABELS[theme]})`}
                >
                    <span className={styles['theme-icon']} aria-hidden="true">{THEME_ICONS[theme]}</span>
                    <span className={styles['theme-text']}>{THEME_LABELS[theme]}</span>
                </button>
                <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles['github-link']}
                    aria-label="Star this project on GitHub"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.93 10.93 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.65 18.85.5 12 .5Z" />
                    </svg>
                    <span className={styles['github-text']}>Star on GitHub</span>
                </a>
            </nav>
        </header>
    )
}
