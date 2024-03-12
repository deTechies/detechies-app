"use client";
import { postServer } from "@/lib/data/postRequest";
import { formatDateToTimeAgo } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";

interface PendingMemberItemProps {
  member: any;
  lang: any;
  onSuccessInvite?: Function;
}
export default function PendingMemberItem({
  member,
  lang,
  onSuccessInvite,
}: PendingMemberItemProps) {

  //if accept then we need to put in
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function acceptMember() {
    setIsLoading(true);
    const result = await postServer(
      `/project-member/accept/member/${member.id}`,
      ""
    );

    if (result && result.status === "success") {
      onSuccessInvite && onSuccessInvite(member.id);
      router.refresh();
    } else {
      setIsLoading(false);
    }
    //TODO: make sure that the data is only reloaded.
  }
  
  async function rejectMember() {
    setIsLoading(true);
    const result = await postServer(
      `/project-member/reject/member/${member.id}`,
      ""
    );

    if (result && result.status === "success") {
      onSuccessInvite && onSuccessInvite(member.id);
      router.refresh();
    } else {
      setIsLoading(false);
    }
    //TODO: make sure that the data is only reloaded.
  }

 

  return (
    // <Dialog>
    //   <DialogTrigger className="flex flex-col items-start gap-2 text-lect">
    <div className="flex gap-5 pb-5 border-b">
      <div className="relative w-20 h-20 rounded-sm shrink-0 bg-background-layer-2">
        <IPFSImageLayer hashes={member.user.avatar} />
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
                {formatDateToTimeAgo(member.created_at)}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 ml-auto">
              {(member.status == "joined")  && (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isLoading}
                    onClick={rejectMember}
                  >
                    {lang.project.details.waiting.reject}
                  </Button>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={acceptMember}
                    loading={isLoading}
                    disabled={isLoading}
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
