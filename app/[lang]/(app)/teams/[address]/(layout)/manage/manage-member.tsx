// import PendingProfileCard from "@/components/card/pending-profile-card";
import InvitingMemberListItem from "@/components/group/inviting-member-list-item";
import PendingMemberListItem from "@/components/group/pending-member-list-item";

import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { serverApi } from "@/lib/data/general";
import { ClubMember } from "@/lib/interfaces";

export default async function ManageMember({
  details,
  searchParams,
  lang,
}: {
  details: any;
  searchParams: { [key: string]: string | string[] | undefined };
  lang: any;
}) {
  const { data: pendingData } = await serverApi(`members/invites/${details.id}`);

  const searchItem = searchParams.search as string;

  const joined = pendingData?.filter((item: any) => {
    return item.status === "joined";
  });

  const invited = pendingData?.filter((item: any) => {
    return item.status === "invited";
  });

  let filteredData = details.members?.filter((item: any) => {
    if (!searchItem) return true;

    return item.user.display_name
      ?.toLowerCase()
      .includes(searchItem.toLowerCase());
  });

  return (
    <div className="overflow-auto max-w-[90vw]">
      <h3 className="mb-4 text-subhead_s">
        {lang.group.details.manage.member.waiting_join} ({joined?.length})
      </h3>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[282px_1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>{lang.group.details.manage.member.user_info}</div>
          <div>{lang.group.details.manage.member.message}</div>
          <div className="text-center ">
            {lang.group.details.manage.member.request_date}
          </div>
          <div className="text-center ">
            {lang.group.details.manage.member.actions}
          </div>
        </div>

        {joined.length > 0 ? (
          joined.map((item: any, index: number) => {
            return (
              <PendingMemberListItem
                profile={item}
                key={index}
                contract={details.id}
                lang={lang}
                />
            );
          })
        ) : (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            {lang.group.details.manage.member.no_waiting_join}
          </div>
        )}
      </div>

      <h3 className="mb-4 text-subhead_s">
        {lang.group.details.manage.member.waiting_invite} ({invited?.length})
      </h3>

      <div className="flex flex-col gap-3 mb-8">
        <div className="grid grid-cols-[1fr_90px_144px] gap-4 text-text-placeholder text-title_s">
          <div>{lang.group.details.manage.member.user_info}</div>
          <div className="text-center ">
            {lang.group.details.manage.member.request_date}
          </div>
          <div className="text-center ">
            {lang.group.details.manage.member.actions}
          </div>
        </div>

        {invited.length > 0 ? (
          invited.map((item: any, index: number) => {
            return (
              <InvitingMemberListItem
                profile={item}
                key={index}
                contract={details.id}
                lang={lang}
                />
            );
          })
        ) : (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            {lang.group.details.manage.member.no_waiting_invite}
          </div>
        )}
      </div>

      <h3 className="mb-4 text-subhead_s">
        {lang.group.details.manage.member.all_members} ({details.members.length}
        )
      </h3>

      <div className="overflow-auto max-w-[90vw]">
        <div className="max-w-[434px] mb-3">
          <Search placeholder={lang.group.details.manage.member.search} />
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredData &&
            filteredData.map((item: ClubMember, index: any) => {
              if (index > 4) {
                return;
              }
              return (
                <MemberCard
                  address={item.memberId}
                  info={item.user}
                  key={index}
                  lang={lang}
                />
              );
            })}
          {filteredData < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              {lang.group.details.manage.member.no_result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
