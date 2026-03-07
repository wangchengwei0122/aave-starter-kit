import * as React from "react"
import {
  AppCard,
  AppText,
  AppTable,
  AppTableHeader,
  AppTableRow,
  AppTableHead,
  AppTableBody,
  AppTableCell,
  AppButton,
  AppSwitch,
  AppTokenIcon,
  AppBadge,
  AppSkeleton
} from "@workspace/ui/components"
import { useUserPositions } from "@workspace/web3"

// The hook returns a slightly different shape so we'll adjust the rendering to match it or map it if needed
// For now, useUserPositions returns simple empty arrays until we do wallet integration

export function PositionsList() {
  const { supplies, borrows, isBlocked } = useUserPositions()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 -mt-8 relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      {/* Supplies Card */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <AppText size="md" className="font-semibold text-foreground">Your supplies</AppText>
        </div>
        
        <div className="p-4 border-b border-border flex items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <AppText size="sm" tone="muted">Balance</AppText>
             <AppSkeleton className="h-6 w-16" />
          </div>
          <div className="flex flex-col gap-1.5">
            <AppText size="sm" tone="muted">APY</AppText>
             <AppSkeleton className="h-6 w-12" />
          </div>
          <div className="flex flex-col gap-1.5">
             <AppText size="sm" tone="muted">Collateral</AppText>
             <AppSkeleton className="h-6 w-16" />
          </div>
        </div>

        {supplies.length === 0 ? (
           <div className="p-6 text-center text-muted-foreground">Nothing supplied yet</div>
        ) : (
          <AppTable>
            <AppTableHeader>
              <AppTableRow>
                <AppTableHead>Asset</AppTableHead>
                <AppTableHead align="right">Balance</AppTableHead>
                <AppTableHead align="right">APY</AppTableHead>
                <AppTableHead align="center">Collateral</AppTableHead>
                <AppTableHead align="right"><span className="sr-only">Actions</span></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {supplies.map((item: any) => (
                <AppTableRow key={item.asset}>
                  <AppTableCell>
                    <div className="flex items-center gap-2">
                      <AppTokenIcon symbol={item.symbol} />
                      <AppText className="font-semibold">{item.asset}</AppText>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex flex-col">
                      <AppText className="font-medium text-foreground text-sm">{item.balanceAmount}</AppText>
                      <AppText size="xs" tone="muted">{item.balanceUsd}</AppText>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                     <AppText className="font-medium text-foreground text-sm">{item.apy}</AppText>
                  </AppTableCell>
                  <AppTableCell align="center">
                    <AppSwitch checked={item.isCollateral} />
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <AppButton variant="primary" size="sm">Supply</AppButton>
                      <AppButton variant="secondary" size="sm">Withdraw</AppButton>
                    </div>
                  </AppTableCell>
                </AppTableRow>
              ))}
            </AppTableBody>
          </AppTable>
        )}
      </AppCard>

      {/* Borrows Card */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
         <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <AppText size="md" className="font-semibold text-foreground">Your borrows</AppText>
          </div>
        </div>
        
        {borrows.length === 0 ? (
           <div className="p-6 text-muted-foreground flex items-center justify-between">
              <AppText size="sm">Nothing borrowed yet</AppText>
           </div>
        ) : (
           <div className="p-6 text-center text-muted-foreground">List would go here</div>
        )}
      </AppCard>
    </div>
  )
}
