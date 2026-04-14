import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Brain, Shield, ShoppingCart, Landmark, Microchip, Leaf, Gamepad2, Cloud } from 'lucide-react';

const SECTORS = [
  { id: 'ai', name: 'Yapay Zeka & Derin Teknoloji', icon: Brain, typology: 'Gandalf Tipi', color: 'bg-fintech-gray text-fintech-charcoal' },
  { id: 'cyber', name: 'Siber Güvenlik', icon: Shield, typology: 'Legolas Tipi', color: 'bg-amber-100 text-gray-700' },
  { id: 'fintech', name: 'Fintek', icon: Landmark, typology: 'Aragorn Tipi', color: 'bg-red-50 text-gray-700' },
  { id: 'ecommerce', name: 'E-ticaret & Teslimat', icon: ShoppingCart, typology: 'Aragorn Tipi', color: 'bg-red-50 text-gray-700' },
  { id: 'biotech', name: 'Biyoteknoloji', icon: Microchip, typology: 'Frodo Tipi', color: 'bg-fintech-gray text-fintech-charcoal' },
  { id: 'saas', name: 'SaaS & B2B', icon: Cloud, typology: 'Legolas Tipi', color: 'bg-amber-100 text-gray-700' },
  { id: 'gaming', name: 'Oyun', icon: Gamepad2, typology: 'Han Solo Tipi', color: 'bg-fintech-gray text-gray-700' },
  { id: 'cleantech', name: 'Temiz Teknoloji', icon: Leaf, typology: 'Galadriel Tipi', color: 'bg-fintech-gray text-fintech-charcoal' },
];

const HEATMAP_DATA = [
  { country: 'ABD', ai: 95, cyber: 85, fintech: 90, ecommerce: 85, biotech: 95, saas: 95, gaming: 80, cleantech: 85 },
  { country: 'İsrail', ai: 85, cyber: 98, fintech: 75, ecommerce: 40, biotech: 70, saas: 80, gaming: 60, cleantech: 65 },
  { country: 'İngiltere', ai: 80, cyber: 75, fintech: 95, ecommerce: 70, biotech: 85, saas: 80, gaming: 75, cleantech: 70 },
  { country: 'Çin', ai: 92, cyber: 80, fintech: 88, ecommerce: 95, biotech: 80, saas: 70, gaming: 90, cleantech: 95 },
  { country: 'Almanya', ai: 75, cyber: 70, fintech: 80, ecommerce: 75, biotech: 80, saas: 85, gaming: 65, cleantech: 90 },
  { country: 'Fransa', ai: 85, cyber: 70, fintech: 75, ecommerce: 70, biotech: 75, saas: 88, gaming: 70, cleantech: 80 },
  { country: 'Kanada', ai: 88, cyber: 75, fintech: 80, ecommerce: 70, biotech: 85, saas: 85, gaming: 75, cleantech: 85 },
  { country: 'Hindistan', ai: 75, cyber: 65, fintech: 85, ecommerce: 90, biotech: 60, saas: 92, gaming: 70, cleantech: 65 },
  { country: 'Singapur', ai: 70, cyber: 65, fintech: 90, ecommerce: 85, biotech: 60, saas: 75, gaming: 60, cleantech: 70 },
  { country: 'Güney Kore', ai: 75, cyber: 70, fintech: 75, ecommerce: 85, biotech: 70, saas: 70, gaming: 88, cleantech: 80 },
  { country: 'Japonya', ai: 80, cyber: 65, fintech: 70, ecommerce: 75, biotech: 85, saas: 75, gaming: 85, cleantech: 85 },
  { country: 'İsviçre', ai: 85, cyber: 80, fintech: 90, ecommerce: 60, biotech: 95, saas: 80, gaming: 50, cleantech: 85 },
  { country: 'İsveç', ai: 75, cyber: 70, fintech: 85, ecommerce: 75, biotech: 80, saas: 85, gaming: 90, cleantech: 95 },
  { country: 'Hollanda', ai: 70, cyber: 75, fintech: 85, ecommerce: 80, biotech: 75, saas: 80, gaming: 65, cleantech: 85 },
  { country: 'Avustralya', ai: 70, cyber: 75, fintech: 80, ecommerce: 75, biotech: 70, saas: 85, gaming: 65, cleantech: 75 },
  { country: 'Brezilya', ai: 50, cyber: 45, fintech: 92, ecommerce: 85, biotech: 40, saas: 65, gaming: 60, cleantech: 55 },
  { country: 'Türkiye', ai: 40, cyber: 35, fintech: 65, ecommerce: 90, biotech: 30, saas: 55, gaming: 95, cleantech: 40 },
  { country: 'Estonya', ai: 60, cyber: 85, fintech: 80, ecommerce: 50, biotech: 40, saas: 90, gaming: 55, cleantech: 60 },
  { country: 'BAE', ai: 65, cyber: 70, fintech: 85, ecommerce: 75, biotech: 50, saas: 65, gaming: 60, cleantech: 75 },
];

const getHeatmapColor = (value: number) => {
  if (value >= 90) return 'bg-fintech-coral text-white';
  if (value >= 75) return 'bg-fintech-amber text-white';
  if (value >= 60) return 'bg-orange-200 text-fintech-charcoal';
  if (value >= 40) return 'bg-red-50 text-gray-700';
  return 'bg-white text-gray-500';
};

export const SectoralHeatmap: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8 animate-fade-in hover-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-fintech-gray text-fintech-charcoal rounded-lg">
          <Brain size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-fintech-charcoal">{t('Sektörel Tipoloji Isı Haritası')}</h2>
          <p className="text-sm text-gray-500">{t('Hangi ekosistemin hangi tipolojiye ve sektöre daha uygun olduğunu gösteren yoğunluk haritası.')}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="p-3 font-semibold text-gray-700 bg-white rounded-tl-lg min-w-[120px]">{t('Ülke')}</th>
              {SECTORS.map(sector => {
                const Icon = sector.icon;
                return (
                  <th key={sector.id} className="p-3 font-semibold text-gray-700 bg-white min-w-[140px] text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Icon size={20} className="text-gray-500" />
                      <span>{t(sector.name)}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${sector.color}`}>
                        {t(sector.typology)}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {HEATMAP_DATA.map((row, idx) => (
              <tr key={row.country} className="border-b border-gray-50 hover:bg-white/50 transition-colors">
                <td className="p-3 font-medium text-fintech-charcoal">{t(row.country)}</td>
                {SECTORS.map(sector => {
                  const value = row[sector.id as keyof typeof row] as number;
                  return (
                    <td key={sector.id} className="p-1">
                      <div className={`w-full h-12 rounded-md flex items-center justify-center font-semibold transition-all ${getHeatmapColor(value)}`}>
                        {value}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-bold text-fintech-charcoal mb-2">{t('Gandalf & Legolas Etkisi')}</h4>
          <p className="text-sm text-fintech-charcoal leading-relaxed">
            {t('Yapay Zeka (ABD) ve Siber Güvenlik (İsrail) gibi derin teknoloji alanları, yüksek Ar-Ge ve uzun vadeli vizyon gerektirir. Bu sektörler Gandalf ve Legolas tipolojilerine uygundur ve ekosistemin teknolojik derinliğini (PIM) artırır.')}
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-900 mb-2">{t('Aragorn Etkisi')}</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t('E-ticaret, Teslimat (Türkiye) ve Fintek (İngiltere) gibi alanlar yüksek risk toleransı (RTC) ve hızlı ölçeklenme gerektirir. Aragorn tipolojisi bu alanlarda baskındır ve ekosistemin ticari hacmini hızla büyütür.')}
          </p>
        </div>
      </div>
    </div>
  );
};
