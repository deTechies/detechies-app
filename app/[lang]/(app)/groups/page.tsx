import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { Suspense } from "react";
import GroupList from "./_components/group-list";
import GroupListFilter from "./_components/group-list-filter";

export default async function GroupsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="flex flex-col w-full max-w-[97rem] gap-6 mx-auto">
      <GroupListFilter lang={dictionary} />

      <div className="mx-10">
        <Suspense fallback={<span>Loading... </span>}>
          <GroupList lang={dictionary} />
        </Suspense>
      </div>
    </main>
  );
}
