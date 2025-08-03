'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function App() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">aave</h1>
            <p className="text-gray-300 text-lg">Open Source Liquidity Protocol</p>
          </div>

          {/* 描述 */}
          <div className="mb-8">
            <p className="text-gray-300 text-sm leading-relaxed">
              Connect your wallet to access the Aave protocol and start earning interest on your
              crypto assets.
            </p>
          </div>

          {/* 连接钱包按钮 */}
          <div className="mb-6">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus || authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>Connect Wallet</span>
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                            className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button
                            onClick={openAccountModal}
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            {account.displayName}
                            {account.displayBalance ? ` (${account.displayBalance})` : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* 功能特性 */}
          <div className="text-left space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Supply crypto and earn interest</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Borrow against your collateral</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Access decentralized liquidity</span>
            </div>
          </div>

          {/* 底部信息 */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
