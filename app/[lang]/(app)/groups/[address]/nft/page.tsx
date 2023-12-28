import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import { getGroupAchievements } from "@/lib/data/achievements";
// import AchievementLink from "./achievement-link";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string };
}) {
  const achievements = await getGroupAchievements(params.address);

  // console.log(achievements);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">전체보기</TabsTrigger>
            <TabsTrigger value="career">커리어 NFT</TabsTrigger>
            <TabsTrigger value="limited">한정판 NFT</TabsTrigger>
            <TabsTrigger value="avatar">아바타 NFT</TabsTrigger>
          </TabsList>

          <div>
            {achievements &&
              achievements.map((item: NFTItem, index: number) => (
                <DisplayNFT details={item} key={index} />
              ))}
          </div>

          {achievements.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              최근 생성한 NFT가 없습니다.
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
