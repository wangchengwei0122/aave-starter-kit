"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../navigation-menu"
import { cn } from "../../lib/utils"

export interface AppNavigationMenuItem {
  label: string
  href: string
  disabled?: boolean
}

export interface AppNavigationMenuProps {
  items: AppNavigationMenuItem[]
  /**
   * For visual testing or manual overrides of active state.
   * In a real app, this would likely be determined by `usePathname`.
   */
  activeHref?: string
}

export function AppNavigationMenu({ items, activeHref }: AppNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => {
          const isActive = activeHref === item.href
          
          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink asChild>
                <a
                  href={item.disabled ? undefined : item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent cursor-pointer transition-colors",
                    // Base text color
                    "text-muted-foreground",
                    // Hover state for inactive items
                    !isActive && !item.disabled && "hover:bg-transparent hover:text-foreground",
                    // Active state
                    isActive && "text-foreground bg-accent/50",
                    // Disabled state
                    item.disabled && "pointer-events-none opacity-50",
                    // Additional tweaks if needed
                    "h-9 px-4 py-2" 
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
