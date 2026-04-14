import React, { useState } from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { 
  Brain, 
  Sword, 
  Heart, 
  Target, 
  Hammer, 
  Shield, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Info,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { SectoralHeatmap } from './SectoralHeatmap';

const TypologyAnalysis: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const [selectedTypology, setSelectedTypology] = useState<string>('Gandalf Tipi');
  const { t } = useLanguage();

  const typologies = [
    { 
      name: 'Gandalf Tipi', 
      formula: 'High ICT and PIM', 
      desc: t('Tend to create new markets with wisdom and foresight.'), 
      color: 'indigo',
      icon: Brain,
      characteristics: [
        t('Bilgelik ve öngörü ile hareket eder.'),
        t('Yeni pazarlar yaratma eğilimindedir.'),
        t('İnovasyon ve içsel motivasyonu birleştirir.')
      ],
      careerPaths: [
        t('Teknoloji Vizyoneri'),
        t('Strateji Direktörü (CSO)'),
        t('İnovasyon Danışmanı'),
        t('Ar-Ge Merkezi Lideri')
      ],
      challenges: [
        t('Aşırı analiz yapma (Analysis Paralysis).'),
        t('Pazar gerçeklerinden uzaklaşma ihtimali.'),
        t('Operasyonel detaylarda boğulma.')
      ],
      strategy: t('Vizyoner bakış açısını operasyonel gerçeklerle dengelemelidir.')
    },
    { 
      name: 'Aragorn Tipi', 
      formula: 'Very high RTC', 
      desc: t('Embrace uncertainty and lead with courage.'), 
      color: 'red',
      icon: Sword,
      characteristics: [
        t('Belirsizliği kucaklar.'),
        t('Cesaretle liderlik eder.'),
        t('Risk alma iştahı çok yüksektir.')
      ],
      careerPaths: [
        t('Seri Girişimci'),
        t('Kriz Yöneticisi'),
        t('Risk Sermayedarı (VC)'),
        t('Yüksek Riskli Yatırımcı')
      ],
      challenges: [
        t('Aşırı risk alma eğilimi.'),
        t('Stratejik planlamayı ihmal etme.'),
        t('Ani karar değişiklikleri ile ekibi yorma.')
      ],
      strategy: t('Cesaretini veri odaklı risk analiziyle desteklemelidir.')
    },
    { 
      name: 'Frodo Tipi', 
      formula: 'High SCW and PIM', 
      desc: t('Focus on societal problems despite personal challenges.'), 
      color: 'green',
      icon: Heart,
      characteristics: [
        t('Kişisel zorluklara rağmen toplumsal sorunlara odaklanır.'),
        t('Güçlü bir içsel motivasyona sahiptir.'),
        t('Amaç odaklıdır.')
      ],
      careerPaths: [
        t('Sosyal Girişimci'),
        t('STK Lideri'),
        t('Etki Yatırımcısı'),
        t('Topluluk Organizatörü')
      ],
      challenges: [
        t('Tükenmişlik sendromu (Burnout) riski.'),
        t('Finansal sürdürülebilirliği ihmal etme.'),
        t('Duygusal karar verme.')
      ],
      strategy: t('Toplumsal misyonu finansal sürdürülebilirlikle birleştirmelidir.')
    },
    { 
      name: 'Legolas Tipi', 
      formula: 'High IAW and ICT', 
      desc: t('Prefer autonomous work with precision and skill.'), 
      color: 'yellow',
      icon: Target,
      characteristics: [
        t('Özerk çalışmayı tercih eder.'),
        t('Hassasiyet ve yetenekle iş yapar.'),
        t('Bağımsızlığa ve inovasyona değer verir.')
      ],
      careerPaths: [
        t('Uzman Danışman'),
        t('Butik Ajans Sahibi'),
        t('Niş SaaS Kurucusu'),
        t('Serbest (Freelance) Uzman')
      ],
      challenges: [
        t('Ekip kurma ve delegasyon zorluğu.'),
        t('Ölçeklenme sorunları.'),
        t('Pazarlama ve satışa mesafeli duruş.')
      ],
      strategy: t('Bireysel mükemmelliği ekip sinerjisine dönüştürmelidir.')
    },
    { 
      name: 'Gimli Tipi', 
      formula: 'Medium RTC and ICT, low PIM', 
      desc: t('Leverage opportunities with practical determination.'), 
      color: 'orange',
      icon: Hammer,
      characteristics: [
        t('Pratik kararlılıkla fırsatları değerlendirir.'),
        t('Ayakları yere basan bir yaklaşımı vardır.'),
        t('Uygulama odaklıdır.')
      ],
      careerPaths: [
        t('KOBİ Sahibi'),
        t('Franchise İşletmecisi'),
        t('Operasyon Müdürü (COO)'),
        t('Lojistik/Üretim Yöneticisi')
      ],
      challenges: [
        t('Uzun vadeli vizyon eksikliği.'),
        t('Değişime direnç gösterme.'),
        t('Düşük içsel motivasyon.')
      ],
      strategy: t('Motivasyon kaynaklarını çeşitlendirmeli ve vizyoner ortaklıklar kurmalıdır.')
    },
    { 
      name: 'Galadriel Tipi', 
      formula: 'Very high SCW', 
      desc: t('Dedicated to creating social impact with wisdom and protection.'), 
      color: 'teal',
      icon: Shield,
      characteristics: [
        t('Sosyal etki yaratmaya adanmıştır.'),
        t('Bilgelik ve koruma güdüsüyle hareket eder.'),
        t('Toplumsal faydayı en üstte tutar.')
      ],
      careerPaths: [
        t('Vakıf Başkanı'),
        t('Politika Yapıcı'),
        t('CSR (Kurumsal Sosyal Sorumluluk) Yöneticisi'),
        t('Filantropist')
      ],
      challenges: [
        t('Ticari gerçekliklerden kopma riski.'),
        t('Kaynak yönetiminde zorluklar.'),
        t('Ölçülebilir başarı kriteri eksikliği.')
      ],
      strategy: t('Etki odaklı yatırım ve sürdürülebilir iş modellerine odaklanmalıdır.')
    },
    { 
      name: 'Han Solo Tipi', 
      formula: 'High RTC, low SCW', 
      desc: t('In search of quick gains with a maverick approach.'), 
      color: 'gray',
      icon: Zap,
      characteristics: [
        t('Hızlı kazanç peşindedir.'),
        t('Kuralları esneten "maverick" bir yaklaşımı vardır.'),
        t('Yüksek risk alır ancak sosyal kaygısı düşüktür.')
      ],
      careerPaths: [
        t('Growth Hacker'),
        t('Satış Direktörü'),
        t('Arbitraj Tüccarı'),
        t('Disruptive (Yıkıcı) Startup Kurucusu')
      ],
      challenges: [
        t('Etik gri alanlar ve güven sorunu.'),
        t('Uzun vadeli sürdürülebilirlik.'),
        t('Takım sadakati oluşturma zorluğu.')
      ],
      strategy: t('Kısa vadeli kazanımları uzun vadeli değer yaratımına dönüştürmelidir.')
    },
  ];

  // Map colors to full Tailwind classes to ensure they are included in the build
  const getTypologyStyles = (color: string) => {
    const styles: Record<string, { btn: string, btnSelected: string, headerBg: string, iconColor: string }> = {
        indigo: { 
            btn: 'bg-gray-50 text-fintech-charcoal border-gray-300 hover:border-fintech-primary opacity-80 hover:opacity-100',
            btnSelected: 'bg-gray-50 text-fintech-charcoal border-fintech-primary ring-2 ring-offset-2 ring-gray-700 shadow-md transform scale-[1.02]',
            headerBg: 'bg-gray-50',
            iconColor: 'text-gray-700'
        },
        red: { 
            btn: 'bg-red-50 text-gray-700 border-red-300 hover:border-red-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-red-50 text-gray-700 border-red-400 ring-2 ring-offset-2 ring-fintech-coral shadow-md transform scale-[1.02]',
            headerBg: 'bg-red-50',
            iconColor: 'text-fintech-coral'
        },
        green: { 
            btn: 'bg-gray-50 text-fintech-charcoal border-gray-300 hover:border-teal-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-gray-50 text-fintech-charcoal border-teal-400 ring-2 ring-offset-2 ring-gray-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-gray-50',
            iconColor: 'text-gray-500'
        },
        yellow: { 
            btn: 'bg-amber-50 text-gray-700 border-amber-300 hover:border-yellow-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-amber-50 text-gray-700 border-yellow-400 ring-2 ring-offset-2 ring-fintech-amber shadow-md transform scale-[1.02]',
            headerBg: 'bg-amber-50',
            iconColor: 'text-fintech-amber'
        },
        orange: { 
            btn: 'bg-red-50 text-gray-700 border-red-200 hover:border-fintech-amber opacity-80 hover:opacity-100',
            btnSelected: 'bg-red-50 text-gray-700 border-fintech-amber ring-2 ring-offset-2 ring-fintech-coral shadow-md transform scale-[1.02]',
            headerBg: 'bg-red-50',
            iconColor: 'text-fintech-coral'
        },
        teal: { 
            btn: 'bg-gray-50 text-fintech-charcoal border-gray-300 hover:border-teal-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-gray-50 text-fintech-charcoal border-teal-400 ring-2 ring-offset-2 ring-gray-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-gray-50',
            iconColor: 'text-gray-500'
        },
        gray: { 
            btn: 'bg-fintech-gray text-gray-700 border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-fintech-gray text-gray-700 border-gray-400 ring-2 ring-offset-2 ring-gray-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-fintech-gray',
            iconColor: 'text-gray-700'
        },
    };
    return styles[color] || styles.indigo;
  };

  const activeTypology = typologies.find(t => t.name === selectedTypology);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data) return null;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Intro Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-red-50 text-gray-700 rounded-lg">
             <Brain size={24} />
           </div>
           <div>
             <h2 className="text-xl font-bold text-fintech-charcoal">{t('Girişimcilik Tipolojileri')}</h2>
             <p className="text-sm text-gray-500">{t('SEGRİ modeline göre girişimci karakterlerinin güçlü ve zayıf yönleri.')}</p>
           </div>
        </div>
        
        {/* Typology Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
            {typologies.map((tItem) => {
                const Icon = tItem.icon;
                const isSelected = selectedTypology === tItem.name;
                const styles = getTypologyStyles(tItem.color);
                return (
                    <button 
                        key={tItem.name} 
                        onClick={() => setSelectedTypology(tItem.name)}
                        className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center text-center gap-2 ${isSelected ? styles.btnSelected : styles.btn}`}
                    >
                        <Icon size={24} />
                        <span className="text-xs font-bold leading-tight">{t(tItem.name)}</span>
                    </button>
                );
            })}
        </div>
      </div>

      {/* Detail View */}
      {activeTypology && (
        <div key={activeTypology.name} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 hover-card">
            {/* Dynamic Header Background */}
            <div className={`p-6 border-b ${getTypologyStyles(activeTypology.color).headerBg}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white shadow-sm ${getTypologyStyles(activeTypology.color).iconColor}`}>
                            <activeTypology.icon size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-fintech-charcoal">{t(activeTypology.name)}</h3>
                            <p className="text-sm font-medium opacity-75">{activeTypology.formula}</p>
                        </div>
                    </div>
                    <div className="text-right max-w-md hidden md:block">
                        <p className="text-gray-700 italic">"{t(activeTypology.desc)}"</p>
                    </div>
                </div>
                <div className="mt-4 md:hidden text-sm text-gray-700 italic">
                    "{t(activeTypology.desc)}"
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {/* Characteristics */}
                <div className="p-6">
                    <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <CheckCircle2 size={16} className="text-gray-500" /> {t('Temel Özellikler')}
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.characteristics.map((c, i) => (
                            <li key={i} className="text-sm text-gray-700 flex gap-2 leading-relaxed">
                                <span className="text-teal-400 mt-1 shrink-0">•</span>
                                {t(c)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Career Paths */}
                <div className="p-6 bg-white/50">
                    <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <Briefcase size={16} className="text-gray-700" /> {t('Kariyer Yolları')}
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.careerPaths.map((c, i) => (
                            <li key={i} className="text-sm text-gray-700 flex gap-2 leading-relaxed">
                                <span className="text-fintech-primary mt-1 shrink-0">→</span>
                                {t(c)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div className="p-6 bg-red-50/20">
                    <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <AlertTriangle size={16} className="text-fintech-coral" /> {t('Riskler & Zorluklar')}
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.challenges.map((c, i) => (
                            <li key={i} className="text-sm text-gray-700 flex gap-2 leading-relaxed">
                                <span className="text-red-400 mt-1 shrink-0">•</span>
                                {t(c)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Strategy */}
                <div className="p-6 bg-red-50/20">
                    <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <TrendingUp size={16} className="text-fintech-coral" /> {t('Başarı Stratejisi')}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-fintech-amber pl-4 py-2 italic bg-white rounded-r-lg shadow-sm">
                        "{t(activeTypology.strategy)}"
                    </p>
                    <div className="mt-6 flex items-start gap-2 text-xs text-gray-500">
                        <Info size={14} className="shrink-0 mt-0.5" />
                        {t('Bu strateji, SEGRİ modelinin IES/EEF dengesini optimize etmek için önerilmektedir.')}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Country Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover-card">
        <h3 className="font-bold text-lg mb-4 text-fintech-charcoal">{t('Ülke Dağılımı')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(c => (
                <div 
                    key={c.code} 
                    className={`flex items-center justify-between p-3 border rounded transition-colors ${c.typology === selectedTypology ? 'bg-red-50 border-red-200 ring-1 ring-orange-200' : 'hover:bg-white border-gray-200'}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.flag}</span>
                        <span className="font-medium text-fintech-charcoal">{t(c.name)}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.typology === selectedTypology ? 'bg-red-50 text-gray-700' : 'bg-fintech-gray text-gray-700'}`}>
                        {t(c.typology)}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* Sectoral Heatmap */}
      <SectoralHeatmap />
    </div>
  );
};

export default TypologyAnalysis;