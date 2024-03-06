"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
;

export default function ProfileTabs({
  children,
  links,
}: {
  links:any;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  

  return (
    <div className="flex flex-row  justify-between  px-10 lg:px-20  overflow-x-auto items-center">
      <div className="flex flex-row gap-0 ">
      {links.map((link: any, index: number) => {


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
      <div>
        {children}
      </div>
    </div>
  );
}
