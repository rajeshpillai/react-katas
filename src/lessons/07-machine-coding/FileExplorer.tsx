import React, { useState } from 'react'

// --- Types ---
interface FileNode {
    id: string
    name: string
    isFolder: boolean
    items: FileNode[]
}

// --- Initial Data ---
const INITIAL_DATA: FileNode = {
    id: 'root',
    name: 'root',
    isFolder: true,
    items: [
        {
            id: '1',
            name: 'src',
            isFolder: true,
            items: [
                {
                    id: '2',
                    name: 'components',
                    isFolder: true,
                    items: [
                        { id: '3', name: 'Button.tsx', isFolder: false, items: [] },
                        { id: '4', name: 'Header.tsx', isFolder: false, items: [] },
                    ]
                },
                { id: '5', name: 'App.tsx', isFolder: false, items: [] },
                { id: '6', name: 'index.tsx', isFolder: false, items: [] },
                { id: '7', name: 'styles.css', isFolder: false, items: [] },
            ]
        },
        {
            id: '8',
            name: 'package.json',
            isFolder: false,
            items: []
        },
        {
            id: '9',
            name: 'tsconfig.json',
            isFolder: false,
            items: []
        },
    ]
}

// --- Components ---

interface TreeItemProps {
    node: FileNode
    depth?: number
}

const TreeItem = ({ node, depth = 0 }: TreeItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (node.isFolder) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <div style={{ paddingLeft: depth === 0 ? 0 : 15 }}>
            <div
                onClick={handleToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                }}
            >
                <span style={{ marginRight: 5, fontSize: '1.2em' }}>
                    {node.isFolder ? (isOpen ? '📂' : '📁') : '📄'}
                </span>
                <span>{node.name}</span>
            </div>

            {isOpen && node.items.length > 0 && (
                <div>
                    {node.items.map((child) => (
                        <TreeItem key={child.id} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

// @ts-ignore
import sourceCode from './FileExplorer.tsx?raw'

export default function FileExplorer() {
    const [data] = useState<FileNode>(INITIAL_DATA)
    const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo')

    return (
        <div>
            <h1>File Explorer (Recursive)</h1>
            <p>
                This component demonstrates recursive rendering of a tree structure.
                It's a common interview question to test knowledge of recursion and state management.
            </p>

            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
                <button
                    onClick={() => setActiveTab('demo')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'demo' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === 'demo' ? 'bold' : 'normal'
                    }}
                >
                    Implementation
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    style={{
                        padding: '10px 20px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'code' ? '2px solid var(--color-primary-500)' : '2px solid transparent',
                        cursor: 'pointer',
                        fontWeight: activeTab === 'code' ? 'bold' : 'normal'
                    }}
                >
                    Source Code
                </button>
            </div>

            {activeTab === 'demo' ? (
                <>
                    <div style={{
                        marginTop: 20,
                        width: 300,
                        border: '1px solid var(--border-color)',
                        borderRadius: 8,
                        padding: 10,
                        background: 'var(--bg-secondary)',
                        minHeight: 400
                    }}>
                        {/* We map the root items directly to simulate the top-level folder view */}
                        {data.items.map(item => (
                            <TreeItem key={item.id} node={item} />
                        ))}
                    </div>

                    <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                        <h3>Under the Hood: Recursive Component</h3>
                        <p>The key to this problem is a component that renders itself:</p>
                        <div style={{ overflowX: 'auto' }}>
                            <pre style={{ margin: 0 }}>{`const TreeItem = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {node.name}
      </div>
      
      {/* Recursion happens here */}
      {isOpen && node.items.map(child => (
        <TreeItem key={child.id} node={child} />
      ))}
    </div>
  )
}`}</pre>
                        </div>
                    </div>
                </>
            ) : (
                <pre style={{
                    padding: 20,
                    background: 'var(--bg-secondary)',
                    borderRadius: 8,
                    overflow: 'auto',
                    fontSize: 14
                }}>
                    <code>{sourceCode}</code>
                </pre>
            )}
        </div>
    )
}
