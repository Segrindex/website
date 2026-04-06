import React from 'react';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import { COLORS } from '../constants';
import { Rocket, Gem, Trophy, Shield, Building2, Zap } from 'lucide-react';

const getQuadColorDot = (q: string) => {
    if (q === "Iron Man") return "bg-green-500";
    if (q === "Captain America") return "bg-orange-500";
    if (q === "Black Panther") return "bg-purple-500";
    return "bg-blue-500";
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-200 shadow-xl rounded-xl text-sm min-w-[250px] animate-in fade-in zoom-in-95 duration-200 z-50">
        <div className="flex items-center justify-between gap-4 mb-3 border-b border-gray-100 pb-2">
            <p className="font-bold text-gray-900 flex items-center gap-2 text-base">
                <span className="text-2xl" role="img" aria-label={`Flag of ${data.name}`}>{data.flag}</span> 
                {data.name}
            </p>
            <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{data.code}</span>
        </div>
        
        <div className="space-y-2 mb-4">
             <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">SEGRİ Skoru</span>
                <span className="font-bold text-blue-700 text-lg">{data.SEGRI.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${data.SEGRI}%` }}></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg mb-3 border border-gray-100">
            <div>
                <span className="text-xs text-gray-500 block mb-0.5">IES (Bireysel)</span>
                <span className="font-bold text-gray-800 text-base">{data.IES.toFixed(1)}</span>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-500 block mb-0.5">EEF (Ekosistem)</span>
                <span className="font-bold text-gray-800 text-base">{data.EEF.toFixed(1)}</span>
            </div>
            
            {/* Ecosystem Metrics */}
            <div className="col-span-2 border-t border-gray-200 my-1"></div>

            <div className="flex items-center gap-2">
                <div className="p-1 bg-purple-100 text-purple-600 rounded">
                    <Gem size={14} />
                </div>
                <div>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wide leading-none mb-0.5">Unicorns</span>
                    <span className="font-bold text-purple-700">{data.unicornCount}</span>
                </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 text-right">
                <div>
                     <span className="text-[10px] text-gray-500 block uppercase tracking-wide leading-none mb-0.5">Startups</span>
                     <span className="font-bold text-indigo-700">{data.startupCount.toLocaleString()}</span>
                </div>
                <div className="p-1 bg-indigo-100 text-indigo-600 rounded">
                    <Rocket size={14} />
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-2 text-xs">
             <div className="flex items-center gap-2 text-gray-700 bg-white border border-gray-100 p-2 rounded shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${getQuadColorDot(data.quadrant)}`}></div>
                <span className="font-semibold">{data.quadrant}</span>
             </div>
             <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-2 rounded border border-transparent">
                <span className="font-medium">Tipoloji:</span>
                <span>{data.typology}</span>
             </div>
        </div>
      </div>
    );
  }
  return null;
};

const QuadrantAnalysis: React.FC = () => {
  const { data, isLoading, isError, error } = useCountries();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error} />;
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kadran Analizi (IES vs EEF)</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          Bu grafik, ülkelerin <strong>Bireysel Girişimcilik Ruhu (IES)</strong> ve <strong>Ekosistem Destekleyici Faktörler (EEF)</strong> arasındaki dengeyi gösterir. 
          Balonların büyüklüğü <strong>SEGRİ Skorunu</strong> temsil eder.
        </p>
      </div>
      
      <div className="h-[600px] w-full bg-gray-50/50 rounded-xl border border-gray-100 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            
            {/* Axes */}
            <XAxis type="number" dataKey="IES" domain={[40, 100]} name="IES" unit="">
              <Label value="Bireysel Girişimcilik Ruhu (IES) →" offset={0} position="bottom" style={{ fontWeight: 'bold', fill: '#4B5563', fontSize: 14 }} />
            </XAxis>
            <YAxis type="number" dataKey="EEF" domain={[40, 100]} name="EEF" unit="">
              <Label value="Ekosistem Destekleyici Faktör (EEF) →" angle={-90} position="left" style={{ fontWeight: 'bold', fill: '#4B5563', fontSize: 14 }} />
            </YAxis>
            <ZAxis type="number" dataKey="SEGRI" range={[100, 800]} name="SEGRİ Skoru" />
            
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#999' }} />
            <Legend verticalAlign="top" height={36} iconType="circle"/>

            {/* Reference Lines - The Quadrant Dividers */}
            <ReferenceLine x={75} stroke="#374151" strokeWidth={2} strokeDasharray="5 5">
                <Label value="IES Eşiği (75)" position="insideTopRight" angle={90} offset={20} className="text-xs text-gray-500 font-mono font-bold" />
            </ReferenceLine>
            <ReferenceLine y={70} stroke="#374151" strokeWidth={2} strokeDasharray="5 5">
                <Label value="EEF Eşiği (70)" position="insideTopRight" className="text-xs text-gray-500 font-mono font-bold" />
            </ReferenceLine>

            {/* Quadrant Labels Backgrounds */}
            <ReferenceLine x={92} y={95} stroke="none" label={{ value: "IRON MAN", fill: COLORS.ironMan, fontSize: 18, opacity: 0.2, fontWeight: '900' }} />
            <ReferenceLine x={50} y={95} stroke="none" label={{ value: "CAPTAIN AMERICA", fill: COLORS.captainAmerica, fontSize: 18, opacity: 0.2, fontWeight: '900' }} />
            <ReferenceLine x={92} y={45} stroke="none" label={{ value: "BLACK PANTHER", fill: COLORS.blackPanther, fontSize: 18, opacity: 0.2, fontWeight: '900' }} />
            <ReferenceLine x={50} y={45} stroke="none" label={{ value: "SPIDER-MAN", fill: COLORS.spiderMan, fontSize: 18, opacity: 0.2, fontWeight: '900' }} />

            {/* Data Points */}
            <Scatter name="Iron Man (Liderler)" data={data.filter(c => c.quadrant === "Iron Man")} fill={COLORS.ironMan} shape="circle" style={{ cursor: 'pointer' }} />
            <Scatter name="Captain America (Potansiyel)" data={data.filter(c => c.quadrant === "Captain America")} fill={COLORS.captainAmerica} shape="circle" style={{ cursor: 'pointer' }} />
            <Scatter name="Black Panther (Ekosistem)" data={data.filter(c => c.quadrant === "Black Panther")} fill={COLORS.blackPanther} shape="circle" style={{ cursor: 'pointer' }} />
            <Scatter name="Spider-Man (Gelişen)" data={data.filter(c => c.quadrant === "Spider-Man")} fill={COLORS.spiderMan} shape="circle" style={{ cursor: 'pointer' }} />

          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Iron Man */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 transition-all hover:shadow-md hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-green-800 flex items-center gap-2 text-lg">Iron Man</h4>
                <Trophy size={18} className="text-green-600" />
            </div>
            <span className="text-[10px] bg-white text-green-700 px-2 py-1 rounded border border-green-200 uppercase font-bold tracking-wider mb-2 inline-block">Lider & Dayanıklı</span>
            <p className="text-xs text-green-800/80 leading-relaxed font-medium">Hem bireysel yetkinlikleri hem de ekosistem desteği yüksek olan ülkeler. Sürdürülebilir büyüme için ideal denge.</p>
        </div>

        {/* Captain America */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 transition-all hover:shadow-md hover:scale-[1.02]">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-orange-800 flex items-center gap-2 text-lg">Captain America</h4>
                <Shield size={18} className="text-orange-600" />
            </div>
            <span className="text-[10px] bg-white text-orange-700 px-2 py-1 rounded border border-orange-200 uppercase font-bold tracking-wider mb-2 inline-block">Potansiyel Yıldız</span>
            <p className="text-xs text-orange-800/80 leading-relaxed font-medium">Bireysel girişimcilik ruhu yüksek ancak ekosistem (finans, regülasyon) desteği yetersiz kalan ülkeler.</p>
        </div>

        {/* Black Panther */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 transition-all hover:shadow-md hover:scale-[1.02]">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-purple-800 flex items-center gap-2 text-lg">Black Panther</h4>
                <Building2 size={18} className="text-purple-600" />
            </div>
            <span className="text-[10px] bg-white text-purple-700 px-2 py-1 rounded border border-purple-200 uppercase font-bold tracking-wider mb-2 inline-block">Ekosistem Odaklı</span>
            <p className="text-xs text-purple-800/80 leading-relaxed font-medium">Güçlü bir ekosisteme ve altyapıya sahip ancak bireysel risk alma iştahı veya motivasyonu düşük olanlar.</p>
        </div>

        {/* Spider-Man */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transition-all hover:shadow-md hover:scale-[1.02]">
             <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-800 flex items-center gap-2 text-lg">Spider-Man</h4>
                <Zap size={18} className="text-blue-600" />
            </div>
            <span className="text-[10px] bg-white text-blue-700 px-2 py-1 rounded border border-blue-200 uppercase font-bold tracking-wider mb-2 inline-block">Gelişen & Dengeli</span>
            <p className="text-xs text-blue-800/80 leading-relaxed font-medium">Hem bireysel hem de ekosistem açısından gelişime açık, henüz olgunlaşmamış ülkeler.</p>
        </div>
      </div>
    </div>
  );
};

export default QuadrantAnalysis;