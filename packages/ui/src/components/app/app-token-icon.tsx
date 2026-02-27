import * as React from "react"
import { cn } from "../../lib/utils"

export interface AppTokenIconProps {
  /**
   * The symbol of the token (e.g., "USDC", "ETH").
   */
  symbol: string
  /**
   * The size of the token icon.
   */
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const colorMap: Record<string, string> = {
  USDC: "bg-[#2775CA] text-white",
  USDT: "bg-[#26A17B] text-white",
  DAI: "bg-[#F5AC37] text-white",
  ETH: "bg-[#627EEA] text-white",
  WBTC: "bg-[#F7931A] text-white",
  AAVE: "bg-[#B6509E] text-white",
  LINK: "bg-[#2A5ADA] text-white",
}

export function AppTokenIcon({ symbol, size = "md", className }: AppTokenIconProps) {
  const normSymbol = symbol.toUpperCase()

  // For this mockup, we are using a synthetic colored circle with the first letter.
  // In a real app, this would be an <img /> pointing to a CDN or local SVG assets.
  const bgColor = colorMap[normSymbol] || "bg-muted text-muted-foreground"
  const letter = normSymbol.charAt(0)

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold select-none",
        bgColor,
        size === "sm" && "size-5 text-[10px]",
        size === "md" && "size-7 text-xs",
        size === "lg" && "size-10 text-base",
        size === "xl" && "size-14 text-xl",
        className
      )}
      title={normSymbol}
    >
      {letter}
    </div>
  )
}
