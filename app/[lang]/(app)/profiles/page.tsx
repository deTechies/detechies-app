import { getUsers } from "@/lib/data/user";
import ListProfiles from "./list-profiles";

export default async function ProfilePage() {
  // lets get all the users profiles here..

  const users = (await getUsers()).data;
  //TODO: get the followers of the user here..
  const followers = [] as any[];

  return (
    <main className="flex gap-md  justify-center mx-auto max-w-5xl	">
      <ListProfiles users={users} followers={followers} />
    </main>
  );
}
