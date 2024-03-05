import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
// import { serverApi } from "@/lib/data/general";

import { Suspense } from "react";
import ProfileProjects from "../_components/profile-projects";

export default async function UserProjects({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col gap-6">
      <Suspense fallback={"loading projects"}>
        <ProfileProjects text={dictionary.mypage.project} lang={dictionary} />
      </Suspense>
    </main>
  );
}
