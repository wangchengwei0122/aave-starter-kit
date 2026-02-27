import * as React from "react"
import { AppSelect, AppSelectTrigger, AppSelectContent, AppSelectItem, AppSelectValue } from "@workspace/ui/components"
import { AppBadge } from "@workspace/ui/components"

export function MarketSelector() {
  return (
    <div className="flex items-center gap-3 space-x-2">
      <div className="flex min-w-[200px] items-center gap-2">
        <div className="bg-blue-500 rounded-full size-6 flex items-center justify-center text-white shrink-0">
          <span className="text-[10px] font-bold pb-0.5">S</span>
        </div>
        <AppSelect defaultValue="base">
          <AppSelectTrigger className="border-none shadow-none bg-transparent hover:bg-muted/50 text-xl font-bold p-0 h-auto focus:ring-0 [&>svg]:size-5 [&>svg]:text-muted-foreground gap-1">
            <AppSelectValue />
          </AppSelectTrigger>
          <AppSelectContent align="start">
            <AppSelectItem value="base">
              Base Market
            </AppSelectItem>
            <AppSelectItem value="ethereum">
              Ethereum Market
            </AppSelectItem>
            <AppSelectItem value="arbitrum">
              Arbitrum Market
            </AppSelectItem>
          </AppSelectContent>
        </AppSelect>
      </div>

      <AppBadge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 shrink-0 font-medium">
        V3
      </AppBadge>
    </div>
  )
}
