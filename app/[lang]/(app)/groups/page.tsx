import { getClub, getGroups } from "@/lib/data/groups";
import { getUserProfile } from "@/lib/data/user";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import GroupList from "./_components/group-list";
import GroupListHeader from "./_components/group-list-header";

export default async function GroupsPage({
  params,
}: {
  params: { lang: Locale };
}) {

  const dictionary = (await getDictionary(params.lang)) as any;
  
  const profile = await getUserProfile();
  const groups = await getGroups();

  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="flex flex-col w-full max-w-[97rem] gap-6 m-12">
      <GroupListHeader lang={dictionary} />

      {groups?.length > 0 ? (
        <GroupList
          groups={groups}
          profileWallet={profile.wallet}
          lang={dictionary}
        />
      ) : null}
    </main>
  );
}
