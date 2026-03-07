import { useAaveReserves } from "@aave/react"
import { AAVE_V3_ADDRESSES, DEFAULT_CHAIN_ID } from "../constants/addresses";

/**
 * Hook to fetch and format Aave reserves (markets) data for the UI.
 * This abstracts away the underlying Aave SDK and returns simplified View Models.
 */
export function useAaveMarkets() {
  // We use the Aave React hook under the hood. 
  // For V3, the UI pool data provider address can be passed explicitly if needed,
  // but AaveKit handles default resolving. We pass it for explicitness matching Phase 1 specs.
  const { data, isLoading, isError, error } = useAaveReserves({
    poolDataProviderAddress: AAVE_V3_ADDRESSES.mainnet.uiPoolDataProviderV3 as `0x${string}`,
    chainId: DEFAULT_CHAIN_ID,
  });

  // The UI needs simple mapped view models. We map the raw reserve data.
  // We're converting raw values (like totalSupplied in base units) to simpler strings for now.
  // In Phase 5/6 we would use domain math (like @aave/math-utils) for precise conversions,
  // but AaveKit already formats APYs and some balances if configured correctly.
  
  const formattedMarkets = data?.map((reserve) => {
    return {
      id: reserve.underlyingAsset,
      symbol: reserve.symbol,
      name: reserve.name,
      // For now, these are placeholder formatted values as requested by Phase 2 specs ("static skeletons")
      // later we will wire the exact math here.
      supplyApy: reserve.supplyAPY, 
      variableBorrowApy: reserve.variableBorrowAPY,
      totalSupplied: reserve.totalLiquidity,
      availableToBorrow: reserve.availableLiquidity,
      canBeCollateral: reserve.usageAsCollateralEnabled,
    }
  }) || [];

  return {
    markets: formattedMarkets,
    isLoading,
    isError,
    error,
  }
}
