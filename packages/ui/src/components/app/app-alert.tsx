import * as React from "react"
import { Alert, AlertTitle, AlertDescription } from "../alert"
import { cn } from "../../lib/utils"
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react"

export interface AppAlertProps extends Omit<React.ComponentProps<"div">, "title"> {
  intent?: "info" | "success" | "warning" | "danger" | "neutral"
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  actions?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  role?: "status" | "alert"
}

const intentIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  neutral: Info,
}

export function AppAlert({
  className,
  intent = "neutral",
  title,
  description,
  icon,
  actions,
  dismissible,
  onDismiss,
  role, // Default handled inside logic based on intent if undefined
  children, // Disallow arbitrary children if we want strict grid? No, keeping flexible for now but ignoring in favor of props
  ...props
}: AppAlertProps) {
  // Determine role. Default is "status". If intent is danger, default to "alert". User override wins.
  const finalRole = role ?? (intent === "danger" ? "alert" : "status")

  // Resolve Icon
  const IconComponent = intentIcons[intent]
  const renderedIcon = icon === undefined ? <IconComponent className="h-4 w-4" /> : icon

  return (
    <Alert
      className={cn(
        // Base structure overrides
        "grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 rounded-lg border p-4 shadow-none",
        
        // Remove default shadcn icon handling which uses absolute positioning or specific SVG targeting
        // We are rebuilding the internal layout to be more robust
        "[&>svg]:static [&>svg]:translate-y-0",

        // Intent: Neutral
        intent === "neutral" && "bg-card border-border text-foreground",

        // Intent: Info
        intent === "info" && "bg-state-info/10 border-state-info text-foreground",

        // Intent: Success
        intent === "success" && "bg-state-success/10 border-state-success text-foreground",

        // Intent: Warning
        intent === "warning" && "bg-state-warning/10 border-state-warning text-foreground",

        // Intent: Danger
        intent === "danger" && "bg-state-danger/10 border-state-danger text-foreground",

        className
      )}
      role={finalRole}
      {...props}
    >
      {/* Left Icon */}
      <div
        className={cn(
          "flex shrink-0 items-center justify-center mt-0.5",
          intent === "neutral" && "text-foreground",
          intent === "info" && "text-state-info",
          intent === "success" && "text-state-success",
          intent === "warning" && "text-state-warning",
          intent === "danger" && "text-state-danger"
        )}
      >
        {renderedIcon}
      </div>

      {/* Middle Content */}
      <div className="flex flex-col gap-1 min-w-0">
        {title && (
          <AlertTitle className="mb-0 leading-tight font-medium text-inherit">
            {title}
          </AlertTitle>
        )}
        {description && (
          <AlertDescription className="text-muted-foreground leading-normal">
            {description}
          </AlertDescription>
        )}
      </div>

      {/* Right Actions & Dismiss */}
      {(actions || dismissible) && (
        <div className="flex items-center gap-2 shrink-0 self-start -mt-0.5">
          {actions}
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className={cn(
                "rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                 // Use semantic colors for the X button to match the context
                 intent === "neutral" && "text-foreground hover:bg-muted",
                 intent !== "neutral" && "text-current hover:bg-black/5 dark:hover:bg-white/10"
              )}
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </Alert>
  )
}
