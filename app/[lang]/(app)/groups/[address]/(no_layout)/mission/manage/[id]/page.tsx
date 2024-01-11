import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getClub } from "@/lib/data/groups";
import { getMissionDetails } from "@/lib/data/mission";
import MissionDetail from "./_components/mission-detail";
import SearchMember from "./_components/search-member";

export default async function MissionDetailPage({
  params,
}: {
  params: { id: string; lang: Locale; address: string };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const missionDetails = await getMissionDetails(params.id);
  const club = await getClub(params.address);

  return (
    <main className="grid md:grid-cols-3 gap-6 w-full my-10 mx-8">
      <div>
        <SearchMember membersList={missionDetails.userProgress} lang={dictionary} />
      </div>
      <div className="md:col-span-2">
        {missionDetails && (
          <MissionDetail
            details={missionDetails}
            club={club}
            lang={dictionary}
          />
        )}
      </div>
    </main>
  );
}
