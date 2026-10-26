import { Navigate, Outlet, useLocation } from 'react-router-dom'
import RouteLoadingSkeleton from '../components/RouteLoadingSkeleton'
import { useAuth } from './useAuth'

const RequireAuth = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <RouteLoadingSkeleton />
  if (!user) return <Navigate to="/Login" replace state={{ from: location }} />
  return <Outlet />
}

export default RequireAuth
