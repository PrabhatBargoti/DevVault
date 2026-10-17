import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import ProfileAvatar from '../../features/dashboard/components/ProfileAvatar'

const DashboardHeader = ({ user }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')

  const handleSearch = (event) => {
    event.preventDefault()
    const search = query.trim()
    navigate(search ? `/Snippet?search=${encodeURIComponent(search)}` : '/Snippet')
  }

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-[#232733] px-4 sm:px-6 lg:px-8">
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

      <div className="flex shrink-0 items-center gap-3 cursor-pointer" onClick={() => navigate('/Setting')}>
        <ProfileAvatar user={user} />
      </div>
    </header>
  )
}

export default DashboardHeader
