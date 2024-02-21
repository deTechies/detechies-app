"use client"
import Link from "next/link";


import { Check, Loader2, X } from "lucide-react";
import { Address, useContractWrite } from "wagmi";

import { ABI, defaultAvatar } from "@/lib/constants";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import { toast } from "../ui/use-toast";

interface ProfileProps {
  profile: any;
  contract: string;
}

export default function PendingProfileCard({
  profile,
  contract,
}: ProfileProps) {
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
    await fetch(
      `${url}/polybase/nft/accepted/${profile.profile.id}`,
      {}
    ).then((res) => {
    })

    
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
    <section 
    className="rounded-sm shadow-md border bg-background-layer-1 justify-center flex flex-col gap-1 pb-2 p-0 min-w-[180px] max-w-[300px] hover:border-border-div hover:shadow-lg cursor-pointer my-2"
    >
      <Link
        className="w-[64] aspect-square relative rounded-t-sm  m-0"
        href={`/profiles/${profile?.profile?.id}`}
      >
        <div className="relative w-full m-0 rounded-t-sm aspect-square bg-background-layer-2">
          <IPFSImageLayer hashes={profile.nft? profile.nft : defaultAvatar} />
        </div>
      </Link>
      <div className="text-center">
        <Link
          className="mb-1 font-semibold capitalize truncate text-md"
          href={`/profiles/${profile?.profile?.id}`}
          target="_blank"
        >
          {profile?.display_name}
        </Link>
      </div>
      <div className="flex gap-2 justify-evenly">
       
        <Button onClick={acceptEmployee} size="icon">
          {isLoading ? (
            <Loader2 className="animate-spin"  size={24} />
          ) : (
            <Check size={16} />
          )}
        </Button>
        <Button variant={"destructive"} size="icon" onClick={rejectEmployee}>
          <X size={16} />
        </Button>
      </div>
    </section>
  );
}
