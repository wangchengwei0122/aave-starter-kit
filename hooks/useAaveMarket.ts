import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import { useAccount, useReadContracts } from 'wagmi';

import { WalletBalanceProvider_ABI } from '@/abis/WalletBalanceProvider_ABI';
import {
  aggregateBorrowRows,
  aggregateRows,
  aggregateUserBorrows,
  aggregateUserSupplies,
  calculateUserPosition,
} from '@/lib/aggregators';
import {
  POOL_ADDRESSES_PROVIDER,
  UI_POOL_DATA_PROVIDER,
  WALLET_BALANCE_PROVIDER,
} from '@/lib/constants';
import {
  AggregatedReserveData,
  BaseCurrencyInfo,
  UserReserveData,
  UserWalletAddresses,
  UserWalletBalances,
} from '@/lib/types-generated';

// 添加零地址常量
const ZERO_ADDR = '0x0000000000000000000000000000000000000000' as const;

export function useAaveMarket() {
  const { address } = useAccount();

  const { data, ...rest } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: UI_POOL_DATA_PROVIDER,
        abi: IUiPoolDataProvider_ABI,
        functionName: 'getReservesData',
        args: [POOL_ADDRESSES_PROVIDER],
      },
      {
        address: UI_POOL_DATA_PROVIDER,
        abi: IUiPoolDataProvider_ABI,
        functionName: 'getUserReservesData',
        args: [POOL_ADDRESSES_PROVIDER, (address ?? ZERO_ADDR) as `0x${string}`],
      },
      {
        address: WALLET_BALANCE_PROVIDER,
        abi: WalletBalanceProvider_ABI,
        functionName: 'getUserWalletBalances',
        args: [POOL_ADDRESSES_PROVIDER, (address ?? ZERO_ADDR) as `0x${string}`],
      },
    ],
  });

  if (!data)
    return {
      rows: [],
      borrowRows: [],
      userSupplies: [],
      userBorrows: [],
      userPosition: null,
      ...rest,
    };

  const [[reserves, baseCurrency], [userReserves], [walletAssets, walletBalances]] =
    data as unknown as [
      [AggregatedReserveData[], BaseCurrencyInfo],
      [UserReserveData[], number], // getUserReservesData 返回 (UserReserveData[], uint8)
      [UserWalletAddresses, UserWalletBalances],
    ];
  console.log('--------------------');
  console.log('userReserves:', userReserves);

  if (Array.isArray(userReserves)) {
    console.log('userReserves length:', userReserves.length);
  }
  console.log('----------------');
  const wethOrigin = reserves.find((r) => r.symbol === 'WETH');
  const finalReserves = wethOrigin
    ? [
        { ...wethOrigin, name: 'Ethereum', symbol: 'ETH' },
        ...reserves.filter((r) => r.symbol !== 'WETH'),
      ]
    : reserves;

  const walletMap = new Map<string, bigint>(
    walletAssets.map((a: string, i: number) => [a.toLowerCase(), walletBalances[i] as bigint]),
  );

  const rows = aggregateRows(finalReserves, userReserves, walletMap, baseCurrency);
  const borrowRows = aggregateBorrowRows(finalReserves, userReserves, walletMap, baseCurrency);
  const userSupplies = aggregateUserSupplies(userReserves, finalReserves);
  const userBorrows = aggregateUserBorrows(userReserves, finalReserves, baseCurrency);
  const userPosition = calculateUserPosition(userSupplies, userBorrows, baseCurrency);

  return { rows, borrowRows, userSupplies, userBorrows, userPosition, ...rest };
}
