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
  AppBadge
} from "@workspace/ui/components"

interface Position {
  asset: string
  symbol: string
  balanceAmount: string
  balanceUsd: string
  apy: string
  isCollateral?: boolean
}

export function PositionsList() {
  const supplies: Position[] = [
    {
      asset: "USDC",
      symbol: "USDC",
      balanceAmount: "100.06",
      balanceUsd: "$100.05",
      apy: "0.45 %",
      isCollateral: true,
    }
  ]

  const borrows: Position[] = []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 -mt-8 relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
      {/* Supplies Card */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <AppText size="md" className="font-semibold text-foreground">Your supplies</AppText>
        </div>
        
        <div className="p-4 border-b border-border flex items-center gap-6">
          <div className="flex flex-col">
            <AppText size="sm" tone="muted">Balance</AppText>
             <AppText size="md" className="font-semibold text-foreground">$100.05</AppText>
          </div>
          <div className="flex flex-col">
            <AppText size="sm" tone="muted">APY</AppText>
             <AppText size="md" className="font-semibold text-foreground">0.45 %</AppText>
          </div>
          <div className="flex flex-col">
             <AppText size="sm" tone="muted">Collateral</AppText>
             <AppText size="md" className="font-semibold text-foreground">$100.05</AppText>
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
                <AppTableHead align="right"></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {supplies.map((item) => (
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
                      <AppButton intent="primary" size="sm">Supply</AppButton>
                      <AppButton variant="outline" size="sm">Withdraw</AppButton>
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
