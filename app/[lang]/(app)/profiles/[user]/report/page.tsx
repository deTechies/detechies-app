import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import UserSummary from "./_component/user-summary";
import UserReports from "./_component/user-reports";
import { getAllSurveyAboutUser } from "@/lib/data/survey";
import { serverApi } from "@/lib/data/general";
import { postServer } from "@/lib/data/postRequest";

export default async function ProfileReport({
  params,
}: {
  params: { lang: Locale; user: string };
}) {
  const { data: profile } = (await getUserProfile(params.user)) as any;
  const dictionary = (await getDictionary(params.lang)) as any;

  const userSurvey = await getAllSurveyAboutUser(profile.id);

  // if (userSurvey.status === "success") {
  //   //
  // }

  const result = await serverApi(
    "/survey-report/createSurveyReport/a0206c96-d0f9-454f-adc2-57c7ec12b13e"
  );

  const results = [
    { id1: [result, result, result] },
    { id2: [result, result] },
    { id3: [result, result, result, result] },
  ];

  return (
    <div className="flex flex-col gap-4 m-10 max-w-[80rem]">
      <h4 className="mb-10 text-center text-heading_s">
        {dictionary.profile.summary.title}
      </h4>

      <UserSummary
        lang={dictionary}
        profile={profile}
        survey={userSurvey.data}
      />

      <UserReports
        lang={dictionary}
        projects={profile.projects}
        survey={userSurvey.data}
      />
    </div>
  );
}
