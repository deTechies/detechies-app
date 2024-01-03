import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs2";
// import AchievementLink from "./achievement-link";
import MissionCard from "@/components/card/mission-card";
import { getClubMissions } from "@/lib/data/mission";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string };
}) {
  const data = await getClubMissions(params.address);

  console.log(data[1]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">전체보기</TabsTrigger>
            <TabsTrigger value="career">나의 미션</TabsTrigger>
          </TabsList>

          <div className="grid items-stretch gap-5 grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data &&
              data.map((item: any, index: number) => (
                <MissionCard
                  address={params.address.toString()}
                  info={item}
                  key={index}
                />
              ))}
          </div>

          {data.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              현재 미션이 없습니다.
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
