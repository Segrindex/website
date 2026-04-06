
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCountries, fetchSectorWeights, fetchGlobalUnicorns } from './api';
import { CountryData, Unicorn } from './types';
import { COUNTRY_DATA, SECTOR_WEIGHTS, TOP_UNICORNS } from './constants';

export const QUERY_KEYS = {
  countries: ['countries'] as const,
  sectorWeights: ['sectorWeights'] as const,
  unicorns: ['unicorns'] as const,
};

// Generic hook to fetch all countries with real-time updates
export const useCountries = <T = CountryData[]>(
  options?: Omit<UseQueryOptions<CountryData[], Error, T>, 'queryKey' | 'queryFn' | 'initialData'>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.countries,
    queryFn: fetchCountries,
    initialData: COUNTRY_DATA,
    refetchInterval: 3000, // Sync every 3 seconds
    staleTime: 1000,
    refetchOnWindowFocus: true,
    structuralSharing: true,
    ...options,
  });
};

export const useCountry = (code: string) => {
  return useCountries<CountryData | undefined>({
    select: (data) => data.find((c) => c.code === code),
    enabled: !!code,
  });
};

export const useSectorWeights = () => {
  return useQuery({
    queryKey: QUERY_KEYS.sectorWeights,
    queryFn: fetchSectorWeights,
    initialData: SECTOR_WEIGHTS,
    refetchInterval: 5000, // Sync every 5 seconds
    staleTime: 2000,
    refetchOnWindowFocus: true,
  });
};

export const useGlobalUnicorns = () => {
    return useQuery({
        queryKey: QUERY_KEYS.unicorns,
        queryFn: fetchGlobalUnicorns,
        initialData: TOP_UNICORNS,
        refetchInterval: 10000, // Valuations update every 10 seconds
        staleTime: 5000,
        refetchOnWindowFocus: true,
    });
};
