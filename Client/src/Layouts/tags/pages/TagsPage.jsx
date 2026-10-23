import { useState } from 'react'
import SEO from '../../../components/SEO'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import TagEmpty from '../components/TagEmpty'
import TagFill from '../components/TagFill'
import { getSavedSnippets } from '../../snippets/lib/snippetStorage'

const Tags = () => {
  const [snippets] = useState(getSavedSnippets)
  const hasTags = snippets.some((snippet) => snippet.tags?.some((tag) => tag.trim()))

  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title="Tags"
        description="Browse and organize your code snippets by tag."
        path="/tags"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        {hasTags ? <TagFill snippets={snippets} /> : <TagEmpty />}
      </div>
    </div>
  )
}

export default Tags
