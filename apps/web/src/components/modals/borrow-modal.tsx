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
import { useBorrowTx } from "@workspace/web3";

interface BorrowModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asset: string;
  assetAddress: `0x${string}`;
}

export function BorrowModal({ isOpen, onOpenChange, asset, assetAddress }: BorrowModalProps) {
  const [amount, setAmount] = React.useState("");
  const { executeBorrow, txState, errorDetails, reset } = useBorrowTx();

  React.useEffect(() => {
    if (!isOpen) {
      setAmount("");
      reset();
    }
  }, [isOpen, reset]);

  const handleBorrow = async () => {
    if (!amount || isNaN(Number(amount))) return;
    // Defaulting to Variable Rate (2) since Aave V3 deprecated Stable Rate in many markets.
    await executeBorrow(assetAddress, amount, 2);
  };

  const isPending = txState === "borrowing";

  return (
    <AppDialog open={isOpen} onOpenChange={onOpenChange}>
      <AppDialogContent>
        <AppDialogHeader>
          <AppDialogTitle>Borrow {asset}</AppDialogTitle>
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
            <AppAlert intent="success" title="Borrow Successful">
              You have successfully borrowed {amount} {asset}.
            </AppAlert>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {txState !== "success" ? (
              <AppButton 
                onClick={handleBorrow} 
                disabled={!amount || isPending}
                className="w-full"
              >
                {txState === "borrowing" ? "Borrowing..." : "Borrow"}
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
