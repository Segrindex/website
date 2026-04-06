import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCountries } from '../hooks';
import { LoadingState, ErrorState } from './Common';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Sparkles, Search, ExternalLink, AlertCircle, Bot, BookOpen, ChevronRight } from 'lucide-react';
import { CountryData } from '../types';

const DeepAnalysis: React.FC = () => {
  const { data, isLoading: isDataLoading, isError, error: dataError } = useCountries();
  const [selectedCode, setSelectedCode] = useState<string>('');

  // Set default selection when data loads
  useEffect(() => {
    if (data && data.length > 0 && !selectedCode) {
      setSelectedCode(data[0].code);
    }
  }, [data, selectedCode]);

  // Mutation for AI Analysis
  const mutation = useMutation({
    mutationFn: async (country: CountryData) => {
      if (!process.env.API_KEY) {
        throw new Error("API Anahtarı bulunamadı. Lütfen ortam değişkenlerini kontrol edin.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Sen uzman bir girişimcilik ekosistemi stratejistisin.
        Aşağıdaki SEGRİ (Selçuk Ergin Girişimcilik Ruhu İndeksi) verilerini analiz et ve Google Arama sonuçlarını kullanarak bu verileri güncel gelişmelerle zenginleştir (Grounding).

        Analiz Edilecek Ülke: ${country.name}
        
        SEGRİ Metrikleri:
        - SEGRİ Skoru: ${country.SEGRI.toFixed(2)} (Genel Performans)
        - Kadran: ${country.quadrant} (Konum)
        - Tipoloji: ${country.typology} (Karakteristik)
        
        Alt Bileşenler:
        1. Bireysel Ruh (IES): ${country.IES.toFixed(2)}
           - Risk Alma (RTC): ${country.RTC}
           - İnovasyon (ICT): ${country.ICT}
           - Özerklik (IAW): ${country.IAW}
           - Motivasyon (PIM): ${country.PIM}
           - Sosyal (SCW): ${country.SCW}
        2. Ekosistem (EEF): ${country.EEF.toFixed(2)}
           - Finans (FA): ${country.FA}
           - Regülasyon (RFQ): ${country.RFQ}
           - Pazar (MD): ${country.MD}
           - Bilgi (KI): ${country.KI}
           - Ağlar (EN): ${country.EN}

        Lütfen detaylı bir "Deep Dive" analizi yap:
        1. **Kök Neden Analizi**: Puanlar neden böyle? (Google aramaları ile destekle)
        2. **Kör Noktalar**: Verilerin gösterdiği ancak gözden kaçabilecek riskler neler?
        3. **Ekosistem Sinyalleri**: Ülkeden son girişimcilik haberleri bu verileri doğruluyor mu?
        4. **Eylem Planı**: ${country.quadrant} kadranındaki bu ülke için somut 3 stratejik öneri.

        Format: Markdown stili kullan (Bold başlıklar, listeler).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      return {
        text: response.text || "Analiz oluşturulamadı.",
        groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    }
  });

  if (isDataLoading) return <LoadingState />;
  if (isError) return <ErrorState error={dataError} />;
  if (!data) return null;

  const activeCountry = data.find(c => c.code === selectedCode);
  const { isPending: loading, error, data: analysisResult } = mutation;
  const analysis = analysisResult?.text || '';
  const groundingChunks = analysisResult?.groundingChunks || [];

  const handleAnalyze = () => {
    if (activeCountry) {
      mutation.mutate(activeCountry);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
      {/* Control Panel */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <Bot size={24} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Yapay Zeka Analizi</h2>
                    <p className="text-xs text-gray-500">Gemini 3.0 & Google Search</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ülke Seçimi</label>
                    <select 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                    >
                        {data.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                    </select>
                </div>

                {activeCountry && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-500">SEGRİ Puanı</span>
                            <span className="font-bold text-xl text-gray-900">{activeCountry.SEGRI.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Kadran</span>
                            <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{activeCountry.quadrant}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Tipoloji</span>
                            <span className="font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{activeCountry.typology}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-[0.98]"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Analiz Ediliyor...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Deep Deep Analiz Yap
                        </>
                    )}
                </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2 text-sm">
                    <Search size={14} /> Nasıl Çalışır?
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed opacity-90">
                    Seçilen ülkenin SEGRİ verileri Gemini 3.0'a gönderilir. Model, <b>Google Search</b> aracını kullanarak güncel ekonomik ve sosyal gelişmeleri tarar ve verileri bu bağlamda yorumlayarak size stratejik bir rapor sunar.
                </p>
            </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[600px] relative">
            {/* Background Pattern */}
            {!analysis && !loading && !error && (
                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                    <Bot size={200} />
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3 border border-red-100 animate-in slide-in-from-top-2">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <div>
                        <p className="font-bold">Hata Oluştu</p>
                        <p className="text-sm">{error instanceof Error ? error.message : "Bilinmeyen hata"}</p>
                    </div>
                </div>
            )}

            {!analysis && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-12">
                    <div className="bg-indigo-50 p-6 rounded-full mb-6 animate-pulse">
                        <Sparkles size={48} className="text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Analiz Raporu Bekleniyor</h3>
                    <p className="max-w-md text-gray-500 leading-relaxed">
                        Başlamak için sol taraftan bir ülke seçin ve analiz butonuna tıklayın. Yapay zeka sizin için kapsamlı bir rapor hazırlayacak.
                    </p>
                </div>
            )}

            {loading && (
                 <div className="h-full flex flex-col items-center justify-center text-indigo-600 p-12">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 animate-ping rounded-full bg-indigo-200 opacity-75"></div>
                        <div className="relative bg-white p-4 rounded-full shadow-md">
                            <Loader2 size={40} className="animate-spin text-indigo-600" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Veriler İşleniyor</h3>
                    <div className="flex flex-col items-center gap-2 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-2 animate-pulse">
                            <Search size={14} /> Google Search taranıyor...
                        </span>
                        <span className="flex items-center gap-2 animate-pulse delay-75">
                            <Bot size={14} /> Gemini 3.0 raporu yazıyor...
                        </span>
                    </div>
                 </div>
            )}

            {analysis && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-8 border-b pb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 p-1.5 rounded text-indigo-600">
                                <Bot size={16} />
                            </div>
                            <span className="font-semibold text-gray-700">Gemini 3.0 Analiz Raporu</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
                                <Search size={10} /> Grounding Active
                            </span>
                            <span className="text-xs text-gray-400">{new Date().toLocaleDateString('tr-TR')}</span>
                        </div>
                    </div>
                    
                    {/* Render Simple Markdown */}
                    <SimpleMarkdown text={analysis} />

                    {/* Grounding Sources */}
                    {groundingChunks.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen size={16} className="text-indigo-600" /> 
                                Referans Kaynaklar (Google Search Grounding)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {groundingChunks.map((chunk, idx) => {
                                    if (chunk.web?.uri) {
                                        return (
                                            <a 
                                                key={idx} 
                                                href={chunk.web.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="group flex flex-col p-3 rounded-lg bg-gray-50 hover:bg-white border border-gray-200 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Kaynak {idx + 1}</span>
                                                    <ExternalLink size={12} className="text-gray-400 group-hover:text-indigo-500" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                                                    {chunk.web.title || "Web Kaynağı"}
                                                </span>
                                                <span className="text-xs text-gray-500 truncate mt-1">
                                                    {chunk.web.uri}
                                                </span>
                                            </a>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Simple Markdown Renderer Component
const SimpleMarkdown = ({ text }: { text: string }) => {
    // Basic Markdown parser for Headers, Lists, and Bold text
    const lines = text.split('\n');
    return (
      <div className="space-y-4 text-gray-800 leading-relaxed font-sans">
        {lines.map((line, i) => {
          // H3 Headers (###)
          if (line.startsWith('### ')) {
            return (
                <h3 key={i} className="text-lg font-bold text-indigo-800 mt-6 mb-2 flex items-center gap-2">
                    <ChevronRight size={16} className="text-indigo-400 shrink-0" />
                    <span>{parseBold(line.replace('### ', ''))}</span>
                </h3>
            );
          }
          // H2 Headers (##)
          if (line.startsWith('## ')) {
            return (
                <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3 border-b border-gray-200 pb-2">
                    {parseBold(line.replace('## ', ''))}
                </h2>
            );
          }
          // H1 Headers (#)
          if (line.startsWith('# ')) {
            return (
                <h1 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {parseBold(line.replace('# ', ''))}
                </h1>
            );
          }
  
          // Unordered List items (- or *)
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
               <div key={i} className="flex gap-3 ml-2 group">
                  <span className="text-indigo-400 mt-1.5 group-hover:text-indigo-600 transition-colors shrink-0">•</span>
                  <span className="flex-1 text-gray-700 leading-relaxed">{parseBold(line.replace(/^[\s]*[\-\*] /, ''))}</span>
               </div>
            );
          }
          
          // Numbered lists (1. 2. etc)
          if (/^\d+\.\s/.test(line.trim())) {
               const match = line.match(/^\d+\./);
               const number = match ? match[0] : '';
               const content = line.replace(/^\d+\.\s/, '');
               return (
               <div key={i} className="flex gap-3 ml-2">
                  <span className="font-bold text-indigo-600 min-w-[1.5rem] mt-0.5 shrink-0">{number}</span>
                  <span className="flex-1 text-gray-700 leading-relaxed">{parseBold(content)}</span>
               </div>
            );
          }
  
          // Empty lines
          if (!line.trim()) return <div key={i} className="h-3"></div>;
  
          // Regular paragraph
          return <p key={i} className="text-gray-700 leading-relaxed">{parseBold(line)}</p>;
        })}
      </div>
    );
  };
  
  // Helper to parse **bold** text
  const parseBold = (text: string) => {
    // Split by **text** pattern
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove asterisks and wrap in strong tag
        return <strong key={index} className="font-bold text-gray-900 bg-indigo-50/50 px-0.5 rounded">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

export default DeepAnalysis;