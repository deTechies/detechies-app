import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";


import { User } from "@/lib/interfaces";
import ProfileDetails from "../../mypage/_components/profile-details";
import ProfileProjects from "../../mypage/_components/profile-projects";
import ProfileCertificates from "../../mypage/_components/profile-certificates";
import ProfileAwards from "../../mypage/_components/profile-awards";

import UserProfile from "./_component/user-profile";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const profile = await getUserProfile(params.user) as User;
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <div className="flex sm:flex-row flex-col m-8 gap-20">
      {/* LeftSide */}
      <div className="min-w-[330px] flex flex-col gap-8">
        <UserProfile profile={profile} text={dictionary.mypage.profile} />
      </div>
      {/* main */}
      <div className="grow">
        <main className="flex flex-col gap-6">
          <ProfileDetails profile={profile} text={dictionary.mypage.main} />
          <ProfileProjects projects={profile.projects} text={dictionary.mypage.project} />
          <ProfileCertificates achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.education}/>
          <ProfileAwards achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.awards}/>
        </main>
        
        {/* <EditProfile /> */}
      </div>
    </div>
  );
}
