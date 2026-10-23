import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'

const LegalPageLayout = ({ title, description, path, children }) => (
  <div className="min-h-dvh bg-[#0B0D12] text-[#E7E9EE]">
    <SEO title={title} description={description} path={path} />
    <header className="border-b border-[#232733]">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5">
        <Link to="/" className="text-sm font-semibold text-[#A6A4FF] hover:text-white">DevVault</Link>
        <Link to="/" className="text-sm text-[#8B93A7] hover:text-white">Back to home</Link>
      </div>
    </header>
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-[#8B93A7]">Effective date: October 23, 2026</p>
      <div className="legal-content mt-10 space-y-8 text-sm leading-7 text-[#B0B6C5]">
        {children}
      </div>
      <nav aria-label="Legal pages" className="mt-12 flex flex-wrap gap-5 border-t border-[#232733] pt-6 text-sm">
        <Link to="/privacy-policy" className="text-[#A6A4FF] underline hover:text-white">Privacy Policy</Link>
        <Link to="/terms" className="text-[#A6A4FF] underline hover:text-white">Terms and Conditions</Link>
      </nav>
    </main>
  </div>
)

export default LegalPageLayout
