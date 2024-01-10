import DisplayNFT from "@/components/nft/display-nft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { getUserAchievements } from "@/lib/data/achievements";
import { getUserProfile } from "@/lib/data/user";
import { AchievementReward } from "@/lib/interfaces";
import NftOwned from "../../profile/select/nft-owned";

export default async function Avatars() {
  const profile = await getUserProfile();
  
  //need to get the users received achievements 
  const achievements = await getUserAchievements();
  const lang = await getDictionary("kr");
  

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid w-full grid-cols-4 gap-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="career">Career</TabsTrigger>
        <TabsTrigger value="minting">on Minting</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid grid-cols-4 gap-4">
        {
          achievements && achievements.map((achievementReward: AchievementReward, index:number) =>  (
              <DisplayNFT key={index} details={achievementReward.achievement} showSelect={true} lang={lang} />
            )
          )}
          </div>
      </TabsContent>
      <TabsContent value="career">
        {profile?.TBA ? (
          <NftOwned address={profile.TBA} avatar={profile?.nft} />
        ) : (
          "No tokenbound account found!"
        )}
      </TabsContent>
      <TabsContent value="minting">
        {profile ? (
          <NftOwned address={profile} status="minting" />
        ) : (
          "No minting account found!"
        )}
      </TabsContent>
    </Tabs>
  );
}
