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
      className="flex flex-col justify-center gap-2 p-0 rounded-sm cursor-pointer shadow-custom bg-background-layer-1 hover:shadow-lg "
      onClick={() => router.push(`/profiles/${profile.wallet}`)}
    >
      <div className="relative w-full m-0 rounded-t-sm aspect-square">
        <IPFSImageLayer hashes={profile.avatar ? profile.avatar : defaultAvatar} className="rounded-b-none" />
      </div>
      <div className="flex flex-col p-2">
        <h5 className="font-medium tracking-wider text-center capitalize truncate text-md">{profile.display_name? profile.display_name : 'not_found'}</h5>
        {followed || isFollowing ? (
          <Button
            variant="secondary"
            className="z-10 py-2 mx-auto my-2 text-sm"
            onClick={unfollowUser}
            disabled
          >
            Following
          </Button>
        ) : (
          <Button  className="z-10 py-2 mx-auto my-2 text-sm " onClick={followUser}>
            Follow
          </Button>
        )}
      </div>
    </section>
  );
}
