import PendingProfileCard from "@/components/card/pending-profile-card";

import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { Address } from "wagmi";

import { getPendingMembers } from "@/lib/data/groups";
import { getClub } from "@/lib/data/groups";

export interface Member {
  memberId: Address;
  role: string;
  status: any;
  created_at: string;
  verified: boolean;
  user: any[];
}

export default async function GroupMember({ address }: { address: string }) {
  const pendingData = await getPendingMembers(address);
  const data = await getClub(address);

  {
    /* 
    {pendingData &&
        pendingData?.length > 0 &&
        pendingData.map((item: any, index: number) => (
        <PendingProfileCard
            profile={item}
            key={index}
            contract={params.address}
        />
        ))} */
  }
  return <div className="overflow-auto max-w-[90vw]">Hi!</div>;
}
