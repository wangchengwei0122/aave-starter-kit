"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * Client component to wrap the RainbowKit ConnectButton.
 * This allows us to keep the RootLayout as a Server Component while
 * rendering the wallet connection UI which requires client-side interactivity.
 */
export function HeaderWalletActions() {
  return (
    <ConnectButton 
      showBalance={false}
      accountStatus="address"
      chainStatus="icon"
    />
  );
}
