"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
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
      className="rounded-sm shadow-custom bg-background-layer-1 p-0 min-w-[100px] max-w-[250px] hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/profiles/${profile.id}`)}
    >
      <div className="w-[64] aspect-square relative  m-0">
        <span>image here</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-[1px] ">
          <span
            className="text-accent-primary text-sm col-span-1 flex-grow h-4"
            style={{
              background: "linear-gradient(180deg, #66FB4D, #16ACCD)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.industry}
          </span>
        </div>
        <h5 className="font-semibold text-md capitalize">{profile.username}</h5>

        {}
        {followed || isFollowing ? (
          <Button
            variant={"secondary"}
            className="mt-2 text-sm z-10"
            onClick={unfollowUser}
          >
            Following
          </Button>
        ) : (
          <Button variant={"ghost"} className="mt-2 z-10 " onClick={followUser}>
            Follow
          </Button>
        )}
      </div>
    </section>
  );
}
