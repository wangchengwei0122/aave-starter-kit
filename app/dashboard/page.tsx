'use client';

import { AaveV3Sepolia } from '@bgd-labs/aave-address-book';
import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import { useReadContract } from 'wagmi';

import AssetsToSupply from './components/AssetsToSupply';
import Banner from './components/Banner';
import UserSupplies from './components/userSupplies';

export default function Dashboard() {
  const { data: reservesData } = useReadContract({
    address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
    abi: IUiPoolDataProvider_ABI,
    functionName: 'getReservesData',
    args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER],
  });
  console.log('reservesData');
  console.log(reservesData);

  const { data: reservesList } = useReadContract({
    address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
    abi: IUiPoolDataProvider_ABI,
    functionName: 'getReservesList',
    args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER],
  });
  console.log('reservesList');
  console.log(reservesList);

  // 获取第一个元素（AggregatedReserveData数组）
  const reserves = reservesData?.[0];

  return (
    <div>
      <Banner />
      <div className="flex -m-11 gap-4 w-[1400px] mx-auto">
        <div className="w-1/2 space-y-4">
          <UserSupplies reserves={reserves} />
          <AssetsToSupply />
        </div>
        <div className="w-1/2 space-y-4">
          <UserSupplies reserves={reserves} />
          <AssetsToSupply />
        </div>
      </div>
    </div>
  );
}
