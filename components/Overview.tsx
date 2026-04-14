
import React from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { COLORS } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { TrendingUp, Activity, BookOpen, MessageCircle, AlertTriangle, ChevronRight, Zap, Target, Brain, Heart, Layers, BarChart2 } from 'lucide-react';
import { CountryData } from '../types';
import { useLanguage } from '../LanguageContext';

const selectTop5 = (data: CountryData[]) => [...data].sort((a, b) => b.SEGRI - a.SEGRI).slice(0, 5);

const selectQuadrantCounts = (data: CountryData[]) => {
  const counts = data.reduce((acc, curr) => {
    acc[curr.quadrant] = (acc[curr.quadrant] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.keys(counts).map(key => ({
    name: key,
    value: counts[key]
  }));
};

const FormulaSection = () => {
  const { t } = useLanguage();
  return (
  <div className="bg-white p-10 rounded-3xl border border-gray-200 mb-10 shadow-xl hover-card">
    <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-50 text-gray-700 rounded-2xl">
            <BookOpen size={32} />
        </div>
        <h3 className="text-3xl font-black text-fintech-charcoal tracking-tighter">
          {t('SEGRİ Bilimsel Metodolojisi')}
        </h3>
    </div>
    
    <div className="bg-fintech-charcoal text-white p-10 rounded-3xl text-center mb-12 shadow-2xl border border-fintech-charcoal/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
          <Layers size={200} />
      </div>
      <div className="text-2xl md:text-4xl font-light flex flex-wrap justify-center items-center gap-4 relative z-10">
        <span className="text-gray-400 font-bold">SEGRİ = </span>
        <span className="font-black bg-white/10 px-6 py-3 rounded-2xl border border-gray-500/40 text-teal-400 shadow-lg hover-card">(0.60 × IES)</span>
        <span className="text-gray-700 text-3xl">+</span>
        <span className="font-black bg-white/10 px-6 py-3 rounded-2xl border border-fintech-coral/40 text-fintech-amber shadow-lg hover-card">(0.40 × EEF)</span>
      </div>
      <p className="mt-8 text-[11px] text-gray-400 font-black uppercase tracking-[0.5em] leading-relaxed">
        {t('Bireysel Girişimcilik Ruhu')} <span className="text-gray-700 mx-2">|</span> {t('Ekosistem Destekleyici Faktörler')}
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="p-8 rounded-3xl border border-gray-300 bg-gray-50/30 relative overflow-hidden group hover:border-fintech-teal transition-all">
        <div className="absolute top-0 left-0 w-2 h-full bg-teal-700"></div>
        <div className="flex items-center justify-between mb-8">
            <h4 className="text-2xl font-black text-fintech-charcoal">IES (Individual)</h4>
            <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg"><Brain size={24}/></div>
        </div>
        <p className="font-mono text-xs bg-white p-6 rounded-2xl border border-teal-300 mb-8 text-fintech-charcoal font-black leading-relaxed shadow-sm hover-card">
          IES = (0.22 × RTC) + (0.24 × ICT) + (0.18 × IAW) + (0.18 × PIM) + (0.18 × SCW)
        </p>
        <div className="space-y-4">
          {[
              { code: 'ICT', name: t('Yenilikçilik (İnovasyon)'), weight: '%24', color: '#047857', icon: <Target size={16}/> },
              { code: 'RTC', name: t('Risk Alma Cesareti'), weight: '%22', color: '#b91c1c', icon: <Zap size={16}/> },
              { code: 'IAW', name: t('Bağımsızlık İsteği'), weight: '%18', color: '#b45309', icon: <Activity size={16}/> },
              { code: 'PIM', name: t('İçsel Motivasyon (Tutku)'), weight: '%18', color: '#15803d', icon: <Heart size={16}/> },
              { code: 'SCW', name: t('Sosyal Katkı Odağı'), weight: '%18', color: '#7e22ce', icon: <TrendingUp size={16}/> }
          ].map((item) => (
              <div key={item.code} className="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-fintech-teal transition-colors group hover-card">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md group-hover:scale-110 transition-transform" style={{backgroundColor: item.color}}>
                      {item.code}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                      <div>
                        <span className="text-base font-black text-fintech-charcoal block">{item.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 uppercase">{item.icon} {item.code} {t('Bileşeni')}</span>
                      </div>
                      <span className="text-xs font-black text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{item.weight}</span>
                  </div>
              </div>
          ))}
        </div>
      </div>
      
      <div className="p-8 rounded-3xl border border-red-200 bg-red-50/30 relative overflow-hidden group hover:border-fintech-amber transition-all">
        <div className="absolute top-0 left-0 w-2 h-full bg-gray-700"></div>
        <div className="flex items-center justify-between mb-8">
            <h4 className="text-2xl font-black text-fintech-charcoal">EEF (Ecosystem)</h4>
            <div className="p-2 bg-red-50 text-gray-700 rounded-lg"><Layers size={24}/></div>
        </div>
        <p className="font-mono text-xs bg-white p-6 rounded-2xl border border-red-300 mb-8 text-fintech-charcoal font-black leading-relaxed shadow-sm hover-card">
          EEF = (0.20 × FA) + (0.20 × RFQ) + (0.20 × MD) + (0.20 × KI) + (0.20 × EN)
        </p>
        <div className="space-y-4">
           {[
              { code: 'FA', name: t('Finansman Erişimi'), weight: '%20', color: '#0369a1' },
              { code: 'RFQ', name: t('Regülasyon Kalitesi'), weight: '%20', color: '#c2410c' },
              { code: 'MD', name: t('Pazar Dinamikleri'), weight: '%20', color: '#9f1239' },
              { code: 'KI', name: t('Bilgi Altyapısı'), weight: '%20', color: '#3f6212' },
              { code: 'EN', name: t('Network ve Ağlar'), weight: '%20', color: '#4338ca' }
          ].map((item) => (
              <div key={item.code} className="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-fintech-amber transition-colors group hover-card">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md group-hover:scale-110 transition-transform" style={{backgroundColor: item.color}}>
                      {item.code}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                       <div>
                        <span className="text-base font-black text-fintech-charcoal block">{item.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.code} {t('Göstergesi')}</span>
                      </div>
                      <span className="text-xs font-black text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{item.weight}</span>
                  </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const Overview: React.FC = () => {
  const { data: topCountries, isLoading: isLoadingTop, isError: isErrorTop, error: errorTop } = useCountries<CountryData[]>({
    select: (data) => [...data].sort((a, b) => b.SEGRI - a.SEGRI).slice(0, 8)
  });

  const { data: pieData, isLoading: isLoadingQuad, isError: isErrorQuad, error: errorQuad } = useCountries<{name: string, value: number}[]>({
    select: selectQuadrantCounts
  });

  const [activeTab, setActiveTab] = React.useState('overview');
  const { t } = useLanguage();

  const getQuadColor = (name: string) => {
    if (name === "Iron Man") return COLORS.ironMan;
    if (name === "Captain America") return COLORS.captainAmerica;
    if (name === "Black Panther") return COLORS.blackPanther;
    return COLORS.spiderMan;
  };

  if (isErrorTop || isErrorQuad) return <ErrorState error={errorTop || errorQuad} />;

  return (
    <div className="animate-in fade-in duration-700 space-y-10">
        <div className="flex space-x-3 bg-fintech-gray p-2 rounded-2xl w-fit shadow-inner border border-gray-200">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'overview' ? 'bg-white text-fintech-charcoal shadow-lg transform scale-[1.03]' : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray'}`}
            >
                <div className="flex items-center gap-3 uppercase tracking-widest">
                    <Activity size={20} /> {t('Genel Bakış')}
                </div>
            </button>
            <button 
                onClick={() => setActiveTab('methodology')}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'methodology' ? 'bg-white text-fintech-charcoal shadow-lg transform scale-[1.03]' : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray'}`}
            >
                <div className="flex items-center gap-3 uppercase tracking-widest">
                    <BookOpen size={20} /> {t('Tam Metodoloji Rehberi')}
                </div>
            </button>
        </div>
        
        {activeTab === 'methodology' ? (
            <div className="space-y-12">
               <FormulaSection />
            </div>
        ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                {isLoadingTop ? <LoadingState /> : topCountries?.slice(0, 5).map((country, index) => (
                    <div key={country.code} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group hover-card">
                        <div className="flex justify-between items-start mb-6">
                             <span className="text-4xl font-black text-gray-200 group-hover:text-red-200 transition-colors">#0{index + 1}</span>
                             <span className="text-4xl shadow-md rounded-lg bg-white p-2">{country.flag}</span>
                        </div>
                        <div>
                             <h4 className="font-black text-fintech-charcoal text-2xl truncate tracking-tight">{t(country.name)}</h4>
                             <p className="text-[11px] font-black text-gray-700 uppercase tracking-widest mt-2">{t(country.quadrant)}</p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{t('SEGRİ PUANI')}</p>
                                <p className="font-black text-gray-700 text-3xl tabular-nums">{country.SEGRI.toFixed(1)}</p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-xl text-gray-700 group-hover:bg-fintech-coral group-hover:text-white transition-all">
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 h-[500px] hover-card">
                    <h3 className="text-2xl font-black text-fintech-charcoal mb-8 flex items-center gap-3 tracking-tight">
                        <Activity size={28} className="text-gray-700" /> {t('Küresel Kadran Dağılımı')}
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <BarChart data={pieData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="name" 
                            tick={{fontSize: 11, fontWeight: '900', fill: '#1e293b'}} 
                            axisLine={false} 
                            tickLine={false} 
                            dy={10}
                            tickFormatter={(value) => t(value)}
                          />
                          <YAxis 
                            allowDecimals={false} 
                            tick={{fontSize: 11, fontWeight: '700', fill: '#64748b'}} 
                            axisLine={false} 
                            tickLine={false}
                          />
                          <Tooltip 
                              cursor={{fill: '#f1f5f9'}} 
                              contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', fontWeight: '900'}}
                          />
                          <Bar dataKey="value" name={t('Ülke Sayısı')} radius={[10, 10, 0, 0]} barSize={60}>
                              {pieData?.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={getQuadColor(entry.name)} />
                              ))}
                          </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 h-[500px] hover-card">
                    <h3 className="text-2xl font-black text-fintech-charcoal mb-8 flex items-center gap-3 tracking-tight">
                        <BarChart2 size={28} className="text-fintech-charcoal" /> {t('Ülke Karşılaştırmaları (Top 8)')}
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <BarChart data={topCountries?.slice(0, 8)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="name" 
                            tick={{fontSize: 11, fontWeight: '900', fill: '#1e293b'}} 
                            axisLine={false} 
                            tickLine={false} 
                            dy={10}
                            tickFormatter={(value) => t(value)}
                          />
                          <YAxis 
                            tick={{fontSize: 11, fontWeight: '700', fill: '#64748b'}} 
                            axisLine={false} 
                            tickLine={false}
                            domain={[0, 100]}
                          />
                          <Tooltip 
                              cursor={{fill: '#f1f5f9'}} 
                              contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', fontWeight: '900'}}
                              labelFormatter={(label) => t(label)}
                          />
                          <Legend wrapperStyle={{fontSize: '12px', fontWeight: 'bold', paddingTop: '20px'}} />
                          <Bar dataKey="IES" name={t('IES (Bireysel)')} fill="#10b981" radius={[4, 4, 0, 0]} barSize={15} />
                          <Bar dataKey="EEF" name={t('EEF (Ekosistem)')} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={15} />
                      </BarChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </div>
        )}
    </div>
  );
};

export default Overview;
