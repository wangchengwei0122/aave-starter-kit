'use client';

import { AaveV3Sepolia } from '@bgd-labs/aave-address-book';
import { IUiPoolDataProvider_ABI } from '@bgd-labs/aave-address-book/abis';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';

import WalletBalanceProvider_ABI from '@/abis/WalletBalanceProvider_ABI';
import AssetsToSupply from './components/AssetsToSupply';
import Banner from './components/Banner';
import UserSupplies from './components/userSupplies';

export default function Dashboard() {
  const { address } = useAccount();

  // 并发调用三个合约方法
  const {
    data: contractsData,
    isLoading,
    error,
  } = useReadContracts({
    contracts: [
      {
        address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
        abi: IUiPoolDataProvider_ABI,
        functionName: 'getReservesData',
        args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER],
      },
      {
        address: AaveV3Sepolia.UI_POOL_DATA_PROVIDER,
        abi: IUiPoolDataProvider_ABI,
        functionName: 'getUserReservesData',
        args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER, address as `0x${string}`],
      },
      {
        address: AaveV3Sepolia.WALLET_BALANCE_PROVIDER,
        abi: WalletBalanceProvider_ABI,
        functionName: 'getUserWalletBalances',
        args: [AaveV3Sepolia.POOL_ADDRESSES_PROVIDER, address as `0x${string}`],
      },
    ],
  });

  // 解构每个返回值
  let reserves: readonly any[] = [];
  let userReserves: readonly any[] = [];
  let userWalletAddresses: string[] = [];
  let userWalletBalances: bigint[] = [];

  if (contractsData && Array.isArray(contractsData)) {
    // getReservesData 返回 [AggregatedReserveData[], BaseCurrencyInfo]
    const reservesResult = contractsData[0]?.result;
    if (Array.isArray(reservesResult) && reservesResult.length > 0) {
      reserves = reservesResult[0];
    }
    // getUserReservesData 返回 [UserReserveData[], uint8]
    const userReservesResult = contractsData[1]?.result;
    if (Array.isArray(userReservesResult) && userReservesResult.length > 0) {
      userReserves = userReservesResult[0];
    }
    // getUserWalletBalances 返回 [address[], uint256[]]
    const walletResult = contractsData[2]?.result;
    if (Array.isArray(walletResult) && walletResult.length === 2) {
      userWalletAddresses = walletResult[0] as string[];
      userWalletBalances = walletResult[1] as bigint[];
    }
  }

  console.log('userWalletAddresses userWalletBalances');
  console.log(userWalletAddresses, userWalletBalances);
  console.log('reserves');
  console.log(reserves);
  console.log('userReserves');
  console.log(userReserves);

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
          {/* 展示 reserves 数据 */}
          <div className="mb-4 p-4 border rounded">
            <h3 className="font-bold mb-2">Reserves（getReservesData）</h3>
            <ul>
              {Array.from(reserves).map((item, idx) => (
                <li key={item.underlyingAsset || idx} className="text-sm">
                  {item.symbol || 'Unknown'}: {item.underlyingAsset}
                </li>
              ))}
            </ul>
          </div>
          {/* 展示 userReserves 数据 */}
          <div className="mb-4 p-4 border rounded">
            <h3 className="font-bold mb-2">用户资产（getUserReservesData）</h3>
            <ul>
              {Array.from(userReserves).map((item, idx) => (
                <li key={item.underlyingAsset || idx} className="text-sm">
                  {item.underlyingAsset}: 供应余额 {item.scaledATokenBalance?.toString?.() ?? '0'}
                </li>
              ))}
            </ul>
          </div>
          {/* 展示钱包余额数据 */}
          <div className="mb-4 p-4 border rounded">
            <h3 className="font-bold mb-2">用户钱包余额（getUserWalletBalances）</h3>
            <ul>
              {userWalletAddresses.map((addr, idx) => (
                <li key={addr} className="text-sm">
                  {addr}: {userWalletBalances[idx]?.toString() ?? '0'}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <UserSupplies reserves={reserves} />
          <AssetsToSupply />
        </div>
      </div>
    </div>
  );
}
