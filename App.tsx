
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Overview from './components/Overview';
import QuadrantAnalysis from './components/QuadrantAnalysis';
import Calculator from './components/Calculator';
import TypologyAnalysis from './components/TypologyAnalysis';
import RiskAnalysis from './components/RiskAnalysis';
import DataResources from './components/DataResources';
import DeepAnalysis from './components/DeepAnalysis';
import CountryDetail from './components/CountryDetail';
import UnicornAnalysis from './components/UnicornAnalysis';
import CityHubAnalysis from './components/CityHubAnalysis';
import ExtendedAnalysis from './components/ExtendedAnalysis';
import HowToCalculate from './components/HowToCalculate';
import StartupMetrics from './components/StartupMetrics';
import SmeMetrics from './components/SmeMetrics';
import Assessments from './components/Assessments';
import RegionalPerformance from './components/RegionalPerformance';
import ScientificBoard from './components/ScientificBoard';
import DataAnalysis from './components/DataAnalysis';
import NamingSystem from './components/NamingSystem';
import { PolicySimulator } from './components/PolicySimulator';
import { FailureAnalysis } from './components/FailureAnalysis';
import { FunnelAnalysis } from './components/FunnelAnalysis';
import { InvestorExitAnalysis } from './components/InvestorExitAnalysis';
import { TalentMobilityMap } from './components/TalentMobilityMap';
import { TrendProjection } from './components/TrendProjection';
import { LocalSandbox } from './components/LocalSandbox';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useLanguage } from './LanguageContext';
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart2, 
  Calculator as CalcIcon, 
  Users, 
  ShieldAlert, 
  Database, 
  Sparkles, 
  FileText, 
  Rocket,
  Menu,
  X,
  ChevronLeft,
  TrendingUp,
  Globe,
  HelpCircle,
  Zap,
  Store,
  Languages,
  Map as MapIcon,
  ClipboardCheck,
  Table as TableIcon,
  Search,
  MapPin,
  Filter,
  Briefcase,
  BrainCircuit,
  History,
  Sliders,
  ArrowUpRight,
  GraduationCap,
  Info
} from 'lucide-react';
import { useIsFetching } from '@tanstack/react-query';

const LiveDataBadge = () => {
  const isFetching = useIsFetching();
  const isUpdating = isFetching > 0;
  const { t } = useLanguage();

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 border shadow-md ${isUpdating ? 'bg-teal-100 text-teal-900 border-teal-400' : 'bg-gray-200 text-gray-700 border-gray-400'}`}>
        <div className={`w-2.5 h-2.5 rounded-full ${isUpdating ? 'bg-teal-600 animate-pulse' : 'bg-gray-500'}`}></div>
        <span className="text-[11px] font-black uppercase tracking-wider">
            {isUpdating ? t('VERİLER GÜNCELLENİYOR') : t('CANLI SİSTEM')}
        </span>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { t, language, setLanguage } = useLanguage();

  const tabs = [
    // 1. Dashboard & Core Analysis
    { id: 'overview', label: t('Genel Bakış'), icon: LayoutDashboard, color: 'text-fintech-coral', bg: 'bg-red-50', info: t('Bu modül, ekosistemin genel performansını ve anahtar metriklerini özetler.'), category: 'benchmark' },
    { id: 'naming-system', label: t('Üçlü İsimlendirme Sistemi'), icon: Languages, color: 'text-fintech-coral', bg: 'bg-red-50', info: t('Bu modül, SEGRİ isimlendirme standartlarını ve marka kullanım kurallarını detaylandırır.'), isSubTab: true, category: 'validity' },
    { id: 'details', label: t('Ülke Detay'), icon: FileText, color: 'text-gray-500', bg: 'bg-fintech-gray', info: t('Bu modül, seçilen ülkenin tüm endeks verilerini ve derinlemesine analizini sunar.'), category: 'benchmark' },
    { id: 'extended', label: t('Küresel Meta-Analiz'), icon: Globe, color: 'text-fintech-coral', bg: 'bg-red-50', info: t('Bu modül, küresel ölçekte ülkelerin birbirleriyle olan ilişkilerini ve meta-analizini gösterir.'), category: 'benchmark' },
    { id: 'regional-performance', label: t('Bölgesel Performans'), icon: MapIcon, color: 'text-gray-700', bg: 'bg-fintech-gray', info: t('Bu modül, bölgelerin girişimcilik performansını kıyaslar.'), category: 'benchmark' },
    { id: 'trend', label: t('Trend & Projeksiyon'), icon: History, color: 'text-gray-500', bg: 'bg-fintech-gray', info: t('Bu modül, geçmiş veriler ışığında geleceğe yönelik projeksiyonlar ve trend analizleri sunar.'), category: 'benchmark' },

    // 2. Advanced Ecosystem Analysis
    { id: 'quadrant', label: t('Kadran Analizi'), icon: PieChart, color: 'text-fintech-amber', bg: 'bg-amber-50', info: t('Bu modül, ülkeleri IES ve EEF puanlarına göre 4 ana kadranda sınıflandırır.'), category: 'validity' },
    { id: 'hubs', label: t('İnovasyon Hub\'ları'), icon: MapPin, color: 'text-gray-500', bg: 'bg-fintech-gray', info: t('Bu modül, küresel inovasyon merkezlerini ve ekosistem yoğunluklarını harita üzerinde gösterir.'), category: 'benchmark' },
    { id: 'typology', label: t('Tipolojiler'), icon: Users, color: 'text-fintech-amber', bg: 'bg-amber-50', info: t('Bu modül, girişimcilerin karakteristik özelliklerine göre hangi tipolojiye girdiğini analiz eder.'), category: 'validity' },
    { id: 'unicorn', label: t('Unicorns'), icon: Rocket, color: 'text-gray-700', bg: 'bg-fintech-gray', info: t('Bu modül, küresel unicorn dağılımını ve çıkış potansiyellerini inceler.'), category: 'benchmark' },

    // 3. Investment & Talent
    { id: 'funnel', label: t('Erken Aşama Hunisi'), icon: Filter, color: 'text-fintech-amber', bg: 'bg-amber-50', info: t('Bu modül, tohum aşamasından Seri A ve sonrasına geçiş oranlarını ve ekosistem darboğazlarını analiz eder.'), category: 'benchmark' },
    { id: 'investor-exit', label: t('Yatırımcı & Çıkışlar'), icon: Briefcase, color: 'text-gray-700', bg: 'bg-fintech-gray', info: t('Bu modül, yatırımcı iştahını ve başarılı çıkış istatistiklerini gösterir.'), category: 'benchmark' },
    { id: 'talent-mobility', label: t('Yetenek & Beyin Göçü'), icon: BrainCircuit, color: 'text-fintech-charcoal', bg: 'bg-fintech-gray', info: t('Bu modül, yetenek akışını ve küresel yetenek hareketliliğini haritalandırır.'), category: 'benchmark' },

    // 4. Risk & Simulation
    { id: 'failure', label: t('Başarısızlık & Dirençlilik'), icon: ShieldAlert, color: 'text-fintech-coral', bg: 'bg-red-50', info: t('Bu modül, girişimlerin başarısızlık nedenlerini ve ekosistemin dirençlilik kapasitesini ölçer.'), category: 'feedback' },
    { id: 'simulator', label: t('Politika Simülatörü'), icon: TrendingUp, color: 'text-fintech-coral', bg: 'bg-red-50', info: t('Bu modül, farklı politika değişikliklerinin ekosistem üzerindeki olası etkilerini simüle eder.'), category: 'calc' },
    { id: 'local-sandbox', label: t('Yerel Simülasyon'), icon: Sliders, color: 'text-fintech-amber', bg: 'bg-amber-50', info: t('Bu modül, yerel ölçekte SEGRİ parametrelerini test etmenizi sağlar.'), category: 'calc' },

    // 5. Tools & Metrics
    { id: 'calculator', label: t('Hesaplama Aracı'), icon: CalcIcon, color: 'text-white', bg: 'bg-module-calc-light', info: t('Bu modül, bireysel ve ekosistem faktörlerini kullanarak SEGRİ puanınızı anlık olarak simüle etmenizi sağlar.'), category: 'calc' },
    { id: 'startup-metrics', label: t('Startup Metrikleri'), icon: Zap, color: 'text-fintech-coral', bg: 'bg-red-50', category: 'benchmark' },
    { id: 'sme-metrics', label: t('KOBİ Metrikleri'), icon: Store, color: 'text-gray-500', bg: 'bg-fintech-gray', category: 'benchmark' },
    { id: 'deep-dive', label: t('Yapay Zeka Analizi'), icon: Sparkles, color: 'text-gray-700', bg: 'bg-fintech-gray', category: 'benchmark' },

    // 6. Methodology & Data
    { id: 'how-to', label: t('Nasıl Hesaplanır?'), icon: HelpCircle, color: 'text-white', bg: 'bg-module-validity-light', info: t('Bu modül, SEGRİ metodolojisinin bilimsel temellerini ve akademik validasyon süreçlerini açıklar.'), category: 'validity' },
    { id: 'assessments', label: t('Anketler & Değerlendirmeler'), icon: ClipboardCheck, color: 'text-white', bg: 'bg-module-feedback-light', info: t('Bu modül, ekosistem paydaşlarından toplanan anket verilerini ve geri bildirimleri analiz eder.'), category: 'feedback' },
    { id: 'data-analysis', label: t('Veri Analizi & Kıyaslama'), icon: TableIcon, color: 'text-white', bg: 'bg-module-benchmark-light', info: t('Bu modül, 65 puanın iyi olup olmadığını anonim yüzde dilimi ile gösterir.'), category: 'benchmark' },
    { id: 'resources', label: t('Veri Kaynakları'), icon: Database, color: 'text-fintech-charcoal', bg: 'bg-fintech-gray', category: 'benchmark' },

    // 7. Scientific
    { id: 'scientific-board', label: t('Bilimsel Danışma Kurulu'), icon: GraduationCap, color: 'text-white', bg: 'bg-module-validity-light', info: t('Bu modül, SEGRİ metodolojisinin akademik denetimli ve bilimsel temellere dayalı olduğunu garanti eden kurulumuzdur.'), category: 'validity' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'naming-system': return <NamingSystem />;
      case 'trend': return <TrendProjection />;
      case 'local-sandbox': return <LocalSandbox />;
      case 'how-to': return <HowToCalculate />;
      case 'startup-metrics': return <StartupMetrics />;
      case 'sme-metrics': return <SmeMetrics />;
      case 'assessments': return <Assessments />;
      case 'regional-performance': return <RegionalPerformance />;
      case 'scientific-board': return <ScientificBoard />;
      case 'data-analysis': return <DataAnalysis />;
      case 'details': return <CountryDetail />;
      case 'extended': return <ExtendedAnalysis />;
      case 'quadrant': return <QuadrantAnalysis />;
      case 'unicorn': return <UnicornAnalysis />;
      case 'hubs': return <CityHubAnalysis />;
      case 'simulator': return <PolicySimulator />;
      case 'funnel': return <FunnelAnalysis />;
      case 'investor-exit': return <InvestorExitAnalysis />;
      case 'talent-mobility': return <TalentMobilityMap />;
      case 'failure': return <FailureAnalysis />;
      case 'calculator': return <Calculator />;
      case 'typology': return <TypologyAnalysis />;
      case 'deep-dive': return <DeepAnalysis />;
      case 'resources': return <DataResources />;
      default: return null;
    }
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-fintech-charcoal font-sans relative">
      <div className="bg-geometric"></div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-fintech-charcoal/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside 
        className={`sidebar-transition absolute md:relative flex flex-col bg-white border-r border-gray-200 z-40 h-full shadow-2xl transition-all duration-300 ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full md:w-20 md:translate-x-0'}`}
      >
        <div className={`h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-gradient-to-br from-fintech-coral to-fintech-amber text-white flex-shrink-0 shadow-lg`}>
              <TrendingUp size={24} />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden whitespace-nowrap">
                <h1 className="text-2xl font-black tracking-tighter text-fintech-charcoal leading-none font-heading flex items-center gap-2">
                  SEGRİ
                  <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded tracking-normal uppercase shadow-sm">BETA</span>
                </h1>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 flex items-center gap-1.5">
                  {t('Girişimcilik Paneli')}
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center transition-all duration-200 rounded-xl group relative h-12
                  ${isSidebarOpen ? (tab.isSubTab ? 'pl-10 pr-4' : 'px-4') : 'justify-center px-0'}
                  ${isActive 
                    ? 'bg-gradient-to-r from-fintech-coral to-fintech-amber text-white font-bold shadow-md' 
                    : 'text-gray-700 hover:bg-fintech-gray hover:text-fintech-charcoal'
                  }`}
              >
                <Icon size={tab.isSubTab ? 16 : 20} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-fintech-coral'}`} />
                {isSidebarOpen && (
                  <span className={`ml-3 truncate ${tab.isSubTab ? 'text-xs font-semibold' : 'text-sm font-bold'}`}>{tab.label}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-fintech-charcoal text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl hidden md:block">
                    {tab.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-white space-y-2">
           <button 
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-fintech-charcoal hover:border-fintech-primary transition-all shadow-md active:scale-95"
           >
              <Languages size={18} />
              {isSidebarOpen && <span className="text-sm font-bold">{language === 'tr' ? 'English' : 'Türkçe'}</span>}
           </button>
           <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex w-full h-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-fintech-charcoal hover:border-fintech-primary transition-all shadow-md active:scale-95"
           >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden w-full">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-20 shadow-md">
            <div className="flex items-center gap-3 md:gap-4">
                <button 
                  className="md:hidden p-2 -ml-2 text-gray-700 hover:text-fintech-charcoal"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu size={24} />
                </button>
                <div className={`p-2.5 rounded-xl ${activeTabData?.bg || 'bg-red-50'} hidden sm:flex items-center justify-center shadow-inner border border-gray-200`}>
                    {activeTabData && <activeTabData.icon size={20} className={activeTabData.color} />}
                </div>
                <div>
                   <h2 className="text-lg md:text-xl font-black text-fintech-charcoal leading-tight tracking-tight truncate max-w-[200px] sm:max-w-none font-heading">{activeTabData?.label}</h2>
                   <div className="text-[10px] text-gray-500 font-black uppercase tracking-wider hidden sm:block">{t('Tam Metodoloji Rehberi')} / {activeTabData?.label}</div>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <LiveDataBadge />
                <div className="h-8 w-px bg-fintech-gray hidden md:block"></div>
                <div className="hidden md:flex items-center gap-3">
                   <div className="text-right">
                       <p className="text-sm font-black text-fintech-charcoal leading-none">Selçuk Ergin</p>
                       <p className="text-[10px] font-black text-gray-500 uppercase mt-1 tracking-tight">{t('Analiz Uzmanı')}</p>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fintech-coral to-gray-700 flex items-center justify-center text-white font-black shadow-lg border-2 border-white">
                      SE
                   </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-white scroll-smooth">
          <div className="p-6 md:p-10 w-full">
            <div className="max-w-[1600px] mx-auto">
              {activeTabData?.info && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-8 p-6 rounded-3xl text-white shadow-lg border border-white/10 bg-gradient-to-r 
                    ${activeTabData.category === 'benchmark' ? 'from-module-benchmark-light to-module-benchmark-dark' : 
                      activeTabData.category === 'feedback' ? 'from-module-feedback-light to-module-feedback-dark' : 
                      activeTabData.category === 'calc' ? 'from-module-calc-light to-module-calc-dark' : 
                      activeTabData.category === 'validity' ? 'from-module-validity-light to-module-validity-dark' : 
                      'from-fintech-charcoal to-gray-700'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Info size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-relaxed">
                        {activeTabData.info}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <ErrorBoundary>
                  {renderContent()}
              </ErrorBoundary>
              
              <footer className="mt-16 py-10 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="text-left space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-black text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span>{t('© 2026 SEGRİ – Girişimcilik Endeksi')}</span>
                        <span className="text-[8px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded tracking-normal shadow-sm">BETA</span>
                      </div>
                      <span className="hidden sm:inline text-gray-300">|</span>
                      <span className="text-fintech-teal">{t('Bilimsel iterasyon')}</span>
                      <span className="hidden sm:inline text-gray-300">|</span>
                      <a 
                        href="https://github.com/segri-index/methodology/blob/main/CHANGELOG.md" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 bg-gray-100 rounded text-fintech-charcoal hover:bg-fintech-charcoal hover:text-white transition-colors"
                      >
                        SEGRİ v2.7
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      <span>{t('Son güncelleme: Nisan 2026')}</span>
                      <span className="hidden sm:inline text-gray-300">|</span>
                      <a 
                        href="https://github.com/segri-index/methodology/tree/main/changelog" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-fintech-coral transition-colors underline decoration-gray-200 underline-offset-2"
                      >
                        {t('Metodoloji sürüm notları')}
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-xs font-black text-gray-500 uppercase tracking-tight">
                    <span className="hover:text-fintech-coral cursor-pointer transition-colors">{t('Yasal Uyarı')}</span>
                    <a href="https://segrindex.com/" target="_blank" rel="noopener noreferrer" className="hover:text-fintech-coral cursor-pointer transition-colors flex items-center gap-1">
                      {t('Tam Metodoloji Rehberi')} <ArrowUpRight size={14} className="inline" />
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
