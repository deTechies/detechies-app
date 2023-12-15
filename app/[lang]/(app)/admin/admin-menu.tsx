"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMenu() {
  const pathName = usePathname();
  console.log(pathName);

  const menuItems = [
    {
      name: "Dashboard",
      link: "/admin",
    },
    {
      name: "Questions",
      link: "/admin/question",
    },
    {
      name: "Survey",
      link: "/admin/survey",
    },
    {
      name: "Avatar",
      link: "#",
    },
  ];
  return (
    <div className="bg-background-layer-1 rounded-sm grid items-center">
      {menuItems.map((item) => {
        return (
          <Link
            key={item.name}
            href={item.link}
            className={`
              text-title_m text-text-secondary py-[8px] px-6 first:rounded-t-sm last:rounded-b-sm
              ${
                pathName.endsWith(item.link)
                  ? "bg-accent-secondary text-text-primary"
                  : "bg-none"
              }
              `}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
