import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getUserProfile } from "@/lib/data/user";
import EditProfileForm from "./edit-profile-form";

export default async function EditProfile({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);
  const { data: profile } = await getUserProfile();

  return (
    <EditProfileForm
      username={profile.display_name}
      currentValues={profile.profile_details}
      email={profile.email}
      text={dictionary.mypage.edit_profile}
    />
  );
}
