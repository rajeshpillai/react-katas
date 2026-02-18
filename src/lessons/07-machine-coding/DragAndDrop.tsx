import { useState, DragEvent } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
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

// --- Playground Config ---
export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

type Status = 'todo' | 'doing' | 'done'

interface Task {
    id: string
    content: string
    status: Status
}

const INITIAL_TASKS: Task[] = [
    { id: '1', content: 'Plan the UI', status: 'done' },
    { id: '2', content: 'Set up Vite project', status: 'done' },
    { id: '3', content: 'Implement Drag & Drop', status: 'doing' },
    { id: '4', content: 'Write documentation', status: 'todo' },
    { id: '5', content: 'Fix bugs', status: 'todo' },
    { id: '6', content: 'Add unit tests', status: 'todo' },
]

function Card({ task, onDragStart }: {
    task: Task
    onDragStart: (e: React.DragEvent, id: string) => void
}) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            style={{
                background: 'white',
                padding: 12,
                borderRadius: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                cursor: 'grab',
                border: '1px solid #e0e0e0',
                marginBottom: 8,
            }}
        >
            {task.content}
        </div>
    )
}

function Column({ title, status, tasks, onDragOver, onDrop, onDragStart }: {
    title: string
    status: Status
    tasks: Task[]
    onDragOver: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent, status: Status) => void
    onDragStart: (e: React.DragEvent, id: string) => void
}) {
    return (
        <div
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
            style={{
                flex: 1,
                minWidth: 180,
                background: '#f5f5f5',
                borderRadius: 8,
                padding: 12,
                display: 'flex',
                flexDirection: 'column' as const,
            }}
        >
            <h3 style={{
                margin: 0,
                paddingBottom: 8,
                borderBottom: '2px solid #ddd',
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#666',
                marginBottom: 10,
            }}>
                {title} ({tasks.length})
            </h3>
            <div style={{ flex: 1, minHeight: 80 }}>
                {tasks.map(task => (
                    <Card key={task.id} task={task} onDragStart={onDragStart} />
                ))}
                {tasks.length === 0 && (
                    <div style={{
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#aaa',
                        fontSize: 14,
                        fontStyle: 'italic',
                        border: '2px dashed #ddd',
                        borderRadius: 4,
                    }}>
                        Drop here
                    </div>
                )}
            </div>
        </div>
    )
}

export default function App() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
    const [draggedId, setDraggedId] = useState<string | null>(null)

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        setDraggedId(taskId)
        e.dataTransfer.setData('text/plain', taskId)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent, targetStatus: Status) => {
        e.preventDefault()
        if (draggedId) {
            setTasks(prev => prev.map(t =>
                t.id === draggedId ? { ...t, status: targetStatus } : t
            ))
            setDraggedId(null)
        }
    }

    const columns: { title: string; status: Status }[] = [
        { title: 'To Do', status: 'todo' },
        { title: 'In Progress', status: 'doing' },
        { title: 'Done', status: 'done' },
    ]

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Kanban Board</h2>
            <p style={{ color: '#666', marginBottom: 16 }}>
                Drag cards between columns to change their status.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
                {columns.map(col => (
                    <Column
                        key={col.status}
                        title={col.title}
                        status={col.status}
                        tasks={tasks.filter(t => t.status === col.status)}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragStart={handleDragStart}
                    />
                ))}
            </div>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 450,
}

// --- Main Component ---
export default function DragAndDrop() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
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
        <LessonLayout title="Drag & Drop (Kanban Board)" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                A Kanban board implemented using the <strong>Native HTML5 Drag and Drop API</strong>.
                Drag cards between columns to update their status.
            </p>

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
        </LessonLayout>
    )
}
