import React from 'react';
import { Rocket, TrendingUp, DollarSign, Users, Target, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MetricCard = ({ title, description, whyImportant, howToMeasure, source, target, frequency, icon: Icon }: any) => {
  const { t } = useLanguage();
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 hover-card">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 rounded-lg bg-red-50 text-gray-700">
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

const SectionHeader = ({ title, icon: Icon }: any) => {
  const { t } = useLanguage();
  return (
  <div className="flex items-center gap-3 mb-6 mt-10 pb-2 border-b border-gray-200">
    <Icon className="text-gray-700" size={28} />
    <h2 className="text-2xl font-black text-fintech-charcoal tracking-tight">{t(title)}</h2>
  </div>
)};

const StartupMetrics: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-fintech-charcoal to-fintech-charcoal rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <Rocket size={32} className="text-red-200" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">{t('Yüksek Büyüme Startup Metrikleri')}</h1>
            <p className="text-red-200 font-medium mt-1">{t('Venture-scale girişimler için performans göstergeleri')}</p>
          </div>
        </div>
        <p className="text-red-50 max-w-3xl leading-relaxed opacity-90">
          {t('Bu bölüm, hızlı ölçeklenme, exit potansiyeli ve pazar hakimiyeti hedefleyen girişimler için kritik başarı metriklerini içerir. Agresif büyüme (10x-100x) ve yüksek risk-yüksek getiri profiline sahip girişimler için özelleştirilmiştir.')}
        </p>
      </div>

      {/* A. BÜYÜME & HAYATTA KALMA */}
      <div>
        <SectionHeader title="A. Büyüme & Hayatta Kalma" icon={TrendingUp} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="1. Kişi Başına Startup Kurulum Oranı"
            description="100.000 kişi başına yeni kurulan startup sayısı"
            icon={Users}
            whyImportant={[
              "Büyük şehirlerin ham sayıları yanıltıcıdır",
              "Girişimciliğin kültürel olarak yerleşip yerleşmediğini gösterir",
              "Şehrinizin akranlarına göre performansını ölçer"
            ]}
            howToMeasure="(1 Yılda Kurulan Startup Sayısı / Toplam Nüfus) × 100,000"
            source="Census Business Patterns, Ticaret Sicil Kayıtları"
            target="Ulusal ortalamanın üzerinde (ABD ort. ~40-50/100k)"
            frequency="Yıllık"
          />
          <MetricCard 
            title="2. 2 ve 5 Yıllık Hayatta Kalma Oranı"
            description="Startup'ların belirli süreler sonra hala faaliyet gösterme yüzdesi"
            icon={ShieldCheck}
            whyImportant={[
              "Küçük işletmelerin %50'si 5 yıl hayatta kalır",
              "Startup'lar daha risklidir (%30-50 hayatta kalma)",
              "Destek sistemlerinin işe yarayıp yaramadığını gösterir"
            ]}
            howToMeasure="(N Yıl Sonra Aktif Şirketler / Başlangıçtaki Şirketler) × 100"
            source="BLS Business Dynamics Statistics, Vergi Kayıtları"
            target="2 yıl: %60+, 5 yıl: %40-50+"
            frequency="Yıllık"
          />
          <MetricCard 
            title="3. Gelir Büyüme Oranı (YoY)"
            description="Startup'ların yıllık gelir artış yüzdesi"
            icon={TrendingUp}
            whyImportant={[
              "Pazar validasyonu = müşteriler ürüne para ödüyor",
              "Pitch yarışmaları değil, ticari çekicilik ölçülür",
              "Yüksek büyüme firmaları istihdamı orantısız yönlendirir"
            ]}
            howToMeasure="((Bu Yıl Geliri - Geçen Yıl Geliri) / Geçen Yıl Geliri) × 100"
            source="IRS Verileri, Anketler, Şirket Beyanları"
            target="Erken: %100+, Growth: %50+ YoY"
            frequency="Yıllık"
          />
        </div>
      </div>

      {/* B. SERMAYE & YATIRIM */}
      <div>
        <SectionHeader title="B. Sermaye & Yatırım" icon={DollarSign} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="4. Series A+ Finansman Turu"
            description="Seed sonrası alınan Series A, B, C turları sayısı ve değeri"
            icon={Target}
            whyImportant={[
              "En temiz ekosistem sağlığı göstergesi",
              "Pre-seed = yerel iyimserlik, Series A = dışsal validasyon",
              "Accelerator başarısını ölçer"
            ]}
            howToMeasure="Yıllık Series A+ sayısı ve toplam değeri"
            source="PitchBook, Crunchbase, SEC Form D"
            target="Seed alanların %20-30'u Series A'ya ulaşmalı"
            frequency="Çeyreklik"
          />
          <MetricCard 
            title="5. Yerel Yatırımcı Katılım Oranı"
            description="Finansman turlarında yerel yatırımcıların katılım yüzdesi"
            icon={Users}
            whyImportant={[
              "Ekosistemler yerel sermaye olmadan çöker",
              "Tüm turlar dışarıdan liderlik ediyorsa mülkiyet ihraç ediliyor",
              "Yerel yatırımcılar uzun vadeli bağlılık gösterir"
            ]}
            howToMeasure="(Yerel Investor Katıldığı Turlar / Toplam Tur Sayısı) × 100"
            source="SEC Form D, AngelList, Yerel Angel Grupları"
            target="Her turda %30-40+ yerel katılım"
            frequency="Çeyreklik"
          />
          <MetricCard 
            title="6. Kamu Fonu Kaldıraç Etkisi"
            description="$1 kamu yatırımına karşılık çekilen özel sektör yatırımı"
            icon={DollarSign}
            whyImportant={[
              "Siyasi olarak en savunulabilir metrik",
              "Çarpan etkisi yaratılıp yaratılmadığını gösterir",
              "Legislators'ların anladığı fiskal dil"
            ]}
            howToMeasure="Toplam Özel Sermaye / Toplam Kamu Sermayesi"
            source="Grant Raporları, Yatırım Veritabanları"
            target="$1 kamu = $3-8+ özel sermaye"
            frequency="Yıllık"
          />
        </div>
      </div>

      {/* C. YETENEK & TUTUNDURMA */}
      <div>
        <SectionHeader title="C. Yetenek & Tutundurma" icon={Users} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="7. Kurucu Tutundurma (3+ Yıl)"
            description="Kurucuların şirket kurduktan sonra 3+ yıl bölgede kalma yüzdesi"
            icon={Target}
            whyImportant={[
              "Tutundurma mı yaratıyorsunuz, churn mu sübvanse ediyorsunuz?",
              "Kurucular seed sonrası ayrılıyorsa 'farm team' konumundasınız",
              "Yetenek kaybı = ekosistem çöküşü"
            ]}
            howToMeasure="(3+ Yıl Kalan Kurucular / Toplam Kurucular) × 100"
            source="LinkedIn, Vergi Kayıtları, Anketler"
            target="%70+ kurucu 3+ yıl kalmalı"
            frequency="Yıllık"
          />
          <MetricCard 
            title="8. İkinci Kez Kurucu Olma Oranı"
            description="Daha önce girişimde bulunanların tekrar yerel girişimde bulunması"
            icon={Rocket}
            whyImportant={[
              "En az değerlendirilen ama en kritik metrik",
              "Başarılı girişimcilerin sonraki ventures'larında başarı oranı daha yüksek",
              "Bu yeteneği tutmak avantajı katlar"
            ]}
            howToMeasure="(İkinci Kez Girişim / İlk Kez Girişim) × 100"
            source="LinkedIn, Anketler, Crunchbase"
            target="İlk nesil kurucuların %40+'ı tekrar denemeli"
            frequency="Yıllık"
          />
          <MetricCard 
            title="9. Kurucu Göçü (Net Migration)"
            description="Bölgeye girişimcilik amacıyla taşınan vs. ayrılan kurucu sayısı"
            icon={Globe}
            whyImportant={[
              "En net yönsel sinyal",
              "İddialı insanlar inşa etmek için taşınıyor mu?",
              "Göç, girişimciliğin katalizörüdür"
            ]}
            howToMeasure="Gelen Kurucu - Giden Kurucu"
            source="Census, LinkedIn Migration Data"
            target="Net pozitif göç (gelenler > gidenler)"
            frequency="Yıllık"
          />
        </div>
      </div>

      {/* D. ETKİ & ÖLÇEK */}
      <div>
        <SectionHeader title="D. Etki & Ölçek" icon={Globe} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetricCard 
            title="10. Startup İstihdam Yaratımı"
            description="Yüksek büyüme startup'larının yarattığı net yeni istihdam"
            icon={Users}
            whyImportant={[
              "Küçük işletmeler genelinden yüksek büyüme firmalarını izole eder",
              "Yüksek büyüme firmaları net istihdamı orantısız yönlendirir",
              "Startup'lar ≠ restoranlar"
            ]}
            howToMeasure="W-2 form sayısı (startup'larda), Net yeni pozisyonlar"
            source="UI Kayıtları, BLS"
            target="Yıllık artış, yüksek büyüme payının artması"
            frequency="Çeyreklik"
          />
          <MetricCard 
            title="11. Yerel Anchor Sözleşmeleri"
            description="Startup'ların büyük yerel kuruluşlarla imzaladığı ticari sözleşmeler"
            icon={Target}
            whyImportant={[
              "Startup'ları gerçek satın alma yollarına bağlar",
              "Anchor kuruluşlar sponsor değil, müşteridir",
              "Kurumsal yoğunluğu sözleşmelere dönüştürmek gerekir"
            ]}
            howToMeasure="Toplam sözleşme sayısı ve değeri ($)"
            source="Kamu Kayıtları, Anketler, TTO'lar"
            target="Yıllık artış"
            frequency="Yıllık"
          />
          <MetricCard 
            title="12. İlk Gelire Ulaşma Süresi"
            description="Şirket kuruluşundan ilk ticari gelire kadar geçen süre"
            icon={Clock}
            whyImportant={[
              "Programları ticari çekiciliğe odaklanmaya zorlar",
              "Product-market fit hızını gösterir",
              "Mentorluk kalitesini test eder"
            ]}
            howToMeasure="Kuruluş tarihinden ilk fatura tarihine kadar geçen ay"
            source="Şirket Beyanları, Anketler"
            target="Ortalama 6-12 ay"
            frequency="6 aylık"
          />
          <MetricCard 
            title="13. Seed'den Series A'ya Geçiş Süresi"
            description="Seed yatırım sonrası Series A'ya ulaşana kadar geçen süre"
            icon={Clock}
            whyImportant={[
              "Sermaye verimliliğini ve hazırlık kalitesini test eder",
              "Süre uzuyorsa mentorluk/pazar uyumu yanlış hizalanmış olabilir"
            ]}
            howToMeasure="Seed tarihi ile Series A tarihi arasındaki ay farkı"
            source="PitchBook, Crunchbase"
            target="18-24 ay"
            frequency="Çeyreklik"
          />
          <MetricCard 
            title="14. Startup Yoğunluğu"
            description="100.000 kişi başına düşen startup sayısı"
            icon={Globe}
            whyImportant={[
              "Ekosistem olgunluğunu akranlarına göre bağlamsallaştırır",
              "Daha anlamlı karşılaştırma sağlar",
              "Kauffman Index bileşeni"
            ]}
            howToMeasure="(Toplam Startup / Nüfus) * 100,000"
            source="Census, Ticaret Sicil"
            target="Bölge demografisine göre realist hedefler"
            frequency="Yıllık"
          />
          <MetricCard 
            title="15. Kurucu Net Promoter Skoru (NPS)"
            description="Kuruculara sorulan: 'Bölgenizde tekrar inşa eder misiniz?'"
            icon={Target}
            whyImportant={[
              "Nitel ekosistem sağlığını ortaya çıkarır",
              "Tavsiye etmiyorlarsa yapısal güven sorunu var",
              "İstatistiksel anlamlılık önemli"
            ]}
            howToMeasure="Anketler (0-10 ölçek)"
            source="Anketler (geniş örneklem)"
            target="Excellent: +50, Good: +30"
            frequency="Yıllık"
          />
        </div>
      </div>
    </div>
  );
};

export default StartupMetrics;
