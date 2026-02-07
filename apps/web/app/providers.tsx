"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http } from "viem";
import { ReactNode } from "react";

// 创建 QueryClient
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// 配置支持的链
const chains = [mainnet, sepolia] as const;

// 使用 RainbowKit 的 getDefaultConfig 创建配置
// 注意：RainbowKit 2.x 官方支持 wagmi 2.x，但用户确认使用 wagmi 3.x 也可以工作（仅 connect button）
// WalletConnect projectId：如果需要 WalletConnect 连接器，请在 .env.local 中设置 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
// 获取 projectId：https://cloud.walletconnect.com/
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const config = getDefaultConfig({
  appName: "Aave Interface",
  projectId: projectId || "00000000000000000000000000000000", // 临时占位符，WalletConnect 功能可能不可用
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <WagmiProvider config={config as any}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
