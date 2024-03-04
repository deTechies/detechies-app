import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";

import { ClubMember } from "@/lib/interfaces";
import Avatar from "../metronic/avatar/avatar";
import { Badge } from "../ui/badge";
import IPFSImageLayer from "../ui/layer";


export default async function MemberListItem({details, userAddress}: {details:ClubMember, userAddress: string}) {
    
    const {data} = await getUserProfile(userAddress);
    
    if(!data) return (
        <div className="flex items-center">
            <Avatar 
              shape="rounded"
             src={details.user.avatar_link} 
            />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Unknown</p>
              <p className="text-sm text-muted-foreground">
                Unknown
              </p>
            </div>
            <div className="ml-auto font-medium">
                <Badge
                variant={"info"}
                >Member</Badge>
            </div>
        </div>    
        )
    
  return (
    <div className="flex items-center">
    <Avatar className="h-9 w-9">
        <IPFSImageLayer hashes={data?.nft ? data.nft : defaultAvatar} />
    </Avatar>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">{data?.display_name}</p>
      <p className="text-sm text-muted-foreground">
        {details?.created_at}
      </p>
    </div>
    <div className="ml-auto font-medium">
        <Badge
        variant={"info"}
        >{details?.role}</Badge>
    </div>
  </div>
  )
}
