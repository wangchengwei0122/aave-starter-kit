import * as React from "react"
import { cn } from "../../lib/utils"

type Tone = "primary" | "secondary" | "muted" | "inverted"
type Intent = "success" | "warning" | "danger" | "info"

interface CommonProps extends React.HTMLAttributes<HTMLElement> {
  size?: "xs" | "sm" | "md"
  as?: "span" | "p" | "div"
  children?: React.ReactNode
}

type ToneProps = CommonProps & {
  tone?: Tone
  intent?: never
}

type IntentProps = CommonProps & {
  tone?: never
  intent?: Intent
}

export type AppTextProps = ToneProps | IntentProps

export function AppText({
  className,
  as: Component = "span",
  size = "md",
  tone,
  intent,
  ...props
}: AppTextProps) {
  // Default to tone="primary" if neither tone nor intent is provided
  const effectiveTone = !intent && !tone ? "primary" : tone

  return (
    <Component
      className={cn(
        // Base styles
        "font-sans antialiased transition-colors",
        
        // Sizes
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "md" && "text-base",

        // Tones
        effectiveTone === "primary" && "text-text-primary",
        effectiveTone === "secondary" && "text-text-secondary",
        effectiveTone === "muted" && "text-muted-foreground",
        effectiveTone === "inverted" && "text-text-inverted",

        // Intents
        intent === "success" && "text-state-success",
        intent === "warning" && "text-state-warning",
        intent === "danger" && "text-state-danger",
        intent === "info" && "text-state-info",

        // Disabled state support (via aria or class)
        // The requirement asks to support disabled state.
        // We can check aria-disabled match or simple utility class usage.
        // Since we don't control the 'disabled' prop on span/p/div standardly like clean buttons,
        // we allow consumers to pass standard props.
        // We'll add a utility modifier for generic disabled appearance if needed, 
        // but typically text doesn't have a "disabled" prop. 
        // However, requirement says "Support: disabled (reduced opacity via token or utility)"
        // We will add a conditional class if aria-disabled is true, or just base utility.
        "aria-disabled:opacity-50",

        className
      )}
      {...props}
    />
  )
}
