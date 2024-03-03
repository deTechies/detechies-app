


import { serverApi } from "@/lib/data/general";
import GroupListItem from "./group-list-item";

export default async function GroupList({
  lang,
}: {
  lang: any;
}) {
  
  const {data:groups} = await serverApi('/clubs');

  return (
    <div>


      <div className="grid items-stretch w-full gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group: any) => (
          <GroupListItem
            key={group.id}
            details={group}
            lang={lang}
            isPending={!group.verified}
          />
        ))}
      </div>

    </div>
  );
}
