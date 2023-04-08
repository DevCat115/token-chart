'use client';

import './globals.css';
import { ArrowDownUp, BarChart2, Bell, Star, Wallet } from 'lucide-react';

import { Inter } from 'next/font/google';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';

import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

//import { cookies } from 'next/headers';
import { ThemeProvider } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
// import type { Metadata } from 'next';

import MainSidebar from '@/components/main/main-sidebar';

import { Card } from '@/components/ui/card';
import NextTopLoader from 'nextjs-toploader';
import { trpc } from '@/lib/utils/trpc';
import LoadingScreen from '@/components/loading';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Decode',
//   description: 'on-chain crypto metrics ',
// };

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const collapsed = //cookies().get('react-layout:collapsed'); t
  //const [networks, setNetworks] = useState<DefinedNetwork[]>([]);

  const defaultCollapsed = false; //collapsed ? JSON.parse(collapsed.value) : undefined;
  const mainNav = [
    {
      name: 'Watchlist',
      href: '/watchlist',
      icon: <Star size={18} />,
    },
    {
      name: 'Alerts',
      href: '/alerts',
      icon: <Bell size={18} />,
    },
    {
      name: 'Top Tokens',
      href: '/top-tokens',
      icon: <BarChart2 size={18} />,
    },
    {
      name: 'Gainers & Losers',
      href: '/top-tokens',
      icon: <ArrowDownUp size={18} />,
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: <Wallet size={18} />,
    },
    {
      name: 'Insider',
      href: '/insider',
      icon: <Bell size={18} />,
    },
  ];

  const networks = trpc.networks.getNetworks.useQuery().data ?? [];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'dark:bg-stone-950')} suppressHydrationWarning>
        <NextTopLoader showSpinner={false} color="#bff311" />
        <DynamicContextProvider
          theme="dark"
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ?? '',
            walletConnectors: [EthereumWalletConnectors],
            appName: process.env.NEXT_PUBLIC_APP_NAME,
          }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {networks.length > 0 ? (
              <main className="flex flex-row min-h-screen relative">
                <MainSidebar
                  collapsed={defaultCollapsed}
                  mainNavigation={mainNav}
                  networks={networks}
                />
                <div className="flex flex-col grow min-h-screen ml-[250px] p-4 max-w-full overflow-x-clip gap-4 justify-center">
                  <Card>
                    <div className="p-4">
                      Smog Token Next 100x SOL Meme Coin? Claim the FREE Airdrop!
                    </div>
                  </Card>
                  <div className="flex grow min-h-screen max-w-full overflow-x-clip justify-center">
                    {children}
                  </div>
                </div>
              </main>
            ) : (
              <LoadingScreen />
            )}
          </ThemeProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
