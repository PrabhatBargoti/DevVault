import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import HomeShortcut from '../../components/HomeShortcut'

const ChangePasswordPage = () => {
  return (
    <>
      <SEO
        title="Choose a New Password"
        description="Password changes are not available in the client yet."
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
              Password changes will be available when client authentication is connected to the server.
            </p>
          </header>
          <section className="rounded-[20px] border border-[#232733] bg-[#12151C] p-5 sm:p-6">
            <p role="status" className="text-center text-sm text-[#8B93A7]">
              Password changes are not available in the client yet. Please check back after server authentication is implemented.
            </p>
            <Link to="/Login" className="mt-5 block text-center text-sm font-semibold text-[#A6A4FF] underline hover:text-white">
              Back to log in
            </Link>
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
