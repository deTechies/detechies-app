import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { Suspense } from "react";
import TeamList from "./_components/team-list";
import TeamListFilter from "./_components/team-list-filter";

export default async function GroupsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="flex flex-col w-full max-w-[97rem] gap-6 mx-auto">
      <TeamListFilter lang={dictionary} />

      <div className="mx-10">
        <Suspense fallback={<span>Loading... </span>}>
          <TeamList lang={dictionary} />
        </Suspense>
      </div>
    </main>
  );
}
