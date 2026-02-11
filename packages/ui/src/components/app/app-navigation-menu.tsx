"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
      <NavigationMenuList className="gap-1">
        {items.map((item) => {
          const isActive = activeHref === item.href

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <a
                  href={item.disabled ? undefined : item.href}
                  className={cn(
                    "relative inline-flex h-16 items-center rounded-md px-3 text-base font-medium",
                    "text-text-on-dark-muted transition-[color,background-color] duration-200",
                    !item.disabled && "cursor-pointer hover:bg-bg-nav-hover/60 hover:text-text-on-dark",
                    isActive && [
                      "text-text-on-dark",
                      "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:content-['']",
                      "after:bg-linear-to-r after:from-nav-active-start after:to-nav-active-end",
                    ],
                    item.disabled && "pointer-events-none opacity-50"
                  )}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : undefined}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  {item.label}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
