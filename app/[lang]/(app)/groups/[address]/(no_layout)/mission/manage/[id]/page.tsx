import { Locale } from "@/i18n.config";
import { getMissionDetails } from "@/lib/data/mission";
import MissionDetail from "./_components/mission-detail";
import SearchMember from "./_components/search-member";



export default async function MissionDetailPage({params}: {
  params: { id: string; lang: Locale; };
}) {

  
  const missionDetails = await getMissionDetails(params.id)

  return (
    <main className="grid md:grid-cols-3 gap-6 w-full my-10 mx-8">
      <div className="">
        <SearchMember membersList={missionDetails.userProgress}/>
      </div>
      <div className="col-span-2">
        {
          missionDetails && <MissionDetail details={missionDetails} />
        }
        
      </div>

    </main>
  );
}
