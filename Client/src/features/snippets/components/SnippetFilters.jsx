const selectClassName = 'h-10 w-full rounded-lg border border-[#2B3040] bg-[#12151C] px-3 text-sm text-[#C7CBD5] outline-none focus:border-[#6E6BF4]'

const SnippetFilters = ({ categories, languages, categoryFilter, onCategoryChange, languageFilter, onLanguageChange, className = '' }) => (
  <div className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${className}`}>
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