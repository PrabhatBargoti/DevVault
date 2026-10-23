import { useLocation } from 'react-router-dom'

const SkeletonBlock = ({ className = '' }) => (
  <div aria-hidden="true" className={`animate-pulse rounded-lg bg-[#1B202B] motion-reduce:animate-none ${className}`} />
)

const WorkspaceHeaderSkeleton = () => (
  <header aria-hidden="true" className="flex h-14 items-center justify-between gap-4 border-b border-[#232733] px-4 sm:px-6 lg:px-8">
    <SkeletonBlock className="hidden h-4 w-24 md:block" />
    <SkeletonBlock className="h-9 w-full max-w-xl" />
    <SkeletonBlock className="h-8 w-8 shrink-0 rounded-full" />
  </header>
)

const WorkspaceSkeleton = ({ type }) => (
  <div className="min-h-dvh bg-[#0B0D12] md:pl-64">
    <aside aria-hidden="true" className="hidden md:fixed md:inset-y-0 md:left-0 md:block md:w-64 md:border-r md:border-[#232733] md:bg-[#0B0D12] md:p-5">
      <SkeletonBlock className="mb-8 h-8 w-32" />
      <div className="space-y-3">
        {Array.from({ length: 6 }, (_, index) => <SkeletonBlock key={index} className="h-10 w-full" />)}
      </div>
    </aside>
    <div className="min-h-dvh">
      <WorkspaceHeaderSkeleton />
      <main aria-hidden="true" className="mx-auto max-w-6xl px-4 pb-10 pt-7 sm:px-6 sm:pt-8 lg:px-10">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full max-w-md space-y-3">
            <SkeletonBlock className="h-8 w-48 max-w-full sm:h-9" />
            <SkeletonBlock className="h-4 w-64 max-w-full" />
          </div>
          {type === 'snippets' && <SkeletonBlock className="h-10 w-28 shrink-0" />}
        </div>
        {type === 'form' ? (
          <div className="mt-8 max-w-3xl space-y-5">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="space-y-2">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className={index === 4 ? 'h-48 w-full' : 'h-11 w-full'} />
              </div>
            ))}
          </div>
        ) : type === 'settings' ? (
          <div className="mt-7 max-w-2xl">
            <SkeletonBlock className="h-11 w-52 max-w-full rounded-none" />
            <div className="mt-6 space-y-4 rounded-2xl border border-[#252A37] bg-[#12151C] p-4 sm:p-6">
              <SkeletonBlock className="h-16 w-16 rounded-full" />
              {Array.from({ length: 3 }, (_, index) => <SkeletonBlock key={index} className="h-11 w-full" />)}
              <SkeletonBlock className="h-11 w-32" />
            </div>
          </div>
        ) : type === 'categories' ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => <SkeletonBlock key={index} className="h-20 w-full rounded-xl" />)}
          </div>
        ) : type === 'tags' ? (
          <div className="mt-6 space-y-2">
            <SkeletonBlock className="h-10 w-full max-w-xs" />
            <SkeletonBlock className="h-64 w-full rounded-xl" />
          </div>
        ) : type === 'dashboard' ? (
          <>
            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => <SkeletonBlock key={index} className="h-24 rounded-xl" />)}
            </div>
            <SkeletonBlock className="mt-7 h-48 w-full rounded-xl" />
          </>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SkeletonBlock className="h-11 w-full" />
              <SkeletonBlock className="h-11 w-full" />
            </div>
            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }, (_, index) => <SkeletonBlock key={index} className="h-28 w-full rounded-xl" />)}
            </div>
          </>
        )}
      </main>
    </div>
  </div>
)

const AuthSkeleton = () => (
  <main aria-hidden="true" className="flex min-h-dvh items-center justify-center bg-[#0B0D12] px-4 py-10">
    <div className="w-full max-w-md rounded-2xl border border-[#252A37] bg-[#12151C] p-5 sm:p-8">
      <SkeletonBlock className="mx-auto h-10 w-10 rounded-xl" />
      <SkeletonBlock className="mx-auto mt-5 h-7 w-44 max-w-full" />
      <SkeletonBlock className="mx-auto mt-2 h-4 w-60 max-w-full" />
      <div className="mt-8 space-y-5">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="space-y-2">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-11 w-full" />
          </div>
        ))}
        <SkeletonBlock className="h-11 w-full" />
      </div>
    </div>
  </main>
)

const LandingSkeleton = () => (
  <main aria-hidden="true" className="min-h-dvh overflow-hidden bg-[#0B0D12]">
    <div className="flex h-16 items-center justify-between border-b border-[#232733] px-5 sm:px-8">
      <SkeletonBlock className="h-8 w-32" />
      <SkeletonBlock className="hidden h-8 w-56 md:block" />
      <SkeletonBlock className="h-9 w-24" />
    </div>
    <section className="mx-auto grid min-h-[70dvh] max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
      <div className="space-y-5">
        <SkeletonBlock className="h-4 w-32" />
        <SkeletonBlock className="h-12 w-full max-w-lg" />
        <SkeletonBlock className="h-12 w-4/5 max-w-md" />
        <SkeletonBlock className="h-5 w-full max-w-md" />
        <SkeletonBlock className="h-5 w-3/4 max-w-sm" />
        <SkeletonBlock className="h-11 w-36" />
      </div>
      <SkeletonBlock className="h-72 w-full rounded-2xl" />
    </section>
  </main>
)

const LegalSkeleton = () => (
  <main aria-hidden="true" className="min-h-dvh bg-[#0B0D12] px-5 py-12">
    <SkeletonBlock className="mx-auto h-10 w-full max-w-4xl" />
    <SkeletonBlock className="mx-auto mt-10 h-64 w-full max-w-4xl rounded-2xl" />
    <SkeletonBlock className="mx-auto mt-5 h-40 w-full max-w-4xl rounded-2xl" />
  </main>
)

const RouteLoadingSkeleton = () => {
  const { pathname } = useLocation()
  let skeleton

  if (pathname === '/') skeleton = <LandingSkeleton />
  else if (['/Login', '/Signup', '/forgot-password', '/change-password'].includes(pathname)) skeleton = <AuthSkeleton />
  else if (['/privacy-policy', '/terms'].includes(pathname)) skeleton = <LegalSkeleton />
  else if (pathname === '/Setting') skeleton = <WorkspaceSkeleton type="settings" />
  else if (pathname === '/Tags') skeleton = <WorkspaceSkeleton type="tags" />
  else if (pathname === '/Categorie') skeleton = <WorkspaceSkeleton type="categories" />
  else if (pathname === '/Home') skeleton = <WorkspaceSkeleton type="dashboard" />
  else if (/^\/Snippet\/[^/]+/.test(pathname)) skeleton = <WorkspaceSkeleton type="form" />
  else skeleton = <WorkspaceSkeleton type="snippets" />

  return (
    <div role="status" aria-label="Loading page">
      {skeleton}
    </div>
  )
}

export default RouteLoadingSkeleton
