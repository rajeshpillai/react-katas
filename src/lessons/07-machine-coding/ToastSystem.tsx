import React, { useState, createContext, useContext, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

// --- Types ---
type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
    id: number
    message: string
    type: ToastType
}

interface ToastContextValue {
    addToast: (message: string, type?: ToastType, duration?: number) => void
    removeToast: (id: number) => void
}

// --- Context ---
const ToastContext = createContext<ToastContextValue | null>(null)

// --- Components ---

// 1. ToastItem: The individual notification card
const ToastItem = ({ toast, onClose }: { toast: Toast; onClose: () => void }) => {
    useEffect(() => {
        // Animation effect could go here
        return () => { }
    }, [])

    const bgColors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        warning: '#ff9800',
    }

    return (
        <div style={{
            background: bgColors[toast.type],
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '4px',
            marginTop: '10px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '250px',
            animation: 'slideIn 0.3s ease-out forwards',
            position: 'relative',
        }}>
            <span>{toast.message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    marginLeft: '15px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                ×
            </button>
            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    )
}

// 2. ToastContainer: Renders the lists of toasts (using Portal)
// We use a Portal so the stacking context is at the body level, ensuring it's always on top.
const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: number) => void }) => {
    return createPortal(
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
        }}>
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>,
        document.body
    )
}

// 3. Provider: Manages state
let idCounter = 0

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
        const id = ++idCounter
        setToasts(prev => [...prev, { id, message, type }])

        if (duration) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }
    }, [removeToast])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

// --- Hook ---
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

// --- Demo Component ---
const ToastDemo = () => {
    const { addToast } = useToast()

    return (
        <div>
            <h3>Try it out</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => addToast('Success! Operation completed.', 'success')} style={{ padding: '8px 16px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Show Success
                </button>
                <button onClick={() => addToast('Error! Something went wrong.', 'error')} style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Show Error
                </button>
                <button onClick={() => addToast('Did you know? React Portals are cool.', 'info', 5000)} style={{ padding: '8px 16px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Show Info (5s)
                </button>
                <button onClick={() => addToast('Warning! Check your input.', 'warning')} style={{ padding: '8px 16px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Show Warning
                </button>
            </div>
        </div>
    )
}

// --- Main Lesson Component ---
export default function ToastSystem() {
    return (
        <ToastProvider>
            <div>
                <h1>Toast / Notification System</h1>
                <p>
                    A modular notification system using <strong>Context</strong> for state and <strong>Portals</strong> for rendering.
                </p>
                <p>
                    This approach allows you to trigger toasts from anywhere in your component tree without worrying about layout stacking contexts (z-index issues),
                    as the toasts are rendered directly into the <code>document.body</code>.
                </p>

                <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-secondary)', margin: '20px 0' }}>
                    <ToastDemo />
                </div>

                <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                    <h3>Under the Hood: React Portal</h3>
                    <p>
                        The <code>ToastContainer</code> is rendered using <code>createPortal</code>. This logically keeps it in the React tree (so context works)
                        but physically renders it at the end of the DOM body.
                    </p>
                    <pre style={{ margin: 0 }}>{`const ToastContainer = ({ toasts }) => {
  return createPortal(
    <div className="fixed-toast-container">
      {toasts.map(t => <ToastItem key={t.id} {...t} />)}
    </div>,
    document.body // Appended to <body>
  )
}`}</pre>
                </div>
            </div>
        </ToastProvider>
    )
}
