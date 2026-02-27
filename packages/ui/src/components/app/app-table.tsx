import * as React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../table"
import { cn } from "@workspace/ui/lib/utils"

export interface AppTableProps {
  children: React.ReactNode
}

export function AppTable({ children }: AppTableProps) {
  return <Table>{children}</Table>
}

export function AppTableHeader({ children }: { children: React.ReactNode }) {
  return <TableHeader>{children}</TableHeader>
}

export function AppTableBody({ children }: { children: React.ReactNode }) {
  return <TableBody>{children}</TableBody>
}

export function AppTableFooter({ children }: { children: React.ReactNode }) {
  return <TableFooter>{children}</TableFooter>
}

export interface AppTableRowProps {
  children: React.ReactNode
  /**
   * Visually highlights row if true
   */
  selected?: boolean
  onClick?: () => void
}

export function AppTableRow({ children, selected, onClick }: AppTableRowProps) {
  return (
    <TableRow
      data-state={selected ? "selected" : undefined}
      onClick={onClick}
      className={cn(onClick && "cursor-pointer hover:bg-muted/30")}
    >
      {children}
    </TableRow>
  )
}

export interface AppTableHeadProps {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  /**
   * Used when this header controls sorting
   */
  sortable?: boolean
  /**
   * The current sort direction if active
   */
  sortDirection?: "asc" | "desc" | null
}

export function AppTableHead({ children, align = "left", sortable, sortDirection }: AppTableHeadProps) {
  return (
    <TableHead
      className={cn(
        "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
        align === "center" && "text-center",
        align === "right" && "text-right",
        sortable && "cursor-pointer select-none hover:text-foreground transition-colors"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
      >
        {children}
        {sortable && sortDirection === "asc" && <span className="text-[10px]">↑</span>}
        {sortable && sortDirection === "desc" && <span className="text-[10px]">↓</span>}
        {sortable && !sortDirection && <span className="text-[10px] invisible group-hover:visible group-hover:text-muted-foreground/50">↕</span>}
      </div>
    </TableHead>
  )
}

export interface AppTableCellProps {
  children: React.ReactNode
  align?: "left" | "center" | "right"
  /**
   * Dimmed text color for secondary information
   */
  dimmed?: boolean
}

export function AppTableCell({ children, align = "left", dimmed }: AppTableCellProps) {
  return (
    <TableCell
      className={cn(
        "py-4", // slight padding increase for better rows
        align === "center" && "text-center",
        align === "right" && "text-right",
        dimmed && "text-muted-foreground"
      )}
    >
      {children}
    </TableCell>
  )
}

export function AppTableCaption({ children }: { children: React.ReactNode }) {
  return <TableCaption>{children}</TableCaption>
}
