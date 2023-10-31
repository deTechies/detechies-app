"use client"



import { defaultAvatar } from "@/lib/constants"
import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import AvatarNFTs from "./avatar-nfts"
import ProfileDetailCard from "./profile-detail-card"


export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

      const [profile, setProfile] = useState<any>(null);
      const { address } = useAccount();

      
      useEffect(() => {
        const getUserDetails = async () => {
          const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
          const result = await fetch(url + "/polybase/" + address).then((res) => res.json());
          setProfile(result.message);
        }
        
        if(address){
          getUserDetails();
        }
      }, [address])
      
      
    
  return (
    <main className="m-10">
      <div className="absolute bg-[url('/landing/background-card.png')] object-scale-down top-[64px] left-0  z-[-10] min-h-[20vh] min-w-full">
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-8 align-center relative">
      <div className="col-span-1  flex flex-col gap-4">
        {profile && profile.TBA && <ProfileDetailCard profile={profile} image={profile.nft ? profile.nft : defaultAvatar} /> }
        {profile && profile.nft?.length > 0  && <AvatarNFTs nfts={profile.nft}/>}
      </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          {children}
        </div>
        </div>
    </main>
  )
}
