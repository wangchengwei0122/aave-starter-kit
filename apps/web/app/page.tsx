"use client";

import { DashboardTopPanel } from "@/src/components/dashboard-top-panel";
import { PositionsList } from "@/src/components/positions-list";
import { AssetsList } from "@/src/components/assets-list";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <DashboardTopPanel />
      <PositionsList />
      <AssetsList />
    </div>
  );
}
