import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AchievementLink from "./achievement-link";
import MissionCard from "@/components/card/mission-card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getClubMissions } from "@/lib/data/mission";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale; };
}) {
  const {data} = await getClubMissions(params.address);
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4" variant="button1">
            <TabsTrigger value="all" variant="button1">
              {dictionary.group.details.missions.all}
            </TabsTrigger>
            <TabsTrigger value="career" variant="button1">
              {dictionary.group.details.missions.my_mission}
            </TabsTrigger>
          </TabsList>

          <div className="grid items-stretch gap-5 grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data &&
              data.map((item: any, index: number) => (
                <MissionCard
                  address={params.address.toString()}
                  info={item}
                  key={index}
                  lang={dictionary}
                />
              ))}
          </div>

          {data.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              {dictionary.group.details.missions.no_mission}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
