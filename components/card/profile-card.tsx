"use client";
import { defaultAvatar } from "@/lib/constants";
import { deleteFollowUser, startFollow } from "@/lib/data/network";
import { User } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Badge } from "../ui/badge";
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
      className="flex flex-col justify-center gap-2 p-0 rounded-sm cursor-pointer shadow-custom bg-background-layer-1 hover:shadow-lg"
      onClick={() => router.push(`/profiles/${profile.wallet}`)}
    >
      <div className="flex flex-col w-full ">
        <div className="flex justify-center align-center p-5">
          <div className="relative w-32 h-32  rounded-full bg-[#FFE590] ">
            <IPFSImageLayer hashes={profile.avatar ? profile.avatar : defaultAvatar}  className="rounded-full"/>
          </div>
        </div>
        
        <h5 className="text-sm tracking-wider text-center capitalize truncate mt-1 ">{profile.role? profile.role : ''}</h5>
        <h5 className="font-bold text-lg tracking-wider text-center capitalize truncate my-2 ">{profile.display_name? profile.display_name : 'not_found'}</h5>
        <div className="flex mt-3 justify-center  align-center">
          {profile.tags?.length > 0 ? profile.tags.map((item,index)=> index>2 ? index==3 ? <Badge className="text-[14px] not-italic leading-4 tracking-wider font-medium">그외 기술+{profile.tags?.length-3}</Badge> : '' : 
          <Badge className="text-[14px] not-italic leading-4 tracking-wider font-medium" key={index}>{item}</Badge> ) : ''}
        </div>
        <div className="px-5  mt-5">
          <div className="w-full border-[1px] border-lightGray/30  "></div>
        </div>
        <div className="flex justify-center  align-center gap-5 p-5">
          <div className="flex flex-col gap-2 justify-center  align-center">
            <div className=" text-[#00C71B] text-[28px] font-bold not-italic leading-9 flex justify-center  align-center">
              {profile.projectsCount}
            </div>
            <div className="text-[#6B7684] text-[14px] not-italic font-semibold leading-4 ">
              참가한 프로젝트
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#00C71B] text-[28px] font-bold not-italic leading-9 flex justify-center  align-center">
              {profile.achievementsCount}
            </div>
            <div className="text-[#6B7684] text-[14px] not-italic font-semibold leading-4 ">
              평가받은 횟수
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#00C71B] text-[28px] font-bold not-italic leading-9 flex justify-center  align-center">
              {profile.nft?.length > 0? profile.nft?.length : 0}
            </div>
            <div className="text-[#6B7684] text-[14px] not-italic font-semibold leading-4 ">
              보유한 NFT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}