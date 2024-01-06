import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";
import ProfileClubs from "./_components/profile-clubs";
import { User, Member } from "@/lib/interfaces";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  const profile = await getUserProfile() as User;
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className='flex flex-col gap-8'>
        <ProfileDetails profile={profile} text={dictionary.mypage.main}/>
        <ProfileProjects projects={profile.projects} text={dictionary.mypage.project} />
        <ProfileClubs clubs={profile.clubs} text={dictionary.mypage.club}/>
    </main>
  );
}
