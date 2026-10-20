import { useState } from 'react'
import { Plus } from 'lucide-react'
import SnippetFilters from './SnippetFilters'
import SnippetCard from './SnippetCard'

const Snippet = ({ snippets, query, onCreate, onDelete }) => {
  const [categoryFilter, setCategoryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')
  const categories = [...new Set(snippets.map((snippet) => snippet.category).filter(Boolean))]
  const languages = [...new Set(snippets.map((snippet) => snippet.language).filter(Boolean))]
  const normalizedQuery = query.trim().toLowerCase()
  const filteredSnippets = snippets.filter((snippet) => (
    (!categoryFilter || snippet.category === categoryFilter)
    && (!languageFilter || snippet.language === languageFilter)
    && `${snippet.title} ${snippet.description} ${snippet.category} ${snippet.language} ${(snippet.tags || []).join(' ')}`
      .toLowerCase()
      .includes(normalizedQuery)
  ))

  return (
    <main className="flex flex-1 flex-col bg-[#0B0D12] px-5 pb-8 pt-6 sm:px-6 sm:pt-7 lg:px-12">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">My snippets</h1>
          <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">{snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'} in your vault</p>
        </div>
        <button type="button" onClick={onCreate} className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] sm:px-4">
          <Plus aria-hidden="true" size={17} />
          <span className="hidden sm:inline">New snippet</span>
          <span className="sm:hidden">New</span>
        </button>
      </section>

      <SnippetFilters
        categories={categories}
        languages={languages}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        languageFilter={languageFilter}
        onLanguageChange={setLanguageFilter}
        className="mt-5"
      />

      {filteredSnippets.length > 0 ? (
        <section aria-label="Saved snippets" className="mt-4 grid gap-2.5">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onDelete={onDelete} />
          ))}
        </section>
      ) : (
        <p className="mt-12 text-center text-sm text-[#8B93A7]">No snippets match your filters.</p>
      )}
    </main>
  )
}

export default Snippet
