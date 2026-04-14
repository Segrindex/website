import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Globe, Users, ArrowRightLeft, BrainCircuit } from 'lucide-react';
import { Sankey, Tooltip as RechartsTooltip, ResponsiveContainer, Layer, Rectangle } from 'recharts';

const RAW_DATA = {
  nodes: [
    { nameKey: 'Türkiye' }, // 0
    { nameKey: 'Hindistan' }, // 1
    { nameKey: 'Doğu Avrupa' }, // 2
    { nameKey: 'Brezilya' }, // 3
    { nameKey: 'Silikon Vadisi' }, // 4
    { nameKey: 'Londra' }, // 5
    { nameKey: 'Berlin' }, // 6
    { nameKey: 'Dubai' }, // 7
    { nameKey: 'Singapur' }, // 8
    { nameKey: 'Kanada' }, // 9
  ],
  links: [
    { source: 0, target: 5, value: 500 },
    { source: 0, target: 6, value: 350 },
    { source: 0, target: 4, value: 250 },
    { source: 0, target: 7, value: 200 },
    { source: 0, target: 9, value: 150 },
    { source: 1, target: 4, value: 1800 },
    { source: 1, target: 5, value: 600 },
    { source: 1, target: 7, value: 400 },
    { source: 1, target: 8, value: 350 },
    { source: 2, target: 6, value: 700 },
    { source: 2, target: 5, value: 400 },
    { source: 2, target: 4, value: 200 },
    { source: 3, target: 4, value: 500 },
    { source: 3, target: 5, value: 150 },
    { source: 3, target: 9, value: 100 },
  ]
};

const CustomNode = ({ x, y, width, height, index, payload, containerWidth }: any) => {
  const isOut = x + width > 400; // rough estimate for right side
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle x={x} y={y} width={width} height={height} fill="#0ea5e9" fillOpacity="1" rx={4} />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 8 : x + width + 8}
        y={y + height / 2}
        fontSize="13"
        fontWeight="600"
        fill="#334155"
        alignmentBaseline="middle"
      >
        {payload.name}
      </text>
    </Layer>
  );
};

export const TalentMobilityMap: React.FC = () => {
  const { t } = useLanguage();

  const translatedData = {
    nodes: RAW_DATA.nodes.map(node => ({ name: t(node.nameKey) })),
    links: RAW_DATA.links
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-fintech-gray rounded-lg text-gray-500">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-fintech-charcoal">{t('Yetenek Hareketliliği & Beyin Göçü')}</h2>
            <p className="text-sm text-gray-500">{t('G-SBE (Beyin Göçü Etkisi) çarpanını görselleştirir. Hangi ekosistemin yetenek kaybettiğini veya kazandığını analiz eder.')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-fintech-coral" />
              <h3 className="font-semibold text-gray-700">{t('Net Yetenek Kaybı (Gelişmekte Olan)')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">-3,800</p>
            <p className="text-xs text-gray-500 mt-1">{t('Yıllık ortalama nitelikli yazılımcı/kurucu göçü')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-fintech-coral" />
              <h3 className="font-semibold text-gray-700">{t('En Çok Göç Alan Merkez')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">{t('Silikon Vadisi')}</p>
            <p className="text-xs text-gray-500 mt-1">{t('Küresel yetenek havuzunun %45\'ini çekiyor')}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <ArrowRightLeft className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">{t('Tersine Beyin Göçü Oranı')}</h3>
            </div>
            <p className="text-2xl font-bold text-fintech-charcoal">%8.5</p>
            <p className="text-xs text-gray-500 mt-1">{t('Giden yeteneklerin ekosisteme geri dönme oranı')}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 hover-card">
          <h3 className="text-lg font-bold text-fintech-charcoal mb-6 text-center">{t('Yetenek Akış Haritası (Sankey)')}</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={translatedData}
                node={<CustomNode />}
                nodePadding={40}
                margin={{ left: 100, right: 100, top: 20, bottom: 20 }}
                link={{ stroke: '#bae6fd', strokeOpacity: 0.5 }}
              >
                <RechartsTooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </Sankey>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            {t('Sol taraf yetenek ihraç eden (kaybeden) bölgeleri, sağ taraf ise yetenek ithal eden (kazanan) inovasyon hub\'larını göstermektedir.')}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-fintech-gray rounded-full text-gray-500 shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-900 mb-2">{t('G-SBE ve Tersine Beyin Göçü (Reverse Brain Drain)')}</h3>
              <p className="text-fintech-charcoal leading-relaxed">
                {t('Selçuk Ergin metodolojisinde G-SBE (Beyin Göçü Etkisi), bir ekosistemin ürettiği değeri elinde tutup tutamadığını ölçer. Silikon Vadisi veya Londra gibi merkezler "Yetenek Mıknatısı" olarak çalışırken, gelişmekte olan ekosistemler yetenek kaybeder. Ancak doğru politikalarla (Örn: Tech Visa, vergi avantajları) "Tersine Beyin Göçü" başlatılarak bu eksi çarpan, güçlü bir artı çarpana dönüştürülebilir.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
