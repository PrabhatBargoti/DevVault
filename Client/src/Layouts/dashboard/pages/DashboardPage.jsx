import SEO from '../../../components/SEO'
import DashboardHeader from '../../../components/DashboardHeader'
import Sidebar from '../../../components/Sidebar'
import HomeEmpty from '../components/HomeEmpty'
import HomeFill from '../components/HomeFill'
import { getHasCreatedSnippet, setSnippets, useSnippets } from '../../../lib/snippetStore'

const Home = () => {
  const snippets = useSnippets()
  const hasCreatedSnippet = getHasCreatedSnippet()

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
