import Link from "next/link";


import { Check, Loader2, X } from "lucide-react";
import { Address, useContractWrite } from "wagmi";

import { ABI } from "@/lib/constants";
import { Button } from "../ui/button";
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
    functionName: "safeMint",
  });

  const acceptEmployee = async () => {
    //in here we want to have the profile.id

    if (!profile.profile.TBA) {
      toast({
        title: "Error minting ",
        description:
          "You have provided an invalid address, please check if the user still exists",
        variant: "destructive",
      });
    }
    //also update the status of this employee into the company.
    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    const follow = await fetch(
      `${url}/polybase/nft/accepted/${profile.id}`,
      {}
    ).then((res) => res.json());

    
    await write({ args: [profile.profile.TBA, 1] });

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
    <section className="rounded-md shadow-custom bg-background-layer-1 p-0 min-w-[180px] max-w-[300px] hover:shadow-lg cursor-pointer my-2">
      <Link
        className="w-[64] aspect-square relative  m-0"
        href={`/profiles/${profile?.profile?.id}`}
      >
        <div className="w-full aspect-square relative m-0 bg-red">
        
        </div>
      </Link>
      <div className="mx-3 my-3">
        <Link
          className="font-semibold text-sm capitalize mb-1 truncate"
          href={`/profiles/${profile?.profile?.id}`}
          target="_blank"
        >
          {profile.profile?.username}
        </Link>
      </div>
      <div className="mx-3 my-2 flex gap-2">
        <Button variant={"secondary"} onClick={rejectEmployee}>
          <X size={16} />
        </Button>
        <Button onClick={acceptEmployee}>
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Check size={16} />
          )}
        </Button>
      </div>
      <div>{data && <span>{JSON.stringify(data, null, 2)}</span>}</div>
    </section>
  );
}
