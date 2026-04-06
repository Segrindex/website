import React, { useState } from 'react';
import { Link, Copy, Check, X, Clock } from 'lucide-react';
import { generateAccessToken, buildAccessLink } from '../accessUtils';

interface Props {
  onClose: () => void;
}

const EXPIRY_OPTIONS = [
  { label: '1 Saat', hours: 1 },
  { label: '24 Saat', hours: 24 },
  { label: '7 Gün', hours: 168 },
  { label: '30 Gün', hours: 720 },
];

const LinkGeneratorModal: React.FC<Props> = ({ onClose }) => {
  const [selectedHours, setSelectedHours] = useState(168);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const token = generateAccessToken(selectedHours);
    const link = buildAccessLink(token);
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-800 text-white">
              <Link size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Erişim Bağlantısı Oluştur</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tek Kullanımlık Giriş Linki</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-3">
              <Clock size={12} className="inline mr-1" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-4 gap-2">
              {EXPIRY_OPTIONS.map(opt => (
                <button
                  key={opt.hours}
                  onClick={() => { setSelectedHours(opt.hours); setGeneratedLink(''); }}
                  className={`py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                    selectedHours === opt.hours
                      ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 rounded-xl bg-blue-800 text-white font-black text-sm uppercase tracking-wider hover:bg-blue-900 active:scale-95 transition-all shadow-lg"
          >
            Bağlantı Oluştur
          </button>

          {generatedLink && (
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                Oluşturulan Bağlantı
              </label>
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="flex-1 text-xs text-slate-700 font-mono truncate">{generatedLink}</p>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                    copied ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700 hover:bg-blue-100 hover:text-blue-800'
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Bu bağlantı <span className="font-black text-slate-700">{EXPIRY_OPTIONS.find(o => o.hours === selectedHours)?.label}</span> geçerlidir. İstediğiniz kişiyle paylaşabilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkGeneratorModal;
