import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";


import ProfileAwards from "../../mypage/_components/profile-awards";
import ProfileCertificates from "../../mypage/_components/profile-certificates";
import ProfileDetails from "../../mypage/_components/profile-details";
import ProfileProjects from "../../mypage/_components/profile-projects";

import NoProfileFound from "./_component/no-profile-found";
import UserProfile from "./_component/user-profile";
// import UserReport from "./_component/user-report";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const {data:profile} = await getUserProfile(params.user) as any;
  const dictionary = (await getDictionary(params.lang)) as any;
  
  //TODO: Create a profile not found page. 
  if(!profile.id) return <NoProfileFound />
  
  return (
    <div className="flex flex-col gap-20 m-8 sm:flex-row">
      {/* LeftSide */}
      <div className="min-w-[330px] flex flex-col gap-8">
        <UserProfile profile={profile} text={dictionary.mypage.profile}  />
         {/* <UserReport profile={profile} text={dictionary} />  */}
      </div>
      {/* main */}
      <div className="grow">
        <main className="flex flex-col gap-6">
          <ProfileDetails profile={profile} text={dictionary} visiting={true}/>
          <ProfileProjects projects={profile?.projects} text={dictionary.mypage.project} visiting={true} lang={dictionary} />
          <ProfileCertificates achievement_rewards={profile?.achievement_rewards} text={dictionary.mypage.education} />
          <ProfileAwards achievement_rewards={profile?.achievement_rewards} text={dictionary.mypage.awards}/>
        </main>
        
        {/* <EditProfile /> */}
      </div>
    </div>
  );
}
