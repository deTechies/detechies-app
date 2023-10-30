import Search from "@/components/extra/search";
import { getGroups } from "@/lib/data/groups";
import Link from "next/link";
import GroupList from "./group-list";

export default async function GroupsPage() {
  const groups = await getGroups();
  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl m-12">
      <div className="flex gap-4 w-full items-center">
        <Search placeholder="Search for groups" />
        <Link
          href="/groups/create"
          className="flex items-center gap-4 bg-accent-secondary py-3 px-3 rounded-sm text-accent-primary"
        >
          Create New
        </Link>
      </div>

      {groups?.length > 0 ? <GroupList groups={groups} /> : null}
    </main>
  );
}
