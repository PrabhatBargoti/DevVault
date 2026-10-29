import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient'

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const checkSession = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (isMounted) setIsReady(true)
        return
      }

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (!isMounted) return

        if (sessionError) {
          setError(sessionError.message)
          setIsReady(true)
          return
        }

        if (!session) {
          setError('Open the reset link from your email or sign in before changing your password.')
          setIsReady(true)
          return
        }

        setIsAuthenticated(true)
      } catch (sessionFailure) {
        if (isMounted) {
          setError(sessionFailure.message || 'Your session could not be restored.')
        }
      } finally {
        if (isMounted) setIsReady(true)
      }
    }

    checkSession()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('')

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase authentication is not configured. Add your project URL and publishable key before updating your password.')
      return
    }

    if (!isAuthenticated) {
      setError('You need to open the reset link from your email or sign in before changing your password.')
      return
    }

    const trimmedPassword = password.trim()
    if (trimmedPassword.length < 8) {
      setError('Choose a password with at least 8 characters.')
      return
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setError('The passwords do not match.')
      return
    }

    setIsUpdating(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: trimmedPassword })
      if (updateError) throw updateError

      setStatus('Your password was updated successfully.')
      setPassword('')
      setConfirmPassword('')

      window.setTimeout(() => {
        navigate('/Home', { replace: true })
      }, 1200)
    } catch (updateError) {
      setError(updateError.message || 'Could not update your password. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <SEO
        title="Choose a New Password"
        description="Create a new password for your DevVault account."
        path="/change-password"
        noIndex
      />
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <main className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#E7E9EE]">
              Change password
            </h1>
            <p className="mt-2 text-base text-[#8B93A7]">
              Create a new password for your DevVault account.
            </p>
          </header>
          <section className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            {!isReady ? (
              <p role="status" className="text-sm text-[#8B93A7]">Checking your session...</p>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">New password</label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Confirm password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repeat your new password"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                {status && <p role="status" className="text-sm text-green-400">{status}</p>}
                <button
                  type="submit"
                  disabled={isUpdating || !isAuthenticated}
                  className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Update password'}
                </button>
              </form>
            )}
          </section>
          <p className="mt-6 text-center text-sm">
            <Link to="/Login" className="font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">Back to log in</Link>
          </p>
        </main>
        <HomeShortcut />
      </div>
    </>
  )
}

export default ChangePasswordPage
