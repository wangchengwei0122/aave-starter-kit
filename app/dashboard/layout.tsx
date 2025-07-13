// app/dashboard/layout.tsx
'use client';

import { AaveMarketProvider } from '@/context/AaveMarketCtx';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AaveMarketProvider>{children}</AaveMarketProvider>;
}
