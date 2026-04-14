import React from 'react';
import { 
  CheckCircle2, 
  Brain, 
  Building2, 
  Calculator, 
  Info, 
  Target, 
  Layers,
  ChevronRight,
  Lightbulb,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Zap,
  Clock,
  Coins,
  Scale,
  Heart,
  MessageSquare,
  FileText,
  Search,
  Activity,
  ArrowRight
} from 'lucide-react';

import { useLanguage } from '../LanguageContext';

const HowToCalculate: React.FC = () => {
  const { t } = useLanguage();
  const navigateToTab = (tabId: string) => {
    const event = new CustomEvent('segri-change-tab', { detail: tabId });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="bg-fintech-charcoal text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border-x border-b border-fintech-charcoal/30">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
        <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
            <Calculator size={400} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-fintech-coral rounded-xl">
                    <Lightbulb size={28} className="text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-fintech-amber">{t('Tam Metodoloji Rehberi')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                {t('Kendi SEGRİ Puanınızı')} <br/> {t('Nasıl Hesaplarsınız?')}
            </h1>
            <p className="text-gray-500 text-xl max-w-3xl leading-relaxed font-medium">
                {t('SEGRI (Selçuk Ergin Girişimcilik Ruhu İndeksi), bireysel girişimcilik ruhunuzu (IES) ve ekosistem destekleyici faktörlerinizi (EEF) ölçerek toplam bir girişimcilik puanı üretir.')}
            </p>
        </div>
      </div>

      {/* Tanım ve Araçlar */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-xl relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-black text-fintech-charcoal mb-4 tracking-tight">{t('İndeks Hakkında')}</h2>
                <p className="text-gray-700 leading-relaxed font-medium">
                    {t('Bu indeks, bireylerin ve organizasyonların (şirketler, STK\'lar, üniversiteler, belediyeler veya bölgeler) girişimcilik potansiyelini değerlendirmek için tasarlanmıştır. Hesaplama süreci, veri toplama, normalizasyon, ağırlıklı formüller ve yorumlama aşamalarını içerir. Bu rehber, küçük bir startup\'tan büyük bir kuruma kadar her ölçekte uygulanabilir.')}
                </p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-200">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ClipboardList size={16} /> {t('Gerekli Araçlar')}
                </h4>
                <ul className="space-y-2 text-sm text-fintech-charcoal font-bold">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-fintech-coral"/> {t('Anket Yazılımı')}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-fintech-coral"/> {t('Excel veya SPSS / R')}</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-fintech-coral"/> {t('Veri Kaynakları (Raporlar)')}</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Hazırlık Aşaması */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-fintech-charcoal text-white flex items-center justify-center font-black text-xl shadow-lg">0</div>
            <h2 className="text-3xl font-black text-fintech-charcoal tracking-tight">{t('Hazırlık Aşaması')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-[2rem] border border-gray-200 shadow-md">
                <h4 className="font-black text-gray-700 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Target size={18} /> {t('Amaç ve Kapsam')}
                </h4>
                <div className="space-y-4 text-sm text-gray-700 font-medium">
                    <p><b>{t('Amaç Belirleme')}:</b> {t('SEGRI\'yi neden hesaplıyorsunuz? (Örn. inovasyon kapasitesini artırmak).')}</p>
                    <ul className="space-y-2 pl-4 border-l-2 border-red-50">
                        <li><b>{t('Bireysel')}:</b> {t('10-50 kişi')}</li>
                        <li><b>{t('Kurumsal/STK')}:</b> {t('100-500 kişi')}</li>
                        <li><b>{t('Bölgesel')}:</b> {t('1.500+ kişi (Temsili nüfus)')}</li>
                    </ul>
                </div>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-gray-200 shadow-md">
                <h4 className="font-black text-gray-700 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Clock size={18} /> {t('Zaman ve Kaynaklar')}
                </h4>
                <div className="space-y-4 text-sm text-gray-700 font-medium">
                    <p><b>{t('Zaman')}:</b> {t('Küçük ölçek için 1-2 hafta, büyük ölçek için 1-2 ay.')}</p>
                    <p><b>{t('Bütçe')}:</b> {t('Anket araçları ücretsiz olabilir, analiz için uzman desteği alınabilir.')}</p>
                    <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-bold">
                        <ShieldCheck size={14} className="inline mr-2"/> {t('Katılımcılardan rıza alın (GDPR/KVKK uyumu) ve anonimlik sağlayın.')}
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Step 1: IES */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 border-b-2 border-gray-200 pb-6">
            <div className="w-16 h-16 rounded-3xl bg-gray-500 text-white flex items-center justify-center font-black text-3xl shadow-xl transform -rotate-3">1</div>
            <div>
                <h2 className="text-4xl font-black text-fintech-charcoal tracking-tighter uppercase">{t('Adım 1: IES Değerlendirmesi')}</h2>
                <p className="text-lg text-fintech-charcoal font-black tracking-widest uppercase">{t('Bireysel Girişimcilik Ruhu | IES = (0.22×RTC) + (0.24×ICT) + (0.18×IAW) + (0.18×PIM) + (0.18×SCW)')}</p>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border-x border-b border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
            <h3 className="text-2xl font-black text-fintech-charcoal mb-8 flex items-center gap-4">
                <MessageSquare size={28} className="text-fintech-charcoal" /> {t('1.1 Anket Tasarımı ve Uygulaması')}
            </h3>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
                <p className="text-teal-900 font-bold text-sm leading-relaxed">
                    {t('Her bileşen için 5-7 soru, 7 puanlık Likert ölçeğinde (1=Kesinlikle Katılmıyorum, 7=Kesinlikle Katılıyorum) uygulanır. Toplam anket 25-35 soru arası olup 10-15 dakika sürer.')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* RTC */}
                <div className="p-8 rounded-3xl bg-white border-x border-b border-gray-200 hover:border-module-validity-light transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                    <h4 className="font-black text-fintech-charcoal uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={16} className="text-fintech-coral" /> {t('RTC (Risk Alma Cesareti)')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-3 font-medium">
                        <li>• {t('Başarısızlık riski beni yeni bir projeye başlamaktan alıkoymaz.')}</li>
                        <li>• {t('Belirsiz durumlarda hızlı ve etkili karar alabilirim.')}</li>
                        <li>• {t('Geçmiş başarısızlıkları bir öğrenme fırsatı olarak görürüm.')}</li>
                        <li>• {t('Zorlu piyasa koşullarında bile girişimci ruhumu korurum.')}</li>
                    </ul>
                </div>

                {/* ICT */}
                <div className="p-8 rounded-3xl bg-white border-x border-b border-gray-200 hover:border-module-validity-light transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                    <h4 className="font-black text-fintech-charcoal uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Brain size={16} className="text-gray-500" /> {t('ICT (Yenilikçilik ve Yaratıcılık)')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-3 font-medium">
                        <li>• {t('Sık sık özgün ve yenilikçi fikirler üretirim.')}</li>
                        <li>• {t('Mevcut süreçleri daha iyi hale getirmek için yaratıcı yollar ararım.')}</li>
                        <li>• {t('Yeni teknolojileri veya trendleri hızlıca uyarlayabilirim.')}</li>
                        <li>• {t('Problem çözmede alışılmadık yaklaşımlar denemekten hoşlanırım.')}</li>
                    </ul>
                </div>

                {/* IAW */}
                <div className="p-8 rounded-3xl bg-white border-x border-b border-gray-200 hover:border-module-validity-light transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                    <h4 className="font-black text-fintech-charcoal uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Target size={16} className="text-fintech-coral" /> {t('IAW (Bağımsızlık ve Özerklik)')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-3 font-medium">
                        <li>• {t('Kendi işimi kurmak bana büyük bir özgürlük hissi verir.')}</li>
                        <li>• {t('Başkalarının yönlendirmesine ihtiyaç duymadan karar almayı tercih ederim.')}</li>
                        <li>• {t('Kendi girişimimin patronu olmayı hayal ederim.')}</li>
                        <li>• {t('Grup çalışmalarında bile bireysel inisiyatif almayı severim.')}</li>
                    </ul>
                </div>

                {/* PIM & SCW */}
                <div className="p-8 rounded-3xl bg-white border-x border-b border-gray-200 hover:border-module-validity-light transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                    <h4 className="font-black text-fintech-charcoal uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Heart size={16} className="text-gray-700" /> {t('PIM & SCW (Tutku ve Sosyal Fayda)')}
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-3 font-medium">
                        <li>• {t('Yaptığım işte derin bir tutku ve heyecan hissederim.')}</li>
                        <li>• {t('İşimin topluma ve çevreye fayda sağlaması önceliğimdir.')}</li>
                        <li>• {t('Sürdürülebilir ve etik iş modellerini tercih ederim.')}</li>
                        <li>• {t('İşimin kârından ziyade sosyal etkisiyle gurur duyarım.')}</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 p-8 bg-fintech-charcoal text-white rounded-[2rem] border border-teal-900/50">
                <h4 className="text-xs font-black text-fintech-teal uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calculator size={16} /> {t('1.2 Veri İşleme ve Hesaplama')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t('Normalizasyon Formülü')}</p>
                        <div className="text-2xl font-black bg-white/5 p-4 rounded-xl border border-white/10 font-mono">
                            {t('Skor')} = ({t('Ortalama')} - 1) × (100 / 6)
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                            {t('Örnek: RTC ortalama 5.0 ise;')} <br/>
                            (5.0 - 1) × 16.67 ≈ 66.68 {t('puan.')}
                        </p>
                    </div>
                    <div className="bg-teal-950 p-6 rounded-2xl border border-teal-900 text-xs font-medium leading-loose">
                        <b>{t('Uygulama İpuçları')}:</b> <br/>
                        • {t('Dijital araçlar kullanın (Google Forms/SurveyMonkey).')} <br/>
                        • {t('Katılımcı seçimi: Rastgele örnekleme yapın.')} <br/>
                        • {t('Kültürel Uyarlama: Bölgesel normlara göre soruları esnetin.')}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Step 2: EEF */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 border-b-2 border-gray-200 pb-6">
            <div className="w-16 h-16 rounded-3xl bg-fintech-coral text-white flex items-center justify-center font-black text-3xl shadow-xl transform rotate-3">2</div>
            <div>
                <h2 className="text-4xl font-black text-fintech-charcoal tracking-tighter uppercase">{t('Adım 2: EEF Değerlendirmesi')}</h2>
                <p className="text-lg text-gray-700 font-black tracking-widest uppercase">{t('Ekosistem Destekleyici Faktörler | EEF = (0.20 × ∑FA, RFQ, MD, KI, EN)')}</p>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border-x border-b border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
            <h3 className="text-2xl font-black text-fintech-charcoal mb-8 flex items-center gap-4">
                <Search size={28} className="text-gray-700" /> {t('2.1 Veri Toplama ve Ölçüm')}
            </h3>
            <p className="text-gray-700 mb-8 font-medium leading-relaxed">
                {t('Bileşenler, ikincil veriler (Crunchbase, Dünya Bankası raporları vb.) ve uzman görüşleriyle (Delphi yöntemi) ölçülür. 0-100 ölçeğinde puan verilir.')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: t('FA (Finansmana Erişim)'), desc: t('VC yatırımları, kredi erişimi ve melek yatırımcı derinliği.'), data: 'Crunchbase, Dünya Bankası' },
                    { title: t('RFQ (Regülasyon Kalitesi)'), desc: t('İş kurma süresi ve yasal kolaylıklar.'), data: 'World Bank B-READY' },
                    { title: t('MD (Pazar Dinamikleri)'), desc: t('Pazar büyüklüğü ve rekabet ortamı.'), data: 'WEF Rekabet Endeksi' },
                    { title: t('KI (Bilgi Altyapısı)'), desc: t('Patent sayıları ve STEM mezuniyet oranları.'), data: 'WIPO, UNESCO' },
                    { title: t('EN (Girişimcilik Ağları)'), desc: t('Kuluçka merkezi sayısı ve mentorluk etkinlikleri.'), data: 'StartupBlink' }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-red-300 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-fintech-charcoal text-sm uppercase tracking-tight">{item.title}</h4>
                            <span className="text-[10px] font-black text-fintech-coral bg-red-50 px-2 py-0.5 rounded">{t('Ağırlık: %20')}</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed mb-4">{item.desc}</p>
                        <div className="text-[10px] font-black text-gray-500 flex items-center gap-2">
                            <FileText size={12} /> {t('Kaynak')}: {item.data}
                        </div>
                    </div>
                ))}
                <div className="p-6 bg-fintech-charcoal text-white rounded-2xl border border-gray-800 flex flex-col justify-center">
                    <h4 className="font-black text-red-300 text-xs uppercase tracking-widest mb-2">{t('EEF Hesaplama Örneği')}</h4>
                    <p className="text-xs leading-relaxed font-mono">
                        FA: 60, RFQ: 65, MD: 55, KI: 70, EN: 50 <br/>
                        EEF = (0.20×60) + (0.20×65) + ... = 60.0
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Steps 3-4-5 */}
      <section className="space-y-12">
        <div className="bg-fintech-charcoal p-12 rounded-[3.5rem] shadow-2xl border border-fintech-charcoal/30 text-white text-center">
            <p className="text-xs font-black text-fintech-amber uppercase tracking-[0.5em] mb-4">{t('Adım 3: Nihai Skor')}</p>
            <h3 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter">
                SEGRİ = (0.60 × IES) + (0.40 × EEF)
            </h3>
            <div className="max-w-xl mx-auto p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-sm font-bold text-gray-500 leading-relaxed">
                    {t('Örnek Sentez')}: <br/>
                    IES: 69.25, EEF: 60.00 <br/>
                    <b>{t('SEGRİ Skoru')}: 65.55</b>
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border-x border-b border-gray-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                <h3 className="text-2xl font-black text-fintech-charcoal mb-6 flex items-center gap-3 tracking-tight">
                    <Activity size={24} className="text-gray-700" /> {t('Adım 4: Yorumlama')}
                </h3>
                <ul className="space-y-4 text-sm text-gray-700 font-medium">
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-gray-700 shrink-0 mt-0.5" />
                        <b>{t('Matris Konumlandırma')}:</b> {t('2x2 matris üzerinde IES ve EEF kesişimine bakın (Iron Man, Gandalf vb.).')}
                    </li>
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-gray-700 shrink-0 mt-0.5" />
                        <b>{t('Bileşen Analizi')}:</b> {t('Radar grafiğiyle güçlü ve zayıf alanları görselleştirin.')}
                    </li>
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-gray-700 shrink-0 mt-0.5" />
                        <b>{t('Kıyaslama')}:</b> {t('Pilot veriler veya global liderlerle (Örn. ABD=80.75) karşılaştırın.')}
                    </li>
                </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border-x border-b border-gray-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-module-validity-light to-module-validity-dark"></div>
                <h3 className="text-2xl font-black text-fintech-charcoal mb-6 flex items-center gap-3 tracking-tight">
                    <Scale size={24} className="text-fintech-coral" /> {t('Adım 5: Eylem Planı')}
                </h3>
                <p className="text-sm text-gray-700 mb-6 font-medium">{t('Zayıf alanlara yönelik somut adımlar geliştirin:')}</p>
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                        <p className="text-xs font-black text-red-900 uppercase">{t('Düşük RTC Çözümü')}</p>
                        <p className="text-xs text-gray-700 font-bold mt-1">{t('Eğitimler ve mentorluk seansları düzenleyin.')}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-50">
                        <p className="text-xs font-black text-fintech-charcoal uppercase">{t('Düşük EN Çözümü')}</p>
                        <p className="text-xs text-gray-700 font-bold mt-1">{t('Hızlandırıcı programları ve ağ etkinlikleri başlatın.')}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Final Conclusion */}
        <div className="text-center py-12">
            <p className="text-lg font-black text-fintech-charcoal tracking-tight leading-relaxed max-w-3xl mx-auto italic">
                "{t('Bu rehber, SEGRI’yi her ölçekte uygulamak için kapsamlıdır. Uygulama için gerekli araçlar ve örnekler panellerimizde hazırdır.')}"
            </p>
            <button 
                onClick={() => navigateToTab('calculator')}
                className="mt-8 px-12 py-5 bg-gray-700 text-white rounded-[2rem] font-black shadow-2xl hover:bg-fintech-charcoal transition-all flex items-center gap-4 mx-auto active:scale-95 group"
            >
                <Calculator size={24} className="group-hover:rotate-12 transition-transform" />
                {t('Hesaplama Aracına Git')}
            </button>
        </div>
      </section>
    </div>
  );
};

export default HowToCalculate;