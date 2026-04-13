import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Notification from './components/Notification'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const TicketValidation = lazy(() => import('./pages/TicketValidation'))
const ManualInspection = lazy(() => import('./pages/ManualInspection'))
const AdminUsers = lazy(() => import('./pages/AdminUsers'))
const PerformanceLab = lazy(() => import('./pages/PerformanceLab'))

function PageFallback() {
  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="metro/validate"
                element={
                  <ProtectedRoute allowedRoles={['staff', 'admin']}>
                    <TicketValidation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="metro/inspection"
                element={
                  <ProtectedRoute allowedRoles={['inspector', 'admin']}>
                    <ManualInspection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="performance/lab"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'staff']}>
                    <PerformanceLab />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Notification />
    </AuthProvider>
  )
}

export default App
