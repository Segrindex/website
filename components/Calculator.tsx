import React, { useState, useEffect } from 'react';
import { useCountries } from '../hooks';
import { calculateIES, calculateEEF, calculateSEGRI, determineQuadrant, determineTypology, predictSuccessProbability, determineMaturityTag, calculateFSI, calculateCSB, calculateTCI, calculateVAS } from '../utils';
import { COLORS } from '../constants';
import { Download, Save, Trash2, RefreshCw, Scale, Building2, Rocket, Brain, ShieldAlert, Users, Leaf, Info, TrendingUp, Activity, Briefcase, GraduationCap, Handshake } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { useLanguage } from '../LanguageContext';

interface SavedProfile {
  id: number;
  name: string;
  date: string;
  inputs: typeof initialInputs;
  results: {
    IES: number;
    EEF: number;
    SEGRI: number;
    quadrant: string;
    typology: string;
  };
}

const initialInputs = {
  RTC: 50, ICT: 50, IAW: 50, PIM: 50, SCW: 50,
  FA: 50, RFQ: 50, MD: 50, KI: 50, EN: 50,
  SB: 3.2, Q: 3
};

const Calculator: React.FC = () => {
  const { data: countries } = useCountries();
  const [inputs, setInputs] = useState(initialInputs);
  const { t } = useLanguage();
  const [results, setResults] = useState({
      IES: 0, EEF: 0, SEGRI: 0, quadrant: '', typology: '', successProb: 0, maturityTag: '', fsi: 0, csb: 0, tci: 0, vas: 0
  });
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [profileName, setProfileName] = useState('');
  const [compareCode, setCompareCode] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('segri_calculator_profiles');
    if (saved) {
      try { setSavedProfiles(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const ies = calculateIES(inputs.RTC, inputs.ICT, inputs.IAW, inputs.PIM, inputs.SCW, inputs.SB);
    const eef = calculateEEF(inputs.FA, inputs.RFQ, inputs.MD, inputs.KI, inputs.EN, inputs.Q);
    const segri = calculateSEGRI(ies, eef);
    const quad = determineQuadrant(ies, eef);
    const type = determineTypology(inputs.RTC, inputs.ICT, inputs.IAW, inputs.PIM, inputs.SCW);
    const prob = predictSuccessProbability(ies, eef);
    const maturity = determineMaturityTag(eef);
    
    const fsi = calculateFSI(inputs.FA, inputs.FA * 0.9, inputs.EN * 0.8);
    const csb = calculateCSB(inputs.MD * 0.8, inputs.KI, inputs.MD * 0.9);
    const tci = calculateTCI(inputs.KI, inputs.KI * 0.8, inputs.ICT);
    const vas = calculateVAS(inputs.EN, inputs.EN * 0.9, inputs.FA * 0.8);

    setResults({ IES: ies, EEF: eef, SEGRI: segri, quadrant: quad, typology: type, successProb: prob, maturityTag: maturity, fsi, csb, tci, vas });
  }, [inputs]);

  const handleChange = (key: string, val: string) => {
    setInputs(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleLoadCountry = (code: string) => {
    if (code === 'reset') {
        setInputs(initialInputs);
        setCompareCode('');
        return;
    }
    const country = countries?.find(c => c.code === code);
    if (country) {
        setInputs({
            RTC: country.RTC, ICT: country.ICT, IAW: country.IAW, PIM: country.PIM, SCW: country.SCW,
            FA: country.FA, RFQ: country.RFQ, MD: country.MD, KI: country.KI, EN: country.EN,
            SB: 3.2, Q: 3
        });
    }
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) return;
    const newProfile: SavedProfile = {
      id: Date.now(),
      name: profileName,
      date: new Date().toLocaleDateString(),
      inputs: { ...inputs },
      results: { ...results }
    };
    const updated = [newProfile, ...savedProfiles];
    setSavedProfiles(updated);
    localStorage.setItem('segri_calculator_profiles', JSON.stringify(updated));
    setProfileName('');
  };

  const getQuadColor = (q: string) => {
      if(q === "Iron Man") return COLORS.ironMan;
      if(q === "Captain America") return COLORS.captainAmerica;
      if(q === "Black Panther") return COLORS.blackPanther;
      return COLORS.spiderMan;
  };

  const Slider = ({ label, code, desc, colorClass, barColor }: { label: string, code: string, desc: string, colorClass: string, barColor: string }) => (
      <div className="mb-8 group">
          <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-black text-fintech-charcoal uppercase tracking-tight group-hover:text-fintech-charcoal transition-colors">{label}</label>
              <span className={`text-base font-black px-3 py-1 rounded-xl ${colorClass} text-white shadow-md tabular-nums`}>
                  {(inputs as any)[code]}
              </span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={(inputs as any)[code]} 
            onChange={(e) => handleChange(code, e.target.value)}
            className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: barColor }}
          />
          <p className="text-[11px] text-gray-700 font-bold mt-2.5 leading-relaxed bg-fintech-gray p-2 rounded-lg border border-gray-200">{desc}</p>
      </div>
  );

  return (
    <div className="space-y-10 pb-16">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 hover-card">
          <div className="flex items-center gap-5">
              <div className="p-4 bg-red-50 text-gray-700 rounded-2xl shadow-inner border border-red-200">
                  <Download size={28} />
              </div>
              <div className="flex-1">
                  <label className="block text-[11px] font-black text-gray-700 mb-2 uppercase tracking-widest">{t('VERİ ŞABLONU YÜKLE')}</label>
                  <select 
                    className="w-full p-4 border border-gray-200 rounded-2xl text-sm font-black bg-white focus:ring-4 focus:ring-fintech-coral/20 outline-none transition-all"
                    onChange={(e) => handleLoadCountry(e.target.value)}
                    value=""
                  >
                      <option value="" disabled>{t('Ülke Verisi Seçin...')}</option>
                      <option value="reset">{t('Varsayılan (Reset)')}</option>
                      {countries?.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {t(c.name)} {t('Profili')}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl shadow-inner border transition-colors ${compareCode ? 'bg-fintech-gray text-fintech-charcoal border-gray-300' : 'bg-fintech-gray text-gray-500 border-gray-200'}`}>
                  <Scale size={28} />
              </div>
              <div className="flex-1">
                  <label className="block text-[11px] font-black text-gray-700 mb-2 uppercase tracking-widest">{t('KIYASLAMA MODU')}</label>
                  <select 
                    className={`w-full p-4 border rounded-2xl text-sm font-black focus:ring-4 outline-none transition-all ${compareCode ? 'border-fintech-primary bg-gray-50 text-fintech-charcoal focus:ring-gray-700/20' : 'border-gray-200 bg-white'}`}
                    onChange={(e) => setCompareCode(e.target.value)}
                    value={compareCode}
                  >
                      <option value="">{t('Kıyaslama Kapalı')}</option>
                      {countries?.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {t(c.name)} {t('ile Karşılaştır')}</option>
                      ))}
                  </select>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-10">
            <div className="bg-white p-10 rounded-3xl shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-calc-light to-module-calc-dark"></div>
                <h3 className="text-xl font-black mb-10 text-teal-950 border-b border-gray-200 pb-5 flex items-center gap-4 tracking-tight">
                    <Brain size={28} className="text-fintech-charcoal" /> {t('Individual Entrepreneurial Spirit (IES)')}
                </h3>
                <Slider code="RTC" label={t("Risk Alma Cesareti")} colorClass="bg-red-700" barColor="#b91c1c" desc={t("Girişimcinin belirsizlik altındaki karar alma hızı ve dayanıklılığı.")} />
                <Slider code="ICT" label={t("Yenilikçilik (İnovasyon)")} colorClass="bg-teal-700" barColor="#047857" desc={t("Yeni pazar ve süreç geliştirme kabiliyeti.")} />
                <Slider code="IAW" label={t("Bağımsızlık İsteği")} colorClass="bg-amber-700" barColor="#b45309" desc={t("Kendi kararlarını alma ve özerk çalışma motivasyonu.")} />
                <Slider code="PIM" label={t("İçsel Motivasyon")} colorClass="bg-teal-700" barColor="#15803d" desc={t("Zorluklara rağmen sürdürülebilir enerji ve tutku seviyesi.")} />
                <Slider code="SCW" label={t("Sosyal Katkı")} colorClass="bg-fintech-primary" barColor="#7e22ce" desc={t("Toplumsal fayda ve değer yaratma odaklılık.")} />
                
                <div className="mt-10 pt-10 border-t border-gray-100">
                  <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ShieldAlert size={18} className="text-fintech-coral" />
                    {t('Analitik Düzeltme Faktörleri')}
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="group">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-black text-gray-700 uppercase">{t('Sosyal Beğenirlik (SB)')}</label>
                        <span className="text-xs font-black px-2 py-1 rounded bg-fintech-gray text-gray-700">{inputs.SB.toFixed(1)}</span>
                      </div>
                      <input type="range" min="1" max="5" step="0.1" value={inputs.SB} onChange={(e) => handleChange('SB', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-coral" />
                      <p className="text-[10px] text-gray-500 mt-2 italic">{t('Anket yanıtlarındaki "kendini iyi gösterme" eğilimini dengeler. (μ=3.2)')}</p>
                    </div>
                  </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-calc-light to-module-calc-dark"></div>
                <h3 className="text-xl font-black mb-10 text-fintech-charcoal border-b border-red-50 pb-5 flex items-center gap-4 tracking-tight">
                    <Building2 size={28} className="text-gray-700" /> {t('Ecosystem Enabling Factors (EEF)')}
                </h3>
                <Slider code="FA" label={t("Finansman Erişimi")} colorClass="bg-fintech-primary" barColor="#0369a1" desc={t("Sermaye piyasaları ve yatırımcı derinliği.")} />
                <Slider code="RFQ" label={t("Regülasyon Kalitesi")} colorClass="bg-fintech-coral" barColor="#c2410c" desc={t("Bürokrasi hızı ve hukuki altyapı güvenliği.")} />
                <Slider code="MD" label={t("Pazar Dinamikleri")} colorClass="bg-fintech-coral" barColor="#9f1239" desc={t("Müşteri kitlesi ve rekabet ortamının canlılığı.")} />
                <Slider code="KI" label={t("Bilgi Altyapısı")} colorClass="bg-lime-700" barColor="#4d7c0f" desc={t("Ar-Ge kapasitesi ve patent üretim gücü.")} />
                <Slider code="EN" label={t("Network ve Ağlar")} colorClass="bg-fintech-primary" barColor="#4338ca" desc={t("Mentorluk ve hızlandırıcı ekosistem kalitesi.")} />

                <div className="mt-10 pt-10 border-t border-gray-100">
                  <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <RefreshCw size={18} className="text-fintech-primary" />
                    {t('Veri Kalitesi ve Güvenilirlik')}
                  </h4>
                  <div className="group">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-black text-gray-700 uppercase">{t('Veri Kalite Katsayısı (Q)')}</label>
                      <span className="text-xs font-black px-2 py-1 rounded bg-fintech-gray text-gray-700">{inputs.Q.toFixed(1)}</span>
                    </div>
                    <input type="range" min="1" max="5" step="0.1" value={inputs.Q} onChange={(e) => handleChange('Q', e.target.value)} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fintech-primary" />
                    <p className="text-[10px] text-gray-500 mt-2 italic">{t('Verinin tazeliği ve kapsayıcılığına göre skoru normalize eder. (1=Düşük, 5=Yüksek)')}</p>
                  </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
            <div className="bg-fintech-charcoal text-white p-10 rounded-[3rem] shadow-2xl sticky top-8 border border-fintech-charcoal/30">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter">{t('Hesaplanan SEGRİ')}</h3>
                        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mt-2">{t('CANLI ANALİZ ÇIKTISI')}</p>
                    </div>
                    {results.SEGRI > 75 && (
                        <div className="p-3 bg-amber-500/20 text-yellow-400 rounded-2xl animate-bounce shadow-xl border border-fintech-amber/30">
                            <Rocket size={36} />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col items-center mb-12 relative">
                    <div className="text-9xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl relative">
                        {results.SEGRI.toFixed(1)}
                        <div key={results.SEGRI} className="absolute -top-8 -right-12 animate-leaf-fall text-fintech-amber opacity-0 pointer-events-none">
                            <Leaf size={48} fill="currentColor" />
                        </div>
                    </div>
                    <div className="w-24 h-2 bg-fintech-coral rounded-full mt-6 shadow-lg shadow-fintech-coral/50"></div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center backdrop-blur-md">
                        <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('IES PUANI')}</p>
                        <p className="text-3xl font-black text-fintech-teal tabular-nums">{results.IES.toFixed(1)}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center backdrop-blur-md">
                        <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('EEF PUANI')}</p>
                        <p className="text-3xl font-black text-fintech-primary tabular-nums">{results.EEF.toFixed(1)}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('ERİŞİLEN KADRAN')}</p>
                            <p className="text-2xl font-black tracking-tight" style={{ color: getQuadColor(results.quadrant)}}>{t(results.quadrant)}</p>
                        </div>
                        <ShieldAlert size={32} style={{ color: getQuadColor(results.quadrant)}} className="opacity-80" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('GİRİŞİMCİ TİPİ')}</p>
                            <p className="text-2xl font-black text-white tracking-tight">{t(results.typology)}</p>
                        </div>
                        <Users size={32} className="text-fintech-amber opacity-80" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('BAŞARI OLASILIĞI')}</p>
                            <p className="text-2xl font-black text-fintech-teal tracking-tight">%{results.successProb.toFixed(1)}</p>
                        </div>
                        <TrendingUp size={32} className="text-fintech-teal opacity-80" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-gray-400 font-black uppercase mb-2 tracking-widest">{t('EKOSİSTEM OLGUNLUĞU')}</p>
                            <p className="text-2xl font-black text-lime-400 tracking-tight">{t(results.maturityTag)}</p>
                        </div>
                        <Activity size={32} className="text-lime-400 opacity-80" />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase size={16} className="text-blue-400" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">FSI</p>
                        </div>
                        <p className="text-xl font-black text-white">{results.fsi.toFixed(1)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">{t('Finansman Derinlik Endeksi')}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Handshake size={16} className="text-purple-400" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">CSB</p>
                        </div>
                        <p className="text-xl font-black text-white">{results.csb.toFixed(1)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">{t('Kurumsal İşbirliği Endeksi')}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap size={16} className="text-orange-400" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">TCI</p>
                        </div>
                        <p className="text-xl font-black text-white">{results.tci.toFixed(1)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">{t('Yetenek Rekabetçilik Endeksi')}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Users size={16} className="text-emerald-400" />
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">VAS</p>
                        </div>
                        <p className="text-xl font-black text-white">{results.vas.toFixed(1)}</p>
                        <p className="text-[9px] text-gray-500 mt-1">{t('Yatırımcı Katma Değer Skoru')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-calc-light to-module-calc-dark"></div>
                <h3 className="text-xl font-black text-fintech-charcoal mb-8 flex items-center gap-4 tracking-tight">
                    <Save size={28} className="text-gray-700" /> {t('Senaryoyu Kaydet')}
                </h3>
                <div className="flex gap-4 mb-10">
                    <input 
                        type="text" 
                        placeholder={t("Senaryo ismi (Örn: Türkiye 2030 Vizyonu)")}
                        className="flex-1 p-4 border border-gray-200 rounded-2xl text-sm font-black focus:ring-4 focus:ring-fintech-coral/20 outline-none bg-white transition-all"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                    />
                    <button 
                        onClick={handleSaveProfile}
                        disabled={!profileName.trim()}
                        className="bg-gray-700 hover:bg-fintech-charcoal disabled:opacity-50 text-white p-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center min-w-[60px]"
                    >
                        <Save size={24} />
                    </button>
                </div>

                {savedProfiles.length > 0 && (
                    <div className="space-y-5 max-h-[500px] overflow-y-auto pr-3 scrollbar-hide">
                        {savedProfiles.map(p => (
                            <div key={p.id} className="p-6 bg-white rounded-3xl border border-gray-200 hover:border-fintech-amber transition-all group shadow-sm flex flex-col gap-4 hover-card">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-black text-fintech-charcoal text-base tracking-tight">{p.name}</p>
                                        <p className="text-[11px] text-gray-500 font-black mt-1 uppercase">{p.date}</p>
                                    </div>
                                    <button 
                                      onClick={() => {
                                          const updated = savedProfiles.filter(x => x.id !== p.id);
                                          setSavedProfiles(updated);
                                          localStorage.setItem('segri_calculator_profiles', JSON.stringify(updated));
                                      }} 
                                      className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-fintech-charcoal bg-red-50 px-4 py-1.5 rounded-xl font-black text-xs border border-red-200">SEGRİ: {p.results.SEGRI.toFixed(1)}</span>
                                    <span className="text-gray-700 font-black text-xs uppercase tracking-widest">{t(p.results.quadrant)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;