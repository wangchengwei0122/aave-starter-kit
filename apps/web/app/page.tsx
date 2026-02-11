import {
  AppCard,
  AppCardContent,
  AppCardHeader,
  AppCardTitle,
} from "@workspace/ui/components/app";

const OVERVIEW_ITEMS = [
  "Net worth",
  "Net APY",
  "Available rewards",
] as const;

const MARKET_CARDS = [
  "Your supplies",
  "Your borrows",
  "Assets to supply",
  "Assets to borrow",
] as const;

export default function Home() {
  return (
    <div className="bg-bg-app">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-bg-panel">
        <div className="mx-auto flex h-[300px] w-full max-w-[1200px] flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-text-primary">Market Overview</p>
          <h1 className="mt-3 text-4xl font-semibold text-text-primary">Base Market</h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {OVERVIEW_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-radius border border-border-default bg-card p-4"
              >
                <p className="text-sm text-text-primary">{item}</p>
                <p className="mt-2 text-sm text-text-primary">--</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {MARKET_CARDS.map((title) => (
            <AppCard key={title} className="border-border-default bg-card">
              <AppCardHeader className="flex-row items-center justify-between space-y-0">
                <AppCardTitle className="text-base text-text-primary">{title}</AppCardTitle>
                <span className="text-sm text-text-primary">Hide</span>
              </AppCardHeader>
              <AppCardContent>
                <p className="text-sm text-text-primary">Coming soon...</p>
              </AppCardContent>
            </AppCard>
          ))}
        </div>
      </section>
    </div>
  );
}
