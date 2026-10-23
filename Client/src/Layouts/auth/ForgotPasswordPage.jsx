import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('Password recovery is unavailable until client authentication is connected to the server.')
  }

  return (
    <>
      <SEO
        title="Reset Password"
        description="Password recovery is not available in the client yet."
        path="/forgot-password"
        noIndex
      />
      <div className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-10 sm:px-6">
        <main className="w-full max-w-md">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#E7E9EE]">
              Reset your password
            </h1>
            <p className="mt-2 text-base text-[#8B93A7]">
              Password recovery will be available when client authentication is connected to the server.
            </p>
          </header>
          <section className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 sm:p-6">
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
                  className="w-full cursor-pointer rounded-lg bg-[#6E6BF4] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send reset link
                </button>
            </form>
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
