import { useReducer, useState } from 'react'
import { LessonLayout } from '@components/lesson-layout'
import type { PlaygroundConfig } from '@components/playground'
// @ts-ignore
import sourceCode from './UseReducer.tsx?raw'

export const playgroundConfig: PlaygroundConfig = {
  files: [
    {
      name: 'App.tsx',
      language: 'tsx',
      code: `import { useReducer, useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [input, setInput] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', text: input })
      setInput('')
    }
  }

  const completed = todos.filter(t => t.completed).length

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>Todo List with useReducer</h2>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: 8, fontSize: 14, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Add
        </button>
      </form>

      {todos.length > 0 && (
        <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
          {completed}/{todos.length} completed
        </p>
      )}

      {todos.length === 0 ? (
        <p style={{ color: '#999' }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 8,
                background: '#f9fafb',
                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                style={{ marginRight: 8 }}
              />
              <span style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#9ca3af' : '#111',
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                style={{
                  padding: '4px 8px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
`,
    },
  ],
  entryFile: 'App.tsx',
  height: 450,
}

export default function UseReducer() {
  return (
    <LessonLayout title="useReducer Hook" playgroundConfig={playgroundConfig} sourceCode={sourceCode}>
      <p>
        <code>useReducer</code> is an alternative to <code>useState</code> for managing complex
        state logic. It's especially useful when state updates depend on previous state or when you
        have multiple sub-values.
      </p>

      {/* Section 1: What is useReducer? */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>What is useReducer?</h2>
        <p>
          <code>useReducer</code> accepts a reducer function and initial state, returning the
          current state and a dispatch function.
        </p>

        <pre>
          <code>{`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Dispatch an action
dispatch({ type: 'INCREMENT' });`}</code>
        </pre>

        <div
          style={{
            background: 'var(--color-info)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>When to Use useReducer:</p>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Complex state logic with multiple sub-values
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Next state depends on previous state
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Want to centralize state update logic
            </li>
            <li style={{ color: 'white' }}>Need to optimize performance with deep updates</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Simple Counter */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 1: Simple Counter</h2>
        <p>A basic example showing the reducer pattern.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Counter with useReducer:</h3>
          <CounterReducer />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

interface State {
  count: number;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </>
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 3: Form State */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 2: Form State Management</h2>
        <p>Managing multiple form fields with a single reducer.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>User Form:</h3>
          <FormReducer />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`type Action =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'RESET' };

interface FormState {
  name: string;
  email: string;
  message: string;
}

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return { name: '', email: '', message: '' };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    message: '',
  });

  return (
    <input
      value={state.name}
      onChange={(e) => dispatch({
        type: 'SET_FIELD',
        field: 'name',
        value: e.target.value
      })}
    />
  );
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Todo List */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Example 3: Todo List</h2>
        <p>Complex state with arrays - adding, removing, and toggling items.</p>

        <div
          style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3>Todo App:</h3>
          <TodoReducer />

          <pre style={{ marginTop: 'var(--space-4)' }}>
            <code>{`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.text,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: useReducer vs useState */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>useReducer vs useState</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-4)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-primary-100)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3 style={{ color: 'var(--color-primary-700)' }}>useState</h3>
            <p style={{ marginBottom: 'var(--space-3)' }}>Best for:</p>
            <ul>
              <li>Simple state (strings, numbers, booleans)</li>
              <li>Independent state updates</li>
              <li>State that doesn't depend on previous state</li>
              <li>Quick prototyping</li>
            </ul>
            <pre style={{ marginTop: 'var(--space-3)' }}>
              <code>{`const [count, setCount] = useState(0);
setCount(count + 1);`}</code>
            </pre>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              background: 'var(--color-accent-100)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h3 style={{ color: 'var(--color-accent-700)' }}>useReducer</h3>
            <p style={{ marginBottom: 'var(--space-3)' }}>Best for:</p>
            <ul>
              <li>Complex state objects</li>
              <li>Multiple sub-values</li>
              <li>State transitions with logic</li>
              <li>Centralized state updates</li>
            </ul>
            <pre style={{ marginTop: 'var(--space-3)' }}>
              <code>{`const [state, dispatch] = useReducer(reducer, init);
dispatch({ type: 'INCREMENT' });`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Section 6: Best Practices */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h2>Best Practices</h2>

        <div
          style={{
            background: 'var(--color-success)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Do's</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use TypeScript to type actions and state
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Keep reducers pure (no side effects)
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Use action types as constants
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Return new state objects (don't mutate)
            </li>
            <li style={{ color: 'white' }}>Handle default case in switch</li>
          </ul>
        </div>

        <div
          style={{
            background: 'var(--color-error)',
            color: 'white',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-4)',
          }}
        >
          <h3 style={{ color: 'white', marginBottom: 'var(--space-3)' }}>Don'ts</h3>
          <ul style={{ paddingLeft: 'var(--space-6)' }}>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't mutate state directly
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't perform side effects in reducers
            </li>
            <li style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
              Don't use for simple state (overkill)
            </li>
            <li style={{ color: 'white' }}>Don't forget the default case</li>
          </ul>
        </div>
      </section>

      {/* Key Takeaways */}
      <section>
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            <code>useReducer</code> is great for complex state logic
          </li>
          <li>Reducers are pure functions that take state and action, return new state</li>
          <li>Actions describe what happened, reducers describe how state changes</li>
          <li>
            Use <code>useState</code> for simple state, <code>useReducer</code> for complex state
          </li>
          <li>Reducers make state updates predictable and testable</li>
          <li>TypeScript makes reducers safer with action type checking</li>
        </ul>
      </section>
    </LessonLayout>
  )
}

// Example implementations

// Counter with useReducer
type CounterAction = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' }

interface CounterState {
  count: number
}

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      return state
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'bold',
          color: 'var(--color-primary-600)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
        }}
      >
        {state.count}
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-success)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-error)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            padding: 'var(--space-2) var(--space-4)',
            background: 'var(--color-gray-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

// Form with useReducer
type FormAction = { type: 'SET_FIELD'; field: string; value: string } | { type: 'RESET' }

interface FormState {
  name: string
  email: string
  message: string
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return { name: '', email: '', message: '' }
    default:
      return state
  }
}

function FormReducer() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      dispatch({ type: 'RESET' })
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={state.name}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-base)',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--space-3)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-base)',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 'bold' }}>
            Message:
          </label>
          <textarea
            value={state.message}
            onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-base)',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            marginRight: 'var(--space-2)',
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-gray-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-4)',
            background: 'var(--color-success)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p style={{ color: 'white', fontWeight: 'bold' }}>Form submitted!</p>
          <p style={{ color: 'white' }}>Name: {state.name}</p>
          <p style={{ color: 'white' }}>Email: {state.email}</p>
        </div>
      )}
    </div>
  )
}

// Todo with useReducer
interface Todo {
  id: number
  text: string
  completed: boolean
}

type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}

function TodoReducer() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [input, setInput] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', text: input })
      setInput('')
    }
  }

  return (
    <div>
      <form onSubmit={handleAdd} style={{ marginBottom: 'var(--space-4)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          style={{
            padding: 'var(--space-3)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--font-size-base)',
            marginRight: 'var(--space-2)',
            width: '300px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-primary-500)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)' }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--space-3)',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-2)',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                style={{ marginRight: 'var(--space-3)' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'var(--text-tertiary)' : 'var(--text-primary)',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--color-error)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
