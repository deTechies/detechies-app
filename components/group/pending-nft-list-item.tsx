"use client";
import IPFSImageLayer from "@/components/ui/layer";
import { ABI, defaultAvatar } from "@/lib/constants";
import { updateNFTRequest } from "@/lib/data/achievements";
import { formatDate } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Address, useContractWrite, useWaitForTransaction } from "wagmi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function PendingMemberListItem({
  nft,
  contract,
}: {
  nft: any;
  contract: string;
}) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isSuccess,
    write: distributeAchievement,
  } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

  const { isFetched } = useWaitForTransaction(data);

  useEffect(() => {
    const submitNFT = async () => {
      const result = await updateNFTRequest(nft.id, "accepted", data?.hash);
      toast({
        title: "Success",
        description: "succesfully distirbuted the nft. ",
      });
    };

    if (isFetched) {
      submitNFT();
      router.refresh();
    }
  }, [isFetched, data, nft.id, router]);

  const acceptNFT = async () => {
    if (!nft.achievement.tokenId || !nft.user.wallet || !contract) {
      toast({
        title: "Error",
        description: "Failed to accept NFT",
      });
    }
    await distributeAchievement({
      args: [nft.achievement.tokenId, nft.user.wallet, 1],
    });

    //make sure that it works correct so we can update the nft data.
  };
  const rejectNFT = async () => {
    //
    toast({
      title: "rejecting NFT",
      description: <pre>{JSON.stringify(nft, null, 2)}</pre>,
    });
  };

  const dummy_nft = {
    chips: ["채용", "인증", "채용"],
  };
  return (
    <div
      className="grid grid-cols-[262px_1fr_90px_auto] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center"
      // onClick={() => router.push(`/nfts/${nft.user.id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-sm aspect-square bg-accent-secondary">
          <IPFSImageLayer
            hashes={nft.user?.avatar ? nft.user.avatar : defaultAvatar}
          />
        </div>

        <div>
          <div className="mb-2 text-title_l">{nft.user.display_name}</div>

          <Badge variant={"outline"}>
            {nft.user.role ? nft.user.role : "미설정"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 bg-background-layer-2">
          <Image
            src={`https://ipfs.io/ipfs/${nft.achievement.image}`}
            alt="achievement_image"
            fill={true}
            className="rounded-sm"
          />
        </div>

        <div>
          <div className="mb-2 text-title_l">{nft.achievement.name}</div>

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
          {formatDate(nft.created_at)}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={rejectNFT}
          className="p-2 rounded-md w-14 h-14"
          variant="secondary"
          size="icon"
          loading={isLoading}
        >
          <X className="w-6 h-6"></X>
        </Button>

        <Button
          onClick={acceptNFT}
          className="p-2 rounded-md w-14 h-14"
          size="icon"
        >
          <Check className="w-6 h-6"></Check>
        </Button>
      </div>
    </div>
  );
}
