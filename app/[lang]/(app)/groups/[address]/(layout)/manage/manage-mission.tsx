// import { Locale } from "@/i18n.config";
"use client";

import MissionCard from "@/components/card/mission-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

import Link from "next/link";
import { useParams } from "next/navigation";
import QuitMission from "./_components/quit-mission";

export default function ManageNft({
  details,
  missions,
  lang,
}: {
  details: any;
  missions: any;
  lang: any;
}) {
  // const dictionary = await getDictionary(params.lang);

  const params = useParams();
  // const missions = await getClubMissions(details.id);
  // const params = useParams();

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="overflow-auto max-w-[90vw]">
        <div className="grid items-stretch gap-5 grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            className="w-full h-full"
            href={`/${params.lang}/groups/${details.id}/mission/manage/create`}
          >
            <Card className="items-center justify-center w-full h-full gap-6 border-[3px] border-dashed rounded-md cursor-pointer border-border-div">
              <div className="flex items-center justify-center w-20 h-20 rounded-md bg-accent-secondary text-accent-primary">
                <Plus className="w-10 h-10"></Plus>
              </div>

              <div className="text-text-secondary text-subhead_m text-center">
                {lang.group.details.manage.mission.create}
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
                lang={lang}
              >
                <div className="flex gap-2">
                  <QuitMission
                    campaignId={details.campaignId}
                    lang={lang}
                  ></QuitMission>

                  <Link
                    href={`/groups/${details.id}/mission/manage/${item.campaignId}`}
                    className="z-10 grow"
                  >
                    <Button size="lg" className="w-full">
                      {lang.group.details.manage.mission.eval}
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
