import { createContext, useContext } from 'react';

import { useAaveMarket } from '@/hooks/useAaveMarket';

// 定义Context的类型
type AaveMarketContextType = ReturnType<typeof useAaveMarket>;

const Ctx = createContext<AaveMarketContextType | null>(null);

export function AaveMarketProvider({ children }: { children: React.ReactNode }) {
  const value = useAaveMarket();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAaveCtx = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error('useAaveCtx must be used within AaveMarketProvider');
  }
  return context;
};
