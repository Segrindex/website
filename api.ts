
import { COUNTRY_DATA, SECTOR_WEIGHTS, TOP_UNICORNS } from './constants';
import { CountryData, SectorName, SectorRiskWeights, Unicorn } from './types';
import { calculateIES, calculateEEF, calculateSEGRI, determineQuadrant, determineTypology } from './utils';

const SIMULATED_DELAY = 400; 

let liveCountries: CountryData[] = JSON.parse(JSON.stringify(COUNTRY_DATA));
let liveSectorWeights: Record<SectorName, SectorRiskWeights> = JSON.parse(JSON.stringify(SECTOR_WEIGHTS));

// Generate additional unicorns to reach 100
const generateUnicorns = (initial: Unicorn[]): Unicorn[] => {
    const list = [...initial];
    const sectors = ["AI", "Fintech", "SaaS", "E-commerce", "Healthtech", "Cybersecurity", "Gaming", "Clean Energy"];
    const countries = ["United States", "China", "United Kingdom", "Germany", "Israel", "India", "France", "Turkey", "Singapore"];
    
    let currentRank = Math.max(...initial.map(u => u.rank), 0);

    for (let i = list.length + 1; i <= 100; i++) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const sector = sectors[Math.floor(Math.random() * sectors.length)];
        const gicsSector = "Bilgi Teknolojileri"; // Default for generated
        currentRank++;
        list.push({
            rank: currentRank,
            name: `${sector}X ${currentRank}`,
            valuation: Number((Math.random() * 10 + 1).toFixed(2)),
            country: country,
            sector: sector,
            gicsSector: gicsSector,
            investors: "VC Capital, Global Fund"
        });
    }
    return list;
};

let liveUnicorns: Unicorn[] = generateUnicorns(TOP_UNICORNS);

const fluctuate = (value: number, volatility: number = 0.8, min: number = 0, max: number = 100) => {
  const change = (Math.random() * (volatility * 2)) - volatility;
  const result = value + change;
  return Number(Math.max(min, Math.min(max, result)).toFixed(2));
};

export const fetchCountries = async (): Promise<CountryData[]> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

  liveCountries = liveCountries.map((country) => {
    const shouldUpdate = Math.random() > 0.3;
    if (!shouldUpdate) return country;

    const RTC = fluctuate(country.RTC, 0.4, 10, 100);
    const ICT = fluctuate(country.ICT, 0.4, 10, 100);
    const IAW = fluctuate(country.IAW, 0.4, 10, 100);
    const PIM = fluctuate(country.PIM, 0.4, 10, 100);
    const SCW = fluctuate(country.SCW, 0.4, 10, 100);

    const FA = fluctuate(country.FA, 0.4, 5, 100);
    const RFQ = fluctuate(country.RFQ, 0.4, 5, 100);
    const MD = fluctuate(country.MD, 0.4, 5, 100);
    const KI = fluctuate(country.KI, 0.4, 5, 100);
    const EN = fluctuate(country.EN, 0.4, 5, 100);

    const IES = calculateIES(RTC, ICT, IAW, PIM, SCW);
    const EEF = calculateEEF(FA, RFQ, MD, KI, EN);
    const SEGRI = calculateSEGRI(IES, EEF);
    
    const quadrant = determineQuadrant(IES, EEF);
    const typology = determineTypology(RTC, ICT, IAW, PIM, SCW);

    const gsbe = country.gsbe ? {
      ...country.gsbe,
      score: fluctuate(country.gsbe.score, 0.2, 0, 100),
      categories: {
        k1: fluctuate(country.gsbe.categories.k1, 0.3, 0, 100),
        k2: fluctuate(country.gsbe.categories.k2, 0.3, 0, 100),
        k3: fluctuate(country.gsbe.categories.k3, 0.3, 0, 100),
        k4: fluctuate(country.gsbe.categories.k4, 0.3, 0, 100),
        k5: fluctuate(country.gsbe.categories.k5, 0.3, 0, 100),
        k6: fluctuate(country.gsbe.categories.k6, 0.3, 0, 100),
        k7: fluctuate(country.gsbe.categories.k7, 0.1, 0, 100),
      }
    } : undefined;

    const yepe = country.yepe ? {
      ...country.yepe,
      score: fluctuate(country.yepe.score, 0.2, 0, 100),
      categories: {
        k1: fluctuate(country.yepe.categories.k1, 0.3, 0, 100),
        k2: fluctuate(country.yepe.categories.k2, 0.3, 0, 100),
        k3: fluctuate(country.yepe.categories.k3, 0.3, 0, 100),
        k4: fluctuate(country.yepe.categories.k4, 0.3, 0, 100),
        k5: fluctuate(country.yepe.categories.k5, 0.3, 0, 100),
        k6: fluctuate(country.yepe.categories.k6, 0.3, 0, 100),
      }
    } : undefined;

    const lifestyle = country.lifestyle ? {
      ...country.lifestyle,
      score: fluctuate(country.lifestyle.score, 0.2, 0, 100),
      categories: {
        a: fluctuate(country.lifestyle.categories.a, 0.3, 0, 100),
        b: fluctuate(country.lifestyle.categories.b, 0.3, 0, 100),
        c: fluctuate(country.lifestyle.categories.c, 0.3, 0, 100),
        d: fluctuate(country.lifestyle.categories.d, 0.3, 0, 100),
        e: fluctuate(country.lifestyle.categories.e, 0.3, 0, 100),
      }
    } : undefined;

    return {
      ...country,
      RTC, ICT, IAW, PIM, SCW, FA, RFQ, MD, KI, EN,
      IES, EEF, SEGRI,
      quadrant, typology,
      gsbe, yepe, lifestyle
    } as CountryData;
  });

  return [...liveCountries];
};

export const fetchSectorWeights = async (): Promise<Record<SectorName, SectorRiskWeights>> => {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  return { ...liveSectorWeights };
};

export const fetchGlobalUnicorns = async (): Promise<Unicorn[]> => {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    liveUnicorns = liveUnicorns.map(u => ({
        ...u,
        valuation: fluctuate(u.valuation, 0.05, 1, 1000)
    }));
    return [...liveUnicorns];
}
