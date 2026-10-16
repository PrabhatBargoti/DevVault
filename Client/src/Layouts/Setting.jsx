import React from "react";
import SEO from "../Components/SEO";
import Sidebar from "../Pages/Sidebar";
import SettingFill from "../Pages/Settings/SettingFill";

const Setting = () => {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
        <SEO title="Settings" description="Manage your DevVault account and application preferences." path="/settings" noIndex />
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
            <SettingFill />
        </div>
    </div>
  )
}

export default Setting