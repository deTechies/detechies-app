"use client";

import ProfileCard from "@/components/card/profile-card";
import { User } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

export interface Profile {
  id: string;
  name: string;
  email: string;
  display_name: string;
  avatar: string;
  wallet:string;
  image: string;
  nft: string[];
}
export default function ListProfiles({
  users,
  followers,
}: {
  users: User[];
  followers: string[];
}) {
  const searchParams = useSearchParams()!;

  const nameFilter = searchParams.get("search") || "";

  return (
    <div className="w-full  grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pr-8">
      {users?.length > 0 &&
        users
          .filter((profile: User) => {
            return (
              nameFilter === "" ||
              profile.display_name
                .toLowerCase()
                .includes(nameFilter.toLowerCase())
            );
          })
          .map((profile: User, index) => (
            <ProfileCard
              key={index}
              profile={profile}
              followed={followers && followers.includes(profile.id)}
            />
          ))}
    </div>
  );
}
