import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Archive, Search, Bell, Plus } from 'lucide-react'

const getAvatarDetails = (user) => {
  const metadata = user?.user_metadata || user?.userMetadata || {}
  const identities = Array.isArray(user?.identities) ? user.identities : []
  const name =
    user?.name ||
    user?.fullName ||
    metadata.full_name ||
    metadata.name ||
    metadata.preferred_username ||
    user?.email ||
    ''
  const ownProfileImage =
    user?.profileImageUrl ||
    user?.avatarUrl ||
    metadata.profile_image_url ||
    metadata.profileImageUrl
  const providerImage =
    metadata.avatar_url ||
    metadata.picture ||
    identities
      .filter((identity) => ['google', 'github'].includes(identity.provider))
      .map((identity) => {
        const data = identity.identity_data || identity.identityData || {}
        return data.avatar_url || data.picture || data.avatarUrl
      })
      .find(Boolean)

  return {
    name,
    imageUrl: ownProfileImage || providerImage || '',
  }
}

const ProfileAvatar = ({ user }) => {
  const { name, imageUrl } = getAvatarDetails(user)
  const [imageFailed, setImageFailed] = useState(false)
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'DV'

  useEffect(() => {
    setImageFailed(false)
  }, [imageUrl])

  return (
    <div
      aria-label={name ? `Profile: ${name}` : 'User profile'}
      className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#6E6BF4] text-xs font-bold text-white"
    >
      {imageUrl && !imageFailed ? (
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initials
      )}
    </div>
  )
}

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

      <div className="flex shrink-0 items-center gap-3">
        <ProfileAvatar user={user} />
      </div>
    </header>
  )
}

const EmptyVaultState = () => {
  const navigate = useNavigate()

  return (
    <section
      aria-labelledby="empty-vault-title"
      className="flex w-full max-w-md flex-col items-center px-5 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#232733] bg-[#12151C] text-[#8B93A7]">
        <Archive aria-hidden="true" size={25} strokeWidth={1.8} />
      </div>
      <h2 id="empty-vault-title" className="mt-5 text-base font-semibold text-[#E7E9EE] sm:text-lg">
        Your vault is empty
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-[#8B93A7] sm:text-[15px]">
        Start saving the useful things you discover while coding — snippets,
        commands, and fixes you’ll want again.
      </p>
      <button
        type="button"
        onClick={() => navigate('/Snippet')}
        className="mt-7 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9290FF] active:scale-[0.98] sm:w-auto"
      >
        <Plus aria-hidden="true" size={17} />
        Create your first snippet
      </button>
    </section>
  )
}

const HomeEmpty = ({ user }) => (
  <div className="flex min-h-[calc(100dvh-4.5rem)] flex-1 flex-col bg-[#0B0D12] md:min-h-dvh">
    <DashboardHeader user={user} />
    <main className="flex flex-1 flex-col">
      <section className="px-5 pb-4 pt-7 sm:px-6 sm:pt-8 lg:px-12">
        <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">
          Welcome to your vault <span aria-hidden="true">👋</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#8B93A7] sm:text-[15px]">
          Here’s what’s happening with your vault.
        </p>
      </section>

      <div className="flex flex-1 items-center justify-center py-10 sm:py-12">
        <EmptyVaultState />
      </div>
    </main>
  </div>
)

export default HomeEmpty
