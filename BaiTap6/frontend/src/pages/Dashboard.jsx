import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { dashboardService } from '../services/dashboard.service'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState([])
  const [activities, setActivities] = useState([])
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.role) return
      
      setIsLoading(true)
      try {
        const [statsData, activitiesData, notificationsData] = await Promise.all([
          dashboardService.getStats(user.role),
          dashboardService.getRecentActivities(user.role),
          dashboardService.getNotifications()
        ])
        setStats(statsData)
        setActivities(activitiesData)
        setNotifications(notificationsData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [user?.role])

  const roleColors = {
    passenger: 'bg-blue-100 text-blue-800 border-blue-200',
    staff: 'bg-green-100 text-green-800 border-green-200',
    inspector: 'bg-orange-100 text-orange-800 border-orange-200',
    admin: 'bg-red-100 text-red-800 border-red-200'
  }

  const roleDescriptions = {
    passenger: 'Hành khách - Sử dụng hệ thống metro',
    staff: 'Nhân viên - Quản lý vé tại cổng',
    inspector: 'Kiểm soát viên - Kiểm tra vé thủ công',
    admin: 'Quản trị viên - Quản lý hệ thống'
  }

  const roleFeatures = {
    passenger: [
      'Xem thông tin tài khoản',
      'Mua vé metro',
      'Lịch sử giao dịch'
    ],
    staff: [
      'Kiểm tra vé tại cổng vào',
      'Xác nhận hợp lệ vé',
      'Báo cáo sự cố'
    ],
    inspector: [
      'Kiểm tra thủ công',
      'Lập biên bản vi phạm',
      'Xem lịch sử kiểm tra'
    ],
    admin: [
      'Quản lý người dùng',
      'Quản lý vé',
      'Xem báo cáo thống kê',
      'Cấu hình hệ thống'
    ]
  }

  // Activity type styling
  const getActivityColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      case 'info':
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back to Metro Ticket Management System</p>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className={`inline-flex px-3 py-1 mt-2 text-xs font-semibold rounded-full border ${roleColors[user?.role] || 'bg-gray-100'}`}>
              {roleDescriptions[user?.role]}
            </span>
          </div>
        </div>
      </div>

      {/* Loading State for Dynamic Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            <div className="h-28 bg-gray-200 rounded-xl"></div>
            <div className="h-28 bg-gray-200 rounded-xl"></div>
            <div className="h-28 bg-gray-200 rounded-xl"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${stat.color} rounded-l-xl`}></div>
                <h4 className="text-gray-500 text-sm font-medium">{stat.label}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Hoạt động gần đây
              </h3>
              <div className="space-y-4">
                {activities.length > 0 ? activities.map(activity => (
                  <div key={activity.id} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${getActivityColor(activity.type)}`}>
                       <span className="w-2 h-2 rounded-full bg-current"></span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có hoạt động nào.</p>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  Thông báo
                </div>
                {notifications.some(n => !n.read) && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {notifications.filter(n => !n.read).length} Mới
                  </span>
                )}
              </h3>
              <div className="space-y-4">
                {notifications.length > 0 ? notifications.map(notif => (
                  <div key={notif.id} className={`p-4 rounded-lg border ${notif.read ? 'bg-gray-50 border-gray-100' : 'bg-blue-50 border-blue-100'}`}>
                    <h4 className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-blue-900'}`}>{notif.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                  </div>
                )) : (
                  <p className="text-sm text-gray-500 text-center py-4">Không có thông báo mới.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Các chức năng khả dụng cho bạn</h3>
        <div className="flex flex-wrap gap-4">
          {user?.role === 'passenger' && (
            <>
              <Link to="/passenger/purchase" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                Mua vé tàu
              </Link>
              <Link to="/passenger/top-up" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Nạp tiền ví
              </Link>
              <Link to="/passenger/my-tickets" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                Vé của tôi
              </Link>
              <Link to="/passenger/transactions" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Lịch sử giao dịch
              </Link>
            </>
          )}

          {user?.role === 'staff' && (
            <>
              <Link to="/metro/validate" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Validate Vé
              </Link>
              <Link to="/staff/history" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Lịch sử soát vé
              </Link>
              <Link to="/staff/gates" className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                Quản lý cổng
              </Link>
              <Link to="/staff/incident" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Báo cáo sự cố
              </Link>
            </>
          )}

          {user?.role === 'inspector' && (
            <>
              <Link to="/metro/inspection" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Kiểm tra thủ công
              </Link>
              <Link to="/inspector/violation" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Lập biên bản
              </Link>
              <Link to="/inspector/history" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                Lịch sử phạt
              </Link>
              <Link to="/inspector/stats" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Thống kê
              </Link>
              <Link to="/inspector/quick-check" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors shadow-sm font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                PDA Scan
              </Link>
            </>
          )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin/users" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  Quản lý Users
                </Link>
                <Link to="/metro/validate" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium">
                  Validate Vé
                </Link>
                <Link to="/metro/inspection" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-medium">
                  Kiểm tra vé
                </Link>
              </>
            )}
          </div>
        </div>
    </div>
  )
}
