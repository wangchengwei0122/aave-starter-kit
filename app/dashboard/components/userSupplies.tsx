'use client';

import { ReactNode } from 'react';
import { AlertTriangle, Check, Minus } from 'lucide-react';

import AssetsItem from '@/components/common/AssetsItem';
import CollapsibleCard from '@/components/common/CollapsibleCard';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AssetRow } from '@/lib/aggregators';

interface UserSupplieProps {
  children?: ReactNode;
  supplies?: any[];
}

export default function UserSupplies({ supplies }: UserSupplieProps) {
  return (
    <CollapsibleCard title="Your supplies">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Assets</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>APY</TableHead>
            <TableHead>Collateral</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplies?.map((supply, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <AssetsItem symbol={supply.symbol} />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>{supply.wallet}</span>
                  {supply.wallet < 0.01 && supply.wallet > 0 && (
                    <AlertTriangle className="text-red-500" size={12} />
                  )}
                </div>
              </TableCell>
              <TableCell>{supply.supplyAPY}</TableCell>
              <TableCell className="text-center">
                {supply.canCollateral ? (
                  <Check className="text-green-400" size={20} />
                ) : (
                  <Minus className="text-gray-400" size={20} />
                )}
              </TableCell>
              <TableCell>
                <Button className="mr-2">Supply</Button>
                <Button variant="outline" disabled={!supply.canCollateral}>
                  Withdraw
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
