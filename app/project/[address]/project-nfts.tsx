"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAccount } from "wagmi";
import RequestNFTModal from "./request-nft";

export default function ProjectNfts({workers}: {workers: string[]}) {
  const {address} = useAccount();
    //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem. 
  return (
    <Card>
        <CardHeader className="flex items-center justify-between">
            NFTs

            <RequestNFTModal />

        </CardHeader>
        <CardContent>
            No data found
        </CardContent>
    </Card>
  )
}
