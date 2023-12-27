"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GroupTaps({
  details,
  lang,
}: {
  details: any;
  lang: any;
}) {
  const pathname = usePathname();

  const links = [
    {
      name: lang.tabs.about,
      href: "",
      role: ["none", "member", "client", "admin",],
    },
    {
      name: lang.tabs.nft,
      href: "nft",
      role: ["none", "member", "client", "admin",],
    },
    {
      name: lang.tabs.members,
      href: "members",
      role: ["none", "member", "client", "admin",],
    },
    {
      name: lang.tabs.mission,
      href: "missions",
      role: ["none", "member", "client", "admin",],
    },
    {
      name: lang.tabs.manage,
      href: "manage",
      role: ["admin",],
    },
  ];

  return (
    <Card className="flex flex-row gap-0 px-10 pt-10 pb-0 rounded-none">
      {links.map((link: any, index: number) => {
        // if(!link.role.includes(details.userRole)){
        //   return;
        // }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/groups/${details.id}/${link.href}`}
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
