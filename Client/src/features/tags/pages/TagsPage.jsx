import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import DashboardHeader from '../../../shared/components/DashboardHeader'
import TagEmpty from '../components/TagEmpty'

const Tags = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
        <SEO 
        title="Tags" 
        description="Your DevVault workspace for managing code snippets, tags, categories, and developer knowledge." 
        path="/tags" 
        noIndex />
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
            <DashboardHeader />
            <TagEmpty />
        </div>
    </div>
  )
}

export default Tags
