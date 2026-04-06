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

const TypologyAnalysis: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();
  const [selectedTypology, setSelectedTypology] = useState<string>('Gandalf Tipi');

  const typologies = [
    { 
      name: 'Gandalf Tipi', 
      formula: 'High ICT and PIM', 
      desc: 'Tend to create new markets with wisdom and foresight.', 
      color: 'indigo',
      icon: Brain,
      characteristics: [
        'Bilgelik ve öngörü ile hareket eder.',
        'Yeni pazarlar yaratma eğilimindedir.',
        'İnovasyon ve içsel motivasyonu birleştirir.'
      ],
      careerPaths: [
        'Teknoloji Vizyoneri',
        'Strateji Direktörü (CSO)',
        'İnovasyon Danışmanı',
        'Ar-Ge Merkezi Lideri'
      ],
      challenges: [
        'Aşırı analiz yapma (Analysis Paralysis).',
        'Pazar gerçeklerinden uzaklaşma ihtimali.',
        'Operasyonel detaylarda boğulma.'
      ],
      strategy: 'Vizyoner bakış açısını operasyonel gerçeklerle dengelemelidir.'
    },
    { 
      name: 'Aragorn Tipi', 
      formula: 'Very high RTC', 
      desc: 'Embrace uncertainty and lead with courage.', 
      color: 'red',
      icon: Sword,
      characteristics: [
        'Belirsizliği kucaklar.',
        'Cesaretle liderlik eder.',
        'Risk alma iştahı çok yüksektir.'
      ],
      careerPaths: [
        'Seri Girişimci',
        'Kriz Yöneticisi',
        'Risk Sermayedarı (VC)',
        'Yüksek Riskli Yatırımcı'
      ],
      challenges: [
        'Aşırı risk alma eğilimi.',
        'Stratejik planlamayı ihmal etme.',
        'Ani karar değişiklikleri ile ekibi yorma.'
      ],
      strategy: 'Cesaretini veri odaklı risk analiziyle desteklemelidir.'
    },
    { 
      name: 'Frodo Tipi', 
      formula: 'High SCW and PIM', 
      desc: 'Focus on societal problems despite personal challenges.', 
      color: 'green',
      icon: Heart,
      characteristics: [
        'Kişisel zorluklara rağmen toplumsal sorunlara odaklanır.',
        'Güçlü bir içsel motivasyona sahiptir.',
        'Amaç odaklıdır.'
      ],
      careerPaths: [
        'Sosyal Girişimci',
        'STK Lideri',
        'Etki Yatırımcısı',
        'Topluluk Organizatörü'
      ],
      challenges: [
        'Tükenmişlik sendromu (Burnout) riski.',
        'Finansal sürdürülebilirliği ihmal etme.',
        'Duygusal karar verme.'
      ],
      strategy: 'Toplumsal misyonu finansal sürdürülebilirlikle birleştirmelidir.'
    },
    { 
      name: 'Legolas Tipi', 
      formula: 'High IAW and ICT', 
      desc: 'Prefer autonomous work with precision and skill.', 
      color: 'yellow',
      icon: Target,
      characteristics: [
        'Özerk çalışmayı tercih eder.',
        'Hassasiyet ve yetenekle iş yapar.',
        'Bağımsızlığa ve inovasyona değer verir.'
      ],
      careerPaths: [
        'Uzman Danışman',
        'Butik Ajans Sahibi',
        'Niş SaaS Kurucusu',
        'Serbest (Freelance) Uzman'
      ],
      challenges: [
        'Ekip kurma ve delegasyon zorluğu.',
        'Ölçeklenme sorunları.',
        'Pazarlama ve satışa mesafeli duruş.'
      ],
      strategy: 'Bireysel mükemmelliği ekip sinerjisine dönüştürmelidir.'
    },
    { 
      name: 'Gimli Tipi', 
      formula: 'Medium RTC and ICT, low PIM', 
      desc: 'Leverage opportunities with practical determination.', 
      color: 'orange',
      icon: Hammer,
      characteristics: [
        'Pratik kararlılıkla fırsatları değerlendirir.',
        'Ayakları yere basan bir yaklaşımı vardır.',
        'Uygulama odaklıdır.'
      ],
      careerPaths: [
        'KOBİ Sahibi',
        'Franchise İşletmecisi',
        'Operasyon Müdürü (COO)',
        'Lojistik/Üretim Yöneticisi'
      ],
      challenges: [
        'Uzun vadeli vizyon eksikliği.',
        'Değişime direnç gösterme.',
        'Düşük içsel motivasyon.'
      ],
      strategy: 'Motivasyon kaynaklarını çeşitlendirmeli ve vizyoner ortaklıklar kurmalıdır.'
    },
    { 
      name: 'Galadriel Tipi', 
      formula: 'Very high SCW', 
      desc: 'Dedicated to creating social impact with wisdom and protection.', 
      color: 'teal',
      icon: Shield,
      characteristics: [
        'Sosyal etki yaratmaya adanmıştır.',
        'Bilgelik ve koruma güdüsüyle hareket eder.',
        'Toplumsal faydayı en üstte tutar.'
      ],
      careerPaths: [
        'Vakıf Başkanı',
        'Politika Yapıcı',
        'CSR (Kurumsal Sosyal Sorumluluk) Yöneticisi',
        'Filantropist'
      ],
      challenges: [
        'Ticari gerçekliklerden kopma riski.',
        'Kaynak yönetiminde zorluklar.',
        'Ölçülebilir başarı kriteri eksikliği.'
      ],
      strategy: 'Etki odaklı yatırım ve sürdürülebilir iş modellerine odaklanmalıdır.'
    },
    { 
      name: 'Han Solo Tipi', 
      formula: 'High RTC, low SCW', 
      desc: 'In search of quick gains with a maverick approach.', 
      color: 'gray',
      icon: Zap,
      characteristics: [
        'Hızlı kazanç peşindedir.',
        'Kuralları esneten "maverick" bir yaklaşımı vardır.',
        'Yüksek risk alır ancak sosyal kaygısı düşüktür.'
      ],
      careerPaths: [
        'Growth Hacker',
        'Satış Direktörü',
        'Arbitraj Tüccarı',
        'Disruptive (Yıkıcı) Startup Kurucusu'
      ],
      challenges: [
        'Etik gri alanlar ve güven sorunu.',
        'Uzun vadeli sürdürülebilirlik.',
        'Takım sadakati oluşturma zorluğu.'
      ],
      strategy: 'Kısa vadeli kazanımları uzun vadeli değer yaratımına dönüştürmelidir.'
    },
  ];

  // Map colors to full Tailwind classes to ensure they are included in the build
  const getTypologyStyles = (color: string) => {
    const styles: Record<string, { btn: string, btnSelected: string, headerBg: string, iconColor: string }> = {
        indigo: { 
            btn: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-indigo-50 text-indigo-700 border-indigo-400 ring-2 ring-offset-2 ring-indigo-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600'
        },
        red: { 
            btn: 'bg-red-50 text-red-700 border-red-200 hover:border-red-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-red-50 text-red-700 border-red-400 ring-2 ring-offset-2 ring-red-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-red-50',
            iconColor: 'text-red-600'
        },
        green: { 
            btn: 'bg-green-50 text-green-700 border-green-200 hover:border-green-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-green-50 text-green-700 border-green-400 ring-2 ring-offset-2 ring-green-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        yellow: { 
            btn: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:border-yellow-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-yellow-50 text-yellow-700 border-yellow-400 ring-2 ring-offset-2 ring-yellow-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-yellow-50',
            iconColor: 'text-yellow-600'
        },
        orange: { 
            btn: 'bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-orange-50 text-orange-700 border-orange-400 ring-2 ring-offset-2 ring-orange-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-orange-50',
            iconColor: 'text-orange-600'
        },
        teal: { 
            btn: 'bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-teal-50 text-teal-700 border-teal-400 ring-2 ring-offset-2 ring-teal-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-teal-50',
            iconColor: 'text-teal-600'
        },
        gray: { 
            btn: 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100',
            btnSelected: 'bg-gray-100 text-gray-700 border-gray-400 ring-2 ring-offset-2 ring-gray-500 shadow-md transform scale-[1.02]',
            headerBg: 'bg-gray-100',
            iconColor: 'text-gray-600'
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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
             <Brain size={24} />
           </div>
           <div>
             <h2 className="text-xl font-bold text-gray-800">Girişimcilik Tipolojileri</h2>
             <p className="text-sm text-gray-500">SEGRİ modeline göre girişimci karakterlerinin güçlü ve zayıf yönleri.</p>
           </div>
        </div>
        
        {/* Typology Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
            {typologies.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTypology === t.name;
                const styles = getTypologyStyles(t.color);
                return (
                    <button 
                        key={t.name} 
                        onClick={() => setSelectedTypology(t.name)}
                        className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center text-center gap-2 ${isSelected ? styles.btnSelected : styles.btn}`}
                    >
                        <Icon size={24} />
                        <span className="text-xs font-bold leading-tight">{t.name}</span>
                    </button>
                );
            })}
        </div>
      </div>

      {/* Detail View */}
      {activeTypology && (
        <div key={activeTypology.name} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            {/* Dynamic Header Background */}
            <div className={`p-6 border-b ${getTypologyStyles(activeTypology.color).headerBg}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white shadow-sm ${getTypologyStyles(activeTypology.color).iconColor}`}>
                            <activeTypology.icon size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{activeTypology.name}</h3>
                            <p className="text-sm font-medium opacity-75">{activeTypology.formula}</p>
                        </div>
                    </div>
                    <div className="text-right max-w-md hidden md:block">
                        <p className="text-gray-600 italic">"{activeTypology.desc}"</p>
                    </div>
                </div>
                <div className="mt-4 md:hidden text-sm text-gray-600 italic">
                    "{activeTypology.desc}"
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
                {/* Characteristics */}
                <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <CheckCircle2 size={16} className="text-green-500" /> Temel Özellikler
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.characteristics.map((c, i) => (
                            <li key={i} className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                                <span className="text-green-400 mt-1 shrink-0">•</span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Career Paths */}
                <div className="p-6 bg-gray-50/50">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <Briefcase size={16} className="text-indigo-500" /> Kariyer Yolları
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.careerPaths.map((c, i) => (
                            <li key={i} className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                                <span className="text-indigo-400 mt-1 shrink-0">→</span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div className="p-6 bg-red-50/20">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <AlertTriangle size={16} className="text-red-500" /> Riskler & Zorluklar
                    </h4>
                    <ul className="space-y-3">
                        {activeTypology.challenges.map((c, i) => (
                            <li key={i} className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                                <span className="text-red-400 mt-1 shrink-0">•</span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Strategy */}
                <div className="p-6 bg-blue-50/20">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                        <TrendingUp size={16} className="text-blue-500" /> Başarı Stratejisi
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-blue-400 pl-4 py-2 italic bg-white rounded-r-lg shadow-sm">
                        "{activeTypology.strategy}"
                    </p>
                    <div className="mt-6 flex items-start gap-2 text-xs text-gray-500">
                        <Info size={14} className="shrink-0 mt-0.5" />
                        Bu strateji, SEGRİ modelinin IES/EEF dengesini optimize etmek için önerilmektedir.
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Country Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Ülke Dağılımı</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(c => (
                <div 
                    key={c.code} 
                    className={`flex items-center justify-between p-3 border rounded transition-colors ${c.typology === selectedTypology ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'hover:bg-gray-50 border-gray-200'}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.flag}</span>
                        <span className="font-medium text-gray-800">{c.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.typology === selectedTypology ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                        {c.typology}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TypologyAnalysis;