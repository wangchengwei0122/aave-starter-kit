import { ReactNode } from 'react';

import AssetsItem from '@/components/common/AssetsItem';
import CollapsibleCard from '@/components/common/CollapsibleCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// 定义Reserve类型，使用readonly匹配合约返回的数据
interface Reserve {
  readonly symbol: string;
  readonly availableLiquidity: bigint;
  readonly liquidityRate: bigint;
  readonly usageAsCollateralEnabled: boolean;
  readonly [key: string]: unknown;
}

interface UserSuppliesProps {
  children?: ReactNode;
  reserves?: readonly Reserve[];
}

export default function UserSupplies({ reserves }: UserSuppliesProps) {
  return (
    <CollapsibleCard title="User Supplies">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Assets</TableHead>
            <TableHead>Wallet balance</TableHead>
            <TableHead>APY</TableHead>
            <TableHead className="text-right">Can be collateral</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reserves?.map((reserve, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <AssetsItem symbol={reserve.symbol} />
              </TableCell>
              <TableCell>{reserve.availableLiquidity?.toString() || '0'}</TableCell>
              <TableCell>{((Number(reserve.liquidityRate) / 1e27) * 100).toFixed(2)}%</TableCell>
              <TableCell className="text-right">
                {reserve.usageAsCollateralEnabled ? 'Yes' : 'No'}
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
