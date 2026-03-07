"use client"

import * as React from "react"
import { AaveProvider as BaseAaveProvider, AaveClient } from "@aave/react"

// Setup Aave Client
const aaveClient = AaveClient.create()

interface AaveProviderProps {
  children: React.ReactNode
}

/**
 * Wraps the application with necessary providers for Web3 and Aave SDK.
 * This should be placed near the root of the app, inside Wagmi and QueryClient providers.
 */
export function AaveProvider({ children }: AaveProviderProps) {
  return (
    <BaseAaveProvider client={aaveClient}>
      {children}
    </BaseAaveProvider>
  )
}
