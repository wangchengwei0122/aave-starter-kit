'use client';

import { AaveV3Sepolia } from '@bgd-labs/aave-address-book';
import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import { useReadContract } from 'wagmi';

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

  // console.log(AaveV3Sepolia);

  // console.log(IUiPoolDataProviderV3);
  // console.log(IPoolDataProvider);
  return <div>Dashboard</div>;
}
