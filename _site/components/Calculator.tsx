import React, { useState, useEffect } from 'react';
import { useCountries } from '../hooks';
import { calculateIES, calculateEEF, calculateSEGRI, determineQuadrant, determineTypology } from '../utils';
import { COLORS } from '../constants';
import { Download, Save, Trash2, RefreshCw, Scale, Building2, Rocket, Brain, ShieldAlert, Users } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

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
  FA: 50, RFQ: 50, MD: 50, KI: 50, EN: 50
};

const Calculator: React.FC = () => {
  const { data: countries } = useCountries();
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState({
      IES: 0, EEF: 0, SEGRI: 0, quadrant: '', typology: ''
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
    const ies = calculateIES(inputs.RTC, inputs.ICT, inputs.IAW, inputs.PIM, inputs.SCW);
    const eef = calculateEEF(inputs.FA, inputs.RFQ, inputs.MD, inputs.KI, inputs.EN);
    const segri = calculateSEGRI(ies, eef);
    const quad = determineQuadrant(ies, eef);
    const type = determineTypology(inputs.RTC, inputs.ICT, inputs.IAW, inputs.PIM, inputs.SCW);
    setResults({ IES: ies, EEF: eef, SEGRI: segri, quadrant: quad, typology: type });
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
            FA: country.FA, RFQ: country.RFQ, MD: country.MD, KI: country.KI, EN: country.EN
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
              <label className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-900 transition-colors">{label}</label>
              <span className={`text-base font-black px-3 py-1 rounded-xl ${colorClass} text-white shadow-md tabular-nums`}>
                  {(inputs as any)[code]}
              </span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={(inputs as any)[code]} 
            onChange={(e) => handleChange(code, e.target.value)}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: barColor }}
          />
          <p className="text-[11px] text-slate-700 font-bold mt-2.5 leading-relaxed bg-slate-100 p-2 rounded-lg border border-slate-200">{desc}</p>
      </div>
  );

  return (
    <div className="space-y-10 pb-16">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-100 text-blue-800 rounded-2xl shadow-inner border border-blue-200">
                  <Download size={28} />
              </div>
              <div className="flex-1">
                  <label className="block text-[11px] font-black text-slate-600 mb-2 uppercase tracking-widest">VERİ ŞABLONU YÜKLE</label>
                  <select 
                    className="w-full p-4 border border-slate-300 rounded-2xl text-sm font-black bg-slate-50 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                    onChange={(e) => handleLoadCountry(e.target.value)}
                    value=""
                  >
                      <option value="" disabled>Ülke Verisi Seçin...</option>
                      <option value="reset">Varsayılan (Reset)</option>
                      {countries?.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name} Profili</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl shadow-inner border transition-colors ${compareCode ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>
                  <Scale size={28} />
              </div>
              <div className="flex-1">
                  <label className="block text-[11px] font-black text-slate-600 mb-2 uppercase tracking-widest">KIYASLAMA MODU</label>
                  <select 
                    className={`w-full p-4 border rounded-2xl text-sm font-black focus:ring-4 outline-none transition-all ${compareCode ? 'border-purple-400 bg-purple-50 text-purple-900 focus:ring-purple-500/20' : 'border-slate-300 bg-slate-50'}`}
                    onChange={(e) => setCompareCode(e.target.value)}
                    value={compareCode}
                  >
                      <option value="">Kıyaslama Kapalı</option>
                      {countries?.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name} ile Karşılaştır</option>
                      ))}
                  </select>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-10">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-300">
                <h3 className="text-xl font-black mb-10 text-emerald-950 border-b border-emerald-100 pb-5 flex items-center gap-4 tracking-tight">
                    <Brain size={28} className="text-emerald-700" /> Individual Entrepreneurial Spirit (IES)
                </h3>
                <Slider code="RTC" label="Risk Alma Cesareti" colorClass="bg-red-700" barColor="#b91c1c" desc="Girişimcinin belirsizlik altındaki karar alma hızı ve dayanıklılığı." />
                <Slider code="ICT" label="Yenilikçilik (İnovasyon)" colorClass="bg-emerald-700" barColor="#047857" desc="Yeni pazar ve süreç geliştirme kabiliyeti." />
                <Slider code="IAW" label="Bağımsızlık İsteği" colorClass="bg-amber-700" barColor="#b45309" desc="Kendi kararlarını alma ve özerk çalışma motivasyonu." />
                <Slider code="PIM" label="İçsel Motivasyon" colorClass="bg-green-700" barColor="#15803d" desc="Zorluklara rağmen sürdürülebilir enerji ve tutku seviyesi." />
                <Slider code="SCW" label="Sosyal Katkı" colorClass="bg-purple-700" barColor="#7e22ce" desc="Toplumsal fayda ve değer yaratma odaklılık." />
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-300">
                <h3 className="text-xl font-black mb-10 text-blue-950 border-b border-blue-100 pb-5 flex items-center gap-4 tracking-tight">
                    <Building2 size={28} className="text-blue-700" /> Ecosystem Enabling Factors (EEF)
                </h3>
                <Slider code="FA" label="Finansman Erişimi" colorClass="bg-sky-700" barColor="#0369a1" desc="Sermaye piyasaları ve yatırımcı derinliği." />
                <Slider code="RFQ" label="Regülasyon Kalitesi" colorClass="bg-orange-700" barColor="#c2410c" desc="Bürokrasi hızı ve hukuki altyapı güvenliği." />
                <Slider code="MD" label="Pazar Dinamikleri" colorClass="bg-rose-700" barColor="#9f1239" desc="Müşteri kitlesi ve rekabet ortamının canlılığı." />
                <Slider code="KI" label="Bilgi Altyapısı" colorClass="bg-lime-700" barColor="#4d7c0f" desc="Ar-Ge kapasitesi ve patent üretim gücü." />
                <Slider code="EN" label="Network ve Ağlar" colorClass="bg-indigo-700" barColor="#4338ca" desc="Mentorluk ve hızlandırıcı ekosistem kalitesi." />
            </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
            <div className="bg-slate-950 text-white p-10 rounded-[3rem] shadow-2xl sticky top-8 border border-blue-900/30">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h3 className="text-3xl font-black text-white tracking-tighter">Hesaplanan SEGRİ</h3>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-2">CANLI ANALİZ ÇIKTISI</p>
                    </div>
                    {results.SEGRI > 75 && (
                        <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-2xl animate-bounce shadow-xl border border-yellow-500/30">
                            <Rocket size={36} />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col items-center mb-12">
                    <div className="text-9xl font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">{results.SEGRI.toFixed(1)}</div>
                    <div className="w-24 h-2 bg-blue-600 rounded-full mt-6 shadow-lg shadow-blue-600/50"></div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center backdrop-blur-md">
                        <p className="text-[11px] text-slate-400 font-black uppercase mb-2 tracking-widest">IES PUANI</p>
                        <p className="text-3xl font-black text-emerald-400 tabular-nums">{results.IES.toFixed(1)}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center backdrop-blur-md">
                        <p className="text-[11px] text-slate-400 font-black uppercase mb-2 tracking-widest">EEF PUANI</p>
                        <p className="text-3xl font-black text-sky-400 tabular-nums">{results.EEF.toFixed(1)}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-slate-400 font-black uppercase mb-2 tracking-widest">ERİŞİLEN KADRAN</p>
                            <p className="text-2xl font-black tracking-tight" style={{ color: getQuadColor(results.quadrant)}}>{results.quadrant}</p>
                        </div>
                        <ShieldAlert size={32} style={{ color: getQuadColor(results.quadrant)}} className="opacity-80" />
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div>
                            <p className="text-[11px] text-slate-400 font-black uppercase mb-2 tracking-widest">GİRİŞİMCİ TİPİ</p>
                            <p className="text-2xl font-black text-white tracking-tight">{results.typology}</p>
                        </div>
                        <Users size={32} className="text-blue-400 opacity-80" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-300">
                <h3 className="text-xl font-black text-slate-950 mb-8 flex items-center gap-4 tracking-tight">
                    <Save size={28} className="text-slate-700" /> Senaryoyu Kaydet
                </h3>
                <div className="flex gap-4 mb-10">
                    <input 
                        type="text" 
                        placeholder="Senaryo ismi (Örn: Türkiye 2030 Vizyonu)" 
                        className="flex-1 p-4 border border-slate-300 rounded-2xl text-sm font-black focus:ring-4 focus:ring-blue-500/20 outline-none bg-slate-50 transition-all"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                    />
                    <button 
                        onClick={handleSaveProfile}
                        disabled={!profileName.trim()}
                        className="bg-blue-800 hover:bg-blue-900 disabled:opacity-50 text-white p-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center min-w-[60px]"
                    >
                        <Save size={24} />
                    </button>
                </div>

                {savedProfiles.length > 0 && (
                    <div className="space-y-5 max-h-[500px] overflow-y-auto pr-3 scrollbar-hide">
                        {savedProfiles.map(p => (
                            <div key={p.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-300 hover:border-blue-400 transition-all group shadow-sm flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-black text-slate-950 text-base tracking-tight">{p.name}</p>
                                        <p className="text-[11px] text-slate-500 font-black mt-1 uppercase">{p.date}</p>
                                    </div>
                                    <button 
                                      onClick={() => {
                                          const updated = savedProfiles.filter(x => x.id !== p.id);
                                          setSavedProfiles(updated);
                                          localStorage.setItem('segri_calculator_profiles', JSON.stringify(updated));
                                      }} 
                                      className="text-slate-400 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-900 bg-blue-100 px-4 py-1.5 rounded-xl font-black text-xs border border-blue-200">SEGRİ: {p.results.SEGRI.toFixed(1)}</span>
                                    <span className="text-slate-700 font-black text-xs uppercase tracking-widest">{p.results.quadrant}</span>
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