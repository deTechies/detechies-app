import Pagination from "@/components/extra/pagination";
import EmptyState from "@/components/metronic/custom/empty-state";
import { serverApi } from "@/lib/data/general";
import { User } from "@/lib/interfaces";
import ProfileListItem from "./profile-list-item";
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

  if (users?.data.length > 0) {
    return (
      <div className="flex  flex-col gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {users.data.map((profile: User, index: number) => (
            <ProfileListItem key={index} profile={profile} lang={lang} />
          ))}
         
        </div>
        <Pagination
            total={users.totalCount}
            limit={searchParams.limit ? parseInt(searchParams.limit) : 20}
            page={searchParams.page ? parseInt(searchParams.page) : 1}
          />
      </div>
    );
  }

  return (
    <EmptyState title="No Profiles" subtitle="No profiles have been douns" />
  );
}
