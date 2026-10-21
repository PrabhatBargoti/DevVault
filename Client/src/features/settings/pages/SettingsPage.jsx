import SEO from '../../../shared/components/SEO'
import Sidebar from '../../../shared/components/Sidebar'
import DashboardHeader from '../../../shared/components/DashboardHeader'
import SettingFill from '../components/SettingFill'

const Setting = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row md:pl-64">
      <SEO
        title="Settings"
        description="Manage your profile and local DevVault vault data."
        path="/settings"
        noIndex
      />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <SettingFill />
      </div>
    </div>
  )
}

export default Setting
