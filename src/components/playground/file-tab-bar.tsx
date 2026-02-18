import styles from './file-tab-bar.module.css'

interface FileTabBarProps {
    files: string[]
    activeFile: string
    onSelectFile: (fileName: string) => void
    onReset: () => void
}

const LANG_LABELS: Record<string, string> = {
    tsx: 'TSX',
    ts: 'TS',
    css: 'CSS',
    jsx: 'JSX',
    js: 'JS',
}

function getExtLabel(fileName: string): string {
    const ext = fileName.split('.').pop() || ''
    return LANG_LABELS[ext] || ext.toUpperCase()
}

export function FileTabBar({ files, activeFile, onSelectFile, onReset }: FileTabBarProps) {
    return (
        <div className={styles.bar}>
            <div className={styles.tabs}>
                {files.map((name) => (
                    <button
                        key={name}
                        className={`${styles.tab} ${name === activeFile ? styles.active : ''}`}
                        onClick={() => onSelectFile(name)}
                    >
                        <span className={styles.ext}>{getExtLabel(name)}</span>
                        {name}
                    </button>
                ))}
            </div>
            <button className={styles.reset} onClick={onReset} title="Reset all files to original">
                Reset
            </button>
        </div>
    )
}
