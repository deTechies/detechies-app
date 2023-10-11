"use client";
import { Loader2, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";

import { useState } from "react";



import Image from "next/image";
import { useAccount } from "wagmi";
import AddMemberModal from "../extra/add-member";

import useFetchData from "@/lib/useFetchData";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useToast } from "../ui/use-toast";


interface ProfileProps {
  profile: any;
  image: string;
}

export default function GroupProfileCard({ profile, image }: ProfileProps) {
  const { id } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const { address } = useAccount();

  const { toast } = useToast();

  const {
    data,
    loading: fetching,
    error,
  } = useFetchData(`/company/details/${id}`);

  const join = async () => {
    //@ts-ignore
    setLoading(true);
    //TODO: still need to implement the tokenbound account here.
    const submitData = {
      contract: profile.address,
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
          setJoined(true);
        } else {
          console.error("Error creating profile:", data.message);
          toast({
            title: "Already joined the company",
            description: data.message,
            variant: "destructive",
          });
          
          setJoined(true);
        }
      });

    setLoading(false);
  };

  return (
    <Card className="w-full sticky top-10">
      <CardHeader className="flex justify-between ">
        <h3 className="leading-3">{profile.details ? profile.details?.name : "Name not found"}</h3>
        <Badge>
          {profile.address && profile.address} 
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
          <Image
            src={
              image
                ? `https://ipfs.io/ipfs/${image}`
                : "https://careerzen.org/images/careerzen-logo.png"
            }
            alt={`Layer company image`}
            className="rounded-md"
            width={200}
            style={{
              objectFit: 'contain', // cover, contain, none
            }}
            height={200}
          />
        <div className="my-4">
          <div className="grid grid-cols-2 border rounded-md">
            <ProfileStat name="projects" value={projects.length} />
            <ProfileStat name="employees" value={profile?.owners?.length} />
          </div>

          {profile?.owners?.includes(address) ? (
            <div className="grid grid-cols-1 gap-2 my-4 items-center">
              <AddMemberModal />
              <Button
                onClick={() => window.alert("not imple")}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex gap-2">
                    <RefreshCcw className="animate-spin" /> Requesting..
                  </span>
                ) : joined ? (
                  "Already joined"
                ) : (
                  "Request NFT"
                )}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 my-4 items-center">
              <Button variant={"secondary"}>Contact Owner</Button>
              <Button onClick={() => join()} disabled={loading || joined}>
                {loading ? (
                  <span className="flex gap-2">
                    <Loader2 className="animate-spin" /> Requesting..
                  </span>
                ) : joined ? (
                  "Already joined"
                ) : (
                  "Join"
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileStat({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex flex-col p-4 px-6 justify-center item-center text-center">
      <h3 className="text-black-normal font-bold text-xl">{value}</h3>
      <span className="text-text-secondary capitalize">{name}</span>
    </div>
  );
}
