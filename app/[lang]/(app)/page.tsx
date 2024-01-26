import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getFollowingList } from "@/lib/data/network";
import { getUsers } from "@/lib/data/user";
import ListProfiles from "./profiles/list-profiles";
import ProfileFilter from "./profiles/profile-filter";

export default async function ProfileDashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  const users = await getUsers();

  if (!users.data) return null;

  const followers = await getFollowingList();

  return (
    <main className="flex flex-col w-full gap-6 p-4 ">
      <ProfileFilter lang={dictionary}></ProfileFilter>
      <div className="w-screen " >
        <ListProfiles users={users.data} followers={followers} />
      </div>
    </main>
  );
}
