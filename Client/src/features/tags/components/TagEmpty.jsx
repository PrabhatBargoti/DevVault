import { useNavigate } from 'react-router-dom'
import { Plus, Tag } from 'lucide-react'

const TagEmpty = () => {
  const navigate = useNavigate()

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#252A37] bg-[#12151C] text-[#737C90]">
        <Tag aria-hidden="true" size={24} />
      </div>
      <h2 className="mt-5 text-base font-semibold text-[#E7E9EE] sm:text-lg">No tags yet</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[#8B93A7]">
        Add tags to your snippets to make them easier to organize and find later.
      </p>
      <button
        type="button"
        onClick={() => navigate('/Snippet?create=1')}
        className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7]"
      >
        <Plus aria-hidden="true" size={16} />
        Create a snippet
      </button>
    </section>
  )
}

export default TagEmpty
