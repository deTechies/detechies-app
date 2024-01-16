
"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAddress } from "viem";

import { ABI, API_URL } from "@/lib/constants";
import { truncateMiddle } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Address, useContractWrite } from "wagmi";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function PendingNFT({ details }: any) {
  const {
    data,
    isLoading,
    isSuccess,
    write: distributeAchievement,
  } = useContractWrite({
    address: details.contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });

  const [minting, setMinting] = useState(false);


  const mintNFT = async () => {
    //in here we want to have the profile.id
    setMinting(true);
    if (!details.requester) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }

    //check what the type is
    //we need to get the tokenbound account for everyone to mint it to.

    if (details.type == "project") {
      //for eacht
      const workersAddresses = details.issuer.members.map((worker: any) =>
        getAddress(worker.address)
      );

    /*   await batchDistributeAchievement({
        args: [details.tokenId, workersAddresses],
      }); */
      
      for(let i = 0; i < workersAddresses.length; i++){
        await distributeAchievement({
          args: [details.nft.tokenId, workersAddresses[i], 1],
        });
      }
      
      await distributeAchievement({
        args: [details.nft.tokenId, details.requester, 1],
      })
    } else {
      await distributeAchievement({
        args: [details.nft.tokenId, details.requester, 1],
      });
    }

    
    if(data && data.hash){
      await fetch(`${API_URL}/achievement/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: details.id,
          status: "accepted",
        }),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err: Error) => console.log(err));
      
    }

    setMinting(false);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <section className="flex gap-4 rounded-sm cursor-pointer hover:bg-background-layer-2">
          <div className="relative w-24 h-24 rounded-sm aspect-square object-scale bg-gradient-to-b from-state-info to-accent-secondary">
            <Image
              src={`https://ipfs.io/ipfs/${details.nft?.metadata?.image}`}
              alt={details.nft.metadata?.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="flex flex-col text-left justify-evenly">
            <h5 className="font-medium">{details.nft.metadata?.name}</h5>
            <span className="text-sm font-light capitalize text-text-primary">
              {details.type} - {truncateMiddle(details.requester, 12)}{" "}
            </span>
            <span className="text-sm font-light text-text-secondary">
              {" "}
              4 days ago
            </span>
          </div>
        </section>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center space-x-2 space-y-4 my-4 overflow-scroll max-h-[100vh]">
          <div className="relative aspect-square  rounded-sm object-scale-down bg-gradient-to-b from-state-info to-accent-secondary w-[200px] my-4">
            <Image
              src={`https://ipfs.io/ipfs/${details.nft?.metadata?.image}`}
              alt={details.nft.metadata?.name}
              fill={true}
              className="rounded-sm shadow-md"
            />
          </div>
          <div className="bg-black-100 rounded-sm p-2 shadow-sm max-w-md  max-h-[20vh] overflow-auto">
            <dl className="grid justify-between grid-cols-4 gap-2 p-1 px-2 my-2">
              <dd className="text-sm font-light capitalize text-text-secondary">
                Requester
              </dd>
              <dd className="col-span-3 overflow-auto text-sm text-right text-primary text-clip">
                {details.requester}
              </dd>
            </dl>
            <dl className="grid justify-between grid-cols-4 gap-2 p-1 px-2 my-2">
              <dd className="text-sm font-light capitalize text-text-secondary">
                Recipients
              </dd>
              <dd className="col-span-3 overflow-auto text-sm text-right text-primary text-clip">
                <Link href={`/${details.type}/${details.requester}`}>
                  {details.type}
                </Link>
              </dd>
            </dl>
            {details.nft.metadata &&
              Object.entries(details.nft.metadata).map(
                ([key, value], index) => (
                  <dl
                    className="grid justify-between grid-cols-4 gap-2 p-1 px-2 my-2"
                    key={index}
                  >
                    <dd className="text-sm font-light capitalize text-text-secondary">
                      {key}
                    </dd>
                    <dd className="col-span-3 overflow-auto text-sm text-right text-primary text-clip">
                      {value?.toString()}
                    </dd>
                  </dl>
                )
              )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Button variant={"secondary"}>Reject</Button>
          <Button onClick={() => mintNFT()}
            loading={minting || isLoading}
          >Confirm</Button>
        </div>
      </DialogContent>

    </Dialog>
  );
}
