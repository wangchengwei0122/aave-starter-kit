import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip"

export interface AppTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover.
   */
  children: React.ReactNode
  /**
   * The content to display inside the tooltip.
   */
  content: React.ReactNode
  /**
   * Delay before the tooltip appears (ms).
   */
  delayDuration?: number
  /**
   * Where to position the tooltip relative to the trigger.
   */
  side?: "top" | "right" | "bottom" | "left"
}

export function AppTooltip({
  children,
  content,
  delayDuration = 200,
  side = "top",
}: AppTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
