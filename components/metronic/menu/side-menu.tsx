import Link from "next/link";

export default function SideMenu({ links }: { links: any }) {
  return (
    <div className="w-full sticky top-10">
      <div className="flex flex-col">
        {links.map((link: any, index: number) => (
          <Link href={link.href} key={index} className="hover:bg-background-layer-1 rounded-sm px-4 flex flex-row gap-5 cursor-pointer">

            <div className="border-l border-border-div"></div>
            <div className=" py-3">
              <div>{link.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
