
import React, { useState, useMemo } from 'react';
import { useCountries, useGlobalUnicorns, QUERY_KEYS } from '../hooks';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, Label } from 'recharts';
import { Rocket, Gem, TrendingUp, Globe, AlertCircle, RefreshCw, Filter, Search, X, Bot, Clock, Sparkles, Loader2, LineChart } from 'lucide-react';
import { COLORS } from '../constants';
import { CountryData } from '../types';
import { useLanguage } from '../LanguageContext';
import { GoogleGenAI } from '@google/genai';
import { UnicornTrends } from './UnicornTrends';

interface RealtimeUnicornData {
  country: string;
  count: number | string;
  source: string;
  lastUpdate: string;
  recentNews: string;
}

const fallbackUnicornData: RealtimeUnicornData[] = [
  { country: 'Amerika Birleşik Devletleri', count: 61, source: 'investing', lastUpdate: new Date().toISOString().split('T')[0], recentNews: 'Sürekli yeni AI unicornları ekleniyor.' },
  { country: 'Çin', count: '20-30', source: 'hurun', lastUpdate: new Date().toISOString().split('T')[0], recentNews: 'Donanım ve EV sektörlerinde büyüme.' },
  { country: 'Hindistan', count: '10-15', source: 'worldpopulationreview', lastUpdate: new Date().toISOString().split('T')[0], recentNews: 'Fintech ve SaaS öne çıkıyor.' },
  { country: 'Birleşik Krallık', count: '8-10', source: 'worldpopulationreview', lastUpdate: new Date().toISOString().split('T')[0], recentNews: 'Avrupa\'nın lider ekosistemi.' },
  { country: 'Almanya', count: '5-7', source: 'worldpopulationreview', lastUpdate: new Date().toISOString().split('T')[0], recentNews: 'Otomotiv ve B2B SaaS güçlü.' },
];

const CustomScatterTooltip = ({ active, payload }: any) => {
  const { t } = useLanguage();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-200 shadow-xl rounded-xl text-xs z-50">
        <div className="flex items-center gap-2 mb-2 border-b border-gray-200 pb-2">
            <span className="text-xl">{data.flag}</span>
            <div>
                <span className="font-bold text-fintech-charcoal block text-sm">{t(data.name)}</span>
                <span className="text-gray-500">{t(data.quadrant)}</span>
            </div>
        </div>
        <div className="space-y-1">
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">{t('EEF Puanı')}:</span>
                <span className="font-bold text-fintech-coral">{data.EEF.toFixed(1)}</span>
            </div>
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">{t('Unicorn')}:</span>
                <span className="font-bold text-gray-700">{data.unicornCount}</span>
            </div>
            <div className="flex justify-between gap-4">
                <span className="text-gray-500">{t('Startups')}:</span>
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
  
  // Real-time Unicorn Tracker Query
  const { data: realtimeUnicorns, isLoading: isRealtimeLoading } = useQuery({
    queryKey: ['realtimeUnicorns'],
    queryFn: async (): Promise<RealtimeUnicornData[]> => {
      if (!process.env.GEMINI_API_KEY) {
        return fallbackUnicornData;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        You are a real-time startup ecosystem tracker.
        Search Google for the latest data on the number of unicorns in the top countries (US, China, India, UK, Germany, France, Israel, Canada, Brazil, South Korea, Singapore, etc.).
        Pay special attention to recent changes (new unicorns added, valuation updates) and provide a specific date for the last update.
        
        Return ONLY a valid JSON array of objects with the following structure. Do not include markdown formatting like \`\`\`json.
        
        JSON Structure per object:
        {
          "country": "Country Name (in Turkish)",
          "count": "Number of unicorns (can be a range like '20-30' or exact number)",
          "source": "Source of the data (e.g., CB Insights, Hurun, Crunchbase)",
          "lastUpdate": "YYYY-MM-DD",
          "recentNews": "A short 1-sentence summary of recent unicorn news or valuation changes for this country"
        }
        
        Provide data for at least the top 10 countries.
      `;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
          }
        });

        const text = response.text;
        if (!text) throw new Error("No data returned");
        const parsed = JSON.parse(text);
        
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].country) {
          return parsed;
        }
        return fallbackUnicornData;
      } catch (error) {
        console.error("Failed to fetch real-time unicorn data:", error);
        return fallbackUnicornData;
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours (weekly tracking requested, so daily cache is fine)
  });

  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ quadrant: 'All', typology: 'All' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');
  const { t } = useLanguage();

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
        u.gicsSector.toLowerCase().includes(lowerTerm) ||
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
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-fintech-charcoal">{t('Unicorn Ekosistem Analizi')}</h2>
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'overview' ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t('Genel Bakış & Canlı Takip')}
                {activeTab === 'overview' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-gray-700 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('trends')}
                className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'trends' ? 'text-fintech-coral' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t('Trendler & Projeksiyonlar')}
                {activeTab === 'trends' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-fintech-coral rounded-t-full" />}
              </button>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefetching}
            className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefetching ? "animate-spin" : ""} />
            {isRefetching ? t('Veriler Güncelleniyor...') : t('Verileri Güncelle (Fetch)')}
          </button>
      </div>

      {activeTab === 'trends' ? (
        <UnicornTrends />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-fintech-gray to-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-fintech-gray text-gray-700 rounded-lg shadow-sm">
                <Gem size={28} />
            </div>
            <div>
                <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">{t('Toplam Unicorn')}</p>
                <p className="text-2xl font-black text-fintech-charcoal">
                    {totalUnicorns.toLocaleString()}
                </p>
            </div>
        </div>
        <div className="bg-gradient-to-br from-fintech-gray to-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-fintech-gray text-gray-700 rounded-lg shadow-sm">
                <Rocket size={28} />
            </div>
            <div>
                <p className="text-xs text-gray-700 font-bold uppercase tracking-wider">{t('Aktif Startup')}</p>
                <p className="text-2xl font-black text-fintech-charcoal">
                    {totalStartups.toLocaleString()}
                </p>
            </div>
        </div>
        <div className="bg-gradient-to-br from-fintech-gray to-white p-5 rounded-xl border border-red-50 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-fintech-coral rounded-lg shadow-sm">
                <Globe size={28} />
            </div>
            <div>
                <p className="text-xs text-fintech-coral font-bold uppercase tracking-wider">{t('Lider Ekosistem')}</p>
                <p className="text-xl font-bold text-fintech-charcoal truncate">
                    {t(leader?.name)}
                </p>
                <span className="text-xs text-gray-500">{leader?.unicornCount} Unicorn</span>
            </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-fintech-gray text-gray-500 rounded-lg shadow-sm">
                <TrendingUp size={28} />
            </div>
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t('Türkiye')}</p>
                <p className="text-xl font-bold text-fintech-charcoal">
                    {turkey?.unicornCount} Unicorn
                </p>
                <span className="text-xs text-gray-500">{t('Hedef: 10 Turcorn')}</span>
            </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-Time Unicorn Tracker */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[450px] lg:col-span-2 hover-card">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                            {t('Canlı Unicorn Takibi (Gemini 3.0)')}
                        </h3>
                        <p className="text-xs text-gray-500">{t('Google Search ile haftalık güncellenen canlı unicorn verileri ve haberler')}</p>
                    </div>
                </div>
                <span className="text-[10px] font-bold text-fintech-charcoal bg-fintech-gray px-2 py-1 rounded uppercase flex items-center gap-1">
                    <Clock size={12} /> {t('Canlı Veri')}
                </span>
              </div>

              {isRealtimeLoading ? (
                  <div className="h-64 flex flex-col items-center justify-center text-gray-700">
                      <Loader2 size={32} className="animate-spin mb-4" />
                      <p className="text-sm font-medium">{t('Canlı unicorn verileri taranıyor...')}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Sparkles size={12}/> Google Search Grounding</p>
                  </div>
              ) : (
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 text-fintech-charcoal font-medium border-b border-gray-200">
                              <tr>
                                  <th className="px-6 py-4 rounded-tl-lg">{t('Sıra')}</th>
                                  <th className="px-6 py-4">{t('Ülke')}</th>
                                  <th className="px-6 py-4">{t('Unicorn Sayısı')}</th>
                                  <th className="px-6 py-4">{t('Son Güncelleme')}</th>
                                  <th className="px-6 py-4 rounded-tr-lg">{t('Önemli Değişiklikler / Haberler')}</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                              {realtimeUnicorns?.map((item, idx) => (
                                  <tr key={idx} className="hover:bg-white transition-colors">
                                      <td className="px-6 py-4 font-bold text-gray-400">#{idx + 1}</td>
                                      <td className="px-6 py-4 font-bold text-fintech-charcoal">{item.country}</td>
                                      <td className="px-6 py-4 font-bold text-gray-700 text-lg">{item.count}</td>
                                      <td className="px-6 py-4 text-gray-500 text-xs">
                                          <div className="flex items-center gap-1">
                                              <Clock size={12} /> {item.lastUpdate}
                                          </div>
                                          <div className="text-[10px] text-gray-400 mt-0.5">Kaynak: {item.source}</div>
                                      </td>
                                      <td className="px-6 py-4 text-gray-700 text-xs leading-relaxed">
                                          {item.recentNews}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              )}
          </div>

          {/* Unicorn Counts Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[450px] hover-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                    <Gem size={20} className="text-gray-700" />
                    {t('En Çok Unicorn\'a Sahip Ülkeler')}
                </h3>
                <span className="text-[10px] font-bold text-gray-500 bg-fintech-gray px-2 py-1 rounded uppercase">Crunchbase 2024</span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={top10Unicorns} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12, fontWeight: 600, fill: '#4b5563' }} axisLine={false} tickLine={false} tickFormatter={(value) => t(value)} />
                    <Tooltip 
                        cursor={{fill: '#f9fafb'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        labelFormatter={(label) => t(label)}
                    />
                    <Bar dataKey="unicornCount" fill="url(#colorGradient)" radius={[0, 6, 6, 0]} barSize={24} name={t('Unicorn Sayısı')}>
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-h-[450px] hover-card">
               <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                    <TrendingUp size={20} className="text-gray-500" />
                    {t('Ekosistem Puanı (EEF) ve Unicorn İlişkisi')}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mb-6">{t('Renkler SEGRİ Kadranlarını temsil eder. (Sadece Unicorn > 0 olan ülkeler)')}</p>
              
              <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="EEF" name={t('EEF Puanı')} domain={[40, 100]} tickLine={false} axisLine={{stroke: '#e5e7eb'}}>
                        <Label value={t('Ekosistem Destekleyici Faktör (EEF)')} offset={-10} position="bottom" style={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                    </XAxis>
                    {/* Log Scale Y-Axis: Domain MUST start at 1, not 0 or 'auto', to prevent errors with Log(0) */}
                    <YAxis 
                        type="number" 
                        dataKey="unicornCount" 
                        name={t('Unicorn Sayısı')} 
                        scale="log" 
                        domain={[1, 'auto']} 
                        allowDataOverflow 
                        tickLine={false} 
                        axisLine={{stroke: '#e5e7eb'}}
                    >
                         <Label value={t('Unicorn Sayısı (Logaritmik)')} angle={-90} position="left" style={{ fontSize: 12, fill: '#6b7280', fontWeight: 'bold' }} />
                    </YAxis>
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    
                    <Scatter name="Iron Man" data={ironManData} fill={COLORS.ironMan} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Captain America" data={capAmericaData} fill={COLORS.captainAmerica} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Black Panther" data={blackPantherData} fill={COLORS.blackPanther} shape="circle" fillOpacity={0.8} />
                    <Scatter name="Spider-Man" data={spiderManData} fill={COLORS.spiderMan} shape="circle" fillOpacity={0.8} />
                  </ScatterChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-700 bg-red-50 p-3 rounded-lg border border-red-50 flex gap-2">
                  <AlertCircle size={14} className="text-fintech-coral shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('Analiz:')}</strong> {t('Iron Man (Yeşil) ve Black Panther (Mor) kadranındaki ülkeler, yüksek EEF puanları sayesinde daha fazla Unicorn çıkarma eğilimindedir.')}
                  </span>
              </div>
          </div>
      </div>

      {/* Startup Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-card">
          <div className="p-6 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-4 justify-between items-center">
               <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                    <Rocket size={20} className="text-gray-700" />
                    {t('Startup Ekosistem Yoğunluğu ve Başarı Oranları')}
                </h3>

                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <select
                            value={filters.quadrant}
                            onChange={(e) => setFilters(prev => ({...prev, quadrant: e.target.value}))}
                            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-700 outline-none bg-white text-gray-700 shadow-sm cursor-pointer"
                        >
                            <option value="All">{t('Tüm Kadranlar')}</option>
                            {quadrants.map(q => <option key={q} value={q}>{t(q)}</option>)}
                        </select>
                        <Filter size={12} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select
                            value={filters.typology}
                            onChange={(e) => setFilters(prev => ({...prev, typology: e.target.value}))}
                            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-gray-700 outline-none bg-white text-gray-700 shadow-sm cursor-pointer"
                        >
                            <option value="All">{t('Tüm Tipolojiler')}</option>
                            {typologies.map(tItem => <option key={tItem} value={tItem}>{t(tItem)}</option>)}
                        </select>
                        <Filter size={12} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-white text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
                      <tr>
                          <th className="px-6 py-4">{t('Ülke')}</th>
                          <th className="px-6 py-4">{t('Startup Hacmi')}</th>
                          <th className="px-6 py-4">Unicorn</th>
                          <th className="px-6 py-4">{t('Kadran')}</th>
                          <th className="px-6 py-4 text-right">{t('Başarı Oranı (Uni/Startup)')}</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredTableData.slice(0,12).map((country) => {
                          const maxStartup = 75000; // Approx max reference
                          const successRate = country.startupCount > 0 ? ((country.unicornCount / country.startupCount) * 100) : 0;
                          const maxSuccessRate = 0.5; // Reference for bar width
                          
                          return (
                            <tr key={country.code} className="hover:bg-white transition-colors">
                                <td className="px-6 py-4 font-bold text-fintech-charcoal flex items-center gap-3">
                                    <span className="text-2xl shadow-sm rounded-sm">{country.flag}</span> {t(country.name)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-gray-700">{country.startupCount.toLocaleString()}</span>
                                        <div className="w-24 h-1.5 bg-fintech-gray rounded-full overflow-hidden">
                                            <div className="h-full bg-fintech-coral rounded-full" style={{ width: `${Math.min((country.startupCount / maxStartup) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {country.unicornCount > 0 ? (
                                        <div className="flex items-center gap-1.5">
                                            <Gem size={14} className="text-gray-700" />
                                            <span className="font-bold text-fintech-charcoal">{country.unicornCount}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                        country.quadrant === 'Iron Man' ? 'bg-gray-50 text-fintech-charcoal border-gray-300' :
                                        country.quadrant === 'Captain America' ? 'bg-red-50 text-gray-700 border-red-200' :
                                        country.quadrant === 'Black Panther' ? 'bg-gray-50 text-fintech-charcoal border-gray-300' :
                                        'bg-red-50 text-gray-700 border-red-200'
                                    }`}>
                                        {t(country.quadrant)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-mono font-bold text-gray-700">{successRate.toFixed(3)}%</span>
                                        <div className="w-24 h-1.5 bg-fintech-gray rounded-full overflow-hidden">
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
                                  {t('Seçilen kriterlere uygun ülke bulunamadı.')}
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>

      {/* Hectocorn Club Section */}
      <div className="bg-gradient-to-br from-fintech-charcoal to-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden mb-8 relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
              <Gem size={200} />
          </div>
          <div className="p-6 md:p-8 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                      <div className="flex items-center gap-3 mb-2">
                          <div className="bg-amber-400/20 p-2 rounded-lg text-amber-400">
                              <Gem size={24} className="fill-amber-400/20" />
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tight">{t('Hectocorn Club')} <span className="text-amber-400">($100B+)</span></h3>
                      </div>
                      <p className="text-gray-400 text-sm max-w-2xl">
                          {t('Özel (private) şirketler arasında değerlemesi 100 milyar USD+ olanlar. "Centibillion-dollar club" olarak da bilinen bu kategori, 2026 itibarıyla AI patlaması ve mega-IPO beklentileriyle hızla büyüyor.')}
                          <br/><span className="text-xs text-gray-500 mt-1 block">{t('Kaynaklar: Eqvista, Failory, Business Insider, The Guardian, CB Insights, Wikipedia')}</span>
                      </p>
                  </div>
                  <div className="bg-fintech-charcoal/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-center min-w-[120px]">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-1">{t('Toplam Değer')}</div>
                      <div className="text-2xl font-black text-fintech-teal">~$1.4T+</div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {globalUnicorns.slice(0, 7).map((hectocorn, idx) => (
                      <div key={hectocorn.name} className="bg-fintech-charcoal/80 backdrop-blur-md border border-gray-700 hover:border-fintech-amber/50 transition-colors rounded-xl p-5 flex flex-col gap-3 group">
                          <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                  <span className="text-amber-400 font-black text-lg">#{idx + 1}</span>
                                  <h4 className="font-bold text-white text-lg">{hectocorn.name}</h4>
                              </div>
                              <span className="bg-gray-500/10 text-fintech-teal font-mono font-bold px-2 py-1 rounded text-sm border border-gray-500/20">
                                  ${hectocorn.valuation}B+
                              </span>
                          </div>
                          <div className="space-y-2 mt-2">
                              <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-400">{t('Ülke')}</span>
                                  <span className="text-gray-200 font-medium flex items-center gap-1"><Globe size={10} className="text-gray-500"/> {t(hectocorn.country)}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-400">{t('Ana Alan')}</span>
                                  <span className="text-gray-200 font-medium">{t(hectocorn.sector)}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-400">{t('GICS Sektörü')}</span>
                                  <span className="text-gray-200 font-medium">{t(hectocorn.gicsSector)}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="mt-6 text-xs text-gray-500 flex items-center gap-2">
                  <AlertCircle size={14} />
                  {t('Not: Ant Group (~$78.5B) gibi şirketler de dönemsel olarak bu kulübe yaklaşmaktadır. 2026, OpenAI, SpaceX, Databricks gibi isimler için "Mega-IPO yılı" olarak öngörülmektedir.')}
              </div>
          </div>
      </div>

      {/* Global Unicorns List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-card">
           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex flex-col md:flex-row gap-4 justify-between items-center">
               <div className="flex items-center gap-3">
                   <div className="bg-fintech-gray p-2 rounded-lg text-fintech-charcoal">
                        <Gem size={20} />
                   </div>
                   <div>
                       <h3 className="font-bold text-fintech-charcoal">{t('Top 100 Global Unicorn Listesi')}</h3>
                       <p className="text-xs text-gray-500">{t('Kaynaklar: Hurun, CB Insights, Crunchbase, Tracxn, PitchBook')}</p>
                   </div>
               </div>

               <div className="relative w-full md:w-64">
                   <input 
                        type="text" 
                        placeholder={t('Şirket, sektör veya ülke ara...')}
                        className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-700 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                   />
                   <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                   {searchTerm && (
                       <button 
                         onClick={() => setSearchTerm('')} 
                         className="absolute right-2 top-2 text-gray-400 hover:text-gray-700 p-0.5 rounded-full hover:bg-fintech-gray transition-colors"
                       >
                           <X size={14} />
                       </button>
                   )}
               </div>
           </div>
           
           {/* Desktop Table View */}
           <div className="hidden md:block overflow-x-auto max-h-[600px]">
               <table className="w-full text-sm text-left">
                   <thead className="bg-white text-gray-700 uppercase font-bold text-xs sticky top-0 z-10 shadow-sm">
                       <tr>
                           <th className="px-6 py-3">{t('Sıra')}</th>
                           <th className="px-6 py-3">{t('Şirket')}</th>
                           <th className="px-6 py-3">{t('Kategori')}</th>
                           <th className="px-6 py-3">{t('Değerleme (Milyar $)')}</th>
                           <th className="px-6 py-3">{t('Ülke')}</th>
                           <th className="px-6 py-3">{t('Sektör')}</th>
                           <th className="px-6 py-3">{t('GICS Sektörü')}</th>
                           <th className="px-6 py-3">{t('Yatırımcılar')}</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                       {filteredGlobalUnicorns.map((unicorn) => (
                           <tr key={unicorn.rank} className="hover:bg-gray-50/30 transition-colors group">
                               <td className="px-6 py-3 font-mono text-gray-400 group-hover:text-gray-700 font-bold">#{unicorn.rank}</td>
                               <td className="px-6 py-3 font-bold text-fintech-charcoal">{unicorn.name}</td>
                               <td className="px-6 py-3">
                                   {unicorn.valuation >= 100 ? (
                                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-gray-700 text-xs font-bold border border-amber-200">
                                           <Gem size={10} className="fill-amber-400" /> Hectocorn
                                       </span>
                                   ) : unicorn.valuation >= 10 ? (
                                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-fintech-gray text-fintech-charcoal text-xs font-bold border border-gray-300">
                                           <Gem size={10} /> Decacorn
                                       </span>
                                   ) : (
                                       <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-gray-700 text-xs font-bold border border-red-200">
                                           <Gem size={10} /> Unicorn
                                       </span>
                                   )}
                               </td>
                               <td className="px-6 py-3 font-mono text-gray-500 font-bold">${unicorn.valuation.toFixed(2)}B</td>
                               <td className="px-6 py-3">
                                   <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-fintech-gray text-gray-700 text-xs font-medium">
                                       <Globe size={12} /> {t(unicorn.country)}
                                   </span>
                               </td>
                               <td className="px-6 py-3 text-gray-700">{t(unicorn.sector)}</td>
                               <td className="px-6 py-3 text-gray-700 font-medium">{t(unicorn.gicsSector)}</td>
                               <td className="px-6 py-3 text-xs text-gray-500 max-w-xs truncate" title={unicorn.investors}>
                                   {unicorn.investors}
                               </td>
                           </tr>
                       ))}
                       {filteredGlobalUnicorns.length === 0 && (
                           <tr>
                               <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                   {t('Arama kriterlerine uygun Unicorn bulunamadı.')}
                               </td>
                           </tr>
                       )}
                   </tbody>
               </table>
           </div>

           {/* Mobile Card View */}
           <div className="md:hidden flex flex-col gap-4 p-4 max-h-[600px] overflow-y-auto bg-white/50">
               {filteredGlobalUnicorns.map((unicorn) => (
                   <div key={unicorn.rank} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3 hover-card">
                       <div className="flex justify-between items-start">
                           <div className="flex items-center gap-2">
                               <span className="font-mono text-gray-700 font-black bg-gray-50 px-2 py-1 rounded-md text-xs">#{unicorn.rank}</span>
                               <div className="flex flex-col">
                                   <span className="font-bold text-fintech-charcoal text-lg leading-tight">{unicorn.name}</span>
                                   <div className="mt-1">
                                       {unicorn.valuation >= 100 ? (
                                           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 text-gray-700 text-[10px] font-bold border border-amber-200">
                                               <Gem size={8} className="fill-amber-400" /> Hectocorn
                                           </span>
                                       ) : unicorn.valuation >= 10 ? (
                                           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-fintech-gray text-fintech-charcoal text-[10px] font-bold border border-gray-300">
                                               <Gem size={8} /> Decacorn
                                           </span>
                                       ) : (
                                           <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 text-gray-700 text-[10px] font-bold border border-red-200">
                                               <Gem size={8} /> Unicorn
                                           </span>
                                       )}
                                   </div>
                               </div>
                           </div>
                           <span className="font-mono text-gray-500 font-black bg-gray-50 px-2 py-1 rounded-md">${unicorn.valuation.toFixed(2)}B</span>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-2 text-sm">
                           <div className="flex flex-col">
                               <span className="text-gray-400 text-xs uppercase font-bold">{t('Ülke')}</span>
                               <span className="flex items-center gap-1 text-gray-700 font-medium mt-0.5">
                                   <Globe size={12} className="text-gray-400" /> {t(unicorn.country)}
                               </span>
                           </div>
                           <div className="flex flex-col">
                               <span className="text-gray-400 text-xs uppercase font-bold">{t('Sektör')}</span>
                               <span className="text-gray-700 font-medium mt-0.5">{t(unicorn.sector)}</span>
                           </div>
                           <div className="flex flex-col col-span-2">
                               <span className="text-gray-400 text-xs uppercase font-bold">{t('GICS Sektörü')}</span>
                               <span className="text-gray-700 font-medium mt-0.5">{t(unicorn.gicsSector)}</span>
                           </div>
                           <div className="flex flex-col col-span-2">
                               <span className="text-gray-400 text-xs uppercase font-bold">{t('Yatırımcılar')}</span>
                               <span className="text-gray-700 text-xs mt-0.5 line-clamp-2">{unicorn.investors}</span>
                           </div>
                       </div>
                   </div>
               ))}
               {filteredGlobalUnicorns.length === 0 && (
                   <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
                       {t('Arama kriterlerine uygun Unicorn bulunamadı.')}
                   </div>
               )}
           </div>
      </div>
      </>
      )}
    </div>
  );
};

export default UnicornAnalysis;
