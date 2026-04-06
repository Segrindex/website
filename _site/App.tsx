
import React, { useState, useEffect } from 'react';
import Overview from './components/Overview';
import QuadrantAnalysis from './components/QuadrantAnalysis';
import Comparison from './components/Comparison';
import Calculator from './components/Calculator';
import TypologyAnalysis from './components/TypologyAnalysis';
import RiskAnalysis from './components/RiskAnalysis';
import DataResources from './components/DataResources';
import DeepAnalysis from './components/DeepAnalysis';
import CountryDetail from './components/CountryDetail';
import UnicornAnalysis from './components/UnicornAnalysis';
import ExtendedAnalysis from './components/ExtendedAnalysis';
import HowToCalculate from './components/HowToCalculate';
import StartupMetrics from './components/StartupMetrics';
import SmeMetrics from './components/SmeMetrics';
import { ErrorBoundary } from './components/ErrorBoundary';
import AccessGate from './components/AccessGate';
import LinkGeneratorModal from './components/LinkGeneratorModal';
import { validateToken, checkSessionAccess, grantSessionAccess } from './accessUtils';
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
  ChevronLeft,
  TrendingUp,
  Globe,
  HelpCircle,
  Zap,
  Store,
  Link
} from 'lucide-react';
import { useIsFetching } from '@tanstack/react-query';

const LiveDataBadge = () => {
  const isFetching = useIsFetching();
  const isUpdating = isFetching > 0;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 border shadow-md ${isUpdating ? 'bg-green-100 text-green-900 border-green-400' : 'bg-slate-200 text-slate-700 border-slate-400'}`}>
        <div className={`w-2.5 h-2.5 rounded-full ${isUpdating ? 'bg-green-600 animate-pulse' : 'bg-slate-500'}`}></div>
        <span className="text-[11px] font-black uppercase tracking-wider">
            {isUpdating ? 'VERİLER GÜNCELLENİYOR' : 'CANLI SİSTEM'}
        </span>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  useEffect(() => {
    if (checkSessionAccess()) {
      setIsAuthorized(true);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access');
    if (token && validateToken(token)) {
      grantSessionAccess();
      setIsAuthorized(true);
      const url = new URL(window.location.href);
      url.searchParams.delete('access');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard, color: 'text-blue-800', bg: 'bg-blue-100' },
    { id: 'how-to', label: 'Nasıl Hesaplanır?', icon: HelpCircle, color: 'text-orange-800', bg: 'bg-orange-100' },
    { id: 'startup-metrics', label: 'Startup Metrikleri', icon: Zap, color: 'text-indigo-800', bg: 'bg-indigo-100' },
    { id: 'sme-metrics', label: 'KOBİ Metrikleri', icon: Store, color: 'text-emerald-800', bg: 'bg-emerald-100' },
    { id: 'details', label: 'Ülke Detay', icon: FileText, color: 'text-emerald-800', bg: 'bg-emerald-100' },
    { id: 'extended', label: 'Küresel Meta-Analiz', icon: Globe, color: 'text-cyan-800', bg: 'bg-cyan-100' },
    { id: 'quadrant', label: 'Kadran Analizi', icon: PieChart, color: 'text-purple-800', bg: 'bg-purple-100' },
    { id: 'unicorn', label: 'Unicorns', icon: Rocket, color: 'text-pink-800', bg: 'bg-pink-100' },
    { id: 'compare', label: 'Karşılaştırma', icon: BarChart2, color: 'text-orange-800', bg: 'bg-orange-100' },
    { id: 'calculator', label: 'Hesaplama Aracı', icon: CalcIcon, color: 'text-indigo-800', bg: 'bg-indigo-100' },
    { id: 'typology', label: 'Tipolojiler', icon: Users, color: 'text-teal-800', bg: 'bg-teal-100' },
    { id: 'deep-dive', label: 'Yapay Zeka Analizi', icon: Sparkles, color: 'text-amber-800', bg: 'bg-amber-100' },
    { id: 'risk', label: 'SEGRİ-SRKA (Risk)', icon: ShieldAlert, color: 'text-red-800', bg: 'bg-red-100' },
    { id: 'resources', label: 'Veri Kaynakları', icon: Database, color: 'text-slate-800', bg: 'bg-slate-100' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'how-to': return <HowToCalculate />;
      case 'startup-metrics': return <StartupMetrics />;
      case 'sme-metrics': return <SmeMetrics />;
      case 'details': return <CountryDetail />;
      case 'extended': return <ExtendedAnalysis />;
      case 'quadrant': return <QuadrantAnalysis />;
      case 'unicorn': return <UnicornAnalysis />;
      case 'compare': return <Comparison />;
      case 'calculator': return <Calculator />;
      case 'typology': return <TypologyAnalysis />;
      case 'deep-dive': return <DeepAnalysis />;
      case 'risk': return <RiskAnalysis />;
      case 'resources': return <DataResources />;
      default: return null;
    }
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  if (!isAuthorized) {
    return <AccessGate />;
  }

  return (
    <div className="flex h-screen w-full bg-[#f1f5f9] overflow-hidden text-slate-900 font-sans">
      
      <aside 
        className={`sidebar-transition relative flex flex-col bg-white border-r border-slate-300 z-40 h-full shadow-2xl ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        <div className={`h-16 flex items-center px-6 border-b border-slate-200 flex-shrink-0 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-blue-800 text-white flex-shrink-0 shadow-lg`}>
              <TrendingUp size={24} />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden whitespace-nowrap">
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">SEGRİ</h1>
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest mt-1">Girişimcilik Paneli</p>
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
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center transition-all duration-200 rounded-xl group relative h-12
                  ${isSidebarOpen ? 'px-4' : 'justify-center px-0'}
                  ${isActive 
                    ? 'bg-blue-800 text-white font-bold shadow-lg' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
              >
                <Icon size={20} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`} />
                {isSidebarOpen && (
                  <span className="ml-3 text-sm font-bold truncate">{tab.label}</span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                    {tab.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
           <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full h-10 flex items-center justify-center rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-950 hover:border-slate-500 transition-all shadow-md active:scale-95"
           >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <header className="bg-white border-b border-slate-300 h-16 flex items-center justify-between px-8 flex-shrink-0 z-30 shadow-md">
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${activeTabData?.bg || 'bg-blue-100'} hidden sm:flex items-center justify-center shadow-inner border border-slate-200`}>
                    {activeTabData && <activeTabData.icon size={20} className={activeTabData.color} />}
                </div>
                <div>
                   <h2 className="text-xl font-black text-slate-950 leading-tight tracking-tight">{activeTabData?.label}</h2>
                   <div className="text-[10px] text-slate-600 font-black uppercase tracking-wider hidden sm:block">Metodoloji / {activeTabData?.id}</div>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <LiveDataBadge />
                <button
                  onClick={() => setShowLinkModal(true)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-800 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-900 active:scale-95 transition-all shadow-md"
                >
                  <Link size={14} />
                  <span>Erişim Linki</span>
                </button>
                <div className="h-8 w-px bg-slate-300 hidden md:block"></div>
                <div className="hidden md:flex items-center gap-3">
                   <div className="text-right">
                       <p className="text-sm font-black text-slate-950 leading-none">Selçuk Ergin</p>
                       <p className="text-[10px] font-black text-slate-600 uppercase mt-1 tracking-tight">Analiz Uzmanı</p>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-800 to-indigo-900 flex items-center justify-center text-white font-black shadow-lg border-2 border-white">
                      SE
                   </div>
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#f8fafc] scroll-smooth">
          <div className="p-6 md:p-10 w-full">
            <div className="max-w-[1600px] mx-auto">
              <ErrorBoundary>
                  {renderContent()}
              </ErrorBoundary>
              
              <footer className="mt-16 py-10 border-t border-slate-300">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                      SEGRİ ANALİZ PANELI © 2025
                    </p>
                    <p className="text-sm text-slate-700 mt-2 font-medium max-w-md leading-relaxed">Selçuk Ergin tarafından geliştirilen girişimcilik metodolojisini temel alan analiz platformudur.</p>
                  </div>
                  <div className="flex items-center gap-8 text-xs font-black text-slate-500 uppercase tracking-tight">
                    <span className="hover:text-blue-800 cursor-pointer transition-colors">Yasal Uyarı</span>
                    <span className="hover:text-blue-800 cursor-pointer transition-colors">Metodoloji</span>
                    <span className="px-3 py-1 bg-slate-200 rounded-full text-slate-700">v2.5 PRO</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
      {showLinkModal && <LinkGeneratorModal onClose={() => setShowLinkModal(false)} />}
    </div>
  );
};

export default App;
