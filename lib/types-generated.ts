import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import type { Abi, ContractFunctionReturnType } from 'viem';

import { WalletBalanceProvider_ABI } from '@/abis/WalletBalanceProvider_ABI';

export type ReservesData = ContractFunctionReturnType<
  typeof IUiPoolDataProvider_ABI,
  'view',
  'getReservesData'
>;

export type UserReservesData = ContractFunctionReturnType<
  typeof IUiPoolDataProvider_ABI,
  'view',
  'getUserReservesData'
>;

export type UserWalletBalances = ContractFunctionReturnType<
  typeof WalletBalanceProvider_ABI,
  'view',
  'getUserWalletBalances'
>; // ⬅️ 现在 IDE 悬停能看到 [address[], bigint[]]
