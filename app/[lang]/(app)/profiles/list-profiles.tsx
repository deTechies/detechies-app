"use client"

import ProfileCard from "@/components/card/profile-card";
import { useSearchParams } from "next/navigation";


export interface Profile {
    id: string;
    name: string;
    email: string;
    display_name: string;
    avatar: string;
    image: string;
    nft: string[];
}
export default function ListProfiles({users, followers}: {users: Profile[], followers:string[]}) {

  const searchParams = useSearchParams()!;
    
  const nameFilter =
    searchParams.get("search") ||
    "";

  return (
    
    <div className="w-full md:m-24 m-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {users?.length > 0 && users
            .filter((profile: Profile) => {
                return (
                    (nameFilter === '' || profile.display_name.toLowerCase().includes(nameFilter.toLowerCase()))                 );
            })
            .map((profile:Profile, index) => (
                <ProfileCard key={index} profile={profile} followed={followers && followers.includes(profile.id)}/>
            ))
            }
        </div>

  )
}
