import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(),
    },
    connectors: [injected()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    pollingInterval: 10000,
  });
}
