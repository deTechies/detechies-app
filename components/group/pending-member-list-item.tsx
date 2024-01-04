"use client";
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import IPFSImageLayer from "../ui/layer";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { Address, useContractWrite } from "wagmi";
import { ABI, defaultAvatar } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { formatDate } from "@/lib/utils"

export default function PendingMemberListItem({
  profile,
  contract,
}: {
  profile: any;
  contract: string;
}) {
  const router = useRouter();

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

    if (!profile.profile.id) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }
    //also update the status of this employee into the company.
    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    
    await fetch(`${url}/polybase/nft/accepted/${profile.profile.id}`, {})
      .then((res) => {
        console.log(res);
      })
      .catch((err: Error) => console.log(err));

    await write({ args: [profile.profile.id] });

    //await write();
  };
  const rejectEmployee = async () => {
    if (!profile.id) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="grid grid-cols-[262px_1fr_90px_auto] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center"
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

      <Card className="h-full p-4 border border-background-base">
        <span className="text-body_s text-text-placeholder line-clamp-2">
          {/*
            message 
          */}
          안녕하세요. QA엔지니어 홍길동 입니다. 그룹에 가입하고자 합니다. 승인
          부탁드립니다!
        </span>
      </Card>

      <div className="text-center">
        <span className="text-label_m">
          {/* 
            The create time must be changed to the application time.
            가입시간을 신청시간으로 바꿔야함 
          */}
          {formatDate(profile.user.created_at)}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={acceptEmployee}
          className="p-2 rounded-md w-14 h-14"
          variant="secondary"
          size="icon"
        >
          <X className="w-6 h-6"></X>
        </Button>

        <Button
          onClick={rejectEmployee}
          className="p-2 rounded-md w-14 h-14"
          size="icon"
        >
          <Check className="w-6 h-6"></Check>
        </Button>
      </div>
    </div>
  );
}
