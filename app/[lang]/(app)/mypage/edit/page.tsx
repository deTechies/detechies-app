import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import EditProfile from "./edit-profile";
import ProfileAccounts from "./profile-accounts";

export default async function EditProfilePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  const profile = await getUserProfile();
  
  //split fullname to first and last name
  const fullname = profile.profile_details?.full_name?.split(" ");
  profile.profile_details.first_name = fullname[0] || "";
  profile.profile_details.last_name = fullname[1] || "";
  return (
    <>
      <EditProfile
        username={profile.display_name}
        currentValues={profile.profile_details}
        text={dictionary.mypage.edit_profile}
      />
      <ProfileAccounts />
    </>
  );
}
