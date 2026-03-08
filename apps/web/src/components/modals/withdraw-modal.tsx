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
import { useWithdrawTx } from "@workspace/web3";

interface WithdrawModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset: string;
  assetAddress: `0x${string}`;
}

export function WithdrawModal({ isOpen, onOpenChange, asset, assetAddress }: WithdrawModalProps) {
  const [amount, setAmount] = React.useState("");
  const { executeWithdraw, txState, errorDetails, reset } = useWithdrawTx();

  React.useEffect(() => {
    if (!isOpen) {
      setAmount("");
      reset();
    }
  }, [isOpen, reset]);

  const handleWithdraw = async () => {
    if (!amount) return;
    const isMax = amount.toLowerCase() === "max";
    if (!isMax && isNaN(Number(amount))) return;
    
    await executeWithdraw(assetAddress, isMax ? "0" : amount, isMax);
  };

  const isPending = txState === "withdrawing";

  return (
    <AppDialog open={isOpen} onOpenChange={onOpenChange}>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Withdraw {asset}</AppDialogTitle>
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
            <AppAlert intent="success" title="Withdraw Successful">
              You have successfully withdrawn {asset} from the pool.
            </AppAlert>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {txState !== "success" ? (
              <AppButton 
                onClick={handleWithdraw} 
                disabled={!amount || isPending}
                className="w-full"
              >
                {txState === "withdrawing" ? "Withdrawing..." : "Withdraw"}
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
