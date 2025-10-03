import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface SessionContextType {
    session: Session | null
    loading: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const useSession = () => {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error('useSession must be used within an SessionProvider')
    }
    return context
}

interface SessionProviderProps {
    children: React.ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        // Listen for auth changes
        const {data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session);
            } else {
                setSession(null);
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    return <SessionContext.Provider value={{session, loading}}>{children}</SessionContext.Provider>
} 