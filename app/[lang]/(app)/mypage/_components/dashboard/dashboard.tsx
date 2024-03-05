import { getUserProfile } from "@/lib/data/user";
import MyConnections from "./my-connections-card";
import MyLanguagesCard from "./my-languages-card";
import MyProjectsCard from "./my-projects-card";
import MyRolesCard from "./my-roles-card";
import MyTagsCard from "./my-tags-card";
import MyUsedPackages from "./my-used-packages";

export default async function UserDashboard({ address }: { address?: any }) {

  const { data: user } = await getUserProfile(address);
  return (
    <div>
      <div className="grid grid-cols-3 gap-md">
        <div className="col-span-1 flex flex-col gap-md">
            <MyConnections connections={user?.connections} />
            <MyTagsCard tags={user?.profile_details.skills} />
            <MyLanguagesCard address={user?.wallet} />
        </div>
        <div className="col-span-2 flex flex-col gap-md">
            <MyUsedPackages user={user?.wallet} />
            <div className="grid grid-cols-2 gap-md">    
                <MyProjectsCard user={user?.wallet} />
                <MyRolesCard user={user?.wallet} />
            </div>
        </div>
      </div>
    </div>
  );
}
