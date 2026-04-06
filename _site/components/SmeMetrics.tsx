import React from 'react';
import { Store, Heart, Users, DollarSign, Clock, ThumbsUp, RefreshCw, MapPin } from 'lucide-react';

const MetricCard = ({ title, description, whyImportant, howToMeasure, source, target, frequency, icon: Icon }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="bg-slate-50 p-3 rounded-lg">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Neden Önemli?</h4>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          {whyImportant.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nasıl Ölçülür?</h4>
          <p className="text-sm font-mono text-slate-800 bg-slate-100 p-2 rounded border border-slate-200">{howToMeasure}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Veri Kaynağı</h4>
          <p className="text-sm text-slate-700">{source}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Hedef</span>
          <span className="text-sm font-semibold text-emerald-700">{target}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sıklık</span>
          <span className="text-sm font-medium text-slate-700">{frequency}</span>
        </div>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon }: any) => (
  <div className="flex items-center gap-3 mb-6 mt-10 pb-2 border-b border-slate-200">
    <Icon className="text-emerald-800" size={28} />
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
  </div>
);

const SmeMetrics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <Store size={32} className="text-emerald-200" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Yaşam Tarzı & KOBİ Metrikleri</h1>
            <p className="text-emerald-200 font-medium mt-1">Sürdürülebilir işletmeler ve yerel ekonomi için performans göstergeleri</p>
          </div>
        </div>
        <p className="text-emerald-100 max-w-3xl leading-relaxed opacity-90">
          Bu bölüm, sürdürülebilir gelir, özerklik ve toplumsal istikrar hedefleyen KOBİ ve yaşam tarzı işletmeleri için kritik başarı metriklerini içerir. 
          Organik büyüme, karlılık ve yaşam kalitesi odaklı işletmeler için özelleştirilmiştir.
        </p>
      </div>

      {/* A. SÜRDÜRÜLEBİLİRLİK */}
      <div>
        <SectionHeader title="A. Sürdürülebilirlik" icon={RefreshCw} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="16. 5+ Yıl Hayatta Kalma Oranı"
            description="Küçük işletmelerin 5+ yıl faaliyet gösterme yüzdesi"
            icon={Clock}
            whyImportant={[
              "KOBİ'ler için hedef %60+ (startup'larda %40-50)",
              "Toplumsal istikrar sağlar",
              "Yerel ekonomi omurgası"
            ]}
            howToMeasure="(5 Yıl Sonra Aktif / Başlangıçtaki) × 100"
            source="BLS, Vergi Kayıtları"
            target="%60+ (ulusal ortalama %50)"
            frequency="Yıllık"
          />
          <MetricCard 
            title="17. Sahip Geliri Sürdürülebilirliği"
            description="İşletme sahibinin kazandığı gelir (yaşam standardı)"
            icon={DollarSign}
            whyImportant={[
              "Yaşam tarzı işletmesinin birincil amacı",
              "İşletme sahibine iyi yaşam sağlıyor mu?",
              "Başarı kriteri: karlılık, bukan büyüme"
            ]}
            howToMeasure="Yıllık net gelir (şahıs) vs Bölge ortalama maaşı"
            source="IRS, Anketler"
            target="Bölge ortalama gelirinin üzerinde"
            frequency="Yıllık"
          />
          <MetricCard 
            title="18. Yerel İstihdam (KOBİ)"
            description="KOBİ'lerin yarattığı istihdam (1-50 çalışan)"
            icon={Users}
            whyImportant={[
              "KOBİ'ler toplam istihdamın %50'sini oluşturur",
              "Yüksek büyüme startup'larından farklı",
              "Toplumsal istikrar"
            ]}
            howToMeasure="W-2 form sayısı (KOBİ'lerde), Tam zaman eşdeğeri (FTE)"
            source="UI Kayıtları, BLS"
            target="Yıllık istikrarlı artış"
            frequency="Çeyreklik"
          />
        </div>
      </div>

      {/* B. TOPLUMSAL ETKİ */}
      <div>
        <SectionHeader title="B. Toplumsal Etki" icon={Users} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="19. Yerel Tedarik Zinciri Kullanımı"
            description="İşletmenin yerel tedarikçilerden alışveriş yüzdesi"
            icon={MapPin}
            whyImportant={[
              "Para yerel ekonomide dolaşır (multiplier effect)",
              "Toplumsal dayanışma",
              "Karşılıklı büyüme"
            ]}
            howToMeasure="(Yerel Alımlar / Toplam Alımlar) × 100"
            source="Anketler, Muhasebe Kayıtları"
            target="%60+ yerel tedarik"
            frequency="Yıllık"
          />
          <MetricCard 
            title="20. İşletme Devir/Süreklilik Oranı"
            description="Kapanan vs. başarıyla devredilen (satılan/aileye geçen) işletmeler"
            icon={RefreshCw}
            whyImportant={[
              "KOBİ'lerin en büyük sorunu: nesil geçişi",
              "Başarılı devir = servet transferi",
              "Kapanma = ekonomik kayıp"
            ]}
            howToMeasure="Devredilen İşletme / (Kapanan + Devredilen)"
            source="Ticaret Sicil, Anketler"
            target="Devir oranını artırmak"
            frequency="Yıllık"
          />
        </div>
      </div>

      {/* C. SAHİP MEMNUNİYETİ */}
      <div>
        <SectionHeader title="C. Sahip Memnuniyeti" icon={Heart} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="21. İş-Yaşam Dengesi Skoru"
            description="İşletme sahibinin iş-yaşam dengesi memnuniyeti"
            icon={Heart}
            whyImportant={[
              "Yaşam tarzı işletmesinin temel amacı",
              "Tükenmişlik (burnout) riski",
              "Sürdürülebilirlik göstergesi"
            ]}
            howToMeasure="Anket (1-10 ölçek), Çalışma saati/hafta"
            source="Anketler"
            target="≤40 saat/hafta, 4+ hafta tatil, 7+/10 memnuniyet"
            frequency="Yıllık"
          />
          <MetricCard 
            title="22. Müşteri Memnuniyeti (KOBİ)"
            description="Yerel müşterilerin memnuniyet skoru"
            icon={ThumbsUp}
            whyImportant={[
              "Tekrarlayan iş (recurring revenue)",
              "Yerel itibar",
              "Sürdürülebilir büyüme"
            ]}
            howToMeasure="NPS veya CSAT, Online review skorları"
            source="Google Reviews, Anketler"
            target="90%+ memnuniyet, 4.5+ yıldız"
            frequency="6 aylık"
          />
        </div>
      </div>
    </div>
  );
};

export default SmeMetrics;
