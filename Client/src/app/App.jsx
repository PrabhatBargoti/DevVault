import { Component, lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import RouteLoadingSkeleton from '../components/RouteLoadingSkeleton'
import OfflinePage from '../components/OfflinePage'
import ErrorPage from '../components/ErrorPage'

const SignUpPage = lazy(() => import('../Layouts/auth/SignUpPage'))
const LoginPage = lazy(() => import('../Layouts/auth/LoginPage'))
const TagsPage = lazy(() => import('../Layouts/tags/pages/TagsPage'))
const CategoriesPage = lazy(() => import('../Layouts/categories/pages/CategoriesPage'))
const NotFoundPage = lazy(() => import('../Layouts/not-found/NotFoundPage'))
const SettingsPage = lazy(() => import('../Layouts/settings/pages/SettingsPage'))
const LandingPage = lazy(() => import('../Layouts/landing/pages/LandingPage'))
const ForgotPasswordPage = lazy(() => import('../Layouts/auth/ForgotPasswordPage'))
const DashboardPage = lazy(() => import('../Layouts/dashboard/pages/DashboardPage'))
const SnippetsPage = lazy(() => import('../Layouts/snippets/pages/SnippetsPage'))
const SnippetDetailPage = lazy(() => import('../Layouts/snippets/pages/SnippetDetailPage'))

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
          <Suspense fallback={<RouteLoadingSkeleton />}>
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
          </Suspense>
        </div>
      ) : (
        <OfflinePage onRetry={() => setIsOnline(window.navigator.onLine)} />
      )}
    </AppErrorBoundary>
  )
}

export default App
