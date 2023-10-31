import { NFTItem } from "@/components/card/nft-list-item";
import DisplayNFT from "@/components/nft/display-nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getGroupAchievements,
  getPendingAchievements,
} from "@/lib/data/achievements";

export default async function GroupAchievements({
  address,
}: {
  address: string;
}) {
  const achievements = await getGroupAchievements(address);
  const pendingGroupAchievements = await getPendingAchievements(address);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        Achievements
      </CardHeader>

      <CardContent className="grid grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-stretch gap-4">
        {achievements &&
          achievements.map((item: NFTItem, index: number) => (
            <DisplayNFT details={item}  key={index} />
          ))}
      </CardContent>
    </Card>
  );
}
