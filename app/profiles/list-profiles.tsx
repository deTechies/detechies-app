"use client"

import ProfileCard from "@/components/card/profile-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
    industry: string;
}
export default function ListProfiles() {
    const [loading, setLoading] = useState<boolean>(true); //this will be an array of profiles [
    const [profiles, setProfiles] = useState<any[]>([]);
    const [followers, setFollowers] = useState<string[]>([]) 
    const {address} = useAccount();

  const searchParams = useSearchParams()!;
    
  const nameFilter =
    searchParams.get("name") ||
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
            setLoading(false);
            



            const followers = await fetch(`${url}/polybase/following/${address}`).then(res => res.json());
            setFollowers(followers);
            console.log(followers);

        }
        
        if(address){
            
            fetchProfiles();
        }
    }, [address])
    
    //get all teh rpofiels from the backend and render them here. token the token uri they hold and render the inage. 
    if(loading){
        return (
            <Card className="flex-grow">
                <CardContent className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 justify-evenly gap-3">
                    {/* <loop through profile */}
                    {Array(10).fill(0).map((profile:any, index) => (
                        <Skeleton key={index} className="h-[200px] w-[200px] "/>
                    ))
                    }
                </CardContent>
            </Card>
        )
    }
  return (
    
    <Card className="flex-grow bg-transparent border-none shdow-none w-full">
        <CardHeader>
            <h3 className="text-2xl font-semibold">Profiles</h3>
        </CardHeader>
        <CardContent className="grid xl:grid-cols-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 flex-wrap justify-evenly gap-8">
            {/* <loop through profile */}
            {profiles
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
        </CardContent>
    </Card>
  )
}
