import BigPurpleBtn from '../../../shared/components/BigPurpleBtn'
import { useNavigate } from 'react-router-dom'

const LandingHero = () => {
  const navigate = useNavigate()
  return <section id="Hero" className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20 sm:px-6"><div className="flex max-w-2xl flex-col items-center text-center"><h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#E7E9EE] sm:text-6xl">Your developer<br />knowledge vault.</h1><p className="mt-6 max-w-md text-base leading-relaxed text-[#8B93A7] sm:text-lg">Save it once. Find it instantly. Build faster. Code snippets, commands, and fixes — kept in one place you actually search.</p><div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"><BigPurpleBtn name="Get started free" className="w-full cursor-pointer sm:w-auto" onClick={() => navigate('/Signup')} /><a href="https://github.com/PrabhatBargoti/DevVault" className="rounded-xl border-2 border-[#232733] bg-[#12151C] px-5 py-3 font-semibold transition-colors hover:bg-[#1C2029]" target="_blank" rel="noopener noreferrer">View on GitHub</a></div></div></section>
}
export default LandingHero
