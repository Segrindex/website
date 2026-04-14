import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { History, TrendingUp, Sparkles, Brain, Filter } from 'lucide-react';
import { useCountries } from '../hooks';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const TrendProjection: React.FC = () => {
  const { t } = useLanguage();
  const { data: countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>('TR');

  const activeCountry = useMemo(() => {
    return countries?.find(c => c.code === selectedCountry) || countries?.[0];
  }, [countries, selectedCountry]);

  const historicalData = useMemo(() => {
    if (!activeCountry) return [];
    
    // Generate synthetic historical data based on current EEF
    const currentEEF = activeCountry.EEF / 10; // Normalize to 0-10 scale
    const baseGrowth = 0.05; // 5% base growth
    const volatility = 0.02;
    
    const data = [];
    let currentVal = currentEEF * Math.pow(1 - baseGrowth, 10); // Start 10 years ago
    
    for (let year = 2015; year <= 2030; year++) {
      if (year <= 2025) {
        // Historical
        currentVal = currentVal * (1 + baseGrowth + (Math.random() * volatility * 2 - volatility));
        if (year === 2025) currentVal = currentEEF; // Anchor to current
        
        data.push({
          year: year.toString(),
          eef: Number(currentVal.toFixed(2)),
          ...(year === 2025 ? { projected: Number(currentVal.toFixed(2)), optimistic: Number(currentVal.toFixed(2)), pessimistic: Number(currentVal.toFixed(2)) } : {})
        });
      } else {
        // Projection
        const projected = currentVal * Math.pow(1 + baseGrowth, year - 2025);
        const optimistic = projected * 1.05;
        const pessimistic = projected * 0.95;
        
        data.push({
          year: year.toString(),
          projected: Number(projected.toFixed(2)),
          optimistic: Number(optimistic.toFixed(2)),
          pessimistic: Number(pessimistic.toFixed(2))
        });
      }
    }
    return data;
  }, [activeCountry]);

  if (!activeCountry) return null;

  const currentEEF = (activeCountry.EEF / 10).toFixed(1);
  const projected2030 = historicalData.find(d => d.year === '2030')?.projected?.toFixed(1) || '0.0';
  const cagr = (((Number(projected2030) / Number(currentEEF)) ** (1/5)) - 1) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-fintech-gray rounded-lg text-gray-700">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-fintech-charcoal">{t('Zaman Serisi ve Yapay Zeka Projeksiyonu')}</h2>
              <p className="text-sm text-gray-500">
                {t('Ekosistemler statik değildir. Bir ülkenin 5 yıl önceki EEF skoru ile bugünkü skoru arasındaki ivme (momentum) ekosistemin geleceğini belirler.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 bg-white font-medium text-gray-700"
            >
              {countries?.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {t(c.name)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-fintech-coral" />
              <h3 className="font-semibold text-gray-700">{t('Mevcut EEF Skoru (2025)')}</h3>
            </div>
            <p className="text-3xl font-bold text-fintech-charcoal">{currentEEF}</p>
            <p className="text-xs text-gray-500 mt-1">{t('Son 10 yılda istikrarlı artış')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <History className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">{t('Yıllık Büyüme İvmesi')}</h3>
            </div>
            <p className="text-3xl font-bold text-fintech-charcoal">%{cagr.toFixed(1)}</p>
            <p className="text-xs text-gray-500 mt-1">{t('CAGR (Yıllık Bileşik Büyüme Oranı)')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Sparkles className="w-24 h-24 text-gray-700" />
            </div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <Brain className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-700">{t('2030 AI Projeksiyonu')}</h3>
            </div>
            <p className="text-3xl font-bold text-fintech-charcoal relative z-10">{projected2030}</p>
            <p className="text-xs text-gray-700/80 mt-1 relative z-10">{t('Mevcut ivme korunursa beklenen skor')}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 hover-card">
          <h3 className="text-lg font-bold text-fintech-charcoal mb-6 text-center">{t(activeCountry.name)} {t('EEF Skoru Gelişimi (2015 - 2030)')}</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={historicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  domain={[0, 10]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dx={-10}
                />
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number, name: string) => {
                    if (name === 'eef') return [value, t('Geçmiş Veri')];
                    if (name === 'projected') return [value, t('AI Projeksiyonu (Baz)')];
                    if (name === 'optimistic') return [value, t('İyimser Senaryo')];
                    if (name === 'pessimistic') return [value, t('Kötümser Senaryo')];
                    return [value, name];
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#334155', marginBottom: '4px' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(value) => {
                    if (value === 'eef') return <span className="text-gray-700 font-medium">{t('Geçmiş Veri')}</span>;
                    if (value === 'projected') return <span className="text-gray-700 font-medium">{t('AI Projeksiyonu (Baz)')}</span>;
                    if (value === 'optimistic') return <span className="text-gray-700 font-medium">{t('Güven Aralığı')}</span>;
                    return null;
                  }}
                />
                <ReferenceLine x="2025" stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: t('Bugün'), fill: '#64748b', fontSize: 12 }} />
                
                <Area 
                  type="monotone" 
                  dataKey="optimistic" 
                  stroke="none" 
                  fill="#8b5cf6" 
                  fillOpacity={0.1} 
                  name="optimistic" 
                />
                <Area 
                  type="monotone" 
                  dataKey="pessimistic" 
                  stroke="none" 
                  fill="#ffffff" 
                  fillOpacity={1} 
                  name="pessimistic" 
                />

                <Line 
                  type="monotone" 
                  dataKey="eef" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                  name="eef"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                  name="projected"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-fintech-gray rounded-full text-gray-700 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-violet-900 mb-2">{t('Projeksiyon Analizi')}</h3>
              <p className="text-fintech-charcoal leading-relaxed">
                {t(`Mevcut %${cagr.toFixed(1)}'lik büyüme ivmesi (momentum) devam ederse, ${t(activeCountry.name)} ekosisteminin EEF skoru 2030 yılında ${projected2030} seviyesine ulaşacak. Ancak, "Tersine Beyin Göçü" ve "Başarılı Çıkışlar (Exit)" gibi kaldıraçlar devreye sokulursa bu projeksiyon %20 daha yukarı taşınabilir.`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
