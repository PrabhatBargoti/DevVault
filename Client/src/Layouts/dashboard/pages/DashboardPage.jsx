import SEO from '../../../components/SEO'
import DashboardHeader from '../../../components/DashboardHeader'
import Sidebar from '../../../components/Sidebar'
import HomeEmpty from '../components/HomeEmpty'
import HomeFill from '../components/HomeFill'
import { getHasCreatedSnippet, setSnippetError, setSnippets, useSnippetError, useSnippets } from '../../../lib/snippetStore'
import { deleteSnippet as deleteSnippetRequest } from '../../../lib/snippetApi'

const Home = () => {
  const snippets = useSnippets()
  const snippetError = useSnippetError()
  const hasCreatedSnippet = getHasCreatedSnippet()

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
        title="Home"
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge."
        path="/home"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        {snippetError && <p role="alert" className="mx-5 mt-4 rounded-lg border border-[#61313A] bg-[#29191E] px-3 py-2.5 text-sm text-[#F08C97] sm:mx-6 lg:mx-12">{snippetError}</p>}
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
