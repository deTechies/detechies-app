


import { serverApi } from "@/lib/data/general";
import TeamListItem from "./team-list-item";

export default async function TeamList({
  lang,
}: {
  lang: any;
}) {
  
  const {data:groups} = await serverApi('/clubs');

  return (
    <div>


      <div className="grid  w-full items-stretch gap-10 mb-10 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
        {groups.map((group: any) => (
          <TeamListItem
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
