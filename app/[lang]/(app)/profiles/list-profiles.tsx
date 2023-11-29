"use client"

import ProfileCard from "@/components/card/profile-card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";


export interface Profile {
    id: string;
    name: string;
    role: string;
    email: string;
    username: string;
    avatar: string;
    organisation: string;
    image: string;
    nft: string[];
    industry: string;
}
export default function ListProfiles() {

    const [profiles, setProfiles] = useState<any[]>([]);
    const [followers, setFollowers] = useState<string[]>([]) 
    const {address} = useAccount();

  const searchParams = useSearchParams()!;
  
    
  const nameFilter =
    searchParams.get("search") ||
    "";
    const industryFilter =
    searchParams.get("industry") ||
    "";
    const roleFilter =
    searchParams.get("role") ||
    "";
    

    useEffect(() => {
        //get all the profiles from the backend
        const fetchProfiles = async () => {
            const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
            const result = await fetch(`${url}/polybase/profiles/all`).then(res => res.json());
            setProfiles(result);

            const followers = await fetch(`${url}/polybase/following/${address}`).then(res => res.json());
            setFollowers(followers);
            console.log(followers);

        }
        
        if(address){
            
            fetchProfiles();
        }
    }, [address])
    

  return (
    
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-4">
            {/* <loop through profile */}
            {profiles?.length > 0 && profiles
            .filter((profile: Profile) => {
                return (
                    (nameFilter === '' || profile.username.toLowerCase().includes(nameFilter.toLowerCase())) &&
                    (industryFilter === '' || profile.industry?.toLowerCase().includes(industryFilter.toLowerCase())) &&
                    (roleFilter === '' || profile.role?.toLowerCase().includes(roleFilter.toLowerCase()))
                );
            })
            .map((profile:Profile, index) => (
                <ProfileCard key={index} profile={profile} followed={followers && followers.includes(profile.id)}/>
            ))
            }
        </div>

  )
}
