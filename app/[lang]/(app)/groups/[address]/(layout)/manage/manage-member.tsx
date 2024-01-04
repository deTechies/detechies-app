// import PendingProfileCard from "@/components/card/pending-profile-card";
import InvitingMemberListItem from "@/components/group/inviting-member-list-item";
import PendingMemberListItem from "@/components/group/pending-member-list-item";

// import { Locale } from "@/i18n.config";

import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { getPendingMembers } from "@/lib/data/groups";
import { Member } from "../members/page";

export default async function ManageMember({
  details,
  searchParams,
}: {
  details: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pendingData = await getPendingMembers(details.id);
  // const dictionary = await getDictionary(params.lang);

  const searchItem = searchParams.search as string;
  
  const joined = pendingData?.filter((item: any) => {
    return item.status === "joined";
  });
  
  const invited = pendingData?.filter((item: any) => {
    return item.status === "invited";
  });

  let filteredData = details.members?.filter((item: any) => {
    if (!searchItem) return true;

    return item.display_name?.toLowerCase().includes(searchItem.toLowerCase());
  });
  
  

  return (
    <div className="overflow-auto max-w-[90vw]">
      <h3 className="mb-4 text-subhead_s">
        그룹 가입 대기 중 ({joined?.length})
      </h3>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[282px_1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>유저 정보</div>
          <div>요청 메세지</div>
          <div className="text-center ">요청한 날짜</div>
          <div className="text-center ">승인 여부</div>
        </div>

        {joined.length > 0 &&
          joined.map((item: any, index: number) => {
            return (
              <PendingMemberListItem
                profile={item}
                key={index}
                contract={details.id}
              ></PendingMemberListItem>
            );
          })}
      </div>

      <h3 className="mb-4 text-subhead_s">
        초대 승인 대기 중 ({invited?.length})
      </h3>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>유저 정보</div>
          <div className="text-center ">요청한 날짜</div>
          <div className="text-center ">승인 여부</div>
        </div>

        {details.members.length > 0 &&
          invited.map((item: any, index: number) => {
            return (
              <InvitingMemberListItem
                profile={item}
                key={index}
                contract={details.id}
              ></InvitingMemberListItem>
            );
          })}
      </div>

      <h3 className="mb-4 text-subhead_s">
        전체 멤버 ({details.members.length})
      </h3>

      <div className="overflow-auto max-w-[90vw]">
        <div className="max-w-[434px] mb-3">
          <Search placeholder="닉네임 또는 직업을 검색해보세요." />
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredData &&
            filteredData.map((item: Member, index: any) => {
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
            })}
          {filteredData < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
