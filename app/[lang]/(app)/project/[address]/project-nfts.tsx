"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RequestNFTModal from "./request-nft";

export default function ProjectNfts({
  address,
  isCreator
}: { address: string, isCreator?: boolean}) {

  //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem.
  //we want top check if we own any of the data is pending..
  
  const data = [] as any[];


  return (
    <Card className="flex flex-col gap-7 pb-9">
      <CardHeader className="flex items-center justify-between">
        <h5 className="text-subhead_s">Achievements</h5>
        {isCreator && <RequestNFTModal />}
      </CardHeader>
      <CardContent>
        {
          data && data?.length > 0 ?  data?.map((nft, i) =>( 
            <Avatar key={i}>
              <AvatarImage 
              src={`https://ipfs.io/ipfs/${nft.metadata?.image}`}
              alt={nft.metadata?.name}
              className="border border-border-div"
              />
              <AvatarFallback> NO</AvatarFallback>  
            </Avatar>
          
          )) : <h5 className="text-center text-text-secondary text-label_m">No achievemnts yet</h5>
        }
      </CardContent>
    </Card>
  );
}
