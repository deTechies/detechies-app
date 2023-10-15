"use client"


import NftListItem from "@/components/card/nft-list-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddAchievement from "./add-achievement";



export default  function GroupAchievements() {
    const [data, setData] = useState<any[]>([]);
    const [createNew, setCreateNew] = useState<boolean>(false);

  useEffect(() => {
    const fetchNFTs = async () => {
        const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
        const result = await fetch(`${url}/chain/all`).then((res) =>
            res.json()
        );

        setData(result);
        }
        fetchNFTs();
    }, []);
    
    //we want to check if the user is the owner, so we can add the add achievement button. 
    //we want to check if the user is the owner, so we can add the add achievement button.
    
  return (
    <Card>
        <CardHeader className="flex justify-between items-centyer">
          Available Group Rewards
          
          <Badge onClick={() => setCreateNew(!createNew)}>
            Create
          </Badge>
        </CardHeader>
    <CardContent className="flex flex-wrap gap-4">
      
      {
        createNew ? (
          <AddAchievement />
        ): (
          data.map((item: any, index: number) => (
            <NftListItem item={item} key={index} />
          ))
        )
      }
     

    </CardContent>
    </Card>
  );
}
