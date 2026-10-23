import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'
import { getSupabaseClient } from '../../lib/supabase'

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let subscription

    Promise.resolve()
      .then(getSupabaseClient)
      .then(async (supabase) => {
        if (!active) return
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          if (active && session) setHasSession(true)
        })
        subscription = authListener.subscription
        const { data, error: sessionError } = await supabase.auth.getSession()
        if (!active) return
        if (sessionError) {
          setError(sessionError.message)
        } else {
          setHasSession(Boolean(data.session))
        }
        setCheckingSession(false)
      })
      .catch((sessionError) => {
        if (!active) return
        setError(sessionError.message || 'Could not verify the reset session.')
        setCheckingSession(false)
      })

    return () => {
      active = false
      subscription?.unsubscribe()
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (busy) return
    if (password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setBusy(true)
    setError('')
    try {
      const { error: updateError } = await getSupabaseClient().auth.updateUser({ password })
      if (updateError) throw updateError
      setUpdated(true)
    } catch (requestError) {
      setError(requestError.message || 'Could not update your password. Request a new reset link and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SEO
        title="Choose a New Password"
        description="Set a new password for your DevVault account."
        path="/change-password"
        noIndex
      />
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <main className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#E7E9EE]">
              {updated ? 'Password updated' : 'Choose a new password'}
            </h1>
            <p className="mt-2 text-base text-[#8B93A7]">
              {updated ? 'Your password has been changed successfully.' : 'Set a new password for your DevVault account.'}
            </p>
          </header>
          <section className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            {checkingSession ? (
              <p role="status" className="text-center text-sm text-[#8B93A7]">Verifying your reset link…</p>
            ) : updated ? (
              <button
                type="button"
                onClick={() => navigate('/Login', { replace: true, state: { message: 'Your password was changed. Log in with your new password.' } })}
                className="w-full rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7]"
              >
                Continue to log in
              </button>
            ) : hasSession ? (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">New password</label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Confirm new password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? 'Updating…' : 'Update password'}
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p role="alert" className="text-sm text-red-400">
                  {error || 'This password reset link is invalid or has expired. Request a new one to continue.'}
                </p>
                <Link to="/forgot-password" className="inline-block text-sm font-semibold text-[#A6A4FF] underline hover:text-white">
                  Request a new reset link
                </Link>
              </div>
            )}
          </section>
          <p className="mt-6 text-center text-sm">
            <Link to="/" className="font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">Return home</Link>
          </p>
        </main>
        <HomeShortcut />
      </div>
    </>
  )
}

export default ChangePasswordPage
