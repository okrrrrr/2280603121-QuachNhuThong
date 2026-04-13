// frontend/src/services/dashboard.service.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardService = {
  getStats: async (role) => {
    await delay(800); // Simulate network latency
    
    switch (role) {
      case 'admin':
        return [
          { label: 'Tổng số người dùng', value: '1,250', color: 'bg-blue-500' },
          { label: 'Doanh thu hôm nay', value: '45,000,000đ', color: 'bg-green-500' },
          { label: 'Cổng đang hoạt động', value: '42/45', color: 'bg-purple-500' },
          { label: 'Sự cố cần xử lý', value: '3', color: 'bg-red-500' }
        ];
      case 'staff':
        return [
          { label: 'Vé đã scan (Ca làm)', value: '342', color: 'bg-green-500' },
          { label: 'Từ chối (Không hợp lệ)', value: '12', color: 'bg-red-500' },
          { label: 'Trạng thái cổng', value: 'Đang mở', color: 'bg-blue-500' }
        ];
      case 'inspector':
        return [
          { label: 'Đã kiểm tra (Hôm nay)', value: '128', color: 'bg-orange-500' },
          { label: 'Biên bản đã lập', value: '5', color: 'bg-red-500' },
          { label: 'Tỷ lệ vi phạm', value: '3.9%', color: 'bg-blue-500' }
        ];
      case 'passenger':
      default:
        return [
          { label: 'Vé đang có', value: '2', color: 'bg-blue-500' },
          { label: 'Chuyến đi trong tháng', value: '14', color: 'bg-green-500' },
          { label: 'Số dư ví', value: '150,000đ', color: 'bg-purple-500' }
        ];
    }
  },

  getRecentActivities: async (role) => {
    await delay(1000);
    
    const activities = [
      { id: 1, text: 'Nguyễn Văn A vừa mua vé tháng', time: '5 phút trước', type: 'info' },
      { id: 2, text: 'Phát hiện vé không hợp lệ tại Cổng 3 - Trạm Bến Thành', time: '15 phút trước', type: 'warning' },
      { id: 3, text: 'Hệ thống hoàn tất bảo trì định kỳ', time: '2 giờ trước', type: 'success' },
      { id: 4, text: 'Kiểm soát viên lập biên bản vi phạm #VP102', time: '3 giờ trước', type: 'error' },
    ];
    
    if (role === 'passenger') {
      return [
        { id: 1, text: 'Thanh toán thành công vé khứ hồi', time: 'Hôm qua', type: 'success' },
        { id: 2, text: 'Quẹt vé qua cổng Cầu Giấy', time: 'Hôm qua', type: 'info' },
      ];
    }
    
    return activities;
  },

  getNotifications: async () => {
    await delay(600);
    return [
      { id: 1, title: 'Bảo trì hệ thống', message: 'Hệ thống sẽ bảo trì từ 00:00 đến 02:00 ngày 20/05.', read: false },
      { id: 2, title: 'Mã giảm giá mới', message: 'Giảm 20% cho vé tuần. Nhập mã METRO20.', read: true },
    ];
  }
};

export default dashboardService;
