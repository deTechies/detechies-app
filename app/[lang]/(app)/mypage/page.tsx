import { Locale } from "@/i18n.config";
// import { serverApi } from "@/lib/data/general";

import { Suspense } from "react";
import UserDashboard from "./_components/dashboard/dashboard";

export default async function MyDashboard({
  params,
}: {
  params: { lang: Locale };
}) {

  return (
    <main className="flex flex-col ">
      <Suspense fallback={"loading projects"}>
        <UserDashboard />
      </Suspense>
    </main>
  );
}
