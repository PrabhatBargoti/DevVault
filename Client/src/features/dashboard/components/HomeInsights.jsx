import { Tag } from 'lucide-react'

const languageColors = ['#D7D84D', '#6DBD82', '#3986CF', '#5DC5E8', '#BF86D9', '#4A9BC0']

const HomeInsights = ({ snippets }) => {
  const languageCounts = snippets.reduce((counts, snippet) => {
    if (snippet.language) counts[snippet.language] = (counts[snippet.language] || 0) + 1
    return counts
  }, {})
  const languages = Object.entries(languageCounts).sort((first, second) => second[1] - first[1]).slice(0, 6)
  const tagCounts = snippets.reduce((counts, snippet) => {
    const uniqueTags = new Set((snippet.tags || []).map((tag) => tag.trim()).filter(Boolean))
    uniqueTags.forEach((tag) => {
      const key = tag.toLowerCase()
      const existing = counts[key]
      counts[key] = { label: existing?.label || tag, count: (existing?.count || 0) + 1 }
    })
    return counts
  }, {})
  const topTags = Object.values(tagCounts).sort((first, second) => second.count - first.count).slice(0, 10)
  const maxLanguageCount = languages[0]?.[1] || 1

  return (
    <aside className="grid content-start gap-4 sm:grid-cols-2 xl:grid-cols-1">
      <section aria-labelledby="languages-title" className="rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 id="languages-title" className="text-sm font-semibold text-[#E7E9EE]">Languages</h2>
          <span className="text-xs text-[#737C90]">{languages.length} total</span>
        </div>
        {languages.length ? (
          <ul className="mt-4 grid gap-3">
            {languages.map(([language, count], index) => (
              <li key={language} className="grid grid-cols-[minmax(0,1fr)_minmax(72px,1fr)_24px] items-center gap-2 text-xs">
                <span className="truncate text-[#9BA3B6]">{language}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-[#202430]">
                  <span className="block h-full rounded-full" style={{ width: `${(count / maxLanguageCount) * 100}%`, backgroundColor: languageColors[index % languageColors.length] }} />
                </span>
                <span className="text-right tabular-nums text-[#737C90]">{count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-[#737C90]">Language stats will appear with your next snippet.</p>
        )}
      </section>

      <section aria-labelledby="top-tags-title" className="rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 id="top-tags-title" className="text-sm font-semibold text-[#E7E9EE]">Top tags</h2>
          <Tag aria-hidden="true" size={15} className="text-[#9290FF]" />
        </div>
        {topTags.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {topTags.map(({ label, count }) => (
              <li key={label} className="max-w-full rounded-full border border-[#292E3B] bg-[#1A1E28] px-2.5 py-1 text-xs text-[#9BA3B6]">
                <span className="break-all">{label}</span> <span className="text-[#737C90]">{count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-[#737C90]">Add tags to snippets to see them summarized here.</p>
        )}
      </section>
    </aside>
  )
}

export default HomeInsights