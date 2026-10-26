import { useEffect, useState } from 'react'
import { AuthContext } from './authState'
import { isSupabaseConfigured, supabase } from './supabaseClient'
import { clearSnippets } from './snippetStore'

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

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
