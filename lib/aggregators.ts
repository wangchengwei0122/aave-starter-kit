// 你可从 address-book 类型中 re-export

import { RAY } from './constants';
import { balanceToNum, formatPercent, rayToApy, rayToPercent } from './format';
import { AggregatedReserveData, BaseCurrencyInfo, UserReserveData } from './types-generated';

export interface AssetRow {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  priceUsd: number;

  wallet: number;
  supplied: number;
  debtVar: number;

  supplyAPY: number;
  borrowAPY: number;

  canCollateral: boolean;
  isolated: boolean;
  frozen: boolean;
}

export function aggregateRows(
  reserves: readonly AggregatedReserveData[],
  userReserves: readonly UserReserveData[],
  walletMap: Map<string, bigint>,
  base: BaseCurrencyInfo,
): AssetRow[] {
  const userMap = new Map(userReserves.map((u) => [u.underlyingAsset, u]));
  const rows: AssetRow[] = [];

  for (const r of reserves) {
    const u = userMap.get(r.underlyingAsset);
    const walletBal = walletMap.get(r.underlyingAsset.toLowerCase()) ?? BigInt(0);

    const decimals = Number(r.decimals);
    const priceUsd =
      (Number(r.priceInMarketReferenceCurrency) * Number(base.marketReferenceCurrencyPriceInUsd)) /
      1e8;

    rows.push({
      address: r.underlyingAsset,
      symbol: r.symbol,
      decimals,
      priceUsd,

      wallet: balanceToNum(walletBal, decimals),
      supplied: balanceToNum(
        u ? (u.scaledATokenBalance * r.liquidityIndex) / RAY : BigInt(0),
        decimals,
      ),
      debtVar: balanceToNum(
        u ? (u.scaledVariableDebt * r.variableBorrowIndex) / RAY : BigInt(0),
        decimals,
      ),

      supplyAPY: rayToApy(r.liquidityRate),
      borrowAPY: rayToApy(r.variableBorrowRate),

      canCollateral:
        r.isActive &&
        !r.isFrozen &&
        r.usageAsCollateralEnabled &&
        r.baseLTVasCollateral > BigInt(0), // ,
      isolated: !r.borrowableInIsolation,
      frozen: r.isFrozen || !r.isActive,
    });
  }

  return rows;
}
