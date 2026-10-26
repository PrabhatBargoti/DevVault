import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../../../components/SEO'
import Sidebar from '../../../components/Sidebar'
import SnippetForm from '../components/SnippetForm'
import SnippetEmpty from '../components/snippetEmpty'
import Snippet from '../components/Snippet'
import DashboardHeader from '../../../components/DashboardHeader'
import { setSnippetError, setSnippets, useSnippetError, useSnippets } from '../../../lib/snippetStore'
import { createSnippet as createSnippetRequest, deleteSnippet as deleteSnippetRequest, updateSnippet as updateSnippetRequest } from '../../../lib/snippetApi'

const Snippets = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const snippets = useSnippets()
  const snippetError = useSnippetError()
  const searchQuery = searchParams.get('search') || ''
  const categoryFilter = searchParams.get('category') || ''
  const tagFilter = searchParams.get('tag') || ''
  const [isCreateOpen, setIsCreateOpen] = useState(() => searchParams.get('create') === '1')
  const [editingSnippet, setEditingSnippet] = useState(null)

  const closeCreate = () => {
    setIsCreateOpen(false)
    setEditingSnippet(null)
    if (searchParams.has('create')) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.delete('create')
      setSearchParams(nextSearchParams, { replace: true })
    }
  }

  const openCreate = () => {
    setEditingSnippet(null)
    setIsCreateOpen(true)
    setSearchParams((current) => {
      const nextSearchParams = new URLSearchParams(current)
      nextSearchParams.set('create', '1')
      return nextSearchParams
    })
  }

  const createSnippet = async (snippet) => {
    const savedSnippet = await createSnippetRequest(snippet)
    setSnippets((currentSnippets) => [savedSnippet, ...currentSnippets])
    closeCreate()
  }

  const editSnippet = (snippet) => {
    setEditingSnippet(snippet)
    setIsCreateOpen(false)
  }

  const updateSnippet = async (updates) => {
    const savedSnippet = await updateSnippetRequest(editingSnippet.id, updates)
    setSnippets((currentSnippets) => currentSnippets.map((snippet) => (
      snippet.id === editingSnippet.id ? savedSnippet : snippet
    )))
    closeCreate()
  }

  const deleteSnippet = async (id) => {
    setSnippetError('')
    try {
      await deleteSnippetRequest(id)
      setSnippets((currentSnippets) => currentSnippets.filter((snippet) => snippet.id !== id))
    } catch (error) {
      setSnippetError(error.message || 'Could not delete this snippet. Please try again.')
    }
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title="Snippets" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/snippets" 
        noIndex />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader user={user} />
        {snippetError && <p role="alert" className="mx-5 mt-4 rounded-lg border border-[#61313A] bg-[#29191E] px-3 py-2.5 text-sm text-[#F08C97] sm:mx-6 lg:mx-12">{snippetError}</p>}
        {isCreateOpen || editingSnippet ? (
          <SnippetForm
            key={editingSnippet?.id || 'new'}
            initialSnippet={editingSnippet || undefined}
            existingSnippets={snippets}
            onClose={closeCreate}
            onSave={editingSnippet ? updateSnippet : createSnippet}
          />
        ) : snippets.length === 0 ? (
          <SnippetEmpty onCreate={openCreate} />
        ) : (
          <Snippet
            key={`${categoryFilter}:${tagFilter}`}
            snippets={snippets}
            query={searchQuery}
            initialCategory={categoryFilter}
            tagFilter={tagFilter}
            onClearSearch={() => {
              const nextSearchParams = new URLSearchParams(searchParams)
              nextSearchParams.delete('search')
              nextSearchParams.delete('category')
              nextSearchParams.delete('tag')
              setSearchParams(nextSearchParams)
            }}
            onCreate={openCreate}
            onEdit={editSnippet}
            onDelete={deleteSnippet}
          />
        )}
      </div>
    </div>
  )
}

export default Snippets
