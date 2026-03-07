/**
 * @fileoverview Central registry for all Aave protocol contract addresses.
 * Rule: No address literals in UI pages/components.
 */

// We default to Ethereum Mainnet V3 Pool Data Provider, but this can be switched based on chainId
export const AAVE_V3_ADDRESSES = {
  mainnet: {
    // UI Pool Data Provider V3 handles reading reserves and user data
    uiPoolDataProviderV3: "0x91c0eA31b49B69Ea18607702c5d9aC360bf3dEA8",
    // Pool Addresses Provider
    poolAddressesProvider: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
    // Pool V3
    pool: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  },
  sepolia: {
    uiPoolDataProviderV3: "0x3e9708d80f7B3e4311801306C623788C6da722a4",
    poolAddressesProvider: "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A",
    pool: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
  }
} // as const;

export const DEFAULT_CHAIN_ID = 1; // mainnet
