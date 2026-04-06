import React, { useState, useMemo } from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowUpDown, Filter, ChevronUp, ChevronDown, CheckSquare, Square, X, Globe, TrendingUp, Info, Rocket, Gem } from 'lucide-react';
import { COLORS } from '../constants';

const Comparison: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['TR', 'US', 'SG']);
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'SEGRI', direction: 'desc' });
  const [filters, setFilters] = useState({ quadrant: 'All', typology: 'All' });
  
  const [comparisonMetric, setComparisonMetric] = useState<'all' | 'gem' | 'b_ready'>('all');

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data) return null;

  const handleToggle = (code: string) => {
    if (selectedCodes.includes(code)) {
        if(selectedCodes.length > 1) {
            setSelectedCodes(prev => prev.filter(c => c !== code));
        }
    } else {
      if (selectedCodes.length < 5) {
        setSelectedCodes(prev => [...prev, code]);
      } else {
          alert("Maksimum 5 ülke karşılaştırabilirsiniz.");
      }
    }
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    const isTextColumn = ['name', 'quadrant', 'typology'].includes(key);
    
    if (sortConfig.key === key) {
        direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
        direction = isTextColumn ? 'asc' : 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
      let temp = [...data];
      if (filters.quadrant !== 'All') temp = temp.filter(c => c.quadrant === filters.quadrant);
      if (filters.typology !== 'All') temp = temp.filter(c => c.typology === filters.typology);
      
      return temp.sort((a, b) => {
          const valA = (a as any)[sortConfig.key];
          const valB = (b as any)[sortConfig.key];
          if (valA === valB) return 0;
          if (valA === null || valA === undefined) return 1;
          if (valB === null || valB === undefined) return -1;
          if (typeof valA === 'string' && typeof valB === 'string') {
               return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          return sortConfig.direction === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [data, filters, sortConfig]);

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
      const obj: any = { subject: item.subject, fullMark: 100 };
      selectedCountries.forEach(c => {
          const codeMap: Record<string, string> = {
              'Risk (RTC)': 'RTC', 'İnov (ICT)': 'ICT', 'Özerk (IAW)': 'IAW', 'Tutku (PIM)': 'PIM', 'Sosyal (SCW)': 'SCW',
              'Finans (FA)': 'FA', 'Regül (RFQ)': 'RFQ', 'Pazar (MD)': 'MD', 'Bilgi (KI)': 'KI', 'Ağlar (EN)': 'EN'
          };
          obj[c.name] = (c as any)[codeMap[item.subject]];
      });
      return obj;
  });

  const chartColors = ['#1e40af', '#047857', '#b45309', '#be123c', '#7e22ce'];

  const SortHeader = ({ label, k }: { label: string, k: string }) => (
      <th className="px-6 py-4 border-b text-left text-xs font-black text-slate-800 uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort(k)}>
          <div className="flex items-center gap-2">
              {label}
              {sortConfig.key === k ? (
                  sortConfig.direction === 'asc' ? <ChevronUp size={16} className="text-blue-700"/> : <ChevronDown size={16} className="text-blue-700"/>
              ) : <ArrowUpDown size={14} className="opacity-30"/>}
          </div>
      </th>
  );

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-300">
        <h3 className="font-black text-xl mb-6 text-slate-950 flex items-center gap-3 tracking-tight">
            Seçilen Ülkeler <span className="text-xs font-black text-white bg-blue-800 px-3 py-1 rounded-full">{selectedCountries.length} / 5</span>
        </h3>
        <div className="flex flex-wrap gap-3">
            {selectedCountries.map(country => (
                <div key={country.code} className="flex items-center gap-3 bg-blue-50 border-2 border-blue-200 text-blue-900 px-4 py-2 rounded-2xl shadow-md group">
                    <span className="text-2xl drop-shadow-sm">{country.flag}</span>
                    <span className="font-black text-sm tracking-tight">{country.name}</span>
                    <button onClick={() => handleToggle(country.code)} className="text-blue-400 hover:text-red-700 transition-colors p-1 hover:bg-white rounded-lg">
                        <X size={18} />
                    </button>
                </div>
            ))}
            {selectedCountries.length < 5 && (
                <div className="px-6 py-2 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 text-sm font-black flex items-center bg-slate-50">
                    + Ülke Ekleyin
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-300 h-[550px]">
            <h3 className="font-black mb-8 text-center text-slate-950 text-lg uppercase tracking-widest">Bileşen Derinliği (Radar)</h3>
            <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: '900', fill: '#0f172a' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize: 9, fontWeight: '700'}} axisLine={false} />
                {selectedCountries.map((country, index) => (
                    <Radar
                        key={country.code}
                        name={country.name}
                        dataKey={country.name}
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

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-300 h-[550px]">
             <h3 className="font-black mb-8 text-center text-slate-950 text-lg uppercase tracking-widest">SEGRİ Performans Kıyaslama</h3>
             <ResponsiveContainer width="100%" height="90%">
                 <BarChart data={selectedCountries} layout="vertical" margin={{ left: 20, right: 40, top: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fontWeight: '900', fill: '#0f172a'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: '900'}} />
                    <Legend wrapperStyle={{paddingTop: '20px', fontWeight: '900', fontSize: '12px'}} />
                    <Bar dataKey="IES" fill="#1e40af" name="Bireysel (IES)" radius={[0, 10, 10, 0]} barSize={25} />
                    <Bar dataKey="EEF" fill="#7e22ce" name="Ekosistem (EEF)" radius={[0, 10, 10, 0]} barSize={25} />
                    <Bar dataKey="SEGRI" fill="#047857" name="SEGRİ Skoru" radius={[0, 10, 10, 0]} barSize={25} />
                 </BarChart>
             </ResponsiveContainer>
          </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-300 overflow-hidden">
          <div className="p-8 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-6 justify-between items-center">
              <h3 className="font-black text-xl text-slate-950 flex items-center gap-3 tracking-tight">
                  <Filter size={24} className="text-blue-800" />
                  Ülke Veri Seti & Matris
              </h3>
              
              <div className="flex gap-4">
                  <select 
                    value={filters.quadrant} 
                    onChange={(e) => setFilters(prev => ({...prev, quadrant: e.target.value}))}
                    className="px-5 py-3 rounded-2xl border-2 border-slate-300 text-sm font-black focus:ring-4 focus:ring-blue-500/10 outline-none bg-white transition-all shadow-sm"
                  >
                      <option value="All">Tüm Kadranlar</option>
                      {Array.from(new Set(data.map(c => c.quadrant))).map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
              </div>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                      <tr>
                          <th className="px-6 py-4 border-b text-center w-16">Seç</th>
                          <SortHeader label="Ülke" k="name" />
                          <SortHeader label="SEGRİ" k="SEGRI" />
                          <SortHeader label="Unicorn" k="unicornCount" />
                          <SortHeader label="IES" k="IES" />
                          <SortHeader label="EEF" k="EEF" />
                          <SortHeader label="Kadran" k="quadrant" />
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                      {processedData.map((country) => {
                          const isSelected = selectedCodes.includes(country.code);
                          return (
                              <tr key={country.code} className={`hover:bg-blue-50/50 transition-colors ${isSelected ? 'bg-blue-50/40' : ''}`}>
                                  <td className="px-6 py-4 text-center">
                                      <button 
                                        onClick={() => handleToggle(country.code)}
                                        className={`transition-all transform active:scale-90 ${isSelected ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
                                      >
                                          {isSelected ? <CheckSquare size={24} /> : <Square size={24} />}
                                      </button>
                                  </td>
                                  <td className="px-6 py-4 font-black text-slate-900 whitespace-nowrap">
                                      <div className="flex items-center gap-4">
                                          <span className="text-2xl p-1 bg-white rounded shadow-sm border border-slate-100">{country.flag}</span> 
                                          <span className="tracking-tight">{country.name}</span>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4 font-black text-blue-800 text-base tabular-nums">{country.SEGRI.toFixed(2)}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Gem size={18} className="text-purple-600" />
                                        <span className="font-black text-slate-900">{country.unicornCount}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 font-black text-slate-700">{country.IES.toFixed(2)}</td>
                                  <td className="px-6 py-4 font-black text-slate-700">{country.EEF.toFixed(2)}</td>
                                  <td className="px-6 py-4">
                                      <span className="px-4 py-1.5 rounded-full bg-slate-200 text-slate-950 text-[10px] font-black uppercase tracking-widest border border-slate-300">
                                          {country.quadrant}
                                      </span>
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
};

export default Comparison;