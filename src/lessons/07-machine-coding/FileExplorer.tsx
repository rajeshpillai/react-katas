import React, { useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './FileExplorer.tsx?raw'

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
                    {node.isFolder ? (isOpen ? '\u{1F4C2}' : '\u{1F4C1}') : '\u{1F4C4}'}
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

// --- Playground Config ---
export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

interface FileNode {
    id: string
    name: string
    isFolder: boolean
    items: FileNode[]
}

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
                        { id: '10', name: 'Footer.tsx', isFolder: false, items: [] },
                    ],
                },
                {
                    id: '11',
                    name: 'hooks',
                    isFolder: true,
                    items: [
                        { id: '12', name: 'useAuth.ts', isFolder: false, items: [] },
                    ],
                },
                { id: '5', name: 'App.tsx', isFolder: false, items: [] },
                { id: '6', name: 'index.tsx', isFolder: false, items: [] },
                { id: '7', name: 'styles.css', isFolder: false, items: [] },
            ],
        },
        {
            id: '13',
            name: 'public',
            isFolder: true,
            items: [
                { id: '14', name: 'index.html', isFolder: false, items: [] },
                { id: '15', name: 'favicon.ico', isFolder: false, items: [] },
            ],
        },
        { id: '8', name: 'package.json', isFolder: false, items: [] },
        { id: '9', name: 'tsconfig.json', isFolder: false, items: [] },
        { id: '16', name: 'README.md', isFolder: false, items: [] },
    ],
}

function TreeItem({ node, depth = 0, selectedId, onSelect }: {
    node: FileNode
    depth?: number
    selectedId: string | null
    onSelect: (id: string) => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (node.isFolder) {
            setIsOpen(!isOpen)
        } else {
            onSelect(node.id)
        }
    }

    const isSelected = node.id === selectedId && !node.isFolder

    return (
        <div style={{ paddingLeft: depth === 0 ? 0 : 16 }}>
            <div
                onClick={handleClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
                    userSelect: 'none',
                }}
            >
                <span style={{ marginRight: 6, fontSize: '1.1em' }}>
                    {node.isFolder ? (isOpen ? '\\u{1F4C2}' : '\\u{1F4C1}') : '\\u{1F4C4}'}
                </span>
                <span style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {node.name}
                </span>
            </div>
            {isOpen && node.items.length > 0 && (
                <div>
                    {node.items.map((child) => (
                        <TreeItem
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function App() {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const findNode = (node: FileNode, id: string): FileNode | null => {
        if (node.id === id) return node
        for (const child of node.items) {
            const found = findNode(child, id)
            if (found) return found
        }
        return null
    }

    const selectedNode = selectedId ? findNode(INITIAL_DATA, selectedId) : null

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>File Explorer</h2>
            <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                    width: 260,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: 10,
                    background: '#fafafa',
                    minHeight: 300,
                }}>
                    {INITIAL_DATA.items.map((item) => (
                        <TreeItem
                            key={item.id}
                            node={item}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                        />
                    ))}
                </div>
                <div style={{
                    flex: 1,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    padding: 16,
                    background: '#fafafa',
                    minHeight: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                }}>
                    {selectedNode
                        ? <div><strong>Selected:</strong> {selectedNode.name}</div>
                        : <div>Click a file to select it</div>
                    }
                </div>
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

export default function FileExplorer() {
    const [data] = useState<FileNode>(INITIAL_DATA)

    return (
        <LessonLayout title="File Explorer (Recursive)" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                This component demonstrates recursive rendering of a tree structure.
                It's a common interview question to test knowledge of recursion and state management.
            </p>

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
        </LessonLayout>
    )
}
