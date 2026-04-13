import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { passengerService } from '../../services/passenger.service';

const QUICKS_AMOUNTS = [20000, 50000, 100000, 200000, 500000];

export default function TopUp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchBalance = () => {
    if (user?._id) passengerService.getWalletBalance(user._id).then(setBalance);
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  const handleTopUp = async (e) => {
    e.preventDefault();
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount < 10000) return;

    setIsSubmitting(true);
    try {
      await passengerService.topUp(user._id, numAmount);
      setSuccessMsg(`Bạn đã nạp thành công ${numAmount.toLocaleString()}đ vào ví.`);
      setAmount('');
      fetchBalance();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Nạp Tiền Ví Tàu Điện</h1>
        <p className="text-gray-500 mt-1">Giao dịch an toàn, tiện lợi.</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white text-center">
         <p className="text-blue-100 font-medium">Số dư hiện tại của bạn</p>
         <p className="text-4xl font-bold tracking-tight mt-2">{balance.toLocaleString()} ₫</p>
      </div>

      <form onSubmit={handleTopUp} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {successMsg && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 font-medium flex items-center justify-between">
                <span>{successMsg}</span>
                <button type="button" onClick={() => navigate('/passenger/purchase')} className="inline-flex items-center text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">Mua vé ngay &rarr;</button>
            </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Chọn số tiền nạp nhanh</label>
          <div className="flex flex-wrap gap-3">
            {QUICKS_AMOUNTS.map(amt => (
              <button 
                type="button" 
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm border-2 transition-colors ${amount === amt.toString() ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
              >
                {amt.toLocaleString()}đ
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Hoặc nhập số tiền khác (Tối thiểu 10,000đ)</label>
          <div className="relative">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-lg border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 bg-gray-50 border pl-4 pr-12"
              placeholder="VD: 50000"
              min="10000"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">VNĐ</span>
            </div>
          </div>
        </div>

        <button
            type="submit"
            disabled={isSubmitting || !amount || parseInt(amount) < 10000}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 hover:shadow-lg transition-all text-lg"
        >
            {isSubmitting ? 'Đang giao dịch...' : 'Xác Nhận Nạp Tiền'}
        </button>
      </form>
    </div>
  );
}
