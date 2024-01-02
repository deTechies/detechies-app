import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default async function MissionReward({
  achievements,
}: {
  achievements: any[];
}) {
  const list = [
    {
      points: 40,
      nft: {
        metadata: {
          name: "시니어 수료증",
          image: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
          category: "교육 수료증",
        }, // NFTItem
      },
    },
    {
      points: 60,
      nft: {
        metadata: {
          name: "시니어 수료증",
          image: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
          category: "교육 수료증",
        }, // NFTItem
      },
    },
    {
      points: 80,
      nft: {
        metadata: {
          name: "시니어 수료증",
          image: "bafkreidutepul5by5atjpebnchfscmd7s5r4pzaiezxnazuq5kdveu2fgq",
          category: "교육 수료증",
        },
      },
    },
  ];

  return (
    <Card className="min-w-[300px] pt-7 px-8 pb-8 gap-2">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">점수를 획득하고 보상받아요!</h3>
      </CardHeader>

      <CardContent>
        {achievements &&
          achievements.map((item: any, index: number) => {
            return (
              <>
                <div className="flex gap-5">
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
              </>
            );
          })}
      </CardContent>
    </Card>
  );
}
