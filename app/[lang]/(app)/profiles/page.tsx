import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUsers } from "@/lib/data/user";
import ListProfiles from "./list-profiles";
import ProfileFilter from "./profile-filter";

export default async function ProfilePage({
  params,
}: {
  params: { lang: Locale };
}) {
  // lets get all the users profiles here..


  const users = (await getUsers()).data;
  //TODO: get the followers of the user here..
  const followers = [] as any[];
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className="flex flex-col w-full gap-6 p-4 ">
      <ProfileFilter lang={dictionary}></ProfileFilter>
      <div className="w-screen " >
        <ListProfiles users={users} followers={followers} lang={dictionary}/>
      </div>
    </main>
    
  );
}
