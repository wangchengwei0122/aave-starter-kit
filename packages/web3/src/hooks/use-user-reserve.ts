/**
 * Placeholder hook for fetching a user's specific position for an asset.
 * Blocked on wallet integration.
 */
export function useUserReserve(assetId: string) {
  return {
    underlyingBalance: "0",
    supplied: "0",
    borrowed: "0",
    usageAsCollateralEnabled: false,
    isLoading: false,
    isBlocked: true, // Specifically marked as blocked as per Dashboard specs
  };
}
