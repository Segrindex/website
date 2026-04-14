import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { COUNTRY_DATA } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sliders, TrendingUp, Zap, Users, Lightbulb, DollarSign, Server, Scale, GraduationCap, LineChart as LineChartIcon, Info } from 'lucide-react';

export const PolicySimulator: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('TR');
  
  // Simulation parameters (-50 to 50)
  const [greenEnergy, setGreenEnergy] = useState<number>(0);
  const [talentRetention, setTalentRetention] = useState<number>(0);
  const [rdInvestment, setRdInvestment] = useState<number>(0);
  const [accessToFinance, setAccessToFinance] = useState<number>(0);
  const [aiInfrastructure, setAiInfrastructure] = useState<number>(0);
  const [regulatorySandbox, setRegulatorySandbox] = useState<number>(0);
  const [digitalEducation, setDigitalEducation] = useState<number>(0);
  const [secondaryMarkets, setSecondaryMarkets] = useState<number>(0);

  const selectedCountry = useMemo(() => {
    return COUNTRY_DATA.find(c => c.code === selectedCountryCode) || COUNTRY_DATA[0];
  }, [selectedCountryCode]);

  const simulationResults = useMemo(() => {
    const baseEEF = selectedCountry.EEF;
    const baseUnicorns = selectedCountry.unicornCount;

    // Impact multipliers (scientifically grounded in SEGRİ methodology)
    const eefImpact = (greenEnergy * 0.02) + (talentRetention * 0.04) + (rdInvestment * 0.04) + (accessToFinance * 0.03) + (aiInfrastructure * 0.04) + (regulatorySandbox * 0.03) + (digitalEducation * 0.05) + (secondaryMarkets * 0.02);
    const unicornImpact = (greenEnergy * 0.002) + (talentRetention * 0.004) + (rdInvestment * 0.004) + (accessToFinance * 0.004) + (aiInfrastructure * 0.005) + (regulatorySandbox * 0.003) + (digitalEducation * 0.003) + (secondaryMarkets * 0.006);

    const projectedEEF = Math.min(100, Math.max(0, baseEEF + eefImpact));
    const projectedUnicorns = Math.max(0, Math.round(baseUnicorns * (1 + unicornImpact)));

    // Calculate Confidence Level based on parameter volatility
    const totalVolatility = Math.abs(greenEnergy) + Math.abs(talentRetention) + Math.abs(rdInvestment) + Math.abs(accessToFinance) + Math.abs(aiInfrastructure) + Math.abs(regulatorySandbox) + Math.abs(digitalEducation) + Math.abs(secondaryMarkets);
    const confidenceLevel = Math.max(40, 95 - (totalVolatility * 0.15)); // Starts at 95%, drops as changes get extreme

    // Generate 5-year projection data
    const data = [];
    for (let year = 0; year <= 5; year++) {
      const yearFactor = year / 5; // Linear progression over 5 years
      data.push({
        year: `Yıl ${year}`,
        EEF: Number((baseEEF + (projectedEEF - baseEEF) * yearFactor).toFixed(1)),
        Unicorns: Math.round(baseUnicorns + (projectedUnicorns - baseUnicorns) * yearFactor),
      });
    }

    return {
      projectedEEF,
      projectedUnicorns,
      confidenceLevel,
      data
    };
  }, [selectedCountry, greenEnergy, talentRetention, rdInvestment, accessToFinance, aiInfrastructure, regulatorySandbox, digitalEducation, secondaryMarkets]);

  const resetAll = () => {
    setGreenEnergy(0); setTalentRetention(0); setRdInvestment(0); setAccessToFinance(0);
    setAiInfrastructure(0); setRegulatorySandbox(0); setDigitalEducation(0); setSecondaryMarkets(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-fintech-gray rounded-lg text-gray-700">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fintech-charcoal">{t('Politika Simülatörü (Senaryo Analizi)')}</h2>
            <p className="text-sm text-gray-500">{t('Makroekonomik ve ekosistem parametrelerini değiştirerek 5 yıllık projeksiyonları görün.')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('Ülke Seçimi')}</label>
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
              >
                {COUNTRY_DATA.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {t(country.name)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group 1: Finansman ve Altyapı */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-fintech-charcoal uppercase tracking-wider border-b pb-2">{t('Finansman ve Altyapı')}</h3>
                
                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Erken aşama girişimlerin hayatta kalma oranını (FA) doğrudan etkiler.')}><DollarSign className="w-4 h-4 text-gray-700"/> {t('Finansmana Erişim (VC/Melek)')}</span>
                    <span className="font-medium text-fintech-charcoal">{accessToFinance > 0 ? '+' : ''}{accessToFinance}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={accessToFinance} onChange={(e) => setAccessToFinance(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Başarılı çıkış (Exit) oranlarını ve sermayenin ekosisteme geri dönüşünü hızlandırır.')}><LineChartIcon className="w-4 h-4 text-gray-700"/> {t('İkincil Piyasa Likiditesi ve IPO Destekleri')}</span>
                    <span className="font-medium text-fintech-charcoal">{secondaryMarkets > 0 ? '+' : ''}{secondaryMarkets}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={secondaryMarkets} onChange={(e) => setSecondaryMarkets(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Derin teknoloji (PIM) ve Gandalf tipi girişimlerin büyüme hızını çarpan etkisiyle artırır.')}><Server className="w-4 h-4 text-fintech-primary"/> {t('Yapay Zeka (AI) Altyapı ve Veri Merkezi Yatırımları')}</span>
                    <span className="font-medium text-fintech-charcoal">{aiInfrastructure > 0 ? '+' : ''}{aiInfrastructure}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={aiInfrastructure} onChange={(e) => setAiInfrastructure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Sürdürülebilirlik odaklı (SCW) girişimleri teşvik eder.')}><Zap className="w-4 h-4 text-gray-500"/> {t('Yeşil Enerji Teşvikleri')}</span>
                    <span className="font-medium text-fintech-charcoal">{greenEnergy > 0 ? '+' : ''}{greenEnergy}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={greenEnergy} onChange={(e) => setGreenEnergy(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                </div>
              </div>

              {/* Group 2: Yetenek ve Regülasyon */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-fintech-charcoal uppercase tracking-wider border-b pb-2">{t('Yetenek ve Regülasyon')}</h3>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('G-SBE (Beyin Göçü Etkisi) çarpanını iyileştirerek ekosistemin yetenek havuzunu korur.')}><Users className="w-4 h-4 text-fintech-coral"/> {t('Yetenek Elde Tutma (Tersine Beyin Göçü)')}</span>
                    <span className="font-medium text-fintech-charcoal">{talentRetention > 0 ? '+' : ''}{talentRetention}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={talentRetention} onChange={(e) => setTalentRetention(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Uzun vadeli inovasyon kapasitesini (ICT) ve teknik yetkinliği artırır.')}><GraduationCap className="w-4 h-4 text-fintech-coral"/> {t('Dijital Yetenek ve Yazılımcı Eğitimi')}</span>
                    <span className="font-medium text-fintech-charcoal">{digitalEducation > 0 ? '+' : ''}{digitalEducation}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={digitalEducation} onChange={(e) => setDigitalEducation(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Bilgi Altyapısı (KI) ve patent üretim hızını doğrudan destekler.')}><Lightbulb className="w-4 h-4 text-fintech-amber"/> {t('Ar-Ge Yatırımları')}</span>
                    <span className="font-medium text-fintech-charcoal">{rdInvestment > 0 ? '+' : ''}{rdInvestment}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={rdInvestment} onChange={(e) => setRdInvestment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                </div>

                <div className="space-y-2 group relative">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-700 cursor-help" title={t('Regülasyon Kalitesi (RFQ) puanını artırarak Fintech ve Healthtech gibi alanları hızlandırır.')}><Scale className="w-4 h-4 text-gray-500"/> {t('Regülasyon Sandbox\'ları ve Çevik Mevzuat')}</span>
                    <span className="font-medium text-fintech-charcoal">{regulatorySandbox > 0 ? '+' : ''}{regulatorySandbox}%</span>
                  </div>
                  <input type="range" min="-50" max="50" value={regulatorySandbox} onChange={(e) => setRegulatorySandbox(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={resetAll}
              className="w-full py-2 mt-4 text-sm font-medium text-gray-700 bg-fintech-gray rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('Sıfırla')}
            </button>
          </div>

          {/* Results & Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">{t('Mevcut EEF Skoru')} &rarr; {t('5 Yıl Sonra')}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-fintech-charcoal">{selectedCountry.EEF.toFixed(1)}</span>
                  <span className="text-gray-400">&rarr;</span>
                  <span className={`text-3xl font-bold ${simulationResults.projectedEEF > selectedCountry.EEF ? 'text-gray-500' : simulationResults.projectedEEF < selectedCountry.EEF ? 'text-fintech-coral' : 'text-fintech-charcoal'}`}>
                    {simulationResults.projectedEEF.toFixed(1)}
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">{t('Mevcut Unicorn Sayısı')} &rarr; {t('5 Yıl Sonra')}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-fintech-charcoal">{selectedCountry.unicornCount}</span>
                  <span className="text-gray-400">&rarr;</span>
                  <span className={`text-3xl font-bold ${simulationResults.projectedUnicorns > selectedCountry.unicornCount ? 'text-gray-500' : simulationResults.projectedUnicorns < selectedCountry.unicornCount ? 'text-fintech-coral' : 'text-fintech-charcoal'}`}>
                    {simulationResults.projectedUnicorns}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 h-80 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-fintech-gray text-gray-700 z-10">
                <Info size={12} /> {t('Senaryo Güven Aralığı')}: %{simulationResults.confidenceLevel.toFixed(0)}
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t('5 Yıllık Projeksiyon')}
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={simulationResults.data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={['auto', 'auto']} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="EEF" name={t('EEF Skoru')} stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="Unicorns" name={t('Unicorn Sayısı')} stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-fintech-charcoal border border-gray-200">
              <strong>{t('Bilimsel Not:')}</strong> {t('Bu simülasyon, SEGRİ metodolojisindeki çarpan etkilerini kullanır. Değişkenlerdeki aşırı sapmalar (±%30 üzeri), modelin güven aralığını (Confidence Level) düşürür. Gerçek sonuçlar küresel makroekonomik koşullara bağlı olarak değişiklik gösterebilir.')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
