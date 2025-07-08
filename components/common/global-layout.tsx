import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <header
        className="w-full fixed flex justify-between items-center px-8 top-0 left-0 right-0 z-20 h-12 bg-[#303549] border-b border-[#393a4a]"
        style={{
          // background: 'linear-gradient(180deg, #303549 0%, #2c2d3a 100%)',
          boxShadow: 'rgba(242, 243, 247, 0.16) 0px -1px 0px 0px inset',
        }}
      >
        <div className="flex items-center gap-8">
          <span className="font-black text-white text-xl mr-8">aave</span>
          <Link
            href="/dashboard"
            className="text-white/90 hover:text-white font-semibold px-2 py-1"
          >
            Dashboard
          </Link>
          <Link href="/markets" className="text-white/90 hover:text-white px-2 py-1">
            Markets
          </Link>
          <span className="text-white/90 hover:text-white px-2 py-1 cursor-pointer">
            Governance
          </span>
          <span className="text-white/90 hover:text-white px-2 py-1 cursor-pointer">Staking</span>
          {/* <span className="text-white/90 hover:text-white px-2 py-1 cursor-pointer">More •••</span> */}
        </div>
        <div>
          <ConnectButton />
        </div>
      </header>
      <div className="w-full pt-12">{children}</div>
    </div>
  );
}
