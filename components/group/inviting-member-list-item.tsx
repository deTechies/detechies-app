"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { defaultAvatar } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { postServer } from "@/lib/data/postRequest";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import IPFSImageLayer from "../ui/layer";

export default function InvitingMemberListItem({
  profile,
  contract,
  lang,
}: {
  profile: any;
  contract: string;
  lang: any;
}) {
  const router = useRouter();
  const [sendLoading, setSendLoading] = useState(false);

  // need data for invitation status
  const invitationStatus = "waiting"; // temp

  const sendInvitationNotif = async () => {
    setSendLoading(true);

    const result = await postServer(`/members/remind/${profile.id}`, "");

    setSendLoading(false);

    toast({
      title: result.status,
      description: result.message,
    });
  };

  const deleteInvitingMember = () => {
    //
  };

  return (
    <div
      className="grid grid-cols-[1fr_90px_124px] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center"
      // onClick={() => router.push(`/profiles/${profile.user.wallet}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-sm aspect-square bg-background-layer-2">
          <IPFSImageLayer
            hashes={profile.user.avatar ? profile.user.avatar : defaultAvatar}
          />
        </div>

        <div>
          <div className="mb-2 text-title_l">{profile.user.display_name}</div>

          <Badge variant="info" shape="outline">
            {profile.user.profile_details?.profession
              ? profile.user.profile_details.profession
              : "미설정"}
          </Badge>
        </div>
      </div>

      <div className="text-center">
        <span className="text-label_m">{formatDate(profile.created_at)}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <span className="text-title_s">
          {invitationStatus === "waiting"
            ? lang.group.details.manage.member.waiting
            : lang.group.details.manage.member.rejected}
        </span>

        {invitationStatus === "waiting" ? (
          <Button
            variant="primary"
            size="sm"
            onClick={sendInvitationNotif}
            loading={sendLoading}
            disabled={sendLoading}
          >
            {lang.group.details.manage.member.announce_invite}
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={deleteInvitingMember}>
            {lang.group.details.manage.member.delete}
          </Button>
        )}
      </div>
    </div>
  );
}
