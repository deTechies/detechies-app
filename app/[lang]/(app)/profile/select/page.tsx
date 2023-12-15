"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import NftOwned from "./nft-owned";

export default function ProfileMe() {

  const [profile, setProfile] = useState<any>(null);
  const { address } = useAccount();

  useEffect(() => {
    const getUserDetails = async () => {
      const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const result = await fetch(url + "/polybase/" + address).then((res) => res.json());
      setProfile(result.message);
    }
    
    if(address){
      getUserDetails();
    }
  }, [address])
  
  return (
          <div>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4 gap-4">
                  <TabsTrigger value="tokenbound">Career</TabsTrigger>
                  <TabsTrigger value="minting">on Minting</TabsTrigger>
                </TabsList>
                <TabsContent value="tokenbound">
                  {profile?.TBA ? <NftOwned address={profile.TBA} avatar={profile?.nft} /> : "No tokenbound account found!"}
                </TabsContent>
                <TabsContent value="minting">
                  {address ? <NftOwned address={address} status="minting" /> : "No minting account found!"}
                </TabsContent>
              </Tabs>
            
              
          </div>

  );
}
