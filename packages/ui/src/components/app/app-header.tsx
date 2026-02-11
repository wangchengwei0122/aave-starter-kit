"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { AppNavigationMenu, AppNavigationMenuItem } from "./app-navigation-menu"

export interface AppHeaderProps {
  navItems: AppNavigationMenuItem[]
  activeHref?: string
  actions?: React.ReactNode
  className?: string
  logo?: React.ReactNode
}

export function AppHeader({
  navItems,
  activeHref,
  actions,
  className,
  logo,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-12 w-full border-b border-border-header bg-bg-header text-text-on-dark",
        "backdrop-blur supports-[backdrop-filter]:bg-bg-header/95",
        className
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <div className="flex h-12 items-center">
            {logo || (
              <span className="text-2xl font-semibold leading-none tracking-tight text-text-on-dark">
                Aave
              </span>
            )}
          </div>

          {navItems.length > 0 && (
            <AppNavigationMenu
              items={navItems}
              activeHref={activeHref}
            />
          )}
        </div>

        <div className="ml-auto flex h-12 items-center gap-2">{actions}</div>
      </div>
    </header>
  )
}
