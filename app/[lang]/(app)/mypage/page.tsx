import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";
import ProfileCertificates from "./_components/profile-certificates";
import ProfileAwards from "./_components/profile-awards";
import { User, Member } from "@/lib/interfaces";
export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  const profile = await getUserProfile() as User;
  const dictionary = (await getDictionary(params.lang)) as any;
  console.log("Profile: ", profile);
  return (
    <main className='flex flex-col gap-8'>
        <ProfileDetails profile={profile} text={dictionary.mypage.main}/>
        <ProfileProjects projects={profile.projects} text={dictionary.mypage.project} />
        <ProfileCertificates achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.education}/>
        <ProfileAwards achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.awards}/>
    </main>
  );
}
