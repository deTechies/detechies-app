"use client"

import { Card, CardContent } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {address, isConnecting} = useAccount();  
  const {data, error, loading} = useFetchData<any>("/polybase/" + address);
  const router = useRouter();
  
  
  if(!isConnecting && !address){
    router.push('/onboard');
  }
  
  if(address && error){
    router.push('/onboard/profile')
  }
  
  if(!loading && data && data?.message?.TBA){
    //user is logged in and has a tokenbound account
    //redirect to profile page
    router.push('/profile');
  }
  
  if(data && !loading && !data.message?.TBA){
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