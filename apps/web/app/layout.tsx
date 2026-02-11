import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ActiveHeader } from "../src/components/active-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aave Interface",
  description: "Aave-style DeFi dashboard shell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-bg-app text-text-primary antialiased font-sans`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col bg-bg-app">
            <ActiveHeader />
            <main className="w-full flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
