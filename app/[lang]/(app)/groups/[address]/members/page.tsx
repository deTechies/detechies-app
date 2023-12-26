import PendingProfileCard from "@/components/card/pending-profile-card";
import InviteProjectMember from "@/components/invite-project-member/invite-project-member";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

// import { getPendingMembers } from "@/lib/data/groups";
import { getClub } from "@/lib/data/groups";
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

export interface Member {
  address: string;
  tokenboundAccount: string;
}
export default async function GroupMember({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const pendingData = await getPendingMembers(params.address);

  const data = await getClub(params.address);
  const searchItem = searchParams.search as string;

  let filteredData = data.members?.filter((item: any) => {
    if (!searchItem) return true;
    
    return item.display_name?.toLowerCase().includes(searchItem.toLowerCase());
  });

  console.log(data.group);

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="max-w-[500px] mx-auto mb-8">
        <Search placeholder="닉네임 또는 직업을 검색해보세요." />
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredData &&
          filteredData.map(
            (item: Member, index: any) => {
              if (index > 4) {
                return;
              }
              return (
                <MemberCard
                  address={item.memberId}
                  info={item.user}

                  key={index}
                />
              );
            }

            // item.tokenboundAccount && (
            //   <MemberCard address={getAddress(item.address)} key={index} />
            // )
          )}
        {filteredData < 1 && (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            검색 결과가 없습니다.
          </div>
        )}
        {/* 
          member 페이지에는 pending list가 보이지 않음
        {pendingData &&
          pendingData?.length > 0 &&
          pendingData.map((item: any, index: number) => (
            <PendingProfileCard
              profile={item}
              key={index}
              contract={params.address}
            />
          ))} */}
      </div>
    </div>
  );
}
