
import React, { useState, useEffect, useMemo } from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { MapPin, Trophy, TrendingUp, Activity, Users, Globe, Building2, AlertCircle, ChevronDown, Flag, Brain, Sword, Heart, Target, Hammer, Shield, Zap, Rocket, Gem, Layers, Percent, ArrowUpRight, CheckCircle2, Info, ChevronRight } from 'lucide-react';
import { COLORS } from '../constants';
import { SectorInfo } from '../types';

const CountryDetail: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const [selectedCode, setSelectedCode] = useState<string>('');

  useEffect(() => {
    if (data && data.length > 0 && !selectedCode) {
      setSelectedCode(data[0].code);
    }
  }, [data, selectedCode]);

  const stats = useMemo(() => {
    if (!data || !selectedCode) return null;
    const country = data.find(c => c.code === selectedCode);
    if (!country) return null;

    const sortedData = [...data].sort((a, b) => b.SEGRI - a.SEGRI);
    const rank = sortedData.findIndex(c => c.code === selectedCode) + 1;
    const totalCountries = data.length;

    const averages = {
      IES: data.reduce((acc, c) => acc + c.IES, 0) / totalCountries,
      EEF: data.reduce((acc, c) => acc + c.EEF, 0) / totalCountries,
      SEGRI: data.reduce((acc, c) => acc + c.SEGRI, 0) / totalCountries
    };

    return { country, rank, totalCountries, averages };
  }, [data, selectedCode]);

  const maturity = useMemo(() => {
      if (!stats) return null;
      const count = stats.country.unicornCount;
      if (count >= 100) return { label: 'Küresel Hub', level: 5, color: 'text-purple-700 bg-purple-50 border-purple-200', desc: 'Dünyayı şekillendiren inovasyon merkezi' };
      if (count >= 30) return { label: 'Olgun Ekosistem', level: 4, color: 'text-emerald-700 bg-emerald-50 border-emerald-200', desc: 'Sürekli unicorn üreten yapı' };
      if (count >= 10) return { label: 'Hızlanan', level: 3, color: 'text-blue-700 bg-blue-50 border-blue-200', desc: 'Ölçeklenme başarısı kanıtlanmış' };
      if (count >= 1) return { label: 'Gelişmekte Olan', level: 2, color: 'text-amber-700 bg-amber-50 border-amber-200', desc: 'İlk başarı hikayeleri sahnede' };
      return { label: 'Erken Aşama', level: 1, color: 'text-slate-700 bg-slate-50 border-slate-200', desc: 'Potansiyel henüz mobilize edilmemiş' };
  }, [stats]);

  const successRate = useMemo(() => {
    if (!stats) return 0;
    return stats.country.startupCount > 0 
      ? (stats.country.unicornCount / stats.country.startupCount) * 100 
      : 0;
  }, [stats]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data || !stats) return null;

  const { country, rank, totalCountries, averages } = stats;

  const getTypologyIcon = (type: string) => {
    switch(type) {
      case 'Gandalf Tipi': return <Brain className="w-5 h-5" />;
      case 'Aragorn Tipi': return <Sword className="w-5 h-5" />;
      case 'Frodo Tipi': return <Heart className="w-5 h-5" />;
      case 'Legolas Tipi': return <Target className="w-5 h-5" />;
      case 'Gimli Tipi': return <Hammer className="w-5 h-5" />;
      case 'Galadriel Tipi': return <Shield className="w-5 h-5" />;
      case 'Han Solo Tipi': return <Zap className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const radarData = [
    { subject: 'RTC', A: country.RTC, fullMark: 100 },
    { subject: 'ICT', A: country.ICT, fullMark: 100 },
    { subject: 'IAW', A: country.IAW, fullMark: 100 },
    { subject: 'PIM', A: country.PIM, fullMark: 100 },
    { subject: 'SCW', A: country.SCW, fullMark: 100 },
    { subject: 'FA', A: country.FA, fullMark: 100 },
    { subject: 'RFQ', A: country.RFQ, fullMark: 100 },
    { subject: 'MD', A: country.MD, fullMark: 100 },
    { subject: 'KI', A: country.KI, fullMark: 100 },
    { subject: 'EN', A: country.EN, fullMark: 100 },
  ];

  const comparisonData = [
    { name: 'IES', Ülke: country.IES, Ortalama: averages.IES },
    { name: 'EEF', Ülke: country.EEF, Ortalama: averages.EEF },
    { name: 'SEGRİ', Ülke: country.SEGRI, Ortalama: averages.SEGRI },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
           <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
             <Globe className="text-blue-700" size={28} /> Ülke Derinlik Analizi
           </h2>
           <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">Metodolojik Karşılaştırma Paneli</p>
        </div>
        <div className="relative">
            <select 
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm font-black rounded-xl focus:ring-4 focus:ring-blue-500/10 block w-72 p-4 pr-12 outline-none transition-all hover:bg-white shadow-sm"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
            >
                {data.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
        </div>
      </div>

      {/* Hero Score Card */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 rounded-[2.5rem] text-white p-10 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-10 opacity-5 transform translate-x-12 -translate-y-12 rotate-12 pointer-events-none">
              <Trophy size={400} />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                  <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl filter drop-shadow-xl">{country.flag}</span>
                      <div>
                          <h1 className="text-5xl font-black tracking-tighter leading-none">{country.name}</h1>
                          <div className="flex items-center gap-3 mt-3">
                              <span className="bg-white/10 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10">Sıralama #{rank}</span>
                              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-blue-500/20">{country.quadrant}</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                          <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">{getTypologyIcon(country.typology)}</div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Girişimci Tipi</span>
                          </div>
                          <div className="text-lg font-black">{country.typology}</div>
                      </div>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                          <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-300"><Rocket size={18} /></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Startup Hacmi</span>
                          </div>
                          <div className="text-lg font-black">{country.startupCount.toLocaleString()} <span className="text-xs text-slate-500 font-medium ml-1">Aktif Girişim</span></div>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl text-center shadow-inner">
                  <div className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Genel SEGRİ Skoru</div>
                  <div className="text-9xl font-black tracking-tighter tabular-nums mb-8 leading-none drop-shadow-2xl">{country.SEGRI.toFixed(1)}</div>
                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                      <div>
                          <div className="text-3xl font-black text-emerald-400 tabular-nums">{country.IES.toFixed(1)}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">IES (Bireysel)</div>
                      </div>
                      <div className="border-l border-white/10">
                          <div className="text-3xl font-black text-blue-400 tabular-nums">{country.EEF.toFixed(1)}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">EEF (Ekosistem)</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Ecosystem Maturity & Momentum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                      <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                          <Layers size={24} className="text-indigo-700" /> Ekosistem Olgunluk ve Momentum
                      </h3>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Sayısal hacimden niteliksel başarıya dönüşüm.</p>
                  </div>
                  {maturity && (
                      <div className={`px-4 py-2 rounded-xl text-xs font-black border ${maturity.color} shadow-sm animate-in zoom-in`}>
                          {maturity.label.toUpperCase()}
                      </div>
                  )}
              </div>

              <div className="grid grid-cols-5 gap-3 mb-12 relative z-10">
                  {[1, 2, 3, 4, 5].map((step) => {
                      const active = step <= (maturity?.level || 1);
                      return (
                          <div key={step} className="space-y-3">
                              <div className={`h-2.5 rounded-full transition-all duration-1000 ${active ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 'bg-slate-100'}`}></div>
                              <div className={`text-[10px] font-black text-center uppercase tracking-tighter ${active ? 'text-indigo-700' : 'text-slate-300'}`}>
                                  {step === 1 ? 'Early' : step === 2 ? 'Emerging' : step === 3 ? 'Rising' : step === 4 ? 'Mature' : 'Global Hub'}
                              </div>
                          </div>
                      );
                  })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-blue-400 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl group-hover:scale-110 transition-transform"><Rocket size={20}/></div>
                          <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">Girişim Hacmi (IES)</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                        "Yüksek startup adedi, bireysel risk alma iştahının (RTC) bir yansımasıdır. Toplumun girişimci enerjisini temsil eder."
                      </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 group hover:border-purple-400 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl group-hover:scale-110 transition-transform"><Gem size={20}/></div>
                          <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">Başarı Çıktısı (EEF)</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                        "Unicorn sayısı, ekosistemin (Finans, Regülasyon) ölçeklenme başarısıdır. Sistemin ne kadar verimli çalıştığını gösterir."
                      </p>
                  </div>
              </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 group transition-all hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                      <div className="p-3 bg-purple-50 text-purple-700 rounded-2xl"><Gem size={24} /></div>
                      <div className="text-right">
                          <div className="text-3xl font-black text-slate-950 tabular-nums">{country.unicornCount}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Unicorn Sayısı</div>
                      </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-3 py-1 rounded-lg">ÖLÇEKLENME GÜCÜ</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 group transition-all hover:scale-[1.02]">
                  <div className="flex justify-between items-start">
                      <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl"><Rocket size={24} /></div>
                      <div className="text-right">
                          <div className="text-3xl font-black text-slate-950 tabular-nums">{country.startupCount.toLocaleString()}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Aktif Startup</div>
                      </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">EKOSİSTEM HACMİ</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
              </div>
              <div className="bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2 text-indigo-400">
                      <Percent size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dönüşüm Verimliliği</span>
                  </div>
                  <div className="text-3xl font-black text-white tabular-nums mb-1">%{successRate.toFixed(3)}</div>
                  <p className="text-[9px] text-slate-500 font-bold leading-relaxed">Startup &rarr; Unicorn dönüşüm başarısı. Ekosistem verimliliğinin ana göstergesi.</p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-[450px]">
              <h3 className="font-black text-slate-900 mb-8 border-b border-slate-100 pb-4 text-center uppercase tracking-widest text-sm">10 Boyutlu Bileşen Radarı</h3>
              <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 900, fill: '#475569' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name={country.name}
                    dataKey="A"
                    stroke="#1d4ed8"
                    strokeWidth={4}
                    fill="#1d4ed8"
                    fillOpacity={0.15}
                  />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', fontWeight: '900' }} />
                </RadarChart>
              </ResponsiveContainer>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-[450px]">
              <h3 className="font-black text-slate-900 mb-8 border-b border-slate-100 pb-4 text-center uppercase tracking-widest text-sm">Global Ortalama Kıyaslaması</h3>
              <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 900, fill: '#475569' }} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '700' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', fontWeight: '900' }} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Bar dataKey="Ülke" fill="#1e40af" radius={[10, 10, 0, 0]} barSize={40} />
                    <Bar dataKey="Ortalama" fill="#e2e8f0" radius={[10, 10, 0, 0]} barSize={40} />
                  </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                 {country.SEGRI > averages.SEGRI 
                    ? <span className="text-emerald-700 font-black flex items-center justify-center gap-3 text-sm uppercase tracking-tight"><TrendingUp size={20}/> Küresel ortalamanın üzerindedir.</span> 
                    : <span className="text-orange-600 font-black flex items-center justify-center gap-3 text-sm uppercase tracking-tight"><AlertCircle size={20}/> Küresel ortalamanın altındadır.</span>}
              </div>
          </div>
      </div>
    </div>
  );
};

export default CountryDetail;
