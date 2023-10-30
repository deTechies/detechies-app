"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {address, isConnecting} = useAccount();  
  const {data} = useSession();
  const router = useRouter();
  
  
  if(!isConnecting && !address){
    router.push('/onboard');
  }
  
  if(address && !data?.web3?.address){
    router.push('/onboard');
  }
  
  if(address && data?.web3?.address && !data?.web3?.user){
    router.push('/onboard/profile')
  }
  
  if(data && data?.web3?.user && data.web3.user.TBA){
    //user is logged in and has a tokenbound account
    //redirect to profile page
    router.push('/profile');
  }
  
  if(data?.web3?.user && !data.web3.user.TBA){
    //user is logged in and has a tokenbound account
    //redirect to profile page
    router.push('/onboard/mint'); 
  }
  
  
  return (
    <main className="flex items-center justify-center p-24 min-h-[69vh]">
      <Card className="min-w-[400px]  max-w-lg">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}