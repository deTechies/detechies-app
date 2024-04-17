// import { Locale } from "@/i18n.config";

import MissionCard from "@/components/card/mission-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

import PageHeader from "@/components/metronic/header/page-header";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import Link from "next/link";
import QuitMission from "../_components/quit-mission";

export default async function ManageNft({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const lang = await getDictionary(params.lang);

  const { data: missions } = await serverApi(
    `/mission/campaign/` + params.address
  );

  return (
    <div className="overflow-auto flex flex-col gap-md max-w-[90vw]">
      <PageHeader title="Missions" subtitle="Manage your missions" />
      <div className="grid items-stretch gap-5 grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          className="w-full h-full"
          href={`/teams/${params.address}/mission/manage/create`}
        >
          <Card className="items-center justify-center w-full h-full hover:scale-[0.98] aspect-[3/4] gap-6 border-[3px] border-dashed rounded-md cursor-pointer border-border-div">
            <div className="flex items-center justify-center w-20 h-20 rounded-md bg-accent-secondary text-accent-primary">
              <Plus className="w-10 h-10"></Plus>
            </div>

            <div className="text-center text-gray-600 text-md">
              {lang.group.details.manage.mission.create}
            </div>
          </Card>
        </Link>

        {missions &&
          missions.map((item: any, index: number) => (
            <MissionCard
              address={params.address}
              info={item}
              key={index}
              manage={true}
              lang={lang}
              dateFormat="beginEndDates"
            >
              {new Date(item.end_date).getTime() - new Date().getTime() < 0 ? (
                <Button disabled={true}>{lang.mission.card.before_end}</Button>
              ) : (
                <div className="flex gap-2">
                  <QuitMission campaignId={item.campaignId} lang={lang} />

                  <Link
                    href={`/groups/${params.address}/mission/manage/${item.campaignId}`}
                    className="z-10 grow"
                  >
                    <Button size="lg" className="w-full">
                      {lang.group.details.manage.mission.eval}
                    </Button>
                  </Link>
                </div>
              )}
            </MissionCard>
          ))}
      </div>
    </div>
  );
}
