import React, { useState, DragEvent } from 'react'
// @ts-ignore
import sourceCode from './DragAndDrop.tsx?raw'

// --- Types ---
type Status = 'todo' | 'doing' | 'done'

interface Task {
    id: string
    content: string
    status: Status
}

// --- Initial Data ---
const INITIAL_TASKS: Task[] = [
    { id: '1', content: 'Plan the UI', status: 'done' },
    { id: '2', content: 'Set up Vite project', status: 'done' },
    { id: '3', content: 'Implement Drag & Drop', status: 'doing' },
    { id: '4', content: 'Write documentation', status: 'todo' },
    { id: '5', content: 'Fix bugs', status: 'todo' },
]

// --- Components ---

export default function DragAndDrop() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
    const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    // --- DnD Handlers ---

    // 1. Started dragging a card
    const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
        setDraggedTaskId(taskId)
        // Required for Firefox
        e.dataTransfer.setData('text/plain', taskId)
        e.dataTransfer.effectAllowed = 'move'
    }

    // 2. Dragging over a drop zone (column)
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        // Essential: Prevent default to allow dropping
        e.preventDefault()
    }

    // 3. Dropped into a column
    const handleDrop = (e: DragEvent<HTMLDivElement>, targetStatus: Status) => {
        e.preventDefault()

        if (draggedTaskId) {
            setTasks(prev => prev.map(t =>
                t.id === draggedTaskId ? { ...t, status: targetStatus } : t
            ))
            setDraggedTaskId(null)
        }
    }

    // Filter tasks for each column
    const todoTasks = tasks.filter(t => t.status === 'todo')
    const doingTasks = tasks.filter(t => t.status === 'doing')
    const doneTasks = tasks.filter(t => t.status === 'done')

    return (
        <div>
            <h1>Drag & Drop (Kanban Board)</h1>
            <p>
                A Kanban board implemented using the <strong>Native HTML5 Drag and Drop API</strong>.
                Drag cards between columns to update their status.
            </p>

            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
                <button onClick={() => setActiveTab('demo')} style={getTabStyle(activeTab === 'demo')}>Implementation</button>
                <button onClick={() => setActiveTab('code')} style={getTabStyle(activeTab === 'code')}>Source Code</button>
            </div>

            {activeTab === 'demo' ? (
                <>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        paddingBottom: '20px'
                    }}>
                        <Column
                            title="To Do"
                            status="todo"
                            tasks={todoTasks}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragStart={handleDragStart}
                        />
                        <Column
                            title="In Progress"
                            status="doing"
                            tasks={doingTasks}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragStart={handleDragStart}
                        />
                        <Column
                            title="Done"
                            status="done"
                            tasks={doneTasks}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragStart={handleDragStart}
                        />
                    </div>

                    <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                        <h3>Under the Hood: HTML5 DnD</h3>
                        <p>The native API requires 3 key events:</p>
                        <ul style={{ paddingLeft: 20 }}>
                            <li><code>draggable="true"</code> + <code>onDragStart</code> on the Item.</li>
                            <li><code>onDragOver</code>: Must call <code>e.preventDefault()</code> to allow dropping.</li>
                            <li><code>onDrop</code>: Where state update happens.</li>
                        </ul>
                    </div>
                </>
            ) : (
                <pre style={{ padding: 20, background: 'var(--bg-secondary)', borderRadius: 8, overflow: 'auto', fontSize: 14 }}>
                    <code>{sourceCode}</code>
                </pre>
            )}
        </div>
    )
}

// --- Sub-Components ---

interface ColumnProps {
    title: string
    status: Status
    tasks: Task[]
    onDragOver: (e: DragEvent<HTMLDivElement>) => void
    onDrop: (e: DragEvent<HTMLDivElement>, status: Status) => void
    onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
}

const Column = ({ title, status, tasks, onDragOver, onDrop, onDragStart }: ColumnProps) => {
    return (
        <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            style={{
                flex: 1,
                minWidth: 250,
                background: 'var(--bg-secondary)',
                borderRadius: 8,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}
        >
            <h3 style={{
                margin: 0,
                paddingBottom: 10,
                borderBottom: '1px solid var(--border-color)',
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: 'var(--text-secondary)'
            }}>
                {title} <span style={{ fontSize: 12, opacity: 0.7 }}>({tasks.length})</span>
            </h3>

            <div style={{ flex: 1, minHeight: 100 }}>
                {tasks.map(task => (
                    <Card key={task.id} task={task} onDragStart={onDragStart} />
                ))}
                {tasks.length === 0 && (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-tertiary)',
                        fontSize: 14,
                        fontStyle: 'italic'
                    }}>
                        Drop here
                    </div>
                )}
            </div>
        </div>
    )
}

const Card = ({ task, onDragStart }: { task: Task, onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void }) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            style={{
                background: 'var(--bg-primary)',
                padding: '12px',
                borderRadius: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'grab',
                border: '1px solid var(--border-color)'
            }}
        >
            {task.content}
        </div>
    )
}

// Helper for tab styles
function getTabStyle(isActive: boolean): React.CSSProperties {
    return {
        padding: '10px 20px',
        background: 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--color-primary-500)' : '2px solid transparent',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal',
        color: 'var(--text-primary)'
    }
}
