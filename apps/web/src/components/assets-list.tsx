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
} from "@workspace/ui/components"

export function AssetsList() {
  const suppliesToDiscover = [
    {
      asset: "Tether",
      symbol: "USDT",
      walletBalance: "10,000.00",
      apy: "< 0.01 %",
      canBeCollateral: true,
    },
    {
      asset: "USD Coin",
      symbol: "USDC",
      walletBalance: "9,900.00",
      apy: "0.45 %",
      canBeCollateral: true,
    }
  ]

  const borrowsToDiscover = [
    {
      asset: "Tether",
      symbol: "USDT",
      available: "81.71",
      availableUsd: "$81.72",
      apy: "0.13 %",
    },
     {
      asset: "USD Coin",
      symbol: "USDC",
      available: "81.72",
      availableUsd: "$81.72",
      apy: "1.64 %",
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mx-auto max-w-7xl px-6 lg:px-8 mb-20">
      {/* Assets to Supply */}
      <AppCard className="p-0 overflow-hidden border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <AppText size="md" className="font-semibold text-foreground">Assets to supply</AppText>
        </div>
        
        <div className="p-4 flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-2">
            <AppCheckbox id="show-zero" />
            <AppText as="label" htmlFor="show-zero" size="sm" tone="muted" className="cursor-pointer">
              Show assets with 0 balance
            </AppText>
          </div>
        </div>

        <AppTable>
            <AppTableHeader>
              <AppTableRow>
                <AppTableHead>Assets</AppTableHead>
                <AppTableHead align="right">Wallet balance</AppTableHead>
                <AppTableHead align="right">APY</AppTableHead>
                <AppTableHead align="center">Can be collateral</AppTableHead>
                <AppTableHead align="right"></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {suppliesToDiscover.map((item) => (
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
                      <AppText className="font-medium text-foreground text-sm">{item.walletBalance}</AppText>
                  </AppTableCell>
                  <AppTableCell align="right">
                     <AppText className="font-medium text-foreground text-sm">{item.apy}</AppText>
                  </AppTableCell>
                  <AppTableCell align="center">
                    {item.canBeCollateral && <span className="text-green-500 font-bold">✓</span>}
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <AppButton intent="primary" size="sm">Supply</AppButton>
                      <AppButton variant="outline" size="sm">Details</AppButton>
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
                <AppTableHead align="right"></AppTableHead>
              </AppTableRow>
            </AppTableHeader>
            <AppTableBody>
              {borrowsToDiscover.map((item) => (
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
                    <div className="flex flex-col">
                      <AppText className="font-medium text-foreground text-sm">{item.available}</AppText>
                       <AppText size="xs" tone="muted">{item.availableUsd}</AppText>
                    </div>
                  </AppTableCell>
                  <AppTableCell align="right">
                     <AppText className="font-medium text-foreground text-sm">{item.apy}</AppText>
                  </AppTableCell>
                  <AppTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <AppButton variant="outline" size="sm">Borrow</AppButton>
                      <AppButton variant="outline" size="sm">Details</AppButton>
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
