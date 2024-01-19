"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageMenu({ links }: { links: any }) {
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
    <div className="bg-background-layer-1 rounded-md grid items-center ">
      {
        menuItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.link}
              as={item.link}
              className={`
              text-title_m  py-[18px] px-6 first:rounded-t-md first:pt-[22px] last:pb-[22px] last:rounded-b-md  capitalize
              ${pathName.endsWith(item.link) ? 'bg-accent-tertiary text-text-primary' : "text-text-secondary"}
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
