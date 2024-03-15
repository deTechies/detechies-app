"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ProfileTabs({
  children,
  prelink,
  links,
}: {
  links: any;
  prelink: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-row mx-2 md:mx-10 justify-between   overflow-x-auto items-start border-b border-b-border-div ">
      <div className="flex flex-row gap-2.5 pt-[14px] ">
        {links.map((link: any, index: number) => {
          return (
            <div key={index}>
              <Link
                href={`${prelink}/${link.href}`}
                aria-disabled={link?.isAdmin}
                className={`flex items-center truncate border-b-[2px] capitalize pb-5
            ${
              (link.href === "" && pathname.endsWith(prelink)) ||
              (link.href !== "" && pathname.endsWith(`${prelink}/${link.href}`))
                ? "border-accent-primary text-accent-primary"
                : "border-transparent text-text-placeholder hover:text-text-primary"
            }`}
              >
                <span className="px-2.5">{link.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="pt-1">{children}</div>
    </div>
  );
}
