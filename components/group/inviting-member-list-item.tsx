"use client";
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import IPFSImageLayer from "../ui/layer";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Address, useContractWrite } from "wagmi";
import { ABI, defaultAvatar } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function InvitingMemberListItem({
  profile,
  contract,
}: {
  profile: any;
  contract: string;
}) {
  const router = useRouter();

  // need data for invitation status 
  const invitationStatus = "waiting"; // temp


  // if (error) return <div>{JSON.stringify(error)}</div>;

  // if (loading)
  //   return <Skeleton className="h-[200px] w-[100px] animate-pulse" />;

  // if (!data) return <div>no data</div>;

  return (
    <div
      className="grid grid-cols-[1fr_90px_124px] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center"
      // onClick={() => router.push(`/profiles/${profile.user.id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-sm aspect-square bg-accent-secondary">
          <IPFSImageLayer
            hashes={profile.user.nft ? profile.user.nft : defaultAvatar}
          />
        </div>

        <div>
          <div className="mb-2 text-title_l">{profile.user.display_name}</div>

          <Badge variant={"outline"}>
            {profile.user.role ? profile.user.role : "미설정"}
          </Badge>
        </div>
      </div>

      <div className="text-center">
        <span className="text-label_m">
          {/* 
            The create time must be changed to the request time.
            가입시간을 요청시간으로 바꿔야함 
          */}
          {formatDate(profile.user.created_at)}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <span>{invitationStatus === "waiting" ? "대기 중" : "거절함"}</span>

        <Button
          variant="secondary"
          size="sm"
          disabled={invitationStatus === "waiting"}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
