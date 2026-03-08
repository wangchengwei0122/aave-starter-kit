"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useReserveDetail, useUserReserve } from "@workspace/web3";
import { ReserveOverview } from "@/src/components/asset-detail/reserve-overview";
import { ReserveConfiguration } from "@/src/components/asset-detail/reserve-configuration";
import { UserPosition } from "@/src/components/asset-detail/user-position";
import { AppText, AppTokenIcon, AppButton } from "@workspace/ui/components";
import { ArrowLeftIcon } from "lucide-react"; // Or similar standard icon if available, but Aave has a back button

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assetId = typeof params.assetId === "string" ? params.assetId : "";

  // Web3 hooks for data fetching
  const { reserve, isLoading, isError } = useReserveDetail(assetId);
  const userReserveResult = useUserReserve(assetId);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen p-8 flex justify-center items-center">
        <AppText className="text-muted-foreground animate-pulse">Loading reserve details...</AppText>
      </div>
    );
  }

  if (isError || !reserve) {
    return (
      <div className="bg-background min-h-screen p-8 flex flex-col justify-center items-center gap-4">
        <AppText className="text-warning text-lg font-bold">Reserve not found</AppText>
        <AppText className="text-muted-foreground">We could not find data for asset: {assetId}</AppText>
        <AppButton variant="primary" onClick={() => router.push("/markets")}>Back to Markets</AppButton>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Top Protocol Header (similar to dashboard but lighter) */}
      <div className="bg-card border-b border-border mb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
           <button 
             onClick={() => router.back()} 
             className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium"
           >
             <ArrowLeftIcon className="h-4 w-4" /> Go back
           </button>
           
           <div className="flex items-center gap-4">
               <AppTokenIcon symbol={reserve.symbol} className="h-10 w-10 md:h-12 md:w-12" />
               <div className="flex flex-col">
                   <AppText size="h3" className="font-bold text-foreground">
                       {reserve.name} <span className="text-muted-foreground font-normal ml-1">{reserve.symbol}</span>
                   </AppText>
               </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Column: Reserve Overview + Configuration */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <ReserveOverview reserve={reserve} />
             <ReserveConfiguration reserve={reserve} />
          </div>

          {/* Sidebar Info Column: User Position */}
          <div className="lg:col-span-1">
             <UserPosition userReserve={userReserveResult} symbol={reserve.symbol} />
          </div>
        </div>
      </div>
    </div>
  );
}
