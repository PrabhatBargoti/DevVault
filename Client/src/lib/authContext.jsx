import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import RouteLoadingSkeleton from '../components/RouteLoadingSkeleton'
import { isSupabaseConfigured, supabase } from './supabaseClient'
import { clearSnippets } from './snippetStore'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    let isActive = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isActive) {
        setSession(nextSession)
        if (!nextSession) clearSnippets()
        setError('')
        setLoading(false)
      }
    })

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!isActive) return
      if (sessionError) {
        setError(sessionError.message)
      } else {
        setSession(data.session)
        if (!data.session) clearSnippets()
      }
      setLoading(false)
    }).catch((sessionError) => {
      if (!isActive) return
      setError(sessionError.message || 'Could not restore your sign-in session.')
      setLoading(false)
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      session,
      user: session?.user || null,
      loading,
      error,
      configured: isSupabaseConfigured,
      signOut: async () => {
        if (!supabase) throw new Error('Supabase authentication is not configured.')
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) throw signOutError
      },
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider.')
  return context
}

export const RequireAuth = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <RouteLoadingSkeleton />
  if (!user) return <Navigate to="/Login" replace state={{ from: location }} />
  return <Outlet />
}
