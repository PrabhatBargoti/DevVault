import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'
import { getSupabaseClient } from '../../lib/supabase'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (busy) return

    setBusy(true)
    setError('')
    try {
      const { error: resetError } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/change-password`,
      })
      if (resetError) throw resetError
      setSent(true)
    } catch (requestError) {
      setError(requestError.message || 'Could not send the reset email. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SEO
        title="Reset Password"
        description="Request a secure password reset link for your DevVault account."
        path="/forgot-password"
        noIndex
      />
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <main className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#E7E9EE]">
              {sent ? 'Check your inbox' : 'Reset your password'}
            </h1>
            <p className="mt-2 text-base text-[#8B93A7]">
              {sent ? 'If an account matches that address, we sent a reset link.' : "We'll email you a secure reset link."}
            </p>
          </header>
          <section className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            {sent ? (
              <div className="flex flex-col gap-5">
                <p role="status" className="text-center text-sm text-[#8B93A7]">
                  Open the email and follow its link to choose a new password. If it does not arrive, check your spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="w-full rounded-lg border border-[#2D3241] bg-transparent py-3 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#181D29]"
                >
                  Send another link
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Email</label>
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="alex@example.com"
                    className="w-full rounded-lg border border-[#2D3241] bg-[#0D1017] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  />
                </div>
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? 'Sending…' : 'Send reset link'}
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

export default ForgotPasswordPage
