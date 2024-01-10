"use client";


import { truncateMiddle } from "@/lib/utils";
import { ExternalLink, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

import { API_URL, defaultAvatar } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";

import UserChat from "@/components/extra/chat/user-chat";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Followers from "./followers";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";




interface ProfileProps {
  lang: any;
  profile: any;
  image: string[];
}

export default function ProfileDetailCard({ lang, profile, image }: ProfileProps) {
  const { id } = useParams();
  const searchParams = useSearchParams()!;
  const [refresh, setRefresh] = useState<boolean>(false);
  const { address } = useAccount();
  const { toast } = useToast();
  
  const {data:followers, loading} = useFetchData<any[]>(`/polybase/followers/${id}`);

  const clothes =
    searchParams.get("clothes") ||
    image[0];
  const face =
    searchParams.get("face") ||
    image[1];
  const head =
    searchParams.get("eyes") ||
    image[2];
    const hair =
    searchParams.get("hair") ||
    image[3];
  const background = 
    searchParams.get("background") || null;
    
    let hashes = [clothes, face, head,hair, image[4], image[5]];
    if(background) {
       hashes = [background, clothes, face, head, hair, image[4], image[5]];
    }


  const followUser = async () => {
    
    const follow = await fetch(
      `${API_URL}/polybase/follow/${id}/${address}`,
      {}
    ).then((res) => res.json());


    toast({
      title: "Start following " + profile.username,
      description: "You start following " + profile.username,
    });
  };

  const unfollowUser = async () => {

    const follow = await fetch(
      `${API_URL}/polybase/unfollow/${id}/${address}`,
      {}
    ).then((res) => res.json());


    toast({
      title: "Unfollowed " + profile.username,
      description: "You have unfollowed " + profile.username,
    });
  };
  
  

  const updateAvatar = async () => {
    setRefresh(true);
    
    
    const avatar = [clothes, face, head, hair, image[4], image[5]];
    const url = `${API_URL}/polybase/update/avatar/${address}`; // Adjust the URL if you have a different base URL or path
    
    const body = JSON.stringify({ avatar: avatar });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        
        toast({
          title:"succesfully updated"
        })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // assuming server responds with json
        return data; // or process the returned data as needed
    } catch (error) {
        toast({title:"There was a problem with the fetch operation:"});

    }
    
    setRefresh(false);
  };

  //we want to get the tokenbound account at othrees.

  return (
    <Card className="w-full">
      <CardContent>
        <div className="w-full aspect-square relative m-0 z-0 bg-gradient-to-b from-[#7CFDCE] to-[#98E2F9] rounded-md">
          {!id && (
            <Button
            size="icon"
            variant={"secondary"}
            className={`absolute top-5 right-5 z-10 py-1 px-1 rounded-[6px] cursor-pointer ${refresh && "animate-spin"}} `}
            onClick={updateAvatar}
            >
            <RefreshCw
              className={``}
             
            />
            </Button>
          )}

          <IPFSImageLayer hashes={image ? hashes : defaultAvatar} />
        </div>
        <section className="flex items-center justify-between my-4">
          <h2 className="text-2xl font-bold">
            # {profile.username}
          </h2>
          <Link
            href={`https://mumbai.polygonscan.com/address/${profile?.TBA}`}
            target="_blank"
          >
            <Badge className="flex items-center gap-2">
              {" "}
              {profile.TBA && truncateMiddle(profile.TBA, 12)}{" "}
              <ExternalLink size="12" />
            </Badge>
          </Link>
        </section>
        <div className="my-4">
          {address && <Followers address={address} />}
          {id && (
            <div className="grid grid-cols-2 gap-2 my-4 items-center">
               {address && <UserChat to={profile.id}/>}

              {followers?.includes(address) ? (
                <Button
                  variant="secondary"
                  className="w-full items-center"
                  onClick={unfollowUser}
                >
                  <Star
                    className="mr-2 text-[#f59754] hover:bg-transparent hover:text-transparent"
                    size={16}
                    fill="#f59754"
                  />
                  Followed
                </Button>
              ) : (
                <Button
                  className="w-full flex items-center"
                  onClick={followUser}
                >
                  <Star className="mr-2 pb-1" size={24} />{" "}
                  <span className="">Follow</span>
                </Button>
              )}
            </div>
          ) }
        </div>
      </CardContent>
    </Card>
  );
}
