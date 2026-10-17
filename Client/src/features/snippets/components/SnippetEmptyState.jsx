import { CodeXml, Plus } from 'lucide-react'

const SnippetEmptyState = ({ onCreate }) => (
  <section aria-labelledby="empty-snippets-title" className="flex w-full max-w-md flex-col items-center px-4 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#232733] bg-[#12151C] text-[#8B93A7]">
      <CodeXml aria-hidden="true" size={25} strokeWidth={1.8} />
    </div>
    <h2 id="empty-snippets-title" className="mt-5 text-base font-semibold text-[#E7E9EE] sm:text-lg">No snippets yet</h2>
    <p className="mt-3 max-w-sm text-sm leading-6 text-[#8B93A7] sm:text-[15px]">
      Save your first useful piece of code. It takes about ten seconds and saves you an hour later.
    </p>
    <button type="button" onClick={onCreate} className="mt-7 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9290FF] active:scale-[0.98] sm:w-auto">
      <Plus aria-hidden="true" size={17} />
      New snippet
    </button>
  </section>
)

export default SnippetEmptyState