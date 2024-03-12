import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import SideMenu from "@/components/metronic/menu/side-menu";

export default async function ProjectEditLayout({ children ,params: {lang} }: { children: any ,params: {lang: Locale }}) {
  const dictionary = await getDictionary(lang);


  const sidelinks = [
    {
      name: "Project Settings",
      href: "#edit-profile",
    },
    {
      name: "Sources",
      href: "#sources",
    },
    {
      name: "Project Delete",
      href: "#freelance",
    },
  

  ]
  return (
    <div className="flex flex-col md:flex-row gap-5 md:m-10 m-5">
      <div className="w-[320px] ">
        <SideMenu links={sidelinks} />
      </div>
      <div className="flex flex-col gap-md grow" >
        {children}
      </div>
    </div>
  );
}
