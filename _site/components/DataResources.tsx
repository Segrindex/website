import React from 'react';
import { Database, Link, Code, CheckSquare, FileText, Globe, ExternalLink, Building2, Rocket, Gem, Scale, Users, BookOpen, GraduationCap, ShoppingCart } from 'lucide-react';

const DataResources: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header with Visual Background */}
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-sm border border-blue-100 relative overflow-hidden">
        {/* Background Icon Watermark */}
        <div className="absolute -right-6 -top-6 opacity-5 rotate-12 pointer-events-none">
            <Database size={200} />
        </div>
        
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Girişimcilik Ekosistemi 6 Temel Veri Sütunu</h2>
            <p className="text-gray-700 text-lg">
                SEGRİ modeli, Isenberg'in Ekosistem Modeli ile uyumlu 6 ana veri alanından beslenir. 
                Her alan için önerilen nitel (anket) ve nicel (istatistik) veri setleri aşağıdadır.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* 1. Policy & Leadership */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-3">
                 <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Scale size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">1. Policy (Politika ve Liderlik)</h3>
                    <p className="text-xs text-gray-500">Regülasyonlar, Teşvikler ve Liderlik</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Hükümet politikalarının girişimcilik ortamını nasıl şekillendirdiğini kapsar. Isenberg'e göre liderlik (kamu-özel işbirliği) ekosistemi yönlendirir; zayıf politika risk almayı caydırır.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                        <strong>Ölçüm Kriterleri:</strong> Vergi teşvik oranı, bürokrasi seviyesi, girişimcilik politikası endeksi, şirket kurma süresi.
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="World Bank B-READY" 
                        desc="Eski 'Doing Business'. Şirket kurma maliyeti/süresi ve regülasyon verileri." 
                        link="https://www.worldbank.org/en/businessready"
                        tag="CSV İndirilebilir"
                     />
                     <ResourceItem 
                        name="Heritage Foundation Economic Freedom" 
                        desc="Regülasyon özgürlüğü skorları ve yıllık raporlar." 
                        link="https://www.heritage.org/index/"
                        tag="Yıllık Rapor"
                     />
                     <ResourceItem 
                        name="GEM National Expert Survey (NES)" 
                        desc="Politika kalitesi üzerine 50+ ülke uzman anketleri." 
                        link="https://www.gemconsortium.org/data"
                        tag="Anket Verisi"
                     />
                 </div>
             </div>
        </section>

        {/* 2. Finance */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-green-50 p-4 border-b border-green-100 flex items-center gap-3">
                 <div className="p-2 bg-green-100 text-green-700 rounded-lg"><Gem size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">2. Finance (Finans)</h3>
                    <p className="text-xs text-gray-500">Sermaye Erişimi ve Yatırım Derinliği</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Erişilebilir sermaye (VC, kredi, melek yatırımcılar) ekosistemin "yakıtıdır". Finans eksikliği yenilikleri boğar. Fon hacmi ve erişim eşitliği kritik önem taşır.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                        <strong>Ölçüm Kriterleri:</strong> VC/GSYH oranı, erken aşama fonlama yaygınlığı, kişi başı yatırım (per capita investment).
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="Crunchbase / PitchBook" 
                        desc="Unicorn/Startup yatırım verileri, tur büyüklükleri." 
                        link="https://www.crunchbase.com/"
                        tag="API Mevcut"
                     />
                     <ResourceItem 
                        name="OECD Venture Capital Database" 
                        desc="Ülke bazlı VC istatistikleri ve trend analizleri." 
                        link="https://stats.oecd.org/"
                        tag="Ücretsiz Erişim"
                     />
                     <ResourceItem 
                        name="CB Insights Fintech Reports" 
                        desc="Sektörel derinlik ve fintech yatırım raporları." 
                        link="https://www.cbinsights.com/"
                        tag="Ücretli Rapor"
                     />
                 </div>
             </div>
        </section>

        {/* 3. Culture */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-purple-50 p-4 border-b border-purple-100 flex items-center gap-3">
                 <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><Globe size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">3. Culture (Kültür)</h3>
                    <p className="text-xs text-gray-500">Risk Toleransı ve Toplumsal Normlar</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Kültür ekosistemin "ruhudur". Risk toleransı, başarı hikayelerine yaklaşım ve girişimcilik prestiji motivasyonu belirler. Başarısızlık korkusu yüksekse girişim azalır.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                        <strong>Ölçüm Kriterleri:</strong> Başarısızlık korkusu oranı (Fear of Failure), girişimcilik prestiji, kültürel bireycilik endeksi.
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="GEM Adult Population Survey (APS)" 
                        desc="'Fear of Failure' ve algılanan fırsatlar anketi." 
                        link="https://www.gemconsortium.org/data"
                        tag="Global Standart"
                     />
                     <ResourceItem 
                        name="Hofstede Insights" 
                        desc="Kültürel boyutlar (Bireycilik vs Toplumculuk)." 
                        link="https://www.hofstede-insights.com/"
                        tag="Ülke Skorları"
                     />
                     <ResourceItem 
                        name="World Values Survey" 
                        desc="Girişimcilik algısı ve toplumsal değer anketleri." 
                        link="https://www.worldvaluessurvey.org/"
                        tag="Dalga Verisi"
                     />
                 </div>
             </div>
        </section>

        {/* 4. Supports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-orange-50 p-4 border-b border-orange-100 flex items-center gap-3">
                 <div className="p-2 bg-orange-100 text-orange-700 rounded-lg"><Building2 size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">4. Supports (Destekler)</h3>
                    <p className="text-xs text-gray-500">Altyapı ve Profesyonel Hizmetler</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Destekler ekosistemin "iskeletidir". İnkübatörler, hızlandırıcılar, hukuk ve muhasebe hizmetleri girişimcileri korur ve büyümelerini sağlar.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                        <strong>Ölçüm Kriterleri:</strong> İnkübatör/accelerator sayısı, mentorluk erişimi, dijital altyapı kalitesi.
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="StartupBlink Ecosystem Report" 
                        desc="Şehir ve ülke bazlı inkübatör/coworking verileri." 
                        link="https://www.startupblink.com/"
                        tag="Harita Verisi"
                     />
                     <ResourceItem 
                        name="ITU Digital Infrastructure" 
                        desc="İnternet erişimi ve teknolojik altyapı endeksleri." 
                        link="https://www.itu.int/"
                        tag="Altyapı Raporu"
                     />
                     <ResourceItem 
                        name="GIZ Ecosystem Mapping" 
                        desc="Destek hizmetleri ve ekosistem haritalama rehberleri." 
                        link="https://www.giz.de/en/html/index.html"
                        tag="PDF Rehber"
                     />
                 </div>
             </div>
        </section>

        {/* 5. Human Capital */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
                 <div className="p-2 bg-red-100 text-red-700 rounded-lg"><GraduationCap size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">5. Human Capital (İnsan Sermayesi)</h3>
                    <p className="text-xs text-gray-500">Yetenek Havuzu ve Eğitim</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        İnsan sermayesi "yakıtın kaynağıdır". Eğitimli işgücü, yetenek göçü ve teknik beceriler yeniliği mümkün kılar. Yetersizlik büyüme engeli yaratır.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                        <strong>Ölçüm Kriterleri:</strong> Tersine beyin göçü oranı, R&D personel sayısı, girişimcilik eğitimi yaygınlığı.
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="UNESCO Education Indicators" 
                        desc="Tersiyer eğitim ve mezun istatistikleri." 
                        link="http://uis.unesco.org/"
                        tag="CSV İndirilebilir"
                     />
                     <ResourceItem 
                        name="OECD Skills Database" 
                        desc="Yetenek havuzu ve işgücü nitelik istatistikleri." 
                        link="https://www.oecd.org/skills/"
                        tag="Veritabanı"
                     />
                     <ResourceItem 
                        name="World Bank Human Capital Index" 
                        desc="Gelecek nesil verimlilik ve eğitim kalitesi skorları." 
                        link="https://www.worldbank.org/en/publication/human-capital"
                        tag="Yıllık Endeks"
                     />
                 </div>
             </div>
        </section>

        {/* 6. Markets */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-cyan-50 p-4 border-b border-cyan-100 flex items-center gap-3">
                 <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg"><ShoppingCart size={24} /></div>
                 <div>
                    <h3 className="text-lg font-bold text-gray-800">6. Markets (Pazarlar)</h3>
                    <p className="text-xs text-gray-500">Erken Müşteriler ve Küresel Erişim</p>
                 </div>
             </div>
             <div className="p-6 grid md:grid-cols-2 gap-6">
                 <div>
                     <h4 className="font-bold text-sm text-gray-700 mb-2">Detay ve Önemi</h4>
                     <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Bu alan, erken müşteriler, pazar erişimi ve küresel bağlantıları kapsar. Isenberg'e göre, pazarlar ekosistemin "çıktı kapısıdır"; zayıf pazar erişimi, girişimleri izole eder ve büyüme fırsatlarını kaçırtır.
                     </p>
                     <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 mb-4">
                        <strong>Ölçüm Kriterleri:</strong> Pazar büyüme oranı, ihracat odaklı girişim oranı, pazar giriş bariyerleri.
                     </div>
                     <div className="p-3 bg-cyan-50 border-l-2 border-cyan-400 text-xs text-cyan-800 italic rounded-r">
                        <strong>Analiz İpucu:</strong> Pandas ile büyüme trendi hesaplaması yapın (Örn: Türkiye'de startup ihracat oranı %22.8 - orta seviye).
                     </div>
                 </div>
                 <div className="space-y-3">
                     <ResourceItem 
                        name="World Bank Export Indicators" 
                        desc="İhracat hacmi verileri ve ticari göstergeler." 
                        link="https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS"
                        tag="CSV İndirilebilir"
                     />
                     <ResourceItem 
                        name="GEM Market Dynamics Survey" 
                        desc="Pazar erişimi anketleri ve dinamikleri (56 ülke)." 
                        link="https://www.gemconsortium.org/data"
                        tag="Anket Verisi"
                     />
                     <ResourceItem 
                        name="WEF Global Competitiveness Report" 
                        desc="Pazar boyutu ve rekabet skorları." 
                        link="https://www.weforum.org/reports"
                        tag="Yıllık Rapor"
                     />
                 </div>
             </div>
        </section>

      </div>

      {/* Python Snippet Box */}
      <div className="mt-8 bg-gray-900 text-gray-300 p-6 rounded-xl shadow-sm border border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-white">
                <Code className="text-yellow-400" />
                <h3 className="text-xl font-bold">Python ile Veri Analizi Örneği</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">
                Pandas ve Numpy kullanarak yukarıdaki veri setlerini birleştirip ülke karşılaştırması yapabilirsiniz.
            </p>
            <pre className="bg-black p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed text-green-400">
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
  );
};

const ResourceItem = ({ name, desc, link, tag }: any) => (
    <div className="flex items-start justify-between group p-2 hover:bg-gray-50 rounded transition-colors">
        <div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="font-bold text-sm text-blue-700 hover:underline flex items-center gap-1">
                {name} <ExternalLink size={10} className="opacity-50" />
            </a>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
        </div>
        <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded whitespace-nowrap group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
            {tag}
        </span>
    </div>
);

export default DataResources;