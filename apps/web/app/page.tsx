"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppCardTitle,
  AppButton,
} from "@workspace/ui/components/app";

const OVERVIEW_ITEMS = ["Net worth", "Net APY", "Available rewards"] as const;

const MARKET_CARDS = [
  "Your supplies",
  "Your borrows",
  "Assets to supply",
  "Assets to borrow",
] as const;

export default function Home() {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (title: string) => {
    setCollapsedCards((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="bg-bg-app pb-10">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-b border-border-hero bg-bg-hero">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col px-4 pb-28 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14">
          <p className="text-sm text-text-on-dark-muted">Market Overview</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight text-text-on-dark">Base Market</h1>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {OVERVIEW_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-radius border border-border-hero bg-bg-hero-stat p-5"
              >
                <p className="text-base text-text-on-dark-muted">{item}</p>
                <p className="mt-2 text-3xl font-semibold leading-none text-text-on-dark">--</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-14 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {MARKET_CARDS.map((title) => {
            const isCollapsed = Boolean(collapsedCards[title]);

            return (
              <AppCard
                key={title}
                className={isCollapsed ? "min-h-[96px] border-border-subtle bg-card" : "min-h-[236px] border-border-subtle bg-card"}
              >
                <AppCardHeader className="flex-row items-center justify-between space-y-0">
                  <AppCardTitle className="text-2xl text-text-primary">{title}</AppCardTitle>
                  <AppButton
                    variant="ghost"
                    size="sm"
                    aria-label={isCollapsed ? "Expand card" : "Collapse card"}
                    onClick={() => toggleCard(title)}
                    className="h-8 w-8 p-0 text-text-secondary hover:bg-bg-panel hover:text-text-primary"
                  >
                    {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </AppButton>
                </AppCardHeader>
                {!isCollapsed && (
                  <AppCardContent>
                    <p className="text-lg text-text-secondary">Coming soon...</p>
                  </AppCardContent>
                )}
              </AppCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
