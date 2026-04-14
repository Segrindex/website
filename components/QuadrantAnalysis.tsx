import React, { useMemo } from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceLine, Label, Legend, Cell, PieChart, Pie } from 'recharts';
import { COLORS } from '../constants';
import { Rocket, Gem, Trophy, Shield, Building2, Zap, Info, Target, Lightbulb, TrendingUp, AlertTriangle, ChartPie, Users } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const getQuadColorDot = (q: string) => {
    if (q === "Iron Man") return "bg-gray-500";
    if (q === "Captain America") return "bg-fintech-coral";
    if (q === "Black Panther") return "bg-gray-500";
    return "bg-fintech-coral";
};

const CustomTooltip = ({ active, payload }: any) => {
  const { t } = useLanguage();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-200 shadow-xl rounded-xl text-sm min-w-[250px] animate-in fade-in zoom-in-95 duration-200 z-50">
        <div className="flex items-center justify-between gap-4 mb-3 border-b border-gray-200 pb-2">
            <p className="font-bold text-fintech-charcoal flex items-center gap-2 text-base">
                <span className="text-2xl" role="img" aria-label={`Flag of ${data.name}`}>{data.flag}</span> 
                {t(data.name)}
            </p>
            <span className="text-xs font-mono bg-fintech-gray px-1.5 py-0.5 rounded text-gray-500">{data.code}</span>
        </div>
        
        <div className="space-y-2 mb-4">
             <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">{t('SEGRİ Skoru')}</span>
                <span className="font-bold text-gray-700 text-lg">{data.SEGRI.toFixed(2)}</span>
            </div>
            <div className="w-full bg-fintech-gray h-2 rounded-full overflow-hidden">
                <div className="bg-fintech-coral h-full rounded-full transition-all duration-500" style={{ width: `${data.SEGRI}%` }}></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-lg mb-3 border border-gray-200">
            <div>
                <span className="text-xs text-gray-500 block mb-0.5">{t('IES (Bireysel)')}</span>
                <span className="font-bold text-fintech-charcoal text-base">{data.IES.toFixed(1)}</span>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-500 block mb-0.5">{t('EEF (Ekosistem)')}</span>
                <span className="font-bold text-fintech-charcoal text-base">{data.EEF.toFixed(1)}</span>
            </div>
            
            {/* Ecosystem Metrics */}
            <div className="col-span-2 border-t border-gray-200 my-1"></div>

            <div className="flex items-center gap-2">
                <div className="p-1 bg-fintech-gray text-gray-700 rounded">
                    <Gem size={14} />
                </div>
                <div>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wide leading-none mb-0.5">{t('Unicorns')}</span>
                    <span className="font-bold text-fintech-charcoal">{data.unicornCount}</span>
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 text-right">
                <div>
                     <span className="text-[10px] text-gray-500 block uppercase tracking-wide leading-none mb-0.5">{t('Startups')}</span>
                     <span className="font-bold text-fintech-charcoal">{data.startupCount.toLocaleString()}</span>
                </div>
                <div className="p-1 bg-fintech-gray text-gray-700 rounded">
                    <Rocket size={14} />
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
             <div className="flex items-center gap-2 text-gray-700 bg-white border border-gray-200 p-2 rounded shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${getQuadColorDot(data.quadrant)}`}></div>
                <span className="font-semibold">{t(data.quadrant)}</span>
             </div>
             <div className="flex items-center gap-2 text-gray-700 bg-white p-2 rounded border border-transparent">
                <span className="font-medium">{t('Tipoloji')}:</span>
                <span>{t(data.typology)}</span>
             </div>
        </div>
      </div>
    );
  }
  return null;
};
const QuadrantAnalysis: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const { t } = useLanguage();

  const stats = useMemo(() => {
    if (!data) return null;
    const counts = {
      "Iron Man": data.filter(c => c.quadrant === "Iron Man").length,
      "Captain America": data.filter(c => c.quadrant === "Captain America").length,
      "Black Panther": data.filter(c => c.quadrant === "Black Panther").length,
      "Spider-Man": data.filter(c => c.quadrant === "Spider-Man").length,
    };
    return [
      { name: 'Iron Man', value: counts["Iron Man"], color: COLORS.ironMan },
      { name: 'Captain America', value: counts["Captain America"], color: COLORS.captainAmerica },
      { name: 'Black Panther', value: counts["Black Panther"], color: COLORS.blackPanther },
      { name: 'Spider-Man', value: counts["Spider-Man"], color: COLORS.spiderMan },
    ];
  }, [data]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data || !stats) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-black text-fintech-charcoal mb-3 tracking-tight">{t('Kadran Analizi (IES vs EEF)')}</h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                    {t('Selçuk Ergin tarafından geliştirilen bu matris, bir ülkenin girişimcilik DNA\'sını iki ana boyutta inceler:')} 
                    <span className="text-gray-700 font-bold"> {t('Bireysel Ruh (IES)')}</span> {t('ve')} 
                    <span className="text-fintech-coral font-bold"> {t('Ekosistem Desteği (EEF)')}</span>.
                </p>
            </div>
            <div className="bg-red-50 p-4 rounded-2xl border border-red-50 flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm text-fintech-coral hover-card">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-fintech-amber uppercase tracking-widest">{t('TOPLAM ÜLKE')}</p>
                    <p className="text-2xl font-black text-fintech-charcoal">{data.length}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-8 bg-white/50 rounded-2xl border border-gray-200 p-6">
                <div className="h-[550px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            
                            <XAxis type="number" dataKey="IES" domain={[40, 100]} name="IES" unit="">
                                <Label value={t("Bireysel Girişimcilik Ruhu (IES) →")} offset={-20} position="insideBottom" style={{ fontWeight: '800', fill: '#64748B', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' }} />
                            </XAxis>
                            <YAxis type="number" dataKey="EEF" domain={[40, 100]} name="EEF" unit="">
                                <Label value={t("Ekosistem Destekleyici Faktör (EEF) →")} angle={-90} position="insideLeft" style={{ fontWeight: '800', fill: '#64748B', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px' }} />
                            </YAxis>
                            <ZAxis type="number" dataKey="SEGRI" range={[150, 1000]} name={t("SEGRİ Skoru")} />
                            
                            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#94A3B8' }} />
                            <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ paddingTop: '0', paddingBottom: '20px', fontSize: '12px', fontWeight: '700' }} />

                            <ReferenceLine x={75} stroke="#94A3B8" strokeWidth={2} strokeDasharray="8 8">
                                <Label value={t("IES Eşiği (75)")} position="insideTopRight" angle={90} offset={10} className="text-[10px] text-gray-500 font-black" />
                            </ReferenceLine>
                            <ReferenceLine y={70} stroke="#94A3B8" strokeWidth={2} strokeDasharray="8 8">
                                <Label value={t("EEF Eşiği (70)")} position="insideTopRight" offset={10} className="text-[10px] text-gray-500 font-black" />
                            </ReferenceLine>

                            <Scatter name={t("Iron Man (Liderler)")} data={data.filter(c => c.quadrant === "Iron Man")} fill={COLORS.ironMan} shape="circle" />
                            <Scatter name={t("Captain America (Potansiyel)")} data={data.filter(c => c.quadrant === "Captain America")} fill={COLORS.captainAmerica} shape="circle" />
                            <Scatter name={t("Black Panther (Ekosistem)")} data={data.filter(c => c.quadrant === "Black Panther")} fill={COLORS.blackPanther} shape="circle" />
                            <Scatter name={t("Spider-Man (Gelişen)")} data={data.filter(c => c.quadrant === "Spider-Man")} fill={COLORS.spiderMan} shape="circle" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Distribution & Info */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover-card">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <ChartPie size={16} /> {t('Küresel Dağılım')}
                    </h3>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {stats.map(s => (
                            <div key={s.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                                <span className="text-[11px] font-bold text-gray-700">{t(s.name)}: <span className="text-fintech-charcoal">{s.value}</span></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-fintech-charcoal p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                        <Info size={120} />
                    </div>
                    <h3 className="text-sm font-black text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target size={16} /> {t('Analitik Eşikler')}
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <p className="text-xs font-bold text-blue-200 mb-1">IES {t('Eşiği')} (75)</p>
                            <p className="text-[11px] text-blue-100/70 leading-relaxed">
                                {t('Bireysel girişimcilik ruhunun "olgun" kabul edilmesi için gereken minimum puan. Risk alma ve inovasyon iştahını temsil eder.')}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-800">
                            <p className="text-xs font-bold text-blue-200 mb-1">EEF {t('Eşiği')} (70)</p>
                            <p className="text-[11px] text-blue-100/70 leading-relaxed">
                                {t('Ekosistemin (finans, hukuk, altyapı) girişimciyi destekleme kapasitesinin kritik seviyesi.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Quadrant Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Iron Man */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover-card">
            <div className="p-6 bg-gradient-to-r from-teal-600 to-teal-600 text-white">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-black tracking-tight">Iron Man</h3>
                    <Trophy size={32} className="opacity-40" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal-100">{t('Ekosistem Liderleri')}</p>
            </div>
            <div className="p-8 flex-1 space-y-6">
                <div>
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Info size={16} className="text-gray-500" /> {t('Karakteristik')}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {t('Hem bireysel yetkinlikleri hem de ekosistem desteği yüksek olan ülkeler. Bu ülkelerde girişimcilik bir "yaşam biçimi" haline gelmiş ve devlet/finans mekanizmalarıyla tam uyum sağlamıştır.')}
                    </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Lightbulb size={16} /> {t('Stratejik Tavsiye')}
                    </h4>
                    <ul className="text-xs text-fintech-charcoal space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Derin teknoloji (Deep-Tech) ve Ar-Ge yatırımlarına odaklanarak liderliği pekiştirin.')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Ekosistem modelini diğer ülkelere ihraç ederek küresel standartları belirleyin.')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Captain America */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover-card">
            <div className="p-6 bg-gradient-to-r from-fintech-coral to-red-500 text-white">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-black tracking-tight">Captain America</h3>
                    <Shield size={32} className="opacity-40" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-50">{t('Potansiyel Yıldızlar')}</p>
            </div>
            <div className="p-8 flex-1 space-y-6">
                <div>
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Info size={16} className="text-fintech-coral" /> {t('Karakteristik')}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {t('Bireysel girişimcilik ruhu ve risk alma iştahı çok yüksek, ancak ekosistem (finansman, regülasyon, altyapı) tarafından kısıtlanan ülkeler. "Kendi imkanlarıyla başaranlar" diyarı.')}
                    </p>
                </div>
                <div className="bg-red-50 p-5 rounded-2xl border border-red-50">
                    <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Zap size={16} /> {t('Stratejik Tavsiye')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Acil regülasyon reformları ile bürokrasiyi azaltın ve hukuki güvenliği artırın.')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Risk sermayesi (VC) ve melek yatırımcı ağlarını teşvik eden vergi modelleri geliştirin.')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Black Panther */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover-card">
            <div className="p-6 bg-gradient-to-r from-fintech-primary to-fintech-primary text-white">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-black tracking-tight">Black Panther</h3>
                    <Building2 size={32} className="opacity-40" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100">{t('Ekosistem Odaklılar')}</p>
            </div>
            <div className="p-8 flex-1 space-y-6">
                <div>
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Info size={16} className="text-gray-700" /> {t('Karakteristik')}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {t('Mükemmel bir altyapıya, finansal bolluğa ve regülatif desteğe sahip olan ancak bireysel risk alma iştahı veya inovasyon motivasyonu düşük kalan ülkeler.')}
                    </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Users size={16} /> {t('Stratejik Tavsiye')}
                    </h4>
                    <ul className="text-xs text-fintech-charcoal space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Girişimcilik eğitimini ilkokul seviyesinden itibaren müfredata entegre ederek kültürel dönüşümü başlatın.')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Başarısızlık korkusunu azaltacak sosyal güvenlik modelleri ve "ikinci şans" programları oluşturun.')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Spider-Man */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover-card">
            <div className="p-6 bg-gradient-to-r from-fintech-primary to-fintech-teal text-white">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-black tracking-tight">Spider-Man</h3>
                    <Zap size={32} className="opacity-40" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-50">{t('Gelişen Ekosistemler')}</p>
            </div>
            <div className="p-8 flex-1 space-y-6">
                <div>
                    <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Info size={16} className="text-fintech-coral" /> {t('Karakteristik')}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {t('Hem bireysel girişimcilik ruhu hem de ekosistem desteği açısından yolun başında olan ülkeler. Büyük bir potansiyel barındırırlar ancak henüz "ateşleyici" gücü bulamamışlardır.')}
                    </p>
                </div>
                <div className="bg-red-50 p-5 rounded-2xl border border-red-50">
                    <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} /> {t('Stratejik Tavsiye')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-2 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Temel dijital altyapıyı (internet, e-devlet) güçlendirin ve şirket kurma maliyetlerini minimize edin.')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{t('Mikro-girişimciliği destekleyerek yerel başarı hikayeleri yaratın ve toplumsal motivasyonu artırın.')}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuadrantAnalysis;