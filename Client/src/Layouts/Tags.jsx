import React from 'react'
import SEO from '../Components/SEO'
import Sidebar from '../Pages/Sidebar'
import TagEmpty from '../Pages/Tags/TagEmpty/TagEmpty'

const Tags = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
        <SEO 
        title="Tags" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/tags" 
        noIndex />
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
            <TagEmpty />
        </div>
    </div>
  )
}

export default Tags