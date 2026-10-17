import React from 'react'
import SEO from '../Components/SEO'
import Sidebar from '../Pages/Sidebar'
import Categoriefill from '../Pages/Categorie/Categoriefill'

const Categorie = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
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