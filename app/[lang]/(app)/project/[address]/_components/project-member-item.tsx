import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";

interface MemberDetails {
  memberId: string;
  created_at: string;
  level: number;
  verified: boolean;
  role: string;
  joined: string;
}

export default async function ProjectMemberItem({
  details,
  userAddress,
}: {
  details: MemberDetails;
  userAddress: string;
}) {
  const data = await getUserProfile(userAddress);

  if (!data)
    return (
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <IPFSImageLayer hashes={[]} />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Unknown</p>
          <p className="text-sm text-muted-foreground">Unknown</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant={"info"}>Member</Badge>
        </div>
      </div>
    );

  return (
    <Card className="flex flex-row flex-start gap-5">
      <div className="relative bg-background-layer-2 h-24 w-24 rounded-[6px]">
        <IPFSImageLayer
          hashes={data?.nft ? data.nft : defaultAvatar}
          className="rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <header className="flex gap-2 items-center">
            <h5 className="font-medium leading-none">{data?.display_name} | {details.role}</h5>
            <Badge variant={"info"}>Rewards</Badge>
        </header>
        <p className="text-sm text-muted-foreground">Joined at {details?.created_at}</p>

      </div>
      <div className="flex flex-col gap-4 flex-end">
        <Button variant="default" size="sm">
            <span className="text-sm">Review</span>
        </Button>
        <Button variant="secondary" size="sm">
            <span className="text-sm">Request</span>
        </Button>
      </div>
    </Card>
  );
}
