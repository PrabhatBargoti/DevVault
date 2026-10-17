import { useEffect, useState } from 'react'
import SEO from '../Components/SEO'
import DashboardHeader from '../Components/DashboardHeader'
import Sidebar from '../Pages/Sidebar'
import HomeEmpty from '../Pages/Homepage/HomeEmpty/HomeEmpty'
import HomeFill from '../Pages/Homepage/HomeFill/HomeFill'
import { getHasCreatedSnippet, getSavedSnippets, saveSnippets } from '../Utils/snippetStorage'

const Home = () => {
  const [snippets, setSnippets] = useState(getSavedSnippets)
  const [hasCreatedSnippet] = useState(getHasCreatedSnippet)

  useEffect(() => {
    saveSnippets(snippets)
  }, [snippets])

  const deleteSnippet = (id) => {
    setSnippets((currentSnippets) => currentSnippets.filter((snippet) => snippet.id !== id))
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title="Home"
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge."
        path="/home"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        {snippets.length > 0 || hasCreatedSnippet ? (
          <HomeFill snippets={snippets} onDelete={deleteSnippet} />
        ) : (
          <HomeEmpty />
        )}
      </div>
    </div>
  )
}

export default Home
