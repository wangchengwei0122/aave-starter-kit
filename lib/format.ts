import { formatUnits } from 'viem';

import { RAY } from './constants';

/** BigInt 利率 RAY → 百分比 number */
export const rayToPercent = (ray: bigint) => (Number(ray) / Number(RAY)) * 100;

/** BigInt 余额 → JS number（慎用大额，可改为 string） */
export const balanceToNum = (bal: bigint, decimals: number) => Number(formatUnits(bal, decimals));
