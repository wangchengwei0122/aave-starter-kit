import * as React from "react"
import { Input } from "../input"
import { cn } from "../../lib/utils"
import { Spinner } from "../spinner"

export interface AppInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "prefix"> {
  size?: "sm" | "md" | "lg"
  error?: boolean
  loading?: boolean
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, size = "md", error, loading, disabled, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", className)}>
        <Input
          ref={ref}
          disabled={disabled}
          aria-invalid={error}
          className={cn(
            // Semantic Token Enforcement
            "border-border bg-background text-foreground placeholder:text-muted-foreground",
            "focus-visible:ring-ring focus-visible:ring-offset-0",
            
            // Sizes (Height & Font)
            size === "sm" && "h-8 text-xs px-2",
            size === "md" && "h-10 text-sm px-3",
            size === "lg" && "h-12 text-base px-4",

            // Loading state (padding for spinner)
            loading && "pr-10",

            // Error State (Overrides focus ring)
            error && "border-state-danger focus-visible:ring-state-danger",

            // Disabled state (shadcn handles opacity, but we reinforce if needed)
            disabled && "cursor-not-allowed opacity-50 bg-muted/50"
          )}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Spinner className="size-4 text-muted-foreground" />
          </div>
        )}
      </div>
    )
  }
)
AppInput.displayName = "AppInput"
