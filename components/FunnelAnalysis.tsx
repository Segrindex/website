import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Filter, ArrowDown, AlertCircle, TrendingDown, Target, Globe, ArrowRight } from 'lucide-react';

const FUNNEL_DATA: Record<string, { stage: string, value: number, color: string }[]> = {
  'GLOBAL': [
    { stage: 'Tohum (Seed)', value: 10000, color: 'bg-gray-400' },
    { stage: 'Seri A', value: 2000, color: 'bg-gray-600' },
    { stage: 'Seri B', value: 700, color: 'bg-gray-700' },
    { stage: 'Seri C+', value: 250, color: 'bg-fintech-charcoal' },
    { stage: 'Unicorn', value: 25, color: 'bg-fintech-charcoal' },
  ],
  'US': [
    { stage: 'Tohum (Seed)', value: 15000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 3750, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 1500, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 600, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 75, color: 'bg-fintech-coral' },
  ],
  'TR': [
    { stage: 'Tohum (Seed)', value: 1200, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 96, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 24, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 6, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 1, color: 'bg-fintech-coral' },
  ],
  'UK': [
    { stage: 'Tohum (Seed)', value: 4000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 880, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 308, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 107, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 16, color: 'bg-fintech-coral' },
  ],
  'IL': [
    { stage: 'Tohum (Seed)', value: 2000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 560, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 224, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 89, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 13, color: 'bg-fintech-coral' },
  ],
  'DE': [
    { stage: 'Tohum (Seed)', value: 3000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 600, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 210, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 73, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 10, color: 'bg-fintech-coral' },
  ],
  'SE': [
    { stage: 'Tohum (Seed)', value: 1500, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 350, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 140, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 55, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 8, color: 'bg-fintech-coral' },
  ],
  'NL': [
    { stage: 'Tohum (Seed)', value: 1800, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 400, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 150, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 60, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 9, color: 'bg-fintech-coral' },
  ],
  'FR': [
    { stage: 'Tohum (Seed)', value: 3500, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 700, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 245, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 85, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 12, color: 'bg-fintech-coral' },
  ],
  'CA': [
    { stage: 'Tohum (Seed)', value: 2500, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 550, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 190, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 65, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 8, color: 'bg-fintech-coral' },
  ],
  'IN': [
    { stage: 'Tohum (Seed)', value: 8000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 1200, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 400, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 150, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 20, color: 'bg-fintech-coral' },
  ],
  'SG': [
    { stage: 'Tohum (Seed)', value: 1200, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 300, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 120, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 45, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 6, color: 'bg-fintech-coral' },
  ],
  'CH': [
    { stage: 'Tohum (Seed)', value: 1000, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 250, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 100, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 40, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 5, color: 'bg-fintech-coral' },
  ],
  'AU': [
    { stage: 'Tohum (Seed)', value: 2200, color: 'bg-fintech-coral' },
    { stage: 'Seri A', value: 480, color: 'bg-gray-500' },
    { stage: 'Seri B', value: 170, color: 'bg-gray-500' },
    { stage: 'Seri C+', value: 60, color: 'bg-fintech-coral' },
    { stage: 'Unicorn', value: 7, color: 'bg-fintech-coral' },
  ]
};

const COUNTRY_NAMES: Record<string, string> = {
  'US': 'ABD (Silikon Vadisi)',
  'TR': 'Türkiye',
  'UK': 'İngiltere',
  'IL': 'İsrail',
  'DE': 'Almanya',
  'FR': 'Fransa',
  'SE': 'İsveç',
  'NL': 'Hollanda',
  'CH': 'İsviçre',
  'CA': 'Kanada',
  'AU': 'Avustralya',
  'IN': 'Hindistan',
  'SG': 'Singapur'
};

export const FunnelAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>('TR');

  const data = FUNNEL_DATA[selectedCountry] || FUNNEL_DATA['TR'];
  const globalData = FUNNEL_DATA['GLOBAL'];
  const maxVal = data[0].value || 1;

  const calculateConversion = (current: number, previous: number) => {
    if (!previous || previous === 0) return "0.0";
    return ((current / previous) * 100).toFixed(1);
  };

  const seedToA = Number(calculateConversion(data[1].value, data[0].value));
  const aToB = Number(calculateConversion(data[2].value, data[1].value));
  const bToC = Number(calculateConversion(data[3].value, data[2].value));
  const cToUnicorn = Number(calculateConversion(data[4].value, data[3].value));

  const globalSeedToA = Number(calculateConversion(globalData[1].value, globalData[0].value));
  const globalAToB = Number(calculateConversion(globalData[2].value, globalData[1].value));
  const globalBToC = Number(calculateConversion(globalData[3].value, globalData[2].value));
  const globalCToUnicorn = Number(calculateConversion(globalData[4].value, globalData[3].value));

  const hasSeedProblem = seedToA < globalSeedToA; 
  const hasGrowthProblem = aToB < globalAToB;
  const hasScaleProblem = cToUnicorn < globalCToUnicorn;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-fintech-gray rounded-lg text-gray-700">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-fintech-charcoal">{t('Erken Aşama Dönüşüm Hunisi')}</h2>
              <p className="text-sm text-gray-500">{t('Tohum aşamasından Unicorn seviyesine geçiş oranlarını ve ekosistemdeki darboğazları analiz eder.')}</p>
            </div>
          </div>
          
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 bg-white font-medium text-gray-700"
          >
            {Object.keys(COUNTRY_NAMES).map(code => (
              <option key={code} value={code}>{t(COUNTRY_NAMES[code])}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Funnel Visualization */}
          <div className="lg:col-span-6 bg-white rounded-xl p-8 border border-gray-200 flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-full max-w-md space-y-2">
              {data.map((step, index) => {
                const widthPercent = Math.max(15, (step.value / maxVal) * 100);
                const prevStep = index > 0 ? data[index - 1] : null;
                const conversionRate = prevStep ? calculateConversion(step.value, prevStep.value) : null;
                const globalPrevStep = index > 0 ? globalData[index - 1] : null;
                const globalConversionRate = globalPrevStep ? calculateConversion(globalData[index].value, globalPrevStep.value) : null;
                const isBelowGlobal = Number(conversionRate) < Number(globalConversionRate);

                return (
                  <React.Fragment key={step.stage}>
                    {index > 0 && (
                      <div className="flex flex-col items-center justify-center py-2 relative">
                        <div className={`absolute right-0 md:-right-10 px-3 py-1.5 rounded-lg shadow-sm border text-xs font-bold flex flex-col items-end gap-1 z-10 ${isBelowGlobal ? 'bg-red-50 border-red-300 text-gray-700' : 'bg-gray-50 border-gray-300 text-fintech-charcoal'}`}>
                          <span className="flex items-center gap-1">
                            <TrendingDown className={`w-3 h-3 ${isBelowGlobal ? 'text-fintech-coral' : 'text-gray-500'}`} /> 
                            %{conversionRate}
                          </span>
                          <span className="text-[10px] opacity-70 font-normal flex items-center gap-1" title={t('Küresel Ortalama')}>
                            <Globe className="w-3 h-3" /> %{globalConversionRate}
                          </span>
                        </div>
                        <ArrowDown className="w-6 h-6 text-gray-500/30" />
                      </div>
                    )}
                    <div className="w-full flex justify-center group">
                      <div 
                        style={{ width: `${widthPercent}%` }} 
                        className={`${step.color} h-16 rounded-xl flex items-center justify-between px-5 text-white shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg relative`}
                      >
                        <span className="font-semibold text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">{t(step.stage)}</span>
                        <span className="font-bold text-base md:text-xl">{step.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Analysis & Insights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover-card">
              <h3 className="text-sm font-bold text-fintech-charcoal uppercase tracking-wider mb-5 border-b pb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-gray-700" /> {t('Dönüşüm Oranları (Küresel Kıyaslama)')}
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('Tohum')} &rarr; {t('Seri A')}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium" title={t('Küresel Ortalama')}>(%{globalSeedToA})</span>
                    <span className={`font-bold px-3 py-1 rounded-lg text-sm ${hasSeedProblem ? 'bg-red-50 text-gray-700' : 'bg-fintech-gray text-fintech-charcoal'}`}>
                      %{seedToA}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('Seri A')} &rarr; {t('Seri B')}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium" title={t('Küresel Ortalama')}>(%{globalAToB})</span>
                    <span className={`font-bold px-3 py-1 rounded-lg text-sm ${hasGrowthProblem ? 'bg-red-50 text-gray-700' : 'bg-fintech-gray text-fintech-charcoal'}`}>
                      %{aToB}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{t('Seri C+')} &rarr; {t('Unicorn')}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium" title={t('Küresel Ortalama')}>(%{globalCToUnicorn})</span>
                    <span className={`font-bold px-3 py-1 rounded-lg text-sm ${hasScaleProblem ? 'bg-red-50 text-gray-700' : 'bg-fintech-gray text-fintech-charcoal'}`}>
                      %{cToUnicorn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className={`border rounded-xl p-5 flex gap-4 items-start transition-colors ${hasSeedProblem ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-300'}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${hasSeedProblem ? 'bg-red-50 text-fintech-coral' : 'bg-fintech-gray text-gray-500'}`}>
                  {hasSeedProblem ? <AlertCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1.5 ${hasSeedProblem ? 'text-red-900' : 'text-teal-900'}`}>
                    {hasSeedProblem ? t('Ölçeklenme (Aragorn) Sorunu Tespit Edildi') : t('Sağlıklı Ölçeklenme (Aragorn) Kapasitesi')}
                  </h3>
                  <p className={`text-xs leading-relaxed ${hasSeedProblem ? 'text-gray-700' : 'text-fintech-charcoal'}`}>
                    {hasSeedProblem 
                      ? t('Bu ekosistemde Tohum aşamasından Seri A\'ya geçiş oranı düşük. Çok fazla startup kurulmasına rağmen, şirketler büyümek için gereken "Ölüm Vadisi"ni (Death Valley) geçemiyor. Aragorn tipolojisi (büyük pazar, yüksek hacim) girişimlerin ölçeklenmesi için Seri A/B yatırımlarının artırılması şarttır.')
                      : t('Bu ekosistemde Tohum aşamasından Seri A ve B\'ye geçiş oranları sağlıklı seviyede. Girişimler "Ölüm Vadisi"ni başarıyla geçebiliyor ve Aragorn tipolojisi (büyük pazar, yüksek hacim) şirketler ölçeklenmek için yeterli sermayeyi bulabiliyor.')}
                  </p>
                </div>
              </div>

              <div className={`border rounded-xl p-5 flex gap-4 items-start transition-colors ${hasGrowthProblem ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-300'}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${hasGrowthProblem ? 'bg-red-50 text-fintech-coral' : 'bg-fintech-gray text-gray-500'}`}>
                  {hasGrowthProblem ? <AlertCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1.5 ${hasGrowthProblem ? 'text-red-900' : 'text-teal-900'}`}>
                    {hasGrowthProblem ? t('Büyüme Sermayesi (Growth Capital) Darboğazı') : t('Sağlıklı Büyüme Finansmanı')}
                  </h3>
                  <p className={`text-xs leading-relaxed ${hasGrowthProblem ? 'text-gray-700' : 'text-fintech-charcoal'}`}>
                    {hasGrowthProblem 
                      ? t('Seri A\'dan Seri B\'ye geçişte darboğaz var. Şirketler ürün-pazar uyumunu (PMF) yakalasa bile, bölgesel veya küresel genişleme için gereken büyük montanlı Büyüme Sermayesi (Growth Capital) fonları eksik.')
                      : t('Seri A\'dan Seri B\'ye geçiş başarılı. Ekosistemde yeterli Büyüme Sermayesi (Growth Capital) bulunuyor ve şirketler bölgesel genişlemelerini finanse edebiliyor.')}
                  </p>
                </div>
              </div>

              <div className={`border rounded-xl p-5 flex gap-4 items-start transition-colors ${hasScaleProblem ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-300'}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${hasScaleProblem ? 'bg-red-50 text-fintech-coral' : 'bg-fintech-gray text-gray-500'}`}>
                  {hasScaleProblem ? <AlertCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className={`text-sm font-bold mb-1.5 ${hasScaleProblem ? 'text-red-900' : 'text-teal-900'}`}>
                    {hasScaleProblem ? t('Küresel Ölçeklenme (Unicorn) Bariyeri') : t('Yüksek Küresel Rekabetçilik')}
                  </h3>
                  <p className={`text-xs leading-relaxed ${hasScaleProblem ? 'text-gray-700' : 'text-fintech-charcoal'}`}>
                    {hasScaleProblem 
                      ? t('Geç aşama girişimlerin Unicorn seviyesine ulaşma oranı düşük. Bu durum, şirketlerin küresel pazarlarda rekabet edemediğini veya geç aşama mega-fonların (Late-stage VC/PE) eksikliğini gösterir.')
                      : t('Geç aşama girişimler yüksek oranda Unicorn statüsüne ulaşıyor. Ekosistem, küresel şampiyonlar yaratma konusunda son derece başarılı ve uluslararası mega-fonları çekebiliyor.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

