import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getMissionDetails, getUsersMissionProgress } from "@/lib/data/mission";
import MissionList from "./_components/mission-list";
import MissionReward from "./_components/mission-reward";
import MissionSummary from "./_components/mission-summary";

export default async function MissionDetailPage({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const {data: userProgress} = await getUsersMissionProgress(params.id);
  const {data: missionDetails} = await getMissionDetails(params.id);

  const dictionary = (await getDictionary(params.lang)) as any;
  // console.log(missionDetails)

  return (
    <main className="grid w-full gap-6 mx-8 my-10 md:grid-cols-3">
      <section className="flex flex-col md:col-span-2 gap-5">
        <MissionSummary details={missionDetails} lang={dictionary} />

        <MissionList
          mission={missionDetails}
          userProgress={userProgress}
          lang={dictionary}
        ></MissionList>
      </section>

      <section>
        <MissionReward
          achievements={missionDetails.achievements}
          lang={dictionary}
        ></MissionReward>
      </section>
    </main>
  );
}
