import React, { useState } from 'react';
import { staffService } from '../../services/staff.service';

const CATEGORIES = ['Hỏng thiết bị soát vé', 'Kẹt vé trong máy', 'Hành khách báo mất đồ', 'Sự cố an ninh', 'Khác'];

export default function ReportIncident() {
  const [station, setStation] = useState('Bến Thành');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await staffService.reportIncident({ station, category, description });
      setSuccess(true);
      setDescription('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo sự cố</h1>
        <p className="text-gray-500 mt-1">Ghi nhận nhanh các vấn đề phát sinh tại ga tàu.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {success && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 font-medium flex gap-3 items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Báo cáo sự cố đã được gửi thành công đến Quản trị viên.
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nhà ga hiện tại</label>
                <select 
                    value={station} 
                    onChange={(e) => setStation(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500 p-2.5 bg-gray-50 border"
                >
                    <option value="Bến Thành">Ga Bến Thành</option>
                    <option value="Nhà Hát TP">Ga Nhà Hát TP</option>
                    <option value="Ba Son">Ga Ba Son</option>
                    <option value="Suối Tiên">Ga Suối Tiên</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phân loại sự cố</label>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500 p-2.5 bg-gray-50 border"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả sự cố chi tiết</label>
            <textarea 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập thông tin chi tiết để bộ phận kỹ thuật / an ninh nắm rõ tình hình..."
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-red-500 p-3 bg-gray-50 border"
                required
            />
        </div>

        <button
            type="submit"
            disabled={isSubmitting || !description.trim()}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-md disabled:bg-red-300 hover:bg-red-700 transition-colors flex justify-center items-center"
        >
            {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : 'Gửi Báo Cáo Sự Cố'}
        </button>
      </form>
    </div>
  );
}
