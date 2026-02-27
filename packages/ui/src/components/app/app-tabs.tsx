import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"
import { cn } from "@workspace/ui/lib/utils"

export interface AppTabsProps {
  /**
   * The value of the tab that should be active when initially rendered.
   */
  defaultValue?: string
  /**
   * The controlled value of the tab to activate.
   */
  value?: string
  /**
   * Event handler called when the value changes.
   */
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function AppTabs({ children, className, ...props }: AppTabsProps) {
  return (
    <Tabs className={cn("w-full", className)} {...props}>
      {children}
    </Tabs>
  )
}

export interface AppTabsListProps {
  children: React.ReactNode
  className?: string
  /**
   * Use 'line' for underlined tabs (like under the main header), or 'pill' (default) for encapsulated segments.
   */
  variant?: "line" | "pill"
  /**
   * Expands the tab list to take up the full width. Best used with 'pill'.
   */
  fullWidth?: boolean
}

export function AppTabsList({ children, className, variant = "pill", fullWidth }: AppTabsListProps) {
  const isLine = variant === "line"
  return (
    // We override shadcn's list classes to ensure strict semantic colors are applied
    <TabsList
      className={cn(
        isLine
          ? "w-full justify-start rounded-none border-b border-border bg-transparent p-0 flex h-10 gap-6"
          : "bg-muted p-1 rounded-md h-10 w-max inline-flex items-center justify-center",
        fullWidth && !isLine && "w-full flex",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore - injecting internal prop to triggers
            "data-variant": variant,
          })
        }
        return child
      })}
    </TabsList>
  )
}

export interface AppTabsTriggerProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export function AppTabsTrigger({ value, disabled, children, className, ...props }: AppTabsTriggerProps) {
  // `data-variant` is injected by AppTabsList
  const variant = (props as any)["data-variant"] as "line" | "pill" | undefined
  const isLine = variant === "line"

  return (
    <TabsTrigger
      value={value}
      disabled={disabled}
      className={cn(
        // Common base styles
        "font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        
        // Variant overrides to replace shadcn defaults
        isLine
          ? "bg-transparent text-muted-foreground shadow-none h-10 m-0 px-1 py-0 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground"
          : "text-muted-foreground w-full py-1.5 px-3 rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
    >
      {children}
    </TabsTrigger>
  )
}

export interface AppTabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AppTabsContent({ value, children, className }: AppTabsContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </TabsContent>
  )
}
