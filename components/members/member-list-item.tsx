import { getUserProfile } from "@/lib/data/user";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import IPFSImageLayer from "../ui/layer";

export default async function MemberListItem({userAddress}: {userAddress: string}) {
    
    const data = await getUserProfile(userAddress);
    
    if(!data) return (
        <div className="flex items-center">
            <Avatar className="h-9 w-9">
                <IPFSImageLayer hashes={[]} />
            </Avatar>
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
        <IPFSImageLayer hashes={data?.message.nft} />
    </Avatar>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">{data.message.username}</p>
      <p className="text-sm text-muted-foreground">
        {data.message.job}
      </p>
    </div>
    <div className="ml-auto font-medium">
        <Badge
        variant={"info"}
        >Member</Badge>
    </div>
  </div>
  )
}
