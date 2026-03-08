import { useAaveMarketsQuery } from "./use-aave-markets";

export interface ReserveDetail {
  id: string;
  symbol: string;
  name: string;
  supplyApy: string;
  variableBorrowApy: string;
  totalSupplied: string;
  availableToBorrow: string;
  canBeCollateral: boolean;
  // Additional details for the overview page
  supplyCap: string;
  borrowCap: string;
  maxLtv: string;
  liquidationThreshold: string;
  liquidationPenalty: string;
  reserveFactor: string;
  icon?: string;
}

/**
 * Hook to fetch specific reserve details.
 * For now, it leverages the existing `useAaveMarketsQuery` and filters by assetId (address or symbol).
 */
export function useReserveDetail(assetId: string) {
  // `useAaveMarketsQuery` already fetches the main market data and formats it.
  const { markets, isLoading, isError, error } = useAaveMarketsQuery();

  // Find the specific market that matches the assetId
  // The assetId from URL could be a symbol (e.g. "1inch") or an address.
  const reserveDetail = markets.find((m) => {
    return m.id.toLowerCase() === assetId.toLowerCase() || 
           m.symbol.toLowerCase() === assetId.toLowerCase();
  }) || null;

  return {
    reserve: reserveDetail,
    isLoading,
    isError,
    error,
  };
}
