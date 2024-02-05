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
  const newUrl = new URLSearchParams();

  // Loop through searchParams and set them in newUrl
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      const paramName = key === "search" ? "display_name" : key;
      newUrl.set(paramName, value);
    }
  });

  const { data: users } = await serverApi(`/users`, newUrl.toString());

  return (
    <div className="w-full   grid grid-cols-1 md:grid-cols-2 gap-4 ">
      {users?.length > 0 &&
        users.map((profile: User, index: number) => (
          <ProfileCard key={index} profile={profile} lang={lang} />
        ))}
    </div>
  );
}
