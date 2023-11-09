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
  const { data: sessionData, status } = useSession();
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    let shouldRedirect = false;
    const redirectTo = (path: string) => {
      shouldRedirect = true;
      setTimeout(() => router.push(path), 0); // Delay the redirect to after the effect
    };

    const web3 = sessionData?.web3;

    if (!web3 && !address) {
      return;
    }
    if (!web3 || !web3.address) {
      return;
    }
    if (web3?.address !== address) {
      return;
    }
    if (typeof web3?.user !== 'object') {
      redirectTo('/onboard/profile');
    } else if (!web3?.user?.TBA || !isAddress(web3?.user.TBA)) {
      redirectTo('/onboard/mint');
    } else {
      redirectTo('/profile');
    }

    return () => {
      if (shouldRedirect) {
        // Here you can handle any cleanup if needed before redirecting
      }
    };
  }, [sessionData, address, router]);

  // Here you might want to handle the 'loading' state or check 'status' of session
  if (status === 'loading') {
    return <div>Loading...</div>; // Replace with your loading component
  }

  return (
    <main className="flex items-center justify-center p-24 min-h-[69vh]">
      <Card className="min-w-[400px] max-w-lg">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
