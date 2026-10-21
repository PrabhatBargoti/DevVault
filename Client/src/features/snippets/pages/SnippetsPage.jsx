import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import SnippetForm from '../components/SnippetForm'
import SnippetEmpty from '../components/snippetEmpty'
import Snippet from '../components/Snippet'
import DashboardHeader from '../../../shared/components/DashboardHeader'
import { getSavedSnippets, markSnippetCreated, saveSnippets } from '../lib/snippetStorage'

const Snippets = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [snippets, setSnippets] = useState(getSavedSnippets)
  const searchQuery = searchParams.get('search') || ''
  const categoryFilter = searchParams.get('category') || ''
  const tagFilter = searchParams.get('tag') || ''
  const [isCreateOpen, setIsCreateOpen] = useState(() => searchParams.get('create') === '1')

  const closeCreate = () => {
    setIsCreateOpen(false)
    if (searchParams.has('create')) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.delete('create')
      setSearchParams(nextSearchParams, { replace: true })
    }
  }

  const openCreate = () => {
    setIsCreateOpen(true)
    setSearchParams((current) => {
      const nextSearchParams = new URLSearchParams(current)
      nextSearchParams.set('create', '1')
      return nextSearchParams
    })
  }

  useEffect(() => {
    saveSnippets(snippets)
  }, [snippets])

  const createSnippet = (snippet) => {
    markSnippetCreated()
    setSnippets((currentSnippets) => [
      { ...snippet, id: `${Date.now()}`, createdAt: new Date().toISOString() },
      ...currentSnippets,
    ])
    closeCreate()
  }

  const deleteSnippet = (id) => {
    setSnippets((currentSnippets) => currentSnippets.filter((snippet) => snippet.id !== id))
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
        {isCreateOpen ? (
          <SnippetForm onClose={closeCreate} onSave={createSnippet} />
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
            onDelete={deleteSnippet}
          />
        )}
      </div>
    </div>
  )
}

export default Snippets
