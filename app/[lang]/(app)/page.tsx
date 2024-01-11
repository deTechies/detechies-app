
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getFollowingList } from "@/lib/data/network";
import { getUsers } from "@/lib/data/user";
import ListProfiles from "./profiles/list-profiles";

export default async function ProfileDashboard({params}: {params: {lang: Locale}}) {
  const dictionary = await getDictionary(params.lang) as any;
  const users = await getUsers();

  const followers = await getFollowingList();

  return (
    <main className="m-10 max-w-4xl mx-auto">
        <ListProfiles users={users} followers={followers} />
    </main>
  );
}
