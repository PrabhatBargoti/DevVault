import { Routes, Route } from 'react-router-dom'
import SignUpPage from '../features/auth/pages/SignUpPage'
import LoginPage from '../features/auth/pages/LoginPage'
import TagsPage from '../features/tags/pages/TagsPage'
import CategoriesPage from '../features/categories/pages/CategoriesPage'
import NotFoundPage from '../features/not-found/NotFoundPage'
import SettingsPage from '../features/settings/pages/SettingsPage'
import LandingPage from '../features/landing/pages/LandingPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import SnippetsPage from '../features/snippets/pages/SnippetsPage'

const App = () => {
  return (
    <div className='bg-[#0B0D12] selection:bg-[#1C2029]'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Signup" element={<SignUpPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Home" element={<DashboardPage />} />
        <Route path="/Snippet" element={<SnippetsPage />} />
        <Route path="/Tags" element={<TagsPage />} />
        <Route path="/Categorie" element={<CategoriesPage />} />
        <Route path="/Setting" element={<SettingsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
