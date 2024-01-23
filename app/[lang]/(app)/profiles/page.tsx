import { getUsers } from "@/lib/data/user";
import ListProfiles from "./list-profiles";

export default async function ProfilePage() {
  // lets get all the users profiles here..

  const users = (await getUsers()).data;
  //TODO: get the followers of the user here..
  const followers = [] as any[];

  return (
    <main className="w-screen flex justify-center content-center">
      <ListProfiles users={users} followers={followers} />
    </main>
  );
}
