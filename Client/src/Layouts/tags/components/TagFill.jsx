import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hash, Search, Tag } from 'lucide-react'

const TagFill = ({ snippets }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const tags = useMemo(() => {
    const counts = new Map()
    snippets.forEach((snippet) => {
      const snippetTags = snippet.tags || []
      const uniqueTags = new Set(snippetTags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))
      uniqueTags.forEach((key) => {
        const name = snippetTags.find((tag) => tag.trim().toLowerCase() === key).trim()
        const current = counts.get(key)
        counts.set(key, { name: current?.name || name, count: (current?.count || 0) + 1 })
      })
    })
    return [...counts.values()].sort((first, second) => first.name.localeCompare(second.name))
  }, [snippets])
  const filteredTags = tags.filter(({ name }) => name.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <main className="flex-1 bg-[#0B0D12] px-4 pb-8 pt-7 sm:px-6 sm:pt-8 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">Tags</h1>
            <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">
              {tags.length} {tags.length === 1 ? 'tag' : 'tags'} across your vault
            </p>
          </div>
          <label className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-[#2B3040] bg-[#12151C] px-3 text-[#737C90] transition-colors focus-within:border-[#6E6BF4] sm:max-w-xs">
            <Search aria-hidden="true" size={16} className="shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tags..."
              aria-label="Search tags"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#E7E9EE] outline-none placeholder:text-[#5A6275]"
            />
          </label>
        </header>

        {filteredTags.length ? (
          <ul className="mt-5 overflow-hidden rounded-xl border border-[#252A37] bg-[#12151C]">
            {filteredTags.map(({ name, count }) => (
              <li key={name} className="border-b border-[#252A37] last:border-b-0">
                <button
                  type="button"
                  onClick={() => navigate(`/Snippet?tag=${encodeURIComponent(name)}`)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-[#1A1E28] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#6E6BF4] sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Hash aria-hidden="true" size={16} className="shrink-0 text-[#9290FF]" />
                    <span className="truncate text-sm font-semibold text-[#E7E9EE]">{name}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-[#8B93A7]">
                    {count} {count === 1 ? 'snippet' : 'snippets'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <section className="flex flex-col items-center px-4 py-16 text-center" aria-live="polite">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#252A37] bg-[#12151C] text-[#737C90]">
              <Tag aria-hidden="true" size={24} />
            </div>
            <h2 className="mt-5 text-base font-semibold text-[#E7E9EE]">No matching tags</h2>
            <p className="mt-2 text-sm leading-6 text-[#8B93A7]">Try a different search term.</p>
          </section>
        )}
      </div>
    </main>
  )
}

export default TagFill
