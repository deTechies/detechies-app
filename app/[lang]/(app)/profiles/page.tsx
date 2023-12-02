import { getFollowingList } from "@/lib/data/network";
import { getUsers } from "@/lib/data/user";
import ListProfiles from "./list-profiles";

export default async function ProfilePage() {
  // lets get all the users profiles here..

  const users = await getUsers();
  console.log(users);
  const followers = await getFollowingList();

  return (
    <main className="flex gap-md  justify-center mx-auto max-w-5xl	">
      <ListProfiles users={users} followers={followers} />
    </main>
  );
}
