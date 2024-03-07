import GroupProfileCard from "@/app/[lang]/(app)/groups/[address]/_components/group-profile-card";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import AcceptGroupInvitation from "../_components/accept-group-invitation";

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
    <main className="w-full flex flex-col gap-5">
      <GroupProfileCard id={params.address} lang={dictionary} />
      <div className="flex flex-col m-10 lg:mx-20">{children}</div>
    </main>
  );
}
