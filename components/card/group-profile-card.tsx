"use client";
import { ExternalLink, Loader2, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";

import { useState } from "react";



import Image from "next/image";
import { useAccount } from "wagmi";
import AddMemberModal from "../extra/add-member";

import { truncateMiddle } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useToast } from "../ui/use-toast";


interface ProfileProps {
  profile: any;
  image: string;
  isMember: boolean;
}

export default function GroupProfileCard({ profile, image, isMember }: ProfileProps) {
  const { id } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(isMember);
  const { address } = useAccount();

  const { toast } = useToast();



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
      <CardHeader className="flex justify-between items-center ">
        <div>
          <h3 className="">{profile?.name ? profile?.name : "Name not found"}</h3>

        </div>
        <Link 
          href={`https://mumbai.polygonscan.com/address/${profile.address}`} 
          className="flex items-center gap-4 rounded-md font-normal bg-background-layer-2 hover:bg-gray-200 text-sm px-4 py-3"
          target="_blank"
          >
          {profile.address && truncateMiddle(profile.address, 12)} 
          <ExternalLink className="text-text-secondary" size={16}/>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
          <Image
            src={
              image
                ? `https://ipfs.io/ipfs/${image}`
                : "https://careerzen.org/images/careerzen-logo.png"
            }
            alt={`Layer company image`}
            className="rounded-sm aspect-square bg-accent-secondary w-full"
            width={200}
            style={{
              objectFit: 'scale-down', // cover, contain, none
            }}
            height={200}
          />
        <div className="my-4 w-full">
          <div className="grid grid-cols-2 border rounded-sm">
            <ProfileStat name="achievements" value={profile.achievements.length} />
            <ProfileStat name="members" value={profile?.members?.length} />
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
            <div className="grid md:grid-cols-2 gap-2 my-4 items-center">
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
    <div className="flex flex-col p-4 px-6 justify-center item-center">
      <h3 className="text-black-normal font-medium text-lg">{value}</h3>
      <span className="text-text-secondary capitalize ">{name}</span>
    </div>
  );
}
