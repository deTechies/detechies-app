import { getUserProfile } from "@/lib/data/user";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";


export default async function Dashboard() {

  const profile = await getUserProfile();
  return (
    <main className='flex flex-col gap-8'>
           <pre className="hidden">
        {JSON.stringify(profile, null, 2)}
      </pre>
        <ProfileDetails profile={profile} />
        <ProfileProjects projects={profile.projectMembers} />
    </main>
  );
}
