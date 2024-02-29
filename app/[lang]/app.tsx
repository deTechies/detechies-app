"use client";

import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/lib/SessionProvider";
import PrivyProviders from "@/lib/privy/privy-providers";
import PushProvider from "@/lib/usePushProtocol";
import { Analytics } from "@vercel/analytics/react";



export default function App({ children }: { children: any }) {
  return (
    <PrivyProviders>
      <PushProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </PushProvider>
      <Analytics />
    </PrivyProviders>
  );
}
