import React, { useState, useMemo } from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { 
  Globe, 
  GraduationCap, 
  Lightbulb, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Scale, 
  Users2, 
  Construction, 
  TrendingUp,
  Info,
  ArrowRightLeft
} from 'lucide-react';

const ExtendedAnalysis: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const [selectedCode, setSelectedCode] = useState<string>('TR');

  const activeCountry = useMemo(() => 
    data?.find(c => c.code === selectedCode), 
  [data, selectedCode]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data || !activeCountry) return null;

  const pillarData = [
    { name: 'Eğitim (EDU)', val: activeCountry.EDU || 0, icon: GraduationCap, color: '#3B82F6' },
    { name: 'İnovasyon (INV)', val: activeCountry.INV || 0, icon: Lightbulb, color: '#F59E0B' },
    { name: 'Teknoloji (TECH)', val: activeCountry.TECH || 0, icon: Cpu, color: '#10B981' },
    { name: 'Rekabetçilik (COMP)', val: activeCountry.COMP || 0, icon: Zap, color: '#EF4444' },
    { name: 'Yönetişim (GOV)', val: activeCountry.GOV || 0, icon: ShieldCheck, color: '#6366F1' },
    { name: 'Hukuk (LAW)', val: activeCountry.LAW || 0, icon: Scale, color: '#8B5CF6' },
    { name: 'Toplumsal (SOC)', val: activeCountry.SOC || 0, icon: Users2, color: '#EC4899' },
    { name: 'Altyapı Yat.', val: activeCountry.INF_INV || 0, icon: TrendingUp, color: '#06B6D4' },
    { name: 'Altyapı Krit.', val: activeCountry.INF_CRT || 0, icon: Construction, color: '#F97316' },
  ];

  const radarData = pillarData.map(p => ({
    subject: p.name.split(' ')[0],
    A: p.val,
    fullMark: 100
  }));

  const scoreComparison = [
    { name: 'Orijinal SEGRİ', val: activeCountry.SEGRI || 0, color: '#94A3B8' },
    { name: 'Genişletilmiş SEGRİ', val: activeCountry.EXT_SEGRI || 0, color: '#1565C0' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Country Selector & Top Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Globe size={28} />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900">Küresel Meta-Analiz</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">9 Sütunlu Genişletilmiş Model</p>
            </div>
        </div>
        
        <select 
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="w-full md:w-64 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
        >
            {data.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Chart & Comparison */}
        <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[450px]">
                <h3 className="font-bold text-gray-800 mb-6 text-center">Makro Ekosistem Radar Analizi</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name={activeCountry.name}
                            dataKey="A"
                            stroke="#1565C0"
                            strokeWidth={3}
                            fill="#1565C0"
                            fillOpacity={0.15}
                        />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                    <ArrowRightLeft size={120} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
                    <TrendingUp size={16} /> Skor Kıyaslaması
                </h3>
                
                <div className="space-y-6 relative z-10">
                    {scoreComparison.map(s => (
                        <div key={s.name}>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-gray-400">{s.name}</span>
                                <span className="text-2xl font-black" style={{ color: s.color }}>{s.val.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${s.val}%`, backgroundColor: s.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] leading-relaxed text-gray-400 italic">
                    * Genişletilmiş SEGRİ, orijinal puanın %70'i ile bu sayfadaki 9 makro sütunun ortalamasının %30'unun birleşiminden oluşur.
                </div>
            </div>
        </div>

        {/* Global Pillar Cards */}
        <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pillarData.map((p, idx) => {
                    const Icon = p.icon;
                    return (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform" style={{ color: p.color }}>
                                    <Icon size={20} />
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-black text-gray-900 tabular-nums">{p.val.toFixed(1)}</div>
                                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Skor</div>
                                </div>
                            </div>
                            <h4 className="text-xs font-extrabold text-gray-700 leading-tight mb-2">{p.name}</h4>
                            <div className="w-full bg-gray-50 h-1 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${p.val}%`, backgroundColor: p.color }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Info size={18} /> Metodolojik Analiz Raporu
                </h4>
                <div className="space-y-4 text-xs text-blue-800 leading-relaxed">
                    <p>
                        <strong>Kültürel ve Kurumsal Uyum:</strong> {activeCountry.name} ekosisteminde, <b>Hukuk (LAW)</b> ve <b>Yönetişim (GOV)</b> sütunları, girişimcilik ruhunun (IES) kalıcı bir ekonomik değere dönüşüp dönüşmeyeceğini belirleyen ana katalizörlerdir.
                    </p>
                    <p>
                        <strong>Yatırım ve Altyapı Korelasyonu:</strong> Altyapı yatırımları (INF_INV) ile teknoloji adaptasyonu (TECH) arasındaki {activeCountry.TECH > 80 ? 'güçlü' : 'gelişmekte olan'} bağ, ülkenin "Unicorn" çıkarma kapasitesini doğrudan etkilemektedir.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-blue-200 font-bold text-center uppercase tracking-tighter">
                        Stratejik Odak: {pillarData.sort((a,b) => a.val - b.val)[0].name.toUpperCase()} alanındaki iyileştirme, SEGRİ skorunu %15'e kadar artırabilir.
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedAnalysis;