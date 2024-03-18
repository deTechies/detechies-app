// import PendingProfileCard from "@/components/card/pending-profile-card";
import PendingMemberListItem from "@/components/group/pending-member-list-item";
import InviteGroupMember from "@/components/invite-group-member/invite-group-member";

import { getDictionary } from "@/get-dictionary";
import { serverApi } from "@/lib/data/general";

export default async function ManageMember({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };

}) {
  const { data: pendingData } = await serverApi(`/members/invites/${params.address}`);
    const lang = await getDictionary(params.lang);
  const searchItem = searchParams.search as string;

  return (
    <div className="overflow-auto max-w-[90vw]">
      <h3 className="mb-4 text-subhead_s">
        {lang.group.details.manage.member.waiting_join} ({pendingData?.length})
        
        <InviteGroupMember
                groupId={params.address}
                lang={lang}
                groupMembers={[]}
              />
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

        {pendingData.length > 0 ? (
          pendingData.map((item: any, index: number) => {
            return (
              <PendingMemberListItem
                profile={item}
                key={index}
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


    </div>
  );
}
