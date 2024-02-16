import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getMissionDetails, getUsersMissionProgress } from "@/lib/data/mission";
import MissionList from "./_components/mission-list";
import MissionReward from "./_components/mission-reward";
import MissionSummary from "./_components/mission-summary";
import { serverApi } from "@/lib/data/general";

export default async function MissionDetailPage({
  params,
}: {
  params: { address: string; id: string; lang: Locale };
}) {
  const { data: userProgress } = await getUsersMissionProgress(params.id);
  const missionDetails = await getMissionDetails(params.id);
  const dictionary = (await getDictionary(params.lang)) as any;
  const { data: clubInfo } = await serverApi(`/clubs/${params.address}`);

  return (
    <main className="grid w-full gap-6 mx-8 md:grid-cols-3">
      <section className="flex flex-col gap-5 truncate md:col-span-2">
        <MissionSummary
          details={missionDetails.data}
          lang={dictionary}
          />

        <MissionList
          userRole={clubInfo.userRole}
          mission={missionDetails.data}
          userProgress={userProgress}
          lang={dictionary}
        ></MissionList>
      </section>

      <section>
        <MissionReward
          achievements={missionDetails.data.achievements}
          lang={dictionary}
        ></MissionReward>
      </section>
    </main>
  );
}
