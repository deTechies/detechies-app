import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getFollowingList } from "@/lib/data/network";
import { getUsers } from "@/lib/data/user";
import ListProfiles from "./profiles/list-profiles";

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
    <main className="w-screen flex justify-center content-center">
      <ListProfiles users={users.data} followers={followers} />
    </main>
  );
}
