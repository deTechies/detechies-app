"use client";
import { defaultAvatar } from "@/lib/constants";
import { deleteFollowUser, startFollow } from "@/lib/data/network";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Avatar } from "../ui/avatar";
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
      className="flex flex-col justify-center gap-2 p-4 rounded-sm cursor-pointer bg-background-layer-1 hover:shadow-lg "
      onClick={() => router.push(`/profiles/${profile.wallet}`)}
    >
      <div className="w-[100px] mx-auto m-0 rounded-full aspect-square bg-background-layer-2 ">
        <Avatar className="w-[100px] h-[100px]">
          <IPFSImageLayer
            hashes={profile.avatar ? profile.avatar : defaultAvatar}
            className=""
          />
        </Avatar>
      </div>
      <div className="flex flex-col gap-2">
        <section className="flex flex-col items-center justify-center">
          <h5 className="text-title_m">
            {profile.display_name ? profile.display_name : "not_found"}
          </h5>
          <span className="text-label_m text-text-secondary">
            {profile.profile_details?.profession
              ? profile.profile_details?.profession
              : " "}
          </span>
        </section>
        <section className="grid grid-cols-3 gap-4 ">
          <ProfileStat label="Clubs" value={profile.clubsCount} />
          <ProfileStat label="Achievements" value={profile.achievementsCount} />
          <ProfileStat label="Projects" value={profile.projectsCount} />
        </section>
      </div>
    </section>
  );
}

const ProfileStat = ({ label, value }: { label: string; value: number }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </section>
  );
};
