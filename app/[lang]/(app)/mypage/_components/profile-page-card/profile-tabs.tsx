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
    <div className="flex flex-row px-2 md:px-10 justify-between   overflow-x-auto items-start border-b">
      <div className="flex flex-row gap-2.5 pt-[14px] ">
        {links.map((link: any, index: number) => {
          return (
            <div key={index}>
              <Link
                href={`${prelink}/${link.href}`}
                aria-disabled={link?.isAdmin}
                className={`flex items-center text-2md truncate border-b-[2px] capitalize pb-5
            ${
              (link.href === "" && pathname.endsWith(prelink)) ||
              (link.href !== "" && pathname.endsWith(`${prelink}/${link.href}`))
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900"
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
