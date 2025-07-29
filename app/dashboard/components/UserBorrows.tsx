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

interface UserBorrowItem {
  symbol: string;
  debt: number;
  usdValue: number;
  apy: string;
  variableDebt: number;
  canRepay: boolean;
  underlyingAsset: string;
}

interface UserBorrowsProps {
  children?: ReactNode;
  borrows?: UserBorrowItem[];
}

export default function UserBorrows({ borrows }: UserBorrowsProps) {
  return (
    <CollapsibleCard title="Your borrows">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset</TableHead>
            <TableHead>Debt</TableHead>
            <TableHead>APY</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows && borrows.length > 0 ? (
            borrows.map((borrow, index) => (
              <TableRow key={`${borrow.underlyingAsset}-${index}`}>
                <TableCell className="font-medium">
                  <AssetsItem symbol={borrow.symbol} />
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col">
                    <span>{borrow.debt.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">${borrow.usdValue.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{borrow.apy}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" className="mr-2">
                      Borrow
                    </Button>
                    <Button size="sm" variant="outline" disabled={!borrow.canRepay}>
                      Repay
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                您暂无借款
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollapsibleCard>
  );
}
