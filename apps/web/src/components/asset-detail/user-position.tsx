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
import { SupplyModal } from "../modals/supply-modal";
import { BorrowModal } from "../modals/borrow-modal";
import { RepayModal } from "../modals/repay-modal";
import { WithdrawModal } from "../modals/withdraw-modal";
import { useState } from "react";

interface UserPositionProps {
  asset: string;
  supplied: string;
  borrowed: string;
  walletBalance: string;
  usageAsCollateralEnabled: boolean;
  isBlocked: boolean;
  isDisconnected: boolean;
  assetAddress: `0x${string}`;
}

export function UserPosition({
  asset,
  supplied,
  borrowed,
  walletBalance,
  usageAsCollateralEnabled,
  isBlocked,
  isDisconnected,
  assetAddress,
}: UserPositionProps) {
  const [supplyOpen, setSupplyOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [repayOpen, setRepayOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

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
          {isDisconnected || isBlocked ? (
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
                <AppText className="font-bold">{walletBalance} {asset}</AppText>
              </div>

              {/* Supplied vs Borrowed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 border-r border-border pr-4">
                  <AppText className="text-muted-foreground text-sm">You supplied</AppText>
                  <AppText className="font-semibold">{supplied} {asset}</AppText>
                </div>
                <div className="flex flex-col gap-1 pl-2">
                  <AppText className="text-muted-foreground text-sm">You borrowed</AppText>
                  <AppText className="font-semibold">{borrowed} {asset}</AppText>
                </div>
              </div>

              {/* Collateral Toggle */}
              <div className="flex justify-between items-center py-2 border-t border-b border-border">
                <AppText className="text-sm font-medium">Use as collateral</AppText>
                <AppSwitch disabled checked={usageAsCollateralEnabled} />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex gap-4">
                  <AppButton 
                    className="flex-1" 
                    variant="primary" 
                    onClick={() => setSupplyOpen(true)}
                  >
                    Supply
                  </AppButton>
                  <AppButton 
                    className="flex-1" 
                    variant="secondary" 
                    disabled={!supplied || supplied === "0"}
                    onClick={() => setWithdrawOpen(true)}
                  >
                    Withdraw
                  </AppButton>
                </div>
                <div className="flex gap-4 mt-2">
                  <AppButton 
                    className="flex-1" 
                    variant="primary"
                    onClick={() => setBorrowOpen(true)}
                  >
                    Borrow
                  </AppButton>
                  <AppButton 
                    className="flex-1" 
                    variant="secondary" 
                    disabled={!borrowed || borrowed === "0"}
                    onClick={() => setRepayOpen(true)}
                  >
                    Repay
                  </AppButton>
                </div>
              </div>
            </>
          )}

          <SupplyModal isOpen={supplyOpen} onOpenChange={setSupplyOpen} asset={asset} assetAddress={assetAddress} />
          <BorrowModal isOpen={borrowOpen} onOpenChange={setBorrowOpen} asset={asset} assetAddress={assetAddress} />
          <RepayModal isOpen={repayOpen} onOpenChange={setRepayOpen} asset={asset} assetAddress={assetAddress} />
          <WithdrawModal isOpen={withdrawOpen} onOpenChange={setWithdrawOpen} asset={asset} assetAddress={assetAddress} />
        </AppCardContent>
      </AppCard>
    </div>
  );
}
