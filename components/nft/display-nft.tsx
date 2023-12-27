"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { ABI, API_URL } from "@/lib/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";
import NftListItem, { NFTItem } from "../card/nft-list-item";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
export default function DisplayNFT({details, showSelect}: {details:NFTItem , showSelect?: boolean}) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const {address}= useAccount();
  
  const {address:contract} = useParams();
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
      <DialogTrigger>
        <NftListItem item={details} showSelect={showSelect} />
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center space-x-2 space-y-4 my-4">
          <div className="relative aspect-square  rounded-sm object-scale-down w-[20%] bg-gradient-to-b from-state-info to-accent-primary">
            <Image
              src={details.image ? `https://ipfs.io/ipfs/${details.image}` : ``}
              alt={details.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="bg-black-100 rounded-sm p-2 shadow-sm max-w-md">
            {details.metadata &&
              Object.entries(details).map(([key, value], index) => (
                <dl
                  className="grid grid-cols-4 justify-between p-1 px-2 gap-2 my-2"
                  key={index}
                >
                  <dd className="text-text-secondary font-light text-sm capitalize">
                    {key}
                  </dd>
                  <dd className="col-span-3 text-primary text-sm overflow-auto text-right text-clip">
                    {value?.toString()}
                  </dd>
                </dl>
              ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Button variant={"secondary"}>Cancel</Button>
          <Button onClick={handleMint}>Request </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
