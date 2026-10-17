import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import HomeInsights from './HomeInsights'
import HomeQuickActions from './HomeQuickActions'
import HomeRecentSnippets from './HomeRecentSnippets'
import HomeStats from './HomeStats'

const HomeFill = ({ snippets, onDelete }) => {
  const navigate = useNavigate()

  return (
    <main className="flex-1 bg-[#0B0D12] px-5 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto w-full max-w-360">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">Your vault</h1>
            <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">A clear view of the things you’ve saved.</p>
          </div>
          <button type="button" onClick={() => navigate('/Snippet?create=1')} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] sm:px-4">
            <Plus aria-hidden="true" size={17} />
            <span>New snippet</span>
          </button>
        </header>

        <HomeStats snippets={snippets} />
        <HomeQuickActions />

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <HomeRecentSnippets snippets={snippets} onDelete={onDelete} />
          <HomeInsights snippets={snippets} />
        </div>
      </div>
    </main>
  )
}

export default HomeFill
