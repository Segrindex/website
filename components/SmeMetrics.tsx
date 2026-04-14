import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store, Heart, Users, DollarSign, Clock, ThumbsUp, RefreshCw, MapPin, Target, 
  BarChart2, List, Calculator, FileText, CheckCircle2, AlertTriangle, Info, 
  Globe, Briefcase, Map, TrendingUp, Scale, ChevronRight, ChevronLeft, Download, Zap
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';


const MetricCard = ({ title, description, whyImportant, howToMeasure, source, target, frequency, icon: Icon }: any) => {
  const { t } = useLanguage();
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 hover-card">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-lg bg-gray-50 text-fintech-charcoal">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-fintech-charcoal">{t(title)}</h3>
        <p className="text-sm text-gray-700 mt-1">{t(description)}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="bg-white p-3 rounded-lg">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t('Neden Önemli?')}</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {whyImportant.map((item: string, idx: number) => (
            <li key={idx}>{t(item)}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('Nasıl Ölçülür?')}</h4>
          <p className="text-sm font-mono text-fintech-charcoal bg-fintech-gray p-2 rounded border border-gray-200">{t(howToMeasure)}</p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('Veri Kaynağı')}</h4>
          <p className="text-sm text-gray-700">{t(source)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">{t('Hedef')}</span>
          <span className="text-sm font-semibold text-fintech-charcoal">{t(target)}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">{t('Sıklık')}</span>
          <span className="text-sm font-medium text-gray-700">{t(frequency)}</span>
        </div>
      </div>
    </div>
  </div>
)};

const CategoryCard = ({ title, weight, count, indicators, isModerator = false }: any) => {
  const { t } = useLanguage();
  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isModerator ? 'border-amber-200' : 'border-gray-200'} p-6 hover:shadow-md transition-shadow duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-fintech-charcoal">{t(title)}</h3>
        <div className="flex flex-col items-end">
          <span className={`text-sm font-bold px-2 py-1 rounded-md ${isModerator ? 'bg-amber-100 text-gray-700' : 'bg-fintech-gray text-fintech-charcoal'}`}>
            {t('Ağırlık')}: {weight}
          </span>
          <span className="text-xs text-gray-500 mt-1">{count} {t('Gösterge')}</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-white">
            <tr>
              <th className="px-4 py-2 rounded-tl-lg">{t('Gösterge')}</th>
              <th className="px-4 py-2">{t('Ölçüm')}</th>
              <th className="px-4 py-2 rounded-tr-lg">{t('Veri Kaynağı')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {indicators.map((ind: any, idx: number) => (
              <tr key={idx} className="hover:bg-white/50">
                <td className="px-4 py-3 font-medium text-fintech-charcoal">{t(ind.name)}</td>
                <td className="px-4 py-3 text-gray-700">{t(ind.measure)}</td>
                <td className="px-4 py-3 text-gray-700">{t(ind.source)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }: any) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 mb-6 mt-10 pb-2 border-b border-gray-200">
      <Icon className="text-fintech-charcoal" size={28} />
      <h2 className="text-2xl font-black text-fintech-charcoal tracking-tight">{t(title)}</h2>
    </div>
  );
};

// --- SmeMetrics Component ---
const SmeMetrics: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'yepe' | 'global' | 'lifestyle' | 'gee'>('yepe');
  
  const [geeInputs, setGeeInputs] = useState({
    gsbe: 65,
    yepe: 58,
    lhs: 72,
    actualGem: 70
  });

  const calculateGee = () => {
    const estimated = (0.40 * geeInputs.gsbe) + (0.35 * geeInputs.yepe) + (0.25 * geeInputs.lhs);
    const diff = geeInputs.actualGem - estimated;
    return { estimated, diff };
  };

  const { estimated, diff } = calculateGee();
  
  const yepeCategories = [
    {
      title: "K1 – Yerel Ekonomik Bağlantı",
      weight: "%25",
      count: 6,
      indicators: [
        { name: "Yerel tedarik oranı (%)", measure: "Makro", source: "İstatistik kurumu" },
        { name: "Yerel istihdam oranı (%)", measure: "Makro", source: "İşgücü anketi" },
        { name: "KOBİ’lerin bölge GSYH’sine katkısı (%)", measure: "Makro", source: "Bölgesel hesaplar" },
        { name: "Mikro işletmelerin yerel harcama çarpanı (tahmini)", measure: "Makro", source: "Girdi-çıktı" },
        { name: "Ortalama yerel işbirliği sayısı (işletme başına)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Topluluğa bağış/sponsorluk oranı (net kâr %)", measure: "Mikro", source: "İşletme anketi" }
      ]
    },
    {
      title: "K2 – Çevresel Sürdürülebilirlik",
      weight: "%20",
      count: 6,
      indicators: [
        { name: "Yenilenebilir enerji kullanım oranı (KOBİ)", measure: "Makro", source: "Enerji ajansı" },
        { name: "Ortalama karbon yoğunluğu (ton CO2/çalışan)", measure: "Makro", source: "Emisyon envanteri" },
        { name: "Atık geri dönüşüm oranı (işletme atığı)", measure: "Makro", source: "Çevre bakanlığı" },
        { name: "Su verimliliği değişimi (yıllık %)", measure: "Makro", source: "Su idaresi" },
        { name: "Yeşil sertifikalı KOBİ oranı (%)", measure: "Makro", source: "Sertifika kuruluşları" },
        { name: "Yeşil ürün/hizmet ciro payı (ortalama)", measure: "Mikro", source: "İşletme anketi" }
      ]
    },
    {
      title: "K3 – Sosyal Uyum ve Refah",
      weight: "%20",
      count: 6,
      indicators: [
        { name: "Ortalama haftalık çalışma saati", measure: "Mikro", source: "İşgücü anketi" },
        { name: "Çalışan memnuniyeti (eNPS ortalaması)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Yıllık izin kullanım oranı (ortalama)", measure: "Mikro", source: "Bordro anketi" },
        { name: "Kadın girişimci KOBİ oranı / erkek oranı", measure: "Makro", source: "ILO, GEM" },
        { name: "İstihdam istikrarı (işten çıkarılan oranı son 2 yıl)", measure: "Makro", source: "Sosyal güvenlik" },
        { name: "Gelir eşitsizliği (çalışanlar arası Gini)", measure: "Makro", source: "Gelir anketleri" }
      ]
    },
    {
      title: "K4 – Finansal Özerklik ve Dirençlilik",
      weight: "%15",
      count: 5,
      indicators: [
        { name: "Dış finansmana bağımlılık (ortalama)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Ortalama nakit akışı sağlığı (negatif ay sayısı)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Ortalama kaçış süresi (ay)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Sahip maaşının yaşam maliyetini karşılama oranı (ortalama)", measure: "Mikro", source: "İşletme anketi" },
        { name: "Krediye erişim (başvuru red oranı – ters)", measure: "Makro", source: "Merkez bankası" }
      ]
    },
    {
      title: "K5 – Yerel Ekosistem Desteği",
      weight: "%10",
      count: 5,
      indicators: [
        { name: "Elektrik kesintisi süresi (yıllık saat)", measure: "Makro", source: "WB, elektrik şirketi" },
        { name: "Lojistik performans (yerel dağıtım alt skalası)", measure: "Makro", source: "Dünya Bankası" },
        { name: "KOBİ danışmanlık/kuluçka merkezi yoğunluğu", measure: "Makro", source: "KOBİ ajansları" },
        { name: "Kayıt dışı ekonomi tahmini (GSYH % – ters)", measure: "Makro", source: "IMF" },
        { name: "Yerel yönetimin sürdürülebilirlik teşvikleri (bütçe/GSYH)", measure: "Makro", source: "Bölgesel bütçeler" }
      ]
    },
    {
      title: "K6 – Kültürel ve Kurumsal Bağlam",
      weight: "%10",
      count: 5,
      indicators: [
        { name: "Genelleştirilmiş güven (%)", measure: "Makro", source: "WVS, ESS" },
        { name: "Yolsuzluk algısı (CPI bölgesel)", measure: "Makro", source: "Transparency, ulusal anketler" },
        { name: "Girişimcilik korkusu (başarısızlık korkusu)", measure: "Makro", source: "GEM" },
        { name: "Toplumsal cinsiyet normları (kadın girişimciliğe onay)", measure: "Makro", source: "WVS, GEM" },
        { name: "Vergi ahlakı (vergi kaçırmayı meşru görenlerin oranı – ters)", measure: "Makro", source: "WB, OECD" }
      ]
    }
  ];

  const categories = [
    {
      title: "K1 – Ekonomik Katkı ve Temel Yapı",
      weight: "%15",
      count: 4,
      indicators: [
        { name: "KOBİ GSYH payı (%)", measure: "OECD, WB", source: "OECD, WB" },
        { name: "KOBİ istihdam payı (%)", measure: "ILO, Eurostat", source: "ILO, Eurostat" },
        { name: "KOBİ ihracat payı (%)", measure: "ITC Trade Map", source: "ITC Trade Map" },
        { name: "Mikro işletmelerin KOBİ içindeki oranı (%)", measure: "Ulusal kayıtlar", source: "Ulusal kayıtlar" }
      ]
    },
    {
      title: "K2 – İşletme Seviyesi Başarı Faktörleri",
      weight: "%25",
      count: 7,
      indicators: [
        { name: "Finansmana erişim (kredi erişim endeksi, 0-100)", measure: "WB Enterprise Surveys", source: "WB Enterprise Surveys" },
        { name: "Dijitalleşme (e-ticaret, bulut, e-fatura kullanan KOBİ oranı %)", measure: "Eurostat, ITU", source: "Eurostat, ITU" },
        { name: "İnovasyon (Ar-Ge yapan KOBİ oranı + patent yoğunluğu)", measure: "Eurostat, WIPO", source: "Eurostat, WIPO" },
        { name: "Çalışan bağlılığı (yıllık personel devir hızı – ters kodlu)", measure: "Ulusal işgücü anketleri", source: "Ulusal işgücü anketleri" },
        { name: "Risk yönetimi (gelir çeşitlendirme endeksi, 0-100)", measure: "WB Enterprise Surveys", source: "WB Enterprise Surveys" },
        { name: "ESG sürdürülebilirlik (yeşil sertifika/raporlama yapan KOBİ oranı)", measure: "GRI, ulusal raporlar", source: "GRI, ulusal raporlar" },
        { name: "Mobil ve dijital finans kullanımı (mobil para/UPI kullanan KOBİ oranı)", measure: "GSMA, merkez bankaları", source: "GSMA, merkez bankaları" }
      ]
    },
    {
      title: "K3 – Görünüm ve Beklentiler",
      weight: "%10",
      count: 3,
      indicators: [
        { name: "KOBİ yöneticilerinin 6 aylık iş durumu beklentisi (net iyimserlik)", measure: "EU Business Survey, ulusal anketler", source: "EU Business Survey, ulusal anketler" },
        { name: "Yatırım eğilimi (12 ayda yatırım planlayan KOBİ oranı)", measure: "Aynı", source: "Aynı" },
        { name: "İstihdam beklentisi (eleman almayı planlayan KOBİ oranı)", measure: "Aynı", source: "Aynı" }
      ]
    },
    {
      title: "K4 – Destekleyici Ekosistem",
      weight: "%15",
      count: 5,
      indicators: [
        { name: "Kurulum kolaylığı (gün sayısı – ters kodlu)", measure: "WB Doing Business (eski)", source: "WB Doing Business (eski)" },
        { name: "Vergi yükü (toplam vergi oranı, kâr yüzdesi – ters kodlu)", measure: "WB, PwC", source: "WB, PwC" },
        { name: "AB/Kalkınma fonlarına erişim (KOBİ başına düşen USD)", measure: "AB fonları, WB", source: "AB fonları, WB" },
        { name: "KOBİ danışmanlık/kuluçka merkezi yoğunluğu (10.000 KOBİ başına)", measure: "Ulusal KOBİ ajansları", source: "Ulusal KOBİ ajansları" },
        { name: "Fiziksel ekosistem kalitesi (üniversite-sanayi işbirliği anketi)", measure: "WEF", source: "WEF" }
      ]
    },
    {
      title: "K5 – Sosyo-Kültürel ve Kurumsal Bağlam",
      weight: "%15",
      count: 5,
      indicators: [
        { name: "Genelleştirilmiş güven (%)", measure: "WVS, ESS", source: "WVS, ESS" },
        { name: "Yolsuzluk algısı (CPI – ters kodlu)", measure: "Transparency Int.", source: "Transparency Int." },
        { name: "Kayıt dışı ekonomi tahmini (GSYH % – ters kodlu)", measure: "IMF", source: "IMF" },
        { name: "Girişimcilik korkusu (başarısızlık korkusu – ters kodlu)", measure: "GEM", source: "GEM" },
        { name: "Toplumsal cinsiyet eşitliği (kadın girişimci oranı / erkek oranı)", measure: "ILO, GEM", source: "ILO, GEM" }
      ]
    },
    {
      title: "K6 – Altyapı, Dirençlilik ve Piyasa Dinamikleri",
      weight: "%15",
      count: 4,
      indicators: [
        { name: "Elektrik kesintisi süresi (yıllık ortalama saat – ters kodlu)", measure: "WB Enterprise Surveys", source: "WB Enterprise Surveys" },
        { name: "Lojistik performans endeksi (LPI)", measure: "Dünya Bankası", source: "Dünya Bankası" },
        { name: "Siber güvenlik hazırlığı (CERT varlığı + anket)", measure: "ITU, CERT", source: "ITU, CERT" },
        { name: "Makroekonomik istikrarsızlık etkisi (enflasyonun işletme maliyetlerine yansıması)", measure: "WB Enterprise Surveys", source: "WB Enterprise Surveys" }
      ]
    },
    {
      title: "K7 – Veri Kalitesi ve Kapsayıcılık Düzeltmesi (%5 moderatör)",
      weight: "%5",
      count: 2,
      isModerator: true,
      indicators: [
        { name: "Eksik veri oranı (%)", measure: "Meta-veri analizi", source: "Meta-veri analizi" },
        { name: "Veri güncelliği (ortalama veri yaşı – yıl, ters kodlu)", measure: "Meta-veri analizi", source: "Meta-veri analizi" }
      ]
    }
  ];

  const lifestyleMetrics = [
    {
      category: "A. Sürdürülebilirlik",
      metrics: [
        {
          title: "16. 5+ Yıl Hayatta Kalma Oranı",
          description: "Küçük işletmelerin 5+ yıl faaliyet gösterme yüzdesi",
          whyImportant: [
            "KOBİ'ler için hedef %60+ (startup'larda %40-50)",
            "Toplumsal istikrar sağlar",
            "Yerel ekonomi omurgası"
          ],
          howToMeasure: "(5 Yıl Sonra Aktif / Başlangıçtaki) × 100",
          source: "BLS, Vergi Kayıtları",
          target: "%60+ (ulusal ortalama %50)",
          frequency: "Yıllık",
          icon: Heart
        },
        {
          title: "17. Sahip Geliri Sürdürülebilirliği",
          description: "İşletme sahibinin kazandığı gelir (yaşam standardı)",
          whyImportant: [
            "Yaşam tarzı işletmesinin birincil amacı",
            "İşletme sahibine iyi yaşam sağlıyor mu?",
            "Başarı kriteri: karlılık, bukan büyüme"
          ],
          howToMeasure: "Yıllık net gelir (şahıs) vs Bölge ortalama maaşı",
          source: "IRS, Anketler",
          target: "Bölge ortalama gelirinin üzerinde",
          frequency: "Yıllık",
          icon: DollarSign
        },
        {
          title: "18. Yerel İstihdam (KOBİ)",
          description: "KOBİ'lerin yarattığı istihdam (1-50 çalışan)",
          whyImportant: [
            "KOBİ'ler toplam istihdamın %50'sini oluşturur",
            "Yüksek büyüme startup'larından farklı",
            "Toplumsal istikrar"
          ],
          howToMeasure: "W-2 form sayısı (KOBİ'lerde), Tam zaman eşdeğeri (FTE)",
          source: "UI Kayıtları, BLS",
          target: "Yıllık istikrarlı artış",
          frequency: "Çeyreklik",
          icon: Users
        }
      ]
    },
    {
      category: "B. Toplumsal Etki",
      metrics: [
        {
          title: "19. Yerel Tedarik Zinciri Kullanımı",
          description: "İşletmenin yerel tedarikçilerden alışveriş yüzdesi",
          whyImportant: [
            "Para yerel ekonomide dolaşır (multiplier effect)",
            "Toplumsal dayanışma",
            "Karşılıklı büyüme"
          ],
          howToMeasure: "(Yerel Alımlar / Toplam Alımlar) × 100",
          source: "Anketler, Muhasebe Kayıtları",
          target: "%60+ yerel tedarik",
          frequency: "Yıllık",
          icon: RefreshCw
        },
        {
          title: "20. İşletme Devir/Süreklilik Oranı",
          description: "Kapanan vs. başarıyla devredilen (satılan/aileye geçen) işletmeler",
          whyImportant: [
            "KOBİ'lerin en büyük sorunu: nesil geçişi",
            "Başarılı devir = servet transferi",
            "Kapanma = ekonomik kayıp"
          ],
          howToMeasure: "Devredilen İşletme / (Kapanan + Devredilen)",
          source: "Ticaret Sicil, Anketler",
          target: "Devir oranını artırmak",
          frequency: "Yıllık",
          icon: RefreshCw
        }
      ]
    },
    {
      category: "C. Sahip Memnuniyeti",
      metrics: [
        {
          title: "21. İş-Yaşam Dengesi Skoru",
          description: "İşletme sahibinin iş-yaşam dengesi memnuniyeti",
          whyImportant: [
            "Yaşam tarzı işletmesinin temel amacı",
            "Tükenmişlik (burnout) riski",
            "Sürdürülebilirlik göstergesi"
          ],
          howToMeasure: "Anket (1-10 ölçek), Çalışma saati/hafta",
          source: "Anketler",
          target: "≤40 saat/hafta, 4+ hafta tatil, 7+/10 memnuniyet",
          frequency: "Yıllık",
          icon: Clock
        },
        {
          title: "22. Müşteri Memnuniyeti (KOBİ)",
          description: "Yerel müşterilerin memnuniyet skoru",
          whyImportant: [
            "Tekrarlayan iş (recurring revenue)",
            "Yerel itibar",
            "Sürdürülebilir büyüme"
          ],
          howToMeasure: "NPS veya CSAT, Online review skorları",
          source: "Google Reviews, Anketler",
          target: "90%+ memnuniyet, 4.5+ yıldız",
          frequency: "6 aylık",
          icon: ThumbsUp
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* Tabs */}
      <div className="flex space-x-2 bg-fintech-gray/50 p-1 rounded-xl border border-gray-200 w-fit overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('yepe')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'yepe' 
              ? 'bg-white text-fintech-charcoal shadow-sm border border-gray-200/50' 
              : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray/50'
          }`}
        >
          <Map size={18} />
          {t('Yerel Ekonomi Performans Endeksi (YEPE)')}
        </button>
        <button
          onClick={() => setActiveTab('global')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === 'global' 
              ? 'bg-white text-fintech-charcoal shadow-sm border border-gray-200/50' 
              : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray/50'
          }`}
        >
          <Globe size={18} />
          {t('Global KOBİ Başarı Endeksi')}
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === 'lifestyle' 
              ? 'bg-white text-fintech-charcoal shadow-sm border border-gray-200/50' 
              : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray/50'
          }`}
        >
          <Briefcase size={18} />
          {t('Yaşam Tarzı & KOBİ Metrikleri')}
        </button>
        <button
          onClick={() => setActiveTab('gee')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeTab === 'gee' 
              ? 'bg-white text-fintech-charcoal shadow-sm border border-gray-200/50' 
              : 'text-gray-700 hover:text-fintech-charcoal hover:bg-fintech-gray/50'
          }`}
        >
          <Calculator size={18} />
          {t('Girişimcilik Ekosistem Etkisi (GEE)')}
        </button>
      </div>

      {activeTab === 'yepe' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-fintech-primary to-fintech-teal rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Map size={32} className="text-teal-200" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{t('YEREL EKONOMİ PERFORMANS ENDEKSİ (YEPE)')}</h1>
                <p className="text-teal-200 font-medium mt-1">{t('Yerel ekonomiye katkı, sürdürülebilirlik ve refah ölçümü')}</p>
              </div>
            </div>
            <p className="text-teal-100 max-w-3xl leading-relaxed opacity-90">
              {t('Bir bölgedeki KOBİ’lerin ve yaşam tarzı işletmelerinin yerel ekonomiye katkısını, çevresel ve sosyal sürdürülebilirliğini, özerklik ve refah düzeyini çok boyutlu olarak ölçen bir endekstir.')}
            </p>
          </div>

          {/* 1. Tanım ve Amaç */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="1. Tanım ve Amaç" icon={Target} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><MapPin size={18} className="text-gray-500"/> {t('Birim')}</h4>
                <p className="text-sm text-gray-700">{t('Şehir, il, bölge (NUTS2/3) veya ülke.')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><Users size={18} className="text-gray-500"/> {t('Hedef Kullanıcılar')}</h4>
                <p className="text-sm text-gray-700">{t('Yerel kalkınma ajansları, belediyeler, kooperatifler, etki odaklı yatırımcılar ve işletme ağları.')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><Clock size={18} className="text-gray-500"/> {t('Periyot')}</h4>
                <p className="text-sm text-gray-700">{t('Yıllık.')}</p>
              </div>
            </div>
          </div>

          {/* 2 & 3. Kategoriler ve Göstergeler */}
          <div>
            <SectionHeader title="2 & 3. Kategoriler ve Alt Göstergeler" icon={BarChart2} />
            <p className="text-gray-700 mb-6">{t('Toplam 6 kategori (ağırlıklar yüzde olarak, toplam %100). Ağırlıklar, yerel ekonominin önceliklerine göre esnetilebilir, ancak varsayılan ağırlıklar şöyledir. Makro (bölge düzeyi) ve mikro (işletme anketi) göstergeler birlikte verilmiştir.')}</p>
            
            <div className="space-y-6">
              {yepeCategories.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
              ))}
            </div>
          </div>

          {/* 4. Hesaplama Yöntemi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="4. Hesaplama Yöntemi" icon={Calculator} />
            
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 1 – Normalizasyon')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Her gösterge 0-100 arasında min-max normalizasyonu ile ölçeklenir. Daha iyi performans 100’e yakın olacak şekilde yön belirlenir (ters kodlama gerektiğinde yapılır).')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  X_norm = ((X_actual - X_min) / (X_max - X_min)) × 100
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 2 – Kategori Puanı')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Her kategori içinde, o kategoriye ait makro ve mikro göstergelerin ortalaması alınır. (Eğer bir bölge için mikro veri yoksa, sadece makro göstergeler kullanılır; bu durumda endeksin güvenilirliği düşer, raporlanır.)')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  C_k = (1 / n_k) * Σ X_norm,i
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 3 – Ağırlıklı Toplam')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('YEPE puanı, kategori puanlarının ağırlıklarıyla çarpılıp toplanmasıyla elde edilir.')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  YEPE = Σ (w_k × C_k)
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-transparent">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 4 – Veri Kalitesi Düzeltmesi (Opsiyonel)')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Eğer bir bölgede göstergelerin %20’sinden fazlası eksikse veya veri ortalaması 3 yıldan eskiyse, nihai YEPE puanı Q katsayısı ile çarpılır. Q en düşük 0.5 olabilir.')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  Q = 1 - (missing_rate / 100 × 0.5) - (max(0, avg_age - 3) / 10 × 0.2)
                </div>
              </div>
            </div>
          </div>

          {/* 5. Yorumlama Skalası */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="5. Yorumlama Skalası" icon={List} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-white">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">{t('YEPE Puanı')}</th>
                    <th className="px-4 py-3">{t('Değerlendirme')}</th>
                    <th className="px-4 py-3 rounded-tr-lg">{t('Anlamı')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-3 font-bold text-fintech-charcoal">80 – 100</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-fintech-gray text-fintech-charcoal rounded-md font-medium">{t('Mükemmel')}</span></td>
                    <td className="px-4 py-3 text-gray-700">{t('Yerel ekonomi güçlü, sürdürülebilir, dirençli, refah yüksek.')}</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-3 font-bold text-gray-500">65 – 79</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-fintech-gray text-fintech-charcoal rounded-md font-medium">{t('İyi')}</span></td>
                    <td className="px-4 py-3 text-gray-700">{t('Çoğu alanda iyi, birkaç iyileştirme alanı var.')}</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-3 font-bold text-fintech-amber">50 – 64</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-amber-100 text-gray-700 rounded-md font-medium">{t('Orta')}</span></td>
                    <td className="px-4 py-3 text-gray-700">{t('Temel göstergeler dengeli ama kırılganlıklar mevcut.')}</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-3 font-bold text-fintech-coral">35 – 49</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-red-50 text-gray-700 rounded-md font-medium">{t('Zayıf')}</span></td>
                    <td className="px-4 py-3 text-gray-700">{t('Yerel ekonomi baskı altında, altyapı veya sosyal sorunlar var.')}</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-3 font-bold text-fintech-coral">0 – 34</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-red-50 text-gray-700 rounded-md font-medium">{t('Kritik')}</span></td>
                    <td className="px-4 py-3 text-gray-700">{t('Acil müdahale gerekli; kayıt dışılık, düşük güven, çevresel riskler.')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Uygulama ve Raporlama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="6. Uygulama ve Raporlama" icon={FileText} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-fintech-charcoal mb-4 border-b pb-2">{t('Veri Toplama ve Araçlar')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Veri toplama')}:</strong> {t('Her bölge için yılda bir kez, kamu kaynakları + işletme anketi (örneklem en az 200 KOBİ).')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Araç')}:</strong> {t('Basit bir Excel şablonu veya çevrimiçi dashboard (Power BI/Tableau).')}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-fintech-charcoal mb-4 border-b pb-2">{t('Çıktılar')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">1</div>
                    <span>{t('Bölgenin genel YEPE puanı ve kategorilere göre trafik ışığı panosu.')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">2</div>
                    <span>{t('Karşılaştırmalı grafikler (komşu bölgeler, geçmiş yıl).')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">3</div>
                    <span><strong>{t('Politika önerileri')}:</strong> {t('En düşük iki kategori için somut adımlar (ör. "Yerel tedarik oranı düşük: yerel tedarikçi envanteri oluşturun").')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">4</div>
                    <span><strong>{t('Gönüllü katılım')}:</strong> {t('İşletmeler anketi doldurduklarında kendi mikro skorlarını görür, anonim topluluk ortalamasıyla kıyaslayabilir.')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. Örnek Hesaplama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="7. Örnek Hesaplama (Hipotetik Bir Bölge – “Yeşil Vadi”)" icon={Calculator} />
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-white">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">{t('Kategori')}</th>
                    <th className="px-4 py-3">C_k</th>
                    <th className="px-4 py-3">w_k</th>
                    <th className="px-4 py-3 rounded-tr-lg">{t('Katkı')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Yerel Ekonomik Bağlantı')}</td>
                    <td className="px-4 py-2 text-gray-700">72</td>
                    <td className="px-4 py-2 text-gray-700">0.25</td>
                    <td className="px-4 py-2 text-gray-700">18.00</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Çevresel Sürdürülebilirlik')}</td>
                    <td className="px-4 py-2 text-gray-700">55</td>
                    <td className="px-4 py-2 text-gray-700">0.20</td>
                    <td className="px-4 py-2 text-gray-700">11.00</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Sosyal Uyum ve Refah')}</td>
                    <td className="px-4 py-2 text-gray-700">68</td>
                    <td className="px-4 py-2 text-gray-700">0.20</td>
                    <td className="px-4 py-2 text-gray-700">13.60</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Finansal Özerklik')}</td>
                    <td className="px-4 py-2 text-gray-700">45</td>
                    <td className="px-4 py-2 text-gray-700">0.15</td>
                    <td className="px-4 py-2 text-gray-700">6.75</td>
                  </tr>
                  <tr className="hover:bg-white/50">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Yerel Ekosistem Desteği')}</td>
                    <td className="px-4 py-2 text-gray-700">60</td>
                    <td className="px-4 py-2 text-gray-700">0.10</td>
                    <td className="px-4 py-2 text-gray-700">6.00</td>
                  </tr>
                  <tr className="hover:bg-white/50 border-b-2 border-gray-200">
                    <td className="px-4 py-2 font-medium text-fintech-charcoal">{t('Kültürel ve Kurumsal Bağlam')}</td>
                    <td className="px-4 py-2 text-gray-700">52</td>
                    <td className="px-4 py-2 text-gray-700">0.10</td>
                    <td className="px-4 py-2 text-gray-700">5.20</td>
                  </tr>
                  <tr className="bg-white font-medium">
                    <td className="px-4 py-2 text-fintech-charcoal" colSpan={3}>{t('Ham YEPE')}</td>
                    <td className="px-4 py-2 text-fintech-charcoal">60.55</td>
                  </tr>
                  <tr className="bg-white font-medium">
                    <td className="px-4 py-2 text-fintech-charcoal" colSpan={3}>{t('Veri kalitesi (Q=0.95)')}</td>
                    <td className="px-4 py-2 text-fintech-charcoal">60.55 × 0.95 = 57.52</td>
                  </tr>
                  <tr className="bg-amber-50 font-bold">
                    <td className="px-4 py-3 text-amber-900" colSpan={3}>{t('Final YEPE')}</td>
                    <td className="px-4 py-3 text-amber-900">58 ({t('Sarı – Orta')})</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><Info size={18} className="text-gray-500"/> {t('Yorum ve Öneri')}</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>{t('Yorum')}:</strong> {t('Bölge "Orta" kategoride. Sosyal uyum ve yerel bağlantı iyi, ancak finansal özerklik ve kültürel bağlam (güven, yolsuzluk algısı) zayıf.')}</p>
              <p className="text-sm text-gray-700"><strong>{t('Öneri')}:</strong> {t('Yerel kredi garanti fonu kurulması, güven artırıcı topluluk etkinlikleri.')}</p>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'global' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-fintech-primary to-fintech-teal rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Globe size={32} className="text-teal-200" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{t('GLOBAL KOBİ BAŞARI ENDEKSİ (G-SBE)')}</h1>
                <p className="text-teal-200 font-medium mt-1">{t('Yapı ve Metodoloji')}</p>
              </div>
            </div>
            <p className="text-teal-100 max-w-3xl leading-relaxed opacity-90">
              {t('Farklı ülkelerdeki KOBİ’lerin başarısını, sadece büyüklük değil; finansal sağlık, dijitalleşme, inovasyon, ekosistem, kültürel bağlam, altyapı ve dirençlilik boyutlarıyla çok boyutlu olarak ölçmek amacıyla tasarlanmıştır.')}
            </p>
          </div>

          {/* 1. Amaç ve Kapsam */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="1. Amaç ve Kapsam" icon={Target} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><Target size={18} className="text-gray-500"/> {t('Amaç')}</h4>
                <p className="text-sm text-gray-700">{t('Farklı ülkelerdeki KOBİ’lerin başarısını çok boyutlu olarak ölçmek.')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><List size={18} className="text-gray-500"/> {t('Kapsam')}</h4>
                <p className="text-sm text-gray-700">{t('Resmi tanımlı KOBİ’ler (mikro, küçük, orta ölçekli işletmeler). Ülke düzeyinde hesaplanır, zaman içinde trend izlenebilir.')}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-fintech-charcoal mb-2 flex items-center gap-2"><Store size={18} className="text-gray-500"/> {t('Hedef Kullanıcılar')}</h4>
                <p className="text-sm text-gray-700">{t('Politika yapıcılar, uluslararası kuruluşlar (Dünya Bankası, OECD, ITC), yatırımcılar, KOBİ dernekleri.')}</p>
              </div>
            </div>
          </div>

          {/* 2 & 3. Kategoriler ve Göstergeler */}
          <div>
            <SectionHeader title="2 & 3. Kategoriler ve Alt Göstergeler" icon={BarChart2} />
            <p className="text-gray-700 mb-6">{t('Toplam 7 ana kategori (ağırlıklar toplamı %100). Ağırlıklar, çok kriterli karar verme yöntemi (AHP) ile 15 uzmanın görüşü alınarak belirlenmiştir.')}</p>
            
            <div className="space-y-6">
              {categories.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
              <Info className="text-fintech-amber shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-gray-700">
                <strong>{t('Not')}:</strong> {t('Kategori 7, doğrudan bir başarı göstergesi değil, güvenilirlik ağırlığıdır. Verisi eksik veya düşük kaliteli ülkelerin puanlarını aşağı çeker.')}
              </p>
            </div>
          </div>

          {/* 4. Hesaplama Yöntemi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="4. Hesaplama Yöntemi (Adım Adım)" icon={Calculator} />
            
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 1 – Normalizasyon')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Her gösterge için min-max normalizasyonu yapılır (0=en kötü, 100=en iyi). Yönü ters olan göstergeler (ör. kesinti süresi, personel devri) önce ters kodlanır.')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  X_norm = ((X_actual - X_min) / (X_max - X_min)) × 100
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 2 – Kategori Puanlarının Hesaplanması')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Her kategori içindeki normalleştirilmiş göstergeler aritmetik ortalama ile birleştirilir (eşit ağırlık alt göstergeler arasında).')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  C_k = (1 / n_k) * Σ X_norm,i
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 3 – Veri Kalitesi Düzeltmesi (Kategori 7)')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Eğer ülke için eksik veri oranı > %20 veya ortalama veri yaşı > 3 yıl ise ceza uygulanır.')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  C_7 = 100 × (1 - (missing_rate / 100)) × (1 - (max(0, avg_age - 3) / 10))<br/>
                  Q = C_7 / 100
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 4 – Ağırlıklı Toplam (Ham Endeks Puanı)')}</h4>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  G-SBE_raw = Σ (w_k × C_k)
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-300">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">5</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 5 – Veri Kalitesi ile Düzeltilmiş Nihai Puan')}</h4>
                <p className="text-sm text-gray-700 mb-3">{t('Sonuç 0-100 arasında bir puandır. 100’e yakın = en başarılı KOBİ ekosistemi.')}</p>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-fintech-charcoal overflow-x-auto">
                  G-SBE_final = G-SBE_raw × Q
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-transparent">
                <div className="absolute -left-3 top-0 bg-fintech-gray text-fintech-charcoal w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm">6</div>
                <h4 className="font-bold text-fintech-charcoal text-lg mb-2">{t('Adım 6 – Sektörel ve Mikro İşletme Alt Endeksleri (Opsiyonel)')}</h4>
                <p className="text-sm text-gray-700">{t('Endeks, isteğe bağlı olarak imalat, hizmet, ticaret sektörleri için ayrı ayrı hesaplanabilir. Ayrıca mikro işletmeler (1-9 çalışan) için ağırlıklar değiştirilerek özel alt endeks türetilebilir.')}</p>
              </div>
            </div>
          </div>

          {/* 5. Uygulama ve Raporlama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
            <SectionHeader title="5. Uygulama ve Raporlama" icon={FileText} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-fintech-charcoal mb-4 border-b pb-2">{t('Genel Bilgiler')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Periyot')}:</strong> {t('Yıllık (her yıl Nisan ayında güncellenir).')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Ülke Kapsamı')}:</strong> {t('Veri kaynaklarına erişim sağlanabilen tüm ülkeler (en az 120 ülke).')}</span>
                  </li>
                </ul>

                <h4 className="font-bold text-fintech-charcoal mb-4 mt-6 border-b pb-2">{t('Güvenilirlik Testleri')}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Duyarlılık analizi')}:</strong> {t('Ağırlıklar ±%10 değiştirildiğinde sıralama değişimi < %5.')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('İç tutarlılık')}:</strong> {t('Cronbach alfa > 0.7.')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <AlertTriangle size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    <span><strong>{t('Dış geçerlilik')}:</strong> {t('Ülke GSYH büyümesi ile korelasyon kontrolü.')}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-fintech-charcoal mb-4 border-b pb-2">{t('Yayınlanacak Çıktılar')}</h4>
                <div className="bg-white rounded-lg p-5">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold">1</div>
                      <span className="text-gray-700 font-medium">{t('Ana endeks sıralaması')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold">2</div>
                      <span className="text-gray-700 font-medium">{t('7 kategori altında ülke profilleri')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold">3</div>
                      <span className="text-gray-700 font-medium">{t('Zaman serisi grafikleri')}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-fintech-gray text-fintech-charcoal flex items-center justify-center font-bold">4</div>
                      <span className="text-gray-700 font-medium">{t('Politika öneri raporu (zayıf kategorilere göre)')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gee' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-fintech-primary to-fintech-charcoal rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Calculator size={32} className="text-red-200" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{t('Girişimcilik Ekosistem Etkisi (GEE)')}</h1>
                <p className="text-red-200 font-medium mt-1">{t('Yöntem 1: Ağırlıklı Katkı Modeli')}</p>
              </div>
            </div>
            <p className="text-red-50 max-w-3xl leading-relaxed opacity-90">
              {t('Bu araç, G-SBE, YEPE ve Yaşam Tarzı Metriklerini kullanarak bir ülkenin girişimcilik potansiyelini tahmin eder.')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover-card">
              <h3 className="text-xl font-bold text-fintech-charcoal mb-6 flex items-center gap-2">
                <BarChart2 className="text-fintech-coral" size={24} />
                {t('Veri Girişi')}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('G-SBE Puanı')} (0-100)</label>
                  <input 
                    type="range" min="0" max="100" 
                    value={geeInputs.gsbe} 
                    onChange={(e) => setGeeInputs({...geeInputs, gsbe: Number(e.target.value)})}
                    className="w-full h-2 bg-fintech-gray rounded-lg appearance-none cursor-pointer accent-fintech-coral"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
                    <span>0</span>
                    <span className="text-fintech-coral text-sm">{geeInputs.gsbe}</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('YEPE Puanı')} (0-100)</label>
                  <input 
                    type="range" min="0" max="100" 
                    value={geeInputs.yepe} 
                    onChange={(e) => setGeeInputs({...geeInputs, yepe: Number(e.target.value)})}
                    className="w-full h-2 bg-fintech-gray rounded-lg appearance-none cursor-pointer accent-fintech-coral"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
                    <span>0</span>
                    <span className="text-fintech-coral text-sm">{geeInputs.yepe}</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('Yaşam Tarzı Metrikleri (LHS) Puanı')} (0-100)</label>
                  <input 
                    type="range" min="0" max="100" 
                    value={geeInputs.lhs} 
                    onChange={(e) => setGeeInputs({...geeInputs, lhs: Number(e.target.value)})}
                    className="w-full h-2 bg-fintech-gray rounded-lg appearance-none cursor-pointer accent-fintech-coral"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
                    <span>0</span>
                    <span className="text-fintech-coral text-sm">{geeInputs.lhs}</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('Gerçek Girişimcilik Endeksi (GEM/GEI)')} (0-100)</label>
                  <input 
                    type="number" min="0" max="100" 
                    value={geeInputs.actualGem} 
                    onChange={(e) => setGeeInputs({...geeInputs, actualGem: Number(e.target.value)})}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-fintech-coral outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-fintech-charcoal text-white rounded-xl shadow-xl p-8 border border-fintech-charcoal/30">
                <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-6">{t('Hesaplanan GEE')}</h3>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="text-7xl font-black tracking-tighter text-fintech-amber tabular-nums">
                    {estimated.toFixed(1)}
                  </div>
                  <div className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">{t('Tahmini GEE Puanı')}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{t('Gerçek GEM')}</p>
                    <p className="text-2xl font-black text-white">{geeInputs.actualGem.toFixed(1)}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{t('Fark')}</p>
                    <p className={`text-2xl font-black ${diff >= 0 ? 'text-fintech-teal' : 'text-fintech-coral'}`}>
                      {diff >= 0 ? '+' : ''}{diff.toFixed(1)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-fintech-coral/10 rounded-xl border border-fintech-coral/20">
                  <h4 className="text-xs font-bold text-fintech-amber uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info size={14} /> {t('Analiz Notu')}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {diff >= 0 
                      ? t('Gerçek endeks tahminden yüksek. Bu, eğitim sistemi veya kültürel normlar gibi ek faktörlerin girişimciliği pozitif etkilediğini gösterir.')
                      : t('Gerçek endeks tahminden düşük. Bu, ekosistem potansiyelinin tam olarak kullanılamadığını veya makroekonomik engellerin olduğunu gösterebilir.')
                    }
                  </p>
                </div>
              </div>

              {/* Weights Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
                <h4 className="text-sm font-bold text-fintech-charcoal mb-4 flex items-center gap-2">
                  <Scale size={18} className="text-fintech-coral" /> {t('Ağırlıklar')}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div className="text-xs">
                      <p className="font-bold text-fintech-charcoal">G-SBE</p>
                      <p className="text-gray-500">{t('İnovasyon, finansmana erişim, dijitalleşme, ekosistem desteği')}</p>
                    </div>
                    <span className="font-black text-gray-700">%40</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div className="text-xs">
                      <p className="font-bold text-fintech-charcoal">YEPE</p>
                      <p className="text-gray-500">{t('Yerel ekonomi bağlantıları, altyapı, sosyal uyum, kayıt dışılık')}</p>
                    </div>
                    <span className="font-black text-gray-700">%35</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div className="text-xs">
                      <p className="font-bold text-fintech-charcoal">LHS</p>
                      <p className="text-gray-500">{t('Özerklik, iş-yaşam dengesi, finansal dayanıklılık')}</p>
                    </div>
                    <span className="font-black text-gray-700">%25</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-[10px] font-mono text-gray-500 text-center">
                    {t('Formül')}: GEE = (0.40 × G-SBE) + (0.35 × YEPE) + (0.25 × LHS)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Methods 2 & 3 Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
              <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-fintech-coral" /> {t('Yöntem 2: Çoklu Doğrusal Regresyon')}
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                {t('Bu yöntem, geçmiş verileri kullanarak endeksler arasındaki ilişkiyi istatistiksel olarak modeller.')}
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-[11px] text-fintech-charcoal mb-4">
                GEI = β₀ + β₁(G-SBE) + β₂(YEPE) + β₃(LHS) + ε
              </div>
              <ul className="text-xs text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-fintech-coral mt-0.5" />
                  <span>{t('Daha bilimsel ve veriye dayalı ağırlıklandırma sağlar.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-fintech-coral mt-0.5" />
                  <span>{t('Hangi faktörün girişimciliği daha çok tetiklediğini (katsayılar) gösterir.')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
              <h4 className="font-bold text-fintech-charcoal mb-4 flex items-center gap-2">
                <Map size={20} className="text-fintech-coral" /> {t('Yöntem 3: Bileşen Bazlı Hizalama')}
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                {t('Endekslerin alt bileşenlerini girişimcilik ekosisteminin spesifik alanlarıyla eşleştirir.')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] p-2 bg-red-50 rounded border border-red-50">
                  <span className="font-bold">{t('G-SBE (İnovasyon)')}</span>
                  <span className="text-fintech-coral">→</span>
                  <span className="font-bold">{t('GEI (Ürün İnovasyonu)')}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] p-2 bg-gray-50 rounded border border-gray-200">
                  <span className="font-bold">{t('YEPE (Altyapı)')}</span>
                  <span className="text-gray-500">→</span>
                  <span className="font-bold">{t('GEI (Fiziksel Altyapı)')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lifestyle' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-fintech-primary to-fintech-teal rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Store size={32} className="text-teal-200" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight">{t('Yaşam Tarzı & KOBİ Metrikleri')}</h1>
                <p className="text-teal-200 font-medium mt-1">{t('Sürdürülebilir işletmeler ve yerel ekonomi için performans göstergeleri')}</p>
              </div>
            </div>
            <p className="text-teal-100 max-w-3xl leading-relaxed opacity-90">
              {t('Bu bölüm, sürdürülebilir gelir, özerklik ve toplumsal istikrar hedefleyen KOBİ ve yaşam tarzı işletmeleri için kritik başarı metriklerini içerir. Organik büyüme, karlılık ve yaşam kalitesi odaklı işletmeler için özelleştirilmiştir.')}
            </p>
            <div className="mt-6">
              <p className="text-sm text-teal-200 font-bold uppercase tracking-widest mb-2">{t('Değerlendirme Aracı')}</p>
              <div className="inline-flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <Heart className="text-teal-300" size={24} />
                <div>
                  <p className="text-sm font-bold text-white">{t('LHS Sağlık Taraması')}</p>
                  <p className="text-xs text-teal-200">{t('İşletmenizin sürdürülebilirlik karnesini ölçün.')}</p>
                </div>
                <div className="ml-4 px-4 py-2 bg-gray-500 text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-lg">
                  {t('Anketler Bölümünde')}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics Section */}
          <div className="mt-16 space-y-12">
            <SectionHeader title="Yaşam Tarzı & KOBİ Metrikleri Detayları" icon={List} />
            
            {lifestyleMetrics.map((cat, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="text-xl font-black text-fintech-charcoal border-l-4 border-teal-600 pl-4 py-1 bg-gray-50/50 rounded-r-lg">
                  {t(cat.category)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cat.metrics.map((metric, mIdx) => (
                    <MetricCard key={mIdx} {...metric} />
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-12 hover-card">
              <SectionHeader title="Metodolojik Arka Plan" icon={FileText} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-black text-fintech-charcoal mb-3">{t('Ağırlıklandırma Mantığı')}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('Ağırlıklar, yaşam tarzı işletmelerinin en büyük riski olan "finansal kırılganlık" ve en büyük vaadi olan "yaşam kalitesi" dengesini korumak üzere kurgulanmıştır. Finansal özerklik (%30) ve Yaşam Kalitesi (%25) toplamda endeksin yarısından fazlasını oluşturur.')}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-black text-fintech-charcoal mb-3">{t('Veri Toplama Stratejisi')}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {t('Bu endeks tamamen "mikro" verilere dayanır. İşletme sahibinin beyanı ve finansal kayıtları temel alınır. Diğer endekslerin (G-SBE, YEPE) aksine, doğrudan bireysel işletme performansını yansıtır.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmeMetrics;

