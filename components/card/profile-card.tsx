"use client";
import { defaultAvatar } from "@/lib/constants";
import { deleteFollowUser, startFollow } from "@/lib/data/network";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import { toast } from "../ui/use-toast";


interface ProfileProps {
  profile: User;
  followed?: boolean;
}



export default function ProfileCard({ profile, followed }: ProfileProps) {
  const { address } = useAccount();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(followed || false);
  const followUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent event propagation
    
    await startFollow(profile.id);
    followed = true;

    setIsFollowing(true);
    toast({
      title: "Start following " + profile.display_name,
    });
  };

  const unfollowUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent event propagation
    
    await deleteFollowUser(profile.id);


    toast({
      title: "Unfollowing " + profile.display_name,
    });
  };
  return (
    <section
      className="rounded-sm shadow-custom bg-background-layer-1 p-0 hover:shadow-lg cursor-pointer flex flex-col justify-center gap-2 "
      onClick={() => router.push(`/profiles/${profile.wallet}`)}
    >
      <div className="w-full aspect-square relative  rounded-t-sm m-0">
        <IPFSImageLayer hashes={profile.avatar ? profile.avatar : defaultAvatar} className="rounded-b-none" />
      </div>
      <div className="p-2 flex flex-col">
        <h5 className="font-medium tracking-wider text-md capitalize truncate text-center">{profile.display_name? profile.display_name : 'not_found'}</h5>
        {followed || isFollowing ? (
          <Button
            variant="secondary"
            className="z-10 text-sm py-2  mx-auto my-2"
            onClick={unfollowUser}
            disabled
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
