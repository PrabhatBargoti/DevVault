import { useState } from 'react'
import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import DashboardHeader from '../../../shared/components/DashboardHeader'
import Categoriefill from '../components/Categoriefill'
import { getSavedSnippets } from '../../snippets/lib/snippetStorage'

const Categorie = () => {
  const [snippets] = useState(getSavedSnippets)

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
