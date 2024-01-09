import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default async function ManageMissionReward({
  achievements,
  totalPoints, 
}: {
  achievements: any[];
  totalPoints: number;
}) {


  return (
    <Card className="min-w-[300px] pt-7 px-8 pb-8 gap-2">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">점수를 획득하고 보상받아요!</h3>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        {achievements &&
          achievements.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className={`flex gap-5 rounded-sm border ${totalPoints >= item.min_score && 'border-accent-primary'}`}>
                  <div className="w-[120px] h-[120px] relative bg-background-layer-2 rounded-sm">
                    <Image
                      src={`https://ipfs.io/ipfs/${item.achievement.image}`}
                      alt={item.achievement.name}
                      fill={true}
                      className="rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <div className="mb-1 text-title_m text-state-success">
                      {item.min_score}점 이상 획득하면
                    </div>
                    <div className="mb-4 text-title_m">
                      {item.achievement.name}
                    </div>
                    <Badge
                      variant="default"
                      className="text-state-info rounded-[5px] px-2.5 py-1"
                    >
                      {item.achievement.nft_type}
                    </Badge>
                  </div>
                </div>

                {index != achievements.length - 1 && <hr className="my-6" />}
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
