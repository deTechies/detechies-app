"use client"
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';

interface SessionData {
  web3?: {
    address?: string;
    user?: {
      TBA?: string;
    };
  };
}

interface OnboardLayoutProps {
  children: React.ReactNode;
}

export default function OnboardLayout({ children }: OnboardLayoutProps): JSX.Element {
  const { data: sessionData } = useSession() as { data: SessionData };
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const redirectTo = (path: string) => {
      router.push(path);
      // We throw an error to escape the rest of the logic in the useEffect if a redirect is required.
      // This error is caught by React and does not crash the application.
      throw new Error(`Redirecting to ${path}`);
    };

    try {
      const web3 = sessionData?.web3;
      
      // Check for web3 and address presence
      if (!web3 || !web3.address) {
        redirectTo('/onboard');
      }

      // Address mismatch, go to onboard
      if (web3.address !== address) {
        redirectTo('/onboard');
      }

      // No user object, go to onboard/profile
      if (typeof web3.user !== 'object') {
        redirectTo('/onboard/profile');
      }

      // Invalid or no TBA address, go to onboard/mint
      if (!web3.user.TBA || !isAddress(web3.user.TBA)) {
        redirectTo('/onboard/mint');
      }

      // If TBA exists and is valid, go to profile
      redirectTo('/profile');
    } catch (redirectError) {
      // Catch the redirect "error" to prevent it from being thrown globally.
      console.error(redirectError);
    }
  }, [sessionData, address, router]);

  return (
    <main className="flex items-center justify-center p-24 min-h-[69vh]">
      <Card className="min-w-[400px] max-w-lg">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
