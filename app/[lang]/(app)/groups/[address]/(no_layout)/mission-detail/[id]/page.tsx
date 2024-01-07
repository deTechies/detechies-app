import { Locale } from "@/i18n.config";

import { getMissionDetails, getUsersMissionProgress } from "@/lib/data/mission";
import MissionList from "./_components/mission-list";
import MissionReward from "./_components/mission-reward";
import MissionSummary from "./_components/mission-summary";
export default async function MissionDetailPage({
  params,
}: {
  params: { id: string; lang: Locale; };
}) {

  const userProgress = await getUsersMissionProgress(params.id)
  const missionDetails = await getMissionDetails(params.id)

  console.log("TEST");
  // console.log(userProgress)
  console.log(missionDetails)

  
  return (
    <main className="grid w-full gap-6 mx-8 my-10 md:grid-cols-3">
      <section className="flex flex-col col-span-2 gap-5">
        <MissionSummary details={missionDetails} />

        <MissionList mission={missionDetails} userProgress={userProgress}></MissionList>
      </section>
      
      <section>
        <MissionReward achievements={missionDetails.achievements}></MissionReward>
      </section>
    </main>
  );
}
