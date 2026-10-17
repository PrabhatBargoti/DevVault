import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import Categoriefill from '../components/Categoriefill'

const Categorie = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
        <SEO 
        title="Categories" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/categories" 
        noIndex />
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
            <Categoriefill />
        </div>
    </div>
  )
}

export default Categorie
