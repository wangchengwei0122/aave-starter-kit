import * as React from "react";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { parseAbi, maxUint256, parseUnits } from "viem";
import { AAVE_V3_ADDRESSES } from "../constants/addresses";

const erc20Abi = parseAbi([
  "function decimals() external view returns (uint8)"
]);

const poolAbi = parseAbi([
  "function withdraw(address asset, uint256 amount, address to) external returns (uint256)"
]);

export type WithdrawTxState = "idle" | "withdrawing" | "success" | "error";

export function useWithdrawTx() {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [txState, setTxState] = React.useState<WithdrawTxState>("idle");
  const [errorDetails, setErrorDetails] = React.useState<string>("");

  const { writeContractAsync } = useWriteContract();

  const getAddresses = () => {
    if (chain?.id === 11155111) return AAVE_V3_ADDRESSES.sepolia;
    return AAVE_V3_ADDRESSES.mainnet;
  };

  const executeWithdraw = async (asset: `0x${string}`, amountStr: string, isMax: boolean) => {
    if (!address || !publicClient) {
      setErrorDetails("Wallet not connected");
      setTxState("error");
      return;
    }

    setTxState("withdrawing");
    setErrorDetails("");

    try {
      const addresses = getAddresses();
      // 1. Get decimals
      const decimals = await publicClient.readContract({
        address: asset,
        abi: erc20Abi,
        functionName: "decimals",
      });

      // Special handling for max Uint as per Aave standard for withdrawing max
      const amountWei = isMax ? maxUint256 : parseUnits(amountStr, decimals);

      // 2. Withdraw
      const withdrawTx = await writeContractAsync({
        address: addresses.pool as `0x${string}`,
        abi: poolAbi,
        functionName: "withdraw",
        args: [asset, amountWei, address], 
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash: withdrawTx });
      if (receipt.status !== "success") {
        throw new Error("Withdraw transaction failed");
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
    executeWithdraw,
    txState,
    errorDetails,
    reset
  };
}
