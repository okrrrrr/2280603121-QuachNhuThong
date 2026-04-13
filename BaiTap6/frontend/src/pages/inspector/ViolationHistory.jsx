import React, { useState, useEffect } from 'react';
import { inspectorService } from '../../services/inspector.service';

export default function ViolationHistory() {
  const [violations, setViolations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    inspectorService.getViolations()
      .then(setViolations)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Danh sách Biên Bản Vi Phạm</h1>
        <p className="text-gray-500 mt-1">Lịch sử lập biên bản và tình trạng nộp phạt.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
           <div className="p-12 flex justify-center text-orange-500">
               <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
           </div>
        ) : violations.length === 0 ? (
          <div className="p-10 text-center text-gray-500 flex flex-col items-center">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Chưa có biên bản nào được lập trên hệ thống UI này.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mã Biên Bản</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Họ Tên & CMND</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Lỗi Vi Phạm</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mức Phạt</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Trạng Thái</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Ngày Khởi Tạo</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {violations.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">{v.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-900">{v.passengerName}</p>
                        <p className="text-xs text-gray-500">{v.cmnd}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{v.violationType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                        {v.penaltyAmount.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                        {v.status === 'PAID' ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">Đã nộp</span>
                        ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">Chưa nộp</span>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {new Date(v.date).toLocaleDateString('vi-VN')}
                    </td>
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
