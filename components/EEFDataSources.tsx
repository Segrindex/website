import React from 'react';
import { 
  Database, 
  Globe, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  BarChart2, 
  Code, 
  Github, 
  ExternalLink, 
  Info, 
  Star,
  Clock,
  MapPin,
  FileText
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const EEFDataSources: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'financial',
      title: t('1. Finansal EEF'),
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      data: [
        { category: t('Türkiye'), source: t('KAP (Kamuyu Aydınlatma Platformu)'), coverage: t('Türkiye'), update: t('Günlük'), score: 4.5 },
        { category: t('Türkiye'), source: t('TÜBİTAK destekleri'), coverage: t('Türkiye'), update: t('Yıllık'), score: 4.0 },
        { category: t('Türkiye'), source: t('KOSGEB destekleri'), coverage: t('Türkiye'), update: t('Aylık'), score: 4.0 },
        { category: t('Türkiye'), source: t('Melek Yatırım Ağları (TBAA)'), coverage: t('Türkiye'), update: t('6 aylık'), score: 3.5 },
        { category: t('Global'), source: t('World Bank Enterprise Surveys'), coverage: t('150+ ülke (Türkiye dahil)'), update: t('3-5 yılda bir'), score: 4.0 },
        { category: t('Global'), source: t('OECD Financial Statistics'), coverage: t('38 OECD üyesi + partner'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('Crunchbase (açık API)'), coverage: t('100+ ülke (girişim finansmanı)'), update: t('Haftalık'), score: 3.5 },
        { category: t('Global'), source: t('S&P Capital IQ (lisanslı)'), coverage: t('200+ ülke'), update: t('Günlük'), score: 5.0 },
        { category: t('Global'), source: t('SEC EDGAR (ABD)'), coverage: t('ABD'), update: t('Günlük'), score: 5.0 },
        { category: t('Global'), source: t('Companies House (İngiltere)'), coverage: t('İngiltere'), update: t('Günlük'), score: 4.5 },
        { category: t('Global'), source: t('Bundesanzeiger (Almanya)'), coverage: t('Almanya'), update: t('Günlük'), score: 4.5 },
        { category: t('Global'), source: t('MCA (Hindistan)'), coverage: t('Hindistan'), update: t('Günlük'), score: 4.0 },
        { category: t('Global'), source: t('Receita Federal (Brezilya)'), coverage: t('Brezilya'), update: t('Haftalık'), score: 4.0 },
        { category: t('Global'), source: t('METI (Japonya)'), coverage: t('Japonya'), update: t('Aylık'), score: 4.5 },
        { category: t('Global'), source: t('Eurostat (AB ülkeleri)'), coverage: t('27 AB üyesi'), update: t('Yıllık'), score: 4.5 },
      ]
    },
    {
      id: 'market',
      title: t('2. Pazar EEF'),
      icon: BarChart2,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      data: [
        { category: t('Türkiye'), source: t('TÜİK (NACE bazlı sektörel veri)'), coverage: t('Türkiye'), update: t('Aylık / Yıllık'), score: 4.5 },
        { category: t('Türkiye'), source: t('İŞKUR işgücü istatistikleri'), coverage: t('Türkiye'), update: t('Aylık'), score: 4.0 },
        { category: t('Türkiye'), source: t('Google Trends TR'), coverage: t('Türkiye'), update: t('Günlük'), score: 4.0 },
        { category: t('Global'), source: t('Dünya Bankası (World Development Indicators)'), coverage: t('200+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('IMF (Market size & GDP)'), coverage: t('190+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('UN Comtrade (ithalat/ihracat)'), coverage: t('200+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('Eurostat (NACE rev.2)'), coverage: t('27 AB ülkesi'), update: t('Yıllık'), score: 5.0 },
        { category: t('Global'), source: t('OECD STAN (sektörel analiz)'), coverage: t('46 ülke'), update: t('2 yıllık'), score: 4.5 },
        { category: t('Global'), source: t('Dünya Ekonomik Forumu (Rekabetçilik)'), coverage: t('140+ ülke'), update: t('Yıllık'), score: 4.0 },
        { category: t('Global'), source: t('Google Trends (global)'), coverage: t('250+ bölge'), update: t('Günlük'), score: 4.0 },
      ]
    },
    {
      id: 'team',
      title: t('3. Ekip EEF'),
      icon: Users,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      data: [
        { category: t('Türkiye'), source: t('LinkedIn API (kurucu profilleri)'), coverage: t('Türkiye'), update: t('Haftalık'), score: 4.0 },
        { category: t('Türkiye'), source: t('e-Devlet (anonim sigortalı sayısı)'), coverage: t('Türkiye'), update: t('Aylık'), score: 4.5 },
        { category: t('Türkiye'), source: t('YÖK (mezun verileri)'), coverage: t('Türkiye'), update: t('Yıllık'), score: 4.0 },
        { category: t('Global'), source: t('LinkedIn Public Profiles (anonim agregalar)'), coverage: t('200+ ülke'), update: t('Haftalık'), score: 4.0 },
        { category: t('Global'), source: t('Crunchbase (kurucu geçmişi)'), coverage: t('100+ ülke'), update: t('Haftalık'), score: 3.5 },
        { category: t('Global'), source: t('ORCID (araştırmacı geçmişi)'), coverage: t('240+ ülke'), update: t('Günlük'), score: 4.5 },
        { category: t('Global'), source: t('ILO (işgücü eğitim istatistikleri)'), coverage: t('180+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('Eurostat (işgücü anketleri)'), coverage: t('27 AB ülkesi'), update: t('Yıllık'), score: 5.0 },
        { category: t('Global'), source: t('UNESCO (eğitim seviyesi)'), coverage: t('200+ ülke'), update: t('2 yıllık'), score: 4.0 },
      ]
    },
    {
      id: 'innovation',
      title: t('4. İnovasyon EEF'),
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      data: [
        { category: t('Türkiye'), source: t('TPE (patent, faydalı model)'), coverage: t('Türkiye'), update: t('Aylık'), score: 4.5 },
        { category: t('Türkiye'), source: t('Ar-Ge Merkezleri listesi'), coverage: t('Türkiye'), update: t('Yıllık'), score: 4.0 },
        { category: t('Türkiye'), source: t('YÖK Tez veritabanı'), coverage: t('Türkiye'), update: t('Aylık'), score: 4.0 },
        { category: t('Türkiye'), source: t('Web of Science (Türkiye adresli)'), coverage: t('Türkiye'), update: t('Haftalık'), score: 5.0 },
        { category: t('Global'), source: t('WIPO (PCT patentleri)'), coverage: t('193 ülke'), update: t('Yıllık'), score: 5.0 },
        { category: t('Global'), source: t('OECD Patent istatistikleri'), coverage: t('50+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('USPTO (ABD patentleri)'), coverage: t('ABD + uluslararası'), update: t('Haftalık'), score: 5.0 },
        { category: t('Global'), source: t('EPO (Avrupa patentleri)'), coverage: t('38 Avrupa ülkesi'), update: t('Haftalık'), score: 5.0 },
        { category: t('Global'), source: t('JPO (Japonya)'), coverage: t('Japonya'), update: t('Aylık'), score: 4.5 },
        { category: t('Global'), source: t('CNIPA (Çin)'), coverage: t('Çin'), update: t('Aylık'), score: 4.0 },
        { category: t('Global'), source: t('Nature Index (yayın kalitesi)'), coverage: t('80+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('Scopus (araştırma çıktıları)'), coverage: t('240+ ülke'), update: t('Haftalık'), score: 5.0 },
      ]
    },
    {
      id: 'alternative',
      title: t('5. Alternatif / Davranışsal Veri'),
      icon: ShieldCheck,
      color: 'text-green-600',
      bg: 'bg-green-50',
      data: [
        { category: t('Türkiye'), source: t('Kredi kartı harcamaları (anonim, mahalle bazlı)'), coverage: t('Türkiye'), update: t('Aylık'), score: 3.5 },
        { category: t('Türkiye'), source: t('Mobilite verileri (Başakşehir Living Lab vb.)'), coverage: t('Seçili bölgeler'), update: t('Aylık'), score: 3.0 },
        { category: t('Global'), source: t('Google Trends (aramalar, sektörel)'), coverage: t('250+ bölge / ülke'), update: t('Günlük'), score: 4.0 },
        { category: t('Global'), source: t('GEM (Global Entrepreneurship Monitor)'), coverage: t('100+ ülke'), update: t('Yıllık'), score: 4.5 },
        { category: t('Global'), source: t('OpenStreetMap (girişim yoğunluğu)'), coverage: t('Tüm dünya'), update: t('Günlük'), score: 3.5 },
        { category: t('Global'), source: t('WorldPop (nüfus ve ekonomik aktivite)'), coverage: t('200+ ülke'), update: t('Yıllık'), score: 4.0 },
        { category: t('Global'), source: t('Global Data Lab (bölgesel refah)'), coverage: t('150+ ülke'), update: t('Yıllık'), score: 3.5 },
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-fintech-charcoal to-gray-800 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
          <Database size={200} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20">
            <Globe size={14} className="text-fintech-amber" />
            {t('Global Veri Matrisi')}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">
            {t('EEF Veri Kaynakları')}
          </h1>
          <p className="text-lg text-gray-300 font-medium leading-relaxed">
            {t('SEGRİ’nin hesapladığı EEF (Girişimcilik Ekosistem Faktörleri) puanlarının arkasındaki ham verilerin şeffaf, güncel ve çok geniş kaynaklara dayandığını göstermektedir.')}
          </p>
        </div>
      </div>

      {/* Quality Assurance Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4">
            <Star size={24} />
          </div>
          <h3 className="font-black text-fintech-charcoal mb-2">{t('Kalite Güvencesi')}</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {t('Her kaynak için kalite skoru (1-5) güncellik, metodoloji şeffaflığı ve örneklem büyüklüğüne göre hesaplanır.')}
          </p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl w-fit mb-4">
            <Clock size={24} />
          </div>
          <h3 className="font-black text-fintech-charcoal mb-2">{t('Güncelleme Süreci')}</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {t('Otomatik Python scriptleri ile API’lerden veri çekilir. Hata durumunda manuel müdahale ve yedek kaynaklar devreye girer.')}
          </p>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit mb-4">
            <Github size={24} />
          </div>
          <h3 className="font-black text-fintech-charcoal mb-2">{t('Şeffaf Takip')}</h3>
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {t('Tüm kaynak listesi ve kalite matrisi GitHub repo’sundaki Data_Source_Quality_Matrix.csv dosyasında tutulur.')}
          </p>
        </div>
      </div>

      {/* Data Source Tables */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-[2rem] border border-gray-200 shadow-xl overflow-hidden hover-card">
            <div className={`p-6 border-b border-gray-100 flex items-center justify-between ${section.bg}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-white shadow-sm ${section.color}`}>
                  <section.icon size={24} />
                </div>
                <h2 className="text-xl font-black text-fintech-charcoal tracking-tight">{section.title}</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="px-8 py-4">{t('Kategori')}</th>
                    <th className="px-8 py-4">{t('Spesifik Kaynak')}</th>
                    <th className="px-8 py-4">{t('Kapsam')}</th>
                    <th className="px-8 py-4">{t('Güncelleme')}</th>
                    <th className="px-8 py-4 text-center">{t('Kalite Skoru')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {section.data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.category === t('Türkiye') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-fintech-charcoal">{row.source}</td>
                      <td className="px-8 py-5 text-xs text-gray-500 font-medium">{row.coverage}</td>
                      <td className="px-8 py-5 text-xs text-gray-400 font-black uppercase tracking-tight">{row.update}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm font-black text-fintech-charcoal">{row.score.toFixed(1)}</span>
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Country Coverage List */}
      <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-fintech-coral">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-fintech-charcoal tracking-tight">{t('Ülkelerin Kapsam Listesi')}</h2>
            <p className="text-sm text-gray-500 font-medium">{t('En az 3 farklı kategoride düzenli veriye sahip olan 100+ ülke.')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { region: t('Avrupa'), countries: 'Almanya, Avusturya, Belçika, Bulgaristan, Çekya, Danimarka, Estonya, Finlandiya, Fransa, Hırvatistan, Hollanda, İrlanda, İspanya, İsveç, İsviçre, İtalya, Letonya, Litvanya, Lüksemburg, Macaristan, Norveç, Polonya, Portekiz, Romanya, Sırbistan, Slovakya, Slovenya, Türkiye, Ukrayna, Yunanistan, Birleşik Krallık' },
            { region: t('Asya & Pasifik'), countries: 'Avustralya, Çin, Endonezya, Filipinler, Güney Kore, Hindistan, Japonya, Malezya, Pakistan, Singapur, Tayland, Vietnam, Yeni Zelanda' },
            { region: t('Orta Doğu & Afrika'), countries: 'Birleşik Arap Emirlikleri, Güney Afrika, İsrail, Katar, Kenya, Nijerya, Suudi Arabistan, Mısır' },
            { region: t('Amerika'), countries: 'ABD, Arjantin, Brezilya, Kanada, Kolombiya, Meksika, Şili, Uruguay' },
            { region: t('Diğer'), countries: 'Rusya (kısıtlı), Tayvan (bölge)' }
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">{item.region}</h4>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">{item.countries}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
        <Info size={20} className="text-blue-600 mt-1 flex-shrink-0" />
        <p className="text-xs text-blue-900 font-bold leading-relaxed">
          {t('Not: Kaynakların tam listesi, her bir veri setine erişim linki ve son güncelleme tarihleri Data_Source_Quality_Matrix.csv dosyasında (GitHub repo’sunda) tutulmaktadır. Bu dosya her ay otomatik olarak güncellenir.')}
        </p>
      </div>
    </div>
  );
};

export default EEFDataSources;
