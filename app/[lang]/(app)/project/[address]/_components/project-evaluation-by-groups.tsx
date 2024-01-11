// "use client";
import { getGroups } from "@/lib/data/groups";

import RequestNFTModal from "@/components/request-nft/request-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import { AchievementReward } from "@/lib/interfaces";
import Image from "next/image";

export default async function ProjectEvaluationByGroups({
  details,
}: {
  details: any;
}) {
  //pretty simple and straightforward, we just going to check which nfts the project holds in order to showcase htem.
  //we want top check if we own any of the data is pending..

  const groups = await getGroups();

  const rewardedAchievements = (await serverApi(
    `/achievement-rewards/project-rewards/${details.id}`
  )) as AchievementReward[];
  
  if (!groups) return null;

  // const dummy_nfts = [
  //   {
  //     id: "314fec38-e683-44e7-af35-a5cd82130ea2",
  //     contract: null,
  //     name: "JiyongNFT",
  //     description: "내가 하사하는 NFT이니 영광으로 아시오",
  //     nft_type: "sbt",
  //     image: "bafybeiakpczli6q36a2dcx3euxyq4zxdwlv5yviumby35pbjj7yzauilty",
  //     avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
  //     avatar_type: "clothes",
  //     type: "awards",
  //     onchain: false,
  //     created_at: "2023-12-30T22:32:41.165Z",
  //   },
  //   {
  //     id: "734dd6ae-c5d6-4273-8174-c998bc29ad91",
  //     contract: null,
  //     name: "AvatarImage",
  //     description: "AvatarImage test",
  //     nft_type: "erc721",
  //     image: "bafybeiakpczli6q36a2dcx3euxyq4zxdwlv5yviumby35pbjj7yzauilty",
  //     avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
  //     avatar_type: "clothes",
  //     type: null,
  //     onchain: false,
  //     created_at: "2024-01-02T00:03:47.120Z",
  //   },
  //   {
  //     id: "0dcd09a0-dbb4-4ecd-80f0-93c70daa52d2",
  //     contract: null,
  //     name: "test",
  //     description: "test",
  //     nft_type: "erc721",
  //     image: "bafkreiexoszjqguxd3azoasc37gfgermejm54erpo7u4qj6wcpymhwoe4m",
  //     avatar: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
  //     avatar_type: "clothes",
  //     type: null,
  //     onchain: false,
  //     created_at: "2024-01-02T00:10:47.462Z",
  //   },
  // ];

  return (
    <Card className="flex flex-col px-6 pt-6 gap-7 pb-7">
      <CardHeader className="flex flex-wrap items-center justify-between">
        <h5 className="text-subhead_s">
          {/* evaluation by group */}
          그룹 평가
        </h5>

        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && <RequestNFTModal groups={groups} />}
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
            <h5 className="text-center text-text-secondary text-label_m">
              받은 그룹 평가 또는 NFT 수상이 없어요.
            </h5>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
