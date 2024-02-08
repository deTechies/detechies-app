import ProfileCard from "@/components/card/profile-card";
import { serverApi } from "@/lib/data/general";
import { User } from "@/lib/interfaces";
import ShowMoreButton from "@/components/extra/show-more-button";
import { user } from "@pushprotocol/restapi";

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
  const limit_number = searchParams.limit ? parseInt(searchParams.limit) : 10;

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 ">
        {users?.length > 0 &&
          users.map((profile: User, index: number) => (
            <ProfileCard key={index} profile={profile} lang={lang} />
          ))}
      </div>

      {users?.length < 1 && (
        <div className="py-24 text-center text-text-secondary text-subhead_s">
          {lang.group.details.manage.member.no_result}
        </div>
      )}

      {users?.length > 0 && users.length >= limit_number && (
        <ShowMoreButton lang={lang} />
      )}
    </>
  );
}
