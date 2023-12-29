import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs2";
import { getGroupAchievements } from "@/lib/data/achievements";
// import AchievementLink from "./achievement-link";
import { getClub } from "@/lib/data/groups";
import MissionCard from "@/components/card/mission-card";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string };
}) {
  const data = await getClub(params.address);

  const missions = [
    {
      seq: "1",
      image: "",
      title: "시니어 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["수상", "학위증", "교육 수료증"],
    },
    {
      seq: "2",
      image: "",
      title: "졸업시즌 과제 미션",
      end_date: "2024-01-06T20:20:29.280Z",
      chips: ["한정판 NFT", "학위증", "교육 수료증", "뀨"],
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">전체보기</TabsTrigger>
            <TabsTrigger value="career">나의 미션</TabsTrigger>
          </TabsList>

          <div className="flex gap-5">
            {missions &&
              missions.map((item: any, index: number) => (
                <MissionCard
                  address={params.address.toString()}
                  info={item}
                  key={index}
                />
              ))}
          </div>

          {missions.length < 1 && (
            <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
              현재 미션이 없습니다.
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
