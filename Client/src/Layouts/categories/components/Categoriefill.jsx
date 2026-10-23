import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Folder, Plus } from 'lucide-react'

const Categoriefill = ({ snippets }) => {
  const navigate = useNavigate()
  const categories = useMemo(() => {
    const counts = new Map()
    snippets.forEach(({ category }) => {
      if (category?.trim()) {
        counts.set(category, (counts.get(category) || 0) + 1)
      }
    })
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((first, second) => second.count - first.count || first.name.localeCompare(second.name))
  }, [snippets])

  return (
    <main className="flex-1 bg-[#0B0D12] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">Categories</h1>
            <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'} across your vault
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/Snippet?create=1')}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] sm:px-4"
          >
            <Plus aria-hidden="true" size={17} />
            <span className="hidden sm:inline">New snippet</span>
            <span className="sm:hidden">New</span>
          </button>
        </header>

        {categories.length ? (
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map(({ name, count }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => navigate(`/Snippet?category=${encodeURIComponent(name)}`)}
                  className="flex min-h-20 w-full items-center gap-3 rounded-xl border border-[#252A37] bg-[#12151C] p-4 text-left transition-colors hover:border-[#393D57] hover:bg-[#171B24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#22243B] text-[#9290FF]">
                    <Folder aria-hidden="true" size={18} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[#E7E9EE]">{name}</span>
                    <span className="mt-0.5 block text-xs text-[#8B93A7]">
                      {count} {count === 1 ? 'snippet' : 'snippets'}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <section className="flex flex-col items-center px-4 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#252A37] bg-[#12151C] text-[#737C90]">
              <Folder aria-hidden="true" size={24} />
            </div>
            <h2 className="mt-5 text-base font-semibold text-[#E7E9EE]">No categories yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#8B93A7]">
              Choose a category when creating a snippet to keep your vault organized.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}

export default Categoriefill
