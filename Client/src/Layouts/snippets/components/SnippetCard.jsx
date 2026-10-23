import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockKeyhole, MoreVertical, Pencil, Trash2 } from 'lucide-react'

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const cancelDeleteRef = useRef(null)
  const createdDate = new Date(snippet.createdAt || Date.now())
  const age = Math.floor((Date.now() - createdDate.getTime()) / 86400000)
  const ageLabel = age < 1 ? 'today' : age === 1 ? '1 day ago' : `${age} days ago`

  useEffect(() => {
    if (!isDeleteOpen) return undefined

    cancelDeleteRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsDeleteOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isDeleteOpen])

  return (
    <article className="relative rounded-xl border border-[#252A37] bg-[#12151C] p-4 sm:p-4.5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 wrap-break-word text-sm font-semibold text-[#E7E9EE] sm:text-[15px]">
          <Link
            to={`/Snippet/${encodeURIComponent(snippet.id)}`}
            className="rounded-sm hover:text-[#9290FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
          >
            {snippet.title}
          </Link>
        </h2>
        <div className="relative shrink-0">
          <button type="button" aria-label={`Options for ${snippet.title}`} aria-expanded={isMenuOpen} aria-haspopup="menu" onClick={() => setIsMenuOpen((open) => !open)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-[#8B93A7] transition-colors hover:border-[#2B3040] hover:bg-[#1C2029] hover:text-[#E7E9EE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]">
            <MoreVertical aria-hidden="true" size={17} />
          </button>
          {isMenuOpen && (
            <div role="menu" aria-label={`${snippet.title} actions`} className="absolute right-0 top-10 z-20 min-w-44 rounded-xl border border-[#2B3040] bg-[#171B24] p-1.5 shadow-xl shadow-black/30">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false)
                  if (onEdit) onEdit(snippet)
                  else navigate(`/Snippet/${encodeURIComponent(snippet.id)}?edit=1`)
                }}
                className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm font-medium text-[#C7CBD5] transition-colors hover:bg-[#242833] hover:text-white focus-visible:outline-2 focus-visible:outline-[#6E6BF4]"
              >
                <Pencil aria-hidden="true" size={15} />
                Edit snippet
              </button>
              <div aria-hidden="true" className="my-1 border-t border-[#2B3040]" />
              <button type="button" role="menuitem" onClick={() => { setIsMenuOpen(false); setIsDeleteOpen(true) }} className="flex min-h-10 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm font-medium text-[#E38A91] transition-colors hover:bg-[#352127] hover:text-[#F2A0A6] focus-visible:outline-2 focus-visible:outline-[#E87582]">
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
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && setIsDeleteOpen(false)}>
          <section role="alertdialog" aria-modal="true" aria-labelledby={`delete-snippet-title-${snippet.id}`} aria-describedby={`delete-snippet-description-${snippet.id}`} className="w-full max-w-sm rounded-2xl border border-[#2B3040] bg-[#11141B] p-5 shadow-2xl sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#352127] text-[#E38A91]">
              <Trash2 aria-hidden="true" size={19} />
            </div>
            <h2 id={`delete-snippet-title-${snippet.id}`} className="mt-4 text-base font-semibold text-[#E7E9EE]">
              Delete “{snippet.title}”?
            </h2>
            <p id={`delete-snippet-description-${snippet.id}`} className="mt-2 text-sm leading-5 text-[#8B93A7]">
              This snippet will be permanently removed from your vault. This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button ref={cancelDeleteRef} type="button" onClick={() => setIsDeleteOpen(false)} className="min-h-10 rounded-lg border border-[#2B3040] px-4 text-sm font-medium text-[#C7CBD5] transition-colors hover:bg-[#1C2029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]">Cancel</button>
              <button type="button" onClick={() => onDelete(snippet.id)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#8F3943] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#A8444F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E87582]">
                <Trash2 aria-hidden="true" size={15} />
                Delete snippet
              </button>
            </div>
          </section>
        </div>
      )}
    </article>
  )
}

export default SnippetCard