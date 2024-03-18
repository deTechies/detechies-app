import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import SideMenu from "@/components/metronic/menu/side-menu";
import ApiSettings from "./_components/api-settings";

export default async function TeamSettings({ params: {lang, address} }: { params: {lang: Locale, address: string }}) {
  const dictionary = await getDictionary(lang);

  const sidelinks = [
    {
      name: "Basic Settings",
      href: "#edit-profile",
    },
    {
      name: "Freelance Settings",
      href: "#freelance",
    },
    {
      name: "Social Connections",
      href: "#socials",
    },

  ]
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-[250px] shrink-0 ">
        <SideMenu links={sidelinks} />
      </div>
      <div className="flex flex-col gap-md w-full">
        <ApiSettings teamId={address} />
      </div>
    </div>
  );
}
