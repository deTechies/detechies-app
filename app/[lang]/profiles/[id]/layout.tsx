

import React from "react";

import ProfileDetailCard from "@/app/[lang]/profile/profile-detail-card";
import { Card } from "@/components/ui/card";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import AvatarNFTs from "../../profile/avatar-nfts";

export default  async function ProfileViewLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {


  const profile = await getUserProfile(params.id)

  console.log(profile)
  

  return (
    <main className="m-8">
      <div className="absolute bg-[url('/landing/background-card.png')] object-fit z-[-10] top-[64px] left-0  min-h-[20vh] min-w-full"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-8 align-center relative">
        <div className="col-span-1  flex flex-col gap-4">
          {profile.message && profile.message.TBA ? (
            <ProfileDetailCard
              profile={profile.message}
              image={profile.message.nft ? profile.message.nft : defaultAvatar}
            />
          ) : (
            params.id && <Card>No TBA Account</Card>
          )}
          {profile && profile.message.nft?.length > 0 && (
            <AvatarNFTs nfts={profile.message.nft} />
          )}
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">{children}</div>
      </div>
    </main>
  );
}
