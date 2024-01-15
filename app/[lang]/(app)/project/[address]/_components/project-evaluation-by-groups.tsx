// "use client";
import { getGroups } from "@/lib/data/groups";

import RequestNFTModal from "@/components/request-nft/request-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import { AchievementReward } from "@/lib/interfaces";
import Image from "next/image";

export default async function ProjectEvaluationByGroups({
  details,
  lang,
}: {
  details: any;
  lang: any;
}) {
  //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem.
  //we want top check if we own any of the data is pending..

  const {data:groups} = await getGroups();

  const {data:rewardedAchievements} = await serverApi(
    `/achievement-rewards/project-rewards/${details.id}`
  );
  
  if (!groups) return null;

  return (
    <Card className="flex flex-col px-6 pt-6 gap-7 pb-7">
      <CardHeader className="flex flex-wrap items-center justify-between">
        <h5 className="text-subhead_s">
          {lang.project.details.evalu.title}
        </h5>

        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && <RequestNFTModal groups={groups} lang={lang}/>}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          {rewardedAchievements.length && rewardedAchievements.length > 0 ? (
            rewardedAchievements.map(
              (achievementReward: AchievementReward, index: number) => (
                <div className="flex gap-5 truncate" key={index}>
                  <div className="w-20 h-20 overflow-hidden rounded-sm bg-background-layer-2 shrink-0">
                    <Image
                      width="80"
                      height="80"
                      alt={achievementReward.achievement.name}
                      src={`https://ipfs.io/ipfs/${
                        achievementReward.achievement.image
                          ? achievementReward.achievement.image
                          : achievementReward.achievement.avatar
                      }`}
                    ></Image>
                  </div>

                  <div className="truncate border-b border-border-div">
                    <div className="mb-4 text-title_m">
                      <div className="mr-3 truncate">
                        {achievementReward.achievement.name}
                      </div>

                      {/* <Badge variant="details" shape="category">
                    {achievementReward.achievement.type == "awards" ? "수상" : "교육 수료증"}
                  </Badge> */}
                    </div>

                    <div className="mb-2 truncate text-label_m text-text-secondary">
                      asdfas asdfasdf asdfas asdfasdfasdfas asdfasdfasdfas
                      asdfasdfasdfas asdfasdfasdfas asdfasdf
                    </div>

                    <div className="mb-5 truncate text-label_m text-text-secondary">
                      asdfas asdfasdf asdfas asdfasdfasdfas asdfasdfasdfas
                      asdfasdfasdfas asdfasdfasdfas asdfasdf
                    </div>
                  </div>
                </div>
                // <Avatar key={index}>
                //   <AvatarImage
                //     src={`https://ipfs.io/ipfs/${nft.metadata?.image}`}
                //     alt={nft.metadata?.name}
                //     className="border border-border-div"
                //   />
                //   <AvatarFallback> NO</AvatarFallback>
                // </Avatar>
              )
            )
          ) : (
            <h5 className="text-center text-text-secondary truncate text-label_m">
              {lang.project.details.evalu.no_evalu}
            </h5>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
