"use client";

import { MarketTopPanel } from "@/src/components/market-top-panel";
import { AssetsList } from "@/src/components/assets-list";

export default function MarketsPage() {
  return (
    <div className="bg-background min-h-screen">
      <MarketTopPanel />
      {/* We reuse AssetsList here to simulate the markets view for now */}
      <AssetsList />
    </div>
  );
}
