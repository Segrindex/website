import React, { useState } from 'react';
import { Database, Code, Scale, Globe, Building2, GraduationCap, ShoppingCart, RefreshCw, Gem, Table, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import EEFDataSources from './EEFDataSources';

const DataResources: React.FC = () => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'pillars' | 'eef'>('pillars');
  
  const pillars = [
    {
      id: 1,
      title: "Policy",
      subtitle: t("Politika ve Liderlik"),
      description: t("Regülasyon kalitesi, vergi yükü, kayıt dışılıkla mücadele, veri kalitesi politikaları."),
      icon: Scale,
      color: "blue",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Girişimciler üzerindeki bürokrasi yükü algısı; vergi teşviklerinin yeterliliği; kayıt dışı ekonomiye yönelik toplumsal tolerans"),
          sources: "GEM NES (Uzman Anketi), WB Enterprise Surveys"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("Şirket kurma süresi (gün); toplam vergi yükü (kâr %); kayıt dışı ekonomi tahmini (GSYH %); yolsuzluk algı endeksi (CPI)"),
          sources: "Dünya Bankası B-READY, IMF, Transparency International, OECD"
        }
      ]
    },
    {
      id: 2,
      title: "Finance",
      subtitle: t("Finans"),
      description: t("Geleneksel VC’nin yanında mobil ve dijital finans, kadın girişimcilere finans erişimi, KOBİ’lerin dış finansmana bağımlılığı (özerklik metriği)."),
      icon: Gem,
      color: "green",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Kredi başvurularının reddedilme nedenleri; kadın girişimcilerin finansmana erişim zorluğu; mobil para kullanım sıklığı"),
          sources: "WB Enterprise Surveys, GEM APS, GSMA anketleri"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("VC/GSYH oranı; melek yatırım hacmi; mobil para işlem hacmi/GSYH; KOBİ kredi red oranı; kadın girişimcilere verilen kredilerin payı"),
          sources: "Crunchbase (API), PitchBook, Dünya Bankası, GSMA Intelligence, merkez bankaları"
        }
      ]
    },
    {
      id: 3,
      title: "Culture",
      subtitle: t("Kültür"),
      description: t("Genelleştirilmiş güven (YEPE K6), toplumsal cinsiyet normları (kadın girişimciliğe onay), vergi ahlakı, girişimcilik korkusu detaylandırıldı."),
      icon: Globe,
      color: "purple",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Başarısızlık korkusu (GEM); genelleştirilmiş güven (“çoğu insana güvenirim”); kadın girişimciliğe toplumsal onay; vergi kaçırmayı meşru görme"),
          sources: "WVS, ESS, GEM APS, European Social Survey"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("Hofstede bireycilik skoru; kayıt dışı ekonomi oranı (kültürel bir gösterge olarak); yolsuzluk algısı (CPI)"),
          sources: "Hofstede Insights, IMF, Transparency Int."
        }
      ]
    },
    {
      id: 4,
      title: "Supports",
      subtitle: t("Destekler"),
      description: t("Enerji güvenilirliği (elektrik kesintisi), siber güvenlik hazırlığı, dijital altyapı (sadece internet değil, e-devlet ve e-fatura)."),
      icon: Building2,
      color: "orange",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("İnkübatör/hızlandırıcı memnuniyeti; mentorluk erişimi; siber güvenlik farkındalığı"),
          sources: "StartupBlink (kullanıcı yorumları), ulusal KOBİ anketleri, CERT anketleri"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("Elektrik kesintisi süresi (yıllık saat); lojistik performans endeksi (LPI); siber güvenlik hazırlık endeksi; kuluçka merkezi sayısı/10.000 KOBİ"),
          sources: "WB Enterprise Surveys, Dünya Bankası LPI, ITU, ENISA, ulusal KOBİ ajansları"
        }
      ]
    },
    {
      id: 5,
      title: "Human Capital",
      subtitle: t("İnsan Sermayesi"),
      description: t("Tersine beyin göçü, girişimcilik eğitiminin yaygınlığı (müfredat), yaşam tarzı işletmelerinde çalışan bağlılığı (personel devir hızı)."),
      icon: GraduationCap,
      color: "red",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Girişimcilik eğitimi memnuniyeti; yetenek bulma zorluğu; çalışanların eNPS (Net Tavsiye Skoru)"),
          sources: "GEM APS, OECD Skills Survey, Yaşam Tarzı Metrikleri anketi"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("STEM mezun oranı; R&D personeli sayısı (1000 çalışan başına); personel devir hızı (KOBİ ortalaması); tersine beyin göçü oranı (geri dönen yüksek nitelikli göçmen sayısı)"),
          sources: "UNESCO, OECD, ILO, ulusal göç istatistikleri"
        }
      ]
    },
    {
      id: 6,
      title: "Markets",
      subtitle: t("Pazarlar"),
      description: t("Yerel tedarik oranı (YEPE K1), pazar yoğunlaşması (hakim firmaların payı – G-SBE K6), makroekonomik istikrarsızlığın KOBİ maliyetlerine etkisi."),
      icon: ShoppingCart,
      color: "cyan",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Pazar giriş bariyerleri (algı); yerel tedarikçi bulma kolaylığı; enflasyonun işletme maliyetlerine yansıması (anket)"),
          sources: "WB Enterprise Surveys, GEM Market Dynamics Survey, YEPE mikro anketi"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("Pazar büyüme oranı; ihracat yapan KOBİ oranı; en büyük 3 firmanın pazar payı (yoğunlaşma oranı); enflasyon oranı (tüketici fiyatları)"),
          sources: "Dünya Bankası, IMF, OECD, ITC Trade Map, ulusal rekabet kurumları"
        }
      ]
    },
    {
      id: 7,
      title: "Sustainability & Resilience",
      subtitle: t("Sürdürülebilirlik ve Dirençlilik"),
      description: t("Yeşil dönüşüm, ESG, karbon ayak izi, finansal özerklik (yaşam tarzı işletmeleri), veri kalitesi ve eksik veri yönetimi."),
      icon: RefreshCw,
      color: "emerald",
      data: [
        {
          type: t("Nitel (Anket)"),
          indicators: t("Yeşil sertifika sahipliği; işletmenin karbon ayak izini ölçme eğilimi; sahibin özerklik algısı (dış finansmana bağımlılık)"),
          sources: "Yaşam Tarzı Metrikleri anketi, GEM APS (sürdürülebilirlik modülü)"
        },
        {
          type: t("Nicel (İstatistik)"),
          indicators: t("KOBİ’lerde ESG raporlama oranı; yenilenebilir enerji kullanım oranı; ortalama kaçış süresi (runway); veri kalitesi skoru (eksik veri oranı)"),
          sources: "IEA, IRENA, WB Enterprise Surveys, G-SBE K7, ulusal enerji bakanlıkları"
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/50 p-1.5 rounded-2xl border border-gray-100 w-fit backdrop-blur-sm shadow-sm">
        <button
          onClick={() => setActiveSubTab('pillars')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
            activeSubTab === 'pillars'
              ? 'bg-fintech-charcoal text-white shadow-lg scale-105'
              : 'text-gray-500 hover:bg-gray-100 hover:text-fintech-charcoal'
          }`}
        >
          <Table size={18} />
          {t('7 Temel Veri Sütunu')}
        </button>
        <button
          onClick={() => setActiveSubTab('eef')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
            activeSubTab === 'eef'
              ? 'bg-fintech-charcoal text-white shadow-lg scale-105'
              : 'text-gray-500 hover:bg-gray-100 hover:text-fintech-charcoal'
          }`}
        >
          <List size={18} />
          {t('EEF Veri Kaynakları')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'pillars' ? (
          <motion.div
            key="pillars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Header with Visual Background */}
            <div className="bg-gradient-to-br from-white to-fintech-gray p-8 rounded-xl shadow-sm border border-red-50 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 opacity-5 rotate-12 pointer-events-none">
                  <Database size={200} />
              </div>
              
              <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 text-fintech-charcoal">{t('Girişimcilik Ekosistemi 7 Temel Veri Sütunu')}</h2>
                  <p className="text-gray-700 text-lg">
                      {t('SEGRİ modeli, Isenberg\'in Ekosistem Modeli ile uyumlu 7 ana veri alanından beslenir. Her alan için önerilen nitel (anket) ve nicel (istatistik) veri setleri aşağıdadır.')}
                  </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const colorClasses: any = {
                  blue: "bg-red-50 border-red-50 text-gray-700",
                  green: "bg-gray-50 border-gray-200 text-fintech-charcoal",
                  purple: "bg-gray-50 border-gray-200 text-fintech-charcoal",
                  orange: "bg-red-50 border-red-50 text-gray-700",
                  red: "bg-red-50 border-red-200 text-gray-700",
                  cyan: "bg-gray-50 border-gray-200 text-fintech-charcoal",
                  emerald: "bg-gray-50 border-gray-200 text-fintech-charcoal"
                };

                return (
                  <section key={pillar.id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover-card">
                    <div className={`${colorClasses[pillar.color].split(' ')[0]} p-5 border-b ${colorClasses[pillar.color].split(' ')[1]} flex items-center gap-4`}>
                      <div className={`p-3 ${colorClasses[pillar.color].split(' ')[0].replace('50', '100')} ${colorClasses[pillar.color].split(' ')[2]} rounded-xl shadow-sm`}>
                        <Icon size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-fintech-charcoal tracking-tight">{pillar.id}. {pillar.title} ({pillar.subtitle})</h3>
                        <p className="text-sm font-medium text-gray-700 mt-0.5">{pillar.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-gray-500 uppercase bg-white/50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-4 font-black">{t('Veri Türü')}</th>
                              <th className="px-6 py-4 font-black">{t('Göstergeler')}</th>
                              <th className="px-6 py-4 font-black">{t('Kaynaklar (Güncel)')}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {pillar.data.map((row, idx) => (
                              <tr key={idx} className="hover:bg-white/30 transition-colors">
                                <td className="px-6 py-5 align-top">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.type.includes('Nitel') ? 'bg-amber-100 text-gray-700' : 'bg-red-50 text-gray-700'}`}>
                                    {row.type}
                                  </span>
                                </td>
                                <td className="px-6 py-5 text-gray-700 leading-relaxed max-w-md">
                                  {row.indicators}
                                </td>
                                <td className="px-6 py-5 text-gray-700 font-medium italic">
                                  {row.sources}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Python Snippet Box */}
            <div className="mt-12 bg-fintech-charcoal text-gray-300 p-8 rounded-2xl shadow-2xl border border-gray-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Code size={120} />
                  </div>
                  <div className="flex items-center gap-3 mb-6 text-white relative z-10">
                      <div className="p-2 bg-yellow-400/10 rounded-lg">
                          <Code className="text-yellow-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-black tracking-tight">{t('Python ile Veri Analizi Örneği')}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 max-w-2xl relative z-10">
                      {t('Pandas ve Numpy kullanarak yukarıdaki veri setlerini birleştirip ülke karşılaştırması yapabilirsiniz.')}
                  </p>
                  <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-fintech-primary to-gray-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <pre className="relative bg-black/80 backdrop-blur-xl p-6 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed text-fintech-teal border border-white/10 scrollbar-thin scrollbar-thumb-gray-700">
{`import pandas as pd
import numpy as np

# Örnek Veri Setleri (CSV'den okuma simülasyonu)
policy_data = pd.DataFrame({'Country': ['TR', 'US', 'DE'], 'B_READY_Score': [60, 83, 82]})
finance_data = pd.DataFrame({'Country': ['TR', 'US', 'DE'], 'VC_Per_Capita': [5, 450, 120]})
culture_data = pd.DataFrame({'Country': ['TR', 'US', 'DE'], 'Fear_Failure_Rate': [0.45, 0.30, 0.35]})

# Verileri Birleştirme
df = policy_data.merge(finance_data, on='Country').merge(culture_data, on='Country')

# Normalize Etme (0-100 Skalası)
df['Finance_Norm'] = (df['VC_Per_Capita'] / df['VC_Per_Capita'].max()) * 100
df['Culture_Score'] = (1 - df['Fear_Failure_Rate']) * 100 # Düşük korku = Yüksek skor

# Toplam Ekosistem Skoru Hesaplama (Basit Ağırlıklı Ortalama)
df['Ecosystem_Score'] = (df['B_READY_Score'] * 0.4) + (df['Finance_Norm'] * 0.3) + (df['Culture_Score'] * 0.3)

print(df.sort_values('Ecosystem_Score', ascending=False))
`}
                      </pre>
                  </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="eef"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <EEFDataSources />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataResources;
