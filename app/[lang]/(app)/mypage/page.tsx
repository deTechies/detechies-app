import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
// import { serverApi } from "@/lib/data/general";
import { getUserProfile } from "@/lib/data/user";

import ProfileProjects from "./_components/profile-projects";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  //TODO: make sure that this is refetched when the users edit profile.
  const { data: profile } = await getUserProfile();
  const dictionary = (await getDictionary(params.lang)) as any;

  // const {data: myProfile} = await serverApi(`/users/me`);

  return (
    
    <main className="flex flex-col gap-6">

      <ProfileProjects
        text={dictionary.mypage.project}
        lang={dictionary}
      />
    </main>
  );
}
