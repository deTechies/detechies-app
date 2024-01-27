import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import UserSummary from "./_component/user-summary";
import UserReports from "./_component/user-reports";

export default async function ProfileReport({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const { data: profile } = (await getUserProfile(params.user)) as any;
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <div className="flex flex-col gap-4 m-10 max-w-[80rem]">
      <h4 className="mb-10 text-center text-heading_s">전문가 평판 보고서</h4>

      <UserSummary lang={dictionary} profile={profile} />

      <UserReports
        lang={dictionary}
        profile={profile}
        
      />
    </div>
  );
}
