
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import { useLanguage } from '../LanguageContext';
import { useCountries } from '../hooks';
import { CountryData } from '../types';
import { LoadingState, ErrorState } from './Common';
import { 
  Filter, Play, Pause, RotateCcw, Map as MapIcon, TrendingUp, 
  ChevronRight, Info, Search, Globe, LayoutGrid, BarChart3,
  ArrowLeftRight, X, Download
} from 'lucide-react';

const RegionalPerformance: React.FC = () => {
  const { t } = useLanguage();
  const { data: countries, isLoading, isError, error } = useCountries();
  const [view, setView] = useState<'map' | 'grid' | 'compare'>('grid');
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [compareList, setCompareList] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('Tümü');

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    return countries.filter(c => 
      (activeRegion === 'Tümü' || c.region === activeRegion) &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [countries, searchQuery, activeRegion]);

  const toggleCompare = (country: CountryData) => {
    setCompareList(prev => {
      if (prev.find(c => c.code === country.code)) {
        return prev.filter(c => c.code !== country.code);
      }
      if (prev.length >= 4) return prev;
      return [...prev, country];
    });
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredCountries.map(country => (
        <motion.div 
          layout
          key={country.code}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:border-fintech-coral transition-all group cursor-pointer hover-card"
          onClick={() => setSelectedCountry(country)}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-fintech-gray rounded-2xl flex items-center justify-center text-2xl font-black text-gray-500 group-hover:bg-red-50 group-hover:text-gray-700 transition-colors">
              {country.code}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleCompare(country); }}
              className={`p-2 rounded-xl border transition-all ${compareList.find(c => c.code === country.code) ? 'bg-gray-700 text-white border-gray-700' : 'bg-white text-gray-500 border-gray-200 hover:border-fintech-coral'}`}
            >
              <ArrowLeftRight size={18} />
            </button>
          </div>
          <h3 className="text-xl font-black text-fintech-charcoal mb-1">{t(country.name)}</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">{t(country.region || 'Bilinmiyor')}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">G-SBE</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-fintech-gray rounded-full overflow-hidden">
                  <div className="h-full bg-fintech-coral" style={{ width: `${country.gsbe?.score || 0}%` }} />
                </div>
                <span className="text-xs font-black text-fintech-charcoal">{country.gsbe?.score.toFixed(0) || 0}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">YEPE</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-fintech-gray rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: `${country.yepe?.score || 0}%` }} />
                </div>
                <span className="text-xs font-black text-fintech-charcoal">{country.yepe?.score.toFixed(0) || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCompare = () => (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 overflow-x-auto hover-card">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-fintech-charcoal">{t('Ülke Karşılaştırma')}</h2>
        <button onClick={() => setView('grid')} className="p-2 hover:bg-fintech-gray rounded-full transition-colors">
          <X size={24} />
        </button>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-200 text-xs font-black text-gray-500 uppercase tracking-widest">{t('Metrik')}</th>
            {compareList.map(c => (
              <th key={c.code} className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 text-gray-700 rounded-lg flex items-center justify-center font-black text-xs">{c.code}</div>
                  <span className="font-black text-fintech-charcoal">{t(c.name)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            { label: 'G-SBE', key: 'gsbe', color: 'text-fintech-coral' },
            { label: 'YEPE', key: 'yepe', color: 'text-gray-500' },
            { label: 'LHS (Yaşam Tarzı)', key: 'lifestyle', color: 'text-gray-700' },
            { label: 'IES (Yetkinlik)', key: 'IES', color: 'text-fintech-amber' },
          ].map(row => (
            <tr key={row.key} className="hover:bg-white/50 transition-colors">
              <td className="p-4 font-bold text-gray-700">{t(row.label)}</td>
              {compareList.map(c => {
                const val = (c as any)[row.key];
                const displayVal = typeof val === 'object' ? val.score : val;
                return (
                  <td key={c.code} className={`p-4 font-black text-lg ${row.color}`}>
                    {displayVal?.toFixed(1) || 0}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {compareList.length === 0 && (
        <div className="py-20 text-center">
          <ArrowLeftRight size={48} className="mx-auto text-gray-500/30 mb-4" />
          <p className="text-gray-500 font-medium">{t('Karşılaştırmak için en az 2 ülke seçin.')}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Top Navigation & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm hover-card">
          <button onClick={() => setView('grid')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'grid' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}>
            <LayoutGrid size={18} />
            {t('Liste Görünümü')}
          </button>
          <button onClick={() => setView('compare')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'compare' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}>
            <ArrowLeftRight size={18} />
            {t('Karşılaştır')}
            {compareList.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-white text-gray-700 rounded-md text-[10px]">{compareList.length}</span>}
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder={t('Ülke veya bölge ara...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-fintech-coral outline-none font-medium shadow-sm hover-card"
            />
          </div>
          <select 
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value)}
            className="px-4 py-3 bg-white rounded-2xl border border-gray-200 font-bold text-sm shadow-sm outline-none hover-card"
          >
            <option value="Tümü">{t('Tüm Bölgeler')}</option>
            <option value="Avrupa">{t('Avrupa')}</option>
            <option value="Asya Pasifik">{t('Asya Pasifik')}</option>
            <option value="Kuzey Amerika">{t('Kuzey Amerika')}</option>
            <option value="Orta Doğu">{t('Orta Doğu')}</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'grid' && renderGrid()}
          {view === 'compare' && renderCompare()}
        </AnimatePresence>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedCountry && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
              className="fixed inset-0 bg-fintech-charcoal/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-50 text-gray-700 rounded-2xl flex items-center justify-center text-3xl font-black">
                      {selectedCountry.code}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-fintech-charcoal">{t(selectedCountry.name)}</h2>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t(selectedCountry.region || 'Bilinmiyor')}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-fintech-gray rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-red-50 p-6 rounded-3xl border border-red-50">
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">G-SBE</p>
                    <p className="text-4xl font-black text-fintech-charcoal">{selectedCountry.gsbe?.score.toFixed(1) || 0}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                    <p className="text-[10px] font-black text-fintech-charcoal uppercase tracking-widest mb-1">YEPE</p>
                    <p className="text-4xl font-black text-teal-900">{selectedCountry.yepe?.score.toFixed(1) || 0}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black text-fintech-charcoal mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-fintech-coral" />
                      {t('Mevcut Performans Analizi')}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                          <span className="font-black text-fintech-charcoal">{t('Genel SEGRİ')}</span>
                          <div className="text-right">
                            <p className="text-[8px] font-black text-gray-500 uppercase">{t('PUAN')}</p>
                            <p className="text-sm font-black text-gray-700">{selectedCountry.SEGRI.toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                          <span className="font-black text-fintech-charcoal">{t('IES (Bireysel)')}</span>
                          <div className="text-right">
                            <p className="text-[8px] font-black text-gray-500 uppercase">{t('PUAN')}</p>
                            <p className="text-sm font-black text-fintech-charcoal">{selectedCountry.IES.toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                          <span className="font-black text-fintech-charcoal">{t('EEF (Ekosistem)')}</span>
                          <div className="text-right">
                            <p className="text-[8px] font-black text-gray-500 uppercase">{t('PUAN')}</p>
                            <p className="text-sm font-black text-fintech-charcoal">{selectedCountry.EEF.toFixed(1)}</p>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-fintech-charcoal mb-4 flex items-center gap-2">
                      <Info size={20} className="text-fintech-coral" />
                      {t('Veri Kaynakları')}
                    </h3>
                    <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs text-gray-700 leading-relaxed">
                      <p className="mb-2"><strong>{t('Yıl')}:</strong> 2024</p>
                      <p className="mb-2"><strong>{t('Kaynak')}:</strong> World Bank, WIPO, ITC, GEM</p>
                      <p><strong>{t('Tam Metodoloji Rehberi')}:</strong> {t('Normalize edilmiş ağırlıklı katkı modeli (G-SBE Standartları).')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button className="flex-1 py-4 bg-gray-700 text-white font-black rounded-2xl shadow-lg hover:bg-fintech-charcoal transition-all flex items-center justify-center gap-2">
                    <Download size={20} />
                    {t('Detaylı Rapor')}
                  </button>
                  <button 
                    onClick={() => toggleCompare(selectedCountry)}
                    className={`flex-1 py-4 font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${compareList.find(c => c.code === selectedCountry.code) ? 'bg-fintech-gray text-gray-700' : 'bg-white border border-gray-200 text-gray-700 hover:bg-white'}`}
                  >
                    <ArrowLeftRight size={20} />
                    {compareList.find(c => c.code === selectedCountry.code) ? t('Listeden Çıkar') : t('Karşılaştır')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionalPerformance;
