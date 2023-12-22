import { getGroups } from "@/lib/data/groups";
import GroupList from "./_components/group-list";
import GroupListHeader from "./_components/group-list-header";

export default async function GroupsPage() {
  const groups = await getGroups();

  console.log(groups);
  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl m-12">
     <GroupListHeader />

      {groups?.length > 0 ? <GroupList groups={groups} /> : null}
    </main>
  );
}
