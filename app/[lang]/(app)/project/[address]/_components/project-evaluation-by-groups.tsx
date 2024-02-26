// "use client";
import { getGroups } from "@/lib/data/groups";

import RequestNFTModal from "@/components/request-nft/request-nft";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { serverApi } from "@/lib/data/general";
import { AchievementReward, NFT_TYPE } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
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

  const { data: groups } = await getGroups();
  const verifiedGroups = groups.filter((group: any) => group.verified);

  const { data: rewardedAchievements } = await serverApi(
    `/achievement-rewards/project-rewards/${details.id}`
  );

  if (!verifiedGroups) return null;

  console.log(rewardedAchievements);

  return (
    <Card className="flex flex-col px-6 pt-6 gap-7 pb-7">
      <CardHeader className="flex flex-wrap items-center justify-between">
        <h5 className="text-subhead_s">{lang.project.details.evalu.title}</h5>

        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && (
          <RequestNFTModal groups={verifiedGroups} lang={lang} />
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          {rewardedAchievements.length && rewardedAchievements.length > 0 ? (
            rewardedAchievements.map(
              (achievementReward: AchievementReward, index: number) => (
                <div className="flex gap-5 truncate" key={index}>
                  <Avatar className="w-20 h-20 mb-2 rounded-sm">
                    <AvatarImage
                      alt={achievementReward.achievement.name}
                      src={`https://ipfs.io/ipfs/${
                        achievementReward.achievement.image
                          ? achievementReward.achievement.image
                          : achievementReward.achievement.avatar
                      }`}
                    />

                    <AvatarFallback className="relative rounded-sm">
                      <Image
                        src="/images/connectfast.png"
                        alt="no-item"
                        fill={true}
                        className="object-contain bg-no-repeat rounded-sm"
                      />
                    </AvatarFallback>
                  </Avatar>

                  <div className="truncate border-b border-border-div">
                    <div className="flex items-center mb-4 text-title_m">
                      <div className="mr-3 truncate">
                        {achievementReward.achievement.name}
                      </div>

                      {achievementReward.achievement.nft_type ===
                        NFT_TYPE.SBT && (
                        <Badge
                          variant="info"
                          shape="sm"
                          className="px-1.5 py-0.5"
                        >
                          {
                            lang.interface.sbt_type[
                              achievementReward.achievement.type
                            ]
                          }
                        </Badge>
                      )}
                    </div>

                    <div className="mb-2 truncate text-label_m text-text-secondary">
                      {achievementReward.achievement.description}
                    </div>

                    <div className="mb-5 truncate text-label_m text-text-secondary">
                      {lang.project.details.evalu.created_at}{" "}
                      {formatDate(achievementReward.achievement.created_at)}
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
            <h5 className="text-center truncate text-text-secondary text-label_m">
              {lang.project.details.evalu.no_evalu}
            </h5>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
