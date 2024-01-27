import ProfileCard from "@/components/card/profile-card";
import { serverApi } from "@/lib/data/general";
import { User } from "@/lib/interfaces";

export default async function ListProfiles({
  lang,
  searchParams,
}: {
  lang: any;
  searchParams: { [key: string]: string | undefined };
}) {
  // lets get all the users profiles here..
  const role = searchParams.role;
  const newUrl = new URLSearchParams();
  if (role) {
    newUrl.set("role", role);
  }
  if (searchParams.search) {
    newUrl.set("display_name", searchParams.search);
  }

  const { data: users } = await serverApi(`/users`, newUrl.toString());

  return (
    <div className="w-full  grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pr-8">
      {users?.length > 0 &&
        users
          .map((profile: User, index:number) => (
            <ProfileCard key={index} profile={profile} lang={lang} />
          ))}
    </div>
  );
}
