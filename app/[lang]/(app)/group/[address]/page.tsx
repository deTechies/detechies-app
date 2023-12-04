import { getClub } from "@/lib/data/groups";
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
  isCreator: boolean;
  isMember: boolean;
}

export default async function GroupProfile({params}: {params: {address: string}}) {


  const data = await getClub(params.address);
  console.log(data);

  return (

    <div className="flex flex-col gap-4">
            <GroupDetails details={data} />
            <GroupAchievements address={params.address.toString()} isCreator={data.isCreator}/>
            <GroupMember address={params.address.toString()} members={data.members} />
      </div>

  );
}