import * as React from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";
import { parseAbi, maxUint256, parseUnits } from "viem";
import { AAVE_V3_ADDRESSES } from "../constants/addresses";

const erc20Abi = parseAbi([
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
]);

const poolAbi = parseAbi([
  "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external"
]);

export type TxState = "idle" | "approving" | "supplying" | "success" | "error";

export function useSupplyTx() {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [txState, setTxState] = React.useState<TxState>("idle");
  const [errorDetails, setErrorDetails] = React.useState<string>("");

  const { writeContractAsync } = useWriteContract();

  const getAddresses = () => {
    // Basic fallback logic: if unsupported or not 1 (mainnet) / 11155111 (sepolia), default to mainnet addresses
    if (chain?.id === 11155111) return AAVE_V3_ADDRESSES.sepolia;
    return AAVE_V3_ADDRESSES.mainnet;
  };

  const executeSupply = async (asset: `0x${string}`, amountStr: string) => {
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

      const amountWei = parseUnits(amountStr, decimals);

      // 2. Check allowance
      const allowance = await publicClient.readContract({
        address: asset,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, addresses.pool as `0x${string}`],
      });

      // 3. Approve if necessary
      if (allowance < amountWei) {
        const approveTx = await writeContractAsync({
          address: asset,
          abi: erc20Abi,
          functionName: "approve",
          args: [addresses.pool as `0x${string}`, maxUint256],
        });

        const receipt = await publicClient.waitForTransactionReceipt({ hash: approveTx });
        if (receipt.status !== "success") {
          throw new Error("Approval transaction failed");
        }
      }

      setTxState("supplying");

      // 4. Supply
      const supplyTx = await writeContractAsync({
        address: addresses.pool as `0x${string}`,
        abi: poolAbi,
        functionName: "supply",
        args: [asset, amountWei, address, 0], // referralCode is 0
      });

      const supplyReceipt = await publicClient.waitForTransactionReceipt({ hash: supplyTx });
      if (supplyReceipt.status !== "success") {
        throw new Error("Supply transaction failed");
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
    executeSupply,
    txState,
    errorDetails,
    reset
  };
}
