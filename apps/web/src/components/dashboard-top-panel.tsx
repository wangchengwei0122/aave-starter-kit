import * as React from "react"
import { AppText, AppTooltip, AppSkeleton, AppBadge } from "@workspace/ui/components"
import { Info } from "lucide-react"

interface StatCardProps {
  label: string
  value?: React.ReactNode
  subValue?: React.ReactNode
  tooltip?: string
  blocked?: boolean
}

function StatCard({ label, value, subValue, tooltip, blocked }: StatCardProps) {
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
        {blocked ? (
          <AppSkeleton className="h-7 w-24 bg-white/10" />
        ) : (
          <AppText size="md" className="text-xl font-bold font-mono tracking-tight text-foreground">
            {value || "—"}
          </AppText>
        )}
        {subValue && !blocked && (
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

        {/* 
          Dashboard Spec requires 4 blocks: 
          Net Worth, Supplied, Borrowed, Health Factor 
          Currently marked as blocked pending web3 integration (Phase 1).
        */}
        <div className="flex flex-wrap items-center gap-12">
          <StatCard
            label="Net worth"
            blocked
          />
          <StatCard
            label="Total supplied"
            blocked
          />
          <StatCard
            label="Total borrowed"
            blocked
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <AppText size="sm">Health factor</AppText>
              <AppTooltip content="Represents the safety of your deposited collateral against the borrowed assets and its underlying value.">
                <Info className="size-3.5 cursor-help" />
              </AppTooltip>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <AppBadge variant="outline" className="bg-white/10 text-white/50 border-transparent">
                BLOCKED
              </AppBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
