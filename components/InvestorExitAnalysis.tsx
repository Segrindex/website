import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Briefcase, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const INVESTOR_DATA = [
  { nameKey: 'Melek Yatırımcı', value: 35, color: '#3b82f6' },
  { nameKey: 'Girişim Sermayesi (VC)', value: 45, color: '#8b5cf6' },
  { nameKey: 'Kurumsal VC (CVC)', value: 20, color: '#10b981' },
];

const EXIT_ROUTES = [
  { countryKey: 'Küresel Ortalama', ma: 1200, ipo: 80 },
  { countryKey: 'ABD (Silikon Vadisi)', ma: 2500, ipo: 150 },
  { countryKey: 'İngiltere', ma: 800, ipo: 45 },
  { countryKey: 'İsrail', ma: 450, ipo: 25 },
  { countryKey: 'Almanya', ma: 350, ipo: 15 },
  { countryKey: 'İsveç', ma: 280, ipo: 12 },
  { countryKey: 'Hollanda', ma: 220, ipo: 10 },
  { countryKey: 'Türkiye', ma: 45, ipo: 5 },
];

export const InvestorExitAnalysis: React.FC = () => {
  const { t } = useLanguage();

  const translatedInvestorData = INVESTOR_DATA.map(item => ({
    ...item,
    name: t(item.nameKey)
  }));

  const translatedExitRoutes = EXIT_ROUTES.map(item => ({
    ...item,
    country: t(item.countryKey)
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-fintech-gray rounded-lg text-gray-500">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fintech-charcoal">{t('Yatırımcı Olgunluğu & Çıkışlar')}</h2>
            <p className="text-sm text-gray-500">{t('Ekosistemin nihai başarı kriteri olan Exit (M&A/IPO) oranlarını ve yatırımcı profilini analiz eder.')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="w-5 h-5 text-fintech-coral" />
              <h3 className="font-semibold text-gray-700">{t('Sermaye Geri Dönüşümü')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">%42</p>
            <p className="text-xs text-gray-500 mt-1">{t('Exit yapan kurucuların melek yatırımcı olma oranı')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">{t('Ortalama Exit Süresi')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">6.8 {t('Yıl')}</p>
            <p className="text-xs text-gray-500 mt-1">{t('Tohum aşamasından Exit\'e kadar geçen süre')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-700">{t('M&A / IPO Oranı')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">12:1</p>
            <p className="text-xs text-gray-500 mt-1">{t('Her 1 Halka Arza karşılık 12 Satın Alma')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover-card">
            <h3 className="text-lg font-bold text-fintech-charcoal mb-6 text-center">{t('Yatırımcı Dağılımı')}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={translatedInvestorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {translatedInvestorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`%${value}`, '']}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover-card">
            <h3 className="text-lg font-bold text-fintech-charcoal mb-6 text-center">{t('Çıkış (Exit) Rotaları')}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={translatedExitRoutes} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="country" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }} 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="ma" name={t('Satın Alma (M&A)')} stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="ipo" name={t('Halka Arz (IPO)')} stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-fintech-gray rounded-full text-gray-500 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-900 mb-2">{t('Sermaye ve Yetenek Geri Dönüşümü')}</h3>
              <p className="text-fintech-charcoal leading-relaxed">
                {t('Bir ekosistemin sürdürülebilirliği, sadece yatırım turlarına değil, başarılı çıkışlara (Exit) bağlıdır. M&A veya IPO yapan kurucular ve çalışanlar, elde ettikleri sermaye ve deneyimle ekosisteme "Melek Yatırımcı" veya "Seri Girişimci" olarak geri dönerler. Bu döngü, EEF (Ekosistem Verimlilik Faktörü) skorunun kalıcılığını sağlar.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
