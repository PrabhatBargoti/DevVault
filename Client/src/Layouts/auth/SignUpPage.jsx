import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthProviderIcon from '../../components/AuthProviderIcon'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('Account creation is unavailable until client authentication is connected to the server.')
  }

  const handleOAuthSignUp = (provider) => {
    if (!acceptedTerms) {
      setError('Accept the Terms and Conditions and Privacy Policy before continuing.')
      return
    }
    setError(`${provider} sign-up is unavailable until client authentication is connected to the server.`)
  }

  return (
    <>
      <SEO
        title="Create Your Account"
        description="DevVault account creation is not available in the client yet."
        path="/Signup"
        noIndex
      />
      <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <header className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#E7E9EE]">Create your vault</h1>
          <p className="mt-1.5 text-sm text-[#8B93A7]">Free, open source, yours</p>
        </header>

        <main className="w-full max-w-md">
          <div className="rounded-2xl border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            <p role="status" className="mb-4 rounded-lg border border-[#3B3652] bg-[#191725] p-3 text-sm text-[#C3C0E8]">
              Sign-up and sign-in are not available in the client yet. Authentication will be connected through the server.
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Alex Carter"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-[#E7E9EE]">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-[#232733] bg-[#0D0F15] px-3.5 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5A6275] outline-none transition-colors focus:border-[#6E6BF4]"
                  required
                />
                <p className="mt-2 text-xs text-[#5A6275]">Use at least 8 characters.</p>
              </div>

              <label className="flex items-start gap-2.5 text-sm leading-5 text-[#8B93A7]">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 accent-[#6E6BF4]"
                  required
                />
                <span>
                  I agree to the <Link to="/terms" className="text-[#A6A4FF] underline hover:text-white">Terms and Conditions</Link>
                  {' '}and acknowledge the <Link to="/privacy-policy" className="text-[#A6A4FF] underline hover:text-white">Privacy Policy</Link>.
                </span>
              </label>

              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={!acceptedTerms}
                className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create account
              </button>

              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-[#232733]" />
                <span className="text-xs text-[#5A6275]">or sign up with</span>
                <span className="h-px flex-1 bg-[#232733]" />
              </div>

              <button
                type="button"
                disabled={!acceptedTerms}
                onClick={() => handleOAuthSignUp('github')}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2D3241] bg-transparent py-2.5 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#1C2029] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AuthProviderIcon provider="github" />
                Continue with GitHub
              </button>
              <button
                type="button"
                disabled={!acceptedTerms}
                onClick={() => handleOAuthSignUp('google')}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#2D3241] bg-transparent py-2.5 text-sm font-semibold text-[#E7E9EE] transition-colors hover:bg-[#1C2029] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <AuthProviderIcon provider="google" />
                Continue with Google
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-[#8B93A7]">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/Login')} className="cursor-pointer font-semibold text-[#6E6BF4] transition-colors hover:text-[#8280F7]">
              Log in
            </button>
          </p>
        </main>
        <HomeShortcut />
      </div>
    </>
  )
}

export default SignUpPage
