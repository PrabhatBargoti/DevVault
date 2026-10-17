import { useEffect, useState } from 'react'
import SEO from '../Components/SEO'
import Sidebar from '../Pages/Sidebar'
import SnippetForm from '../Pages/Snipptes/SnippetForm'
import SnippetEmpty from '../Pages/Snipptes/SnippetEmpty/snippetEmpty'
import Snippet from '../Pages/Snipptes/SnippetFill/Snippet'
import DashboardHeader from '../Components/DashboardHeader'

const STORAGE_KEY = 'devvault-snippets'

const getSavedSnippets = () => {
  try {
    const savedSnippets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(savedSnippets) ? savedSnippets : []
  } catch {
    return []
  }
}

const Snippets = ({ user }) => {
  const [snippets, setSnippets] = useState(getSavedSnippets)
  const [query, setQuery] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets))
  }, [snippets])

  const createSnippet = (snippet) => {
    setSnippets((currentSnippets) => [
      { ...snippet, id: `${Date.now()}`, createdAt: new Date().toISOString() },
      ...currentSnippets,
    ])
    setIsCreateOpen(false)
  }

  const deleteSnippet = (id) => {
    setSnippets((currentSnippets) => currentSnippets.filter((snippet) => snippet.id !== id))
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <SEO
        title="Snippets" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/snippets" 
        noIndex />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader user={user} />
        {isCreateOpen ? (
          <SnippetForm onClose={() => setIsCreateOpen(false)} onSave={createSnippet} />
        ) : snippets.length === 0 ? (
          <SnippetEmpty onCreate={() => setIsCreateOpen(true)} />
        ) : (
          <Snippet
            snippets={snippets}
            query={query}
            onQueryChange={setQuery}
            onCreate={() => setIsCreateOpen(true)}
            onDelete={deleteSnippet}
          />
        )}
      </div>
    </div>
  )
}

export default Snippets