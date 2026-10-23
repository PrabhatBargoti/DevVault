import SEO from '../../../components/SEO'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import Categoriefill from '../components/Categoriefill'
import { useSnippets } from '../../../lib/snippetStore'

const Categorie = () => {
  const snippets = useSnippets()

  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title="Categories"
        description="Browse and organize your code snippets by category."
        path="/categories"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <Categoriefill snippets={snippets} />
      </div>
    </div>
  )
}

export default Categorie
