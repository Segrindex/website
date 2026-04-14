
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  Target, 
  ShieldAlert, 
  Heart, 
  ChevronRight, 
  Info, 
  Zap, 
  Award,
  BarChart2,
  Download,
  Save,
  RefreshCw,
  FileText,
  ShieldCheck,
  Code,
  ExternalLink,
  Users,
  Calendar,
  Lock,
  Database,
  Github,
  GraduationCap,
  Filter
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SEGRICalculator from './SEGRICalculator';
import RiskAnalysis from './RiskAnalysis';

// --- Methodology Guide Section ---
const MethodologyGuide = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: t('Veri toplama ilkeleri'), 
            desc: t('Çoklu kaynak doğrulama, etik kurul onayı ve veri bütünlüğü protokolleri.'),
            icon: Database,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          { 
            title: t('Normalizasyon yöntemi'), 
            desc: t('Min-Max + %95 Winsorization – Aykırı değerlerin etkisini minimize ederek sağlıklı kıyaslama sağlar.'),
            icon: BarChart2,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          { 
            title: t('Ağırlıklandırma süreci'), 
            desc: t('Delphi paneli veya AHP (Analitik Hiyerarşi Süreci) ile uzman görüşlerinin matematiksel modellemesi.'),
            icon: Target,
            color: 'text-teal-600',
            bg: 'bg-teal-50'
          },
          { 
            title: t('Güven aralığı hesaplama'), 
            desc: t('Bootstrapping yöntemi ile verinin istatistiksel anlamlılığı ve hata payı analizi.'),
            icon: ShieldCheck,
            color: 'text-green-600',
            bg: 'bg-green-50'
          }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-5">
            <div className={`p-3 rounded-2xl ${item.bg} ${item.color} flex-shrink-0 h-fit`}>
              <item.icon size={24} />
            </div>
            <div>
              <h4 className="font-black text-fintech-charcoal mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Erken Aşama Hunisi Metodolojisi */}
      <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-fintech-coral">
            <Filter size={20} />
          </div>
          <h3 className="text-lg font-black text-fintech-charcoal uppercase tracking-tight">{t('Erken Aşama Hunisi Metodolojisi')}</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider border-b pb-2">{t('Aşama Tanımları')}</h4>
            <ul className="space-y-3">
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fintech-coral mt-1 flex-shrink-0" />
                <span><strong>{t('Tohum (Seed)')}:</strong> {t('İlk sermaye, ürün-pazar uyumu (PMF) öncesi aşama.')}</span>
              </li>
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                <span><strong>{t('Seri A/B')}:</strong> {t('Büyüme sermayesi, ölçeklenme ve pazar genişlemesi.')}</span>
              </li>
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fintech-charcoal mt-1 flex-shrink-0" />
                <span><strong>{t('Unicorn')}:</strong> {t('1 Milyar $ üzeri değerleme, küresel şampiyonluk.')}</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider border-b pb-2">{t('Analiz Parametreleri')}</h4>
            <ul className="space-y-3">
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                <span><strong>{t('Dönüşüm Oranı')}:</strong> {t('Bir aşamadan sonrakine geçiş yüzdesi.')}</span>
              </li>
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1 flex-shrink-0" />
                <span><strong>{t('Küresel Kıyaslama')}:</strong> {t('Silikon Vadisi ve Londra gibi hub\'larla karşılaştırma.')}</span>
              </li>
              <li className="text-xs text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 flex-shrink-0" />
                <span><strong>{t('Darboğaz Tespiti')}:</strong> {t('Sermaye veya yetenek eksikliği olan noktaların belirlenmesi.')}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-fintech-amber">
              <Zap size={18} />
              <span className="text-xs font-black uppercase tracking-widest">{t('Aragorn Etkisi')}</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">
              {t('Aragorn tipolojisi (büyük pazar, yüksek hacim) girişimlerin ölçeklenmesi için Seri A/B yatırımlarının artırılması şarttır. Bu huni, ekosistemin "Aragorn" yaratma kapasitesini ölçer.')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-fintech-charcoal text-white rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-black transition-all">
          <Download size={18} />
          {t('Metodoloji Rehberi (PDF)')}
        </button>
        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
          <ExternalLink size={18} />
          {t('HTML Versiyonu')}
        </button>
      </div>
    </div>
  );
};

// --- Research Protocol Section ---
const ResearchProtocol = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-fintech-coral">
                <Users size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Örneklem tasarımı')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('Hangi evren, hangi katmanlar (sektör, bölge, aşama)')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-fintech-amber">
                <Calendar size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Veri toplama takvimi')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('Anket periyotları (aylık / çeyreklik), veri güncelleme sıklığı')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Etik kurul onayı')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('Belge numarası ve kurum')}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-purple-600">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Çıkar çatışması beyanı')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('Akademik bağımsızlık ve finansman kaynakları')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-green-600">
                <Lock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Veri gizliliği ve güvenliği')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('KVKK / GDPR uyumu, anonimleştirme adımları')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-teal-600">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-fintech-charcoal uppercase tracking-wider mb-1">{t('Sorumlu araştırmacılar')}</h4>
                <p className="text-xs text-gray-500 font-medium">{t('Bilimsel Danışma Kurulu üyeleri')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
        <Info size={20} className="text-blue-600 mt-1 flex-shrink-0" />
        <p className="text-xs text-blue-900 font-bold leading-relaxed">
          {t('Bu protokol, SEGRİ metodolojisinin bilimsel geçerliliğini ve etik standartlarını belgelemektedir. Detaylı teknik rapor için Bilimsel Kurul ile iletişime geçebilirsiniz.')}
        </p>
      </div>
    </div>
  );
};

// --- EEF Survey Form Section ---
const EEFSurvey = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    { text: 'Bölgenizdeki bürokrasi yükü girişimciliği ne düzeyde kısıtlıyor?', tip: 'Şirket kurma süresi, lisanslama ve vergi süreçleri.' },
    { text: 'Melek yatırımcı ve VC ağlarına erişim ne kadar kolay?', tip: 'Sermaye bolluğu ve yatırımcı iştahı.' },
    { text: 'Üniversite-sanayi işbirliği projeleri ne kadar etkin?', tip: 'Bilgi transferi ve Ar-Ge desteği.' },
    { text: 'Dijital altyapı (internet hızı, e-devlet) yeterli mi?', tip: 'Teknolojik adaptasyon kapasitesi.' },
    { text: 'Nitelikli yazılımcı ve mühendis bulma zorluğu nedir?', tip: 'Yetenek havuzu derinliği.' }
  ];

  const handleAnswer = (val: number) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: val }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const score = Object.values(answers).reduce((a, b) => a + b, 0) / (questions.length * 7) * 100;

  if (showResults) {
    return (
      <div className="text-center py-10 space-y-6">
        <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-teal-100">
          <Award size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-fintech-charcoal">{t('Tahmini EEF Skorunuz')}</h3>
          <div className="text-5xl font-black text-teal-600 mt-2">{score.toFixed(1)}</div>
        </div>
        <p className="text-gray-500 max-w-md mx-auto font-medium">
          {t('Girdiğiniz verilere göre bölgenizdeki ekosistem destekleyici faktörler bu seviyededir. Bu puan profilinizle ilişkilendirilmiştir.')}
        </p>
        <button 
          onClick={() => { setShowResults(false); setCurrentIndex(0); setAnswers({}); }}
          className="px-8 py-3 bg-fintech-charcoal text-white rounded-2xl font-black text-sm hover:bg-black transition-all"
        >
          {t('Yeniden Başlat')}
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('Soru')} {currentIndex + 1} / {questions.length}</span>
        <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div className="h-full bg-teal-600 transition-all duration-500" style={{ width: `${(currentIndex + 1) / questions.length * 100}%` }}></div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-fintech-charcoal leading-tight">{t(q.text)}</h3>
        <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl flex items-start gap-3">
          <Info size={18} className="text-teal-600 mt-0.5" />
          <p className="text-xs text-teal-900 font-bold leading-relaxed">{t(q.tip)}</p>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map(val => (
            <button
              key={val}
              onClick={() => handleAnswer(val)}
              className="h-14 rounded-xl border border-gray-200 hover:border-teal-600 hover:bg-teal-50 transition-all font-black text-lg text-gray-400 hover:text-teal-600 active:scale-90"
            >
              {val}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
          <span>{t('Hiç Katılmıyorum')}</span>
          <span>{t('Tamamen Katılıyorum')}</span>
        </div>
      </div>
    </div>
  );
};

// --- Normalization Scripts Section ---
const NormalizationScripts = () => {
  const { t } = useLanguage();
  return (
    <div className="text-center py-12 space-y-8">
      <div className="w-20 h-20 bg-gray-100 text-gray-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
        <Code size={40} />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-fintech-charcoal uppercase tracking-tight">{t('Normalizasyon Scriptleri')}</h3>
        <p className="text-gray-500 max-w-lg mx-auto font-medium leading-relaxed">
          {t('Metodolojimizde kullanılan tüm veri işleme, normalizasyon ve ağırlıklandırma kodları açık kaynak olarak GitHub üzerinde paylaşılmaktadır.')}
        </p>
      </div>
      <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-200 max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Code size={20} className="text-blue-600" />
          </div>
          <span className="text-sm font-bold text-gray-700">Python & R Scripts</span>
        </div>
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <FileText size={20} className="text-purple-600" />
          </div>
          <span className="text-sm font-bold text-gray-700">Sample Input/Output Files</span>
        </div>
        <a 
          href="https://github.com/segri-index/methodology/normalization/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-4 bg-fintech-charcoal text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95 mt-6"
        >
          <Github size={20} />
          GitHub Reposu
        </a>
      </div>
    </div>
  );
};

// --- LHS Survey Component (Extracted from SmeMetrics) ---
const LHSSurvey = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'intro' | 'survey' | 'results'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions = [
    { id: 'fa1', category: 'Finansal Özerklik', text: 'İşletme geliriniz kişisel yaşam maliyetinizi tamamen karşılıyor mu?', tip: 'Temel geçim kaynağı olma durumu.' },
    { id: 'fa2', category: 'Finansal Özerklik', text: 'Dış kredilere veya borçlara bağımlılığınız ne düzeyde? (Düşük = Yüksek Puan)', tip: 'Borç yükü ve bağımsızlık.', reverse: true },
    { id: 'fa3', category: 'Finansal Özerklik', text: 'Beklenmedik krizler için en az 6 aylık nakit rezerviniz var mı?', tip: 'Finansal güvenlik marjı.' },
    { id: 'fa4', category: 'Finansal Özerklik', text: 'Karar alırken dış yatırımcı veya banka onayı almanız gerekiyor mu? (Hayır = Yüksek Puan)', tip: 'Stratejik bağımsızlık.', reverse: true },
    
    { id: 'qol1', category: 'Yaşam Kalitesi', text: 'Haftalık çalışma saatiniz 40 saatin altında mı?', tip: 'İş-yaşam dengesi.' },
    { id: 'qol2', category: 'Yaşam Kalitesi', text: 'Yılda en az 20 gün kesintisiz tatil yapabiliyor musunuz?', tip: 'Zihinsel yenilenme.' },
    { id: 'qol3', category: 'Yaşam Kalitesi', text: 'İşiniz sosyal hayatınızı ve hobilerinizi engelliyor mu? (Hayır = Yüksek Puan)', tip: 'Sosyal uyum.', reverse: true },
    { id: 'qol4', category: 'Yaşam Kalitesi', text: 'İşinizden aldığınız genel tatmin düzeyi nedir?', tip: 'Psikolojik refah.' },

    { id: 'lc1', category: 'Yerel Katkı', text: 'Tedarikçilerinizin %70\'inden fazlası yerel işletmeler mi?', tip: 'Yerel çarpan etkisi.' },
    { id: 'lc2', category: 'Yerel Katkı', text: 'Çalışanlarınızın çoğu işletmenize yakın bölgelerde mi ikamet ediyor?', tip: 'Yerel istihdam.' },
    { id: 'lc3', category: 'Yerel Katkı', text: 'Yerel topluluk projelerine veya sponsorluklara destek veriyor musunuz?', tip: 'Sosyal sorumluluk.' },
    { id: 'lc4', category: 'Yerel Katkı', text: 'Diğer yerel esnaflarla aktif işbirliği yapıyor musunuz?', tip: 'Ekosistem dayanışması.' },

    { id: 'ei1', category: 'Çevresel Etki', text: 'İşletmenizde yenilenebilir enerji kaynakları kullanıyor musunuz?', tip: 'Yeşil enerji.' },
    { id: 'ei2', category: 'Çevresel Etki', text: 'Atık yönetimi ve geri dönüşüm süreçleriniz ne kadar etkin?', tip: 'Döngüsel ekonomi.' },
    { id: 'ei3', category: 'Çevresel Etki', text: 'Karbon ayak izinizi azaltmak için somut adımlar atıyor musunuz?', tip: 'İklim duyarlılığı.' },

    { id: 'og1', category: 'Organik Büyüme', text: 'Büyümeniz dış yatırım yerine kendi kârınızla mı gerçekleşiyor?', tip: 'Sürdürülebilir büyüme.' },
    { id: 'og2', category: 'Organik Büyüme', text: 'Müşteri sadakatiniz ve yeniden satın alma oranınız yüksek mi?', tip: 'Pazar güveni.' },
    { id: 'og3', category: 'Organik Büyüme', text: 'Gelir kaynaklarınız tek bir müşteriye bağımlı olmaktan uzak mı?', tip: 'Risk çeşitlendirmesi.' },
  ];

  const handleAnswer = (val: number) => {
    const q = questions[currentIndex];
    const score = q.reverse ? (8 - val) : val;
    setAnswers(prev => ({ ...prev, [q.id]: score }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const lhsScore = React.useMemo(() => {
    const vals = Object.values(answers);
    if (vals.length === 0) return 0;
    return (vals.reduce((a, b) => a + b, 0) / (questions.length * 7)) * 100;
  }, [answers]);

  const categoryScores = React.useMemo(() => {
    const cats = ['Finansal Özerklik', 'Yaşam Kalitesi', 'Yerel Katkı', 'Çevresel Etki', 'Organik Büyüme'];
    const results: Record<string, number> = {};
    cats.forEach(cat => {
      const catQs = questions.filter(q => q.category === cat);
      const sum = catQs.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      results[cat] = (sum / (catQs.length * 7)) * 100;
    });
    return results;
  }, [answers]);

  const getStatusColor = (score: number) => {
    if (score >= 70) return 'bg-gray-500';
    if (score >= 40) return 'bg-fintech-amber';
    return 'bg-fintech-coral';
  };

  if (step === 'intro') {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200 text-center max-w-4xl mx-auto hover-card">
        <div className="w-20 h-20 bg-fintech-gray text-fintech-charcoal rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Heart size={40} />
        </div>
        <h2 className="text-3xl font-black text-fintech-charcoal mb-4 tracking-tight">{t('LHS Sağlık Taraması')}</h2>
        <p className="text-gray-700 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
          {t('İşletmenizin yaşam tarzı ve sürdürülebilirlik kriterlerine ne kadar uyduğunu 18 soruluk anketimizle ölçün.')}
        </p>
        <button 
          onClick={() => setStep('survey')}
          className="px-10 py-4 bg-teal-800 text-white font-black rounded-2xl shadow-xl hover:bg-teal-900 transition-all active:scale-95 flex items-center gap-3 mx-auto"
        >
          {t('Anketi Başlat')}
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  if (step === 'survey') {
    const q = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-end">
          <span className="text-[10px] font-black text-fintech-charcoal uppercase tracking-widest">{t(q.category)}</span>
          <span className="text-xs font-bold text-gray-400">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 w-full bg-fintech-gray rounded-full overflow-hidden mb-8 border border-gray-200">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gray-500" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover-card">
            <h3 className="text-2xl font-black text-fintech-charcoal mb-4 leading-tight">{t(q.text)}</h3>
            <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl mb-10">
              <Info className="text-gray-500 mt-1 flex-shrink-0" size={18} />
              <p className="text-sm text-teal-900 font-medium italic">{t(q.tip)}</p>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(val => (
                <button
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className="h-14 flex flex-col items-center justify-center rounded-xl border border-gray-200 hover:border-gray-500 hover:bg-gray-50 transition-all active:scale-90 group"
                >
                  <span className="text-lg font-black text-fintech-charcoal group-hover:text-fintech-charcoal">{val}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              <span>{t('Hiç Katılmıyorum')}</span>
              <span>{t('Tamamen Katılıyorum')}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 flex flex-col md:flex-row items-center gap-10 hover-card">
        <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center relative shadow-inner">
          <span className="text-5xl font-black text-fintech-charcoal">{lhsScore.toFixed(0)}</span>
          <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${getStatusColor(lhsScore)}`}>
             <Award className="text-white" size={20} />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-black text-fintech-charcoal mb-2">{t('LHS Skorunuz')}</h2>
          <p className="text-gray-700 mb-6 text-lg">{t('İşletmenizin sürdürülebilirlik ve yaşam kalitesi karnesi hazır.')}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {Object.entries(categoryScores).map(([cat, score]) => (
              <div key={cat} className="px-4 py-2 bg-white rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm hover-card">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(score)}`} />
                <span className="text-xs font-bold text-gray-700">{t(cat)}: {score.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover-card">
        <h3 className="text-xl font-black text-fintech-charcoal mb-6 flex items-center gap-2">
          <Zap className="text-fintech-amber" size={24} />
          {t('İyileştirme Önerileri')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(categoryScores).filter(([_, s]) => s < 70).map(([cat, score]) => (
            <div key={cat} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
              <h4 className="font-black text-fintech-charcoal mb-2">{t(cat)}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {score < 40 
                  ? t('Bu alan kritik seviyede. Acil eylem planı oluşturulmalı.') 
                  : t('Gelişim potansiyeli yüksek. Küçük adımlarla büyük fark yaratılabilir.')}
              </p>
              <button className="mt-4 text-fintech-charcoal text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                {t('Detaylı Önerileri Gör')} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-black rounded-xl shadow-md hover:bg-white transition-all flex items-center gap-2 hover-card">
          <Download size={18} />
          {t('PDF Raporu İndir')}
        </button>
        <button 
          onClick={() => { setStep('intro'); setAnswers({}); setCurrentIndex(0); }}
          className="px-8 py-3 bg-teal-800 text-white font-black rounded-xl shadow-lg hover:bg-teal-900 transition-all flex items-center gap-2"
        >
          <RefreshCw size={18} />
          {t('Yeniden Test Et')}
        </button>
      </div>
    </div>
  );
};

const Assessments: React.FC = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'segri' | 'lhs' | 'srka' | 'guide' | 'protocol' | 'survey' | 'scripts'>('segri');

  const subTabs = [
    { id: 'segri', label: t('SEGRI Bireysel Analiz'), icon: Target, color: 'text-gray-700', bg: 'bg-red-50' },
    { id: 'lhs', label: t('LHS Sağlık Taraması'), icon: Heart, color: 'text-fintech-charcoal', bg: 'bg-fintech-gray' },
    { id: 'srka', label: t('SRKA Risk Analizi'), icon: ShieldAlert, color: 'text-gray-700', bg: 'bg-red-50' },
    { id: 'guide', label: t('Tam Metodoloji Rehberi'), icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'protocol', label: t('Araştırma Protokolü'), icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'survey', label: t('EEF Anket Formu'), icon: ClipboardCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'scripts', label: t('Normalizasyon Scriptleri'), icon: Code, color: 'text-gray-700', bg: 'bg-gray-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-xl border-x border-b border-gray-200 hover-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-feedback-light to-module-feedback-dark"></div>
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-fintech-charcoal tracking-tight">{t('Anketler & Değerlendirmeler')}</h1>
            <p className="text-gray-500 mt-1 font-medium">{t('Tüm anket ve değerlendirme araçlarına buradan ulaşabilirsiniz.')}</p>
          </div>
          <div className="flex flex-wrap bg-fintech-gray p-1.5 rounded-2xl border border-gray-200 shadow-inner gap-1">
            {subTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-[11px] font-black uppercase tracking-wider
                    ${isActive 
                      ? 'bg-white text-fintech-charcoal shadow-md ring-1 ring-gray-200' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                    }`}
                >
                  <Icon size={16} className={isActive ? tab.color : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 sm:p-8 rounded-3xl border border-gray-100"
            >
              {activeSubTab === 'segri' && <SEGRICalculator />}
              {activeSubTab === 'lhs' && <LHSSurvey />}
              {activeSubTab === 'srka' && <RiskAnalysis />}
              {activeSubTab === 'guide' && <MethodologyGuide />}
              {activeSubTab === 'protocol' && <ResearchProtocol />}
              {activeSubTab === 'survey' && <EEFSurvey />}
              {activeSubTab === 'scripts' && <NormalizationScripts />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Assessments;
