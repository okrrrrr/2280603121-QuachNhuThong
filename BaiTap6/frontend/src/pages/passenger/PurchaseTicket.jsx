import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { passengerService } from '../../services/passenger.service';

const TICKET_TYPES = [
  { id: 'one-way', name: 'Vé một chiều', price: 15000 },
  { id: 'daily', name: 'Vé ngày (Không giới hạn)', price: 35000 },
  { id: 'monthly', name: 'Vé tháng', price: 200000 },
];

const STATIONS = [
  'Bến Thành', 'Nhà Hát TP', 'Ba Son', 'Văn Thánh', 'Tân Cảng', 'Thảo Điền', 'Suối Tiên'
];

export default function PurchaseTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [ticketType, setTicketType] = useState('one-way');
  const [origin, setOrigin] = useState(STATIONS[0]);
  const [destination, setDestination] = useState(STATIONS[6]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?._id) {
      passengerService.getWalletBalance(user._id).then(setBalance);
    }
  }, [user]);

  const selectedTicket = TICKET_TYPES.find(t => t.id === ticketType);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (ticketType === 'one-way' && origin === destination) {
      setError('Ga đi và ga đến không được trùng nhau');
      return;
    }

    if (balance < selectedTicket.price) {
      setError('Số dư ví không đủ. Vui lòng nạp thêm tiền.');
      return;
    }

    setIsSubmitting(true);
    try {
      await passengerService.purchaseTicket(user._id, {
        type: ticketType,
        name: selectedTicket.name,
        price: selectedTicket.price,
        origin: ticketType === 'one-way' ? origin : 'ALL',
        destination: ticketType === 'one-way' ? destination : 'ALL'
      });
      // Redirect to My Tickets
      navigate('/passenger/my-tickets');
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi mua vé');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mua Vé Mới</h1>
          <p className="text-gray-500 mt-1">Chọn tuyến đường và loại vé phù hợp với bạn.</p>
        </div>
        <div className="text-right bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-600 font-medium">Số dư khả dụng</p>
          <p className="text-xl font-bold text-blue-900">{balance.toLocaleString()}đ</p>
          <Link to="/passenger/top-up" className="text-xs text-blue-600 hover:underline font-medium">Nạp thêm ngay &rarr;</Link>
        </div>
      </div>

      <form onSubmit={handlePurchase} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 font-medium">
                {error}
            </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại vé</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TICKET_TYPES.map(type => (
              <label 
                key={type.id} 
                className={`relative flex flex-col p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${ticketType === type.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <input 
                  type="radio" 
                  name="ticketType" 
                  value={type.id} 
                  checked={ticketType === type.id}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="sr-only"
                />
                <span className="font-bold text-gray-900">{type.name}</span>
                <span className="text-blue-600 font-semibold mt-1">{type.price.toLocaleString()}đ</span>
                {ticketType === type.id && (
                  <div className="absolute top-2 right-2 text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {ticketType === 'one-way' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ga đi</label>
              <select 
                value={origin} 
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 bg-gray-50 border"
              >
                {STATIONS.map(s => <option key={`from-${s}`} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ga đến</label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 bg-gray-50 border"
              >
                {STATIONS.map(s => <option key={`to-${s}`} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-gray-500">Tổng thanh toán</p>
                <p className="text-3xl font-bold text-blue-600">{selectedTicket.price.toLocaleString()}đ</p>
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow disabled:opacity-75 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-lg transition-all"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Đang xử lý...
                    </span>
                ) : 'Đặt Mua Vé Ngay'}
            </button>
        </div>
      </form>
    </div>
  );
}
