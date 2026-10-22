import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import DashboardHeader from '../../../shared/components/DashboardHeader'
import ErrorPage from '../../../shared/components/ErrorPage'
import SnippetForm from '../components/SnippetForm'
import { getSavedSnippets, saveSnippets } from '../lib/snippetStorage'

const SnippetDetailPage = () => {
  const { snippetId } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [snippets, setSnippets] = useState(getSavedSnippets)
  const [isEditing, setIsEditing] = useState(() => searchParams.get('edit') === '1')
  const snippet = snippets.find((savedSnippet) => String(savedSnippet.id) === snippetId)

  const closeEditing = () => {
    setIsEditing(false)
    if (searchParams.has('edit')) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.delete('edit')
      setSearchParams(nextSearchParams, { replace: true })
    }
  }

  const updateSnippet = (updates) => {
    const updatedSnippets = snippets.map((savedSnippet) => (
      String(savedSnippet.id) === snippetId ? { ...savedSnippet, ...updates } : savedSnippet
    ))
    saveSnippets(updatedSnippets)
    setSnippets(updatedSnippets)
    closeEditing()
  }

  if (!snippet) {
    return (
      <>
        <SEO
          title="Snippet unavailable"
          description="This snippet may have been deleted or is no longer available."
          path="/snippets"
          noIndex
        />
        <ErrorPage
          title="Snippet unavailable"
          message="We couldn’t find this snippet. It may have been deleted."
          actionLabel="Browse snippets"
          onRetry={() => navigate('/Snippet')}
        />
      </>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title={snippet.title}
        description={snippet.description || 'View a saved snippet in your DevVault workspace.'}
        path={`/snippets/${snippetId}`}
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        {isEditing ? (
          <SnippetForm
            initialSnippet={snippet}
            existingSnippets={snippets}
            onClose={closeEditing}
            onSave={updateSnippet}
          />
        ) : (
          <main className="flex-1 bg-[#0B0D12] px-4 pb-8 pt-6 sm:px-6 sm:pt-7 lg:px-12">
            <article className="mx-auto w-full max-w-4xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/Snippet')}
                  className="inline-flex min-h-10 items-center rounded-lg border border-[#2B3040] px-3 text-sm font-medium text-[#C7CBD5] transition-colors hover:bg-[#1C2029] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6E6BF4]"
                >
                  Back to snippets
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex min-h-10 items-center rounded-lg border border-[#5E5AE6] bg-[#6E6BF4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8280F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9290FF]"
                >
                  Edit snippet
                </button>
              </div>
              <h1 className="wrap-break-word text-2xl font-bold tracking-tight text-[#E7E9EE] sm:text-3xl">
                {snippet.title}
              </h1>
              {snippet.description && (
                <p className="mt-3 wrap-break-word text-sm leading-6 text-[#8B93A7] sm:text-base">
                  {snippet.description}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#9BA3B6]">
                <span className="rounded bg-[#22243B] px-2.5 py-1.5 font-medium text-[#9290FF]">
                  {snippet.language || 'Other'}
                </span>
                {snippet.category && (
                  <span className="rounded-full border border-[#292E3B] bg-[#1A1E28] px-2.5 py-1.5">
                    {snippet.category}
                  </span>
                )}
                {(snippet.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full border border-[#292E3B] bg-[#1A1E28] px-2.5 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
              <pre className="mt-6 max-w-full overflow-x-auto rounded-xl border border-[#252A37] bg-[#12151C] p-4 text-sm leading-6 text-[#C7CBD5] sm:p-5">
                <code>{snippet.code || 'No code saved for this snippet.'}</code>
              </pre>
            </article>
          </main>
        )}
      </div>
    </div>
  )
}

export default SnippetDetailPage
