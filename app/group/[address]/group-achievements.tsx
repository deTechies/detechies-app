"use client";

import NftListItem, { NFTItem } from "@/components/card/nft-list-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CreateAchievement } from "./create-achievement";

export default function GroupAchievements() {
  const {address:contract}  = useParams();
  const [createNew, setCreateNew] = useState<boolean>(false);
  const {data, loading} = useFetchData<NFTItem[]>(`/achievement/getByGroup/${contract}`)
  
  if(loading) {
    return <div>Loading...</div>
  }
  
  
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        Achievements
        <Badge 
          onClick={() => setCreateNew(!createNew)} 
          className="cursor-pointer" 
          variant={"accent"}
        >
          {createNew ? "Close" : "Create"}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Tabs defaultValue="nfts" className="">
          <TabsList>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="pending">In progress.</TabsTrigger>
          </TabsList>
          <TabsContent value="nfts" className="flex flex-wrap gap-4">
            {data && data.map((item: any, index: number) => (
              <NftListItem item={item} key={index} />
            ))}
          </TabsContent>
          <TabsContent value="pending" className="flex flex-wrap gap-4">
            {data && data.map((item: any, index: number) => (
              <NftListItem item={item} key={index} />
            ))}
          </TabsContent>
        </Tabs>
        {createNew && <CreateAchievement />}
      </CardContent>
    </Card>
  );
}
