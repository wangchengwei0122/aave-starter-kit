"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../navigation-menu"
import { cn } from "../../lib/utils"

export interface AppNavigationMenuItem {
  label: string
  href: string
  disabled?: boolean
}

export interface AppNavigationMenuProps {
  items: AppNavigationMenuItem[]
  activeHref?: string
}

export function AppNavigationMenu({ items, activeHref }: AppNavigationMenuProps) {
  return (
    <NavigationMenu viewport={false} className="max-w-none">
      <NavigationMenuList className="gap-0.5">
        {items.map((item) => {
          const isActive = activeHref === item.href

          return (
            <NavigationMenuItem key={item.href}>
              <a
                href={item.disabled ? undefined : item.href}
                className={cn(
                  "relative inline-flex h-12 items-center rounded-sm px-3 text-lg font-medium leading-none",
                  "text-text-on-dark-muted transition-[color,background-color] duration-150",
                  "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:opacity-0 after:transition-opacity",
                  "after:bg-linear-to-r after:from-nav-active-start after:to-nav-active-end",
                  !item.disabled && [
                    "cursor-pointer",
                    "hover:text-text-on-dark hover:after:opacity-100",
                    "focus-visible:text-text-on-dark focus-visible:outline-none focus-visible:after:opacity-100",
                  ],
                  isActive && "text-text-on-dark after:opacity-100",
                  item.disabled && "pointer-events-none opacity-50"
                )}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : undefined}
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                {item.label}
              </a>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
