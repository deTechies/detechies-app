"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({ links }: { links: any }) {
  const pathName = usePathname();

  
  const menuItems = [
    {
      name: links.portfolio,
      link: "/mypage",
    },
    {
      name: links.edit_profile,
      link: "/mypage/edit",
    }, 
    {
      name: links.evaluation_history,
      link: "/mypage/evaluation",
    }, 
    {
      name: links.reputation_history,
      link: "#",
    }, 
    {
      name: links.career_avatar,
      link: "/mypage/avatar",
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
              text-title_m  py-[18px] px-6 first:rounded-t-sm last:rounded-b-sm capitalize
              ${pathName.endsWith(item.link) ? 'bg-accent-secondary text-text-primary' : "text-text-secondary"}
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
