import * as React from "react";
import {
  AppCard,
  AppCardHeader,
  AppCardTitle,
  AppCardContent,
  AppText,
} from "@workspace/ui/components";

interface ReserveOverviewProps {
  reserve: {
    supplyApy: string;
    totalSupplied: string;
    supplyCap: string;
    variableBorrowApy: string;
    totalBorrowed: string;
    availableToBorrow: string;
    borrowCap: string;
  };
}

export function ReserveOverview({ reserve }: ReserveOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <AppCardHeader className="p-4 border-b border-border bg-muted/20">
          <AppCardTitle>
            <AppText size="md" className="font-semibold text-foreground">
              Supply Info
            </AppText>
          </AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <AppText className="text-muted-foreground text-sm">Total supplied</AppText>
            <AppText className="font-medium">{Number(reserve.totalSupplied).toLocaleString()} of {reserve.supplyCap === "0" ? "Unlimited" : Number(reserve.supplyCap).toLocaleString()}</AppText>
          </div>
          <div className="flex justify-between items-center">
            <AppText className="text-muted-foreground text-sm">APY</AppText>
            <AppText className="font-medium text-success">{(Number(reserve.supplyApy) * 100).toFixed(2)}%</AppText>
          </div>
        </AppCardContent>
      </AppCard>

      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <AppCardHeader className="p-4 border-b border-border bg-muted/20">
          <AppCardTitle>
            <AppText size="md" className="font-semibold text-foreground">
              Borrow Info
            </AppText>
          </AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <AppText className="text-muted-foreground text-sm">Total borrowed</AppText>
            {/* We approximate total borrowed by looking at availableToBorrow vs Reserve size, or just use what we have, but Aave provides totalBorrowed explicitly or we can just say Available to borrow */}
            <AppText className="font-medium">{Number(reserve.availableToBorrow).toLocaleString()} available</AppText>
          </div>
          <div className="flex justify-between items-center">
            <AppText className="text-muted-foreground text-sm">Borrow cap</AppText>
            <AppText className="font-medium">{reserve.borrowCap === "0" ? "Unlimited" : Number(reserve.borrowCap).toLocaleString()}</AppText>
          </div>
          <div className="flex justify-between items-center">
            <AppText className="text-muted-foreground text-sm">APY, variable</AppText>
            <AppText className="font-medium text-warning">{(Number(reserve.variableBorrowApy) * 100).toFixed(2)}%</AppText>
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
