import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getGroupAchievements,
  getPendingAchievements,
} from "@/lib/data/achievements";
import { CreateAchievement } from "./create-achievement";

export default async function GroupAchievements({
  address,
  isCreator,
}: {
  address: string;
  isCreator?: boolean;
}) {
  const achievements = await getGroupAchievements(address);
  const pendingGroupAchievements = await getPendingAchievements(address);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        Achievements
        {isCreator && <CreateAchievement  />}
      </CardHeader>

      <CardContent className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {achievements &&
          achievements.map((item: NFTItem, index: number) => (
            <DisplayNFT details={item}  key={index} />
          ))}
      </CardContent>
    </Card>
  );
}
