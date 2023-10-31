"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface JoinGroupProps {
  address: string;
}

export default function JoinGroup({ address }: JoinGroupProps) {
    const [loading, setLoading] = useState<boolean>(false);
  const join = async () => {
    //@ts-ignore
    setLoading(true);
    //TODO: still need to implement the tokenbound account here.
    const submitData = {
      contract: address,
      tokenId: "0",
      data: [""],
      requester: address,
      tokenbound: address,
    };

    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    fetch(`${url}/polybase/requestMint`, {
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
            title: "You made a request to join",
            description:
              "You request is under review and you will be notified once it is done.",
          });
        } else {
          toast({
            title: "Already joined the company",
            description: data.message,
            variant: "destructive",
          });
        }
      });
      
      setLoading(false);
  };
  return (
  <Button onClick={join}
    loading={loading}
    className="w-full"
  >
    Join Group
  </Button>
  );
}