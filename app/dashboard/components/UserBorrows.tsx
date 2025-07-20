'use client';

import { ReactNode } from 'react';

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

interface UserBorrowsProps {
  children?: ReactNode;
  borrows?: readonly AssetRow[];
}

export default function UserBorrows({ borrows }: UserBorrowsProps) {
  return (
    <CollapsibleCard title="Your borrows">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>APY, variable</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows?.map((borrow, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <AssetsItem symbol={borrow.symbol} />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex flex-col">
                  <span>{borrow.supplied.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">
                    ${(borrow.supplied * borrow.priceUsd).toFixed(2)}
                  </span>
                </div>
              </TableCell>
              <TableCell>{borrow.borrowAPY}</TableCell>
              <TableCell>
                <Button className="mr-2">Borrow</Button>
                <Button variant="outline">Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
