import { getUserProfile } from "@/lib/data/user";
import MyAbout from "./my-about";
import MyConnections from "./my-connections-card";
import MyLanguagesCard from "./my-languages-card";
import MyProjectsCard from "./my-projects-card";
import MyTagsCard from "./my-tags-card";
import MyUsedPackages from "./my-used-packages";

export default async function UserDashboard({ address }: { address?: any }) {

  const { data: user } = await getUserProfile(address);
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-md">
        <div className="md:w-[350px] md:shrink-0 w-full flex flex-col gap-md">
            <MyAbout userData={user}/>
            <MyLanguagesCard address={user?.wallet} />
            <MyTagsCard tags={user?.profile_details?.skills} />
            <MyConnections connections={user?.socials} />
        </div>
        <div className="flex flex-col gap-md grow">
        <div className="grid grid-cols-2 gap-md">    
                <MyProjectsCard user={user?.wallet} />
            </div>
            <MyUsedPackages user={user?.wallet} />
        
        </div>
      </div>
    </div>
  );
}
