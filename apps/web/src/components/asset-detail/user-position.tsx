import * as React from "react";
import {
  AppCard,
  AppCardHeader,
  AppCardTitle,
  AppCardContent,
  AppText,
  AppButton,
  AppSwitch,
} from "@workspace/ui/components";

interface UserPositionProps {
  userReserve?: {
    underlyingBalance: string;
    supplied: string;
    borrowed: string;
    usageAsCollateralEnabled: boolean;
    isBlocked: boolean;
  };
  symbol: string;
}

export function UserPosition({ userReserve, symbol }: UserPositionProps) {
  const isDisconnected = !userReserve || userReserve.isBlocked;

  return (
    <div className="w-full">
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm h-full flex flex-col">
        <AppCardHeader className="p-4 border-b border-border bg-muted/20">
          <AppCardTitle>
            <AppText size="md" className="font-semibold text-foreground">
              Your info
            </AppText>
          </AppCardTitle>
        </AppCardHeader>
        
        <AppCardContent className="p-4 flex flex-col gap-6 flex-grow">
          {isDisconnected ? (
            <div className="flex flex-col items-center justify-center py-6 h-full text-center">
              <AppText className="text-muted-foreground mb-4">
                Please connect a wallet to view your personal information here.
              </AppText>
              <AppButton variant="primary">Connect wallet</AppButton>
            </div>
          ) : (
            <>
              {/* Wallet Balance */}
              <div className="flex justify-between items-center rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                     {/* Safe fallback for icon */}
                     <span className="text-xs font-bold text-muted-foreground">W</span>
                  </div>
                  <AppText className="font-medium">Wallet balance</AppText>
                </div>
                <AppText className="font-bold">{userReserve.underlyingBalance} {symbol}</AppText>
              </div>

              {/* Supplied vs Borrowed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 border-r border-border pr-4">
                  <AppText className="text-muted-foreground text-sm">You supplied</AppText>
                  <AppText className="font-semibold">{userReserve.supplied} {symbol}</AppText>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <AppText className="text-muted-foreground text-sm">You borrowed</AppText>
                  <AppText className="font-semibold">{userReserve.borrowed} {symbol}</AppText>
                </div>
              </div>

              {/* Collateral Toggle */}
              <div className="flex justify-between items-center py-2 border-t border-b border-border">
                <AppText className="text-sm font-medium">Use as collateral</AppText>
                <AppSwitch disabled checked={userReserve.usageAsCollateralEnabled} />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <AppButton variant="primary" className="w-full">Supply</AppButton>
                <AppButton variant="secondary" className="w-full" disabled={Number(userReserve.supplied) <= 0}>Withdraw</AppButton>
                <AppButton variant="secondary" className="w-full">Borrow</AppButton>
                <AppButton variant="secondary" className="w-full" disabled={Number(userReserve.borrowed) <= 0}>Repay</AppButton>
              </div>
            </>
          )}
        </AppCardContent>
      </AppCard>
    </div>
  );
}
