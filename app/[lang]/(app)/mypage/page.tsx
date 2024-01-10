import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import { User } from "@/lib/interfaces";
import ProfileAwards from "./_components/profile-awards";
import ProfileCertificates from "./_components/profile-certificates";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";
export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  const profile = await getUserProfile() as User;
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className='flex flex-col gap-6'>
        <ProfileDetails profile={profile} text={dictionary.mypage.main}/>
        <ProfileProjects projects={profile.projects} text={dictionary.mypage.project} />
        <ProfileCertificates achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.education}/>
        <ProfileAwards achievement_rewards={profile.achievement_rewards} text={dictionary.mypage.awards}/>
    </main>
  );
}
