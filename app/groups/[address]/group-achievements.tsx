"use client"


import NftListItem from "@/components/card/nft-list-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default  function GroupAchievements() {
    const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
        const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
        const result = await fetch(`${url}/chain/all`).then((res) =>
            res.json()
        );
        console.log(result);
        setData(result);
        }
        fetchNFTs();
    }, []);
  return (
    <Card>
        <CardHeader>Company NFTs</CardHeader>
    <CardContent className="flex flex-wrap gap-4">
      {data.map((item: any, index: number) => (
        <NftListItem item={item} key={index} />
      ))}

    </CardContent>
    </Card>
  );
}
