import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageContext';
import { useCountries } from '../hooks';
import { Sliders, MapPin, Activity, Trophy, ArrowRight, Brain, Sword, Heart, Target, Hammer, Shield, Zap, Info, Leaf } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SandboxInputs {
  cityName: string;
  population: number;
  students: number;
  investment: number;
  incubators: number;
  startups: number;
  govSupport: number;
  connectivity: number;
}

export const LocalSandbox: React.FC = () => {
  const { t } = useLanguage();
  const { data: globalData } = useCountries();

  const [inputs, setInputs] = useState<SandboxInputs>({
    cityName: 'Örnek Şehir',
    population: 2000000,
    students: 150000,
    investment: 50,
    incubators: 5,
    startups: 300,
    govSupport: 6,
    connectivity: 5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'cityName' ? value : Number(value)
    }));
  };

  const results = useMemo(() => {
    const popM = Math.max(inputs.population / 1000000, 0.1); // Prevent division by zero
    
    // Normalize metrics (0-100 scale heuristics)
    // 1000 startups per 1M is excellent (100)
    const startupDensity = Math.min(100, (inputs.startups / popM) / 10); 
    // 20% student ratio is excellent (100)
    const studentDensity = Math.min(100, (inputs.students / inputs.population) * 500); 
    // $200M investment per 1M is excellent (100)
    const investmentDensity = Math.min(100, (inputs.investment / popM) / 2); 
    // 10 incubators per 1M is excellent (100)
    const incubatorDensity = Math.min(100, (inputs.incubators / popM) * 10); 

    const IES = (startupDensity * 0.4) + (studentDensity * 0.3) + (inputs.govSupport * 10 * 0.3);
    const EEF = (investmentDensity * 0.4) + (incubatorDensity * 0.3) + (inputs.connectivity * 10 * 0.3);
    
    const SEGRI = (IES + EEF) / 2;

    let typology = "Gimli Tipi";
    let icon = Hammer;
    let color = "text-fintech-coral bg-red-50";
    let desc = "Pratik kararlılıkla fırsatları değerlendirir. Uygulama odaklıdır.";

    if (IES > 75 && EEF > 75) { typology = "Gandalf Tipi"; icon = Brain; color = "text-gray-700 bg-fintech-gray"; desc = "Yeni pazarlar yaratma eğilimindedir. Bilgelik ve öngörü ile hareket eder."; }
    else if (IES > 80 && EEF <= 75) { typology = "Aragorn Tipi"; icon = Sword; color = "text-fintech-coral bg-red-50"; desc = "Belirsizliği kucaklar. Cesaretle liderlik eder, risk alma iştahı çok yüksektir."; }
    else if (IES <= 75 && EEF > 80) { typology = "Galadriel Tipi"; icon = Shield; color = "text-gray-500 bg-fintech-gray"; desc = "Sosyal etki yaratmaya adanmıştır. Bilgelik ve koruma güdüsüyle hareket eder."; }
    else if (IES > 60 && EEF > 60) { typology = "Legolas Tipi"; icon = Target; color = "text-fintech-amber bg-amber-100"; desc = "Özerk çalışmayı tercih eder. Hassasiyet ve yetenekle iş yapar."; }
    else if (IES > 40 && EEF > 40) { typology = "Frodo Tipi"; icon = Heart; color = "text-gray-500 bg-fintech-gray"; desc = "Kişisel zorluklara rağmen toplumsal sorunlara odaklanır."; }
    else if (IES > 50 && EEF < 40) { typology = "Han Solo Tipi"; icon = Zap; color = "text-gray-700 bg-fintech-gray"; desc = "Hızlı kazanç peşindedir. Kuralları esneten maverick bir yaklaşımı vardır."; }

    // Calculate virtual rank
    let rank = 1;
    if (globalData) {
      const sorted = [...globalData].sort((a, b) => b.SEGRI - a.SEGRI);
      rank = sorted.findIndex(c => c.SEGRI < SEGRI) + 1;
      if (rank === 0) rank = sorted.length + 1; // If it's the lowest
    }

    return { IES, EEF, SEGRI, typology, icon, color, desc, rank, startupDensity, studentDensity, investmentDensity, incubatorDensity };
  }, [inputs, globalData]);

  const radarData = useMemo(() => {
    if (!globalData) return [];
    const globalAvgIES = globalData.reduce((acc, c) => acc + c.IES, 0) / globalData.length;
    const globalAvgEEF = globalData.reduce((acc, c) => acc + c.EEF, 0) / globalData.length;
    const globalAvgSEGRI = globalData.reduce((acc, c) => acc + c.SEGRI, 0) / globalData.length;

    return [
      { subject: t('Girişimci Yoğunluğu'), [inputs.cityName]: results.startupDensity, [t('Küresel Ortalama')]: 50 },
      { subject: t('Yetenek Havuzu'), [inputs.cityName]: results.studentDensity, [t('Küresel Ortalama')]: 55 },
      { subject: t('Yerel Destek'), [inputs.cityName]: inputs.govSupport * 10, [t('Küresel Ortalama')]: 60 },
      { subject: t('Yatırım Çekiciliği'), [inputs.cityName]: results.investmentDensity, [t('Küresel Ortalama')]: 45 },
      { subject: t('Altyapı (Kuluçka)'), [inputs.cityName]: results.incubatorDensity, [t('Küresel Ortalama')]: 50 },
      { subject: t('Küresel Ağ'), [inputs.cityName]: inputs.connectivity * 10, [t('Küresel Ortalama')]: 65 },
    ];
  }, [inputs, results, globalData, t]);

  const Icon = results.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-fintech-gray rounded-lg text-gray-500">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fintech-charcoal">{t('Yerel Yönetim Simülasyonu (Sandbox)')}</h2>
            <p className="text-sm text-gray-500">{t('Kendi şehrinizin veya bölgenizin verilerini girerek küresel ligdeki sanal konumunuzu ve tipolojinizi keşfedin.')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-fintech-charcoal border-b pb-2 mb-4">{t('Şehir/Bölge Verileri')}</h3>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('Şehir Adı')}</label>
              <input type="text" name="cityName" value={inputs.cityName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('Nüfus')}</label>
                <input type="number" name="population" value={inputs.population} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('Üniversite Öğrencisi')}</label>
                <input type="number" name="students" value={inputs.students} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" title={t('Yıllık Melek ve VC Yatırımı')}>{t('Yıllık Yatırım (Milyon $)')}</label>
                <input type="number" name="investment" value={inputs.investment} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">{t('Aktif Startup Sayısı')}</label>
                <input type="number" name="startups" value={inputs.startups} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t('Kuluçka / Teknopark Sayısı')}</label>
              <input type="number" name="incubators" value={inputs.incubators} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none" />
            </div>

            <div className="space-y-4 pt-2 border-t">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">{t('Yerel Yönetim İnovasyon Desteği')}</label>
                  <span className="text-xs font-bold text-gray-500">{inputs.govSupport}/10</span>
                </div>
                <input type="range" name="govSupport" min="1" max="10" value={inputs.govSupport} onChange={handleInputChange} className="w-full accent-teal-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">{t('Küresel Ağlara Entegrasyon')}</label>
                  <span className="text-xs font-bold text-gray-500">{inputs.connectivity}/10</span>
                </div>
                <input type="range" name="connectivity" min="1" max="10" value={inputs.connectivity} onChange={handleInputChange} className="w-full accent-teal-600" />
              </div>
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-fintech-charcoal text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10"><Activity size={80} /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t('Sanal SEGRİ Skoru')}</div>
                <div className="text-4xl font-black relative inline-block">
                  {results.SEGRI.toFixed(1)}
                  <div key={results.SEGRI} className="absolute -top-4 -right-6 animate-leaf-fall text-fintech-amber opacity-0 pointer-events-none">
                      <Leaf size={20} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover-card">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{t('Bireysel (IES)')}</div>
                <div className="text-3xl font-black text-fintech-coral">{results.IES.toFixed(1)}</div>
              </div>
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover-card">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{t('Ekosistem (EEF)')}</div>
                <div className="text-3xl font-black text-gray-500">{results.EEF.toFixed(1)}</div>
              </div>
            </div>

            {/* Typology & Rank */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-start gap-4 hover-card">
                <div className={`p-3 rounded-xl ${results.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{t('Ekosistem Tipolojisi')}</div>
                  <div className="text-lg font-black text-fintech-charcoal mb-1">{t(results.typology)}</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{t(results.desc)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-fintech-gray to-gray-50 border border-red-50 p-5 rounded-xl shadow-sm flex items-center gap-4">
                <div className="p-3 bg-fintech-coral text-white rounded-xl shadow-md">
                  <Trophy size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-fintech-coral mb-1">{t('Küresel Sanal Sıralama')}</div>
                  <div className="text-2xl font-black text-fintech-charcoal">
                    #{results.rank} <span className="text-sm font-medium text-gray-500">/ {globalData?.length || 0} {t('Ülke')}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{t('Bu verilerle bir ülke olsaydınız bu sırada yer alırdınız.')}</p>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-[300px] hover-card">
              <h3 className="text-sm font-bold text-fintech-charcoal mb-2 text-center">{t('Bileşen Analizi')}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name={inputs.cityName} dataKey={inputs.cityName} stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name={t('Küresel Ortalama')} dataKey={t('Küresel Ortalama')} stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeDasharray="3 3" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
