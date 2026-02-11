"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AppButton } from "@workspace/ui/components/app";
import { Wallet } from "lucide-react";

export function HeaderWalletActions() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
        authenticationStatus,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!connected) {
          return (
            <AppButton
              size="sm"
              onClick={openConnectModal}
              className="h-9 rounded-lg border border-border-wallet bg-bg-wallet px-4 text-base font-semibold text-text-wallet hover:bg-bg-wallet-hover active:bg-bg-wallet-active"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </AppButton>
          );
        }

        if (chain.unsupported) {
          return (
            <AppButton
              variant="destructive"
              size="sm"
              onClick={openChainModal}
              className="h-9 rounded-lg px-4 text-sm font-semibold"
            >
              Wrong network
            </AppButton>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <AppButton
              variant="ghost"
              size="sm"
              onClick={openChainModal}
              className="h-9 rounded-lg border border-border-wallet bg-bg-nav-hover/30 px-3 text-sm text-text-on-dark hover:bg-bg-nav-hover"
            >
              {chain.hasIcon && (
                <span className="overflow-hidden rounded-full">
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      className="h-4 w-4"
                    />
                  )}
                </span>
              )}
              {chain.name}
            </AppButton>

            <AppButton
              size="sm"
              onClick={openAccountModal}
              className="h-9 rounded-lg border border-border-wallet bg-bg-wallet px-4 text-sm font-semibold text-text-wallet hover:bg-bg-wallet-hover active:bg-bg-wallet-active"
            >
              {account.displayName}
            </AppButton>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
