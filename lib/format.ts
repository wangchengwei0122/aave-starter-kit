import { formatUnits } from 'viem';

import { RAY } from './constants';

/** BigInt 余额 → JS number（慎用大额，可改为 string） */
export const balanceToNum = (bal: bigint, decimals: number) => Number(formatUnits(bal, decimals));

const SECONDS_PER_YEAR = BigInt(365 * 24 * 60 * 60); // 31 536 000

export function rayToApr(ray: bigint) {
  return Number(ray) / Number(RAY); // RAY = 1e27
}

/** 把 RAY-APR 转成百分数形式的 APY */
export function rayToApy(ray: bigint) {
  const apr = rayToApr(ray); // 0.0 … 10.0
  const apy = Math.pow(1 + apr / Number(SECONDS_PER_YEAR), Number(SECONDS_PER_YEAR)) - 1;
  return apy * 100; // 转成 %
}

export function formatPercent(value: number): string {
  if (value === 0) return '0 %';
  if (value < 0.01) return '< 0.01 %';

  // 四舍五入到 2 位小数，并加上千位分隔
  return (
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' %'
  );
}
