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
  const {data:profile} = await getUserProfile();
  //search params validate for for refetching data
  

  return (
    <>
      <EditProfile
        username={profile.display_name}
        currentValues={profile.profile_details}
        email={profile.email}
        text={dictionary.mypage.edit_profile}
      />
      <ProfileAccounts />
    </>
  );
}
