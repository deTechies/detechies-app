"use client";
import IPFSImageLayer from "@/components/ui/layer";
import { ABI, defaultAvatar } from "@/lib/constants";
import { postServer } from "@/lib/data/postRequest";
import { AchievementReward } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, useContractWrite, useWaitForTransaction } from "wagmi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import AchievementChips from "../extra/achievement-chips";

export default function PendingMemberListItem({
  nft,
  contract,
  lang,
}: {
  nft: AchievementReward;
  contract: string;
  lang: any;
}) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    write: distributeAchievement,
  } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
    write: rewardProject,
  } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "rewardProject",
  });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { isFetched: projectFinished } = useWaitForTransaction(projectData);
  const { isFetched } = useWaitForTransaction(data);

  useEffect(() => {
    const submitNFT = async () => {
      const submitData = JSON.stringify({
        achievementId: nft.id,
        status: "accepted",
        data: data?.hash,
      });

      const result = await postServer(
        `/achievement-rewards/update`,
        submitData
      );

      if (result) {
        toast({
          title: "Success",
          description: "succesfully distirbuted the nft. ",
        });
      }

      setLoading(false);
    };

    if (isFetched) {
      submitNFT();
      router.refresh();
    }
  }, [isFetched, data, nft.id, router]);

  useEffect(() => {
    const submitProjectNFT = async () => {
      const result = await postServer(
        `/achievement-rewards/rewardProject/${nft.id}`,
        ""
      );

      if (result) {
        toast({
          title: "Success",
          description: "succesfully distirbuted the nft. ",
        });
      }

      setLoading(false);
    };

    if (projectFinished) {
      submitProjectNFT();
      router.refresh();
    }
  }, [projectFinished, projectData, nft.id, router]);

  useEffect(() => {
    if (isError || projectError) {
      setLoading(false);
    }
  }, [isError, projectError]);

  const acceptNFT = async () => {
    setLoading(true);
    
    if(!session?.web3?.address) {
      toast({
        title: "Error",
        description: "Please connect a wallet to accept the NFT",
      });
      return;
    }

    if (nft.project) {
      //get the list of all the project members wallets.
      const userWallets = nft.project.members.map(
        (member) => member.user.wallet
      );

      await rewardProject({
        args: [nft.achievement.tokenId, userWallets],
      });
    } else {
      await distributeAchievement({
        args: [nft.achievement.tokenId, nft.user.wallet, 1],
      });
    }

    //make sure that it works correct so we can update the nft data.
  };

  const rejectNFT = async () => {
    setLoading(true);
    const result = await postServer(
      `/achievement-rewards/${nft.id}/reject`,
      ""
    );
    if (result) {
      toast({
        title: "rejecting NFT",
        description: "succesfully rejected the nft. ",
      });

      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div
      className={`grid grid-cols-[262px_1fr_90px_auto] gap-4 p-5 border rounded-md border-border-div hover:shadow-lg items-center ${
        loading && "animate-pulse"
      }`}
      // onClick={() => router.push(`/nfts/${nft.user.id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-sm aspect-square bg-background-layer-2">
          {nft.project?.image ? (
            <Image
              src={`https://ipfs.io/ipfs/${nft.project.image}`}
              alt="project_image"
              fill={true}
              className="rounded-sm"
            />
          ) : (
            <IPFSImageLayer
              hashes={nft.user?.avatar ? nft.user.avatar : defaultAvatar}
            />
          )}
        </div>

        <div>
          <div className="mb-2 text-title_l">
            {nft.project ? nft.project.name : nft.user.display_name}
          </div>

          {/* <Badge shape="outline" variant="info">
            {nft.user?.profile_details?.profession
              ? lang.interface.profession_type[
                  nft.user.profile_details.profession
                ]
              : lang.interface.project_type[nft.project.type]}
          </Badge> */}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 bg-background-layer-2">
          {nft.achievement.image ? (
            <Image
              src={`https://ipfs.io/ipfs/${nft.achievement.image}`}
              alt="achievement_image"
              fill={true}
              className="rounded-sm"
            />
          ) : (
            <Image
              src={`https://ipfs.io/ipfs/${nft.achievement.avatar}`}
              alt="achievement_image"
              fill={true}
              className="rounded-sm"
            />
          )}
        </div>

        <div>
          <div className="mb-2 text-title_l">
            {nft.achievement?.name && nft.achievement.name}
          </div>

          <AchievementChips
            achievements={nft.achievement}
            limit={2}
            truncate={true}
          />
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
          disabled={isLoading || projectLoading || loading}
        >
          <X className="w-6 h-6 text-icon-secondary"/>
        </Button>

        <Button
          onClick={acceptNFT}
          className="p-2 rounded-md w-14 h-14"
          size="icon"
          disabled={isLoading || projectLoading || loading}
        >
          <Check className="w-6 h-6"/>
        </Button>
      </div>
    </div>
  );
}
