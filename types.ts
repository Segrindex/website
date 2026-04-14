
export interface GSBEData {
  score: number;
  rawScore: number;
  qualityFactor: number;
  categories: {
    k1: number; // Economic Contribution
    k2: number; // Business Success Factors
    k3: number; // Outlook
    k4: number; // Ecosystem
    k5: number; // Socio-Cultural
    k6: number; // Infrastructure
    k7: number; // Data Quality (Moderator)
  };
}

export interface LifestyleMetricsData {
  score: number;
  categories: {
    a: number; // Financial Sustainability
    b: number; // Quality of Life
    c: number; // Local Contribution
    d: number; // Environmental
    e: number; // Organic Growth
  };
}

export interface YEPEData {
  score: number;
  rawScore: number;
  qualityFactor: number;
  categories: {
    k1: number; // Local Economic Connection
    k2: number; // Environmental Sustainability
    k3: number; // Social Cohesion
    k4: number; // Financial Autonomy
    k5: number; // Local Ecosystem Support
    k6: number; // Cultural Context
  };
}

export interface CountryData {
  name: string;
  code: string;
  flag: string;
  region: string;
  RTC: number;
  ICT: number;
  IAW: number;
  PIM: number;
  SCW: number;
  FA: number;
  RFQ: number;
  MD: number;
  KI: number;
  EN: number;
  EDU: number;
  INV: number;
  TECH: number;
  COMP: number;
  GOV: number;
  LAW: number;
  SOC: number;
  INF_INV: number;
  INF_CRT: number;
  IES: number;
  EEF: number;
  SEGRI: number;
  EXT_SEGRI?: number;
  quadrant: string;
  typology: string;
  GEM: number; 
  B_READY: number; 
  unicornCount: number;
  startupCount: number;
  topSectors?: SectorInfo[];
  gsbe?: GSBEData;
  yepe?: YEPEData;
  lifestyle?: LifestyleMetricsData;
}

export interface SectorInfo {
  rank: number;
  name: string;
  detail: string;
  iconType: 'AI' | 'Fintech' | 'Health' | 'Cyber' | 'SaaS' | 'Gaming' | 'Agri' | 'Ecom' | 'Logistics' | 'Chips' | 'DeepTech' | 'Cleantech';
}

export interface Unicorn {
    rank: number;
    name: string;
    valuation: number;
    country: string;
    sector: string;
    gicsSector: string;
    investors: string;
}

export interface CityHubData {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  region: string;
  EEF: number;
  dominantTypology: 'Gandalf' | 'Legolas' | 'Aragorn' | 'Gimli' | 'Han Solo' | 'Frodo' | 'Galadriel';
  unicornCount: number;
  startupCount: number;
  keySectors: string[];
  description: string;
}

export type QuadrantType = "Iron Man" | "Captain America" | "Black Panther" | "Spider-Man";

export interface SectorRiskWeights {
  TRF: number;
  TZR: number;
  JRF: number;
  ESG: number;
  ORF: number;
}

export type SectorName = "Teknoloji" | "Üretim" | "Finans" | "Enerji" | "Perakende" | "Sağlık" | "Tarım" | "Lojistik";
