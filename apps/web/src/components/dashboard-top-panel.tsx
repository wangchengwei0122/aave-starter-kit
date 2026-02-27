import * as React from "react"
import { AppText, AppTooltip } from "@workspace/ui/components"
import { Info } from "lucide-react"

interface StatCardProps {
  label: string
  value: React.ReactNode
  subValue?: React.ReactNode
  tooltip?: string
}

function StatCard({ label, value, subValue, tooltip }: StatCardProps) {
  const labelElement = (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <AppText size="sm">{label}</AppText>
      {tooltip && (
        <AppTooltip content={tooltip}>
          <Info className="size-3.5 cursor-help" />
        </AppTooltip>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-1">
      {labelElement}
      <div className="flex items-baseline gap-2">
        <AppText size="md" className="text-xl font-bold font-mono tracking-tight text-foreground">
          {value}
        </AppText>
        {subValue && (
          <AppText size="sm" tone="muted" className="font-mono">
            {subValue}
          </AppText>
        )}
      </div>
    </div>
  )
}

export function DashboardTopPanel() {
  return (
    <div className="w-full bg-[#1A1D27] text-white pt-8 pb-16 px-6 lg:px-8 border-b border-[#2C2F3A]">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* The MarketSelector would normally be rendered here by the parent or imported directly */}
          </div>
          <button className="text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors uppercase tracking-wider px-3 py-1.5 rounded-md text-white/90">
            View Transactions
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-12">
          <StatCard
            label="Net worth"
            value="$100.05"
          />
          <StatCard
            label="Net APY"
            value="0.45%"
            tooltip="The net annualized percentage yield considering all your supplies and borrows."
          />
          <div className="flex flex-col gap-1">
            <AppText size="sm" tone="muted">Available rewards</AppText>
             <div className="flex items-center gap-2">
               <AppText size="md" className="text-xl font-bold font-mono tracking-tight text-foreground">$0</AppText>
               <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white/50 uppercase cursor-not-allowed">
                 Claim
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
