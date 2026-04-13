import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/staff.service';

export default function ValidationHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    staffService.getValidationHistory()
      .then(setHistory)
      .finally(() => setIsLoading(false));
  }, []);

  const getResultBadge = (result) => {
    if (result === 'ALLOW') {
      return <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Hợp lệ</span>;
    }
    if (result.includes('DENY')) {
      return <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">Từ chối</span>;
    }
    if (result === 'EXPIRED') {
      return <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">Hết hạn</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">{result}</span>;
  };

  const filteredHistory = history.filter(item => 
    item.ticketCode.toLowerCase().includes(filter.toLowerCase()) || 
    item.station.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử soát vé</h1>
          <p className="text-gray-500 mt-1">Quản lý và tra cứu vé đã quét tại các trạm.</p>
        </div>
        <div className="w-full sm:w-64">
           <input 
              type="text" 
              placeholder="Tìm mã vé, tên ga..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
           />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
           <div className="p-12 flex justify-center text-blue-500">
               <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
           </div>
        ) : filteredHistory.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Không tìm thấy lịch sử nào phù hợp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mã Giao Dịch</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mã Vé</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Ga Xử Lý</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Thời Gian</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">{row.ticketCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.station}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(row.time).toLocaleString('vi-VN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{getResultBadge(row.result)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
