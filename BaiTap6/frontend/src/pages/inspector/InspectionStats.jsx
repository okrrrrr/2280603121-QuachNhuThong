import React, { useState, useEffect } from 'react';
import { inspectorService } from '../../services/inspector.service';
import { Link } from 'react-router-dom';

export default function InspectionStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    inspectorService.getStatistics()
      .then(setStats)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thống kê Kiểm tra</h1>
          <p className="text-gray-500 mt-1">Báo cáo hiệu suất và tỷ lệ vi phạm trong hệ thống.</p>
        </div>
        <Link to="/inspector/violation" className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 shadow">
            + Lập Biên Bản
        </Link>
      </div>

      {isLoading || !stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h4 className="text-gray-500 text-sm font-medium">Tổng Lượt Kiểm Tra</h4>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalChecks.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <h4 className="text-gray-500 text-sm font-medium">Tổng Số Vi Phạm</h4>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.totalViolations.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <h4 className="text-gray-500 text-sm font-medium">Tỷ Lệ Vi Phạm</h4>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.violationRate}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <h4 className="text-gray-500 text-sm font-medium">Số Biên Bản Đã Thu</h4>
                <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.paid} <span className="text-sm text-gray-500 font-normal">/ {stats.totalViolations}</span>
                </p>
                <p className="text-xs text-red-500 mt-1">{stats.unpaid} biên bản tồn đọng</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center min-h-[300px]">
             <h3 className="text-lg font-bold text-gray-900 mb-6">Biểu đồ tần suất vi phạm (7 ngày qua)</h3>
             <div className="w-full h-48 flex items-end justify-between gap-2 px-4">
                 {stats.recentTrend.map((val, idx) => {
                     const heightStr = `${Math.max(10, (val / Math.max(...stats.recentTrend)) * 100)}%`;
                     return (
                         <div key={idx} className="w-full flex flex-col items-center group relative cursor-pointer">
                             {/* Tooltip fake */}
                             <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity">
                                 {val} vụ
                             </div>
                             <div style={{ height: heightStr }} className="w-full bg-orange-100 rounded-t-md group-hover:bg-orange-500 transition-colors border-t-2 border-orange-500"></div>
                             <span className="text-xs text-gray-500 mt-2">Ngày {idx + 1}</span>
                         </div>
                     );
                 })}
             </div>
          </div>
        </>
      )}
    </div>
  );
}
