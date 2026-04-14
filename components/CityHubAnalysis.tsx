import React, { useState } from 'react';
import { TOP_INNOVATION_HUBS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { MapPin, Building2, Rocket, Gem, TrendingUp, Search, X, Filter } from 'lucide-react';

const CityHubAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', ...Array.from(new Set(TOP_INNOVATION_HUBS.map(hub => hub.region)))];

  const filteredHubs = TOP_INNOVATION_HUBS.filter(hub => {
    const matchesSearch = hub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hub.countryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || hub.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-fintech-charcoal flex items-center gap-2">
              <MapPin className="text-fintech-coral" />
              {t('Şehir ve İnovasyon Hub\'ı Analizi (Micro-Ecosystems)')}
            </h2>
            <p className="text-gray-500 mt-1 max-w-3xl">
              {t('İnovasyon genellikle ülkelerde değil, spesifik şehirlerde ve hub\'larda gerçekleşir. Bir ülkenin genel EEF skoru düşük olsa bile, içindeki bir şehir Legolas veya Gandalf tipi girişimler için mükemmel bir mikro-ekosistem sunabilir.')}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('Şehir veya ülke ara...')}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-fintech-coral outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-fintech-coral outline-none bg-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region} value={region}>{t(region === 'All' ? 'Tüm Bölgeler' : region)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHubs.map(hub => (
            <div key={hub.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col h-full hover-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-fintech-charcoal">{t(hub.name)}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <span className="font-medium">{t(hub.countryName)}</span>
                    <span>•</span>
                    <span>{t(hub.region)}</span>
                  </div>
                </div>
                <div className="bg-red-50 text-gray-700 font-bold px-2.5 py-1 rounded-lg text-sm border border-red-200 flex items-center gap-1">
                  <TrendingUp size={14} />
                  EEF: {hub.EEF.toFixed(1)}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 flex-grow">
                {t(hub.description)}
              </p>

              <div className="space-y-3 mt-auto">
                <div className="flex justify-between items-center text-sm border-t border-gray-200 pt-3">
                  <span className="text-gray-500">{t('Baskın Tipoloji')}</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                    hub.dominantTypology === 'Legolas' ? 'bg-red-50 text-gray-700' :
                    hub.dominantTypology === 'Gandalf' ? 'bg-fintech-gray text-fintech-charcoal' :
                    hub.dominantTypology === 'Aragorn' ? 'bg-red-50 text-gray-700' :
                    hub.dominantTypology === 'Han Solo' ? 'bg-red-50 text-gray-700' :
                    'bg-fintech-gray text-fintech-charcoal'
                  }`}>
                    {t(hub.dominantTypology)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t('Unicorn Sayısı')}</span>
                  <span className="font-bold text-fintech-charcoal flex items-center gap-1">
                    <Gem size={14} className="text-gray-700" />
                    {hub.unicornCount}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t('Startup Sayısı')}</span>
                  <span className="font-bold text-fintech-charcoal flex items-center gap-1">
                    <Rocket size={14} className="text-fintech-coral" />
                    {hub.startupCount.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {hub.keySectors.map(sector => (
                      <span key={sector} className="bg-white border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                        {t(sector)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredHubs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {t('Arama kriterlerine uygun inovasyon hub\'ı bulunamadı.')}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityHubAnalysis;
