import GroupProfileCard from "@/components/group/group-profile-card";
import GroupTabs from "@/components/group/group-taps";

import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import AcceptGroupInvitation from "../../_components/accept-group-invitation";

export default async function GroupDetailLayout({
  params,
  children,
}: {
  params: { address: string; lang: Locale };
  children: React.ReactNode;
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  const { data } = await serverApi(`/clubs/${params.address}`);

  if (data.userRole === "invited")
    return (
      <main className="w-full m-8">
        <AcceptGroupInvitation
          id={params.address}
          name={data.name}
          image={data.image}
          lang={dictionary}
        />
      </main>
    );

  return (
    <main className="w-full">
      <GroupProfileCard id={params.address} lang={dictionary} />
      <GroupTabs details={data} lang={dictionary}></GroupTabs>

      <Card className="px-10 pt-8 rounded-t-none m-8">
        <div className="flex flex-col">{children}</div>
      </Card>
    </main>
  );
}
