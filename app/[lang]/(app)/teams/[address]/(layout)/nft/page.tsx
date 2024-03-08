import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserAchievements } from "@/lib/data/achievements";
import { serverApi } from "@/lib/data/general";
import NftList from "./nft-list";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const { data: userAchievements } = await getUserAchievements();
  const { data: achievements } = await serverApi(
    `/achievement/club/${params.address}`
  );

  const user_achievements = userAchievements?.map(
    (item: any) => item.achievement.id
  );
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <NftList
      achievements={achievements}
      userAchievements={user_achievements}
      lang={dictionary}
    />
  );
}
