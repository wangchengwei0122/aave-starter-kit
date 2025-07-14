import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { cookieToInitialState, type State } from 'wagmi';

import Layout from '@/components/common/global-layout';
import { Providers } from './providers';
import { getConfig } from './wagmi';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AAVE - Open Source Liquidity Protocol ',
  description:
    'Aave is an Open Source Protocol to create Non-Custodial Liquidity Markets to earn interest on supplying and borrowing assets with a variable or stable interest rate. The protocol is designed for easy integration into your products and services.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const initialState = cookieToInitialState(getConfig(), headersList.get('cookie')) as State;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers initialState={initialState}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
