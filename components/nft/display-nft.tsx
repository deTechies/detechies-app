"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ABI, API_URL } from "@/lib/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";
import NftListItem, { NFTItem } from "../card/nft-list-item";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
export default function DisplayNFT({
  details,
  showSelect,
}: {
  details: NFTItem;
  showSelect?: boolean;
}) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const { address } = useAccount();

  const { address: contract } = useParams();
  const { write, isLoading, error, data } = useContractWrite({
    address: details.contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

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
              src={details.image ? `https://ipfs.io/ipfs/${details.image}` : ``}
              alt={details.name}
              fill={true}
              className="rounded-sm"
            />
          </div>
          <div className="bg-black-100 rounded-sm p-2 shadow-sm max-w-md">
            {details.metadata &&
              Object.entries(details).map(([key, value], index) => (
                <>
                <dl
                  className="grid grid-cols-4 justify-between p-1 px-2 gap-2 my-2"
                  key={index}
                >
                  <dd className="text-text-secondary font-light text-sm capitalize">
                    {key}
                  </dd>

                  <dd className="flex gap-2 overflow-auto text-right text-primary text-clip">
                    {/* need data about nft type */}
                    <span className="text-title_l">
                      커리어
                    </span>
                    
                    <Badge className="rounded-[5px] text-state-info text-title_s px-2.5">
                      언어 인증서
                    </Badge>
                  </dd>
                </dl>

                <dl className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 my-2 border-b border-border-div">
                  <dd className="capitalize text-label_l text-text-secondary">
                    NFT 속성
                  </dd>

                  <dd className="overflow-auto text-right text-primary text-clip text-title_l">
                    {details.category}
                  </dd>
                </dl>

                <dl className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 my-2">
                  <dd className="capitalize text-label_l text-text-secondary">
                    발행자
                  </dd>

                  <dd className="overflow-auto text-right text-primary text-clip text-title_l">
                    {details.group?.id}
                  </dd>
                </dl>
              </>
            ))}
          </div>

          <div className="p-4 rounded-sm bg-background-layer-2">
            <h4 className="mb-4 text-title_m">NFT 설명</h4>

            <p className="text-body_m">{details.description}</p>
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
