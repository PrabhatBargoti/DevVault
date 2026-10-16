import { useNavigate } from 'react-router-dom'
import { Archive, Plus } from 'lucide-react'

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

export default EmptyVaultState
