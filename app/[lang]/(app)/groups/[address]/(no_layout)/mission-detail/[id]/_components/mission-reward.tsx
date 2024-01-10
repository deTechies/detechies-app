import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default async function MissionReward({
  achievements,
  totalPoints, 
  lang,
}: {
  achievements: any[];
  totalPoints?: number;
  lang: any;
}) {


  return (
    <Card className="min-w-[300px] pt-7 px-8 pb-8 gap-2">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">
          {lang.mission.detail.get_reward}
        </h3>
      </CardHeader>

      <CardContent>
        {achievements &&
          achievements.map((item: any, index: number) => {
            return (
              <>
                <div className={`flex gap-5 ${totalPoints && totalPoints >= item.min_score && 'border border-accent-primary' }`}>
                  <div className="w-[120px] h-[120px] relative bg-background-layer-2">
                    <Image
                      src={`https://ipfs.io/ipfs/${item.achievement.image}`}
                      alt={item.achievement.name}
                      fill={true}
                      className="rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <div className="mb-1 text-title_m text-state-success">
                      {lang.mission.detail.if_get}
                      {item.min_score}
                      {lang.mission.detail.if_get2}
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
              </>
            );
          })}
      </CardContent>
    </Card>
  );
}
