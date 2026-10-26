import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthProviderIcon from '../../components/AuthProviderIcon'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'
import { isSupabaseConfigured, supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { error: sessionError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      setError('Authentication is not configured. Set the client Supabase URL and publishable key.')
      return
    }

    setIsSubmitting(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(signInError.message)
        return
      }
      navigate(location.state?.from?.pathname || '/Home', { replace: true })
    } catch (signInError) {
      setError(signInError.message || 'Could not sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOAuthSignIn = async (provider) => {
    setError('')
    if (!acceptedTerms) {
      setError('Accept the Terms and Conditions and Privacy Policy before continuing with a social account.')
      return
    }
    if (!isSupabaseConfigured) {
      setError('Authentication is not configured. Set the client Supabase URL and publishable key.')
      return
    }
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/Home` },
      })
      if (oauthError) setError(oauthError.message)
    } catch (oauthError) {
      setError(oauthError.message || `Could not start ${provider} sign-in.`)
    }
  }

  return (
    <>
      <SEO
        title="Log in"
        description="Sign in to your DevVault account."
        path="/Login"
        noIndex
      />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <header className="mb-5 text-center">
            <h1 className="text-3xl font-semibold tracking-tighter text-[#E7E9EE]">Welcome back</h1>
            <p className="mt-2 text-base text-[#8B93A7]">Sign in to your vault</p>
          </header>
          <main className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-6">
            <p role="status" className="mb-4 rounded-lg border border-[#3B3652] bg-[#191725] p-3 text-sm text-[#C3C0E8]">
              Sign in with your DevVault account to access your saved snippets.
            </p>
            {location.state?.message && (
              <p role="status" className="mb-4 text-sm text-emerald-400">{location.state.message}</p>
            )}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Email</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-lg border border-[#2D3241] bg-[#0D0F15] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  required
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-sm font-semibold text-[#E7E9EE]">Password</label>
                  <Link to="/forgot-password" className="text-sm font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">Forgot?</Link>
                </div>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  className="w-full rounded-lg border border-[#2D3241] bg-[#0D0F15] px-3.5 py-3 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  required
                />
              </div>
              {(error || sessionError) && <p role="alert" className="text-sm text-red-400">{error || sessionError}</p>}
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in...' : 'Log in'}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#232733]" />
              <span className="text-xs text-[#5A6275]">or continue with a social account</span>
              <span className="h-px flex-1 bg-[#232733]" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-2.5 text-sm leading-5 text-[#8B93A7]">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 accent-[#6E6BF4]"
                />
                <span>
                  I agree to the <Link to="/terms" className="text-[#A6A4FF] underline hover:text-white">Terms and Conditions</Link>
                  {' '}and acknowledge the <Link to="/privacy-policy" className="text-[#A6A4FF] underline hover:text-white">Privacy Policy</Link>.
                  Required because a social sign-in can create a new account.
                </span>
              </label>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleOAuthSignIn('github')}
                className="w-full cursor-pointer rounded-lg border border-[#2D3241] bg-transparent py-2.5 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#1C2029] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <AuthProviderIcon provider="github" />
                Continue with GitHub
                </span>
              </button>
              <button
                type="button"
                disabled={!acceptedTerms}
                onClick={() => handleOAuthSignIn('google')}
                className="w-full cursor-pointer rounded-lg border border-[#2D3241] bg-transparent py-2.5 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#1C2029] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <AuthProviderIcon provider="google" />
                Continue with Google
                </span>
              </button>
            </div>
          </main>
          <p className="mt-6 text-center text-sm text-[#8B93A7]">
            Don&apos;t have an account?{' '}
            <button type="button" onClick={() => navigate('/Signup')} className="cursor-pointer font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">
              Sign up
            </button>
          </p>
        </div>
        <HomeShortcut />
      </div>
    </>
  )
}

export default LoginPage
