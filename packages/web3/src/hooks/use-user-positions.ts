/**
 * Placeholder hook for user positions.
 * Blocked on wallet integration.
 */
export function useUserPositions() {
  return {
    supplies: [],
    borrows: [],
    netWorth: "0",
    healthFactor: "—",
    isLoading: false,
    isBlocked: true, // Specifically marked as blocked as per Dashboard specs
  }
}
