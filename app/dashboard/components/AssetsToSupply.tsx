'use client';

import { ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';

import AssetsItem from '@/components/common/AssetsItem';
import CollapsibleCard from '@/components/common/CollapsibleCard';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AssetRow } from '@/lib/aggregators';

interface AssetsSupplieProps {
  children?: ReactNode;
  supplies?: readonly AssetRow[];
}

export default function AssetsToSupply({ supplies }: AssetsSupplieProps) {
  return (
    <CollapsibleCard title="Assets To Supply">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Assets</TableHead>
            <TableHead>Wallet balance</TableHead>
            <TableHead>APY</TableHead>
            <TableHead>Can be collateral</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplies?.map((supply, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <AssetsItem symbol={supply.symbol} />
              </TableCell>
              <TableCell className="text-center">{supply.wallet}</TableCell>
              <TableCell>{supply.supplyAPY}</TableCell>
              <TableCell className="text-center">
                {supply.canCollateral ? (
                  <Check className="text-green-400" size={20} />
                ) : (
                  <Minus className="text-gray-400" size={20} />
                )}
              </TableCell>
              <TableCell>
                <Button disabled={!supply.canCollateral}>Supply</Button>
                <Button disabled={!supply.canCollateral}>Supply</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
