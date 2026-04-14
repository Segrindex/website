
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useLanguage } from '../LanguageContext';
import { 
  ChevronRight, ChevronLeft, CheckCircle2, Info, AlertCircle, 
  TrendingUp, Zap, Shield, Globe, Users, Lightbulb, Target,
  Award, ArrowRight, Download, Save, MapPin, Leaf
} from 'lucide-react';

import { 
  calculateIES, calculateEEF, calculateSEGRI, determineQuadrant, determineTypology, predictSuccessProbability,
  determineMaturityTag, calculateFSI, calculateCSB, calculateTCI, calculateVAS
} from '../utils';

// --- Types ---
interface Question {
  id: string;
  category: 'RTC' | 'ICT' | 'IAW' | 'PIM' | 'SCW';
  text: string;
  tip: string;
}

interface EEFData {
  country: string;
  city?: string;
  FA: number; // Financial Accessibility
  RFQ: number; // Regulatory Framework Quality
  MD: number; // Market Dynamics
  KI: number; // Knowledge Infrastructure
  EN: number; // Entrepreneurial Network
}

// --- Data ---
const iesQuestions: Question[] = [
  // Risk Taking (RTC)
  { id: 'rtc1', category: 'RTC', text: 'Yeni ve belirsiz projelere yatırım yapma eğilimimiz yüksektir.', tip: 'Belirsizlik altında karar verme kapasitesi.' },
  { id: 'rtc2', category: 'RTC', text: 'Başarısızlık ihtimali olan durumlarda bile cesur adımlar atarız.', tip: 'Hata yapma korkusunun yönetimi.' },
  { id: 'rtc3', category: 'RTC', text: 'Geleneksel yöntemler yerine riskli ama potansiyeli yüksek yolları tercih ederiz.', tip: 'Stratejik risk tercihi.' },
  { id: 'rtc4', category: 'RTC', text: 'Kayıp yaşama riskini, büyüme fırsatı olarak görürüz.', tip: 'Risk algısı ve toleransı.' },
  // Innovation (ICT)
  { id: 'ict1', category: 'ICT', text: 'Sektörümüzde daha önce denenmemiş teknolojik çözümler geliştiririz.', tip: 'Teknolojik öncülük.' },
  { id: 'ict2', category: 'ICT', text: 'Ar-Ge ve yeni ürün geliştirme süreçlerine düzenli kaynak ayırırız.', tip: 'Yenilikçilik yatırımı.' },
  { id: 'ict3', category: 'ICT', text: 'Mevcut iş modellerini sürekli sorgular ve iyileştiririz.', tip: 'Süreç inovasyonu.' },
  { id: 'ict4', category: 'ICT', text: 'Yaratıcı fikirlerin ödüllendirildiği bir kurum kültürüne sahibiz.', tip: 'İnovasyon kültürü.' },
  // Autonomy (IAW)
  { id: 'iaw1', category: 'IAW', text: 'Ekiplerimiz üst yönetimden bağımsız karar alma yetkisine sahiptir.', tip: 'Yetki devri ve özgürlük.' },
  { id: 'iaw2', category: 'IAW', text: 'Bireysel inisiyatifler desteklenir ve teşvik edilir.', tip: 'İnisiyatif alma.' },
  { id: 'iaw3', category: 'IAW', text: 'Yeni fikirlerin hayata geçmesi için bürokratik engeller minimumdur.', tip: 'Esnek yapı.' },
  { id: 'iaw4', category: 'IAW', text: 'Çalışanlar kendi projelerini yönetme konusunda özgürdür.', tip: 'Proje sahipliği.' },
  // Passion & Impact (PIM)
  { id: 'pim1', category: 'PIM', text: 'İşimizi sadece para kazanmak için değil, bir tutkuyla yapıyoruz.', tip: 'İçsel motivasyon ve adanmışlık.' },
  { id: 'pim2', category: 'PIM', text: 'Zorluklarla karşılaştığımızda motivasyonumuz kırılmaz, daha çok hırslanırız.', tip: 'Dirençlilik ve tutku.' },
  { id: 'pim3', category: 'PIM', text: 'Yaptığımız işin dünyada bir iz bırakmasını hedefliyoruz.', tip: 'Etki odaklı vizyon.' },
  { id: 'pim4', category: 'PIM', text: 'Uzun vadeli hedeflerimiz için kısa vadeli konforumuzdan vazgeçebiliriz.', tip: 'Gelecek inşası.' },
  // Social Contribution (SCW)
  { id: 'scw1', category: 'SCW', text: 'İşletmemiz yerel topluluğa ve çevreye değer katmayı önceliklendirir.', tip: 'Sosyal sorumluluk bilinci.' },
  { id: 'scw2', category: 'SCW', text: 'Kâr elde etmenin ötesinde, toplumsal bir sorunu çözmeyi amaçlıyoruz.', tip: 'Misyon odaklılık.' },
  { id: 'scw3', category: 'SCW', text: 'Tedarik zincirimizde ve operasyonlarımızda etik değerlere sıkı sıkıya bağlıyız.', tip: 'Etik ve sürdürülebilirlik.' },
  { id: 'scw4', category: 'SCW', text: 'Başarımızı sadece finansal tablolarla değil, yarattığımız sosyal etkiyle ölçeriz.', tip: 'Bütüncül başarı tanımı.' },
];

const eefMockData: EEFData[] = [
  { country: 'Türkiye', city: 'İstanbul', FA: 75, RFQ: 60, MD: 85, KI: 70, EN: 90 },
  { country: 'Türkiye', city: 'Ankara', FA: 65, RFQ: 65, MD: 70, KI: 85, EN: 75 },
  { country: 'Türkiye', city: 'İzmir', FA: 60, RFQ: 55, MD: 75, KI: 65, EN: 80 },
  { country: 'USA', city: 'San Francisco', FA: 95, RFQ: 85, MD: 90, KI: 95, EN: 98 },
  { country: 'Germany', city: 'Berlin', FA: 85, RFQ: 90, MD: 80, KI: 88, EN: 85 },
  { country: 'UK', city: 'London', FA: 90, RFQ: 88, MD: 85, KI: 85, EN: 92 },
  { country: 'Estonia', city: 'Tallinn', FA: 80, RFQ: 95, MD: 70, KI: 80, EN: 88 },
];

const SEGRICalculator: React.FC = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState<'intro' | 'ies' | 'eef' | 'results'>('intro');
  const [currentIesIndex, setCurrentIesIndex] = useState(0);
  const [iesAnswers, setIesAnswers] = useState<Record<string, number>>({});
  const [selectedEef, setSelectedEef] = useState<EEFData | null>(null);

  // --- Calculations ---
  const iesScores = useMemo(() => {
    const categories: ('RTC' | 'ICT' | 'IAW' | 'PIM' | 'SCW')[] = ['RTC', 'ICT', 'IAW', 'PIM', 'SCW'];
    const scores: Record<string, number> = {};
    
    categories.forEach(cat => {
      const catQuestions = iesQuestions.filter(q => q.category === cat);
      const sum = catQuestions.reduce((acc, q) => acc + (iesAnswers[q.id] || 0), 0);
      // Average score for the category (1-7)
      scores[cat] = sum / catQuestions.length;
    });
    
    return scores;
  }, [iesAnswers]);

  const avgIes = useMemo(() => {
    return calculateIES(
      iesScores.RTC || 1, 
      iesScores.ICT || 1, 
      iesScores.IAW || 1, 
      iesScores.PIM || 1, 
      iesScores.SCW || 1
    );
  }, [iesScores]);

  const avgEef = useMemo(() => {
    if (!selectedEef) return 0;
    return calculateEEF(selectedEef.FA, selectedEef.RFQ, selectedEef.MD, selectedEef.KI, selectedEef.EN);
  }, [selectedEef]);

  const segriScore = calculateSEGRI(avgIes, avgEef);

  const matrixPosition = determineQuadrant(avgIes, avgEef);
  const typology = determineTypology(
    iesScores.RTC || 1, 
    iesScores.ICT || 1, 
    iesScores.IAW || 1, 
    iesScores.PIM || 1, 
    iesScores.SCW || 1
  );
  const successProb = predictSuccessProbability(avgIes, avgEef);
  const maturityTag = determineMaturityTag(avgEef);

  const fsi = calculateFSI(selectedEef?.FA || 50, (selectedEef?.FA || 50) * 0.9, (selectedEef?.EN || 50) * 0.8);
  const csb = calculateCSB((selectedEef?.MD || 50) * 0.8, selectedEef?.KI || 50, (selectedEef?.MD || 50) * 0.9);
  const tci = calculateTCI(selectedEef?.KI || 50, (selectedEef?.KI || 50) * 0.8, (iesScores.ICT || 1) * 14.28);
  const vas = calculateVAS(selectedEef?.EN || 50, (selectedEef?.EN || 50) * 0.9, (selectedEef?.FA || 50) * 0.8);

  const actionPlan = useMemo(() => {
    const sortedComps = [
      { name: 'Risk Alma', score: (iesScores.RTC || 1) * 14.28, id: 'RTC' },
      { name: 'İnovasyon', score: (iesScores.ICT || 1) * 14.28, id: 'ICT' },
      { name: 'Bağımsızlık', score: (iesScores.IAW || 1) * 14.28, id: 'IAW' },
      { name: 'Tutku', score: (iesScores.PIM || 1) * 14.28, id: 'PIM' },
      { name: 'Sosyal Katkı', score: (iesScores.SCW || 1) * 14.28, id: 'SCW' },
      { name: 'Finansal Erişim', score: selectedEef?.FA || 0, id: 'FA' },
      { name: 'Mevzuat Kalitesi', score: selectedEef?.RFQ || 0, id: 'RFQ' },
      { name: 'Pazar Dinamikleri', score: selectedEef?.MD || 0, id: 'MD' },
      { name: 'Bilgi Altyapısı', score: selectedEef?.KI || 0, id: 'KI' },
      { name: 'Girişimcilik Ağı', score: selectedEef?.EN || 0, id: 'EN' },
    ].sort((a, b) => a.score - b.score);

    const primary = sortedComps[0];
    const secondary = sortedComps[1];

    return {
      day30: `Odak: ${primary.name}. Bu alandaki darboğazları belirlemek için 3 derinlemesine mülakat yapın ve mevcut süreçleri haritalandırın.`,
      day60: `Odak: ${secondary.name}. Belirlenen darboğazlar için bir pilot proje (MVP) başlatın ve ilk geri bildirimleri toplayın.`,
      day90: `Odak: Ölçeklendirme. Pilot projeden elde edilen verilerle stratejinizi revize edin ve tüm organizasyona/ekosisteme yayın.`
    };
  }, [iesScores, selectedEef]);

  const recommendations = useMemo(() => {
    const allComponents = [
      { name: 'Risk Alma', score: (iesScores.RTC || 1) * 14.28, id: 'RTC' },
      { name: 'İnovasyon', score: (iesScores.ICT || 1) * 14.28, id: 'ICT' },
      { name: 'Bağımsızlık', score: (iesScores.IAW || 1) * 14.28, id: 'IAW' },
      { name: 'Tutku', score: (iesScores.PIM || 1) * 14.28, id: 'PIM' },
      { name: 'Sosyal Katkı', score: (iesScores.SCW || 1) * 14.28, id: 'SCW' },
      { name: 'Finansal Erişim', score: selectedEef?.FA || 0, id: 'FA' },
      { name: 'Mevzuat Kalitesi', score: selectedEef?.RFQ || 0, id: 'RFQ' },
      { name: 'Pazar Dinamikleri', score: selectedEef?.MD || 0, id: 'MD' },
      { name: 'Bilgi Altyapısı', score: selectedEef?.KI || 0, id: 'KI' },
      { name: 'Girişimcilik Ağı', score: selectedEef?.EN || 0, id: 'EN' },
    ];

    return allComponents
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
      .map(comp => {
        switch(comp.id) {
          case 'RTC': return { title: comp.name, text: 'Hata yapma korkusunu azaltmak için küçük ölçekli deneyler (MVP) kurgulayın.' };
          case 'ICT': return { title: comp.name, text: 'Dış kaynaklı inovasyon (open innovation) kanallarını kullanarak Ar-Ge kapasitenizi artırın.' };
          case 'IAW': return { title: comp.name, text: 'Karar alma süreçlerini merkezsizleştirin ve ekiplere bütçe inisiyatifi verin.' };
          case 'PIM': return { title: comp.name, text: 'İşinize anlam katan değerleri belirleyin ve ekibinizle paylaşarak motivasyonu artırın.' };
          case 'SCW': return { title: comp.name, text: 'Toplumsal fayda odaklı projeler geliştirerek marka değerinizi ve etki alanınızı genişletin.' };
          case 'FA': return { title: comp.name, text: 'Melek yatırım ağları ve devlet destekli hibe programlarını araştırın.' };
          case 'RFQ': return { title: comp.name, text: 'Hukuki danışmanlık alarak mevzuattaki teşviklerden maksimum düzeyde yararlanın.' };
          default: return { title: comp.name, text: 'Bu alandaki yetkinliklerinizi geliştirmek için mentorluk programlarına katılın.' };
        }
      });
  }, [iesScores, selectedEef]);

  // --- Handlers ---
  const handleIesAnswer = (val: number) => {
    setIesAnswers(prev => ({ ...prev, [iesQuestions[currentIesIndex].id]: val }));
    if (currentIesIndex < iesQuestions.length - 1) {
      setCurrentIesIndex(prev => prev + 1);
    } else {
      setStep('eef');
    }
  };

  // --- Render Helpers ---
  const renderIntro = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
      <div className="w-20 h-20 bg-red-50 text-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
        <Target size={40} />
      </div>
      <h1 className="text-4xl font-black text-fintech-charcoal mb-4 tracking-tight">{t('SEGRI Bireysel Analiz')}</h1>
      <p className="text-gray-700 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
        {t('Kendi girişimcilik yetkinliklerinizi (IES) ölçün ve bulunduğunuz bölgenin ekosistem faktörleri (EEF) ile birleştirerek SEGRI skorunuzu öğrenin.')}
      </p>
      <button 
        onClick={() => setStep('ies')}
        className="px-10 py-4 bg-gray-700 text-white font-black rounded-2xl shadow-xl hover:bg-fintech-charcoal transition-all active:scale-95 flex items-center gap-3 mx-auto"
      >
        {t('Analize Başla')}
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );

  const renderIesSurvey = () => {
    const q = iesQuestions[currentIesIndex];
    const progress = ((currentIesIndex + 1) / iesQuestions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{t('Bireysel Yetkinlik (IES)')}</span>
            <span className="text-xs font-black text-gray-400">{currentIesIndex + 1} / {iesQuestions.length}</span>
          </div>
          <div className="h-2 w-full bg-fintech-gray rounded-full overflow-hidden border border-gray-200">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-fintech-coral" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 hover-card">
            <div className="mb-6">
              <span className="px-3 py-1 bg-fintech-gray text-gray-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-200">
                {q.category}
              </span>
            </div>
            <h2 className="text-2xl font-black text-fintech-charcoal mb-4 leading-tight">{t(q.text)}</h2>
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-50 rounded-2xl mb-10">
              <Info className="text-fintech-coral mt-1 flex-shrink-0" size={18} />
              <p className="text-sm text-fintech-charcoal font-medium italic">{t(q.tip)}</p>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(val => (
                <button
                  key={val}
                  onClick={() => handleIesAnswer(val)}
                  className="h-14 flex flex-col items-center justify-center rounded-xl border border-gray-200 hover:border-fintech-coral hover:bg-red-50 transition-all active:scale-90 group"
                >
                  <span className="text-lg font-black text-fintech-charcoal group-hover:text-gray-700">{val}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase">{val === 1 ? 'Hiç' : val === 7 ? 'Tam' : ''}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span>{t('Kesinlikle Katılmıyorum')}</span>
              <span>{t('Kesinlikle Katılıyorum')}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const renderEefSelection = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-fintech-charcoal mb-2">{t('Ekosistem Seçimi (EEF)')}</h2>
        <p className="text-gray-700">{t('Bulunduğunuz veya faaliyet gösterdiğiniz bölgeyi seçin.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eefMockData.map(eef => (
          <button
            key={`${eef.country}-${eef.city}`}
            onClick={() => {
              setSelectedEef(eef);
              setStep('results');
            }}
            className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 hover:border-fintech-coral hover:shadow-lg transition-all text-left group hover-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-fintech-gray rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-gray-700 transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-black text-fintech-charcoal">{eef.city}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{eef.country}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-gray-700 transition-colors" />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderResults = () => {
    const radarData = [
      { subject: 'Risk Alma', A: (iesScores.RTC || 1) * 14.28, fullMark: 100 },
      { subject: 'İnovasyon', A: (iesScores.ICT || 1) * 14.28, fullMark: 100 },
      { subject: 'Bağımsızlık', A: (iesScores.IAW || 1) * 14.28, fullMark: 100 },
      { subject: 'Tutku', A: (iesScores.PIM || 1) * 14.28, fullMark: 100 },
      { subject: 'Sosyal Katkı', A: (iesScores.SCW || 1) * 14.28, fullMark: 100 },
    ];

    const eefRadarData = [
      { subject: 'Finans', A: selectedEef?.FA || 0, fullMark: 100 },
      { subject: 'Mevzuat', A: selectedEef?.RFQ || 0, fullMark: 100 },
      { subject: 'Pazar', A: selectedEef?.MD || 0, fullMark: 100 },
      { subject: 'Bilgi', A: selectedEef?.KI || 0, fullMark: 100 },
      { subject: 'Ağ', A: selectedEef?.EN || 0, fullMark: 100 },
    ];

    return (
      <div className="space-y-8">
        {/* Header Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-xl border border-gray-200 flex flex-col md:flex-row items-center gap-10 hover-card">
            <div className="relative w-48 h-48 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-gray-100" />
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * segriScore) / 100} className="text-gray-700 transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-fintech-charcoal relative">
                  {segriScore.toFixed(0)}
                  <div key={segriScore} className="absolute -top-6 -right-8 animate-leaf-fall text-fintech-amber opacity-0 pointer-events-none">
                      <Leaf size={32} fill="currentColor" />
                  </div>
                </span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">SEGRI SKORU</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-fintech-gray text-fintech-charcoal rounded-full text-xs font-black uppercase tracking-widest mb-4">
                {matrixPosition}
              </div>
              <h2 className="text-3xl font-black text-fintech-charcoal mb-4">{t('Analiz Sonuçlarınız')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('Bireysel girişimcilik yetkinlikleriniz ile bölgenizdeki ekosistem faktörleri dengeli bir uyum içerisinde.')}
              </p>
              <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">IES PUANI</p>
                  <p className="text-xl font-black text-gray-700">{avgIes.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">EEF PUANI</p>
                  <p className="text-xl font-black text-fintech-charcoal">{avgEef.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">BAŞARI OLASILIĞI</p>
                  <p className="text-xl font-black text-fintech-teal">%{successProb.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{t('Ekosistem Olgunluk Etiketi')}</p>
                  <p className="text-xl font-black text-fintech-charcoal">{t(maturityTag)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">FSI</p>
                  <p className="text-lg font-black text-blue-600">{fsi.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">CSB</p>
                  <p className="text-lg font-black text-purple-600">{csb.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">TCI</p>
                  <p className="text-lg font-black text-orange-600">{tci.toFixed(1)}</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">VAS</p>
                  <p className="text-lg font-black text-emerald-600">{vas.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-fintech-primary to-fintech-charcoal rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Award size={24} />
                {t('Matris Konumu')}
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {['Iron Man', 'Captain America', 'Black Panther', 'Spider-Man'].map(pos => (
                  <div key={pos} className={`p-3 rounded-xl border text-center text-[10px] font-black uppercase tracking-tighter transition-all ${matrixPosition === pos ? 'bg-white text-fintech-charcoal border-white shadow-lg scale-105' : 'bg-white/10 border-white/20 text-white/60'}`}>
                    {pos}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('Girişimci Tipolojisi')}</p>
                <p className="text-xl font-black text-white">{t(typology)}</p>
              </div>
            </div>
            <p className="text-xs text-red-50 font-medium leading-relaxed italic mt-4">
              {matrixPosition === 'Iron Man' ? t('Hem bireysel yetkinlik hem de ekosistem desteği zirvede. Küresel ölçekte büyüme potansiyeli çok yüksek.') : t('Gelişim alanlarınıza odaklanarak bir üst kademeye geçebilirsiniz.')}
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover-card">
            <h3 className="text-lg font-black text-fintech-charcoal mb-6 uppercase tracking-tight">{t('Bireysel Yetkinlik (IES) Profili')}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="IES" dataKey="A" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover-card">
            <h3 className="text-lg font-black text-fintech-charcoal mb-6 uppercase tracking-tight">{t('Ekosistem (EEF) Profili')}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={eefRadarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="EEF" dataKey="A" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 30-60-90 Day Plan */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover-card">
          <h3 className="text-lg font-black text-fintech-charcoal mb-6 uppercase tracking-tight flex items-center gap-2">
            <TrendingUp className="text-fintech-primary" size={20} />
            {t('30-60-90 Günlük Eylem Planı')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-red-200 font-black text-4xl opacity-20">30</div>
              <h4 className="font-black text-fintech-charcoal mb-2 uppercase text-xs tracking-widest">{t('İlk 30 Gün')}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{actionPlan.day30}</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-amber-200 font-black text-4xl opacity-20">60</div>
              <h4 className="font-black text-fintech-charcoal mb-2 uppercase text-xs tracking-widest">{t('60 Gün')}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{actionPlan.day60}</p>
            </div>
            <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-teal-200 font-black text-4xl opacity-20">90</div>
              <h4 className="font-black text-fintech-charcoal mb-2 uppercase text-xs tracking-widest">{t('90 Gün')}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{actionPlan.day90}</p>
            </div>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 hover-card">
          <h3 className="text-lg font-black text-fintech-charcoal mb-6 uppercase tracking-tight flex items-center gap-2">
            <Zap className="text-fintech-amber" size={20} />
            {t('Kişiselleştirilmiş Eylem Önerileri')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200 flex gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-700 font-black flex-shrink-0 hover-card">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-black text-fintech-charcoal mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-black rounded-xl shadow-md hover:bg-white transition-all flex items-center gap-2 hover-card">
            <Download size={18} />
            {t('Raporu İndir (PDF)')}
          </button>
          <button className="px-8 py-3 bg-gray-700 text-white font-black rounded-xl shadow-lg hover:bg-fintech-charcoal transition-all flex items-center gap-2">
            <Save size={18} />
            {t('Sonuçları Kaydet')}
          </button>
          <button 
            onClick={() => {
              setStep('intro');
              setIesAnswers({});
              setCurrentIesIndex(0);
              setSelectedEef(null);
            }}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-black rounded-xl hover:bg-gray-300 transition-all"
          >
            {t('Yeni Analiz')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 'intro' && renderIntro()}
        {step === 'ies' && renderIesSurvey()}
        {step === 'eef' && renderEefSelection()}
        {step === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default SEGRICalculator;
