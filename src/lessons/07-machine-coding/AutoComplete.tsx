import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useDebounce } from '@hooks/use-debounce'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './AutoComplete.tsx?raw'

// --- Mock Data & API ---
const FRUITS = [
    'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry',
    'Cherry', 'Coconut', 'Cranberry', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry', 'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew',
    'Jackfruit', 'Kiwi', 'Lemon', 'Lime', 'Lychee', 'Mango',
    'Melon', 'Nectarine', 'Orange', 'Papaya', 'Passion Fruit', 'Peach',
    'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Strawberry',
    'Tangerine', 'Watermelon'
]

function fakeApi(query: string): Promise<string[]> {
    return new Promise((resolve) => {
        // Random delay between 200ms and 800ms to simulate network unpredictability
        const delay = Math.random() * 600 + 200
        setTimeout(() => {
            const results = FRUITS.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            )
            resolve(results)
        }, delay)
    })
}

// --- Playground Config ---
export const playgroundConfig: PlaygroundConfig = {
    files: [
        {
            name: 'App.tsx',
            language: 'tsx',
            code: `import { useState, useEffect, useRef } from 'react'

const FRUITS = [
    'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry',
    'Cherry', 'Coconut', 'Cranberry', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry', 'Fig', 'Grape', 'Grapefruit', 'Guava', 'Honeydew',
    'Jackfruit', 'Kiwi', 'Lemon', 'Lime', 'Lychee', 'Mango',
    'Melon', 'Nectarine', 'Orange', 'Papaya', 'Passion Fruit', 'Peach',
    'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Strawberry',
    'Tangerine', 'Watermelon',
]

function fakeApi(query: string): Promise<string[]> {
    return new Promise((resolve) => {
        const delay = Math.random() * 600 + 200
        setTimeout(() => {
            const results = FRUITS.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            )
            resolve(results)
        }, delay)
    })
}

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])
    return debouncedValue
}

export default function App() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const cache = useRef<Record<string, string[]>>({})

    const debouncedQuery = useDebounce(query, 400)

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([])
            return
        }

        if (cache.current[debouncedQuery]) {
            setSuggestions(cache.current[debouncedQuery])
            return
        }

        let isFresh = true
        setLoading(true)

        fakeApi(debouncedQuery)
            .then(results => {
                if (!isFresh) return
                cache.current[debouncedQuery] = results
                setSuggestions(results)
            })
            .finally(() => {
                if (isFresh) setLoading(false)
            })

        return () => { isFresh = false }
    }, [debouncedQuery])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                setQuery(suggestions[selectedIndex])
                setSuggestions([])
                setSelectedIndex(-1)
            }
        } else if (e.key === 'Escape') {
            setSuggestions([])
        }
    }

    const handleSelect = (value: string) => {
        setQuery(value)
        setSuggestions([])
        setSelectedIndex(-1)
    }

    return (
        <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
            <h2>Autocomplete / Typeahead</h2>
            <p style={{ color: '#666', marginBottom: 16 }}>
                Search for a fruit. Uses debouncing, caching, and keyboard navigation.
            </p>
            <div style={{ maxWidth: 360, position: 'relative' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1) }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a fruit name..."
                    style={{
                        width: '100%',
                        padding: 10,
                        fontSize: 16,
                        borderRadius: 4,
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                    }}
                />
                {loading && (
                    <div style={{ position: 'absolute', right: 10, top: 12, fontSize: 12, color: '#888' }}>
                        Loading...
                    </div>
                )}
                {suggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        maxHeight: 200,
                        overflowY: 'auto',
                        zIndex: 10,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}>
                        {suggestions.map((item, index) => (
                            <li
                                key={item}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                style={{
                                    padding: 10,
                                    cursor: 'pointer',
                                    background: index === selectedIndex ? '#e3f2fd' : 'white',
                                    borderBottom: '1px solid #eee',
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
`,
        },
    ],
    entryFile: 'App.tsx',
    height: 400,
}

// --- Components ---
export default function AutoComplete() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    // We use a debounce hook to prevent API calls on every keystroke
    const debouncedQuery = useDebounce(query, 500)

    // Cache to store results: { [query]: results[] }
    const cache = useRef<{ [key: string]: string[] }>({})

    useEffect(() => {
        // If query is empty, clear results and return
        if (!debouncedQuery.trim()) {
            setSuggestions([])
            return
        }

        // Check cache first
        if (cache.current[debouncedQuery]) {
            setSuggestions(cache.current[debouncedQuery])
            return
        }

        let isFresh = true
        setLoading(true)
        setError(null)

        fakeApi(debouncedQuery)
            .then(results => {
                // If the component unmounted or query changed, ignore this result (Race Condition check)
                if (!isFresh) return

                // Update cache
                cache.current[debouncedQuery] = results
                setSuggestions(results)
            })
            .catch(() => {
                if (isFresh) setError('Failed to fetch suggestions')
            })
            .finally(() => {
                if (isFresh) setLoading(false)
            })

        return () => {
            isFresh = false
        }
    }, [debouncedQuery])

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                setQuery(suggestions[selectedIndex])
                setSuggestions([])
            }
        } else if (e.key === 'Escape') {
            setSuggestions([])
        }
    }

    const handleSelect = (value: string) => {
        setQuery(value)
        setSuggestions([])
        setSelectedIndex(-1)
    }

    return (
        <LessonLayout title="Auto-complete / Typeahead" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
            <p>
                A search input that handles <strong>debouncing</strong>, <strong>caching</strong>,
                <strong> race conditions</strong>, and <strong>keyboard navigation</strong>.
            </p>

            <div style={{ maxWidth: 400, marginTop: 20, position: 'relative' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a fruit (e.g., Apple)"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)'
                    }}
                />

                {loading && (
                    <div style={{ position: 'absolute', right: 10, top: 12, fontSize: '12px', color: '#888' }}>
                        Loading...
                    </div>
                )}

                {error && (
                    <div style={{ position: 'absolute', right: 10, top: 12, fontSize: '12px', color: 'red' }}>
                        Error
                    </div>
                )}

                {suggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        maxHeight: 200,
                        overflowY: 'auto',
                        zIndex: 10,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {suggestions.map((item, index) => (
                            <li
                                key={item}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: index === selectedIndex ? 'var(--bg-tertiary)' : 'transparent',
                                    borderBottom: '1px solid var(--border-color)'
                                }}
                            >
                                {/* Highlight match logic could go here */}
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ marginTop: 40, padding: 20, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
                <h3>Under the Hood: Race Condition Handling</h3>
                <p>When multiple unique requests are firing, we ensure we only apply the result of the <em>latest</em> one.</p>
                <pre style={{ margin: 0 }}>{`useEffect(() => {
  let isFresh = true; // Flag for this specific effect run

  fakeApi(debouncedQuery).then(results => {
    // If effect cleanup ran (due to new query), isFresh is false
    if (!isFresh) return;
    setSuggestions(results);
  });

  return () => { isFresh = false; }; // Cleanup invalidates this run
}, [debouncedQuery]);`}</pre>
            </div>
        </LessonLayout>
    )
}
