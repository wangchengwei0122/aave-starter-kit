import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog"
import { cn } from "../../lib/utils"

export const AppDialog = Dialog
export const AppDialogTrigger = DialogTrigger

export function AppDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        // Override default bg with strict semantic token
        "bg-bg-elevated border-border-default shadow-none",
        "p-6 gap-6",
        "max-w-[480px] w-full", // Finance-grade width constraint
        className
      )}
      {...props}
    >
      {children}
    </DialogContent>
  )
}

export function AppDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeader>) {
  return (
    <DialogHeader
      className={cn("gap-1.5 text-left", className)} // Ensure left align for institutional look
      {...props}
    />
  )
}

export function AppDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle
      className={cn("text-xl font-semibold text-foreground tracking-tight", className)}
      {...props}
    />
  )
}

export function AppDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      className={cn("text-sm text-text-secondary leading-relaxed", className)}
      {...props}
    />
  )
}

export function AppDialogBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-4 py-1", className)}
      {...props}
    />
  )
}

export function AppDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  return (
    <DialogFooter
      className={cn("mt-2", className)}
      {...props}
    />
  )
}
