import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NFTItem } from "@/components/card/nft-list-item";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function MissionReward({}: {}) {
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
        }, // NFTItem
      },
    },
  ];

  return (
    <Card className="min-w-[300px] pt-7 px-8 pb-8 gap-2">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">점수를 획득하고 보상받아요!</h3>
      </CardHeader>

      <CardContent>
        {list &&
          list.map((item: any, index: number) => {
            return (
              <>
                <div className="flex gap-5">
                  <div className="w-[120px] h-[120px] relative bg-background-layer-2">
                    <Image
                      src={`https://ipfs.io/ipfs/${item.nft.metadata.image}`}
                      alt={item.nft.metadata.name}
                      fill={true}
                      className="rounded-sm"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <div className="mb-1 text-title_m text-state-success">
                      {item.points}점 이상 획득하면
                    </div>
                    <div className="mb-4 text-title_m">
                      {item.nft.metadata.name}
                    </div>
                    <Badge
                      variant="default"
                      className="text-state-info rounded-[5px] px-2.5 py-1"
                    >
                      {item.nft.metadata.category}
                    </Badge>
                  </div>
                </div>

                {index != list.length - 1 && <hr className="my-6" />}
              </>
            );
          })}
      </CardContent>
    </Card>
  );
}
