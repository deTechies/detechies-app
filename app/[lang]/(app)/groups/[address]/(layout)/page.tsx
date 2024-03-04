import { getUserAchievements } from "@/lib/data/achievements";
import GroupDetails from "./group-details";
import GroupMember from "./group-member";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";

export interface GroupDetailProps {
  name: string;
  achievements: any[];
  details: any;
  members: any[];
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
  const userAchievements = await getUserAchievements();

  const {data: clubInfo} = await serverApi(`/clubs/${params.address}`);


  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1">
        <GroupDetails details={clubInfo} />
      </div>
      <div className="col-span-2">
      <GroupMember
        address={params.address.toString()}
        members={clubInfo.members}
        lang={dictionary}
      />
      </div>


      {/* <GroupAchievements address={params.address.toString()} isCreator={data.isCreator}/> */}
 {/*      <GroupNft
        contract={clubInfo.contract}
        address={params.address.toString()}
        achievements={clubInfo.achievements}
        userAchievements={userAchievements.data}
        lang={dictionary}
      /> */}


    </div>
  );
}
