'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink, Shield, TrendingDown, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAaveCtx } from '@/context/AaveMarketCtx';

interface MarketOption {
  id: string;
  name: string;
  version: string;
  testnet: string;
  icon: string;
  color: string;
}

const MARKETS: MarketOption[] = [
  {
    id: 'ethereum-sepolia',
    name: 'Ethereum',
    version: 'V3',
    testnet: 'Sepolia',
    icon: '🔷',
    color: 'text-blue-400',
  },
  {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum',
    version: 'V3',
    testnet: 'Sepolia',
    icon: '⚫',
    color: 'text-gray-400',
  },
  {
    id: 'base-sepolia',
    name: 'Base',
    version: 'V3',
    testnet: 'Sepolia',
    icon: '🔵',
    color: 'text-blue-400',
  },
  {
    id: 'avalanche-fuji',
    name: 'Avalanche',
    version: 'V3',
    testnet: 'Fuji',
    icon: '🔴',
    color: 'text-red-400',
  },
  {
    id: 'optimism-sepolia',
    name: 'Optimism',
    version: 'V3',
    testnet: 'Sepolia',
    icon: '🔴',
    color: 'text-red-400',
  },
  {
    id: 'scroll-sepolia',
    name: 'Scroll',
    version: 'V3',
    testnet: 'Sepolia',
    icon: '🟤',
    color: 'text-amber-400',
  },
];

export default function Market() {
  const { userPosition } = useAaveCtx();
  const [selectedMarket, setSelectedMarket] = useState<MarketOption>(MARKETS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatAPY = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getHealthFactorColor = (healthFactor: number) => {
    if (healthFactor >= 1.5) return 'text-green-400';
    if (healthFactor >= 1.1) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAPYColor = (apy: number) => {
    return apy >= 0 ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {/* 市场选择器 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-lg font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <span className={selectedMarket.color}>{selectedMarket.icon}</span>
                  <span>{selectedMarket.name} Market</span>
                  <span className="text-sm text-gray-500">{selectedMarket.version}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white border-gray-200" align="start">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Select Aave Testnet Market</h3>
                </div>

                {/* 版本选择 */}
                <div className="p-3 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Version 3
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Version 2
                    </Button>
                  </div>
                </div>

                {/* 市场列表 */}
                <div className="max-h-60 overflow-y-auto">
                  {MARKETS.map((market) => (
                    <div
                      key={market.id}
                      onClick={() => {
                        setSelectedMarket(market);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-50"
                    >
                      <span className={market.color}>{market.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{market.name}</div>
                        <div className="text-sm text-gray-500">{market.testnet}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            VIEW TRANSACTIONS
          </Button>
        </div>

        {/* 用户位置概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 净价值 */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Net worth</div>
            <div className="text-3xl font-bold text-gray-900">
              {userPosition && userPosition.netWorth > 0
                ? formatCurrency(userPosition.netWorth)
                : '$30.72'}
            </div>
          </div>

          {/* 净APY */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Net APY</div>
            <div
              className={`text-3xl font-bold flex items-center justify-center ${getAPYColor(userPosition?.netAPY || -487.84)}`}
            >
              {userPosition && userPosition.netAPY !== undefined && userPosition.netAPY !== null ? (
                <>
                  {userPosition.netAPY >= 0 ? (
                    <TrendingUp className="h-6 w-6 mr-2" />
                  ) : (
                    <TrendingDown className="h-6 w-6 mr-2" />
                  )}
                  {formatAPY(userPosition.netAPY)}%
                </>
              ) : (
                <>
                  <TrendingDown className="h-6 w-6 mr-2" />
                  -487.84%
                </>
              )}
            </div>
          </div>

          {/* 健康因子 */}
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Health factor</div>
            <div
              className={`text-3xl font-bold flex items-center justify-center ${getHealthFactorColor(userPosition?.healthFactor || 3.55)}`}
            >
              <Shield className="h-6 w-6 mr-2" />
              {userPosition && userPosition.healthFactor > 0
                ? userPosition.healthFactor.toFixed(2)
                : '3.55'}
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center justify-center mx-auto">
              RISK DETAILS
              <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
