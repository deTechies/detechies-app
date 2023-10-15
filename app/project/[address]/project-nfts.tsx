"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAccount } from "wagmi";

export default function ProjectNfts({workers}: {workers: string[]}) {
  const {address} = useAccount();
    //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem. 
  return (
    <Card>
        <CardHeader>
            NFTs
          {address && workers && workers.includes(address) && (
            <button className="ml-4 text-sm font-medium text-text-primary">
              Request NFT
            </button>
          )}

        </CardHeader>
        <CardContent>
            No data found
        </CardContent>
    </Card>
  )
}
