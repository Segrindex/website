
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
    
    for (let i = list.length + 1; i <= 100; i++) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const sector = sectors[Math.floor(Math.random() * sectors.length)];
        list.push({
            rank: i,
            name: `${sector}X ${i}`,
            valuation: Number((Math.random() * 10 + 1).toFixed(2)),
            country: country,
            sector: sector,
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

    return {
      ...country,
      RTC, ICT, IAW, PIM, SCW, FA, RFQ, MD, KI, EN,
      IES, EEF, SEGRI,
      quadrant, typology
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
