
import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import PendingNFT from "@/components/nft/pending-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGroupAchievements, getPendingAchievements } from "@/lib/data/achievements";
import AchievementLink from "./achievement-link";

export default async function GroupAchievements({params}: {params: {address: string}}) {
  
  const achievements = await getGroupAchievements(params.address)
  const pendingGroupAchievements = await getPendingAchievements(params.address)

  console.log(params.address)
  
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        Achievements
       <AchievementLink address={params.address.toString()} />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Tabs defaultValue="nfts" className="">
          <TabsList className="mb-4">
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="pending">In progress.</TabsTrigger>
          </TabsList>
          <TabsContent value="nfts" className="grid sm:grid-cols-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-4">
            {achievements && achievements.map((item: NFTItem, index: number) => (
              <DisplayNFT details={item}  key={index} />
            ))}
          </TabsContent>
          <TabsContent value="pending" className="grid grid-cols-2 gap-4">
            {pendingGroupAchievements && pendingGroupAchievements.map((item: any, index: number) => (
              <PendingNFT details={item} key={index} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
