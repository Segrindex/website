import React from 'react';
import { useLanguage } from '../LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Legend, Cell } from 'recharts';
import { ShieldAlert, Activity, RefreshCw, AlertTriangle, HeartPulse, Shield } from 'lucide-react';

const FAILURE_REASONS = [
  { reason: 'Nakit Akışı Sorunu', value: 38, color: '#ef4444' },
  { reason: 'Pazar Uyumsuzluğu', value: 35, color: '#f97316' },
  { reason: 'Rekabete Yenilme', value: 20, color: '#eab308' },
  { reason: 'İş Modeli Eksikliği', value: 19, color: '#84cc16' },
  { reason: 'Fiyatlama / Maliyet Sorunları', value: 15, color: '#22c55e' },
  { reason: 'Yanlış Ekip', value: 14, color: '#06b6d4' },
  { reason: 'Kötü Ürün / Teknoloji', value: 8, color: '#3b82f6' },
  { reason: 'Regülasyon / Yasal Sorunlar', value: 8, color: '#8b5cf6' },
];

const ECOSYSTEM_RESILIENCE = [
  { country: 'Küresel Ortalama', failFast: 70, talentRecycling: 65, failureRate: 90 },
  { country: 'ABD (Silikon Vadisi)', failFast: 95, talentRecycling: 92, failureRate: 90 },
  { country: 'İsrail', failFast: 90, talentRecycling: 88, failureRate: 85 },
  { country: 'İngiltere', failFast: 85, talentRecycling: 85, failureRate: 82 },
  { country: 'Çin', failFast: 82, talentRecycling: 80, failureRate: 88 },
  { country: 'Almanya', failFast: 75, talentRecycling: 78, failureRate: 75 },
  { country: 'Fransa', failFast: 70, talentRecycling: 75, failureRate: 70 },
  { country: 'Türkiye', failFast: 60, talentRecycling: 55, failureRate: 80 },
  { country: 'Hindistan', failFast: 65, talentRecycling: 60, failureRate: 85 },
  { country: 'İsveç', failFast: 88, talentRecycling: 86, failureRate: 78 },
  { country: 'Hollanda', failFast: 84, talentRecycling: 82, failureRate: 76 },
  { country: 'İsviçre', failFast: 80, talentRecycling: 85, failureRate: 72 },
  { country: 'Avustralya', failFast: 78, talentRecycling: 76, failureRate: 80 },
];

export const FailureAnalysis: React.FC = () => {
  const { t } = useLanguage();

  const translatedReasons = FAILURE_REASONS.map(item => ({
    ...item,
    reason: t(item.reason)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-fintech-charcoal">{t(data.country)}</p>
          <p className="text-sm text-gray-700">{t('Fail-Fast Olgunluğu')}: <span className="font-semibold">{data.failFast}</span></p>
          <p className="text-sm text-gray-700">{t('Yetenek Geri Dönüşüm Oranı')}: <span className="font-semibold">{data.talentRecycling}%</span></p>
          <p className="text-sm text-gray-700">{t('Başarısızlık Oranı')}: <span className="font-semibold">%{data.failureRate}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-50 rounded-lg text-fintech-coral">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fintech-charcoal">{t('Başarısızlık ve Dirençlilik Endeksi')}</h2>
            <p className="text-sm text-gray-500">{t('Ekosistemlerin "başarısızlık oranlarını", "fail-fast" (hızlı batma) olgunluğunu ve başarısızlık nedenlerini analiz eder.')}</p>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-red-50 text-fintech-coral rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">{t('Küresel Başarısızlık Oranı')}</div>
              <div className="text-2xl font-bold text-fintech-charcoal">%90</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-red-50 text-fintech-coral rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">{t('Ortalama Ömür (Başarısız Girişimler)')}</div>
              <div className="text-2xl font-bold text-fintech-charcoal">20 {t('Ay')}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-red-50 text-fintech-coral rounded-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">{t('En Sık Görülen Neden')}</div>
              <div className="text-lg font-bold text-fintech-charcoal">{t('Nakit Akışı Sorunu')}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Reasons Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover-card">
            <h3 className="text-base font-semibold text-fintech-charcoal mb-4">{t('Başarısızlık Nedenleri (Post-Mortem)')}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={translatedReasons} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="reason" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} width={140} />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {translatedReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">{t('Not: Birden fazla neden seçilebildiği için toplam %100\'ü aşabilir.')}</p>
          </div>

          {/* Fail-Fast Scatter Chart */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover-card">
            <h3 className="text-base font-semibold text-fintech-charcoal mb-4">{t('Fail-Fast ve Yetenek Geri Dönüşümü')}</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="failFast" name={t('Fail-Fast Olgunluğu')} domain={[50, 100]} tick={{ fill: '#475569' }} label={{ value: t('Fail-Fast Olgunluğu'), position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="number" dataKey="talentRecycling" name={t('Yetenek Geri Dönüşüm Oranı')} domain={[50, 100]} tick={{ fill: '#475569' }} label={{ value: t('Yetenek Geri Dönüşüm Oranı'), angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} />
                  <ZAxis type="number" dataKey="failureRate" range={[100, 500]} name={t('Başarısızlık Oranı')} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Ecosystems" data={ECOSYSTEM_RESILIENCE} fill="#8b5cf6">
                    {ECOSYSTEM_RESILIENCE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.country === 'Küresel Ortalama' ? '#94a3b8' : entry.failFast > 80 ? '#10b981' : entry.failFast > 65 ? '#f59e0b' : '#ef4444'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">{t('Balon boyutu Başarısızlık Oranını temsil eder. Sağ üst köşe en sağlıklı ekosistemleri gösterir.')}</p>
          </div>
        </div>

        {/* Gimli Typology Explanation */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex gap-4 items-start">
          <div className="p-3 bg-fintech-gray text-fintech-charcoal rounded-full shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-teal-900 mb-2">{t('Gimli Tipolojisi ve Ekosistem Direnci')}</h3>
            <p className="text-fintech-charcoal text-sm leading-relaxed">
              {t('Sağlıklı bir ekosistem, girişimlerin hızlı batıp (fail-fast) yeteneklerin ve sermayenin sisteme geri döndüğü ekosistemdir. Gimli tipolojisi, zorluklara dayanabilen, pivot edebilen ve ekosistemin omurgasını oluşturan dirençli girişimleri temsil eder. Başarısızlık bir son değil, ekosistemin öğrenme ve olgunlaşma sürecidir.')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
