import { Component, useEffect, useState } from 'react'
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
import SnippetDetailPage from '../features/snippets/pages/SnippetDetailPage'
import OfflinePage from '../shared/components/OfflinePage'
import ErrorPage from '../shared/components/ErrorPage'

class AppErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application render failed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage onRetry={() => window.location.reload()} />
    }

    return this.props.children
  }
}

const App = () => {
  const [isOnline, setIsOnline] = useState(() => window.navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AppErrorBoundary>
      {isOnline ? (
        <div className="bg-[#0B0D12] selection:bg-[#1C2029]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Signup" element={<SignUpPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Home" element={<DashboardPage />} />
            <Route path="/Snippet" element={<SnippetsPage />} />
            <Route path="/Snippet/:snippetId" element={<SnippetDetailPage />} />
            <Route path="/Tags" element={<TagsPage />} />
            <Route path="/Categorie" element={<CategoriesPage />} />
            <Route path="/Setting" element={<SettingsPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      ) : (
        <OfflinePage onRetry={() => setIsOnline(window.navigator.onLine)} />
      )}
    </AppErrorBoundary>
  )
}

export default App
