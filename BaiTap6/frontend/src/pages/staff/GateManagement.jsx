import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/staff.service';

export default function GateManagement() {
  const [gates, setGates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGates();
  }, []);

  const fetchGates = () => {
    setIsLoading(true);
    staffService.getGates()
      .then(setGates)
      .finally(() => setIsLoading(false));
  };

  const toggleGate = async (gate) => {
    const newStatus = gate.status === 'OPEN' ? 'CLOSED' : 'OPEN';
    
    // Optimistic update
    setGates(prev => prev.map(g => g.id === gate.id ? { ...g, status: newStatus } : g));
    
    try {
      await staffService.updateGateStatus(gate.id, newStatus);
    } catch (error) {
       console.error("Failed to update status");
       fetchGates(); // Rollback on error
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'OPEN': return 'text-green-600 bg-green-100 border-green-200';
      case 'CLOSED': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'ERROR': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý trạng thái cổng</h1>
          <p className="text-gray-500 mt-1">Điều khiển Đóng/Mở các cổng soát vé trong ca trực.</p>
        </div>
        <button onClick={fetchGates} className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && gates.length === 0 ? (
           [1, 2, 3, 4, 5].map(i => <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>)
        ) : (
          gates.map(gate => (
            <div key={gate.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Indicator Strip */}
                <div className={`absolute top-0 w-full h-1.5 ${gate.status === 'OPEN' ? 'bg-green-500' : gate.status === 'CLOSED' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{gate.id}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{gate.name}</p>
                
                <span className={`px-4 py-1.5 rounded-full font-bold text-sm border ${getStatusColor(gate.status)} mb-6`}>
                    {gate.status === 'OPEN' ? 'ĐANG MỞ' : gate.status === 'CLOSED' ? 'ĐÃ ĐÓNG' : 'LỖI HỆ THỐNG'}
                </span>

                <div className="w-full pt-4 border-t border-gray-100 flex gap-3">
                   {gate.status !== 'ERROR' ? (
                       <button 
                         onClick={() => toggleGate(gate)}
                         className={`flex-1 py-2 font-bold rounded-lg text-sm transition-all focus:ring-2 focus:outline-none ${gate.status === 'OPEN' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 shadow-sm'}`}
                       >
                         {gate.status === 'OPEN' ? 'ĐÓNG CỔNG' : 'MỞ CỔNG'}
                       </button>
                   ) : (
                       <button className="flex-1 py-2 font-bold rounded-lg text-sm bg-red-50 text-red-500 border border-red-100 cursor-not-allowed">
                          CẦN BẢO TRÌ
                       </button>
                   )}
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
