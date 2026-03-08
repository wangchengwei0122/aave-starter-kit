import * as React from "react";
import { useAccount, useWriteContract, usePublicClient } from "wagmi";
import { parseAbi, parseUnits } from "viem";
import { AAVE_V3_ADDRESSES } from "../constants/addresses";

const erc20Abi = parseAbi([
  "function decimals() external view returns (uint8)"
]);

const poolAbi = parseAbi([
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external"
]);

export type BorrowTxState = "idle" | "borrowing" | "success" | "error";

export function useBorrowTx() {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [txState, setTxState] = React.useState<BorrowTxState>("idle");
  const [errorDetails, setErrorDetails] = React.useState<string>("");

  const { writeContractAsync } = useWriteContract();

  const getAddresses = () => {
    if (chain?.id === 11155111) return AAVE_V3_ADDRESSES.sepolia;
    return AAVE_V3_ADDRESSES.mainnet;
  };

  const executeBorrow = async (asset: `0x${string}`, amountStr: string, interestRateMode: number = 2) => {
    // interestRateMode 2 = Variable, 1 = Stable
    if (!address || !publicClient) {
      setErrorDetails("Wallet not connected");
      setTxState("error");
      return;
    }

    setTxState("borrowing");
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

      // 2. Borrow
      const borrowTx = await writeContractAsync({
        address: addresses.pool as `0x${string}`,
        abi: poolAbi,
        functionName: "borrow",
        args: [asset, amountWei, BigInt(interestRateMode), 0, address], // referralCode is 0
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash: borrowTx });
      if (receipt.status !== "success") {
        throw new Error("Borrow transaction failed");
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
    executeBorrow,
    txState,
    errorDetails,
    reset
  };
}
