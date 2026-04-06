import React from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';

export const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-96 text-blue-800">
    <Loader2 className="animate-spin mb-4" size={48} />
    <h2 className="text-xl font-semibold">Veriler Yükleniyor...</h2>
    <p className="text-gray-500 mt-2">SEGRİ verileri hazırlanıyor</p>
  </div>
);

export const ErrorState: React.FC<{ error: unknown }> = ({ error }) => (
  <div className="flex flex-col items-center justify-center h-96 text-red-600">
    <ShieldAlert size={48} className="mb-4" />
    <h2 className="text-xl font-bold">Veri Yükleme Hatası</h2>
    <p className="text-gray-700 mt-2">{error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.'}</p>
  </div>
);