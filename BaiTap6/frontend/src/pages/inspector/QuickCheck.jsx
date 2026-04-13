import React, { useState } from 'react';
import { inspectorService } from '../../services/inspector.service';

export default function QuickCheck() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (type) => {
    setIsScanning(true);
    setResult(null);

    // Mock API call to simulate scan outcome
    try {
      const res = await inspectorService.quickCheck(type);
      setResult(res);
    } catch (error) {
       console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Thiết Bị PDA</h1>
        <p className="text-gray-500 mt-1">Giả lập Scan QR hoặc chạm thẻ NFC nhanh.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
         {/* Fake Screen UI */}
         <div className="bg-gray-900 p-8 h-80 flex flex-col items-center justify-center relative">
            
            {/* Animated Scan Line */}
            {isScanning && (
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)] animate-scan z-10"></div>
            )}

            {isScanning ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative flex justify-center items-center">
                      <div className="absolute animate-ping w-24 h-24 rounded-full border border-blue-500 opacity-50"></div>
                      <div className="absolute animate-ping w-16 h-16 rounded-full border border-blue-400 opacity-70" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-12 h-12 rounded-full border-4 border-blue-500 animate-pulse bg-transparent"></div>
                  </div>
                  <p className="text-blue-400 font-mono tracking-widest text-sm uppercase font-bold mt-4">ĐANG ĐỌC TÍN HIỆU...</p>
                </div>
            ) : !result ? (
                <div className="text-gray-500 flex flex-col items-center">
                    <svg className="w-24 h-24 text-gray-700 opacity-50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v4m0 0l3-3m-3 3L9 5m7 5h4M4 10h4m9 4V9a2 2 0 00-2-2m-2 2v4a2 2 0 00-2-2"></path></svg>
                    <p className="font-mono text-sm tracking-widest">CHỜ THIẾT BỊ HOẶC MÃ QR</p>
                </div>
            ) : (
                <div className={`p-6 bg-white w-full rounded-xl text-center shadow-lg border-2 ${result.status === 'ALLOW' ? 'border-green-500 block' : 'border-red-500 animate-pulse'}`}>
                    {result.status === 'ALLOW' ? (
                       <>
                         <svg className="w-16 h-16 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         <h3 className="text-xl font-bold text-gray-900">{result.message}</h3>
                         <p className="text-sm font-bold text-gray-500 mt-2">{result.ticketInfo.type}</p>
                         <p className="text-sm font-bold text-indigo-600">{result.ticketInfo.name}</p>
                       </>
                    ) : (
                       <>
                         <svg className="w-16 h-16 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                         <h3 className="text-xl font-bold text-gray-900">{result.message}</h3>
                         <p className="text-sm text-red-500 font-bold mt-2">ĐỀ NGHỊ KIỂM TRA LẠI HOẶC LẬP BIÊN BẢN.</p>
                       </>
                    )}
                </div>
            )}
         </div>

         <div className="bg-gray-100 p-6 flex flex-col gap-4">
             <button 
                onClick={() => handleScan('qr')}
                disabled={isScanning}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                QUÉT CAMERA QR (GIẢ LẬP)
             </button>
             <button 
                onClick={() => handleScan('nfc')}
                disabled={isScanning}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                CHẠM THẺ NFC (GIẢ LẬP)
             </button>
         </div>
      </div>
    </div>
  );
}
