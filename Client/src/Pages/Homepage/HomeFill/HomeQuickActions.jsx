import { Code2, Folder, Plus, Search, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomeQuickActions = () => {
  const navigate = useNavigate()
  const actions = [
    { label: 'New snippet', detail: 'Save a useful piece of code', path: '/Snippet', icon: Plus },
    { label: 'Search vault', detail: 'Find a saved snippet', path: '/Snippet', icon: Search },
    { label: 'Browse tags', detail: 'Explore your tag index', path: '/Tags', icon: Tag },
    { label: 'Categories', detail: 'Organize your snippets', path: '/Categorie', icon: Folder },
  ]

  return (
    <nav aria-label="Quick actions" className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 2xl:grid-cols-4">
      {actions.map(({ label, detail, path, icon: Icon }) => (
        <button key={label} type="button" onClick={() => navigate(path)} className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#252A37] bg-[#12151C] p-3 text-left transition-colors hover:border-[#45416F] hover:bg-[#161923]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22243B] text-[#9290FF]">
            <Icon aria-hidden="true" size={17} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-[#E7E9EE]">{label}</span>
            <span className="mt-0.5 block truncate text-xs text-[#737C90]">{detail}</span>
          </span>
        </button>
      ))}
    </nav>
  )
}

export default HomeQuickActions