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
    
    // Map App variants to Shadcn variants
    const variantMap: Record<NonNullable<AppButtonProps["variant"]>, ShadcnButtonProps["variant"]> = {
      primary: "default",
      secondary: "secondary",
      ghost: "ghost",
      destructive: "destructive",
    }

    // Map App sizes to Shadcn sizes
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
        className={cn(className)}
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
