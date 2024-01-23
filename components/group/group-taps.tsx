"use client";

import { Card } from "@/components/ui/card";
import { ROLE_TYPE } from "@/lib/interfaces";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
      isAdmin: false,
    },
    {
      name: lang.tabs.nft,
      href: "nft",
      isAdmin: false,
    },
    {
      name: lang.tabs.members,
      href: "members",
      isAdmin: false,
    },
    {
      name: lang.tabs.mission,
      href: "missions",
      isAdmin: false,
    },
    {
      name: lang.tabs.manage,
      href: "manage",
      isAdmin: true,
    },
  ] as any;

  return (
    <Card className="flex flex-row gap-0 px-10 pt-10 pb-0 overflow-x-auto rounded-none">
      {links.map((link: any, index: number) => {
        if (link.isAdmin && details.userRole != ROLE_TYPE.ADMIN)  {
          return;
        }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/${params.lang}/groups/${details.id}/${link.href}`}
              aria-disabled={link?.disabled}
              className={`inline-flex items-center truncate border-b-[3px] capitalize pb-3 text-subhead_m
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
