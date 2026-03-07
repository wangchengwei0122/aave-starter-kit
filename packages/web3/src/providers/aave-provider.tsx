"use client"

import * as React from "react"
import { AaveProvider as BaseAaveProvider, AaveClient } from "@aave/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createConfig, http, WagmiProvider } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"

// 1. Setup Wagmi Config
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// 2. Setup QueryClient for React Query (required by both Wagmi and Aave React)
const queryClient = new QueryClient()

// 3. Setup Aave Client
const aaveClient = AaveClient.create()

interface AaveProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the application with necessary providers for Web3 and Aave SDK.
 * This should be placed near the root of the app.
 */
export function AaveProvider({ children }: AaveProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BaseAaveProvider client={aaveClient}>
          {children}
        </BaseAaveProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
