import PendingMemberItem from "@/components/members/pending-member-item";
import { Card, CardHeader } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import React from 'react';

async function PendingMemberListComponent({
  projectId,
  lang,
}: {
  projectId: string;
  lang: any;
}) {
 const {data:pendingMembers} = await serverApi(`/project-member/invites/${projectId}`)
  return (
    <Card className="gap-0 px-6 pt-6 pb-7">
      <CardHeader className="mb-6">
        <h4 className="text-subhead_s">{lang.project.details.waiting.title}</h4>
      </CardHeader>

      <div className="flex flex-col gap-3">
        {!!pendingMembers?.length &&
          pendingMembers.map((member: any, index: number) => (
            <PendingMemberItem
              key={index}
              member={member}
              lang={lang}
            />
          ))}

        {(!pendingMembers?.length || pendingMembers.length < 1) && (
          <p className="text-center text-label_m text-text-secondary">
            {lang.project.details.waiting.no_people}
          </p>
        )}
      </div>
    </Card>
  );
}

const PendingMemberList = React.memo(PendingMemberListComponent);

export default PendingMemberList;
