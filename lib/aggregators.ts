// 你可从 address-book 类型中 re-export

import { RAY } from './constants';
import { balanceToNum, formatPercent, rayToApy } from './format';
import { AggregatedReserveData, BaseCurrencyInfo, UserReserveData } from './types-generated';

export interface AssetRow {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  priceUsd: number;

  wallet: number;
  supplied: number;
  debtVar: number;

  supplyAPY: number | string;
  borrowAPY: number | string;

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
    const canSupply = r.isActive && !r.isFrozen && r.symbol !== 'GHO'; // GHO 只能借
    if (!canSupply) {
      continue;
    }

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
      supplyAPY: formatPercent(rayToApy(r.liquidityRate)), // "1,054.93 %"
      borrowAPY: formatPercent(rayToApy(r.variableBorrowRate)),

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

export function aggregateBorrowRows(
  reserves: readonly AggregatedReserveData[],
  userReserves: readonly UserReserveData[],
  walletMap: Map<string, bigint>,
  base: BaseCurrencyInfo,
): AssetRow[] {
  const userMap = new Map(userReserves.map((u) => [u.underlyingAsset, u]));
  const rows: AssetRow[] = [];

  // 只显示官网的5个可借资产
  const allowedBorrowAssets = ['GHO', 'WBTC', 'LINK', 'USDT', 'EURS'];

  for (const r of reserves) {
    const canBorrow =
      r.isActive && !r.isFrozen && r.borrowingEnabled && allowedBorrowAssets.includes(r.symbol);
    if (!canBorrow) {
      continue;
    }

    const u = userMap.get(r.underlyingAsset);
    const walletBal = walletMap.get(r.underlyingAsset.toLowerCase()) ?? BigInt(0);

    const decimals = Number(r.decimals);
    const priceUsd =
      (Number(r.priceInMarketReferenceCurrency) * Number(base.marketReferenceCurrencyPriceInUsd)) /
      1e8;

    // 计算可用流动性
    const availableLiquidity = balanceToNum(r.availableLiquidity, decimals);

    rows.push({
      address: r.underlyingAsset,
      symbol: r.symbol,
      decimals,
      priceUsd,

      wallet: balanceToNum(walletBal, decimals),
      supplied: availableLiquidity, // 使用可用流动性作为 supplied 字段
      debtVar: balanceToNum(
        u ? (u.scaledVariableDebt * r.variableBorrowIndex) / RAY : BigInt(0),
        decimals,
      ),
      supplyAPY: formatPercent(rayToApy(r.liquidityRate)),
      borrowAPY: formatPercent(rayToApy(r.variableBorrowRate)),

      canCollateral:
        r.isActive &&
        !r.isFrozen &&
        r.usageAsCollateralEnabled &&
        r.baseLTVasCollateral > BigInt(0),
      isolated: !r.borrowableInIsolation,
      frozen: r.isFrozen || !r.isActive,
    });
  }

  return rows;
}

export function aggregateUserSupplies(
  userReserves: UserReserveData[],
  reserves: AggregatedReserveData[],
) {
  console.log('--------------------------------');
  console.log('userReserves', userReserves);
  console.log('reserves', reserves);
  // BigInt 类型不能直接用 > 0 判断，需要用 BigInt(0) 比较
  const list = userReserves.filter((userReserve) => userReserve.scaledATokenBalance > BigInt(0));
  // console.log('userReserves', userReserves);
  // console.log('list', list);
  const userSupplies = list.map((userReserve) => {
    const reserve = reserves.find((r) => r.underlyingAsset === userReserve.underlyingAsset);
    if (!reserve) {
      return null;
    }
    return {
      ...userReserve,
      ...reserve,
    };
  });
  return userSupplies;
}

export function aggregateUserBorrows(
  userReserves: UserReserveData[],
  reserves: AggregatedReserveData[],
  base: BaseCurrencyInfo,
) {
  console.log('--------------------------------');
  console.log('aggregateUserBorrows - userReserves', userReserves);
  console.log('aggregateUserBorrows - reserves', reserves);

  // 过滤有借款的资产 (只检查 scaledVariableDebt > 0，因为Aave V3中stable已弃用)
  const borrowedAssets = userReserves.filter(
    (userReserve) => userReserve.scaledVariableDebt > BigInt(0),
  );

  console.log('borrowedAssets', borrowedAssets);

  const userBorrows = borrowedAssets
    .map((userReserve) => {
      const reserve = reserves.find((r) => r.underlyingAsset === userReserve.underlyingAsset);
      if (!reserve) {
        return null;
      }

      const decimals = Number(reserve.decimals);

      // 计算可变利率债务 (Aave V3中stable已弃用，只计算variable debt)
      const variableDebt = (userReserve.scaledVariableDebt * reserve.variableBorrowIndex) / RAY;
      const debt = balanceToNum(variableDebt, decimals);

      // 计算USD价值
      const priceUsd =
        (Number(reserve.priceInMarketReferenceCurrency) *
          Number(base.marketReferenceCurrencyPriceInUsd)) /
        1e8;
      const usdValue = debt * priceUsd;

      // 使用可变利率 (Aave V3中stable已弃用)
      const apy = formatPercent(rayToApy(reserve.variableBorrowRate));

      return {
        debt,
        usdValue,
        apy,
        variableDebt: debt, // 简化：debt 就是 variableDebt
        canRepay: debt > 0,
        ...userReserve,
        ...reserve,
      };
    })
    .filter(Boolean); // 过滤掉null值

  console.log('final userBorrows', userBorrows);
  return userBorrows;
}
