import { getClub } from "@/lib/data/groups";
import GroupDetails from "./group-details";
import GroupMember, { Member } from "./group-member";
import GroupNft from "./group-nft";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

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

export default async function GroupProfile({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const data = await getClub(params.address);
  console.log(data);
  
  console.log(data.members[0].user.profile_details)

  return (
    <div className="flex flex-col">
      <GroupDetails details={data} />

      <hr className="my-8 solid h-[1px] bg-border-div"></hr>

      {/* <GroupAchievements address={params.address.toString()} isCreator={data.isCreator}/> */}
      <GroupNft
        contract={data.contract}
        address={params.address.toString()}
        achievements={data.achievements}
        lang={dictionary}
      ></GroupNft>

      <hr className="my-8 solid h-[1px] bg-border-div"></hr>

      <GroupMember
        address={params.address.toString()}
        members={data.members}
        lang={dictionary}
      />
    </div>
  );
}
