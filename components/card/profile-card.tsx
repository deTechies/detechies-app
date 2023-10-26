"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import { toast } from "../ui/use-toast";

interface ProfileProps {
  profile: any;
  followed?: boolean;
}



export default function ProfileCard({ profile, followed }: ProfileProps) {
  const { address } = useAccount();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const followUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent event propagation
    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    await fetch(`${url}/polybase/follow/${profile.id}/${address}`, {}).then(
      (res) => res.json()
    );

    followed = true;

    setIsFollowing(true);
    toast({
      title: "Start following " + profile.name,
    });
  };

  const unfollowUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent event propagation
    const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
    await fetch(`${url}/polybase/unfollow/${profile.id}/${address}`, {}).then(
      (res) => res.json()
    );


    toast({
      title: "Unfollowing " + profile.name,
    });
  };
  return (
    <section
      className="rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[100px] max-w-[250px] hover:shadow-lg cursor-pointer flex flex-col justify-center gap-2"
      onClick={() => router.push(`/profiles/${profile.id}`)}
    >
      <div className="w-[64] aspect-square relative  rounded-t-sm m-0">
        <IPFSImageLayer hashes={profile.nft} className="rounded-b-none" />
      </div>
      <div className="p-2 flex flex-col">
        <h5 className="font-semibold text-md capitalize truncate ">{profile.username}</h5>
        <span className=" text-ellipse truncate w-full capitalize text-sm overflow-hidden text-text-secondary">{profile.job ? profile.job : "Other"}</span>
        {}
        {followed || isFollowing ? (
          <Button
            variant="secondary"
            className="z-10 text-sm py-2  mx-auto my-2"
            onClick={unfollowUser}
          >
            Following
          </Button>
        ) : (
          <Button  className="z-10 text-sm py-2  mx-auto my-2 " onClick={followUser}>
            Follow
          </Button>
        )}
      </div>
    </section>
  );
}
