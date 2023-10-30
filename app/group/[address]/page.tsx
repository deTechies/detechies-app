import { getGroupDetail } from "@/lib/data/groups";
import GroupAchievements from "./group-achievements";
import GroupDetails from "./group-details";
import GroupMember, { Member } from "./group-member";

export interface GroupDetailProps {
  name: string;
  achievements: any[];
  details: any;
  members: Member[];
  chat: any;
  image: string;
  address: string;
}

export default async function GroupProfile({params}: {params: {address: string}}) {


  const data = await getGroupDetail(params.address);
  console.log(data);

  return (

    <div className="flex flex-col gap-4">
            <GroupDetails details={data.details} />
            <GroupAchievements address={params.address.toString()}/>
            <GroupMember address={params.address.toString()} owners={data.members} />
      
      </div>

  );
}
