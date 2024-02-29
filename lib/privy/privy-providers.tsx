"use client"
import { PrivyProvider } from '@privy-io/react-auth';
// Make sure to import these from `@privy-io/wagmi`, not `wagmi`
import { WagmiProvider } from '@privy-io/wagmi';

import { privyConfig } from './privyConfig';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmiConfig';

const queryClient = new QueryClient();

export default function PrivyProviders({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider appId="clt5nzbg908p8a8fbrtmvglga" config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}