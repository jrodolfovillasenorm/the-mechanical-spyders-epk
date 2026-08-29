import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

interface AccessContextValue {
    hasAccess: boolean
    unlock: (code: string) => boolean
}

const AccessContext = createContext<AccessContextValue | null>(null)

const STORAGE_KEY = 'spyder-access'

// Por ahora podemos usar un único código.
// Más adelante podemos cambiar esto por varios tokens.
const SPYDER_CODE = 'SPYDER-001'

export function AccessProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
        const access = localStorage.getItem(STORAGE_KEY)

        if (access === 'granted') {
            setHasAccess(true)
        }
    }, [])

    const unlock = (code: string) => {
        const valid = code.trim().toUpperCase() === SPYDER_CODE

        if (valid) {
            localStorage.setItem(STORAGE_KEY, 'granted')
            setHasAccess(true)
        }

        return valid
    }

    return (
        <AccessContext.Provider
            value={{
                hasAccess,
                unlock,
            }}
        >
            {children}
        </AccessContext.Provider>
    )
}

export function useAccess() {
    const context = useContext(AccessContext)

    if (!context) {
        throw new Error(
            'useAccess must be used inside AccessProvider'
        )
    }

    return context
}