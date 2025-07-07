'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { Button } from '@/components/ui/button';

export default function App() {
  const { address } = useAccount();
  return (
    <div>
      <h1>Hello World</h1>
      <ConnectButton />

      <p>{address}</p>

      <Button>Connect</Button>
    </div>
  );
}
