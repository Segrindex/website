import React from 'react';
import { TrendingUp, Lock } from 'lucide-react';

const AccessGate: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#f1f5f9] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-blue-800 text-white shadow-lg">
            <TrendingUp size={36} />
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">SEGRİ</h1>
        <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-8">Girişimcilik Paneli</p>

        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-slate-100 text-slate-500">
            <Lock size={24} />
          </div>
        </div>

        <h2 className="text-lg font-black text-slate-800 mb-2">Erişim Gerekli</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Bu panele erişmek için size iletilen özel erişim bağlantısını kullanmanız gerekmektedir.
        </p>
      </div>
    </div>
  );
};

export default AccessGate;
