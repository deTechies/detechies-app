"use client";

import React from 'react';
import PendingMemberItem from "@/components/members/pending-member-item";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";

function PendingMemberListComponent({
  lang,
  pendingMembers,
}: {
  lang: any;
  pendingMembers: any[];
}) {
  const [pendingMemberList, setPendingMemberList] = useState([...pendingMembers]);

  const filterPendingProjectMembers = (_memberId: string) => {
    const filteredPendingMembers = pendingMembers.filter((_members) => {
      return _members.id !== _memberId;
    });

    setPendingMemberList(filteredPendingMembers);
  };

  return (
    <Card className="gap-0 px-6 pt-6 pb-7">
      <CardHeader className="mb-6">
        <h4 className="text-subhead_s">{lang.project.details.waiting.title}</h4>
      </CardHeader>

      <div className="flex flex-col gap-3">
        {!!pendingMemberList?.length &&
          pendingMemberList.map((member: any, index: number) => (
            <PendingMemberItem
              key={index}
              member={member}
              lang={lang}
              onSuccessInvite={filterPendingProjectMembers}
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
