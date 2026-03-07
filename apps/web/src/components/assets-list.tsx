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
  AppTokenIcon,
  AppCheckbox,
  AppSkeleton
} from "@workspace/ui/components"
import { useAaveMarkets } from "@workspace/web3"

export function AssetsList() {
  const { markets, isLoading, isError } = useAaveMarkets();

  // For Phase 2, we just render the same data in both tables since we don't have user balances yet
  // We'll slice the first few just so the UI isn't overwhelmingly long
  const suppliesToDiscover = markets.slice(0, 5);
  const borrowsToDiscover = markets.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mx-auto max-w-7xl px-6 lg:px-8 mb-20">
      {/* Assets to Supply */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <AppText size="md" className="font-semibold text-foreground">Assets to supply</AppText>
        </div>
        
        <div className="p-4 flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-2">
            <AppCheckbox label="Show assets with 0 balance" />
          </div>
        </div>

        <AppTable>
            <AppTableHeader>
              <AppTableRow>
                <AppTableHead>Assets</AppTableHead>
                <AppTableHead align="right">Wallet balance</AppTableHead>
                <AppTableHead align="right">APY</AppTableHead>
                <AppTableHead align="center">Can be collateral</AppTableHead>
                <AppTableHead align="right"><span className="sr-only">Actions</span></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {suppliesToDiscover.map((item: any) => (
                <AppTableRow key={item.symbol}>
                  <AppTableCell>
                    <div className="flex items-center gap-2">
                      <AppTokenIcon symbol={item.symbol} />
                      <div className="flex flex-col">
                        <AppText className="font-semibold text-sm">{item.symbol}</AppText>
                      </div>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                    <AppText className="font-medium text-sm">
                      {item.walletBalance || "—"}
                    </AppText>
                  </AppTableCell>
                  <AppTableCell align="right">
                     <AppText className="font-medium text-sm">
                       {(Number(item.supplyApy) * 100).toFixed(2)}%
                     </AppText>
                  </AppTableCell>
                  <AppTableCell align="center">
                    {item.canBeCollateral && <span className="text-green-500 font-bold">✓</span>}
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <AppButton variant="primary" size="sm">Supply</AppButton>
                      <AppButton variant="secondary" size="sm">Details</AppButton>
                    </div>
                  </AppTableCell>
                </AppTableRow>
              ))}
            </AppTableBody>
          </AppTable>
      </AppCard>

      {/* Assets to Borrow */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
         <div className="flex items-center justify-between p-4 border-b border-border">
            <AppText size="md" className="font-semibold text-foreground">Assets to borrow</AppText>
        </div>
        
         <AppTable>
            <AppTableHeader>
              <AppTableRow>
                <AppTableHead>Asset</AppTableHead>
                <AppTableHead align="right">Available</AppTableHead>
                <AppTableHead align="right">APY, variable</AppTableHead>
                <AppTableHead align="right"><span className="sr-only">Actions</span></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {borrowsToDiscover.map((item: any) => (
                <AppTableRow key={item.symbol}>
                  <AppTableCell>
                    <div className="flex items-center gap-2">
                      <AppTokenIcon symbol={item.symbol} />
                      <div className="flex flex-col">
                        <AppText className="font-semibold text-sm">{item.symbol}</AppText>
                      </div>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex flex-col items-end gap-1">
                      <AppText className="font-medium text-sm">
                       {Number(item.availableToBorrow).toFixed(2)}
                      </AppText>
                      <AppText className="text-xs text-muted-foreground">
                        {item.symbol}
                      </AppText>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                     <AppText className="font-medium text-sm">
                       {(Number(item.variableBorrowApy) * 100).toFixed(2)}%
                     </AppText>
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <AppButton variant="secondary" size="sm">Borrow</AppButton>
                      <AppButton variant="secondary" size="sm">Details</AppButton>
                    </div>
                  </AppTableCell>
                </AppTableRow>
              ))}
            </AppTableBody>
          </AppTable>
      </AppCard>
    </div>
  )
}
