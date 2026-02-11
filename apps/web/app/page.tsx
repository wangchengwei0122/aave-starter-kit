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
          {MARKET_CARDS.map((title) => (
            <AppCard key={title} className="min-h-[236px] border-border-subtle bg-card">
              <AppCardHeader className="flex-row items-center justify-between space-y-0">
                <AppCardTitle className="text-2xl text-text-primary">{title}</AppCardTitle>
                <AppButton
                  variant="ghost"
                  size="sm"
                  className="h-8 px-0 text-base font-medium text-text-secondary hover:bg-transparent hover:text-text-primary"
                >
                  Hide
                </AppButton>
              </AppCardHeader>
              <AppCardContent>
                <p className="text-lg text-text-secondary">Coming soon...</p>
              </AppCardContent>
            </AppCard>
          ))}
        </div>
      </section>
    </div>
  );
}
