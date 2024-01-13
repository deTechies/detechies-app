"use client";
import Search from "@/components/extra/search";
import InlineMemberItem from "@/components/members/inline-member-item";
import { Card } from "@/components/ui/card";
import { ProjectMember } from "@/lib/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export default function SearchMember({
  membersList,
  lang,
}: {
  membersList: any[];
  lang: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const selectedMember = searchParams.get("memberId");

  //filter members on uniquenesss

   const members = membersList.filter((member, index, self) => {
    return index === self.findIndex((m) => m.user.id === member.user.id);
  }); 

  const onSelectUser = (memberId: string) => {
    router.push(pathname + "?" + createQueryString("memberId", memberId));
  };
  return (
    <Card>
      <h3 className="text-subhead_s">
        {lang.mission.manage.select_member} ({members && members.length})
      </h3>
      <Search placeholder={lang.mission.manage.search_placeholder} />
      <div className="flex flex-col gap-3">
        {members.length > 0 ? (
          members.map((details:ProjectMember, index:number) => (
            <button
              key={index}
              onClick={() => {
                onSelectUser(details.user.id);
              }}
            >
              <InlineMemberItem
                active={selectedMember === details.user.id}
                avatar={details.user.avatar}
                display_name={details.user.display_name}
                memberId={details.user.wallet}
              />
            </button>
          ))
        ) : (
          <span>{lang.mission.manage.no_member}</span>
        )}
      </div>
    </Card>
  );
}
