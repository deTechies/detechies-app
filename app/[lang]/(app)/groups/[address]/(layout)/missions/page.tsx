import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getClubMissions } from "@/lib/data/mission";
import { serverApi } from "@/lib/data/general";
import MissionCardList from "./mission-card-list";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale; };
}) {
  const {data: missionInfo} = await getClubMissions(params.address);
  const {data: clubInfo} = await serverApi(`/clubs/${params.address}`);
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <MissionCardList
      address={params.address}
      missions={missionInfo}
      clubInfo={clubInfo}
      useTab={true}
      lang={dictionary}
    />
  );
}
