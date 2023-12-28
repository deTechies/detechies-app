
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import AvatarNFTs from "./profile/avatar-nfts";
import ProfileMe from "./profile/page";
import ProfileDetailCard from "./profile/profile-detail-card";
export default async function ProfileDashboard({params}: {params: {lang: Locale}}) {
  const dictionary = await getDictionary(params.lang) as any;
  
  const profile = await getUserProfile();
  // console.log(profile)
  
  return (
    <main className="m-10">
      <div className="absolute bg-[url('/landing/background-card.png')] object-scale-down top-[64px] left-0  z-[-10] min-h-[20vh] min-w-full" />
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 align-center">
        <div className="flex flex-col col-span-1 gap-4">
          {profile && profile.TBA && (
            <ProfileDetailCard
            lang={dictionary.profile_detail_card}
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
