import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";

import ProfileDetails from "../../mypage/_components/profile-details";
import ProfileProjects from "../../mypage/_components/profile-projects";
import Profile from "../../mypage/profile";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const profile = await getUserProfile(params.user);
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <div className="flex sm:flex-row flex-col m-8 gap-20">
      {/* LeftSide */}
      <div className="min-w-[330px] flex flex-col gap-8">
        <Profile text={dictionary.mypage.profile} />
      </div>
      {/* main */}
      <div className="grow">
        <main className="flex flex-col gap-8">
          <ProfileDetails profile={profile} text={dictionary.mypage.main} />
          <ProfileProjects
            projects={profile.projectMembers}
            text={dictionary.mypage.project}
          />
        </main>
        {/* <EditProfile /> */}
      </div>
    </div>
  );
}