"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

interface AppSelectProps {
  /**
   * The selected value
   */
  value?: string

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string

  /**
   * Whether the select is disabled
   */
  disabled?: boolean

  /**
   * The content of the select (AppSelectItem components)
   */
  children: React.ReactNode

  /**
   * Optional class name for the trigger
   */
  className?: string
}

interface AppSelectItemProps {
  /**
   * The value of the item
   */
  value: string

  /**
   * Whether the item is disabled
   */
  disabled?: boolean

  /**
   * The label/content of the item
   */
  children: React.ReactNode

  /**
   * Optional class name
   */
  className?: string
}

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------

function AppSelect({
  value,
  onValueChange,
  placeholder,
  disabled,
  children,
  className,
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={cn(
          // Base
          "h-10 w-full min-w-[140px] px-3 py-2",
          "text-sm font-medium",
          "transition-all duration-200",
          
          // Colors (Strict Token Usage)
          "bg-bg-surface",
          "text-foreground",
          "border-border-default",
          
          // Hover
          "hover:bg-bg-surface/80",
          
          // Focus
          "focus:ring-2 focus:ring-ring focus:ring-offset-0",
          
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        sideOffset={4}
        className={cn(
          "bg-bg-elevated",
          "border-border-default",
          "text-foreground",
          "shadow-md",
          "max-h-[300px]"
        )}
      >
        {children}
      </SelectContent>
    </Select>
  )
}

function AppSelectItem({
  value,
  disabled,
  children,
  className,
}: AppSelectItemProps) {
  return (
    <SelectItem
      value={value}
      disabled={disabled}
      className={cn(
        // Base
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        
        // Colors
        "text-foreground",
        
        // Focus/Active
        "focus:bg-bg-surface focus:text-foreground",
        
        // Disabled
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        
        className
      )}
    >
      {children}
    </SelectItem>
  )
}

// ----------------------------------------------------------------------------
// Exports
// ----------------------------------------------------------------------------

export { AppSelect, AppSelectItem }
export type { AppSelectProps, AppSelectItemProps }
