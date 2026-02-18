import { useRef, useEffect } from 'react'
import type { PlaygroundError } from './playground-types'
import styles from './preview.module.css'

interface PreviewProps {
    iframeDoc: string
    height: number
    onError: (error: PlaygroundError) => void
    onReady: () => void
}

export function Preview({ iframeDoc, height, onError, onReady }: PreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // Listen for messages from the iframe
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (!iframeRef.current) return
            // Only accept messages from our iframe
            if (event.source !== iframeRef.current.contentWindow) return

            const data = event.data
            if (data?.type === 'PLAYGROUND_RUNTIME_ERROR') {
                onError({
                    type: 'runtime',
                    message: data.message || 'Unknown runtime error',
                    stack: data.stack,
                })
            } else if (data?.type === 'PLAYGROUND_READY') {
                onReady()
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [onError, onReady])

    return (
        <div className={styles.container} style={{ height }}>
            <iframe
                ref={iframeRef}
                srcDoc={iframeDoc}
                className={styles.iframe}
                title="Playground Preview"
            />
        </div>
    )
}
