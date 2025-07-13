'use client';

import { useAaveCtx } from '@/context/AaveMarketCtx';
import AssetsToSupply from './components/AssetsToSupply';
import Banner from './components/Banner';
import UserSupplies from './components/userSupplies';

export default function Dashboard() {
  // const { address } = useAccount();

  const { rows: supplies, isLoading, error } = useAaveCtx();
  console.log('rows', supplies);

  if (isLoading) {
    return <div>正在加载数据...</div>;
  }
  if (error) {
    return <div>加载数据出错: {error.message}</div>;
  }

  return (
    <div>
      <Banner />
      <div className="flex -m-11 gap-4 w-[1400px] mx-auto">
        <div className="w-1/2 space-y-4">
          <UserSupplies supplies={supplies} />
          <AssetsToSupply />
        </div>
        <div className="w-1/2 space-y-4">
          <UserSupplies supplies={supplies} />
          <AssetsToSupply />
        </div>
      </div>
    </div>
  );
}
