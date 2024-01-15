"use client";
import { postServer } from "@/lib/data/postRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";

interface PendingMemberItemProps {
  member: any;
  lang: any;
}
export default function PendingMemberItem({
  member,
  lang,
}: PendingMemberItemProps) {
  //if accept then we need to put in
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function acceptMember() {
    setIsLoading(true);
    await postServer(`/project-member/accept/member/${member.id}`, '');
    //TODO: make sure that the data is only reloaded.
    router.refresh();
    setIsLoading(false);
  }

  //TODO: move this in a global util file do it can be used anywhere. 
  function formatInviteTime(inviteTimeStr: string, status: string) {
    const inviteTime = new Date(inviteTimeStr);
    const now = new Date();
    const timeDiff = Number(now) - Number(inviteTime);

    const minutes = Math.floor(timeDiff / 60000);
    const hours = Math.floor(timeDiff / 3600000);
    const days = Math.floor(timeDiff / 86400000);

    if (status === "joined") {
      if (minutes < 1) {
        return lang.project.details.waiting.just_now_joined;
      } else if (minutes < 60) {
        return `${minutes} ${lang.project.details.waiting.min_ago_joined}`;
      } else if (hours < 24) {
        return `${hours} ${lang.project.details.waiting.hour_ago_joined}`;
      } else {
        return `${days} ${lang.project.details.waiting.day_aog_joined}`;
      }
    } else {
      if (minutes < 1) {
        return lang.project.details.waiting.just_now_invited;
      } else if (minutes < 60) {
        return `${minutes} ${lang.project.details.waiting.min_ago_invited}`;
      } else if (hours < 24) {
        return `${hours} ${lang.project.details.waiting.hour_ago_invited}`;
      } else {
        return `${days} ${lang.project.details.waiting.day_aog_invited}`;
      }
    }
  }

  return (
    // <Dialog>
    //   <DialogTrigger className="flex flex-col items-start gap-2 text-lect">
    <div className="flex gap-5 pb-5 border-b">
      <div className="shrink-0 relative w-20 h-20 rounded-sm bg-background-layer-2">
        <IPFSImageLayer hashes={member.user.avatar} />

        {/* <Image
          height="80"
          width="80"
          src={
            member.image ||
            "https://ipfs.io/ipfs/bafybeidutyodk6auwqx26rieisxwmnen6tgfcyqmj4s5bwlg3omehjrke4"
          }
          alt={member.user.display_name}
          className="rounded-sm bg-background-layer-2 shrink-0"
        /> */}
      </div>

      <div className="flex flex-wrap grow">
        <div className="w-full">
          <div className="mb-4 text-title_m">{member.user.display_name}</div>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-2 text-label_m text-text-secondary">
                {lang.project.details.waiting.position}:{" "}
                {lang.interface.role_type[member.role] || "없음"}
              </div>

              <div className="text-text-secondary text-label_m">
                {formatInviteTime(member.created_at, member.status)}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 ml-auto">
              {member.status == "joined" && (
                <>
                  <Button size="sm" variant="secondary">
                    {lang.project.details.waiting.reject}
                  </Button>

                  <Button size="sm" variant="primary" onClick={acceptMember}
                    loading={isLoading}
                  >
                    {lang.project.details.waiting.accept}
                  </Button>
                </>
              )}
              {member.status == "invited" && (
                <Button size="sm" variant="primary">
                  {lang.project.details.waiting.send_note}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </DialogTrigger>
    //       <DialogContent>
    //         We will show more details about this later on...
    //       </DialogContent>
    // </Dialog>
  );
}
