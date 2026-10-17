import { Search } from 'lucide-react'

const selectClassName = 'h-10 w-full rounded-lg border border-[#2B3040] bg-[#12151C] px-3 text-sm text-[#C7CBD5] outline-none focus:border-[#6E6BF4]'

const SnippetFilters = ({ query, onQueryChange, categories, languages, categoryFilter, onCategoryChange, languageFilter, onLanguageChange, className = '' }) => (
  <div className={`grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_160px_160px] ${className}`}>
    <label className="flex h-10 min-w-0 items-center gap-2.5 rounded-lg border border-[#2B3040] bg-[#12151C] px-3 text-[#737C90] focus-within:border-[#6E6BF4]">
      <Search aria-hidden="true" size={16} className="shrink-0" />
      <input
        type="search"
        aria-label="Filter snippets"
        placeholder="Search snippets..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#E7E9EE] outline-none placeholder:text-[#5A6275]"
      />
    </label>
    <select aria-label="Filter by category" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)} className={selectClassName}>
      <option value="">All categories</option>
      {categories.map((category) => <option key={category} value={category}>{category}</option>)}
    </select>
    <select aria-label="Filter by language" value={languageFilter} onChange={(event) => onLanguageChange(event.target.value)} className={selectClassName}>
      <option value="">All languages</option>
      {languages.map((language) => <option key={language} value={language}>{language}</option>)}
    </select>
  </div>
)

export default SnippetFilters