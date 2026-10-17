import { ArrowUpRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SnippetCard from '../../snippets/components/SnippetCard'

const HomeRecentSnippets = ({ snippets, onDelete }) => {
  const navigate = useNavigate()
  const recentSnippets = snippets.slice(0, 4)

  return (
    <section aria-labelledby="recent-snippets-title" className="min-w-0">
      <header className="mb-3 flex items-center justify-between gap-3">
        <h2 id="recent-snippets-title" className="text-base font-semibold text-[#E7E9EE]">Recent snippets</h2>
        {snippets.length > 0 && (
          <button type="button" onClick={() => navigate('/Snippet')} className="inline-flex items-center gap-1 text-sm font-medium text-[#9B99FF] hover:text-white">
            View all <ArrowUpRight aria-hidden="true" size={15} />
          </button>
        )}
      </header>

      {recentSnippets.length > 0 ? (
        <div className="grid gap-2.5">
          {recentSnippets.map((snippet) => <SnippetCard key={snippet.id} snippet={snippet} onDelete={onDelete} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#303545] px-5 py-8 text-center">
          <p className="text-sm font-medium text-[#C7CBD5]">No snippets saved right now</p>
          <p className="mt-1 text-sm text-[#737C90]">Your vault is ready for the next one.</p>
          <button type="button" onClick={() => navigate('/Snippet')} className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-3.5 text-sm font-semibold text-white hover:bg-[#8280F7]">
            <Plus aria-hidden="true" size={16} /> New snippet
          </button>
        </div>
      )}
    </section>
  )
}

export default HomeRecentSnippets
