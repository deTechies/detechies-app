
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
    <main className="m-10">
      <div className="absolute bg-[url('/landing/background-card.png')] object-scale-down top-[64px] left-0  z-[-10] min-h-[20vh] min-w-full" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-8 align-center relative">
        <ListProfiles users={users} followers={followers} />
      </div>
    </main>
  );
}
