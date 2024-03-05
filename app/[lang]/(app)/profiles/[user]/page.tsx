import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";

import UserDashboard from "../../mypage/_components/dashboard/dashboard";
import NoProfileFound from "./_component/no-profile-found";
// import UserReport from "./_component/user-report";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const { data: profile } = (await getUserProfile(params.user)) as any;

  const dictionary = (await getDictionary(params.lang)) as any;

  //TODO: Create a profile not found page.
  if (!profile.id) return <NoProfileFound />;

  return (
    <main className="flex flex-col gap-5 sm:gap-20 sm:flex-row">
      <UserDashboard address={params.user} />
    </main>
  );
}
