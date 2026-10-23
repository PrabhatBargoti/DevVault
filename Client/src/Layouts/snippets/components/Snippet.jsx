import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import SnippetFilters from './SnippetFilters'
import SnippetCard from './SnippetCard'

const Snippet = ({ snippets, query, initialCategory, tagFilter, onClearSearch, onCreate, onEdit, onDelete }) => {
  const [categoryFilter, setCategoryFilter] = useState(initialCategory)
  const [languageFilter, setLanguageFilter] = useState('')
  const categories = [...new Set(snippets.map((snippet) => snippet.category).filter(Boolean))]
  const languages = [...new Set(snippets.map((snippet) => snippet.language).filter(Boolean))]
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedTag = tagFilter.trim().toLowerCase()
  const filteredSnippets = snippets.filter((snippet) => (
    (!categoryFilter || snippet.category === categoryFilter)
    && (!languageFilter || snippet.language === languageFilter)
    && (!normalizedTag || (snippet.tags || []).some((tag) => tag.toLowerCase() === normalizedTag))
    && `${snippet.title} ${snippet.description} ${snippet.category} ${snippet.language} ${(snippet.tags || []).join(' ')}`
      .toLowerCase()
      .includes(normalizedQuery)
  ))

  return (
    <main className="flex flex-1 flex-col bg-[#0B0D12] px-5 pb-8 pt-6 sm:px-6 sm:pt-7 lg:px-12">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">{query || tagFilter ? 'Search results' : categoryFilter ? categoryFilter : 'My snippets'}</h1>
          <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">
            {query || tagFilter || categoryFilter
              ? `${filteredSnippets.length} ${filteredSnippets.length === 1 ? 'snippet' : 'snippets'} found${query ? ` for “${query}”` : tagFilter ? ` tagged “${tagFilter}”` : ''}`
              : `${snippets.length} ${snippets.length === 1 ? 'snippet' : 'snippets'} in your vault`}
          </p>
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
            <SnippetCard key={snippet.id} snippet={snippet} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center" aria-live="polite">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#252A37] bg-[#12151C] text-[#737C90]">
            <Search aria-hidden="true" size={24} />
          </div>
          <h2 className="mt-5 text-base font-semibold text-[#E7E9EE] sm:text-lg">No snippets found</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#8B93A7]">
            Try another search or clear your filters to see all the snippets in your vault.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('')
              setLanguageFilter('')
              onClearSearch()
            }}
            className="mt-6 min-h-10 rounded-lg border border-[#2B3040] px-4 text-sm font-semibold text-[#C7CBD5] transition-colors hover:bg-[#1C2029]"
          >
            Clear search and filters
          </button>
        </section>
      )}
    </main>
  )
}

export default Snippet
