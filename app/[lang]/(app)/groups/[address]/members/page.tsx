
import PendingProfileCard from "@/components/card/pending-profile-card";
import InviteProjectMember from "@/components/invite-project-member/invite-project-member";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getPendingMembers } from "@/lib/data/groups";

interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  avatar: string;
  organisation: string;
  image: string;
  industry: string;
}

export interface Member{
  address: string;
  tokenboundAccount: string;
}
export default async function GroupMember({params}: {params: {address: string}}) {

  
const pendingData = await getPendingMembers(params.address);

  return (
    <Card className="overflow-auto max-w-[90vw]">
      <CardHeader>
        <h3>Members ({pendingData?.length})</h3>
        <InviteProjectMember projectId={params.address} />
      </CardHeader>
      <CardContent className="flex gap-4">

            {pendingData && pendingData?.length > 0 &&
              pendingData.map((item: any, index: number) => (
                <PendingProfileCard
                  profile={item}
                  key={index}
                  contract={params.address}
                />
              ))}
      
      </CardContent>
    </Card>
  );
}