import * as React from "react";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { parseAbi, maxUint256, parseUnits } from "viem";
import { AAVE_V3_ADDRESSES } from "../constants/addresses";

const erc20Abi = parseAbi([
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
]);

const poolAbi = parseAbi([
  "function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external"
]);

export type RepayTxState = "idle" | "approving" | "repaying" | "success" | "error";

export function useRepayTx() {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [txState, setTxState] = React.useState<RepayTxState>("idle");
  const [errorDetails, setErrorDetails] = React.useState<string>("");

  const { writeContractAsync } = useWriteContract();

  const getAddresses = () => {
    if (chain?.id === 11155111) return AAVE_V3_ADDRESSES.sepolia;
    return AAVE_V3_ADDRESSES.mainnet;
  };

  const executeRepay = async (asset: `0x${string}`, amountStr: string, isMax: boolean, interestRateMode: number = 2) => {
    if (!address || !publicClient) {
      setErrorDetails("Wallet not connected");
      setTxState("error");
      return;
    }

    setTxState("approving");
    setErrorDetails("");

    try {
      const addresses = getAddresses();
      // 1. Get decimals
      const decimals = await publicClient.readContract({
        address: asset,
        abi: erc20Abi,
        functionName: "decimals",
      });

      // Special handling for max Uint as per Aave standard for repaying max
      const amountWei = isMax ? maxUint256 : parseUnits(amountStr, decimals);

      // 2. Check allowance
      const allowance = await publicClient.readContract({
        address: asset,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, addresses.pool as `0x${string}`],
      });

      // 3. Approve if necessary
      if (allowance < (isMax ? maxUint256 : amountWei)) {
        const approveTx = await writeContractAsync({
          address: asset,
          abi: erc20Abi,
          functionName: "approve",
          // Always approve max to avoid repeated approvals on repay, or just the amount. Standard is max for convenience, but we'll approve amountWei for safety unless maxing
          args: [addresses.pool as `0x${string}`, isMax ? maxUint256 : amountWei],
        });

        const receipt = await publicClient.waitForTransactionReceipt({ hash: approveTx });
        if (receipt.status !== "success") {
          throw new Error("Approval transaction failed");
        }
      }

      setTxState("repaying");

      // 4. Repay
      const repayTx = await writeContractAsync({
        address: addresses.pool as `0x${string}`,
        abi: poolAbi,
        functionName: "repay",
        args: [asset, amountWei, BigInt(interestRateMode), address], 
      });

      const repayReceipt = await publicClient.waitForTransactionReceipt({ hash: repayTx });
      if (repayReceipt.status !== "success") {
        throw new Error("Repay transaction failed");
      }

      setTxState("success");
    } catch (error: any) {
      console.error(error);
      if (error.shortMessage) {
         setErrorDetails(error.shortMessage);
      } else if (error.message) {
         setErrorDetails(error.message);
      } else {
         setErrorDetails("An unknown error occurred");
      }
      setTxState("error");
    }
  };

  const reset = () => {
    setTxState("idle");
    setErrorDetails("");
  };

  return {
    executeRepay,
    txState,
    errorDetails,
    reset
  };
}
