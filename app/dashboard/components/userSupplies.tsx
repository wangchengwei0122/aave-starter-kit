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
import { AssetRow } from '@/lib/aggregators';

interface UserSuppliesProps {
  children?: ReactNode;
  supplies?: readonly AssetRow[];
}

export default function UserSupplies({ supplies }: UserSuppliesProps) {
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
          {supplies?.map((supply, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <AssetsItem symbol={supply.symbol} />
              </TableCell>
              <TableCell>{supply.wallet}</TableCell>
              <TableCell>{supply.supplyAPY}</TableCell>
              <TableCell className="text-right">{supply.canCollateral ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
