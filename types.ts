
export interface CountryData {
  name: string;
  code: string;
  flag: string;
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
}

export interface SectorInfo {
  rank: number;
  name: string;
  detail: string;
  iconType: 'AI' | 'Fintech' | 'Health' | 'Cyber' | 'SaaS' | 'Gaming' | 'Agri' | 'Ecom' | 'Logistics' | 'Chips' | 'DeepTech';
}

export interface Unicorn {
    rank: number;
    name: string;
    valuation: number;
    country: string;
    sector: string;
    investors: string;
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
