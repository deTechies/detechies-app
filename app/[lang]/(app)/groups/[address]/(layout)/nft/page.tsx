import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getClub } from "@/lib/data/groups";
// import AchievementLink from "./achievement-link";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string };
}) {
  const details = await getClub(params.address);

  // console.log(details);
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4" variant="button1">
            <TabsTrigger value="all" variant="button1">
              전체보기
            </TabsTrigger>
            <TabsTrigger value="career" variant="button1">
              커리어 NFT
            </TabsTrigger>
            <TabsTrigger value="limited" variant="button1">
              한정판 NFT
            </TabsTrigger>
            <TabsTrigger value="avatar" variant="button1">
              아바타 NFT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements.map((item: NFTItem, index: number) => (
                  <DisplayNFT details={item} key={index} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="career">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: NFTItem) => {
                    return item.nft_type == "sbt";
                  })
                  .map((item: NFTItem, index: number) => (
                    <DisplayNFT details={item} key={index} />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="limited">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: NFTItem) => {
                    return item.nft_type == "erc721";
                  })
                  .map((item: NFTItem, index: number) => (
                    <DisplayNFT details={item} key={index} />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="avatar">
            <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {details.achievements &&
                details.achievements
                  .filter((item: NFTItem) => {
                    return item.avatar;
                  })
                  .map((item: NFTItem, index: number) => (
                    <DisplayNFT details={item} key={index} />
                  ))}
            </div>
          </TabsContent>

          {details.achievements.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              최근 생성한 NFT가 없습니다.
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
