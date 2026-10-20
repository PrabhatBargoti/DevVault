import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import ProfileAvatar from './ProfileAvatar'

const DashboardHeader = ({ user }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const search = searchParams.get('search') || ''

  useEffect(() => {
    setQuery(search)
  }, [search])

  const handleSearch = (event) => {
    event.preventDefault()
    const nextSearch = query.trim()
    navigate(nextSearch ? `/Snippet?search=${encodeURIComponent(nextSearch)}` : '/Snippet')
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[#232733] bg-[#0B0D12]/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <form
        role="search"
        aria-label="Snippet search"
        onSubmit={handleSearch}
        className="flex min-w-0 max-w-xl flex-1 items-center gap-2.5 rounded-lg border border-[#232733] bg-[#12151C] px-3 py-2 text-[#5A6275] transition-colors focus-within:border-[#6E6BF4]"
      >
        <Search aria-hidden="true" size={16} className="shrink-0" />
        <input
          type="search"
          aria-label="Search snippets"
          placeholder="Search snippets..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#E7E9EE] outline-none placeholder:text-[#5A6275]"
        />
        <button type="submit" className="sr-only">Search snippets</button>
      </form>

      <button
        type="button"
        aria-label="Open settings"
        onClick={() => navigate('/Setting')}
        className="flex shrink-0 cursor-pointer items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
      >
        <ProfileAvatar user={user} />
      </button>
    </header>
  )
}

export default DashboardHeader
