import { Link } from 'react-router-dom'

const LandingFooter = () => (
  <footer className="border-t border-[#232733] bg-[#0B0D12]">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left">
      <p className="text-sm text-[#8B93A7]">DevVault — open source developer knowledge vault</p>
      <nav aria-label="Legal" className="flex justify-center gap-5 text-sm">
        <Link to="/privacy-policy" className="text-[#8B93A7] transition-colors hover:text-white">Privacy Policy</Link>
        <Link to="/terms" className="text-[#8B93A7] transition-colors hover:text-white">Terms and Conditions</Link>
      </nav>
      <p className="text-sm text-[#5A6275]">MIT licensed</p>
    </div>
  </footer>
)

export default LandingFooter
