// import { Locale } from "@/i18n.config";

import MissionCard from "@/components/card/mission-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getClubMissions } from "@/lib/data/mission";
import { Plus } from "lucide-react";

import Link from "next/link";

export default async function ManageNft({
  details,
  address,
}: {
  details: any;
  address: string;
}) {
  // const dictionary = await getDictionary(params.lang);

  const missions = await getClubMissions(details.id);

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="overflow-auto max-w-[90vw]">
        <div className="grid items-stretch gap-5 grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link className="w-full h-full" href={`/groups/${details.id}/mission/manage/create`}>
            <Card className="items-center justify-center w-full h-full gap-6 border-[3px] border-dashed rounded-md cursor-pointer border-border-div">
              <div className="flex items-center justify-center w-20 h-20 rounded-md bg-accent-secondary text-accent-primary">
                <Plus className="w-10 h-10"></Plus>
              </div>

              <div className="text-text-secondary text-subhead_m">
                새로운 미션 생성하기
              </div>
            </Card>
          </Link>

          {missions &&
            missions.map((item: any, index: number) => (
              <MissionCard
                address={details.id}
                info={item}
                key={index}
                manage={true}
              >
                <div className="flex gap-2">
                  <Button variant="secondary" size="lg" className="grow">
                    강제종료
                  </Button>

                  <Link
                    href={`/groups/${details.id}/mission/manage/${item.campaignId}`}
                    className="z-10 grow"
                  >
                    <Button size="lg" className="w-full">
                      수행평가
                    </Button>
                  </Link>
                </div>
              </MissionCard>
            ))}
        </div>
      </div>
    </div>
  );
}
