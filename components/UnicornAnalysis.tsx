
import React, { useState, useMemo } from 'react';
import { useCountries, useGlobalUnicorns, QUERY_KEYS } from '../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, Label } from 'recharts';
import { Rocket, Gem, TrendingUp, Globe, AlertCircle, RefreshCw, Filter, Search, X } from 'lucide-react';
import { COLORS } from '../constants';
import { CountryData } from '../types';

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-200 shadow-xl rounded-xl text-xs z-50">
        <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
            <span className="text-xl">{data.flag}</span>
            <div>
                <span className="font-bold text-gray-900 block text-sm">{data.name}</span>
                <span className="text-gray-500">{data.quadrant}</span>
            </div>
        </div>
        <div className="space-y-1">
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">EEF Puanı:</span>
                <span className="font-bold text-blue-600">{data.EEF.toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">Unicorn:</span>
                <span className="font-bold text-purple-600">{data.unicornCount}</span>
            </div>
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">Startups:</span>
                <span className="font-bold text-gray-700">{data.startupCount.toLocaleString()}</span>
            </div>
        </div>
      </div>
    );
  }
  return null;
};

// Define selectors outside to maintain referential stability
const selectUnicornCountries = (data: CountryData[]) => {
  // Only return necessary fields to improve structural sharing hit rate
  // And strictly filter for charts
  return data.map(c => ({
    name: c.name,
    code: c.code,
    flag: c.flag,
    unicornCount: c.unicornCount,
    startupCount: c.startupCount,
    EEF: c.EEF,
    quadrant: c.quadrant,
    typology: c.typology
  }));
};

const UnicornAnalysis: React.FC = () => {
  // Use selector to only subscribe to data changes relevant to this component
  const { data: countries, isLoading, isError, error, isRefetching } = useCountries({
    select: selectUnicornCountries
  });
  
  const { data: globalUnicorns, isLoading: isUnicornsLoading } = useGlobalUnicorns();
  
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ quadrant: 'All', typology: 'All' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.countries });
  };

  // Memoize unique values for dropdowns
  const quadrants = useMemo(() => {
    if (!countries) return [];
    return Array.from(new Set(countries.map(c => c.quadrant))).sort();
  }, [countries]);

  const typologies = useMemo(() => {
    if (!countries) return [];
    return Array.from(new Set(countries.map(c => c.typology))).sort();
  }, [countries]);

  // Filtered Data for Table
  const filteredTableData = useMemo(() => {
    if (!countries) return [];
    return countries.filter(c => {
        const matchQuad = filters.quadrant === 'All' || c.quadrant === filters.quadrant;
        const matchType = filters.typology === 'All' || c.typology === filters.typology;
        return matchQuad && matchType;
    }).sort((a,b) => b.startupCount - a.startupCount);
  }, [countries, filters]);

  // Filtered Global Unicorns
  const filteredGlobalUnicorns = useMemo(() => {
      if (!globalUnicorns) return [];
      const lowerTerm = searchTerm.toLowerCase();
      return globalUnicorns.filter(u => 
        u.name.toLowerCase().includes(lowerTerm) || 
        u.sector.toLowerCase().includes(lowerTerm) ||
        u.country.toLowerCase().includes(lowerTerm)
      );
  }, [globalUnicorns, searchTerm]);

  if (isLoading || isUnicornsLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!countries) return null;

  // Derived state from the selected data
  const unicornData = countries
    .filter(c => c.unicornCount > 0)
    .sort((a, b) => b.unicornCount - a.unicornCount);

  // Top 10 for bar chart
  const top10Unicorns = unicornData.slice(0, 10);

  // Split filtered data for Scatter Chart coloring
  const ironManData = unicornData.filter(c => c.quadrant === 'Iron Man');
  const capAmericaData = unicornData.filter(c => c.quadrant === 'Captain America');
  const blackPantherData = unicornData.filter(c => c.quadrant === 'Black Panther');
  const spiderManData = unicornData.filter(c => c.quadrant === 'Spider-Man');

  const totalUnicorns = countries.reduce((acc, c) => acc + c.unicornCount, 0);
  const totalStartups = countries.reduce((acc, c) => acc + c.startupCount, 0);
  const leader = top10Unicorns[0];
  const turkey = countries.find(c => c.code === 'TR');

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Header Stat Cards */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Unicorn Ekosistem Analizi</h2>
          <button 
            onClick={handleRefresh}
            disabled={isRefetching}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefetching ? "animate-spin" : ""} />
            {isRefetching ? "Veriler Güncelleniyor..." : "Verileri Güncelle (Fetch)"}
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shadow-sm">
                <Gem size={28} />
            </div>
            <div>
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Toplam Unicorn</p>
                <p className="text-2xl font-black text-gray-900">
                    {totalUnicorns.toLocaleString()}
                </p>
            </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg shadow-sm">
                <Rocket size={28} />
            </div>
            <div>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Aktif Startup</p>
                <p className="text-2xl font-black text-gray-900">
                    {totalStartups.toLocaleString()}
                </p>
            </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shadow-sm">
                <Globe size={28} />
            </div>
            <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Lider Ekosistem</p>
                <p className="text-xl font-bold text-gray-900 truncate">
                    {leader?.name}
                </p>
                <span className="text-xs text-gray-500">{leader?.unicornCount} Unicorn</span>
            </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-green-100 text-green-600 rounded-lg shadow-sm">
                <TrendingUp size={28} />
            </div>
             <div>
                <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Türkiye</p>
                <p className="text-xl font-bold text-gray-900">
                    {turkey?.unicornCount} Unicorn
                </p>
                <span className="text-xs text-gray-500">Hedef: 10 Turcorn</span>
            </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unicorn Counts Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[450px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Gem size={20} className="text-purple-600" />
                    En Çok Unicorn'a Sahip Ülkeler
                </h3>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">Crunchbase 2024</span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={top10Unicorns} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fontWeight: 600, fill: '#4b5563' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                        cursor={{fill: '#f9fafb'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="unicornCount" fill="url(#colorGradient)" radius={[0, 6, 6, 0]} barSize={24} name="Unicorn Sayısı">
                        {top10Unicorns.map((entry, index) => (
                             <text key={index} x={10} y={index * 30} dy={16} fill="white" fontSize={10} fontWeight="bold"></text>
                        ))}
                    </Bar>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#9333EA" />
                            <stop offset="100%" stopColor="#C084FC" />
                        </linearGradient>
                    </defs>
                  </BarChart>
              </ResponsiveContainer>
          </div>

          {/* Correlation Chart: EEF vs Unicorns (Colorful) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[450px]">
               <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-600" />
                    Ekosistem Puanı (EEF) ve Unicorn İlişkisi
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-6">Renkler SEGRİ Kadranlarını temsil eder. (Sadece Unicorn &gt; 0 olan ülkeler)</p>
              
              <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="EEF" name="EEF Puanı" domain={[40, 100]} tickLine={false} axisLine={{stroke: '#e5e7eb'}}>
                        <Label value="Ekosistem Destekleyici Faktör (EEF)" offset={-10} position="bottom" style={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                    </XAxis>
                    {/* Log Scale Y-Axis: Domain MUST start at 1, not 0 or 'auto', to prevent errors with Log(0) */}
                    <YAxis 
                        type="number" 
                        dataKey="unicornCount" 
                        name="Unicorn Sayısı" 
                        scale="log" 
                        domain={[1, 'auto']} 
                        allowDataOverflow 
                        tickLine={false} 
                        axisLine={{stroke: '#e5e7eb'}}
                    >
                         <Label value="Unicorn Sayısı (Logaritmik)" angle={-90} position="left" style={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    
                    <Scatter name="Iron Man" data={ironManData} fill={COLORS.ironMan} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Captain America" data={capAmericaData} fill={COLORS.captainAmerica} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Black Panther" data={blackPantherData} fill={COLORS.blackPanther} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Spider-Man" data={spiderManData} fill={COLORS.spiderMan} shape="circle" fillOpacity={0.8} />
                  </ScatterChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-2">
                  <AlertCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Analiz:</strong> Iron Man (Yeşil) ve Black Panther (Mor) kadranındaki ülkeler, yüksek EEF puanları sayesinde daha fazla Unicorn çıkarma eğilimindedir.
                  </span>
              </div>
          </div>
      </div>

      {/* Startup Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Rocket size={20} className="text-indigo-600" />
                    Startup Ekosistem Yoğunluğu ve Başarı Oranları
                </h3>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <select
                            value={filters.quadrant}
                            onChange={(e) => setFilters(prev => ({...prev, quadrant: e.target.value}))}
                            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-700 shadow-sm cursor-pointer"
                        >
                            <option value="All">Tüm Kadranlar</option>
                            {quadrants.map(q => <option key={q} value={q}>{q}</option>)}
                        </select>
                        <Filter size={12} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select
                            value={filters.typology}
                            onChange={(e) => setFilters(prev => ({...prev, typology: e.target.value}))}
                            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-700 shadow-sm cursor-pointer"
                        >
                            <option value="All">Tüm Tipolojiler</option>
                            {typologies.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <Filter size={12} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-white text-gray-600 uppercase font-bold text-xs border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-4">Ülke</th>
                          <th className="px-6 py-4">Startup Hacmi</th>
                          <th className="px-6 py-4">Unicorn</th>
                          <th className="px-6 py-4">Kadran</th>
                          <th className="px-6 py-4 text-right">Başarı Oranı (Uni/Startup)</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredTableData.slice(0,12).map((country) => {
                          const maxStartup = 75000; // Approx max reference
                          const successRate = country.startupCount > 0 ? ((country.unicornCount / country.startupCount) * 100) : 0;
                          const maxSuccessRate = 0.5; // Reference for bar width
                          
                          return (
                            <tr key={country.code} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                                    <span className="text-2xl shadow-sm rounded-sm">{country.flag}</span> {country.name}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-gray-700">{country.startupCount.toLocaleString()}</span>
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((country.startupCount / maxStartup) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {country.unicornCount > 0 ? (
                                        <div className="flex items-center gap-1.5">
                                            <Gem size={14} className="text-purple-500" />
                                            <span className="font-bold text-purple-700">{country.unicornCount}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                        country.quadrant === 'Iron Man' ? 'bg-green-50 text-green-700 border-green-200' :
                                        country.quadrant === 'Captain America' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                        country.quadrant === 'Black Panther' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                        'bg-blue-50 text-blue-700 border-blue-200'
                                    }`}>
                                        {country.quadrant}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-mono font-bold text-gray-600">{successRate.toFixed(3)}%</span>
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" style={{ width: `${Math.min((successRate / maxSuccessRate) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                          );
                      })}
                      {filteredTableData.length === 0 && (
                          <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">
                                  Seçilen kriterlere uygun ülke bulunamadı.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Global Unicorns List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row gap-4 justify-between items-center">
               <div className="flex items-center gap-3">
                   <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                        <Gem size={20} />
                   </div>
                   <div>
                       <h3 className="font-bold text-gray-800">Top 100 Global Unicorn Listesi</h3>
                       <p className="text-xs text-gray-500">CB Insights & Crunchbase Verileri (Canlı Simülasyon)</p>
                   </div>
               </div>

               <div className="relative w-full md:w-64">
                   <input 
                        type="text" 
                        placeholder="Şirket, sektör veya ülke ara..." 
                        className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                   {searchTerm && (
                       <button 
                         onClick={() => setSearchTerm('')} 
                         className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
                       >
                           <X size={14} />
                       </button>
                   )}
               </div>
           </div>
           
           <div className="overflow-x-auto max-h-[600px]">
               <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-xs sticky top-0 z-10 shadow-sm">
                       <tr>
                           <th className="px-6 py-3">Sıra</th>
                           <th className="px-6 py-3">Şirket</th>
                           <th className="px-6 py-3">Değerleme (Milyar $)</th>
                           <th className="px-6 py-3">Ülke</th>
                           <th className="px-6 py-3">Sektör</th>
                           <th className="px-6 py-3">Yatırımcılar</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                       {filteredGlobalUnicorns.map((unicorn) => (
                           <tr key={unicorn.rank} className="hover:bg-purple-50/30 transition-colors group">
                               <td className="px-6 py-3 font-mono text-gray-400 group-hover:text-purple-600 font-bold">#{unicorn.rank}</td>
                               <td className="px-6 py-3 font-bold text-gray-800">{unicorn.name}</td>
                               <td className="px-6 py-3 font-mono text-green-600 font-bold">${unicorn.valuation.toFixed(2)}B</td>
                               <td className="px-6 py-3">
                                   <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                                       <Globe size={12} /> {unicorn.country}
                                   </span>
                               </td>
                               <td className="px-6 py-3 text-gray-600">{unicorn.sector}</td>
                               <td className="px-6 py-3 text-xs text-gray-500 max-w-xs truncate" title={unicorn.investors}>
                                   {unicorn.investors}
                               </td>
                           </tr>
                       ))}
                       {filteredGlobalUnicorns.length === 0 && (
                           <tr>
                               <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                   Arama kriterlerine uygun Unicorn bulunamadı.
                               </td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>
      </div>
    </div>
  );
};

export default UnicornAnalysis;
