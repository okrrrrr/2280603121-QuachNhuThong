import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { passengerService } from '../../services/passenger.service';
import { Link } from 'react-router-dom';

export default function MyTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      passengerService.getTickets(user._id)
        .then(setTickets)
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ACTIVE': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">Hiệu lực</span>;
      case 'USED': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">Đã sử dụng</span>;
      case 'EXPIRED': return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">Hết hạn</span>;
      default: return null;
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vé Của Tôi</h1>
          <p className="text-gray-500 mt-1">Danh sách vé tàu điện hiện có của bạn.</p>
        </div>
        <Link to="/passenger/purchase" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow flex gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Mua vé mới
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>)}
        </div>
      ) : tickets.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
           <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
           <h3 className="text-lg font-bold text-gray-900">Chưa có vé nào</h3>
           <p className="text-gray-500 mt-2 mb-6">Bạn chưa mua bất kỳ vé tàu điện nào. Hãy mua ngay để bắt đầu chuyến đi!</p>
           <Link to="/passenger/purchase" className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Tới trang mua vé</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col relative group">
              <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              <div className="flex-1 p-5 border-b border-dashed border-gray-300 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{ticket.id}</span>
                    <h3 className="text-xl font-black text-gray-900 mt-1">{ticket.name}</h3>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>

                <div className="flex items-center gap-4 py-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1 font-medium">GA ĐI</p>
                    <p className="font-bold text-gray-800">{ticket.origin}</p>
                  </div>
                  <div className="text-gray-300 px-2 lg:px-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-500 mb-1 font-medium">GA ĐẾN</p>
                    <p className="font-bold text-gray-800">{ticket.destination}</p>
                  </div>
                </div>

                <div className="absolute -left-3 -bottom-3 w-6 h-6 bg-gray-50 rounded-full border border-gray-200 border-r-transparent border-t-transparent rotate-45"></div>
                <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-gray-50 rounded-full border border-gray-200 border-l-transparent border-t-transparent -rotate-45"></div>
              </div>

              <div className="bg-gray-50 p-5 flex items-center justify-between">
                <div>
                   <p className="text-xs text-gray-500 mb-1 font-medium">NGÀY MUA</p>
                   <p className="text-sm font-semibold text-gray-700">{new Date(ticket.purchaseDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="w-16 h-16 bg-white border border-gray-200 rounded p-1">
                   {/* Fake QR pattern via CSS Grid */}
                   <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-0.5 opacity-80">
                      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i => (
                          <div key={i} className={`bg-gray-800 ${i%2===0 || i%3===0 ? 'block' : 'opacity-0'}`}></div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
