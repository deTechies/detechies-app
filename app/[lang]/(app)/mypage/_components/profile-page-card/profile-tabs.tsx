"use client";

import { ROLE_TYPE } from "@/lib/interfaces";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
;

export default function ProfileTabs({
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
      isAdmin: false,
    },
  ] as any;

  return (
    <div className="flex flex-row items-center justify-between  px-10 pt-10 pb-0 overflow-x-auto border-b rounded-none">
      <div className="flex flex-row gap-0">
      {links.map((link: any, index: number) => {
        if (link.isAdmin && details.userRole != ROLE_TYPE.ADMIN)  {
          return;
        }

        return (
          <div className="mr-8" key={index}>
            <Link
              href={`/mypage//${link.href}`}
              aria-disabled={link?.disabled}
              className={`inline-flex items-center truncate border-b-[3px] capitalize pb-3
            ${
              (link.href === "" &&
                !pathname.includes(`/mypage/${details.id}/`)) ||
              (link.href !== "" &&
                pathname.includes(`/mypage/${link.href}`))
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
        <Link href="/mypage/edit"  passHref>
            <button>
                Edit
            </button>
        </Link>
      </div>
    </div>
  );
}
