"use client";
import ListItemNFT from "@/components/nft/list-item-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import RequestNFTModal from "./request-nft";

export default function ProjectNfts({ workers }: { workers: string[] }) {
  const { address } = useParams();
  //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem.
  //we want top check if we own any of the data is pending..
  const { data, error, loading } = useFetchData<any[]>(
    `/achievement/getAchievementRequests/${address}`
  );


  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        NFTs
        <RequestNFTModal />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          data?.map((nft, i) => <ListItemNFT details={nft.achievement} key={i} />)
        )}
      </CardContent>
    </Card>
  );
}
