import { useAaveMarkets } from "@aave/react"
import { ChainId } from "@aave/types"
import { AAVE_V3_ADDRESSES, DEFAULT_CHAIN_ID } from "../constants/addresses";

/**
 * Hook to fetch and format Aave reserves (markets) data for the UI.
 * This abstracts away the underlying Aave SDK and returns simplified View Models.
 */
export function useAaveMarketsQuery() {
  const result = useAaveMarkets({
    chainIds: [DEFAULT_CHAIN_ID as unknown as ChainId],
    user: undefined // optional according to typings but better explicit when no wallet is connected
  });
  
  // Depending on how Suspense is used, it might return { data } or { data, loading, error }
  // We'll safely access what's available
  const data = result.data;
  const isLoading = 'loading' in result ? result.loading : false;
  const error = 'error' in result ? result.error : undefined;
  const isError = !!error;

  const formattedMarkets = data?.map((market) => {
    // A single market contains an array of supplyReserves and borrowReserves
    // The previous error showed `supplyReserves` array contains a `Reserve` object with `supplyInfo`, `borrowInfo`, `underlyingToken` etc.
    const supplyReserve = market.supplyReserves && market.supplyReserves.length > 0 ? market.supplyReserves[0] : null;
    const borrowReserve = market.borrowReserves && market.borrowReserves.length > 0 ? market.borrowReserves[0] : null;
    
    // We will use supplyReserve for token info and supply APY, and borrowReserve for borrow APY
    // if supplyReserve is missing, fallback to borrowReserve for token details
    const reserveToken = supplyReserve?.underlyingToken || borrowReserve?.underlyingToken;

    return {
      id: reserveToken?.address || market.address,
      symbol: reserveToken?.symbol || "N/A",
      name: reserveToken?.name || market.name,
      supplyApy: supplyReserve?.supplyInfo?.apy?.formatted || "0", 
      variableBorrowApy: borrowReserve?.borrowInfo?.apy?.formatted || "0",
      totalSupplied: supplyReserve?.supplyInfo?.total?.value || "0",
      availableToBorrow: borrowReserve?.borrowInfo?.availableLiquidity?.amount?.value || "0",
      canBeCollateral: supplyReserve?.supplyInfo?.canBeCollateral || false,
    }
  }) || [];

  return {
    markets: formattedMarkets,
    isLoading,
    isError,
    error,
  }
}
