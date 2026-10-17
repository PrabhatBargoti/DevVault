import { useState } from 'react'
import { LockKeyhole, MoreVertical, Trash2 } from 'lucide-react'

const SnippetCard = ({ snippet, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [deleteStep, setDeleteStep] = useState(0)
  const createdDate = new Date(snippet.createdAt || Date.now())
  const age = Math.floor((Date.now() - createdDate.getTime()) / 86400000)
  const ageLabel = age < 1 ? 'today' : age === 1 ? '1 day ago' : `${age} days ago`

  return (
    <article className="relative rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:p-4.5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 wrap-break-word text-sm font-semibold text-[#E7E9EE] sm:text-[15px]">{snippet.title}</h2>
        <div className="relative shrink-0">
          <button type="button" aria-label={`Options for ${snippet.title}`} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} className="flex h-8 w-8 items-center justify-center rounded-md text-[#737C90] hover:bg-[#1C2029] hover:text-[#E7E9EE]">
            <MoreVertical aria-hidden="true" size={17} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-9 z-10 min-w-36 rounded-lg border border-[#2B3040] bg-[#171B24] p-1 shadow-xl">
              <button type="button" onClick={() => { setIsMenuOpen(false); setDeleteStep(1) }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[#E38A91] hover:bg-[#242833]">
                <Trash2 aria-hidden="true" size={15} />
                Delete snippet
              </button>
            </div>
          )}
        </div>
      </div>
      {snippet.description && <p className="mt-2 wrap-break-word text-sm leading-5 text-[#8B93A7]">{snippet.description}</p>}
      {snippet.tags?.length > 0 && (
        <ul aria-label="Tags" className="mt-2.5 flex flex-wrap gap-1.5">
          {snippet.tags.map((tag) => <li key={tag} className="rounded-full border border-[#292E3B] bg-[#1A1E28] px-2.5 py-1 text-xs text-[#9BA3B6]">{tag}</li>)}
        </ul>
      )}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-[#737C90]">
        <span className="rounded bg-[#22243B] px-2 py-1 font-medium text-[#9290FF]">{snippet.language || 'Other'}</span>
        <span className="ml-auto inline-flex items-center gap-2">
          <LockKeyhole aria-hidden="true" size={13} />
          Private
          <span aria-hidden="true">·</span>
          {ageLabel}
        </span>
      </div>
      {deleteStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => event.target === event.currentTarget && setDeleteStep(0)}>
          <section role="alertdialog" aria-modal="true" aria-labelledby={`delete-snippet-title-${snippet.id}`} aria-describedby={`delete-snippet-description-${snippet.id}`} className="w-full max-w-sm rounded-xl border border-[#2B3040] bg-[#11141B] p-5 shadow-2xl sm:p-6">
            <h2 id={`delete-snippet-title-${snippet.id}`} className="text-base font-semibold text-[#E7E9EE]">
              {deleteStep === 1 ? 'Delete this snippet?' : 'Confirm permanent deletion'}
            </h2>
            <p id={`delete-snippet-description-${snippet.id}`} className="mt-2 text-sm leading-5 text-[#8B93A7]">
              {deleteStep === 1
                ? `You're about to delete “${snippet.title}”. Continue to review the final confirmation.`
                : `“${snippet.title}” will be permanently removed from your vault. This action cannot be undone.`}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setDeleteStep(0)} className="min-h-10 rounded-lg border border-[#2B3040] px-4 text-sm font-medium text-[#C7CBD5] hover:bg-[#1C2029]">Cancel</button>
              {deleteStep === 1 ? (
                <button type="button" onClick={() => setDeleteStep(2)} className="min-h-10 rounded-lg bg-[#8F3943] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#A8444F]">Continue</button>
              ) : (
                <button type="button" onClick={() => onDelete(snippet.id)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#8F3943] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#A8444F]">
                  <Trash2 aria-hidden="true" size={15} />
                  Delete permanently
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </article>
  )
}

export default SnippetCard