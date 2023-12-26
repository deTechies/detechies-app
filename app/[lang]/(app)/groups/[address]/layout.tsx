import GroupProfileCard from "@/components/group/group-profile-card";
import GroupTabs from "@/components/group/group-taps";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getClub } from "@/lib/data/groups";
import { Card } from "@/components/ui/card";



export default async function GroupDetailLayout({
  params,
  children,
}: {
  params: { address: string, lang: Locale };
  children: React.ReactNode;
}) {

  const dictionary = (await getDictionary(params.lang)) as any;
  const data = await getClub(params.address);

  return (
    <main className="w-full m-8">
      <GroupProfileCard id={params.address} />
      <GroupTabs details={data} lang={dictionary.group}></GroupTabs>

      {/* <div className="flex flex-col w-full col-span-1 gap-4">
        
      </div> */}
      <Card className="px-10 pt-8 rounded-t-none">
        <div className="flex flex-col">{children}</div>
      </Card>
    </main>
  );
}
