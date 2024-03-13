import EmptyState from "@/components/metronic/custom/empty-state";
import { getUserProfile } from "@/lib/data/user";
import MyAbout from "./my-about";
import MyConnections from "./my-connections-card";
import MyLanguagesCard from "./my-languages-card";
import MyProjectsCard from "./my-projects-card";
import MyTagsCard from "./my-tags-card";
import MyUsedPackages from "./my-used-packages";

export default async function UserDashboard({ address }: { address?: any }) {
  const { data: user } = await getUserProfile(address);

  if (!user.profile_details?.skills && user.projects.length < 1) {
    return (
      <EmptyState title="No Profile for this User" subtitle="Please message the user to update his profile"/>
    );
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-md">
        <div className="md:w-[350px] md:shrink-0 w-full flex flex-col gap-md">
          <MyAbout userData={user} />
          <MyLanguagesCard address={user?.wallet} />
          <MyTagsCard tags={user?.profile_details?.skills} />
          <MyConnections address={user.wallet} />
        </div>
        <div className="flex flex-col gap-md grow">
          <div className="grid  lg:grid-cols-2 gap-md">
            <MyProjectsCard user={user?.wallet} />
            <MyUsedPackages user={user?.wallet} />
          </div>
        </div>
      </div>
    </div>
  );
}
