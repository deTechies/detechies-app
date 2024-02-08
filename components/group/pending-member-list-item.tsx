"use client";
import { ABI, defaultAvatar } from "@/lib/constants";
import { acceptClubMember } from "@/lib/data/groups";
import { formatDate } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Address, useContractWrite } from "wagmi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import IPFSImageLayer from "../ui/layer";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { postServer } from "@/lib/data/postRequest";

export default function PendingMemberListItem({
  profile,
  contract,
  lang,
}: {
  profile: any;
  contract: string;
  lang: any;
}) {
  const router = useRouter();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  // if (error) return <div>{JSON.stringify(error)}</div>;

  // if (loading)
  //   return <Skeleton className="h-[200px] w-[100px] animate-pulse" />;

  // if (!data) return <div>no data</div>;

  const { write, isLoading, error, data } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "createMember",
  });

  const acceptEmployee = async () => {
    //in here we want to have the profile.id
    setAcceptLoading(true);

    if (!profile.id) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }

    const result = await acceptClubMember(profile.id);

    if (result.status === "success") {
      router.refresh();
    } else {
      setAcceptLoading(false);
    }

    toast({
      title: `Accept ${result.status}`,
      description: result.message,
    });

    //await write();
  };

  const rejectEmployee = async () => {
    setRejectLoading(true);

    const result = await postServer(`/members/reject/member/${profile.id}`, "");
    
    if (result.status === "success") {
      router.refresh();
    } else {
      setRejectLoading(false);
    }

    toast({
      title: `Accept ${result.status}`,
      description: result.message,
    });
  };

  return (
    <div
      className="grid grid-cols-[262px_1fr_90px_auto] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center"
      // onClick={() => router.push(`/profiles/${profile.user.wallet}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-sm aspect-square bg-accent-secondary">
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

      <Card className="h-full p-4 border border-background-base">
        <span className="text-body_s text-text-placeholder line-clamp-2">
          {/*
            message 
          */}
          {profile.message}
        </span>
      </Card>

      <div className="text-center">
        <span className="text-label_m">{formatDate(profile.created_at)}</span>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={rejectEmployee}
          className="p-2 rounded-md w-14 h-14"
          variant="secondary"
          size="icon"
          loading={rejectLoading}
          disabled={rejectLoading}
        >
          <X className="w-6 h-6"></X>
        </Button>

        <Button
          onClick={acceptEmployee}
          className="p-2 rounded-md w-14 h-14"
          size="icon"
          loading={acceptLoading}
          disabled={acceptLoading}
        >
          <Check className="w-6 h-6"></Check>
        </Button>
      </div>
    </div>
  );
}
