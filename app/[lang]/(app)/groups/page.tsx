
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { serverApi } from "@/lib/data/general";
import GroupList from "./_components/group-list";
import GroupListHeader from "./_components/group-list-header";

export default async function GroupsPage({
  params,
}: {
  params: { lang: Locale };
}) {

  const dictionary = (await getDictionary(params.lang)) as any;

  const {data:groups} = await serverApi(`/clubs`)
  
  
  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="flex flex-col w-full max-w-[97rem] gap-6 m-12">
      <GroupListHeader lang={dictionary} />

      {groups?.length > 0 ? (
        <GroupList
          groups={groups}
          lang={dictionary}
        />
      ) : null}

    </main>
  );
}
