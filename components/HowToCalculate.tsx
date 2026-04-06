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

const HowToCalculate: React.FC = () => {
  const navigateToTab = (tabId: string) => {
    const event = new CustomEvent('segri-change-tab', { detail: tabId });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="bg-slate-950 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-blue-900/30">
        <div className="absolute -right-20 -top-20 opacity-10 rotate-12">
            <Calculator size={400} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600 rounded-xl">
                    <Lightbulb size={28} className="text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Tam Metodoloji Rehberi</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                Kendi SEGRİ Puanınızı <br/> Nasıl Hesaplarsınız?
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                SEGRI (Selçuk Ergin Girişimcilik Ruhu İndeksi), bireysel girişimcilik ruhunuzu (IES) ve ekosistem destekleyici faktörlerinizi (EEF) ölçerek toplam bir girişimcilik puanı üretir.
            </p>
        </div>
      </div>

      {/* Tanım ve Araçlar */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-300 shadow-xl relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">İndeks Hakkında</h2>
                <p className="text-slate-700 leading-relaxed font-medium">
                    Bu indeks, bireylerin ve organizasyonların (şirketler, STK'lar, üniversiteler, belediyeler veya bölgeler) girişimcilik potansiyelini değerlendirmek için tasarlanmıştır. Hesaplama süreci, veri toplama, normalizasyon, ağırlıklı formüller ve yorumlama aşamalarını içerir. Bu rehber, küçük bir startup'tan büyük bir kuruma kadar her ölçekte uygulanabilir.
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ClipboardList size={16} /> Gerekli Araçlar
                </h4>
                <ul className="space-y-2 text-sm text-slate-800 font-bold">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-600"/> Anket Yazılımı</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-600"/> Excel veya SPSS / R</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-600"/> Veri Kaynakları (Raporlar)</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Hazırlık Aşaması */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b-2 border-slate-200 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">0</div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Hazırlık Aşaması</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-[2rem] border border-slate-300 shadow-md">
                <h4 className="font-black text-blue-800 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Target size={18} /> Amaç ve Kapsam
                </h4>
                <div className="space-y-4 text-sm text-slate-700 font-medium">
                    <p><b>Amaç Belirleme:</b> SEGRI'yi neden hesaplıyorsunuz? (Örn. inovasyon kapasitesini artırmak).</p>
                    <ul className="space-y-2 pl-4 border-l-2 border-blue-100">
                        <li><b>Bireysel:</b> 10-50 kişi</li>
                        <li><b>Kurumsal/STK:</b> 100-500 kişi</li>
                        <li><b>Bölgesel:</b> 1.500+ kişi (Temsili nüfus)</li>
                    </ul>
                </div>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border border-slate-300 shadow-md">
                <h4 className="font-black text-blue-800 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Clock size={18} /> Zaman ve Kaynaklar
                </h4>
                <div className="space-y-4 text-sm text-slate-700 font-medium">
                    <p><b>Zaman:</b> Küçük ölçek için 1-2 hafta, büyük ölçek için 1-2 ay.</p>
                    <p><b>Bütçe:</b> Anket araçları ücretsiz olabilir, analiz için uzman desteği alınabilir.</p>
                    <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 font-bold">
                        <ShieldCheck size={14} className="inline mr-2"/> Katılımcılardan rıza alın (GDPR/KVKK uyumu) ve anonimlik sağlayın.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Step 1: IES */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 border-b-2 border-slate-200 pb-6">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center font-black text-3xl shadow-xl transform -rotate-3">1</div>
            <div>
                <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Adım 1: IES Değerlendirmesi</h2>
                <p className="text-lg text-emerald-700 font-black tracking-widest uppercase">Bireysel Girişimcilik Ruhu | IES = (0.22×RTC) + (0.24×ICT) + (0.18×IAW) + (0.18×PIM) + (0.18×SCW)</p>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-300 shadow-xl">
            <h3 className="text-2xl font-black text-slate-950 mb-8 flex items-center gap-4">
                <MessageSquare size={28} className="text-emerald-700" /> 1.1 Anket Tasarımı ve Uygulaması
            </h3>
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
                <p className="text-emerald-900 font-bold text-sm leading-relaxed">
                    Her bileşen için 5-7 soru, 7 puanlık Likert ölçeğinde (1=Kesinlikle Katılmıyorum, 7=Kesinlikle Katılıyorum) uygulanır. Toplam anket 25-35 soru arası olup 10-15 dakika sürer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* RTC */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Zap size={16} className="text-red-500" /> RTC (Risk Alma Cesareti)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-3 font-medium">
                        <li>• Başarısızlık riski beni yeni bir projeye başlamaktan alıkoymaz.</li>
                        <li>• Belirsiz durumlarda hızlı ve etkili karar alabilirim.</li>
                        <li>• Geçmiş başarısızlıkları bir öğrenme fırsatı olarak görürüm.</li>
                        <li>• Zorlu piyasa koşullarında bile girişimci ruhumu korurum.</li>
                    </ul>
                </div>

                {/* ICT */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Brain size={16} className="text-emerald-600" /> ICT (Yenilikçilik ve Yaratıcılık)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-3 font-medium">
                        <li>• Sık sık özgün ve yenilikçi fikirler üretirim.</li>
                        <li>• Mevcut süreçleri daha iyi hale getirmek için yaratıcı yollar ararım.</li>
                        <li>• Yeni teknolojileri veya trendleri hızlıca uyarlayabilirim.</li>
                        <li>• Problem çözmede alışılmadık yaklaşımlar denemekten hoşlanırım.</li>
                    </ul>
                </div>

                {/* IAW */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Target size={16} className="text-blue-600" /> IAW (Bağımsızlık ve Özerklik)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-3 font-medium">
                        <li>• Kendi işimi kurmak bana büyük bir özgürlük hissi verir.</li>
                        <li>• Başkalarının yönlendirmesine ihtiyaç duymadan karar almayı tercih ederim.</li>
                        <li>• Kendi girişimimin patronu olmayı hayal ederim.</li>
                        <li>• Grup çalışmalarında bile bireysel inisiyatif almayı severim.</li>
                    </ul>
                </div>

                {/* PIM & SCW */}
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                        <Heart size={16} className="text-indigo-600" /> PIM & SCW (Tutku ve Sosyal Fayda)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-3 font-medium">
                        <li>• Yaptığım işte derin bir tutku ve heyecan hissederim.</li>
                        <li>• İşimin topluma ve çevreye fayda sağlaması önceliğimdir.</li>
                        <li>• Sürdürülebilir ve etik iş modellerini tercih ederim.</li>
                        <li>• İşimin kârından ziyade sosyal etkisiyle gurur duyarım.</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 p-8 bg-slate-900 text-white rounded-[2rem] border border-emerald-900/50">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calculator size={16} /> 1.2 Veri İşleme ve Hesaplama
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Normalizasyon Formülü</p>
                        <div className="text-2xl font-black bg-white/5 p-4 rounded-xl border border-white/10 font-mono">
                            Skor = (Ortalama - 1) × (100 / 6)
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed italic">
                            Örnek: RTC ortalama 5.0 ise; <br/>
                            (5.0 - 1) × 16.67 ≈ 66.68 puan.
                        </p>
                    </div>
                    <div className="bg-emerald-950 p-6 rounded-2xl border border-emerald-900 text-xs font-medium leading-loose">
                        <b>Uygulama İpuçları:</b> <br/>
                        • Dijital araçlar kullanın (Google Forms/SurveyMonkey). <br/>
                        • Katılımcı seçimi: Rastgele örnekleme yapın. <br/>
                        • Kültürel Uyarlama: Bölgesel normlara göre soruları esnetin.
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Step 2: EEF */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 border-b-2 border-slate-200 pb-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-black text-3xl shadow-xl transform rotate-3">2</div>
            <div>
                <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Adım 2: EEF Değerlendirmesi</h2>
                <p className="text-lg text-blue-700 font-black tracking-widest uppercase">Ekosistem Destekleyici Faktörler | EEF = (0.20 × ∑FA, RFQ, MD, KI, EN)</p>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-300 shadow-xl">
            <h3 className="text-2xl font-black text-slate-950 mb-8 flex items-center gap-4">
                <Search size={28} className="text-blue-700" /> 2.1 Veri Toplama ve Ölçüm
            </h3>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                Bileşenler, ikincil veriler (Crunchbase, Dünya Bankası raporları vb.) ve uzman görüşleriyle (Delphi yöntemi) ölçülür. 0-100 ölçeğinde puan verilir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: 'FA (Finansmana Erişim)', desc: 'VC yatırımları, kredi erişimi ve melek yatırımcı derinliği.', data: 'Crunchbase, Dünya Bankası' },
                    { title: 'RFQ (Regülasyon Kalitesi)', desc: 'İş kurma süresi ve yasal kolaylıklar.', data: 'World Bank B-READY' },
                    { title: 'MD (Pazar Dinamikleri)', desc: 'Pazar büyüklüğü ve rekabet ortamı.', data: 'WEF Rekabet Endeksi' },
                    { title: 'KI (Bilgi Altyapısı)', desc: 'Patent sayıları ve STEM mezuniyet oranları.', data: 'WIPO, UNESCO' },
                    { title: 'EN (Girişimcilik Ağları)', desc: 'Kuluçka merkezi sayısı ve mentorluk etkinlikleri.', data: 'StartupBlink' }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.title}</h4>
                            <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Ağırlık: %20</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                        <div className="text-[10px] font-black text-slate-400 flex items-center gap-2">
                            <FileText size={12} /> Kaynak: {item.data}
                        </div>
                    </div>
                ))}
                <div className="p-6 bg-blue-900 text-white rounded-2xl border border-blue-950 flex flex-col justify-center">
                    <h4 className="font-black text-blue-300 text-xs uppercase tracking-widest mb-2">EEF Hesaplama Örneği</h4>
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
        <div className="bg-slate-950 p-12 rounded-[3.5rem] shadow-2xl border border-blue-900/30 text-white text-center">
            <p className="text-xs font-black text-blue-400 uppercase tracking-[0.5em] mb-4">Adım 3: Nihai Skor</p>
            <h3 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter">
                SEGRİ = (0.60 × IES) + (0.40 × EEF)
            </h3>
            <div className="max-w-xl mx-auto p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-sm font-bold text-slate-300 leading-relaxed">
                    Örnek Sentez: <br/>
                    IES: 69.25, EEF: 60.00 <br/>
                    <b>SEGRİ Skoru: 65.55</b>
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-300 shadow-xl">
                <h3 className="text-2xl font-black text-slate-950 mb-6 flex items-center gap-3 tracking-tight">
                    <Activity size={24} className="text-indigo-600" /> Adım 4: Yorumlama
                </h3>
                <ul className="space-y-4 text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                        <b>Matris Konumlandırma:</b> 2x2 matris üzerinde IES ve EEF kesişimine bakın (Iron Man, Gandalf vb.).
                    </li>
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                        <b>Bileşen Analizi:</b> Radar grafiğiyle güçlü ve zayıf alanları görselleştirin.
                    </li>
                    <li className="flex items-start gap-3">
                        <ArrowRight size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                        <b>Kıyaslama:</b> Pilot veriler veya global liderlerle (Örn. ABD=80.75) karşılaştırın.
                    </li>
                </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-300 shadow-xl">
                <h3 className="text-2xl font-black text-slate-950 mb-6 flex items-center gap-3 tracking-tight">
                    <Scale size={24} className="text-red-600" /> Adım 5: Eylem Planı
                </h3>
                <p className="text-sm text-slate-600 mb-6 font-medium">Zayıf alanlara yönelik somut adımlar geliştirin:</p>
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-xs font-black text-red-900 uppercase">Düşük RTC Çözümü</p>
                        <p className="text-xs text-red-700 font-bold mt-1">Eğitimler ve mentorluk seansları düzenleyin.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs font-black text-blue-900 uppercase">Düşük EN Çözümü</p>
                        <p className="text-xs text-blue-700 font-bold mt-1">Hızlandırıcı programları ve ağ etkinlikleri başlatın.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Final Conclusion */}
        <div className="text-center py-12">
            <p className="text-lg font-black text-slate-800 tracking-tight leading-relaxed max-w-3xl mx-auto italic">
                "Bu rehber, SEGRI’yi her ölçekte uygulamak için kapsamlıdır. Uygulama için gerekli araçlar ve örnekler panellerimizde hazırdır."
            </p>
            <button 
                onClick={() => navigateToTab('calculator')}
                className="mt-8 px-12 py-5 bg-blue-800 text-white rounded-[2rem] font-black shadow-2xl hover:bg-blue-900 transition-all flex items-center gap-4 mx-auto active:scale-95 group"
            >
                <Calculator size={24} className="group-hover:rotate-12 transition-transform" />
                Hesaplama Aracına Git
            </button>
        </div>
      </section>
    </div>
  );
};

export default HowToCalculate;