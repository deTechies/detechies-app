import DisplayNFT from "@/components/nft/display-nft";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClub } from "@/lib/data/groups";
import { Achievement } from "@/lib/interfaces";
// import AchievementLink from "./achievement-link";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserAchievements } from "@/lib/data/achievements";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const { data: details } = await getClub(params.address);
  const {data: userAchievements} = await getUserAchievements();
  const user_achievements = userAchievements.map((item: any) => item.achievement.id);

  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4" variant="button1">
            <TabsTrigger value="all" variant="button1">
              {dictionary.group.details.nft.all}
            </TabsTrigger>
            <TabsTrigger value="career" variant="button1">
              {dictionary.group.details.nft.career}
            </TabsTrigger>
            <TabsTrigger value="limited" variant="button1">
              {dictionary.group.details.nft.limited}
            </TabsTrigger>
            <TabsTrigger value="avatar" variant="button1">
              {dictionary.group.details.nft.avatar}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements.map((item: Achievement, index: number) => (
                  <DisplayNFT
                    details={item}
                    key={index}
                    lang={dictionary}
                    blockRequest={user_achievements.includes(item.id)}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="career">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: Achievement) => {
                    return item.nft_type == "sbt";
                  })
                  .map((item: Achievement, index: number) => (
                    <DisplayNFT details={item} key={index} lang={dictionary} />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="limited">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: Achievement) => {
                    return item.nft_type == "erc721";
                  })
                  .map((item: Achievement, index: number) => (
                    <DisplayNFT details={item} key={index} lang={dictionary} />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="avatar">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: Achievement) => {
                    return item.avatar;
                  })
                  .map((item: Achievement, index: number) => (
                    <DisplayNFT details={item} key={index} lang={dictionary} />
                  ))}
            </div>
          </TabsContent>

          {details.achievements.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              {dictionary.group.details.nft.no_nft}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
