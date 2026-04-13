import React, { useState } from 'react';
import { inspectorService } from '../../services/inspector.service';

const VIOLATION_TYPES = [
  'Vượt rào soát vé',
  'Sử dụng vé sai đối tượng (VD: Vé học sinh)',
  'Vé giả mạo',
  'Hành vi gây rối',
  'Khác'
];

export default function CreateViolation() {
  const [formData, setFormData] = useState({
    passengerName: '',
    cmnd: '',
    violationType: VIOLATION_TYPES[0],
    penaltyAmount: 200000,
    description: ''
  });
  
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.passengerName) return;

    setIsSubmitting(true);
    try {
      await inspectorService.createViolation({
        ...formData,
        hasPhoto: photoCaptured,
        hasSignature: signatureDone
      });
      setSuccess(true);
      setFormData({
        passengerName: '', cmnd: '', violationType: VIOLATION_TYPES[0], penaltyAmount: 200000, description: ''
      });
      setPhotoCaptured(false);
      setSignatureDone(false);
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lập biên bản vi phạm</h1>
          <p className="text-gray-500 mt-1">Xử lý hành khách vi phạm nội quy tại khu vực ga metro.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        {success && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 font-medium flex gap-3 items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Biên bản xử phạt đã được lưu trữ thành công trên hệ thống.
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Họ & Tên Hành Khách</label>
                <input 
                    type="text" name="passengerName" value={formData.passengerName} onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 bg-gray-50 border"
                    required placeholder="Nguyễn Văn A"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Số CMND/CCCD</label>
                <input 
                    type="text" name="cmnd" value={formData.cmnd} onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 bg-gray-50 border"
                    required placeholder="079090..."
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hình thức vi phạm</label>
                <select 
                    name="violationType" value={formData.violationType} onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 bg-gray-50 border"
                >
                    {VIOLATION_TYPES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mức phạt (VNĐ)</label>
                <input 
                    type="number" name="penaltyAmount" value={formData.penaltyAmount} onChange={handleChange}
                    min="50000" step="50000"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 bg-gray-50 border font-bold text-orange-600"
                    required
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mô tả/Ghi chú</label>
            <textarea 
                rows={3} name="description" value={formData.description} onChange={handleChange}
                placeholder="Diễn biến sự việc..."
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 bg-gray-50 border"
            />
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row gap-4">
            <button 
                type="button" onClick={() => setPhotoCaptured(!photoCaptured)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 font-bold transition-colors ${photoCaptured ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {photoCaptured ? 'Đã Chụp Chân Dung' : 'Chụp Ảnh Chứng Cớ (Fake)'}
            </button>
            <button 
                type="button" onClick={() => setSignatureDone(!signatureDone)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 font-bold transition-colors ${signatureDone ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                {signatureDone ? 'Khách Đã Nhận Lỗi Ký Tên' : 'Yêu Cầu Ký Tên (Fake)'}
            </button>
        </div>

        <button
            type="submit"
            disabled={isSubmitting || !formData.passengerName}
            className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl shadow-md disabled:bg-orange-300 hover:bg-orange-700 hover:shadow-lg transition-all text-lg mt-4"
        >
            {isSubmitting ? 'Đang Xử Lý...' : 'Hoàn Tất Biên Bản & In'}
        </button>
      </form>
    </div>
  );
}
