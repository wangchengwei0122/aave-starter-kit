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
                    // Base Layout & Reset
                    "bg-transparent transition-all relative h-9 px-4 py-2 cursor-pointer",
                    
                    // Text Colors (Dark Header Context)
                    // Inactive: Use text-secondary with high opacity for "greyish white" look
                    // Avoid text-muted as it might be too dark on bg-primary
                    "text-text-secondary dark:text-text-muted hover:text-text-inverted",
                    
                    // Hover State
                    // Subtle background lift using elevated surface opacity
                    // This works well on both light(dark-header) and dark modes
                    !item.disabled && "hover:bg-bg-elevated/20",

                    // Active State
                    isActive && [
                      "text-text-inverted font-medium",
                      // Active background (subtle)
                      "bg-bg-elevated/20", 
                      // Active Underline (Gradient)
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:content-['']",
                      "after:bg-linear-to-r after:from-state-info after:via-state-warning after:to-state-success"
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
