import React from 'react'
import SEO from '../Components/SEO'
import snippetEmpty from '../Pages/Snipptes/SnippetEmpty/snippetEmpty'
import Sidebar from '../Pages/Sidebar'

const Snippets = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
        <SEO 
        title="Snippets" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/snippets" 
        noIndex />
        <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <snippetEmpty />
        </div>
    </div>
  )
}

export default Snippets