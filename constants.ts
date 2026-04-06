
import { CountryData, SectorName, SectorRiskWeights, Unicorn } from './types';

export const COLORS = {
  ironMan: "#10B981", 
  captainAmerica: "#F59E0B", 
  blackPanther: "#8B5CF6", 
  spiderMan: "#3B82F6", 
  primary: "#1e40af",
  secondary: "#64748b",
  background: "#f8fafc"
};

export const TOP_UNICORNS: Unicorn[] = [
    { rank: 1, name: "ByteDance", valuation: 225.0, country: "China", sector: "Artificial intelligence", investors: "Sequoia, Softbank" },
    { rank: 2, name: "SpaceX", valuation: 210.0, country: "United States", sector: "Space", investors: "Founders Fund, Fidelity" },
    { rank: 3, name: "OpenAI", valuation: 157.0, country: "United States", sector: "Artificial intelligence", investors: "Microsoft, Thrive Capital" },
    { rank: 4, name: "Ant Group", valuation: 78.5, country: "China", sector: "Fintech", investors: "Alibaba, Silver Lake" },
    { rank: 5, name: "Stripe", valuation: 70.0, country: "United States", sector: "Fintech", investors: "Sequoia, A16Z" },
    { rank: 6, name: "Shein", valuation: 66.0, country: "China", sector: "E-commerce", investors: "Tiger Global" },
    { rank: 7, name: "Databricks", valuation: 43.0, country: "United States", sector: "Data Management", investors: "A16Z, BlackRock" },
    { rank: 8, name: "Canva", valuation: 25.4, country: "Australia", sector: "Design Software", investors: "Blackbird, Sequoia" },
    { rank: 9, name: "Revolut", valuation: 45.0, country: "United Kingdom", sector: "Fintech", investors: "Softbank, Tiger Global" },
    { rank: 10, name: "Epic Games", valuation: 22.5, country: "United States", sector: "Gaming", investors: "Tencent, Sony" },
    { rank: 11, name: "Telegram", valuation: 30.0, country: "United Arab Emirates", sector: "Messaging", investors: "Mubadala" },
    { rank: 12, name: "Miro", valuation: 17.5, country: "United States", sector: "Collaboration Software", investors: "Accel, ICONIQ" },
    { rank: 13, name: "Discord", valuation: 15.0, country: "United States", sector: "Messaging", investors: "Benchmark, Greylock" },
    { rank: 14, name: "Grammarly", valuation: 13.0, country: "United States", sector: "SaaS", investors: "General Catalyst" },
    { rank: 15, name: "CheckPoint", valuation: 12.0, country: "Israel", sector: "Cybersecurity", investors: "Public" },
    { rank: 31, name: "Trendyol", valuation: 16.5, country: "Turkey", sector: "E-commerce", investors: "Alibaba, Softbank" },
    { rank: 32, name: "Getir", valuation: 6.5, country: "Turkey", sector: "Quick Commerce", investors: "Sequoia, Tiger Global" },
    { rank: 33, name: "Dream Games", valuation: 2.75, country: "Turkey", sector: "Gaming", investors: "Index Ventures" },
    { rank: 34, name: "Insider", valuation: 2.0, country: "Turkey", sector: "SaaS", investors: "QIA, Sequoia" },
    { rank: 35, name: "Hepsiburada", valuation: 1.2, country: "Turkey", sector: "E-commerce", investors: "Public" },
    { rank: 36, name: "Peak Games", valuation: 1.8, country: "Turkey", sector: "Gaming", investors: "Zynga" },
    { rank: 37, name: "Papara", valuation: 1.0, country: "Turkey", sector: "Fintech", investors: "Founders" }
];

export const COUNTRY_DATA: CountryData[] = [
  {
    name: "ABD", code: "US", flag: "🇺🇸",
    RTC: 88, ICT: 92, IAW: 85, PIM: 80, SCW: 70,
    FA: 92, RFQ: 84, MD: 88, KI: 85, EN: 85,
    EDU: 85, INV: 95, TECH: 98, COMP: 92, GOV: 84, LAW: 88, SOC: 75, INF_INV: 90, INF_CRT: 86,
    IES: 83.2, EEF: 86.8, SEGRI: 84.64, 
    quadrant: "Iron Man", typology: "Gandalf Tipi",
    GEM: 64.5, B_READY: 86.2, unicornCount: 782, startupCount: 82400,
    topSectors: [{ rank: 1, name: "AI", detail: "Global lider", iconType: "AI" }]
  },
  {
    name: "İngiltere", code: "GB", flag: "🇬🇧",
    RTC: 78, ICT: 85, IAW: 80, PIM: 75, SCW: 72,
    FA: 88, RFQ: 90, MD: 82, KI: 85, EN: 92,
    EDU: 90, INV: 85, TECH: 88, COMP: 85, GOV: 88, LAW: 92, SOC: 80, INF_INV: 82, INF_CRT: 85,
    IES: 78.4, EEF: 87.4, SEGRI: 82.0,
    quadrant: "Iron Man", typology: "Legolas Tipi",
    GEM: 58.2, B_READY: 89.5, unicornCount: 52, startupCount: 38400,
    topSectors: [{ rank: 1, name: "Fintech", detail: "Londra finans üssü", iconType: "Fintech" }]
  },
  {
    name: "Çin", code: "CN", flag: "🇨🇳",
    RTC: 75, ICT: 94, IAW: 65, PIM: 85, SCW: 68,
    FA: 85, RFQ: 70, MD: 95, KI: 92, EN: 80,
    EDU: 80, INV: 98, TECH: 96, COMP: 88, GOV: 72, LAW: 65, SOC: 70, INF_INV: 95, INF_CRT: 88,
    IES: 78.5, EEF: 84.4, SEGRI: 80.86,
    quadrant: "Iron Man", typology: "Gandalf Tipi",
    GEM: 58.0, B_READY: 74.5, unicornCount: 324, startupCount: 54200,
    topSectors: [{ rank: 1, name: "Chips", detail: "Donanım devrimi", iconType: "Chips" }]
  },
  {
    name: "İsrail", code: "IL", flag: "🇮🇱",
    RTC: 94, ICT: 96, IAW: 78, PIM: 88, SCW: 65,
    FA: 82, RFQ: 78, MD: 75, KI: 90, EN: 84,
    EDU: 92, INV: 98, TECH: 96, COMP: 85, GOV: 78, LAW: 80, SOC: 70, INF_INV: 92, INF_CRT: 82,
    IES: 86.4, EEF: 81.8, SEGRI: 84.56,
    quadrant: "Iron Man", typology: "Aragorn Tipi",
    GEM: 62.5, B_READY: 79.0, unicornCount: 35, startupCount: 11500,
    topSectors: [{ rank: 1, name: "Cyber", detail: "Siber güvenlik lideri", iconType: "Cyber" }]
  },
  {
    name: "Güney Kore", code: "KR", flag: "🇰🇷",
    RTC: 68, ICT: 98, IAW: 60, PIM: 82, SCW: 70,
    FA: 80, RFQ: 85, MD: 88, KI: 96, EN: 78,
    EDU: 95, INV: 94, TECH: 98, COMP: 90, GOV: 85, LAW: 88, SOC: 72, INF_INV: 85, INF_CRT: 94,
    IES: 75.8, EEF: 85.4, SEGRI: 79.64,
    quadrant: "Black Panther", typology: "Gimli Tipi",
    GEM: 54.5, B_READY: 88.0, unicornCount: 22, startupCount: 14500,
    topSectors: [{ rank: 1, name: "Chips", detail: "Yarı iletken lideri", iconType: "Chips" }]
  },
  {
    name: "Fransa", code: "FR", flag: "🇫🇷",
    RTC: 72, ICT: 88, IAW: 74, PIM: 78, SCW: 75,
    FA: 84, RFQ: 82, MD: 80, KI: 82, EN: 88,
    EDU: 88, INV: 84, TECH: 85, COMP: 82, GOV: 85, LAW: 80, SOC: 78, INF_INV: 82, INF_CRT: 80,
    IES: 77.8, EEF: 83.2, SEGRI: 79.96,
    quadrant: "Iron Man", typology: "Legolas Tipi",
    GEM: 52.8, B_READY: 82.4, unicornCount: 26, startupCount: 21000,
    topSectors: [{ rank: 1, name: "SaaS", detail: "Avrupa yazılım üssü", iconType: "SaaS" }]
  },
  {
    name: "Türkiye", code: "TR", flag: "🇹🇷",
    RTC: 84, ICT: 62, IAW: 74, PIM: 70, SCW: 65,
    FA: 52, RFQ: 55, MD: 68, KI: 50, EN: 65,
    EDU: 52, INV: 64, TECH: 72, COMP: 58, GOV: 48, LAW: 45, SOC: 68, INF_INV: 78, INF_CRT: 70,
    IES: 71.3, EEF: 58.0, SEGRI: 65.98,
    quadrant: "Captain America", typology: "Aragorn Tipi",
    GEM: 52.5, B_READY: 60.2, unicornCount: 7, startupCount: 5600,
    topSectors: [{ rank: 1, name: "Gaming", detail: "Mobil oyun devrimi", iconType: "Gaming" }]
  },
  {
    name: "BAE", code: "AE", flag: "🇦🇪",
    RTC: 78, ICT: 82, IAW: 68, PIM: 80, SCW: 60,
    FA: 94, RFQ: 92, MD: 85, KI: 72, EN: 90,
    EDU: 82, INV: 95, TECH: 90, COMP: 88, GOV: 94, LAW: 85, SOC: 65, INF_INV: 98, INF_CRT: 92,
    IES: 74.5, EEF: 86.6, SEGRI: 79.34,
    quadrant: "Black Panther", typology: "Han Solo Tipi",
    GEM: 60.4, B_READY: 94.2, unicornCount: 4, startupCount: 3200,
    topSectors: [{ rank: 1, name: "Fintech", detail: "Orta Doğu hubı", iconType: "Fintech" }]
  },
  {
    name: "Almanya", code: "DE", flag: "🇩🇪",
    RTC: 65, ICT: 82, IAW: 68, PIM: 75, SCW: 72,
    FA: 78, RFQ: 85, MD: 82, KI: 94, EN: 80,
    EDU: 94, INV: 88, TECH: 90, COMP: 85, GOV: 92, LAW: 94, SOC: 88, INF_INV: 85, INF_CRT: 92,
    IES: 72.8, EEF: 83.8, SEGRI: 77.2,
    quadrant: "Black Panther", typology: "Gimli Tipi",
    GEM: 55.2, B_READY: 84.8, unicornCount: 30, startupCount: 22400,
    topSectors: [{ rank: 1, name: "DeepTech", detail: "Endüstriyel inovasyon", iconType: "DeepTech" }]
  },
  {
    name: "Singapur", code: "SG", flag: "🇸🇬",
    RTC: 68, ICT: 82, IAW: 65, PIM: 72, SCW: 60,
    FA: 95, RFQ: 98, MD: 85, KI: 92, EN: 90,
    EDU: 96, INV: 94, TECH: 98, COMP: 95, GOV: 96, LAW: 94, SOC: 82, INF_INV: 98, INF_CRT: 95,
    IES: 70.2, EEF: 92.0, SEGRI: 78.92,
    quadrant: "Black Panther", typology: "Legolas Tipi",
    GEM: 58.4, B_READY: 96.5, unicornCount: 15, startupCount: 4200,
    topSectors: [{ rank: 1, name: "Fintech", detail: "Asya finans merkezi", iconType: "Fintech" }]
  },
  {
    name: "Estonya", code: "EE", flag: "🇪🇪",
    RTC: 78, ICT: 88, IAW: 82, PIM: 80, SCW: 75,
    FA: 78, RFQ: 92, MD: 65, KI: 85, EN: 88,
    EDU: 88, INV: 85, TECH: 95, COMP: 82, GOV: 94, LAW: 90, SOC: 85, INF_INV: 82, INF_CRT: 88,
    IES: 81.1, EEF: 81.6, SEGRI: 81.3,
    quadrant: "Iron Man", typology: "Legolas Tipi",
    GEM: 60.1, B_READY: 92.4, unicornCount: 10, startupCount: 1400,
    topSectors: [{ rank: 1, name: "SaaS", detail: "E-devlet başarısı", iconType: "SaaS" }]
  }
];

export const SECTOR_WEIGHTS: Record<SectorName, SectorRiskWeights> = {
  "Teknoloji": { TRF: 0.35, TZR: 0.15, JRF: 0.15, ESG: 0.15, ORF: 0.20 },
  "Üretim": { TRF: 0.20, TZR: 0.30, JRF: 0.20, ESG: 0.15, ORF: 0.15 },
  "Finans": { TRF: 0.30, TZR: 0.10, JRF: 0.25, ESG: 0.20, ORF: 0.15 },
  "Enerji": { TRF: 0.15, TZR: 0.20, JRF: 0.25, ESG: 0.30, ORF: 0.10 },
  "Perakende": { TRF: 0.25, TZR: 0.25, JRF: 0.15, ESG: 0.15, ORF: 0.20 },
  "Sağlık": { TRF: 0.25, TZR: 0.25, JRF: 0.10, ESG: 0.20, ORF: 0.20 },
  "Tarım": { TRF: 0.10, TZR: 0.25, JRF: 0.20, ESG: 0.35, ORF: 0.10 },
  "Lojistik": { TRF: 0.20, TZR: 0.35, JRF: 0.20, ESG: 0.15, ORF: 0.10 }
};
