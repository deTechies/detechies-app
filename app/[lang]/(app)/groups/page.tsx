import { getGroups } from "@/lib/data/groups";
import GroupList from "./_components/group-list";
import GroupListHeader from "./_components/group-list-header";
import { getUserProfile } from "@/lib/data/user";


export default async function GroupsPage() {
  const groups = await getGroups();
  const profile = await getUserProfile();

  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="flex flex-col w-full max-w-[97rem] gap-6 m-12">
     <GroupListHeader />

      {groups?.length > 0 ? <GroupList groups={groups} profileWallet={profile.wallet} /> : null}
    </main>
  );
}
