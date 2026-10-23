import { Code2, Folder, Tag } from 'lucide-react'

const HomeStats = ({ snippets }) => {
  const tags = new Set(snippets.flatMap((snippet) => snippet.tags || []).map((tag) => tag.toLowerCase()))
  const languages = new Set(snippets.map((snippet) => snippet.language).filter(Boolean))
  const categories = new Set(snippets.map((snippet) => snippet.category).filter(Boolean))
  const stats = [
    { label: 'Total snippets', value: snippets.length, icon: Code2 },
    { label: 'Tags', value: tags.size, icon: Tag },
    { label: 'Languages', value: languages.size, icon: Code2 },
    { label: 'Categories', value: categories.size, icon: Folder },
  ]

  return (
    <section aria-label="Vault statistics" className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <article key={label} className="rounded-xl border border-[#252A37] bg-[#12151C] px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-2xl font-bold tabular-nums text-[#E7E9EE]">{value}</p>
            <Icon aria-hidden="true" size={17} className="text-[#9290FF]" />
          </div>
          <p className="mt-1 text-sm text-[#8B93A7]">{label}</p>
        </article>
      ))}
    </section>
  )
}

export default HomeStats