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
  return (
    <>
      <EditProfile
        username={profile.display_name}
        text={dictionary.mypage.edit_profile}
      />
      <ProfileAccounts />
    </>
  );
}
