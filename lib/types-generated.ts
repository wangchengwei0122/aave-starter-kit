import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import { ContractFunctionReturnType } from 'viem';

import { WalletBalanceProvider_ABI } from '@/abis/WalletBalanceProvider_ABI';

export type Address = `0x${string}`;

// ----- 顶层返回值类型 -----
export type ReservesData = ContractFunctionReturnType<
  typeof IUiPoolDataProvider_ABI,
  'view',
  'getReservesData'
>;

export type AggregatedReserveData = ReservesData[0][number];
export type BaseCurrencyInfo = ReservesData[1];

export type UserReservesData = ContractFunctionReturnType<
  typeof IUiPoolDataProvider_ABI,
  'view',
  'getUserReservesData'
>;

export type UserReserveData = UserReservesData[0][number];

export type UserWalletBalancesType = ContractFunctionReturnType<
  typeof WalletBalanceProvider_ABI,
  'view',
  'getUserWalletBalances'
>;

// ----- 钱包余额切片 -----
export type UserWalletAddresses = UserWalletBalancesType[0];
export type UserWalletBalances = UserWalletBalancesType[1];
