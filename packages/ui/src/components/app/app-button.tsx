import * as React from "react"
import { Button } from "../button"
import { Spinner } from "../spinner"
import { cn } from "../../lib/utils"

type ShadcnButtonProps = React.ComponentProps<typeof Button>

export interface AppButtonProps extends Omit<ShadcnButtonProps, "variant" | "size" | "asChild"> {
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const variantMap: Record<NonNullable<AppButtonProps["variant"]>, ShadcnButtonProps["variant"]> = {
      primary: "default",
      secondary: "secondary",
      ghost: "ghost",
      destructive: "destructive",
    }

    const sizeMap: Record<NonNullable<AppButtonProps["size"]>, ShadcnButtonProps["size"]> = {
      sm: "sm",
      md: "default",
      lg: "lg",
    }

    return (
      <Button
        ref={ref}
        variant={variantMap[variant]}
        size={sizeMap[size]}
        disabled={loading || disabled}
        aria-disabled={loading || disabled}
        className={cn(
          "rounded-md transition-all duration-150 focus-visible:ring-2",
          variant === "primary" && [
            "border border-transparent bg-action-primary text-action-primary-foreground",
            "hover:bg-action-primary-hover active:translate-y-px active:bg-action-primary-active",
          ],
          variant === "secondary" && [
            "border border-border-subtle bg-action-secondary text-action-secondary-foreground",
            "hover:bg-action-secondary-hover active:translate-y-px active:bg-action-secondary-active",
          ],
          variant === "ghost" && [
            "border border-transparent bg-transparent text-text-secondary",
            "hover:bg-accent hover:text-text-primary",
          ],
          loading && "disabled:cursor-wait disabled:opacity-90",
          className
        )}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {children}
      </Button>
    )
  }
)
AppButton.displayName = "AppButton"

export { AppButton }
