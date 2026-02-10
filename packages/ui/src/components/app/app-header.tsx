"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { AppNavigationMenu, AppNavigationMenuItem } from "./app-navigation-menu"

export interface AppHeaderProps {
  /**
   * Navigation items to display in the header.
   */
  navItems: AppNavigationMenuItem[]
  /**
   * The current active href for highlighting the active navigation item.
   */
  activeHref?: string
  /**
   * Slot for right-aligned actions (e.g., Wallet Connect, Theme Toggle).
   * Renamed from 'rightSlot' for better semantics.
   */
  actions?: React.ReactNode
  /**
   * Optional className for the root header element.
   */
  className?: string
  /**
   * Optional custom Logo component.
   * If not provided, defaults to a simple text placeholder.
   */
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
        // Dark surface for both light and dark modes
        "bg-bg-primary dark:bg-bg-panel text-text-inverted border-border-default",
        "sticky top-0 z-50 w-full border-b backdrop-blur-sm",
        "h-12", // Fixed height: 48px
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center px-4">
        {/* Left Section: Logo + Nav */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center">
            {logo || (
              <span className="text-lg font-bold tracking-tight">
                Aave
              </span>
            )}
          </div>

          {/* Navigation - Left aligned next to Logo */}
          {navItems.length > 0 && (
            <AppNavigationMenu
              items={navItems}
              activeHref={activeHref}
            />
          )}
        </div>

        {/* Right Section: Actions - Pushed to the right */}
        <div className="ml-auto flex items-center gap-4">
          {actions}
        </div>
      </div>
    </header>
  )
}
