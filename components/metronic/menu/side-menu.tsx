"use client"
import Link from "next/link";

export default function SideMenu({ links }: { links: any }) {
  return (
    <div className="w-full sticky top-10">
      <div className="flex flex-col">
        {links.map((link: any, index: number) => (
          <Link href={link.href} key={index} className="hover:bg-background-layer-1 rounded-sm px-4 flex flex-row gap-5 cursor-pointer ">
            <div className=" relative  left-[4px] top-[0px] h-2 w-2 rounded-full bg-accent-primary my-auto" />
            <div className=" border-l border-border-div -ml-5" />
            <div className="py-3 text-sm">
              <div>{link.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
