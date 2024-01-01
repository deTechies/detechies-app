import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Card } from "@/components/ui/card";

import MissionSummary from "./_components/mission-summary";
import MissionList from "./_components/mission-list";
import MissionReward from "./_components/mission-reward";
export default async function MissionDetailPage({
  params,
}: {
  params: { address: string; lang: Locale; };
}) {

  //get the params for checking the profile details page.
  /*   const { data, loading, error } = useFetchData<any>(
    `/project/single/${address}`
  ); */

  //check if we can fetch this without doing it on the client side.

  return (
    <main className="grid w-full gap-6 mx-8 my-10 md:grid-cols-3">
      <section className="flex flex-col col-span-2 gap-5">
        <MissionSummary></MissionSummary>

        <MissionList></MissionList>
      </section>
      
      <section>
        <MissionReward></MissionReward>
      </section>
    </main>
  );
}
