"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAddress } from 'viem';
import { useAccount } from "wagmi";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { address } = useAccount();
  const { data } = useSession() as any;

  useEffect(() => {
    console.log(data);
    if (!data) {
      return;
    }
    if (
      data?.web3?.address === address &&
      typeof data.web3.user === "object" &&
      data.web3.user.TBA
    ) {
      router.push("/profile");
    }
    if (
      data.web3.address === address &&
      typeof data.web3.user === "object" &&
      !isAddress(data.web3.user.TBA)
    ) {
      router.push("/onboard/mint");
    }
    if (data.web3.address === address && typeof data.web3.user !== "object") {
      router.push("/onboard/profile");
    }
    if (data.web3.address !== address) {
      router.push("/onboard");
    }
  }, [data, address, router]);

  return (
    <main className="flex items-center justify-center p-24 min-h-[69vh]">
      <Card className="min-w-[400px]  max-w-lg">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
