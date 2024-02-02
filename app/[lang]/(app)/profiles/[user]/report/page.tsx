import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import UserSummary from "./_component/user-summary";
import UserReports from "./_component/user-reports";
import { serverApi } from "@/lib/data/general";

export default async function ProfileReport({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const { data: profile } = (await getUserProfile(params.user)) as any;
  const result = await serverApi(
    "/survey-report/createSurveyReport/f78093c0-140a-4a0a-a4d2-30e72c7dc0e4"
  );

  const { data: userReport } = await serverApi(
    "/survey-report/getUserReport/0xe8654C95b77e4E8fb1E4A88098bF193259B31DD9"
    // 0xfFf09621F09CAa2C939386b688e62e5BE19D2D56
  );

  return (
    <div className="flex flex-col gap-4 my-10 mx-auto max-w-[80rem]">
      <h4 className="mb-10 text-center text-heading_s">
        {dictionary.profile.summary.title}
      </h4>

      <UserSummary lang={dictionary} profile={profile} survey={result.data} />

      <UserReports
        lang={dictionary}
        totalResult={result.data}
        userReport={userReport}
      />
    </div>
  );
}
