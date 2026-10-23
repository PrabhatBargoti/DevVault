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
const ChangePasswordPage = lazy(() => import('../Layouts/auth/ChangePasswordPage'))
const PrivacyPolicyPage = lazy(() => import('../Layouts/legal/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('../Layouts/legal/TermsPage'))
const DashboardPage = lazy(() => import('../Layouts/dashboard/pages/DashboardPage'))
const SnippetsPage = lazy(() => import('../Layouts/snippets/pages/SnippetsPage'))
const SnippetDetailPage = lazy(() => import('../Layouts/snippets/pages/SnippetDetailPage'))

const preloadRouteModules = () => {
  const routes = [
    ['signup', () => import('../Layouts/auth/SignUpPage')],
    ['login', () => import('../Layouts/auth/LoginPage')],
    ['tags', () => import('../Layouts/tags/pages/TagsPage')],
    ['categories', () => import('../Layouts/categories/pages/CategoriesPage')],
    ['not-found', () => import('../Layouts/not-found/NotFoundPage')],
    ['settings', () => import('../Layouts/settings/pages/SettingsPage')],
    ['landing', () => import('../Layouts/landing/pages/LandingPage')],
    ['forgot-password', () => import('../Layouts/auth/ForgotPasswordPage')],
    ['change-password', () => import('../Layouts/auth/ChangePasswordPage')],
    ['privacy-policy', () => import('../Layouts/legal/PrivacyPolicyPage')],
    ['terms', () => import('../Layouts/legal/TermsPage')],
    ['dashboard', () => import('../Layouts/dashboard/pages/DashboardPage')],
    ['snippets', () => import('../Layouts/snippets/pages/SnippetsPage')],
    ['snippet-detail', () => import('../Layouts/snippets/pages/SnippetDetailPage')],
  ]

  for (const [route, preload] of routes) {
    preload().catch((error) => {
      console.error(`Failed to preload the ${route} route:`, error)
    })
  }
}

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
    const connection = window.navigator.connection
    const shouldSkipPrefetch = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (!shouldSkipPrefetch) {
      const timeoutId = window.setTimeout(preloadRouteModules, 1200)
      return () => {
        window.clearTimeout(timeoutId)
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }

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
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
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
