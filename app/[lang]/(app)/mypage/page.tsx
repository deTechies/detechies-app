import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
// import { serverApi } from "@/lib/data/general";

import { Suspense } from "react";
import UserDashboard from "./_components/dashboard/dashboard";

export default async function MyDashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  //TODO: make sure that this is refetched when the users edit profile.
  const dictionary = (await getDictionary(params.lang)) as any;

  // const {data: myProfile} = await serverApi(`/users/me`);

  return (
    <main className="flex flex-col gap-6 ">
      <Suspense fallback={"loading projects"}>
        <UserDashboard />
      </Suspense>
    </main>
  );
}
