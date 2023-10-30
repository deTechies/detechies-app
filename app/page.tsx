
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import AvatarNFTs from "./profile/avatar-nfts";
import ProfileMe from "./profile/page";
import ProfileDetailCard from "./profile/profile-detail-card";
export default async function ProfileDashboard() {
  
  const profile = await getUserProfile();
  console.log(profile)
  return (
    <main className="m-10">
      <div className="absolute bg-[url('/landing/background-card.png')] object-scale-down top-[64px] left-0  z-[-10] min-h-[20vh] min-w-full" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-8 align-center relative">
        <div className="col-span-1  flex flex-col gap-4">
          {profile && profile.TBA && (
            <ProfileDetailCard
              profile={profile}
              image={profile.nft ? profile.nft : defaultAvatar}
            />
          )}
          {profile && profile.nft?.length > 0 && (
            <AvatarNFTs nfts={profile.nft} />
          )}
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProfileMe />
        </div>
      </div>
    </main>
  );
}
