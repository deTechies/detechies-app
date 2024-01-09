"use client";
import { formatDate } from "@/lib/utils";
import IPFSImageLayer from "@/components/ui/layer";
import useFetchData from "@/lib/useFetchData";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { Address, useContractWrite } from "wagmi";
import { ABI, defaultAvatar } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import Image from "next/image";

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
    //
  };
  const rejectEmployee = async () => {
    //
  };

  const dummy_nft = {
    hash: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
    name: "default_blanket",
    chips: ["limited", "avatar"],
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

      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 bg-background-layer-2">
          <Image
            src={`https://ipfs.io/ipfs/${dummy_nft.hash}`}
            alt={dummy_nft.name}
            fill={true}
            className="rounded-sm"
          />
        </div>

        <div>
          <div className="mb-2 text-title_l">{dummy_nft.name}</div>

          <div className="flex gap-1">
            {dummy_nft.chips &&
              dummy_nft.chips.map((item, index) => {
                return (
                  <Badge variant={"outline"} key={index}>
                    {item}
                  </Badge>
                );
              })}
          </div>
        </div>
      </div>

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
