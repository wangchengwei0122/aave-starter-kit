import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover"
import { cn } from "../../lib/utils"

export const AppPopover = Popover
export const AppPopoverTrigger = PopoverTrigger

export function AppPopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Override default styles with strict semantic tokens
        "bg-bg-elevated border-border-default text-foreground",
        // Flatten geometry - "Flat or very subtle elevation"
        "shadow-sm", 
        // Ensure minimal padding and roundedness
        "p-4 rounded-md",
        "w-72", // Default width
        className
      )}
      {...props}
    />
  )
}
