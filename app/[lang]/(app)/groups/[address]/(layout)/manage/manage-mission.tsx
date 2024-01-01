// import { Locale } from "@/i18n.config";

import MissionCard from "@/components/card/mission-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getClubMissions } from "@/lib/data/mission";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ManageNft({ details }: { details: any }) {
  // const dictionary = await getDictionary(params.lang);
  
  const missions = await getClubMissions(details.id);

  const missions2 = [
    {
      image: "",
      title: "시니어 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["수상", "학위증", "교육 수료증"],
    },
    {
      image: "",
      title: "졸업시즌 과제 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["한정판 NFT", "학위증", "교육 수료증", "뀨"],
    },
    {
      image: "",
      title: "시니어 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["수상", "학위증", "교육 수료증"],
    },
    {
      image: "",
      title: "졸업시즌 과제 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["한정판 NFT", "학위증", "교육 수료증", "뀨"],
    },
    {
      image: "",
      title: "시니어 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["수상", "학위증", "교육 수료증"],
    },
    {
      image: "",
      title: "졸업시즌 과제 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["한정판 NFT", "학위증", "교육 수료증", "뀨"],
    },
  ];

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="overflow-auto max-w-[90vw]">
        <div className="flex flex-wrap gap-5">
          <Link href={`/groups/${details.id}/mission/manage/create`}>
          <Card className="gap-6 border rounded-md cursor-pointer border-border-div bg-background-layer-1 max-w-[288px] w-full items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-md bg-accent-secondary text-accent-primary">
              <Plus className="w-10 h-10"></Plus>
            </div>

            <div className="text-text-secondary text-subhead_m">새로운 미션 생성하기</div>
          </Card>
          </Link>

          {missions &&
            missions.map((item: any, index: number) => (
              <MissionCard address={item.id} info={item} key={index}>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="grow">
                    강제종료
                  </Button>

                  <Button size="sm" className="grow">
                    수행평가
                  </Button>
                </div>
              </MissionCard>
            ))}
        </div>
      </div>
    </div>
  );
}
