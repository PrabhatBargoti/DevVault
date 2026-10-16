import DashboardHeader from './DashboardHeader'
import EmptyVaultState from './EmptyVaultState'

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
