import { Plus } from 'lucide-react'
import SnippetEmptyState from './SnippetEmptyState'

const SnippetEmpty = ({ onCreate }) => (
  <main className="flex flex-1 flex-col bg-[#0B0D12]">
    <section className="flex items-start justify-between gap-4 px-5 pb-4 pt-7 sm:px-6 sm:pt-8 lg:px-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">My snippets</h1>
        <p className="mt-1.5 text-sm text-[#8B93A7] sm:text-[15px]">Nothing saved yet</p>
      </div>
      <button type="button" onClick={onCreate} className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] sm:px-4">
        <Plus aria-hidden="true" size={17} />
        <span className="hidden sm:inline">New snippet</span>
        <span className="sm:hidden">New</span>
      </button>
    </section>
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
      <SnippetEmptyState onCreate={onCreate} />
    </div>
  </main>
)

export default SnippetEmpty