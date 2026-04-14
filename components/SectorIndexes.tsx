import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Activity, DollarSign, BarChart3, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GoogleGenAI } from '@google/genai';

interface SectorData {
  name: string;
  growth: number;
  multiple: number;
  marketCap: number;
  color: string;
}

const fallbackSectorData: SectorData[] = [
  { name: 'Generative AI', growth: 145, multiple: 25.4, marketCap: 2500, color: '#8b5cf6' },
  { name: 'European SaaS', growth: 22, multiple: 8.2, marketCap: 450, color: '#3b82f6' },
  { name: 'Neobanking', growth: 35, multiple: 12.5, marketCap: 180, color: '#10b981' },
  { name: 'Big Media', growth: 8, multiple: 4.1, marketCap: 900, color: '#f59e0b' },
  { name: 'ClimateTech', growth: 42, multiple: 15.3, marketCap: 320, color: '#14b8a6' },
  { name: 'HealthTech', growth: 18, multiple: 6.8, marketCap: 600, color: '#ec4899' },
];

export const SectorIndexes: React.FC = () => {
  const { t } = useLanguage();
  const [activeMetric, setActiveMetric] = useState<'growth' | 'multiple' | 'marketCap'>('growth');

  const { data: sectorData, isLoading, isError } = useQuery({
    queryKey: ['realtimeSectorData'],
    queryFn: async (): Promise<SectorData[]> => {
      if (!process.env.GEMINI_API_KEY) {
        console.warn("API Key missing, using fallback data.");
        return fallbackSectorData;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        You are a financial data API. 
        Use Google Search to find the most recent, real-time market estimates for the following tech sectors.
        Return ONLY a valid JSON array of objects with the following structure. Do not include markdown formatting like \`\`\`json.
        
        Sectors to research:
        1. Generative AI (color: "#8b5cf6")
        2. European SaaS (color: "#3b82f6")
        3. Neobanking (color: "#10b981")
        4. Big Media (color: "#f59e0b")
        5. ClimateTech (color: "#14b8a6")
        6. HealthTech (color: "#ec4899")

        JSON Structure per object:
        {
          "name": "Sector Name",
          "growth": <annual_growth_percentage_number_only>,
          "multiple": <ev_revenue_multiple_number_only>,
          "marketCap": <market_cap_in_billions_usd_number_only>,
          "color": "<assigned_color_hex>"
        }
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
        
        // Validate array structure
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
          return parsed;
        }
        return fallbackSectorData;
      } catch (error) {
        console.error("Failed to fetch real-time sector data:", error);
        return fallbackSectorData; // Fallback gracefully
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'growth': return t('Yıllık Büyüme (%)');
      case 'multiple': return t('EV/Revenue Çarpanı');
      case 'marketCap': return t('Piyasa Değeri (Milyar $)');
      default: return '';
    }
  };

  const displayData = sectorData || fallbackSectorData;

  // Find max values for the cards
  const maxGrowth = Math.max(...displayData.map(d => d.growth));
  const maxMultiple = Math.max(...displayData.map(d => d.multiple));
  const maxMarketCap = Math.max(...displayData.map(d => d.marketCap));
  const topGrowthSector = displayData.find(d => d.growth === maxGrowth)?.name || 'Gen AI';

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-700 p-12 bg-white rounded-xl shadow-sm border border-gray-200 hover-card">
        <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-200 opacity-75"></div>
            <div className="relative bg-white p-4 rounded-full shadow-md">
                <Loader2 size={40} className="animate-spin text-gray-700" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-fintech-charcoal">{t('Gerçek Zamanlı Veriler Çekiliyor')}</h3>
        <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
           <Sparkles size={14} /> Google Search üzerinden güncel piyasa verileri taranıyor...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-xl font-bold text-fintech-charcoal">{t('Sektörel Endeksler Karşılaştırması')}</h2>
        </div>
        <p className="text-gray-700 text-sm">
          {t('Özel olarak oluşturulmuş pazar segmentlerindeki halka açık şirketlerin performansını sistematik olarak takip edin.')}
        </p>
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveMetric('growth')}
          className={`p-4 rounded-xl border text-left transition-all ${activeMetric === 'growth' ? 'border-gray-700 bg-gray-50 ring-2 ring-blue-200' : 'border-gray-200 bg-white hover:border-blue-300'}`}
        >
          <div className="flex items-center gap-2 text-fintech-charcoal mb-2">
            <Activity size={18} />
            <span className="font-semibold">{t('Büyüme Hızı')}</span>
          </div>
          <p className="text-2xl font-bold text-fintech-charcoal">{topGrowthSector} <span className="text-sm text-gray-500 ml-2">Lider</span></p>
        </button>

        <button 
          onClick={() => setActiveMetric('multiple')}
          className={`p-4 rounded-xl border text-left transition-all ${activeMetric === 'multiple' ? 'border-fintech-coral bg-red-50 ring-2 ring-orange-200' : 'border-gray-200 bg-white hover:border-red-300'}`}
        >
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <BarChart3 size={18} />
            <span className="font-semibold">{t('Değerleme Çarpanları')}</span>
          </div>
          <p className="text-2xl font-bold text-fintech-charcoal">{maxMultiple}x <span className="text-sm text-gray-500 ml-2">Zirve</span></p>
        </button>

        <button 
          onClick={() => setActiveMetric('marketCap')}
          className={`p-4 rounded-xl border text-left transition-all ${activeMetric === 'marketCap' ? 'border-gray-500 bg-gray-50 ring-2 ring-teal-200' : 'border-gray-200 bg-white hover:border-teal-300'}`}
        >
          <div className="flex items-center gap-2 text-fintech-charcoal mb-2">
            <DollarSign size={18} />
            <span className="font-semibold">{t('Piyasa Hacmi')}</span>
          </div>
          <p className="text-2xl font-bold text-fintech-charcoal">${maxMarketCap >= 1000 ? (maxMarketCap/1000).toFixed(1) + 'T' : maxMarketCap + 'B'} <span className="text-sm text-gray-500 ml-2">Maks</span></p>
        </button>
      </div>

      {/* Chart Area */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
        <h3 className="text-lg font-bold text-fintech-charcoal mb-6">{getMetricLabel(activeMetric)} {t('Karşılaştırması')}</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(val) => activeMetric === 'marketCap' ? `$${val}B` : activeMetric === 'growth' ? `${val}%` : `${val}x`}
              />
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => {
                  if (activeMetric === 'marketCap') return [`$${value} Milyar`, getMetricLabel(activeMetric)];
                  if (activeMetric === 'growth') return [`%${value}`, getMetricLabel(activeMetric)];
                  return [`${value}x`, getMetricLabel(activeMetric)];
                }}
              />
              <Bar dataKey={activeMetric} radius={[6, 6, 0, 0]}>
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data View (Table for Desktop, Cards for Mobile) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover-card">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-700 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">{t('Sektör')}</th>
                <th className="px-6 py-4 text-right">{t('Yıllık Büyüme')}</th>
                <th className="px-6 py-4 text-right">{t('EV/Revenue Çarpanı')}</th>
                <th className="px-6 py-4 text-right">{t('Piyasa Değeri')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayData.map((sector, idx) => (
                <tr key={idx} className="hover:bg-white transition-colors">
                  <td className="px-6 py-4 font-medium text-fintech-charcoal flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                    {sector.name}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-500">+{sector.growth}%</td>
                  <td className="px-6 py-4 text-right text-gray-700">{sector.multiple}x</td>
                  <td className="px-6 py-4 text-right text-gray-700">${sector.marketCap}B</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {displayData.map((sector, idx) => (
            <div key={idx} className="p-4 space-y-3">
              <div className="flex items-center gap-2 font-bold text-fintech-charcoal text-base">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                {sector.name}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-gray-500 text-xs mb-1">{t('Yıllık Büyüme')}</div>
                  <div className="font-semibold text-gray-500">+{sector.growth}%</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-gray-500 text-xs mb-1">{t('EV/Revenue Çarpanı')}</div>
                  <div className="font-semibold text-fintech-charcoal">{sector.multiple}x</div>
                </div>
                <div className="bg-white p-3 rounded-lg col-span-2">
                  <div className="text-gray-500 text-xs mb-1">{t('Piyasa Değeri')}</div>
                  <div className="font-semibold text-fintech-charcoal">${sector.marketCap}B</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
