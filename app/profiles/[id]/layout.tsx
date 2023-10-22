"use client";

import React from "react";
import { useAccount } from "wagmi";

import ProfileDetailCard from "@/app/profile/profile-detail-card";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import { defaultAvatar } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import { getAddress } from "viem";
import AvatarNFTs from "../../profile/avatar-nfts";

export default function ProfileViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();

  const { address } = useAccount();

  let {
    data: profile,
    error,
    loading,
  } = useFetchData<any>(`/polybase/${getAddress(params.id.toString())}`);
  

  if (loading) return <Loading />;
  if (error) return <div>error</div>;
  if (!profile) return <div>no profile</div>;
  profile = profile.message;
  return (
    <main className="m-8">
      <div className="absolute bg-[url('/landing/background-card.png')] object-fit z-[-10] top-[64px] left-0  min-h-[20vh] min-w-full"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-8 align-center relative">
        <div className="col-span-1  flex flex-col gap-4">
          {profile && profile.TBA ? (
            <ProfileDetailCard
              profile={profile}
              image={profile.nft ? profile.nft : defaultAvatar}
            />
          ) : (
            address && <Card>No TBA Account</Card>
          )}
          {profile && profile.nft?.length > 0 && (
            <AvatarNFTs nfts={profile.nft} />
          )}
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">{children}</div>
      </div>
    </main>
  );
}
