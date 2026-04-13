import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TicketValidation from './pages/TicketValidation'
import ManualInspection from './pages/ManualInspection'
import AdminUsers from './pages/AdminUsers'
import PurchaseTicket from './pages/passenger/PurchaseTicket'
import MyTickets from './pages/passenger/MyTickets'
import TopUp from './pages/passenger/TopUp'
import TransactionHistory from './pages/passenger/TransactionHistory'
import ValidationHistory from './pages/staff/ValidationHistory'
import ReportIncident from './pages/staff/ReportIncident'
import GateManagement from './pages/staff/GateManagement'
import CreateViolation from './pages/inspector/CreateViolation'
import ViolationHistory from './pages/inspector/ViolationHistory'
import InspectionStats from './pages/inspector/InspectionStats'
import QuickCheck from './pages/inspector/QuickCheck'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Notification from './components/Notification'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
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
              path="passenger/purchase"
              element={
                <ProtectedRoute allowedRoles={['passenger']}>
                  <PurchaseTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="passenger/my-tickets"
              element={
                <ProtectedRoute allowedRoles={['passenger']}>
                  <MyTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="passenger/top-up"
              element={
                <ProtectedRoute allowedRoles={['passenger']}>
                  <TopUp />
                </ProtectedRoute>
              }
            />
            <Route
              path="passenger/transactions"
              element={
                <ProtectedRoute allowedRoles={['passenger']}>
                  <TransactionHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="staff/history"
              element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <ValidationHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="staff/incident"
              element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <ReportIncident />
                </ProtectedRoute>
              }
            />
            <Route
              path="staff/gates"
              element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <GateManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="inspector/violation"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'admin']}>
                  <CreateViolation />
                </ProtectedRoute>
              }
            />
            <Route
              path="inspector/history"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'admin']}>
                  <ViolationHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="inspector/stats"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'admin']}>
                  <InspectionStats />
                </ProtectedRoute>
              }
            />
            <Route
              path="inspector/quick-check"
              element={
                <ProtectedRoute allowedRoles={['inspector', 'admin']}>
                  <QuickCheck />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Notification />
    </AuthProvider>
  )
}

export default App
