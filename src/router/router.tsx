import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Types for our router
export interface RouteParams {
    [key: string]: string
}

export interface RouterContextValue {
    currentPath: string
    params: RouteParams
    navigate: (path: string) => void
}

// Create the router context
const RouterContext = createContext<RouterContextValue | null>(null)

// Custom hook to access router
export function useRouter(): RouterContextValue {
    const context = useContext(RouterContext)
    if (!context) {
        throw new Error('useRouter must be used within a RouterProvider')
    }
    return context
}

interface RouterProviderProps {
    children: ReactNode
}

// Hash-based routing. The app is a static SPA served from a project sub-path
// on GitHub Pages (rajeshpillai.github.io/react-katas/), where the server has
// no SPA fallback and no knowledge of client routes. Keeping the whole route
// (path + query) in the URL fragment means deep links and refreshes always
// resolve to the same index.html while `currentPath` stays a clean, base-free
// "/lessons/x?tier=y" that getLessonByPath and the tier logic already expect.
function readHashPath(): string {
    // location.hash is like "#/lessons/x?tier=y"; strip the leading '#'.
    // Empty hash (bare "/" visit) resolves to the home route.
    return window.location.hash.slice(1) || '/'
}

// Router provider component
export function RouterProvider({ children }: RouterProviderProps) {
    const [currentPath, setCurrentPath] = useState(readHashPath)
    const [params] = useState<RouteParams>({})

    useEffect(() => {
        // hashchange covers both navigate() and browser back/forward.
        const handleHashChange = () => {
            setCurrentPath(readHashPath())
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    const navigate = (path: string) => {
        // Assigning the hash pushes a history entry and fires hashchange, which
        // updates currentPath. Set it directly too so the UI reacts synchronously
        // (and no-ops safely when navigating to the current path).
        window.location.hash = path
        setCurrentPath(path)
        window.scrollTo(0, 0)
    }

    const value: RouterContextValue = {
        currentPath,
        params,
        navigate,
    }

    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

// Link component for navigation
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string
    activeClassName?: string
}

export function Link({ to, children, className = '', activeClassName = '', ...props }: LinkProps) {
    const { currentPath, navigate } = useRouter()
    const currentPathname = currentPath.split('?')[0]
    const targetPathname = to.split('?')[0]
    const isActive = currentPathname === targetPathname

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        navigate(to)
        props.onClick?.(e)
    }

    const finalClassName = `${className} ${isActive ? activeClassName : ''}`.trim()

    return (
        <a href={`#${to}`} onClick={handleClick} className={finalClassName} {...props}>
            {children}
        </a>
    )
}
