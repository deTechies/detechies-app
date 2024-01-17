"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ROLE_TYPE } from "@/lib/interfaces";

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
      name: lang.tabs.about,
      href: "",
      role: [
        ROLE_TYPE.NONE,
        ROLE_TYPE.JOINED,
        ROLE_TYPE.INVITED,
        ROLE_TYPE.CLIENT,
        ROLE_TYPE.ADMIN,
      ],
    },
    {
      name: lang.tabs.nft,
      href: "nft",
      role: [
        ROLE_TYPE.NONE,
        ROLE_TYPE.JOINED,
        ROLE_TYPE.INVITED,
        ROLE_TYPE.CLIENT,
        ROLE_TYPE.ADMIN,
      ],
    },
    {
      name: lang.tabs.members,
      href: "members",
      role: [
        ROLE_TYPE.NONE,
        ROLE_TYPE.JOINED,
        ROLE_TYPE.INVITED,
        ROLE_TYPE.CLIENT,
        ROLE_TYPE.ADMIN,
      ],
    },
    {
      name: lang.tabs.mission,
      href: "missions",
      role: [
        ROLE_TYPE.NONE,
        ROLE_TYPE.JOINED,
        ROLE_TYPE.INVITED,
        ROLE_TYPE.CLIENT,
        ROLE_TYPE.ADMIN,
      ],
    },
    {
      name: lang.tabs.manage,
      href: "manage",
      role: [ROLE_TYPE.ADMIN],
    },
  ];

  return (
    <Card className="flex flex-row gap-0 px-10 pt-10 pb-0 rounded-none">
      {links.map((link: any, index: number) => {
        if (!link.role.includes(details.userRole)) {
          return;
        }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/${params.lang}/groups/${details.id}/${link.href}`}
              aria-disabled={link?.disabled}
              className={`inline-flex items-center border-b-[3px] capitalize pb-3 text-subhead_m
            ${
              (link.href === "" &&
                !pathname.includes(`/groups/${details.id}/`)) ||
              (link.href !== "" &&
                pathname.includes(`/groups/${details.id}/${link.href}`))
                ? "border-accent-primary text-text-primary"
                : "border-transparent text-text-placeholder hover:text-text-primary"
            }`}
            >
              {link.name}
            </Link>
          </div>
        );
      })}
    </Card>
  );
}
