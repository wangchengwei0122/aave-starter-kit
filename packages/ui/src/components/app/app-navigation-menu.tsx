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
                    // Reset base styles to transparent/cursor-pointer
                    "bg-transparent cursor-pointer transition-all relative h-9 px-4 py-2",
                    
                    // Base Text: Muted by default (on dark header, this needs to be readable)
                    // We use text-muted (greyish) which usually works on dark if tokens are correct.
                    // But since header force-sets text-text-inverted, we might need to be careful.
                    // Let's use specific token for inactive state on dark header if needed, 
                    // or rely on opacity. Aave usually has greyish inactive text.
                    "text-text-muted hover:text-text-inverted",

                    // Hover State (subtle background change)
                    !item.disabled && "hover:bg-bg-accent/10",

                    // Active State
                    isActive && [
                      "text-text-inverted font-medium", // Brighter text
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-state-info after:content-['']" // Underline
                    ],

                    // Disabled State
                    item.disabled && "pointer-events-none opacity-50 cursor-not-allowed"
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
