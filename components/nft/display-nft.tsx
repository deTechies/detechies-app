"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ABI, API_URL } from "@/lib/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";
import NftListItem, { NFTItem } from "../card/nft-list-item";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function DisplayNFT({
  details,
  showSelect,
}: {
  details: NFTItem;
  showSelect?: boolean;
}) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);

  const { address } = useAccount();

  const { address: contract } = useParams();
  const { write, isLoading, error, data } = useContractWrite({
    address: details.contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

  const DEFAULT_IPFS_URL = "https://ipfs.io/ipfs/";


  const handleMint = async () => {
    //@ts-ignore
    setRequesting(true);
    const submitData = {
      contract: contract,
      tokenId: details.id,
      type: "individual",
      data: [""],
      requester: address,
      tokenbound: address,
    };

    if (
      !submitData.contract ||
      !submitData.tokenId ||
      !submitData.data ||
      !submitData.requester ||
      !submitData.tokenbound
    ) {
      toast({
        title: "Something went wrong with submitting the data",
        description:
          "Please contact the admins to see if there is an issue with the contract",
      });
      console.log(submitData);

      return;
    }

    await fetch(`${API_URL}/achievement/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast({
            title: "Success",
            description: "Your request has been submitted",
          });
        } else {
          console.error("Error creating profile:", data.message);
          toast({
            title: "Something went wrong with submitting the data",
            description:
              "Please contact the admins to see if there is an issue with the contract",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
        toast({
          title: "Something went wrong with submitting the data",
          description:
            "Please contact the admins to see if there is an issue with the contract",
        });
      });

    setRequesting(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="min-w-[150px] w-full grow max-w-[229px]">
        <NftListItem item={details} showSelect={showSelect} />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 max-w-[504px]">
        <div className="text-subhead_m">{details.name}</div>

        <div className="flex flex-col gap-4">
          <div className="relative object-scale-down w-full rounded-sm aspect-square bg-gradient-to-b from-state-info to-accent-primary">
            <Image
              src={
                details.image
                  ? DEFAULT_IPFS_URL + details.image
                  : DEFAULT_IPFS_URL + details.avatar
              }
              alt={details.name}
              fill={true}
              className="rounded-sm"
            />

            {/* <Button
              className="absolute w-12 h-12 bottom-2 right-2"
            >
              Hi!
            </Button> */}
          </div>

          <div className="max-w-md p-0 border rounded-sm border-border-div">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">NFT 유형</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {details.nft_type == "sbt" ? "커리어" : "한정판"}
                </span>

                {/* <Badge variant="info" shape="category">
                  언어 인증서
                </Badge> */}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">NFT 속성</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {details.avatar && details.image
                    ? "아바타 + 증명서"
                    : details.avatar
                    ? "아바타"
                    : "증명서"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-label_m text-text-secondary ">발행자</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">그룹 이름</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-background-layer-2">
            <div className="flex justify-between">
              <span className="mb-4 text-title_m">NFT 설명</span>

              <button
                onClick={() => {
                  setShowFull(!showFull);
                }}
                className="flex items-center gap-2 p-0 text-label_m text-text-secondary w-fit h-fit"
              >
                {showFull ? "hide" : "show_more"}
                {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
              </button>
            </div>

            <p className={`text-body_m ${!showFull && "line-clamp-2"}`}>
              {details.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant={"secondary"}>다음에 할래요</Button>
          <Button onClick={handleMint}>발행 요청</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
