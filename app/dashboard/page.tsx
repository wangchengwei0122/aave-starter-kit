'use client';

import { useAaveCtx } from '@/context/AaveMarketCtx';
import AssetsToBorrow from './components/AssetsToBorrow';
import AssetsToSupply from './components/AssetsToSupply';
import Banner from './components/Banner';
import UserBorrows from './components/UserBorrows';
import UserSupplies from './components/userSupplies';

export default function Dashboard() {
  // const { address } = useAccount();

  const {
    rows: supplies,
    borrowRows,
    userSupplies: userSuppliesRows,
    userBorrows: userBorrowsRows,
    userPosition,
    isLoading,
    error,
  } = useAaveCtx();
  // console.log('rows', supplies);
  // console.log('borrowRows', borrowRows);

  // console.log('userSuppliAAAAAesRows', userSuppliesRows);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f1f1f3] flex items-center justify-center">
        <div className="bg-[#ffffff] border border-[#eaebef] rounded-xl p-8 text-center shadow-2xl">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">正在加载数据...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#f1f1f3] flex items-center justify-center">
        <div className="bg-[#ffffff] border border-red-500/30 rounded-xl p-8 text-center shadow-2xl">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-red-400 text-lg font-semibold mb-2">加载数据出错</h2>
          <p className="text-gray-400">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f1f1f3]">
      <Banner />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <UserSupplies supplies={userSuppliesRows} />
            <AssetsToSupply supplies={supplies} />
          </div>
          <div className="space-y-6">
            <UserBorrows borrows={userBorrowsRows?.filter(Boolean) || []} />
            <AssetsToBorrow borrows={borrowRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
