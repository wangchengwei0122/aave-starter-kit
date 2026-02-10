"use client"

import { usePathname } from "next/navigation"
import { AppHeader } from "@workspace/ui/components"
import { HeaderWalletActions } from "./header-wallet-actions"

export function ActiveHeader() {
  const pathname = usePathname()

  return (
    <AppHeader
      navItems={[
        { label: "Dashboard", href: "/" },
        { label: "Markets", href: "/markets" },
        { label: "Governance", href: "/governance" },
      ]}
      activeHref={pathname}
      className="mb-6"
      actions={<HeaderWalletActions />}
    />
  )
}
