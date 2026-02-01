import * as React from "react"
import { Badge } from "../badge"
import { cn } from "../../lib/utils"

export interface AppBadgeProps extends React.ComponentProps<typeof Badge> {
  intent?: "success" | "warning" | "danger" | "info" | "neutral"
  size?: "sm" | "md"
  variant?: "solid" | "outline"
}

export function AppBadge({
  className,
  intent = "neutral",
  size = "md",
  variant = "solid",
  ...props
}: AppBadgeProps) {
  return (
    <Badge
      className={cn(
        // Base Overrides
        "rounded-sm font-normal tabular-nums shadow-none transition-colors",
        
        // Remove default shadcn hover if needed, relying on our own intent styles
        "hover:bg-opacity-100",

        // Size Variants
        size === "sm" && "px-1.5 py-0.5 text-[10px] h-5",
        size === "md" && "px-2 py-0.5 text-xs h-6",

        // Intent: Neutral (Default)
        intent === "neutral" && [
          variant === "solid" && "bg-secondary text-foreground hover:bg-secondary/80",
          variant === "outline" && "border border-border-default text-text-secondary bg-transparent hover:bg-secondary/10"
        ],

        // Intent: Success
        intent === "success" && [
          variant === "solid" && "bg-state-success text-white hover:bg-state-success/90",
          variant === "outline" && "border border-state-success text-state-success bg-transparent hover:bg-state-success/10"
        ],

        // Intent: Warning
        intent === "warning" && [
          variant === "solid" && "bg-state-warning text-white hover:bg-state-warning/90",
          variant === "outline" && "border border-state-warning text-state-warning bg-transparent hover:bg-state-warning/10"
        ],

        // Intent: Danger
        intent === "danger" && [
          variant === "solid" && "bg-state-danger text-white hover:bg-state-danger/90",
          variant === "outline" && "border border-state-danger text-state-danger bg-transparent hover:bg-state-danger/10"
        ],

        // Intent: Info
        intent === "info" && [
          variant === "solid" && "bg-state-info text-white hover:bg-state-info/90",
          variant === "outline" && "border border-state-info text-state-info bg-transparent hover:bg-state-info/10"
        ],

        className
      )}
      variant="default" // Force default so we control all styling via intent
      {...props}
    />
  )
}
