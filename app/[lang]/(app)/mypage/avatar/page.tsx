import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserAchievements } from "@/lib/data/achievements";
import ListAvatars from "./list-avatars";
import { NFT_TYPE } from "@/lib/interfaces";

export default async function Avatars({
  params,
}: {
  params: { lang: Locale };
}) {
  //need to get the users received achievements
  const { data: achievements } = await getUserAchievements();
  const lang = await getDictionary(params.lang);

  const filteredAchievements = achievements.filter((achievement: any) => {
    return achievement.achievement.avatar;
  });

  return (
    <Tabs defaultValue="all">
      <TabsList className="flex items-start justify-start w-full gap-4">
        <TabsTrigger value="all">{lang.mypage.edit_avatar.tab_all}</TabsTrigger>
        <TabsTrigger value="career">
          {lang.mypage.edit_avatar.tab_career}
        </TabsTrigger>
        <TabsTrigger value="limited">
          {lang.mypage.edit_avatar.tab_limited}
        </TabsTrigger>
        <TabsTrigger value="minting">
          {lang.mypage.edit_avatar.not_approved}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ListAvatars
          status="granted"
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
      <TabsContent value="career">
        <ListAvatars
          status="granted"
          nft_type={NFT_TYPE.SBT}
          rewards={filteredAchievements}
          lang={lang}
          />
      </TabsContent>
      <TabsContent value="limited">
        <ListAvatars
          status="granted"
          nft_type={NFT_TYPE.ERC721}
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
      <TabsContent value="minting">
        <ListAvatars
          status="requested"
          rewards={filteredAchievements}
          lang={lang}
        />
      </TabsContent>
    </Tabs>
  );
}
