import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import SideMenu from "@/components/metronic/menu/side-menu";
import { getUserProfile } from "@/lib/data/user";
import EditProfileForm from "./_components/edit-profile-form";
import FreelanceForm from "./_components/freelance-form";
import ProfileAccounts from "./_components/profile-accounts";

export default async function EditProfile({ params: {lang} }: { params: {lang: Locale }}) {
  const dictionary = await getDictionary(lang);
  const { data: profile } = await getUserProfile();

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
    <div className="flex flex-row gap-5">
      <div className="w-[320px] shrink-0 ">
        <SideMenu links={sidelinks} />
      </div>
      <div className="flex flex-col gap-md">
        <EditProfileForm
          username={profile.display_name}
          currentValues={profile.profile_details}
          email={profile.email}
          lang={dictionary}
        />
        <FreelanceForm lang={dictionary} currentValues={profile.profile_details}/>
        <ProfileAccounts lang={lang}/>
      </div>
    </div>
  );
}
