"use client";

import { NFTItem } from "@/components/card/nft-list-item";
import Loading from "@/components/loading";
import DisplayNFT from "@/components/nft/display-nft";
import PendingNFT from "@/components/nft/pending-nft";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchData from "@/lib/useFetchData";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CreateAchievement } from "./create-achievement";

export default function GroupAchievements() {
  const {address:contract}  = useParams();
  const [createNew, setCreateNew] = useState<boolean>(false);
  const {data, loading} = useFetchData<NFTItem[]>(`/achievement/getByGroup/${contract}`)
  const {data:pendingAchievements, loading:pendingLoading, error:pendingError} = useFetchData<NFTItem[]>(`/achievement/getRequests/${contract}`)
  
  if(loading || pendingLoading) {
    return <Loading />
  }
  
  console.log(pendingAchievements)
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        Achievements
        <Link href={`/nft/create?contract=${contract}`}>
          <Badge 
            className="cursor-pointer" 
            variant={"accent"}
          >
            {createNew ? "Close" : "Create"}
          </Badge>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Tabs defaultValue="nfts" className="">
          <TabsList className="mb-4">
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="pending">In progress.</TabsTrigger>
          </TabsList>
          <TabsContent value="nfts" className="grid sm:grid-cols-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 items-stretch gap-4">
            {data && data.map((item: NFTItem, index: number) => (
              <DisplayNFT {...item} key={index} />
            ))}
          </TabsContent>
          <TabsContent value="pending" className="grid grid-cols-2 gap-4">
            {pendingAchievements && pendingAchievements.map((item: any, index: number) => (
              <PendingNFT details={item} key={index} />
            ))}
          </TabsContent>
        </Tabs>
        {createNew && <CreateAchievement />}
      </CardContent>
    </Card>
  );
}
