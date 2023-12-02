"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchData from "@/lib/useFetchData";

import { Card, CardHeader } from "@/components/ui/card";
import RequestNFTModal from "./request-nft";

export default function ProjectNfts({
  address,
  isCreator
}: { address: string, isCreator?: boolean}) {

  //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem.
  //we want top check if we own any of the data is pending..
  const { data, error, loading } = useFetchData<any[]>(
    `/achievement/getAchievementRequests/${address}`
  );


  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex items-center justify-between">
        <h5 className="font-medium">Achievements</h5>
        {isCreator && <RequestNFTModal />}
      </CardHeader>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <div>loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          data && data?.length > 0 &&  data?.map((nft, i) =>( 
            <Avatar key={i}>
              <AvatarImage 
              src={`https://ipfs.io/ipfs/${nft.metadata?.image}`}
              alt={nft.metadata?.name}
              className="border border-border-div"
              />
              <AvatarFallback> NO</AvatarFallback>  
            </Avatar>
          
          ))
        )}
      </div>
    </Card>
  );
}
