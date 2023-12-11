"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({ links }: { links: any }) {
  const pathName = usePathname();
  console.log(pathName);
  
  const menuItems = [
    {
      name: links.profile,
      link: "/mypage",
    },
    {
      name: links.projects,
      link: "/mypage/edit",
    }, 
    {
      name: "Projects",
      link: "#",
    },
    {
      name: "Avatar",
      link: "#",
    },
  ]
  return (
    <div className="bg-background-layer-1 rounded-sm grid items-center">
      {
        menuItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.link}
              className={`
              text-title_m text-text-secondary py-[18px] px-6 first:rounded-t-sm last:rounded-b-sm
              ${pathName.endsWith(item.link) ? "bg-accent-secondary text-text-primary" : "bg-none"}
              `}
            >
              {item.name}
            </Link>
          )
        })
      }
      
    </div>
  );
}
