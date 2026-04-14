
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Download, Filter, ArrowUpDown, 
  ChevronLeft, ChevronRight, Globe, Table as TableIcon,
  BarChart2, Radar as RadarIcon, CheckSquare, Square, X, Gem, Info, Zap, Target
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { calculateGEE } from '../utils';

const DataAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const { data, isLoading, isError, error } = useCountries();
  const [activeSubTab, setActiveSubTab] = useState<'table' | 'compare'>('table');
  
  // Table State
  const [searchQuery, setSearchQuery] = useState('');
  const [tableSortConfig, setTableSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({ key: 'SEGRI', direction: 'desc' });
  const [activeRegion, setActiveRegion] = useState('All');

  // Comparison State
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['TR', 'US', 'SG']);
  const [compareSortConfig, setCompareSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'SEGRI', direction: 'desc' });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-gray-500 bg-gray-50';
    if (score >= 60) return 'text-fintech-coral bg-red-50';
    if (score >= 40) return 'text-fintech-amber bg-amber-50';
    return 'text-fintech-coral bg-red-50';
  };

  const processedTableData = useMemo(() => {
    let items = data.map(c => ({
      ...c,
      gee: calculateGEE(c.gsbe?.score || 0, c.yepe?.score || 0, c.lifestyle?.score || 0)
    }));
    
    // Filter
    items = items.filter(c => 
      (activeRegion === 'All' || c.region === activeRegion) &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort
    if (tableSortConfig !== null) {
      items.sort((a, b) => {
        let valA = (a as any)[tableSortConfig.key];
        let valB = (b as any)[tableSortConfig.key];

        if (valA && typeof valA === 'object' && 'score' in valA) valA = valA.score;
        if (valB && typeof valB === 'object' && 'score' in valB) valB = valB.score;

        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return tableSortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return tableSortConfig.direction === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
    }
    return items;
  }, [data, searchQuery, tableSortConfig, activeRegion]);

  const handleTableSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (tableSortConfig && tableSortConfig.key === key && tableSortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setTableSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    const headers = ['Country', 'Region', 'SEGRI', 'G-SBE', 'YEPE', 'LHS', 'IES', 'EEF', 'GEE'];
    const rows = processedTableData.map(c => [
      c.name,
      c.region,
      c.SEGRI.toFixed(1),
      c.gsbe?.score.toFixed(1) || '-',
      c.yepe?.score.toFixed(1) || '-',
      c.lifestyle?.score.toFixed(1) || '-',
      c.IES.toFixed(1),
      c.EEF.toFixed(1),
      c.gee.toFixed(1)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `segri_data_analysis_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Comparison Logic
  const handleToggleCompare = (code: string) => {
    if (selectedCodes.includes(code)) {
        if(selectedCodes.length > 1) {
            setSelectedCodes(prev => prev.filter(c => c !== code));
        }
    } else {
      if (selectedCodes.length < 5) {
        setSelectedCodes(prev => [...prev, code]);
      }
    }
  };

  const selectedCountries = data.filter(c => selectedCodes.includes(c.code));

  const radarData = [
    { subject: 'Risk (RTC)', fullMark: 100 },
    { subject: 'İnov (ICT)', fullMark: 100 },
    { subject: 'Özerk (IAW)', fullMark: 100 },
    { subject: 'Tutku (PIM)', fullMark: 100 },
    { subject: 'Sosyal (SCW)', fullMark: 100 },
    { subject: 'Finans (FA)', fullMark: 100 },
    { subject: 'Regül (RFQ)', fullMark: 100 },
    { subject: 'Pazar (MD)', fullMark: 100 },
    { subject: 'Bilgi (KI)', fullMark: 100 },
    { subject: 'Ağlar (EN)', fullMark: 100 },
  ];

  const radarChartData = radarData.map(item => {
      const obj: any = { subject: t(item.subject), fullMark: 100 };
      selectedCountries.forEach(c => {
          const codeMap: Record<string, string> = {
              'Risk (RTC)': 'RTC', 'İnov (ICT)': 'ICT', 'Özerk (IAW)': 'IAW', 'Tutku (PIM)': 'PIM', 'Sosyal (SCW)': 'SCW',
              'Finans (FA)': 'FA', 'Regül (RFQ)': 'RFQ', 'Pazar (MD)': 'MD', 'Bilgi (KI)': 'KI', 'Ağlar (EN)': 'EN'
          };
          obj[t(c.name)] = (c as any)[codeMap[item.subject]];
      });
      return obj;
  });

  const chartColors = ['#1e40af', '#047857', '#b45309', '#be123c', '#7e22ce'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-benchmark-light to-module-benchmark-dark"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-fintech-charcoal tracking-tight">{t('Veri Analizi & Karşılaştırma')}</h1>
            <p className="text-gray-500 mt-1 font-medium">{t('Tüm endekslerin detaylı listesi ve ülkeler arası kıyaslama araçları.')}</p>
          </div>
          <div className="flex bg-fintech-gray p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button
              onClick={() => setActiveSubTab('table')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-black uppercase tracking-wider
                ${activeSubTab === 'table' 
                  ? 'bg-white text-gray-700 shadow-md ring-1 ring-gray-200' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
            >
              <TableIcon size={18} />
              {t('Veri Tablosu')}
            </button>
            <button
              onClick={() => setActiveSubTab('compare')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-black uppercase tracking-wider
                ${activeSubTab === 'compare' 
                  ? 'bg-white text-gray-700 shadow-md ring-1 ring-gray-200' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
            >
              <BarChart2 size={18} />
              {t('Karşılaştırma')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeSubTab === 'table' ? (
            <motion.div 
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder={t('Ülke veya kod ara...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-fintech-coral outline-none font-medium transition-all"
                  />
                </div>
                <select 
                  value={activeRegion}
                  onChange={(e) => setActiveRegion(e.target.value)}
                  className="px-4 py-3 bg-white rounded-2xl border border-gray-200 font-bold text-sm outline-none focus:ring-2 focus:ring-fintech-coral transition-all"
                >
                  <option value="All">{t('Tüm Bölgeler')}</option>
                  {Array.from(new Set(data.map(c => c.region))).map(r => <option key={r} value={r}>{t(r)}</option>)}
                </select>
                <button 
                  onClick={exportToCSV}
                  className="px-6 py-3 bg-gray-700 text-white font-black rounded-2xl shadow-lg hover:bg-fintech-charcoal transition-all flex items-center gap-2 active:scale-95"
                >
                  <Download size={18} />
                  {t('Dışa Aktar')}
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white">
                      <th className="p-4 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:text-gray-700 transition-colors" onClick={() => handleTableSort('name')}>
                        <div className="flex items-center gap-2">
                          {t('Ülke')} <ArrowUpDown size={12} />
                        </div>
                      </th>
                      <th className="p-4 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:text-gray-700 transition-colors" onClick={() => handleTableSort('region')}>
                        <div className="flex items-center gap-2">
                          {t('Bölge')} <ArrowUpDown size={12} />
                        </div>
                      </th>
                      {[
                        { label: 'SEGRİ', key: 'SEGRI' },
                        { label: 'G-SBE', key: 'gsbe' },
                        { label: 'YEPE', key: 'yepe' },
                        { label: 'LHS', key: 'lifestyle' },
                        { label: 'IES', key: 'IES' },
                        { label: 'EEF', key: 'EEF' },
                        { label: 'GEE', key: 'gee' },
                      ].map(col => (
                        <th 
                          key={col.key} 
                          className="p-4 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:text-gray-700 transition-colors"
                          onClick={() => handleTableSort(col.key)}
                        >
                          <div className="flex items-center gap-2">
                            {t(col.label)} <ArrowUpDown size={12} />
                          </div>
                        </th>
                      ))}
                      <th className="p-4 border-b border-gray-200 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">
                        {t('Kıyasla')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {processedTableData.map(country => {
                      const isSelected = selectedCodes.includes(country.code);
                      return (
                        <tr key={country.code} className={`hover:bg-red-50/30 transition-colors group ${isSelected ? 'bg-red-50/20' : ''}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl p-1 bg-white rounded shadow-sm border border-gray-200">{country.flag}</span>
                              <span className="font-black text-fintech-charcoal">{t(country.name)}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-fintech-gray text-gray-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                              {t(country.region)}
                            </span>
                          </td>
                          {[
                            { key: 'SEGRI' },
                            { key: 'gsbe' },
                            { key: 'yepe' },
                            { key: 'lifestyle' },
                            { key: 'IES' },
                            { key: 'EEF' },
                            { key: 'gee' },
                          ].map(col => {
                            let val = (country as any)[col.key];
                            if (val && typeof val === 'object' && 'score' in val) val = val.score;
                            return (
                              <td key={col.key} className="p-4">
                                <span className={`px-3 py-1 rounded-lg font-black text-sm ${getScoreColor(Number(val))}`}>
                                  {typeof val === 'number' ? val.toFixed(1) : '-'}
                                </span>
                              </td>
                            );
                          })}
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleToggleCompare(country.code)}
                              className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-red-50 text-gray-700' : 'bg-fintech-gray text-gray-500 hover:bg-red-50 hover:text-fintech-coral'}`}
                              title={isSelected ? t('Kaldır') : t('Kıyaslamaya Ekle')}
                            >
                              {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="font-black text-lg mb-4 text-fintech-charcoal flex items-center gap-3">
                    {t('Kıyaslanacak Ülkeleri Seçin')} <span className="text-xs font-black text-white bg-gray-700 px-3 py-1 rounded-full">{selectedCountries.length} / 5</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                    {selectedCountries.map(country => (
                        <div key={country.code} className="flex items-center gap-3 bg-white border-2 border-red-200 text-fintech-charcoal px-4 py-2 rounded-2xl shadow-sm group hover-card">
                            <span className="text-2xl">{country.flag}</span>
                            <span className="font-black text-sm">{t(country.name)}</span>
                            <button onClick={() => handleToggleCompare(country.code)} className="text-fintech-amber hover:text-gray-700 transition-colors p-1 hover:bg-fintech-gray rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                    {selectedCountries.length < 5 && (
                        <div className="px-6 py-2 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 text-sm font-black flex items-center bg-white/50">
                            + {t('Ülke Ekleyin')}
                        </div>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-8 rounded-3xl shadow-lg border-x border-b border-gray-200 h-[500px] hover-card relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-benchmark-light to-module-benchmark-dark"></div>
                  <h3 className="font-black mb-6 text-center text-fintech-charcoal text-lg uppercase tracking-widest">{t('Bileşen Derinliği (Radar)')}</h3>
                  <ResponsiveContainer width="100%" height="85%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: '900', fill: '#0f172a' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 9, fontWeight: '700'}} axisLine={false} />
                      {selectedCountries.map((country, index) => (
                          <Radar
                              key={country.code}
                              name={t(country.name)}
                              dataKey={t(country.name)}
                              stroke={chartColors[index % chartColors.length]}
                              strokeWidth={3}
                              fill={chartColors[index % chartColors.length]}
                              fillOpacity={0.05}
                          />
                      ))}
                      <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: '900', fontSize: '12px'}} />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: '900'}} />
                      </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-x border-b border-gray-200 h-[500px] hover-card relative overflow-hidden">
                   <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-benchmark-light to-module-benchmark-dark"></div>
                   <h3 className="font-black mb-6 text-center text-fintech-charcoal text-lg uppercase tracking-widest">{t('SEGRİ Performans Kıyaslama')}</h3>
                   <ResponsiveContainer width="100%" height="85%">
                       <BarChart data={selectedCountries.map(c => ({...c, name: t(c.name)}))} layout="vertical" margin={{ left: 20, right: 40, top: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fontWeight: '900', fill: '#0f172a'}} axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: '900'}} />
                          <Legend wrapperStyle={{paddingTop: '20px', fontWeight: '900', fontSize: '12px'}} />
                          <Bar dataKey="IES" fill="#1e40af" name={t("Bireysel (IES)")} radius={[0, 10, 10, 0]} barSize={25} />
                          <Bar dataKey="EEF" fill="#7e22ce" name={t("Ekosistem (EEF)")} radius={[0, 10, 10, 0]} barSize={25} />
                          <Bar dataKey="SEGRI" fill="#047857" name={t("SEGRİ Skoru")} radius={[0, 10, 10, 0]} barSize={25} />
                       </BarChart>
                   </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-x border-b border-gray-200 overflow-hidden shadow-sm hover-card relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-benchmark-light to-module-benchmark-dark"></div>
                <div className="p-6 bg-white border-b border-gray-200">
                  <h4 className="font-black text-fintech-charcoal uppercase tracking-widest text-sm">{t('Hızlı Seçim Listesi')}</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-fintech-gray">
                      <tr>
                        <th className="p-4 text-center w-16">{t('Seç')}</th>
                        <th className="p-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">{t('Ülke')}</th>
                        <th className="p-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">{t('SEGRİ')}</th>
                        <th className="p-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">{t('G-SBE')}</th>
                        <th className="p-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">{t('YEPE')}</th>
                        <th className="p-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">{t('Kadran')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.map(country => {
                        const isSelected = selectedCodes.includes(country.code);
                        return (
                          <tr key={country.code} className={`hover:bg-red-50/30 transition-colors ${isSelected ? 'bg-red-50/20' : ''}`}>
                            <td className="p-4 text-center">
                              <button onClick={() => handleToggleCompare(country.code)} className={`transition-all ${isSelected ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}>
                                {isSelected ? <CheckSquare size={22} /> : <Square size={22} />}
                              </button>
                            </td>
                            <td className="p-4 font-black text-fintech-charcoal">
                              <div className="flex items-center gap-3">
                                <span>{country.flag}</span>
                                <span>{t(country.name)}</span>
                              </div>
                            </td>
                            <td className="p-4 font-black text-gray-700">{country.SEGRI.toFixed(1)}</td>
                            <td className="p-4 font-black text-fintech-charcoal">{country.gsbe?.score.toFixed(1) || '-'}</td>
                            <td className="p-4 font-black text-fintech-charcoal">{country.yepe?.score.toFixed(1) || '-'}</td>
                            <td className="p-4">
                              <span className="px-3 py-1 bg-fintech-gray rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                {t(country.quadrant)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataAnalysis;
