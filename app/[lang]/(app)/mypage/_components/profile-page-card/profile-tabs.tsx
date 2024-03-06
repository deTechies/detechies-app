"use client";

import { Button } from "@/components/ui/button";
import { ROLE_TYPE } from "@/lib/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
;

export default function ProfileTabs({
  details,
  lang,
}: {
  details: any;
  lang: any;
}) {
  const pathname = usePathname();

  const links = [
    {
      name: "dashboard",
      href: "",
      isAdmin: false,
    },
    {
      name: "projects",
      href: "projects",
      isAdmin: false,
    },
    {
        name: "evaluation",
        href: "evaluation",
        isAdmin: false,
      },
      {
        name: "avatar",
        href: "avatar",
        isAdmin: false,
      },
    {
      name: "analysis",
      href: "analysis",
      isAdmin: true,
    },
  ] as any;

  return (
    <div className="flex flex-row  justify-between  px-10 lg:px-20  overflow-x-auto items-center">
      <div className="flex flex-row gap-0 ">
      {links.map((link: any, index: number) => {
        if (link.isAdmin && details.userRole != ROLE_TYPE.ADMIN)  {
          return;
        }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/mypage//${link.href}`}
              aria-disabled={link?.isAdmin}
              className={`flex items-center truncate border-b-[3px] capitalize py-3
            ${
              (link.href === "" &&
                pathname.endsWith(`/mypage`)) ||
              (link.href !== "" &&
                pathname.endsWith(`/mypage/${link.href}`))
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

        <Link href="/mypage/edit"  passHref>
            <Button size="sm">
                Edit Profile
            </Button>
        </Link>
    </div>
  );
}
