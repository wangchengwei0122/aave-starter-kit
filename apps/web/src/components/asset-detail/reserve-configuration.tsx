import * as React from "react";
import {
  AppCard,
  AppCardHeader,
  AppCardTitle,
  AppCardContent,
  AppText,
} from "@workspace/ui/components";

interface ReserveConfigurationProps {
  reserve: {
    maxLtv: string;
    liquidationThreshold: string;
    liquidationPenalty: string;
    canBeCollateral: boolean;
  };
}

export function ReserveConfiguration({ reserve }: ReserveConfigurationProps) {
  return (
    <div className="w-full">
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm h-full flex flex-col">
        <AppCardHeader className="p-4 border-b border-border bg-muted/20">
          <AppCardTitle>
            <AppText size="md" className="font-semibold text-foreground">
              Collateral usage
            </AppText>
          </AppCardTitle>
        </AppCardHeader>
        <AppCardContent className="p-4 flex flex-col gap-4 flex-grow">
          {reserve.canBeCollateral ? (
            <AppText className="text-sm text-foreground mb-2">
              Can be used as collateral
            </AppText>
          ) : (
            <AppText className="text-sm text-warning mb-2">
              Cannot be used as collateral
            </AppText>
          )}

          <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
            <div className="flex flex-col gap-1">
              <AppText className="text-muted-foreground text-xs whitespace-nowrap">Max LTV</AppText>
              <AppText className="font-medium text-foreground">{reserve.maxLtv}</AppText>
            </div>
            <div className="flex flex-col gap-1">
              <AppText className="text-muted-foreground text-xs whitespace-nowrap">Liq. threshold</AppText>
              <AppText className="font-medium text-foreground">{reserve.liquidationThreshold}</AppText>
            </div>
            <div className="flex flex-col gap-1">
              <AppText className="text-muted-foreground text-xs whitespace-nowrap">Liq. penalty</AppText>
              <AppText className="font-medium text-foreground">{reserve.liquidationPenalty}</AppText>
            </div>
          </div>
        </AppCardContent>
      </AppCard>
    </div>
  );
}
