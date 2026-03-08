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
import { useRepayTx } from "@workspace/web3";

interface RepayModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset: string;
  assetAddress: `0x${string}`;
}

export function RepayModal({ isOpen, onOpenChange, asset, assetAddress }: RepayModalProps) {
  const [amount, setAmount] = React.useState("");
  const { executeRepay, txState, errorDetails, reset } = useRepayTx();

  React.useEffect(() => {
    if (!isOpen) {
      setAmount("");
      reset();
    }
  }, [isOpen, reset]);

  const handleRepay = async () => {
    if (!amount) return;
    const isMax = amount.toLowerCase() === "max";
    if (!isMax && isNaN(Number(amount))) return;
    
    // Defaulting to Variable Rate (2)
    await executeRepay(assetAddress, isMax ? "0" : amount, isMax, 2);
  };

  const isPending = txState === "approving" || txState === "repaying";

  return (
    <AppDialog open={isOpen} onOpenChange={onOpenChange}>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Repay {asset}</AppDialogTitle>
        </AppDialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <AppText className="text-sm font-medium text-text-secondary">Amount</AppText>
            <AppInput
              type="text"
              placeholder="0.00 or type 'max'"
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
            <AppAlert intent="success" title="Repay Successful">
              You have successfully repaid the {asset} loan.
            </AppAlert>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {txState !== "success" ? (
              <AppButton 
                onClick={handleRepay} 
                disabled={!amount || isPending}
                className="w-full"
              >
                {txState === "approving" ? "Approving..." : 
                 txState === "repaying" ? "Repaying..." : "Repay"}
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
