"use client";

import { ROLE_TYPE } from "@/lib/interfaces";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import InviteGroupMember from "../invite-group-member/invite-group-member";
import { Button } from "../ui/button";
import JoinGroup from "./join-group";

export default function GroupTaps({
  details,
  lang,
}: {
  details: any;
  lang: any;
}) {
  const pathname = usePathname();
  const params = useParams();

  const links = [
    {
      name: lang.group.tabs.about,
      href: "",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.nft,
      href: "nft",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.members,
      href: "members",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.mission,
      href: "missions",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.manage,
      href: "manage",
      isAdmin: true,
    },
  ] as any;

  return (
    <div className="flex bg-background-layer-1 flex-row items-center justify-between  px-10 pt-10 pb-0 overflow-x-auto border-b rounded-none">
      <div className="flex flex-row gap-0">
      {links.map((link: any, index: number) => {
        if (link.isAdmin && details.userRole != ROLE_TYPE.ADMIN)  {
          return;
        }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/${params.lang}/groups/${details.id}/${link.href}`}
              aria-disabled={link?.disabled}
              className={`inline-flex items-center truncate border-b-[3px] capitalize pb-3 
            ${
              (link.href === "" &&
                !pathname.includes(`/groups/${details.id}/`)) ||
              (link.href !== "" &&
                pathname.includes(`/groups/${details.id}/${link.href}`))
                ? "border-accent-primary text-accent-primary"
                : "border-transparent text-text-placeholder hover:text-text-primary"
            }`}
            >
              {link.name}
            </Link>
          </div>
        );
      })}
      </div>
      <div>
      {details.userRole == "admin" && (
          <div className="flex items-start gap-3 grow">
            <Link
              href={`/groups/${details.id}/create/nft`}
              className="max-w-[212px] grow rounded-full"
            >
              <Button size="sm" variant="primary" className="w-full">
                Create Achievement
              </Button>
            </Link>

            <InviteGroupMember
              groupId={details.id}
              lang={lang}
              groupMembers={details.members}
            />
          </div>
        )}

        {details.userRole == "none" && (
          <div className="flex gap-3 grow">
            <JoinGroup
              groupId={details.id}
              details={details}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
}
