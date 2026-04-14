
import React, { useState, useEffect } from 'react';
import { useSectorWeights, useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { SectorName } from '../types';
import { calculateRiskScore } from '../utils';
import { TrendingUp, AlertTriangle, ShieldCheck, Zap, Info, BookOpen, Activity, Anchor, Wind, Gem } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine, ReferenceArea, Label } from 'recharts';
import { useLanguage } from '../LanguageContext';

const RiskAnalysis: React.FC = () => {
  const { data: countries, isLoading: isCountriesLoading, isError: isCountriesError, error: countriesError } = useCountries();
  const { data: sectorWeights, isLoading: isWeightsLoading, isError: isWeightsError, error: weightsError } = useSectorWeights();
  const { t } = useLanguage();

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<SectorName>("Teknoloji");
  const [showExplanation, setShowExplanation] = useState(true);

  // 1. SRF: Sektörel Risk Faktörleri (Inputs)
  const [srfInputs, setSrfInputs] = useState({
    TRF: 50, TZR: 50, JRF: 50, ESG: 50, ORF: 50
  });
  
  // 2. KNA: Kör Nokta Analizi (Inputs)
  const [knaInputs, setKnaInputs] = useState({
    OKN: 50, SKN: 50, TKN: 50, KKN: 50
  });

  // 3. VKA: Volatilite ve Kriz Adaptasyonu (NEW Inputs)
  const [vkaInputs, setVkaInputs] = useState({
    CRS: 50, // Crisis Response Speed (Reaksiyon Hızı)
    FBF: 50, // Financial Buffer (Finansmal Tampon/Runway)
    PVC: 50  // Pivot Capacity (Esneklik)
  });

  // Initial selection effect
  useEffect(() => {
    if (countries && countries.length > 0 && !selectedCountryCode) {
      setSelectedCountryCode(countries[0].code);
    }
  }, [countries, selectedCountryCode]);

  const activeCountry = countries?.find(c => c.code === selectedCountryCode);
  const activeWeights = sectorWeights ? sectorWeights[selectedSector] : null;

  // Weights Definitions
  const knaWeights = { OKN: 0.30, SKN: 0.25, TKN: 0.25, KKN: 0.20 };
  const vkaWeights = { CRS: 0.40, FBF: 0.30, PVC: 0.30 };

  const handleSrfChange = (key: string, val: string) => setSrfInputs(p => ({...p, [key]: parseInt(val)}));
  const handleKnaChange = (key: string, val: string) => setKnaInputs(p => ({...p, [key]: parseInt(val)}));
  const handleVkaChange = (key: string, val: string) => setVkaInputs(p => ({...p, [key]: parseInt(val)}));

  const getRiskQuadrantInfo = (segri: number, riskMgmt: number) => {
      // Y-Axis: SEGRİ (Threshold 60)
      // X-Axis: Risk Mgmt (Threshold 60 - Normalized)
      
      if(segri >= 60 && riskMgmt >= 60) return { 
          id: 'leader',
          name: t("ANTİ-KIRILGAN LİDER"), 
          icon: <ShieldCheck size={24} />,
          bgGradient: "bg-gradient-to-br from-teal-900 to-teal-700",
          textColor: "text-teal-100",
          accentColor: "text-fintech-teal",
          borderColor: "border-gray-500",
          desc: t("Krizlerden güçlenerek çıkan yapı."),
          strategy: t("Mevcut dayanıklılığı koruyarak agresif büyüme fırsatlarını değerlendir.")
      };
      if(segri >= 60 && riskMgmt < 60) return { 
          id: 'opportunist',
          name: t("CAMDAN DEV (KIRILGAN)"), 
          icon: <Zap size={24} />,
          bgGradient: "bg-gradient-to-br from-amber-900 to-amber-700",
          textColor: "text-amber-100",
          accentColor: "text-amber-400",
          borderColor: "border-fintech-amber",
          desc: t("Yüksek performans, düşük dayanıklılık."),
          strategy: t("Finansal tamponları artır ve kriz senaryoları çalışarak altyapıyı güçlendir.")
      };
      if(segri < 60 && riskMgmt >= 60) return { 
          id: 'protector',
          name: t("GÜVENLİ LİMAN"), 
          icon: <Anchor size={24} />,
          bgGradient: "bg-gradient-to-br from-fintech-charcoal to-gray-800",
          textColor: "text-blue-100",
          accentColor: "text-fintech-primary",
          borderColor: "border-gray-700",
          desc: t("Düşük performans, yüksek güvenlik."),
          strategy: t("Risk iştahını kontrollü şekilde artırarak inovasyon kaslarını çalıştır.")
      };
      return { 
          id: 'risky',
          name: t("SERBEST DÜŞÜŞ"), 
          icon: <AlertTriangle size={24} />,
          bgGradient: "bg-gradient-to-br from-fintech-coral to-red-700",
          textColor: "text-red-100",
          accentColor: "text-fintech-coral",
          borderColor: "border-fintech-coral",
          desc: t("Hem performans hem direnç düşük."),
          strategy: t("Acil yapısal dönüşüm ve kriz yönetimi masası kurulmalı.")
      };
  };

  if (isCountriesLoading || isWeightsLoading) return <LoadingState />;
  if (isCountriesError) return <ErrorState error={countriesError} />;
  if (isWeightsError) return <ErrorState error={weightsError} />;
  if (!countries || !sectorWeights || !activeCountry || !activeWeights) return null;

  // Calculate scores
  const srfScore = calculateRiskScore(srfInputs, activeWeights);
  const knaScore = calculateRiskScore(knaInputs, knaWeights);
  const vkaScore = calculateRiskScore(vkaInputs, vkaWeights);
  
  // Unicorn Intensity Factor (UIF) - Logarithmic scale for resilience
  // Log10(1) = 0, Log10(100) = 2. Max value 3 (1000 unicorns).
  const uif = Math.min(100, (Math.log10(activeCountry.unicornCount + 1) / 3) * 100);

  // Updated SRKA Formula: SEGRİ(25%) + SRF(20%) + KNA(15%) + VKA(20%) + UIF(20%)
  const srkaResult = (0.25 * activeCountry.SEGRI) + (0.20 * srfScore) + (0.15 * knaScore) + (0.20 * vkaScore) + (0.20 * uif);

  // X-Axis for Chart: Resilience & Ecosystem Maturity
  const riskMgmtScore = ((0.30 * srfScore) + (0.25 * knaScore) + (0.25 * vkaScore) + (0.20 * uif)); 
  const quadrantInfo = getRiskQuadrantInfo(activeCountry.SEGRI, riskMgmtScore);

  const chartData = [
    { x: riskMgmtScore, y: activeCountry.SEGRI, name: t(activeCountry.name) }
  ];

  return (
    <div className="space-y-6 pb-12">
        
        {/* Explanation Section */}
        <div className="bg-white rounded-xl shadow-sm border border-red-50 overflow-hidden animate-in fade-in slide-in-from-top-4 hover-card">
            <div 
                className="bg-red-50/50 p-4 flex justify-between items-center cursor-pointer hover:bg-red-50 transition-colors"
                onClick={() => setShowExplanation(!showExplanation)}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 text-gray-700 rounded-lg">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-fintech-charcoal">{t('SEGRİ-SRKA Nedir?')}</h2>
                        <p className="text-xs text-gray-500">{t('Sürdürülebilir Risk ve Kriz Analizi Metodolojisi')}</p>
                    </div>
                </div>
                <button className="text-fintech-coral text-sm font-medium hover:underline">
                    {showExplanation ? t('Gizle') : t('Detayları Göster')}
                </button>
            </div>
            
            {showExplanation && (
                <div className="p-6 border-t border-red-50 grid md:grid-cols-3 gap-6 text-sm text-gray-700">
                    <div className="space-y-2">
                        <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                            <ShieldCheck size={16} className="text-fintech-coral"/> {t('Amaç')}
                        </h3>
                        <p className="leading-relaxed">
                            {t('Bir ekosistemin veya girişimin sadece "güneşli günlerdeki" performansını (SEGRİ) değil, "fırtınalı havalardaki" dayanıklılığını ölçer. Nassim Taleb\'in')}
                            <span className="font-semibold text-fintech-charcoal"> {t('"Anti-Kırılganlık"')} </span> 
                            {t('prensibine dayanır.')}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                            <Activity size={16} className="text-gray-500"/> {t('Bileşenler')}
                        </h3>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><strong>{t('SRF')}:</strong> {t('Sektöre özgü yapısal riskler.')}</li>
                            <li><strong>{t('KNA')}:</strong> {t('Yönetimin göremediği "kör noktalar".')}</li>
                            <li><strong>{t('VKA')}:</strong> {t('Şoklara karşı reaksiyon hızı.')}</li>
                            <li><strong>{t('UIF')}:</strong> {t('Ekosistem derinliği (Unicorn Yoğunluğu).')}</li>
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-fintech-charcoal flex items-center gap-2">
                            <TrendingUp size={16} className="text-gray-700"/> {t('Çıktı')}
                        </h3>
                        <p className="leading-relaxed">
                            {t('Analiz sonucunda ülke veya firma 4 kadrandan birine yerleşir. Hedef, yüksek performans ve yüksek dayanıklılık sunan')}
                            <span className="font-semibold text-gray-500"> {t('"Anti-Kırılgan Lider"')} </span> 
                            {t('olmaktır.')}
                        </p>
                    </div>
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-8 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
                    {/* Selectors */}
                    <div className="grid grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('Ülke')}</label>
                            <select 
                                className="w-full p-2 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-fintech-coral outline-none font-medium"
                                value={selectedCountryCode}
                                onChange={(e) => setSelectedCountryCode(e.target.value)}
                            >
                                {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {t(c.name)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t('Sektör')}</label>
                            <select 
                                className="w-full p-2 bg-white border border-gray-200 rounded text-sm focus:ring-2 focus:ring-fintech-coral outline-none font-medium"
                                value={selectedSector}
                                onChange={(e) => setSelectedSector(e.target.value as SectorName)}
                            >
                                {Object.keys(sectorWeights).map(s => <option key={s} value={s}>{t(s)}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. SRF Inputs */}
                        <div className="bg-red-50/30 p-4 rounded-xl border border-red-50">
                            <h4 className="font-bold text-gray-700 mb-3 border-b border-red-50 pb-2 flex justify-between items-center text-sm">
                                <span>{t('SRF: Risk Yönetimi')}</span>
                                <span className="text-[10px] bg-white px-1.5 rounded border border-red-200">%20</span>
                            </h4>
                            {Object.entries(srfInputs).map(([key, val]) => (
                                <div key={key} className="mb-4 group">
                                    <div className="flex justify-between text-xs mb-1 text-gray-700">
                                        <span className="font-medium group-hover:text-fintech-coral transition-colors">{t(key)}</span>
                                        <span className="font-bold">{val}</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={val} onChange={(e) => handleSrfChange(key, e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                                </div>
                            ))}
                        </div>

                        {/* 2. KNA Inputs */}
                        <div className="bg-gray-50/30 p-4 rounded-xl border border-gray-200">
                             <h4 className="font-bold text-fintech-charcoal mb-3 border-b border-gray-200 pb-2 flex justify-between items-center text-sm">
                                <span>{t('KNA: Farkındalık')}</span>
                                <span className="text-[10px] bg-white px-1.5 rounded border border-gray-300">%15</span>
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { k: 'OKN', l: t('Organizasyonel') },
                                    { k: 'SKN', l: t('Sektörel') },
                                    { k: 'TKN', l: t('Teknolojik') },
                                    { k: 'KKN', l: t('Kültürel') }
                                ].map((item) => (
                                    <div key={item.k} className="group">
                                        <div className="flex justify-between text-xs mb-1 text-gray-700">
                                            <span className="font-medium group-hover:text-gray-700 transition-colors" title={t(item.l)}>{t(item.k)}</span>
                                            <span className="font-bold">{(knaInputs as any)[item.k]}</span>
                                        </div>
                                        <input type="range" min="0" max="100" value={(knaInputs as any)[item.k]} onChange={(e) => handleKnaChange(item.k, e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. VKA Inputs (NEW) */}
                        <div className="bg-red-50/30 p-4 rounded-xl border border-red-50">
                             <h4 className="font-bold text-gray-700 mb-3 border-b border-red-50 pb-2 flex justify-between items-center text-sm">
                                <span>{t('VKA: Adaptasyon')}</span>
                                <span className="text-[10px] bg-white px-1.5 rounded border border-red-200">%20</span>
                            </h4>
                            <div className="space-y-4">
                                <div className="group">
                                    <div className="flex justify-between text-xs mb-1 text-gray-700">
                                        <span className="font-medium group-hover:text-fintech-coral transition-colors" title={t("Crisis Response Speed")}>{t('CRS: Reaksiyon')}</span>
                                        <span className="font-bold">{vkaInputs.CRS}</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={vkaInputs.CRS} onChange={(e) => handleVkaChange('CRS', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-coral" />
                                </div>
                                <div className="group">
                                    <div className="flex justify-between text-xs mb-1 text-gray-700">
                                        <span className="font-medium group-hover:text-fintech-coral transition-colors" title={t("Financial Buffer")}>{t('FBF: Finansal Tampon')}</span>
                                        <span className="font-bold">{vkaInputs.FBF}</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={vkaInputs.FBF} onChange={(e) => handleVkaChange('FBF', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-coral" />
                                </div>
                                <div className="group">
                                    <div className="flex justify-between text-xs mb-1 text-gray-700">
                                        <span className="font-medium group-hover:text-fintech-coral transition-colors" title={t("Pivot Capacity")}>{t('PVC: Esneklik')}</span>
                                        <span className="font-bold">{vkaInputs.PVC}</span>
                                    </div>
                                    <input type="range" min="0" max="100" value={vkaInputs.PVC} onChange={(e) => handleVkaChange('PVC', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-coral" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESULTS COLUMN */}
            <div className="lg:col-span-4 space-y-6">
                {/* Main Score Card */}
                <div className={`${quadrantInfo.bgGradient} text-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-500 ring-1 ring-white/10`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldCheck size={120} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 z-10 text-white/90">{t('SEGRİ-SRKA Skoru')}</h3>
                    <div className={`text-6xl font-black mb-2 z-10 ${quadrantInfo.accentColor} drop-shadow-md`}>{srkaResult.toFixed(1)}</div>
                    <div className="text-xs opacity-80 mb-6 z-10 font-medium bg-white/10 px-3 py-1 rounded-full">{t('Gelişmiş Risk Endeksi')}</div>

                    <div className={`w-full p-4 rounded-xl mb-4 border-2 bg-black/20 backdrop-blur-sm ${quadrantInfo.borderColor}`}>
                        <div className="flex items-center justify-center gap-2 mb-1">
                            {quadrantInfo.icon}
                            <h4 className="text-lg font-black uppercase tracking-wide">{t(quadrantInfo.name)}</h4>
                        </div>
                        <p className={`text-xs font-semibold ${quadrantInfo.textColor} opacity-90`}>{t(quadrantInfo.desc)}</p>
                        <p className="text-xs mt-3 italic bg-white/10 p-2.5 rounded-lg text-white border border-white/10">
                            "{t(quadrantInfo.strategy)}"
                        </p>
                    </div>
                    
                    <div className="text-xs text-left w-full space-y-1.5 opacity-90 bg-black/20 p-3 rounded-lg border border-white/5">
                        <div className="flex justify-between border-b border-white/10 pb-1 mb-1">
                            <span className="opacity-70">{t('SEGRİ (Performans)')}:</span> 
                            <span className="font-bold text-white">{activeCountry.SEGRI.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between"><span>{t('SRF (Risk Ynt.)')}:</span> <span className="font-bold text-red-200">{srfScore.toFixed(1)}</span></div>
                        <div className="flex justify-between"><span>{t('VKA (Adaptasyon)')}:</span> <span className="font-bold text-red-200">{vkaScore.toFixed(1)}</span></div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1">{t('UIF (Unicorns)')}: <Gem size={10} className="text-fintech-primary" /></span> 
                            <span className="font-bold text-blue-200">{uif.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                {/* Matrix Visualization */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover-card">
                    <div className="flex items-center gap-2 mb-4 border-b pb-2">
                        <Info size={16} className="text-gray-400" />
                        <h4 className="font-bold text-fintech-charcoal text-sm">{t('Dayanıklılık Matrisi (Resilience)')}</h4>
                    </div>

                    <div className="h-64 w-full mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" name={t("Toplam Dayanıklılık")} domain={[0, 100]} label={{ value: t('Dayanıklılık (SRF+KNA+VKA+UIF)'), position: 'bottom', fontSize: 9, offset: 0 }} tick={{fontSize: 10}} />
                                <YAxis type="number" dataKey="y" name={t("SEGRİ")} domain={[0, 100]} label={{ value: t('Performans (SEGRİ)'), angle: -90, position: 'insideLeft', fontSize: 9 }} tick={{fontSize: 10}} />
                                
                                {/* Zones */}
                                <ReferenceArea x1={60} x2={100} y1={60} y2={100} fill="#ecfdf5" fillOpacity={0.8} stroke="none" {...({} as any)} /> {/* Anti-Fragile */}
                                <ReferenceArea x1={0} x2={60} y1={60} y2={100} fill="#fffbeb" fillOpacity={0.8} stroke="none" {...({} as any)} /> {/* Fragile Giant */}
                                <ReferenceArea x1={60} x2={100} y1={0} y2={60} fill="#eef2ff" fillOpacity={0.8} stroke="none" {...({} as any)} /> {/* Safe Harbor */}
                                <ReferenceArea x1={0} x2={60} y1={0} y2={60} fill="#fff1f2" fillOpacity={0.8} stroke="none" {...({} as any)} /> {/* Free Fall */}

                                <ReferenceLine x={60} stroke="#9ca3af" strokeDasharray="3 3" />
                                <ReferenceLine y={60} stroke="#9ca3af" strokeDasharray="3 3" />

                                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{fontSize: '12px'}} />
                                <Scatter name={t(activeCountry.name)} data={chartData} fill="#111827" shape="circle" r={6} />
                                
                                <Label value={t("ANTİ-KIRILGAN")} position="insideTopRight" offset={10} style={{ fontSize: '10px', fill: '#059669', fontWeight: 'bold' }} />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-[10px] text-gray-400 text-center italic">
                        {t('X Ekseni: SRF, KNA, VKA ve UIF (Unicorn) puanlarının ağırlıklı ortalamasıdır.')}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RiskAnalysis;
