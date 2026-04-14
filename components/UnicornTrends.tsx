import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ComposedChart, Line } from 'recharts';
import { TrendingUp, Globe, Zap, Cpu, ArrowUpRight, Search, ArrowUpDown, Target, Sparkles, Activity } from 'lucide-react';

const top20Countries = [
  { rank: 1, country: 'Amerika Birleşik Devletleri', count: 712, valuation: 2500, topUnicorn: 'SpaceX / OpenAI' },
  { rank: 2, country: 'Çin', count: 157, valuation: 800, topUnicorn: 'ByteDance' },
  { rank: 3, country: 'Hindistan', count: 69, valuation: 350, topUnicorn: 'Flipkart / BYJU\'S' },
  { rank: 4, country: 'Birleşik Krallık', count: 55, valuation: 210, topUnicorn: 'Revolut' },
  { rank: 5, country: 'Almanya', count: 32, valuation: 130, topUnicorn: 'Celonis' },
  { rank: 6, country: 'Fransa', count: 29, valuation: 110, topUnicorn: 'Doctolib' },
  { rank: 7, country: 'İsrail', count: 25, valuation: 95, topUnicorn: 'Wiz' },
  { rank: 8, country: 'Kanada', count: 22, valuation: 80, topUnicorn: '1Password' },
  { rank: 9, country: 'Brezilya', count: 18, valuation: 65, topUnicorn: 'Nubank' },
  { rank: 10, country: 'Güney Kore', count: 15, valuation: 50, topUnicorn: 'Toss' },
  { rank: 11, country: 'Singapur', count: 14, valuation: 45, topUnicorn: 'Grab' },
  { rank: 12, country: 'Meksika', count: 8, valuation: 25, topUnicorn: 'Kavak' },
  { rank: 13, country: 'Japonya', count: 7, valuation: 22, topUnicorn: 'SmartNews' },
  { rank: 14, country: 'Avustralya', count: 7, valuation: 20, topUnicorn: 'Canva' },
  { rank: 15, country: 'Hollanda', count: 7, valuation: 18, topUnicorn: 'Mollie' },
  { rank: 16, country: 'Türkiye', count: 7, valuation: 16, topUnicorn: 'Trendyol / Insider' },
  { rank: 17, country: 'İrlanda', count: 6, valuation: 15, topUnicorn: 'Stripe (HQ)' },
  { rank: 18, country: 'Endonezya', count: 6, valuation: 14, topUnicorn: 'J&T Express' },
  { rank: 19, country: 'Hong Kong', count: 5, valuation: 12, topUnicorn: 'Lalamove' },
  { rank: 20, country: 'İsveç', count: 5, valuation: 11, topUnicorn: 'Klarna' },
  { rank: 21, country: 'İsviçre', count: 5, valuation: 10, topUnicorn: 'SonarSource' },
];

const historicalData = [
  { country: 'ABD', y2021: 500, y2026: 712, netChange: 1045 },
  { country: 'Çin', y2021: 200, y2026: 157, netChange: 595 },
  { country: 'Hindistan', y2021: 40, y2026: 69, netChange: 100 },
  { country: 'BK', y2021: 30, y2026: 55, netChange: 96 },
  { country: 'Almanya', y2021: 20, y2026: 32, netChange: 46 },
  { country: 'Fransa', y2021: 15, y2026: 29, netChange: 38 },
  { country: 'Kanada', y2021: 10, y2026: 22, netChange: 35 },
  { country: 'Türkiye', y2021: 3, y2026: 7, netChange: 4 },
];

const forecastData = [
  { country: 'ABD', expectedNew: 500, total2031: 1200 },
  { country: 'Çin', expectedNew: 300, total2031: 500 },
  { country: 'Hindistan', expectedNew: 100, total2031: 150 },
  { country: 'BK', expectedNew: 80, total2031: 120 },
  { country: 'Almanya', expectedNew: 50, total2031: 80 },
  { country: 'Türkiye', expectedNew: 10, total2031: 17 },
];

type SortKey = 'rank' | 'country' | 'count' | 'valuation';

export const UnicornTrends: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let sortableItems = [...top20Countries];

    if (searchTerm) {
      sortableItems = sortableItems.filter(item => 
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.topUnicorn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [searchTerm, sortConfig]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-fintech-gray to-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg"><Globe size={24} /></div>
            <h3 className="font-bold text-fintech-charcoal">{t('Küresel Büyüme (2021-2026)')}</h3>
          </div>
          <p className="text-3xl font-black text-fintech-charcoal mb-2">1.200 <ArrowUpRight className="inline text-fintech-primary" size={24} /> 1.286</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Son 5 yılda unicorn şirket sayıları küresel olarak hızla arttı. Yeni unicorn'lar ağırlıklı olarak ABD ve Çin'de doğdu.
          </p>
        </div>

        <div className="bg-gradient-to-br from-fintech-gray to-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg"><Cpu size={24} /></div>
            <h3 className="font-bold text-fintech-charcoal">{t('Gelecek Trendi (2026-2031)')}</h3>
          </div>
          <p className="text-3xl font-black text-fintech-charcoal mb-2">1.500+ <span className="text-lg text-gray-700 font-bold">Unicorn</span></p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Trendler AI, biyoteknoloji ve derin teknolojilere kayacak. Yeni unicorn'ların <strong>%70+</strong> kadarı AI altyapısından çıkacak.
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg"><Zap size={24} /></div>
            <h3 className="font-bold text-fintech-charcoal">{t('Değerleme Projeksiyonu')}</h3>
          </div>
          <p className="text-3xl font-black text-fintech-charcoal mb-2">$7-10 <span className="text-lg text-gray-500 font-bold">Trilyon</span></p>
          <p className="text-sm text-gray-700 leading-relaxed">
            AI ve robotik ön planda. OpenAI ve xAI gibi şirketler değerlemelerini %450 artırdı. Bu momentum 2030'a kadar devam edecek.
          </p>
        </div>
      </div>

      {/* Top 20 Interactive Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-card">
        <div className="p-6 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-4 justify-between items-center">
          <div>
            <h3 className="font-bold text-fintech-charcoal flex items-center gap-2 text-lg">
              <Target size={20} className="text-fintech-coral" />
              {t('Öne Çıkan Unicorn Ülkeleri Karşılaştırması')}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Unicorn sayısı, toplam değerleme ve en büyük şirketler (2026)</p>
          </div>
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder={t('Ülke veya şirket ara...')}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fintech-coral outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-700 uppercase font-bold text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-white" onClick={() => handleSort('rank')}>
                  <div className="flex items-center gap-1">{t('Sıra')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white" onClick={() => handleSort('country')}>
                  <div className="flex items-center gap-1">{t('Ülke')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white text-right" onClick={() => handleSort('count')}>
                  <div className="flex items-center justify-end gap-1">{t('Unicorn Sayısı')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-white text-right" onClick={() => handleSort('valuation')}>
                  <div className="flex items-center justify-end gap-1">{t('Toplam Değerleme')} <ArrowUpDown size={12} /></div>
                </th>
                <th className="px-6 py-4">{t('En Büyük Unicorn')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAndSortedData.map((item) => (
                <tr key={item.rank} className="hover:bg-red-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400 font-bold">#{item.rank}</td>
                  <td className="px-6 py-4 font-bold text-fintech-charcoal">{item.country}</td>
                  <td className="px-6 py-4 text-right font-bold text-fintech-coral text-lg">{item.count}</td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-gray-500">${item.valuation}B</td>
                  <td className="px-6 py-4 text-gray-700 font-medium flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400" /> {item.topUnicorn}
                  </td>
                </tr>
              ))}
              {filteredAndSortedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Arama kriterlerine uygun sonuç bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {filteredAndSortedData.map((item) => (
            <div key={item.rank} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3 hover-card">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-fintech-coral font-black bg-red-50 px-2 py-1 rounded-md text-xs">#{item.rank}</span>
                  <span className="font-bold text-fintech-charcoal text-lg">{item.country}</span>
                </div>
                <span className="font-bold text-fintech-coral text-xl">{item.count} <span className="text-xs text-gray-500 font-normal">Unicorn</span></span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm bg-white p-3 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">{t('Toplam Değerleme')}</span>
                  <span className="font-mono font-medium text-gray-500 mt-0.5">${item.valuation}B</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-bold">{t('En Büyük Unicorn')}</span>
                  <span className="text-gray-700 font-medium mt-0.5 flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-400" /> {item.topUnicorn}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredAndSortedData.length === 0 && (
            <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
              Arama kriterlerine uygun sonuç bulunamadı.
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Change Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
          <h3 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2">
            <Activity size={20} className="text-fintech-coral" />
            Ana Ülkelerde Değişim (2021-2026)
          </h3>
          <p className="text-xs text-gray-500 mb-6">2021'den beri 788 yeni unicorn eklendi. ABD %45, Çin %26 pay aldı.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="y2021" name="2021 (Tahmini)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="y2026" name="2026 (Mevcut)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="netChange" name="Net Değişim (Yeni)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
          <h3 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2">
            <TrendingUp size={20} className="text-gray-500" />
            Ülke Bazında Tahminler (2026-2031)
          </h3>
          <p className="text-xs text-gray-500 mb-6">Yatırım yavaşlaması sonrası konsolidasyon yaşanacak, AI talebiyle büyüme hızlanacak.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="total2031" name="Toplam Tahmini (2031)" stroke="#10b981" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                <Area type="monotone" dataKey="expectedNew" name="Beklenen Yeni (2026-2031)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorNew)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Deep Tech & Turkey Note */}
      <div className="bg-gradient-to-r from-fintech-charcoal to-gray-800 p-6 rounded-xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Cpu className="text-fintech-amber" /> Derin Teknoloji (Deep Tech) ve Türkiye
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
            Yeni unicorn hızı artacak: Ucuz hesaplama ve açık kaynak modellerle şirketler rekor sürede unicorn olacak; 2026'da biyotek, tarım ve yazılımda patlama bekleniyor. 
            Türkiye gibi gelişmekte olan pazarlarda özellikle <strong>derin teknoloji (deep tech)</strong> alanından yeni unicorn'ların çıkması kuvvetle muhtemeldir.
          </p>
        </div>
        <div className="shrink-0">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-lg text-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Bölgesel Büyüme</div>
            <div className="text-xl font-black text-white">Avrupa'da Fransa & Almanya</div>
          </div>
        </div>
      </div>
    </div>
  );
};
