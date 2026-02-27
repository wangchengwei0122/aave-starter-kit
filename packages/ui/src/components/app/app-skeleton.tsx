import * as React from "react"
import { Skeleton } from "../skeleton"
import { cn } from "../../lib/utils"

export interface AppSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines predefined shapes for the skeleton.
   */
  shape?: "rectangle" | "circle" | "text"
}

export function AppSkeleton({
  shape = "rectangle",
  className,
  ...props
}: AppSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        shape === "circle" && "rounded-full",
        shape === "text" && "h-4 w-full",
        className
      )}
      {...props}
    />
  )
}
