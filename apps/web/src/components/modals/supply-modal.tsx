"use client";

import * as React from "react";
import {
  AppDialog,
  AppDialogContent,
  AppDialogHeader,
  AppDialogTitle,
  AppButton,
  AppInput,
  AppText,
  AppAlert,
} from "@workspace/ui/components";
import { useSupplyTx } from "@workspace/web3";

interface SupplyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset: string;
  assetAddress: `0x${string}`;
}

export function SupplyModal({ isOpen, onOpenChange, asset, assetAddress }: SupplyModalProps) {
  const [amount, setAmount] = React.useState("");
  const { executeSupply, txState, errorDetails, reset } = useSupplyTx();

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setAmount("");
      reset();
    }
  }, [isOpen, reset]);

  const handleSupply = async () => {
    if (!amount || isNaN(Number(amount))) return;
    await executeSupply(assetAddress, amount);
  };

  const isPending = txState === "approving" || txState === "supplying";

  return (
    <AppDialog open={isOpen} onOpenChange={onOpenChange}>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Supply {asset}</AppDialogTitle>
        </AppDialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-text-secondary">Amount</AppText>
            <AppInput
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPending || txState === "success"}
            />
          </div>

          {txState === "error" && (
            <AppAlert intent="danger" title="Transaction Failed">
              {errorDetails}
            </AppAlert>
          )}

          {txState === "success" && (
            <AppAlert intent="success" title="Supply Successful">
              You have successfully supplied {amount} {asset}.
            </AppAlert>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {txState !== "success" ? (
              <AppButton 
                onClick={handleSupply} 
                disabled={!amount || isPending}
                className="w-full"
              >
                {txState === "approving" ? "Approving..." : 
                 txState === "supplying" ? "Supplying..." : "Supply"}
              </AppButton>
            ) : (
              <AppButton onClick={() => onOpenChange(false)} className="w-full">
                Close
              </AppButton>
            )}
          </div>
        </div>
      </AppDialogContent>
    </AppDialog>
  );
}
